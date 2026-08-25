// Service-category copy shared by the services route family and the XML sitemap.

export const serviceCategories = {
  agriculture: {
    title: "Agriculture Services",
    icon: "bi bi-tree-fill",
    label: "Agriculture",
    description: "Information for farmers, growers, livestock raisers, and agriculture-related livelihoods.",
    topics: ["Farm and crop support", "Training and extension information", "Agriculture program announcements"],
  },
  business: {
    title: "Business Services",
    icon: "bi bi-shop",
    label: "Business",
    description: "Information related to local business registration, permits, trade, and enterprise support.",
    topics: ["Business-permit information", "Local enterprise programs", "Trade and investment updates"],
  },
  certificates: {
    title: "Certificates & Vital Records",
    icon: "bi bi-file-earmark-text-fill",
    label: "Certificates",
    description: "Information about civil registration and requests for local certificates or records.",
    topics: ["Civil-registration information", "Birth, marriage, and death records", "Local certification requests"],
  },
  education: {
    title: "Education Services",
    icon: "bi bi-mortarboard-fill",
    label: "Education",
    description: "Information related to education, training, and scholarship opportunities.",
    topics: ["Education program announcements", "Scholarship information", "Skills and training opportunities"],
  },
  environment: {
    title: "Environment Services",
    icon: "bi bi-globe-americas",
    label: "Environment",
    description: "Information related to local environmental management and natural resources.",
    topics: ["Environmental permits and clearances", "Waste-management information", "Conservation program updates"],
  },
  health: {
    title: "Health Services",
    icon: "bi bi-heart-pulse-fill",
    label: "Health",
    description: "General information about local public-health programs and facilities.",
    topics: ["Public-health program updates", "Primary-care information", "Health campaign announcements"],
  },
  infrastructure: {
    title: "Infrastructure Services",
    icon: "bi bi-building-fill-gear",
    label: "Infrastructure",
    description: "Information related to local public works, facilities, roads, and project updates.",
    topics: ["Public-works information", "Infrastructure project updates", "Construction-related public records"],
  },
  "public-safety": {
    title: "Public Safety Services",
    icon: "bi bi-shield-fill-check",
    label: "Public Safety",
    description: "General preparedness, safety, and disaster-risk information.",
    topics: ["Preparedness information", "Safety program updates", "Disaster-risk public information"],
  },
  "social-services": {
    title: "Social Services",
    icon: "bi bi-people-fill",
    label: "Social Services",
    description: "Information about social-welfare programs and assistance categories.",
    topics: ["Social-welfare information", "Community assistance programs", "Program announcements"],
  },
  "tax-payments": {
    title: "Tax & Payments",
    icon: "bi bi-cash-coin",
    label: "Taxation",
    description: "General information related to local taxes, assessments, and government payment categories.",
    topics: ["Local tax information", "Assessment and payment categories", "Treasury-related public notices"],
  },
} as const;
