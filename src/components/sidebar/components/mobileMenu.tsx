import { RefObject } from 'react';
import { styles } from '../styles';
import { NavLink } from './navLink';
import { NavigationItem } from '../types';

interface MobileMenuProps {
  isOpen: boolean;
  menuRef: RefObject<HTMLDivElement>;
  selected: string;
  setSelected: (value: string) => void;
  setIsMenuOpen: (value: boolean) => void;
  navigationItems: NavigationItem[];
  logo: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  menuRef,
  selected,
  setSelected,
  setIsMenuOpen,
  navigationItems,
  logo,
}) => {
  return (
    <div
      ref={menuRef}
      className={`${styles.mobileMenu} ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className={styles.mobileNav}>
        <img src={logo} alt="Ravn Logo" className={styles.mobileLogo} />
        <nav className="flex flex-col gap-4">
          {navigationItems.map((item) => (
            <NavLink
              key={item.id}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isSelected={selected === item.id}
              onClick={() => {
                setSelected(item.id);
                setIsMenuOpen(false);
              }}
              isMobile
            />
          ))}
        </nav>
      </div>
    </div>
  );
};