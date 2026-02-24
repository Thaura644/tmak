import { Metadata } from 'next'
import { getOrganizationInfo } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about The Mango Association of Kenya (T-MAK)',
}

export default async function AboutPage() {
  const orgInfo = await getOrganizationInfo()

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-8 text-tmak-green">{orgInfo?.title || 'About T-MAK'}</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            {orgInfo?.description || 'The Mango Association of Kenya (T-MAK) is the national coordinating authority...'}
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Strategic Functions</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            {orgInfo?.strategicFunctions
              ? (typeof orgInfo.strategicFunctions === 'string' ? orgInfo.strategicFunctions.split(';') : orgInfo.strategicFunctions).map((f: string, i: number) => (
                  <li key={i}>{f}</li>
                ))
              : (
                <>
                  <li>Coordinate mango production, processing, and marketing activities</li>
                  <li>Advocate for favorable policies for mango stakeholders</li>
                  <li>Facilitate market access both locally and internationally</li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
