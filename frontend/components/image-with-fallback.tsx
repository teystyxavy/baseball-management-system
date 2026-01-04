"use client"

import type React from "react"

import {useState} from "react"
import Image from "next/image"

interface ImageWithFallbackProps {
    src?: string | null
    alt: string
    fallback: React.ReactNode
    className?: string
    width?: number
    height?: number
    fill?: boolean
    priority?: boolean
}

export function ImageWithFallback({
    src,
    alt,
    fallback,
    className,
    width,
    height,
    fill,
    priority,
} : ImageWithFallbackProps) {
    const [error, setError] = useState(false)
    if (!src || error) {
        return <div className={className}>{fallback}</div>
    }

    return (
        <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            className={className}
            onError={() => setError(true)}
            priority={priority}
        />
    )
}