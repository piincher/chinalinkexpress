/**
 * Typography Component
 * 
 * A reusable typography component for consistent text styling.
 * Part of the common components library.
 */

'use client';

import { cn } from '@/lib/utils';
import type { TypographyProps } from '@/types';

/**
 * Typography component for consistent text styling
 */
export function Typography({
  variant = 'body',
  weight = 'normal',
  color = 'inherit',
  align = 'left',
  className,
  children,
  ...props
}: TypographyProps) {
  const componentMap = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body: 'p',
    'body-sm': 'p',
    caption: 'span',
  } as const;
  
  const Component = componentMap[variant];

  const variantStyles = {
    h1: 'text-4xl md:text-5xl lg:text-6xl leading-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl leading-tight',
    h3: 'text-2xl md:text-3xl lg:text-4xl leading-snug',
    h4: 'text-xl md:text-2xl lg:text-3xl leading-snug',
    h5: 'text-lg md:text-xl lg:text-2xl leading-snug',
    h6: 'text-base md:text-lg lg:text-xl leading-snug',
    body: 'text-base leading-relaxed',
    'body-sm': 'text-sm leading-relaxed',
    caption: 'text-xs leading-relaxed',
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorStyles = {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    muted: 'text-gray-500',
    white: 'text-white',
    inherit: 'text-inherit',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const classes = cn(
    variantStyles[variant],
    weightStyles[weight],
    colorStyles[color],
    alignStyles[align],
    className
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

// Convenience exports for specific heading levels
export function Headline({ children, className, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant="h1" weight="bold" color="primary" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Title({ children, className, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant="h2" weight="bold" color="primary" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Subtitle({ children, className, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant="h3" weight="semibold" color="primary" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Body({ children, className, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant="body" color="secondary" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Caption({ children, className, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant="caption" color="muted" className={className} {...props}>
      {children}
    </Typography>
  );
}

export default Typography;
