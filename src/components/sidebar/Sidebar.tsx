import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ravn from '../../assets/ravn.svg';
import { NavLink } from './components/navLink';
import { MobileMenu } from './components/mobileMenu';

const NAVIGATION_ITEMS = [
  {
    id: 'dashboard',
    href: '/dashboard',
    icon: 'ri-dashboard-line',
    label: 'Dashboard'
  },
  {
    id: 'tasks',
    href: '/tasks',
    icon: 'ri-task-line',
    label: 'My Tasks'
  },
  {
    id: 'profile',
    href: '/profile',
    icon: 'ri-user-line',
    label: 'Profile'
  },
  {
    id: 'about',
    href: '/about',
    icon: 'ri-information-line',
    label: 'About'
  }
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    return path || 'dashboard';
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const path = location.pathname.substring(1);
    setSelected(path || 'dashboard');
  }, [location]);

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

  const handleNavClick = (id: string) => {
    setSelected(id);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[232px] h-[836px] bg-neutral-4 rounded-3xl relative">
        <img src={ravn} alt="Ravn Logo" className="absolute w-10 h-10 top-3 left-24" />
        <nav className="flex flex-col pt-24">
          {NAVIGATION_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isSelected={selected === item.id}
              onClick={() => handleNavClick(item.id)}
            />
          ))}
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          ref={buttonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-4 left-4 z-50 text-neutral-1"
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

export default Sidebar;