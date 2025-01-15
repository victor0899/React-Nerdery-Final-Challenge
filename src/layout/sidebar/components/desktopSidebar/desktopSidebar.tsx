import { NavLink } from '../navLink';
import { NAVIGATION_ITEMS } from '../../constants';
import ravnLogo from '../../../../assets/ravn.svg';


interface DesktopSidebarProps {
  selectedItem: string;
  onItemSelect: (id: string) => void;
  className?: string;
}

export const DesktopSidebar = ({ 
  selectedItem, 
  onItemSelect,
  className = ''
}: DesktopSidebarProps) => {
  return (
    <aside className={`hidden lg:flex flex-col w-[240px] h-[calc(100vh-64px)] bg-neutral-4 ml-8 mt-8 rounded-2xl ${className}`}>
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
                onClick={() => onItemSelect(item.id)}
                isMobile={false}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};