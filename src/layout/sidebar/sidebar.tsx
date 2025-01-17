import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS } from './constants';
import { NavLink } from './components/navLink';
import ravnLogo from '../../assets/ravn.svg'

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className = '' }: SidebarProps) => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="sticky top-0 z-30 lg:hidden w-full bg-neutral-4 border-neutral-3">
        <div className="flex items-center justify-between px-4 py-3">
        <img src={ravnLogo} alt="Ravn Logo" />
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-neutral-2 hover:text-neutral-1 focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <i className={`text-2xl ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-neutral-5/95 transition-all duration-300"
            onClick={toggleMobileMenu}
          >
            <div 
              className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-neutral-3">
                  <span className="text-lg font-semibold">Menu</span>
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 text-neutral-2 hover:text-neutral-1 focus:outline-none"
                    aria-label="Close menu"
                  >
                    <i className="ri-close-line text-2xl" />
                  </button>
                </div>
                
                <nav className="flex-1 overflow-y-auto p-4">
                  <ul className="space-y-2">
                    {NAVIGATION_ITEMS.map((item) => (
                      <li key={item.id}>
                        <NavLink
                          href={item.href}
                          icon={item.icon}
                          label={item.label}
                          isSelected={selectedItem === item.id}
                          onClick={() => {
                            setSelectedItem(item.id);
                            toggleMobileMenu();
                          }}
                          isMobile={true}
                        />
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col w-[240px] h-[calc(100vh-64px)] bg-neutral-4  ml-8 mt-8 rounded-2xl ${className}`}>
      <div className="p-6 flex justify-center items-center">
      <img src={ravnLogo} alt="Ravn Logo" />
      </div>
        
        <nav className="flex-1 overflow-y-auto">
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