import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary-muted text-primary-muted-foreground',
        secondary:
          'border-transparent bg-surface-2 text-text-secondary',
        destructive:
          'border-transparent bg-danger-muted text-danger-muted-foreground',
        success:
          'border-transparent bg-success-muted text-success-muted-foreground',
        warning:
          'border-transparent bg-warning-muted text-warning-muted-foreground',
        outline: 
          'border-hairline text-text-muted bg-transparent',
        muted:
          'border-transparent bg-surface-2 text-text-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div 
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)} 
      {...props} 
    />
  );
}

export { Badge, badgeVariants };
