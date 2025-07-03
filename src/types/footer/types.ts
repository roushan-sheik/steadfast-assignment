export interface FooterLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hoverColor: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  image: string;
  bgColor: string;
  textColor: string;
}

export interface AppStore {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  hoverColor: string;
  label: string;
  subtitle: string;
}

export interface ContactInfo {
  address: {
    line1: string;
    line2: string;
  };
  phone: string;
  email: string;
  supportPhone: string;
}

export interface FooterProps {
  className?: string;
  contactInfo?: ContactInfo;
  socialLinks?: SocialLink[];
  paymentMethods?: PaymentMethod[];
  appStores?: AppStore[];
}
