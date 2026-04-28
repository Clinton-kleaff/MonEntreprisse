import {
  ShoppingCart,
  Building,
  Stethoscope,
  GraduationCap,
  UtensilsCrossed,
  Truck,
  Landmark,
  Scale,
  Shield,
  Church,
  Building2,
  Vote,
} from "lucide-react";

export const sectors = [
  {
    slug: "e-commerce",
    name: "E-commerce",
    icon: ShoppingCart,
    shortDescription:
      "Boutique en ligne, recommandations IA, chatbots 24/7, automatisation des commandes, WhatsApp & Instagram intégrés.",
    fullDescription:
      "Un site web professionnel couplé à l’IA et à l’automatisation transforme votre e-commerce en une machine à vendre. Vos clients bénéficient de recommandations personnalisées (IA), d’un service client instantané (chatbot, WhatsApp, Instagram) et d’une expérience fluide. La gestion des stocks, les relances emails/SMS, les paiements (Moncash, Natcash, Stripe, cartes) et la synchronisation CRM s’exécutent automatiquement, vous libérant des heures chaque semaine.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    benefits: [
      "Boost du panier moyen grâce aux suggestions IA",
      "Automatisation des emails, SMS et messages WhatsApp/Instagram",
      "Service client réactif 24/7 sans embaucher",
      "Pilotage en temps réel avec les tableaux de bord",
      "Intégration de paiements locaux (Moncash, Natcash) et internationaux (Stripe, CB)",
      "Gestion automatisée des commandes et des retours",
    ],
    recommendedServices: [
      "web",
      "ai",
      "chatbot",
      "automation",
      "data-analysis",
      "whatsapp-automation",
      "instagram-autoreply",
      "email-marketing",
      "payment-integration",
      "order-management",
    ],
  },
  {
    slug: "immobilier",
    name: "Immobilier",
    icon: Building,
    shortDescription:
      "Visites virtuelles, estimation IA, chatbot de qualification, relances automatiques, gestion des rendez-vous.",
    fullDescription:
      "Votre agence immobilière gagne en productivité grâce à un site vitrine optimisé et une application web gérant vos annonces. L’IA estime les biens et suggère les biens correspondants aux acheteurs. Un chatbot qualifie les leads 24/7 sur votre site et sur WhatsApp. L’automatisation relaie vos emails, SMS et messages Instagram au bon moment. La planification intelligente organise vos visites. L’analyse de données identifie les tendances du marché local.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    benefits: [
      "Prospects qualifiés automatiquement via site, WhatsApp et Instagram",
      "Relances email, SMS et vocales sans effort",
      "Estimation précise pour convaincre vendeurs",
      "Meilleure visibilité sur Google (SEO local)",
      "Agenda synchronisé avec rappels automatiques",
    ],
    recommendedServices: [
      "web",
      "ai",
      "chatbot",
      "automation",
      "seo",
      "whatsapp-automation",
      "instagram-autoreply",
      "scheduling",
    ],
  },
  {
    slug: "sante",
    name: "Santé",
    icon: Stethoscope,
    shortDescription:
      "RDV en ligne, triage intelligent, rappels automatiques, dossiers patients, téléconsultation.",
    fullDescription:
      "Votre clinique ou cabinet médical optimise la prise de rendez-vous avec une plateforme web sécurisée. Un chatbot IA effectue un pré-triage et répond aux questions fréquentes, même via WhatsApp. L’automatisation envoie des rappels SMS/email et met à jour les dossiers. L’analyse des données de fréquentation améliore la planification des ressources. Option téléconsultation intégrée.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
    benefits: [
      "Moins d’appels pour les rendez-vous",
      "Réduction des rendez-vous non honorés",
      "Expérience patient moderne et rassurante",
      "Gestion administrative allégée",
      "Triage IA pour orienter vers le bon spécialiste",
    ],
    recommendedServices: [
      "web",
      "chatbot",
      "automation",
      "data-analysis",
      "whatsapp-automation",
      "scheduling",
    ],
  },
  {
    slug: "education",
    name: "Éducation",
    icon: GraduationCap,
    shortDescription:
      "Plateforme e-learning, IA pédagogique, chatbot étudiant, automatisation des notes, notifications parents.",
    fullDescription:
      "Votre établissement scolaire ou universitaire offre une expérience moderne avec un site web portail étudiant. L’IA adapte les parcours d’apprentissage et détecte les difficultés. Un chatbot répond aux questions administratives 24/7 (site et WhatsApp). L’automatisation gère les inscriptions, les paiements et la diffusion des notes. Les données permettent un suivi personnalisé. Notifications automatiques aux parents par SMS/email.",
    image:
      "https://live.staticflickr.com/65535/55234866858_54c0d28c73_c.jpg",
    benefits: [
      "Apprentissage personnalisé à grande échelle",
      "Charge administrative réduite pour le personnel",
      "Meilleure rétention des étudiants",
      "Communication simplifiée parents/élèves",
      "Paiements en ligne intégrés (frais de scolarité)",
    ],
    recommendedServices: [
      "web",
      "ai",
      "chatbot",
      "automation",
      "data-analysis",
      "whatsapp-automation",
      "email-marketing",
      "payment-integration",
    ],
  },
  {
    slug: "hospitalite",
    name: "Hôtellerie & Restauration",
    icon: UtensilsCrossed,
    shortDescription:
      "Réservation en ligne, chatbot concierge, menus intelligents, fidélisation automatique, commande via WhatsApp.",
    fullDescription:
      "Un site web avec système de réservation intégré booste votre activité. L’IA suggère des plats ou des séjours selon les préférences clients. Un chatbot répond instantanément aux demandes de disponibilité et prend les commandes via WhatsApp ou Instagram. L’automatisation gère les emails de confirmation, les offres de fidélité et les avis clients. L’analyse des données révèle les périodes de pointe et les plats les plus rentables.",
    image:
      "https://live.staticflickr.com/65535/55233850177_5a53cba067_c.jpg",
    benefits: [
      "Taux d’occupation / couverts augmenté",
      "Fidélisation client automatisée (email, SMS, WhatsApp)",
      "Service client disponible en continu",
      "Décisions basées sur les données réelles",
      "Réduction des erreurs de commande",
    ],
    recommendedServices: [
      "web",
      "ai",
      "chatbot",
      "automation",
      "data-analysis",
      "whatsapp-automation",
      "instagram-autoreply",
      "order-management",
    ],
  },
//   {
//     slug: "logistique",
//     name: "Logistique & Transport",
//     icon: Truck,
//     shortDescription:
//       "Suivi en temps réel, optimisation d'itinéraires, dispatch automatique, prédiction de pannes.",
//     fullDescription:
//       "Votre flotte devient plus efficace grâce à une application web de suivi et d’optimisation. L’IA calcule les meilleurs itinéraires et prévoit la maintenance. Les chatbots internes assistent vos employés. L’automatisation dispatche les commandes et génère les documents de transport. L’analyse de données réduit les coûts de carburant et les retards.",
//     image:
//     //   "https://images.unsplash.com/photo-1580674285054-bed31e24b0f3?w=800&h=600&fit=crop",
//     "https://live.staticflickr.com/65535/55234932803_01f5e886e5_c.jpg",
//     benefits: [
//       "Réduction des coûts de carburant (jusqu'à 15%)",
//       "Clients informés en temps réel (SMS, WhatsApp)",
//       "Moins de pannes grâce à la maintenance prédictive",
//       "Gestion documentaire sans papier",
//     ],
//     recommendedServices: [
//       "web",
//       "ai",
//       "chatbot",
//       "automation",
//       "data-analysis",
//       "whatsapp-automation",
//     ],
//   },
  {
    slug: "finance",
    name: "Finance & Assurance",
    icon: Landmark,
    shortDescription:
      "Portail client, score de risque IA, chatbot de souscription, automatisation des sinistres, paiements sécurisés.",
    fullDescription:
      "Votre institution financière offre une expérience client premium via un portail web sécurisé. L’IA évalue les risques et personnalise les offres. Un chatbot guide les demandes de crédit ou de sinistre 24/7. L’automatisation traite les flux de documents et les notifications réglementaires. Intégration de paiements (Moncash, Natcash, Stripe) et gestion des réclamations. L’analyse de données détecte les fraudes et optimise les produits.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    benefits: [
      "Décision de crédit accélérée",
      "Fraude détectée avant impact",
      "Satisfaction client maximale",
      "Conformité réglementaire allégée",
      "Paiements digitaux intégrés",
    ],
    recommendedServices: [
      "web",
      "ai",
      "chatbot",
      "automation",
      "data-analysis",
      "payment-integration",
      "whatsapp-automation",
    ],
  },
  {
    slug: "juridique",
    name: "Juridique",
    icon: Scale,
    shortDescription:
      "Gestion documentaire IA, chatbot d’accueil client, automatisation des actes, analyse de jurisprudence.",
    fullDescription:
      "Votre cabinet d’avocats modernise sa relation client avec un site vitrine et un espace client sécurisé. L’IA analyse les contrats et recherche des jurisprudences pertinentes. Un chatbot qualifie les prospects et prend les premières informations (même sur WhatsApp). L’automatisation génère des modèles d’actes et planifie les rendez-vous. L’analyse de données identifie vos domaines les plus rentables.",
    image:
      "https://images.unsplash.com/photo-1589578527966-f6a2de1c6b5c?w=800&h=600&fit=crop",
    benefits: [
      "Recherche juridique accélérée",
      "Gain de temps sur les tâches répétitives",
      "Acquisition de clients rationalisée",
      "Meilleure organisation du cabinet",
    ],
    recommendedServices: [
      "web",
      "ai",
      "chatbot",
      "automation",
      "data-analysis",
      "whatsapp-automation",
      "scheduling",
    ],
  },
//   {
//     slug: "securite",
//     name: "Sécurité",
//     icon: Shield,
//     shortDescription:
//       "Surveillance IA, alertes automatiques, contrôle d’accès, analyse de risques en temps réel.",
//     fullDescription:
//       "Entreprises et institutions : nous déployons des systèmes de sécurité intelligents combinant vidéosurveillance, IA de détection d’intrusion, contrôle d’accès connecté et alertes automatiques (SMS, appels, WhatsApp). Les flux vidéo sont analysés en temps réel pour identifier des comportements suspects. La gestion des incidents est automatisée et tracée. Tableaux de bord opérationnels pour la sécurité des sites.",
//     image:
//       "https://images.unsplash.com/photo-1558001378-50b7e2f25a5e?w=800&h=600&fit=crop",
//     benefits: [
//       "Détection proactive des menaces",
//       "Alertes instantanées sur mobile",
//       "Réduction du besoin de personnel de garde",
//       "Historique horodaté de tous les événements",
//     ],
//     recommendedServices: [
//       "web",
//       "ai",
//       "chatbot",
//       "automation",
//       "data-analysis",
//       "whatsapp-automation",
//     ],
//   },
  {
    slug: "eglise",
    name: "Église",
    icon: Church,
    shortDescription:
      "Gestion des dons, diffusion en direct, chatbot communautaire, agenda paroissial, communication fidèles.",
    fullDescription:
      "Votre paroisse ou communauté religieuse dispose d’un site web moderne avec diffusion des offices en direct et en différé. Un système de don en ligne (Moncash, carte bancaire) simplifie la collecte. Le chatbot répond aux questions des fidèles 24/7 et relaie les intentions de prière. L’agenda partagé rappelle automatiquement les événements. Envoi de newsletters et messages WhatsApp pour garder le lien.",
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80cd3a1?w=800&h=600&fit=crop",
    benefits: [
      "Fidélisation de la communauté",
      "Collecte de dons simplifiée et sécurisée",
      "Annonces automatisées (SMS, WhatsApp, email)",
      "Gain de temps pour le secrétariat",
    ],
    recommendedServices: [
      "web",
      "chatbot",
      "automation",
      "whatsapp-automation",
      "email-marketing",
      "payment-integration",
      "video-production",
    ],
  },
//   {
//     slug: "gouvernement",
//     name: "Gouvernement",
//     icon: Building2,
//     shortDescription:
//       "Portail citoyen, chatbot administratif, automatisation des dossiers, analyse de données publiques.",
//     fullDescription:
//       "Modernisez l’administration avec une plateforme citoyenne centralisée. L’IA assiste le traitement des demandes et la recherche documentaire. Un chatbot 24/7 répond aux questions courantes et oriente les usagers. L’automatisation fluidifie les processus internes (relances, validation, archivage). Analyse de données pour la prise de décision publique. Notifications multicanaux (SMS, email, WhatsApp).",
//     image:
//       "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
//     benefits: [
//       "Service public accessible 24/7",
//       "Réduction du temps de traitement des dossiers",
//       "Traçabilité totale des échanges",
//       "Décisions basées sur des données fiables",
//     ],
//     recommendedServices: [
//       "web",
//       "ai",
//       "chatbot",
//       "automation",
//       "data-analysis",
//       "whatsapp-automation",
//     ],
//   },
//   {
//     slug: "partis-politiques",
//     name: "Partis Politiques",
//     icon: Vote,
//     shortDescription:
//       "Gestion des adhérents, campagne email/SMS, chatbot militant, collecte de fonds, analyse électorale.",
//     fullDescription:
//       "Structurez votre parti avec un CRM dédié : gestion des membres, cartographie électorale, segmentation des sympathisants. Des chatbots animent les conversations sur WhatsApp et Messenger. Automatisation des campagnes email/SMS personnalisées. Module de collecte de dons en ligne (Moncash, carte). L’IA analyse les tendances d’opinion et identifie les électeurs indécis.",
//     image:
//       "https://images.unsplash.com/photo-1529327274826-ef6b4c35b2c8?w=800&h=600&fit=crop",
//     benefits: [
//       "Mobilisation rapide de vos militants",
//       "Communication ciblée par zone géographique",
//       "Suivi en temps réel de vos campagnes",
//       "Transparence financière des dons",
//     ],
//     recommendedServices: [
//       "web",
//       "ai",
//       "chatbot",
//       "automation",
//       "data-analysis",
//       "whatsapp-automation",
//       "email-marketing",
//       "payment-integration",
//     ],
//   },
];