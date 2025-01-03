import { useState, useEffect, useRef } from 'react';
import ravn from '../../assets/ravn.svg';

const linkStyle = "flex items-center gap-2 text-body-m text-neutral-2 hover:text-neutral-1 uppercase relative pl-4 h-14";
const selectedStyle = "bg-gradient-to-r from-[rgba(186,37,37,0)] to-[rgba(210,77,77,0.1)] w-[232px] text-primary-4";
const rectangleStyle = "absolute right-0 top-0 w-1 h-14 bg-primary-4";

const Sidebar: React.FC = () => {
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[232px] h-[calc(100vh-32px)] bg-neutral-4 rounded-3xl py-3 px-0 relative">
        <img src={ravn} alt="Ravn Logo" className="absolute w-10 h-10 top-3 left-24" />
        <nav className="flex flex-col gap-4 pt-24">
          <a
            href="/dashboard"
            className={`${linkStyle} ${selected === 'dashboard' ? selectedStyle : ''}`}
            onClick={() => setSelected('dashboard')}
          >
            <i className="ri-function-line"></i>
            DASHBOARD
            {selected === 'dashboard' && <div className={rectangleStyle}></div>}
          </a>
          <a
            href="/tasks"
            className={`${linkStyle} ${selected === 'tasks' ? selectedStyle : ''}`}
            onClick={() => setSelected('tasks')}
          >
            <i className="ri-menu-line"></i>
            MY TASK
            {selected === 'tasks' && <div className={rectangleStyle}></div>}
          </a>
        </nav>
      </aside>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button 
          ref={buttonRef}
          onClick={toggleMenu}
          className="fixed top-4 left-4 z-50 text-neutral-1"
        >
          <i className={`text-2xl ${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          ref={menuRef}
          className={`fixed top-0 left-0 h-full w-64 bg-neutral-4 shadow-lg transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}
        >
          <div className="pt-20 px-4">
            <img src={ravn} alt="Ravn Logo" className="w-10 h-10 mb-8 mx-auto" />
            <nav className="flex flex-col gap-4">
              <a
                href="/dashboard"
                className={`${linkStyle} ${selected === 'dashboard' ? 'text-primary-4' : ''}`}
                onClick={() => {
                  setSelected('dashboard');
                  setIsMenuOpen(false);
                }}
              >
                <i className="ri-function-line"></i>
                DASHBOARD
              </a>
              <a
                href="/tasks"
                className={`${linkStyle} ${selected === 'tasks' ? 'text-primary-4' : ''}`}
                onClick={() => {
                  setSelected('tasks');
                  setIsMenuOpen(false);
                }}
              >
                <i className="ri-menu-line"></i>
                MY TASK
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export { Sidebar };