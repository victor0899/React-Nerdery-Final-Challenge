import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  href: string;
  icon: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  isMobile?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  icon,
  label,
  isSelected,
  onClick,
  isMobile = false,
}) => {
  const linkBaseStyles = "flex items-center gap-2 text-body-m uppercase h-14 pl-4 relative w-full";
  const linkStyles = isSelected 
    ? `${linkBaseStyles} bg-gradient-to-r from-[rgba(186,37,37,0)] to-[rgba(210,77,77,0.1)] text-primary-4`
    : `${linkBaseStyles} text-neutral-2 hover:text-neutral-1`;

  if (isMobile) {
    return (
      <Link
        to={href}
        className={`${linkBaseStyles} ${isSelected ? 'text-primary-4' : 'text-neutral-2 hover:text-neutral-1'}`}
        onClick={onClick}
      >
        <i className={icon}></i>
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <div className="relative w-full">
      <Link
        to={href}
        className={linkStyles}
        onClick={onClick}
      >
        <i className={icon}></i>
        <span>{label}</span>
        {isSelected && <div className="absolute right-0 top-0 w-1 h-14 bg-primary-4"></div>}
      </Link>
    </div>
  );
};

export default NavLink;