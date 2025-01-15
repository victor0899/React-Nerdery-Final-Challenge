import { NavLink } from '../navLink';
import { NAVIGATION_ITEMS } from '../../constants';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  selectedItem: string;
  onItemSelect: (id: string) => void;
  onClose: () => void;
}

export const MobileMenuOverlay = ({ 
  isOpen, 
  selectedItem, 
  onItemSelect, 
  onClose 
}: MobileMenuOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-40 bg-neutral-5/95 transition-all duration-300"
      onClick={onClose}
    >
      <div 
        className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-neutral-3">
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={onClose}
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
                      onItemSelect(item.id);
                      onClose();
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
  );
};