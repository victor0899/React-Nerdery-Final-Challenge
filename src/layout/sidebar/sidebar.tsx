import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS } from './constants';
import { MobileHeader } from './components/mobileMenu/mobileHeader';
import { MobileMenuOverlay } from './components/mobileMenu/mobileMenuOverlay';
import { DesktopSidebar } from './components/desktopSidebar/desktopSidebar';

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

  const toggleMobileMenu = () => {
    const newMenuState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newMenuState);
    document.body.style.overflow = newMenuState ? 'hidden' : 'auto';
  };

  return (
    <>
      <MobileHeader 
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      <MobileMenuOverlay 
        isOpen={isMobileMenuOpen}
        selectedItem={selectedItem}
        onItemSelect={setSelectedItem}
        onClose={toggleMobileMenu}
      />

      <DesktopSidebar 
        selectedItem={selectedItem}
        onItemSelect={setSelectedItem}
        className={className}
      />
    </>
  );
};

export default Sidebar;