'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
 

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[color:var(--color-black)] text-[color:var(--color-white)] hover:bg-[color:var(--color-gray-800)] focus:ring-[color:var(--color-gray-500)]',
    secondary: 'bg-[color:var(--color-gray-100)] text-[color:var(--color-neutral-900)] hover:bg-[color:var(--color-gray-200)] focus:ring-[color:var(--color-gray-300)]',
    outline: 'border border-[color:var(--color-gray-300)] text-[color:var(--color-neutral-900)] hover:bg-[color:var(--color-gray-50)] focus:ring-[color:var(--color-gray-300)]',
    ghost: 'text-[color:var(--color-neutral-900)] hover:bg-[color:var(--color-gray-100)] focus:ring-[color:var(--color-gray-300)]'
  };

  const sizes = {
    sm: 'px-3 py-2 text-body3 rounded-md gap-2',
    md: 'px-4 py-2.5 text-body2 rounded-lg gap-2',
    lg: 'px-6 py-3 text-body1 rounded-lg gap-3'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5'
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={iconSizes[size]}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={iconSizes[size]}>{icon}</span>
      )}
    </button>
  );
};

export default Button;