import { useState } from 'react';
import { NavLink } from '../navLink';
import { NAVIGATION_ITEMS } from '../../constants';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(NAVIGATION_ITEMS[0].id);

  const handleNavClick = (id: string) => {
    setSelectedItem(id);
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-neutral-2 hover:text-neutral-1"
      >
        <i className={`text-2xl ${isOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-5">
          <div className="flex flex-col p-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-neutral-2 hover:text-neutral-1"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {NAVIGATION_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isSelected={selectedItem === item.id}
                  onClick={() => handleNavClick(item.id)}
                  isMobile={false}
                />
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;