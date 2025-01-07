import { useState, useEffect, useRef } from 'react';
import ravn from '../../assets/ravn.svg';
import { styles } from './styles';
import { NavLink } from './components/navLink';
import { MobileMenu } from './components/mobileMenu';
import { NAVIGATION_ITEMS } from './constants';

export const Sidebar: React.FC = () => {
  const [selected, setSelected] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={styles.sidebar}>
        <img src={ravn} alt="Ravn Logo" className={styles.logo} />
        <nav className={styles.nav}>
          {NAVIGATION_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isSelected={selected === item.id}
              onClick={() => setSelected(item.id)}
            />
          ))}
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          ref={buttonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={styles.mobileButton}
        >
          <i className={`text-2xl ${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
        </button>

        <MobileMenu
          isOpen={isMenuOpen}
          menuRef={menuRef}
          selected={selected}
          setSelected={setSelected}
          setIsMenuOpen={setIsMenuOpen}
          navigationItems={NAVIGATION_ITEMS}
          logo={ravn}
        />
      </div>
    </>
  );
};