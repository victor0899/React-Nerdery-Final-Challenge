import { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: string;
  className?: string;
  defaultValue?: string;
}

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  icon, 
  className = '',
  defaultValue 
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    if (defaultValue && !value) {
      onChange(defaultValue);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <div
        className={`w-32 h-8 px-6 bg-neutral-2/10 rounded-lg text-neutral-1 cursor-pointer flex items-center ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`${icon} mr-2`}></i>
        <span className="text-sm truncate flex-grow">
          {(!value || value === '') ? placeholder : selectedOption?.label}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#393D41] border border-[#94979A] rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-6 py-1 text-sm text-neutral-1 hover:bg-neutral-2/10 cursor-pointer"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;