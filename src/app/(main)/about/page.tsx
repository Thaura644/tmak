import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about The Mango Association of Kenya (T-MAK)',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-8 text-tmak-green">About T-MAK</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            The Mango Association of Kenya (T-MAK) is the national coordinating authority, 
            value chain platform, and market linkage enabler for Kenya&apos;s mango industry.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            To coordinate and promote the development of Kenya&apos;s mango industry through 
            stakeholder engagement, value chain optimization, and market access facilitation.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Vision</h2>
          <p className="text-gray-700 mb-6">
            To be the leading apex body for Kenya&apos;s mango sector, ensuring sustainable 
            growth, competitiveness, and prosperity for all stakeholders in the value chain.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Objectives</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>Coordinate mango production, processing, and marketing activities</li>
            <li>Advocate for favorable policies for mango stakeholders</li>
            <li>Facilitate market access both locally and internationally</li>
            <li>Promote research and adoption of modern farming technologies</li>
            <li>Build capacity for mango farmers and traders</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
