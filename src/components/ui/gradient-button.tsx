import React from 'react'
import { Button, ButtonProps } from './button'
import { useMouseTracking } from '@/hooks/useMouseTracking'
import { cn } from '@/lib/utils'

interface GradientButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'default' | 'primary'
}

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const mouseRef = useMouseTracking()

    return (
      <Button
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          if (mouseRef) {
            mouseRef.current = node
          }
        }}
        className={cn(
          variant === 'primary' ? 'btn-gradient-primary' : 'btn-gradient',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
GradientButton.displayName = 'GradientButton'