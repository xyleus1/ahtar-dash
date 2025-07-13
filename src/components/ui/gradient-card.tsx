import React from 'react'
import { Card } from './card'
import { useMouseTracking } from '@/hooks/useMouseTracking'
import { cn } from '@/lib/utils'

interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({ className, children, ...props }, ref) => {
    const mouseRef = useMouseTracking()

    return (
      <Card
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
        className={cn('card-gradient-hover', className)}
        {...props}
      >
        {children}
      </Card>
    )
  }
)
GradientCard.displayName = 'GradientCard'