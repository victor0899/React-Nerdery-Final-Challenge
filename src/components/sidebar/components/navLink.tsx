import { NavLinkProps } from '../types';
import { styles } from '../styles';

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  icon,
  label,
  isSelected,
  onClick,
  isMobile = false,
}) => {
  if (isMobile) {
    return (
      <a
        href={href}
        className={`${styles.link} ${isSelected ? 'text-primary-4' : ''}`}
        onClick={onClick}
      >
        <i className={icon}></i>
        {label}
      </a>
    );
  }

  return (
    <div className={styles.linkContainer}>
      <a
        href={href}
        className={`${styles.link} ${isSelected ? styles.selected : ''}`}
        onClick={onClick}
      >
        <i className={icon}></i>
        {label}
        {isSelected && <div className={styles.rectangle}></div>}
      </a>
    </div>
  );
};