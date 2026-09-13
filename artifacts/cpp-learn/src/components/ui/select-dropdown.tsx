/**
 * Consistent Select Dropdown Component
 * Navy background, light text, sky blue accents
 * Animated chevron arrow
 */

import { ChevronDown } from 'lucide-react';
import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectDropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  variant?: 'default' | 'light' | 'dark';
}

const SelectDropdown = forwardRef<HTMLSelectElement, SelectDropdownProps>(
  ({ options, placeholder, variant = 'default', className = '', ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'light':
          return 'bg-[#F5F7FF] text-[#0A1931] border-[#0A1931]/10 focus:border-[#38BDF8]';
        case 'dark':
          return 'bg-[#0A1931] text-[#F5F7FF] border-[#F5F7FF]/20 focus:border-[#38BDF8]';
        default:
          return 'bg-[#F5F7FF]/10 text-[#F5F7FF] border-[#F5F7FF]/20 focus:border-[#38BDF8]';
      }
    };

    return (
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full appearance-none rounded-lg px-4 py-2.5 pr-10
            font-medium text-sm
            border-2 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20
            cursor-pointer
            ${getVariantClasses()}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown 
          className={`
            absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none
            transition-transform duration-200
            ${variant === 'light' ? 'text-[#38BDF8]' : 'text-[#38BDF8]'}
          `}
        />
      </div>
    );
  }
);

SelectDropdown.displayName = 'SelectDropdown';

export { SelectDropdown };
