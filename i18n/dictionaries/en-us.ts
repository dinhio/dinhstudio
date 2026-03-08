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
  services: {
    heroTitle: string;
    heroBody: string;
    plans: Array<{
      id: string;
      title: string;
      subtitle: string;
      description: string;
      features: string[];
    }>;
    getStarted: string;
    processTitle: string;
    processBody: string;
    processSteps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
    includedTitle: string;
    includedBody: string;
    discussProject: string;
    includedItems: Array<{
      title: string;
      description: string;
    }>;
    faqTitle: string;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  work: {
    heroTitle: string;
    heroBody: string;
    featuredLabel: string;
    viewProject: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    projects: Array<{
      id: string;
      title: string;
      category: string;
      description: string;
      image: string;
      testimonial: {
        quote: string;
        author: string;
        role: string;
      };
      link: string;
      featured?: boolean;
    }>;
  };
  contact: {
    heroTitle: string;
    heroBody: string;
    emailLabel: string;
    responseTimeTitle: string;
    responseTimeBody: string;
    basedInTitle: string;
    basedInBody: string;
    availabilityTitle: string;
    availabilityBody: string;
    nextTitle: string;
    nextSteps: Array<{
      step: string;
      title: string;
      description: string;
    }>;
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
  services: {
    heroTitle: "Services",
    heroBody:
      "Whether you're starting from scratch, reimagining your existing presence, or need ongoing support, we have a solution tailored for you.",
    plans: [
      {
        id: "kickstart",
        title: "Kickstart",
        subtitle: "Start Fresh",
        description:
          "Launch your digital presence with a brand new website tailored to your unique vision and business goals.",
        features: [
          "Brand Discovery Session",
          "Custom Design Concepts",
          "Responsive Development",
          "Content Strategy",
          "SEO Foundation",
          "Launch Support",
          "30-Day Post-Launch Care",
        ],
      },
      {
        id: "revamp",
        title: "Revamp",
        subtitle: "Transform & Elevate",
        description:
          "Breathe new life into your existing website with a complete redesign that modernizes your digital presence.",
        features: [
          "Site Audit & Analysis",
          "UX Improvements",
          "Modern Redesign",
          "Performance Optimization",
          "Content Migration",
          "SEO Enhancement",
          "Analytics Setup",
        ],
      },
      {
        id: "sustain",
        title: "Sustain",
        subtitle: "Ongoing Partnership",
        description:
          "Keep your website running smoothly with reliable hosting, maintenance, and continuous support.",
        features: [
          "Managed Hosting",
          "Security Monitoring",
          "Regular Backups",
          "Performance Updates",
          "Content Updates",
          "Priority Support",
          "Monthly Reports",
        ],
      },
    ],
    getStarted: "Get started",
    processTitle: "Our Process",
    processBody: "A proven methodology that ensures every project is delivered with excellence and attention to detail.",
    processSteps: [
      {
        number: "01",
        title: "Discovery",
        description: "We start by understanding your business, goals, and vision through in-depth conversations.",
      },
      {
        number: "02",
        title: "Strategy",
        description: "We develop a comprehensive plan that aligns your digital presence with your business objectives.",
      },
      {
        number: "03",
        title: "Design",
        description: "Our designers craft beautiful, user-centered interfaces that reflect your brand identity.",
      },
      {
        number: "04",
        title: "Development",
        description: "We build your website with clean code, ensuring speed, security, and scalability.",
      },
      {
        number: "05",
        title: "Launch",
        description: "After thorough testing, we deploy your site and provide training for your team.",
      },
      {
        number: "06",
        title: "Support",
        description: "We continue to support you with maintenance, updates, and strategic guidance.",
      },
    ],
    includedTitle: "Every project includes",
    includedBody:
      "Regardless of which service you choose, every project comes with our commitment to quality and your success.",
    discussProject: "Discuss your project",
    includedItems: [
      { title: "Mobile-First Design", description: "Optimized for all devices and screen sizes" },
      { title: "Performance Focus", description: "Fast loading times and smooth interactions" },
      { title: "SEO Ready", description: "Built with search engine visibility in mind" },
      { title: "Accessibility", description: "WCAG compliant for inclusive experiences" },
      { title: "Secure & Scalable", description: "Enterprise-grade security and infrastructure" },
      { title: "Documentation", description: "Complete guides for managing your site" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        question: "How long does a typical project take?",
        answer:
          "Project timelines vary based on scope and complexity. A Kickstart project typically takes 6-10 weeks, while a Revamp can be completed in 4-8 weeks.",
      },
      {
        question: "What platforms do you work with?",
        answer:
          "We specialize in modern web technologies including Next.js, React, and headless CMS solutions. We can also work with platforms like Shopify and WordPress.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Yes, we offer flexible payment options including milestone-based payments and monthly installments for larger projects.",
      },
      {
        question: "What's included in the Sustain plan?",
        answer:
          "The Sustain plan includes managed hosting, regular backups, security monitoring, performance updates, content updates, and priority support.",
      },
    ],
    ctaTitle: "Ready to get started?",
    ctaBody: "Let's discuss your project and find the perfect solution for your needs.",
    ctaButton: "Get in touch",
  },
  work: {
    heroTitle: "Our Work",
    heroBody:
      "A selection of projects we've had the pleasure of working on. Each one represents a unique collaboration and a story worth telling.",
    featuredLabel: "Featured Project",
    viewProject: "View Project",
    ctaTitle: "Want to be our next success story?",
    ctaBody: "Let's create something amazing together.",
    ctaButton: "Start your project",
    projects: [
      {
        id: "neotech-labs",
        title: "Neotech Labs",
        category: "Tech Startup",
        description: "A complete brand identity and website redesign for a cutting-edge AI research company.",
        image: "/carousel/project-2.jpg",
        testimonial: {
          quote:
            "dinhstudio transformed our digital presence completely. The new website perfectly captures our innovative spirit and has significantly improved our conversion rates.",
          author: "Sarah Chen",
          role: "CEO, Neotech Labs",
        },
        link: "/work/neotech-labs",
        featured: true,
      },
      {
        id: "artisan-bloom",
        title: "Artisan Bloom",
        category: "E-commerce",
        description: "An elegant e-commerce platform for a boutique floral design studio.",
        image: "/carousel/project-1.jpg",
        testimonial: {
          quote:
            "Working with dinhstudio was a dream. They understood our aesthetic perfectly and delivered a website that our customers love.",
          author: "Emma Richards",
          role: "Founder, Artisan Bloom",
        },
        link: "/work/artisan-bloom",
      },
      {
        id: "verdant-co",
        title: "Verdant Co",
        category: "Sustainability",
        description: "A mission-driven website for an environmental consulting firm.",
        image: "/carousel/project-3.jpg",
        testimonial: {
          quote:
            "The team at dinhstudio created a website that truly reflects our commitment to sustainability. The design is both beautiful and functional.",
          author: "Michael Torres",
          role: "Director, Verdant Co",
        },
        link: "/work/verdant-co",
      },
      {
        id: "lumina-studio",
        title: "Lumina Studio",
        category: "Photography",
        description: "A stunning portfolio website for an award-winning photography studio.",
        image: "/carousel/project-4.jpg",
        testimonial: {
          quote:
            "As visual artists ourselves, we had high expectations. dinhstudio exceeded them all with a portfolio site that showcases our work beautifully.",
          author: "David Park",
          role: "Creative Director, Lumina Studio",
        },
        link: "/work/lumina-studio",
      },
      {
        id: "aurora-digital",
        title: "Aurora Digital",
        category: "Digital Agency",
        description: "A bold, modern website for a digital marketing agency.",
        image: "/carousel/project-5.jpg",
        testimonial: {
          quote:
            "dinhstudio delivered a website that positions us as industry leaders. The design language is exactly what we envisioned.",
          author: "Jessica Williams",
          role: "Partner, Aurora Digital",
        },
        link: "/work/aurora-digital",
      },
    ],
  },
  contact: {
    heroTitle: "Let's work together",
    heroBody:
      "Have a project in mind? We'd love to hear about it. Drop us a line and let's start a conversation about bringing your vision to life.",
    emailLabel: "Email us at",
    responseTimeTitle: "Response Time",
    responseTimeBody: "We typically respond within 24-48 hours",
    basedInTitle: "Based In",
    basedInBody: "Working globally from anywhere",
    availabilityTitle: "Availability",
    availabilityBody: "Currently accepting new projects",
    nextTitle: "What happens next?",
    nextSteps: [
      {
        step: "1",
        title: "Discovery Call",
        description: "We'll schedule a call to discuss your project goals, timeline, and budget.",
      },
      {
        step: "2",
        title: "Proposal",
        description: "You'll receive a detailed proposal outlining our approach, timeline, and investment.",
      },
      {
        step: "3",
        title: "Kick-off",
        description: "Once approved, we'll begin the creative process and bring your vision to life.",
      },
    ],
  },
};
