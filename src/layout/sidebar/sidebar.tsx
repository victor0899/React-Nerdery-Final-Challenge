import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS } from './constants';
import { NavLink } from './components/navLink';
import { MobileMenu } from './components/mobileMenu';

export const Sidebar = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = NAVIGATION_ITEMS.find(item => {
      if (currentPath === '/') {
        return item.href === '/' || item.id === 'dashboard';
      }
      return item.href === currentPath;
    });
    
    if (currentItem) {
      setSelectedItem(currentItem.id);
    }
  }, [location]);

  return (
    <>
      {/* Mobile Menu */}
      <div className="lg:hidden w-full border-b border-neutral-3">
        <MobileMenu />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[240px] bg-neutral-4 border-r border-neutral-3">
        <div className="p-6">
          <img 
            src="/assets/ravn.svg" 
            alt="Ravn Logo" 
            className="h-8"
          />
        </div>
        
        <nav className="flex-1 px-4 py-2">
          <ul className="space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.id}>
                <NavLink
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isSelected={selectedItem === item.id}
                  onClick={() => setSelectedItem(item.id)}
                  isMobile={false}
                />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;