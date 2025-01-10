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
    <div className="lg:hidden relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 text-neutral-2 hover:text-neutral-1"
      >
        <i className={`text-2xl ${isOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-5"> {/* Set to bg-neutral-5 */}
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="sticky top-0 flex justify-between items-center p-4 bg-neutral-5">
              <img src="/assets/ravn.svg" alt="Ravn Logo" className="h-8" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-neutral-2 hover:text-neutral-1"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <nav className="flex-1 p-4">
              {NAVIGATION_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isSelected={selectedItem === item.id}
                  onClick={() => handleNavClick(item.id)}
                  isMobile={true}
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
