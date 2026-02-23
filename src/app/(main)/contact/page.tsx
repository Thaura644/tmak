import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Mango Association of Kenya (T-MAK)',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-8 text-tmak-green">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-6">
              Have questions about T-MAK or the mango industry in Kenya? 
              We&apos;d love to hear from you.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900">Email</h3>
                <p className="text-gray-600">info@tmak.co.ke</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900">Phone</h3>
                <p className="text-gray-600">+254 700 000 000</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900">Address</h3>
                <p className="text-gray-600">
                  The Mango Association of Kenya<br />
                  P.O. Box 00000<br />
                  Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Message</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded h-32"
                  placeholder="How can we help?"
                />
              </div>
              
              <button 
                type="submit"
                className="bg-tmak-green text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
