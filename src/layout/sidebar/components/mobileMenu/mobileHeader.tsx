import ravnLogo from '../../../../assets/ravn.svg';

interface MobileHeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const MobileHeader = ({ isMobileMenuOpen, toggleMobileMenu }: MobileHeaderProps) => {
  return (
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
    </div>
  );
};