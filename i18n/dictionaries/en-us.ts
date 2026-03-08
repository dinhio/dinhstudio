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
  about: {
    heroTitle: string;
    heroBody: string;
    missionTitle: string;
    missionBodyOne: string;
    missionBodyTwo: string;
    valuesTitle: string;
    valueCards: {
      craftsmanshipTitle: string;
      craftsmanshipDescription: string;
      collaborationTitle: string;
      collaborationDescription: string;
      innovationTitle: string;
      innovationDescription: string;
    };
    capabilitiesTitle: string;
    capabilities: {
      webDesignTitle: string;
      webDesignItems: string[];
      developmentTitle: string;
      developmentItems: string[];
      strategyTitle: string;
      strategyItems: string[];
      supportTitle: string;
      supportItems: string[];
    };
    techTitle: string;
    ctaTitle: string;
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
  about: {
    heroTitle: "About",
    heroBody:
      "A passionate web design studio dedicated to crafting beautiful, high-performance digital experiences.",
    missionTitle: "We believe great design is the foundation of great business.",
    missionBodyOne:
      "dinhstudio was founded on the belief that every business deserves a stunning digital presence. We combine thoughtful design with cutting-edge technology to create websites that not only look beautiful but drive real results.",
    missionBodyTwo:
      "Our approach is collaborative and transparent. We work closely with our clients to understand their vision, goals, and audience, then translate that understanding into digital experiences that exceed expectations.",
    valuesTitle: "Our Values",
    valueCards: {
      craftsmanshipTitle: "Craftsmanship",
      craftsmanshipDescription: "We take pride in every pixel, every line of code. Quality is never compromised.",
      collaborationTitle: "Collaboration",
      collaborationDescription: "The best work happens when we work together. Your input shapes our process.",
      innovationTitle: "Innovation",
      innovationDescription: "We stay ahead of trends and technologies to deliver cutting-edge solutions.",
    },
    capabilitiesTitle: "What we do",
    capabilities: {
      webDesignTitle: "Web Design",
      webDesignItems: ["UI/UX Design", "Brand Identity", "Design Systems", "Prototyping"],
      developmentTitle: "Development",
      developmentItems: ["Custom Websites", "Web Applications", "E-commerce", "CMS Integration"],
      strategyTitle: "Strategy",
      strategyItems: ["Content Strategy", "SEO Optimization", "User Research", "Analytics"],
      supportTitle: "Support",
      supportItems: ["Managed Hosting", "Maintenance", "Performance", "Security"],
    },
    techTitle: "Technologies we love",
    ctaTitle: "Ready to start a project?",
    ctaBody: "Let's create something amazing together.",
    ctaButton: "Get in touch",
  },
};
