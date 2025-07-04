export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface HeaderProps {
  className?: string;
  onSearch?: (query: string) => void;
  cartItemCount?: number;
  isAuthenticated?: boolean;
}

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export interface NavigationProps {
  items?: NavigationItem[];
  className?: string;
}
