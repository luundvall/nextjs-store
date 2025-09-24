import { useState } from "react"
import Image from "next/image"

export default function ProductImage({ src }: { src: string; }) {
    const [loading, setLoading] = useState(true)

    return (
        <div className="relative h-8 w-8">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center rounded">
                    <div className="h-4 w-4 animate-spin rounded-full border-2" />
                </div>
            )}
            <Image
                src={src}
                alt="default alt"
                fill
                sizes="32px"
                className={`object-contain transition-opacity duration-300 ${
                    loading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setLoading(false)}
            />
        </div>
    )
}
