import Order from '../models/Order.js';
import { sendOrderNotification, sendOrderConfirmationToUser, sendOrderStatusUpdate } from '../utils/emailService.js';

// @desc    Create order
// @route   POST /api/orders
export const createOrder = async (req, res) => {
  const { name, email, service, message } = req.body;
  try {
    const order = await Order.create({ name, email, service, message });
    
    // Admin notification
    sendOrderNotification({ name, email, service, message }).catch(console.error);
    
    // ✅ User confirmation email (card, modern)
    sendOrderConfirmationToUser({ name, email, service, message }).catch(console.error);
    
    res.status(201).json({ message: 'Demande envoyée avec succès', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (admin) and send email to client
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'contacted', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Statut invalide' });
  }
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    order.status = status;
    await order.save();

    // Send status update email to client (modern card)
    sendOrderStatusUpdate(order).catch(console.error);

    res.json({ message: 'Statut mis à jour avec succès', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};