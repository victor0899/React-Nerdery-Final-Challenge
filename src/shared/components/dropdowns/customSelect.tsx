import { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder: string;
  icon?: string;
  className?: string;
  defaultValue?: string | string[];
  isMulti?: boolean;
}


const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  icon, 
  className = '',
  defaultValue,
  isMulti = false
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedValues = isMulti ? (Array.isArray(value) ? value : []) : [value as string];
  const selectedOptions = options.filter(option => selectedValues.includes(option.value));

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

  const handleOptionClick = (optionValue: string) => {
    if (isMulti) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return placeholder;
    }
    
    if (isMulti) {
      if (selectedOptions.length === 0) return placeholder;
      if (selectedOptions.length === 1) return selectedOptions[0].label;
      return `${selectedOptions[0].label} +${selectedOptions.length - 1}`;
    }
    
    return selectedOptions[0]?.label || placeholder;
  };

  return (
    <div className="relative" ref={selectRef}>
      <div
        className={`w-32 h-8 px-6 bg-neutral-2/10 rounded-lg text-neutral-1 cursor-pointer flex items-center ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`${icon} mr-2`}></i>
        <span className="text-sm truncate flex-grow">
          {getDisplayText()}
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
              className={`px-6 py-1 text-sm text-neutral-1 hover:bg-neutral-2/10 cursor-pointer flex items-center justify-between ${
                selectedValues.includes(option.value) ? 'bg-neutral-2/20' : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              <span>{option.label}</span>
              {isMulti && selectedValues.includes(option.value) && (
                <svg
                  className="w-4 h-4 text-primary-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;