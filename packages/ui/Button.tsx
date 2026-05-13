import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'ghost'
}

export default function Button({ children, variant = 'outline', className = '', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center text-sm tracking-widest uppercase transition-opacity hover:opacity-70 disabled:opacity-40'
  const variants = {
    outline: 'border px-8 py-4',
    ghost: 'px-4 py-2',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
