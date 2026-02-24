export const dynamic = 'force-dynamic'

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-8 text-tmak-green">Resources</h1>

        <p className="text-lg text-gray-700 mb-8">
          Access export guidelines, regulations, and resources for Kenya&apos;s mango industry.
        </p>

        <div className="grid gap-6">
          <div className="p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Export Guidelines</h2>
            <p className="text-gray-600 mb-4">
              Comprehensive guidelines for exporting Kenyan mangoes to international markets.
            </p>
            <span className="text-sm text-gray-500">Coming Soon</span>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Quality Standards</h2>
            <p className="text-gray-600 mb-4">
              Information on quality standards and certifications required for export.
            </p>
            <span className="text-sm text-gray-500">Coming Soon</span>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Market Reports</h2>
            <p className="text-gray-600 mb-4">
              Latest market intelligence and trends for the mango industry.
            </p>
            <span className="text-sm text-gray-500">Coming Soon</span>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Training Materials</h2>
            <p className="text-gray-600 mb-4">
              Educational resources for farmers and stakeholders.
            </p>
            <span className="text-sm text-gray-500">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  )
}
