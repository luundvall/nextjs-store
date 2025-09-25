import {useState} from "react"
import Image from "next/image"

export function ProductImage({src, width, height}: { src: string; width?: number; height?: number }) {
    const [loading, setLoading] = useState(true)

    return (
            <Image
                src={src}
                alt="default alt"
                width={width}
                height={height}
                priority
                className={`transition-opacity duration-300 relative ${
                    loading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setLoading(false)}
            />
        )
}
