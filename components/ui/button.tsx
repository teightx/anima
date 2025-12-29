import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[var(--shadow-subtle)] hover:bg-primary-hover',
        destructive:
          'bg-danger-muted text-danger-muted-foreground shadow-[var(--shadow-subtle)] hover:bg-danger-muted/80',
        outline:
          'border border-hairline bg-background text-text-secondary hover:bg-surface-2 hover:text-text-primary hover:border-border',
        secondary:
          'bg-surface-2 text-text-secondary hover:bg-surface-2/80 hover:text-text-primary',
        ghost: 
          'text-text-secondary hover:bg-surface-2 hover:text-text-primary',
        link: 
          'text-primary underline-offset-4 hover:underline',
        muted:
          'bg-surface-2/60 text-text-muted hover:bg-surface-2 hover:text-text-secondary',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-lg px-6',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
