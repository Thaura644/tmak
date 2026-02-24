import React from 'react'
import Image from 'next/image'
import { getProduceItems } from '@/lib/data'

export default async function ProduceMarquee() {
  const gallery = await getProduceItems()
  if (!gallery || gallery.length === 0) return null
  const items = [...gallery, ...gallery]

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="flex gap-8 animate-marquee">
        {items.map((item, idx) => (
          <div key={idx} className="flex-shrink-0 relative h-48 w-72">
            <Image src={item.imageUrl} alt={item.altText} fill className="object-cover rounded" />
          </div>
        ))}
      </div>
    </section>
  )
}
