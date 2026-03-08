export const enUS = {
  localeName: "English (United States)",
  translationStatus: "English content is currently the canonical source.",
  vietnamesePlaceholder: "Vietnamese copy can be added key-by-key without changing route structure.",
  nav: {
    work: "Work",
    services: "Services",
    about: "About",
    contact: "Contact",
    getInTouch: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    navigationMenu: "Navigation menu",
  },
  home: {
    introHeading: "We craft digital experiences that captivate and convert.",
    introBody:
      "dinhstudio is a web design and development studio dedicated to building beautiful, high-performance websites that help businesses stand out in the digital landscape.",
    exploreServices: "Explore our services",
    stats: {
      projectsDelivered: "Projects Delivered",
      clientSatisfaction: "Client Satisfaction",
      yearsExperience: "Years Experience",
      supportAvailable: "Support Available",
    },
    servicesTitle: "Our Services",
    viewAll: "View all",
    serviceCards: {
      kickstartTitle: "Kickstart",
      kickstartDescription: "Start fresh with a brand new website tailored to your vision.",
      revampTitle: "Revamp",
      revampDescription: "Transform your existing website into something extraordinary.",
      sustainTitle: "Sustain",
      sustainDescription: "Ongoing hosting, maintenance, and support for your site.",
    },
    ctaHeading: "Ready to bring your vision to life?",
    ctaBody: "Let's collaborate to create a website that truly represents your brand and drives results.",
    ctaButton: "Get in touch",
  },
} as const;

export type TranslationDictionary = typeof enUS;
