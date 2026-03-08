export interface TranslationDictionary {
  localeName: string;
  translationStatus: string;
  vietnamesePlaceholder: string;
  nav: {
    work: string;
    services: string;
    about: string;
    contact: string;
    getInTouch: string;
    openMenu: string;
    closeMenu: string;
    mainNavigation: string;
    mobileNavigation: string;
    navigationMenu: string;
  };
  home: {
    introHeading: string;
    introBody: string;
    exploreServices: string;
    stats: {
      projectsDelivered: string;
      clientSatisfaction: string;
      yearsExperience: string;
      supportAvailable: string;
    };
    servicesTitle: string;
    viewAll: string;
    serviceCards: {
      kickstartTitle: string;
      kickstartDescription: string;
      revampTitle: string;
      revampDescription: string;
      sustainTitle: string;
      sustainDescription: string;
    };
    ctaHeading: string;
    ctaBody: string;
    ctaButton: string;
  };
}

export const enUS: TranslationDictionary = {
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
};
