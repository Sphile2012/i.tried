import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn('flex h-10 w-full rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-slate-400 focus:border-blue-500', className)}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
