export interface SocialLink {
    YOUTUBE: string;
    INSTAGRAM: string;
    FACEBOOK: string;
    WHATSAPP: string;
    PHONE_LINK: string;
    MAIL: string;
    OWNER_MAIL: string;
}

export interface ContactInfo {
    PHONE: string;
      LOCATIONS: {
        CABA: {
          LONG_TITLE: string;
          SHORT_TITLE: string;
          ADDRESS: string;
        };
        CHIVILCOY: {
          LONG_TITLE: string;
          SHORT_TITLE: string;
          ADDRESS: string;
        };
    };
    NAME: string;
    BRAND: string;
}