import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva('button', {
  variants: {
    variant: { ink: 'button-ink', outline: 'button-outline', lime: 'button-lime', gold: 'button-gold' },
    size: { default: 'button-default', small: 'button-small' },
  },
  defaultVariants: { variant: 'ink', size: 'default' },
})

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
