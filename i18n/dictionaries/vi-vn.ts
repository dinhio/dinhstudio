import type { TranslationDictionary } from "@/i18n/dictionaries/en-us";

export const viVN = {
  localeName: "Tiếng Việt (Việt Nam)",
  translationStatus: "Một số phần giao diện đã được dịch sang tiếng Việt.",
  vietnamesePlaceholder: "Không gian dịch đã sẵn sàng; nội dung có thể thêm dần theo từng khóa.",
  nav: {
    work: "Dự án",
    services: "Dịch vụ",
    about: "Giới thiệu",
    contact: "Liên hệ",
    getInTouch: "Liên hệ ngay",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    mainNavigation: "Điều hướng chính",
    mobileNavigation: "Điều hướng di động",
    navigationMenu: "Menu điều hướng",
  },
  home: {
    introHeading: "Chúng tôi tạo ra trải nghiệm số thu hút và chuyển đổi.",
    introBody:
      "dinhstudio là studio thiết kế và phát triển web, chuyên xây dựng các website đẹp mắt, hiệu năng cao để giúp doanh nghiệp nổi bật trong môi trường số.",
    exploreServices: "Khám phá dịch vụ",
    stats: {
      projectsDelivered: "Dự án đã hoàn thành",
      clientSatisfaction: "Mức độ hài lòng khách hàng",
      yearsExperience: "Năm kinh nghiệm",
      supportAvailable: "Hỗ trợ sẵn sàng",
    },
    servicesTitle: "Dịch vụ của chúng tôi",
    viewAll: "Xem tất cả",
    serviceCards: {
      kickstartTitle: "Khởi động",
      kickstartDescription: "Bắt đầu mới với website được thiết kế riêng theo tầm nhìn của bạn.",
      revampTitle: "Làm mới",
      revampDescription: "Nâng cấp website hiện tại thành một trải nghiệm vượt trội.",
      sustainTitle: "Duy trì",
      sustainDescription: "Lưu trữ, bảo trì và hỗ trợ liên tục cho website của bạn.",
    },
    ctaHeading: "Sẵn sàng biến ý tưởng của bạn thành hiện thực?",
    ctaBody: "Hãy cùng hợp tác để tạo một website thể hiện đúng thương hiệu và tạo kết quả thực tế.",
    ctaButton: "Liên hệ ngay",
  },
} as const satisfies TranslationDictionary;
