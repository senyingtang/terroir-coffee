'use client'

import Image from 'next/image'

interface HoverImageProps {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  saturateFrom?: number
  saturateTo?: number
  containerClassName?: string
  containerStyle?: React.CSSProperties
  fill?: boolean
}

export default function HoverImage({
  src,
  alt,
  sizes,
  priority,
  className = '',
  saturateFrom = 0.7,
  saturateTo = 1,
  containerClassName = '',
  containerStyle,
  fill = true,
}: HoverImageProps) {
  return (
    <div className={`relative overflow-hidden ${containerClassName}`} style={containerStyle}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className={`object-cover transition-all duration-700 ${className}`}
        style={{ filter: `saturate(${saturateFrom})` }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLImageElement).style.filter = `saturate(${saturateTo})`
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLImageElement).style.filter = `saturate(${saturateFrom})`
        }}
        sizes={sizes}
      />
    </div>
  )
}
