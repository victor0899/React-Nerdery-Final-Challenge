export interface NavigationItem {
    id: string;
    href: string;
    icon: string;
    label: string;
  }
  
  export interface NavLinkProps {
    href: string;
    icon: string;
    label: string;
    isSelected: boolean;
    onClick: () => void;
    isMobile?: boolean;
  }