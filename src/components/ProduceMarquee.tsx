import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import { GalleryItem, Media } from '@/types/payload'

export default async function ProduceMarquee() {
  let gallery: GalleryItem[] = []

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'produce_gallery',
      sort: 'display_order',
    })
    gallery = res.docs as unknown as GalleryItem[]
  } catch (e) {
    console.error('Failed to fetch produce gallery:', e)
  }

  if (!gallery || gallery.length === 0) {
    return null
  }

  // Duplicate for seamless loop
  const items = [...gallery, ...gallery]

  return (
    <section className="py-12 bg-white">
      <div className="marquee-container">
        <div className="animate-marquee flex gap-8 items-center">
          {items.map((item, idx) => {
            const imageUrl = typeof item.image === 'object' && item.image !== null ? (item.image as Media).url : ''
            return (
              <div key={idx} className="flex-shrink-0">
                {imageUrl ? (
                  <div className="relative h-48 w-72 overflow-hidden rounded shadow-sm">
                    <Image
                      src={imageUrl}
                      alt={item.alt_text}
                      fill
                      className="object-cover"
                    />
                    {item.caption && (
                      <div className="absolute bottom-0 w-full bg-black/40 p-2 text-white text-xs">
                        {item.caption}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 w-72 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
