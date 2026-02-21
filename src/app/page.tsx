import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function LandingPage() {
  const adverts = await prisma.advert.findMany();

  return (
    <div className="font-sans">
      {/* BEGIN: Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-mango rounded-full mango-blob"></div>
          <span className="font-serif font-bold text-xl tracking-tight text-foreground">The Mango Association of Kenya (T-MAK)</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-widest text-gray-600">
          <Link href="#about" className="hover:text-mango transition-colors">Our Roots</Link>
          <Link href="#membership" className="hover:text-mango transition-colors">Join the Circle</Link>
          <Link href="#marketplace" className="hover:text-mango transition-colors">The Market</Link>
        </div>
        <button className="bg-mango text-white px-6 py-2 rounded-custom font-bold hover:shadow-lg transition-all transform hover:-translate-y-1">
          JOIN NOW
        </button>
      </nav>
      {/* END: Navigation */}

      {/* BEGIN: Hero Section */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto" id="about">
        <div className="asymmetric-grid items-center">
          {/* Image Collage Side */}
          <div className="col-span-12 lg:col-span-7 relative">
            <div className="relative z-10 w-4/5 h-[400px] bg-gray-200 rounded-custom overflow-hidden rotate-2 shadow-2xl">
              <img
                alt="Mango Farmers"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJMsWrIWDWqll7AXnCtS6MPxBw1uuegJ01Y6lXIea5RXF5RxTV8icCgPF0DI7MeqUp7P3gvq_ZZHLbk9OyjiaWDDM99DLZsdXsxtlZg7XtwL6Bo6Ca3VW352YzrlL2FbFt8FKRwr_epSP-nBI85HlKgNDvh7aZhtcLu2ksZ0fMl5r_2WYg-hUGIs0r6L53fMWjCqHGZNWtysVpGmJrz4bgl2dxEGY4eE8kP9P-AwTPlWG06AmuggVgYp-_IvNR_AcJpXQuN-r09Xwj"
              />
            </div>
            <div className="absolute -bottom-10 -right-5 z-20 w-1/2 h-64 bg-orange-100 rounded-custom overflow-hidden -rotate-3 border-8 border-white shadow-xl">
              <img
                alt="Fresh Harvest"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzb02rD8cd58DBpFh_8iD_6P5cghTNveTtEz5j1Lg2DRZFylYxxsW8gfiJR1WhMOLwiaXoPeVK8IH2Vq8Ez9SLY9GlD_uks5RWUKQe4vU6w3YXQBRCZXMfGn--dljp_Sdg2wgUa885TM9B_Q57u8kjzrTd3Or96nVdYs_CrGTFFSH47NevkHqEMLddalGYQLmikKNVXeiz1pFge9iCq8MNIuDhXDpvSqiBvuvP8Qu8wrS2-ndmjbScYwJDKB501maBWA0C4gXjrcLB"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-leaf opacity-20 mango-blob animate-pulse"></div>
          </div>
          {/* Text Side */}
          <div className="col-span-12 lg:col-span-5 mt-20 lg:mt-0 lg:pl-10">
            <h1 className="font-serif text-6xl md:text-7xl leading-tight mb-6 text-foreground">
              Nurturing <span className="italic text-mango">Kenya&apos;s</span> Golden <span className="brush-stroke">Legacy.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-md">
              The Mango Association of Kenya (T-MAK) is a collaborative movement uniting the hands that plant, the minds that trade, and the hearts that savor. We are the pulse of the national mango value chain.
            </p>
          </div>
        </div>
      </main>
      {/* END: Hero Section */}

      {/* BEGIN: Membership Cards */}
      <section className="py-24 bg-white relative overflow-hidden" id="membership">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-serif text-4xl mb-4 text-foreground">Membership Tiers</h2>
            <div className="w-24 h-1 bg-leaf"></div>
          </div>
          <div className="flex flex-wrap items-end gap-8">
            {/* Producer Card */}
            <div className="flex-1 min-w-[300px] p-10 bg-orange-50 rounded-[40px] border-2 border-orange-100 transform hover:scale-105 transition-transform duration-500">
              <span className="text-xs font-bold tracking-widest uppercase text-mango block mb-4">Foundation</span>
              <h3 className="font-serif text-3xl mb-4 text-foreground">Producers</h3>
              <p className="text-gray-600 mb-8">Access to sustainable farming techniques, global export standards, and collective bargaining power.</p>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-mango shadow-sm">→</div>
            </div>
            {/* Trader Card */}
            <div className="flex-1 min-w-[300px] p-10 bg-leaf/10 rounded-[80px_20px_80px_20px] border-2 border-leaf/20 h-[450px] flex flex-col justify-center">
              <span className="text-xs font-bold tracking-widest uppercase text-green-600 block mb-4">Growth</span>
              <h3 className="font-serif text-5xl mb-6 italic text-foreground">Traders</h3>
              <p className="text-gray-700 text-lg mb-8">Connecting local excellence with global demand through optimized logistics and digital market access.</p>
              <button className="border-b-2 border-green-600 font-bold self-start py-2 text-foreground">EXPLORE NETWORK</button>
            </div>
            {/* Consumer Card */}
            <div className="flex-1 min-w-[300px] p-10 bg-zinc-50 rounded-custom border-2 border-dashed border-zinc-200">
              <span className="text-xs font-bold tracking-widest uppercase text-zinc-400 block mb-4">Community</span>
              <h3 className="font-serif text-3xl mb-4 text-foreground">Consumers</h3>
              <p className="text-gray-500 mb-8">Enjoy traceable, high-quality mangoes while supporting fair wages and sustainable Kenyan agriculture.</p>
              <div className="w-full h-1 bg-zinc-200"></div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Membership Cards */}

      {/* BEGIN: Marketplace */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="marketplace">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3 sticky top-32">
            <h2 className="font-serif text-5xl leading-tight mb-6 text-foreground">Market <br /><span className="text-leaf">Exchange</span></h2>
            <p className="text-gray-500">Curated commercial opportunities and essential services for our ecosystem members.</p>
            <div className="mt-8 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-mango"></div>
              <div className="w-3 h-3 rounded-full bg-leaf"></div>
              <div className="w-3 h-3 rounded-full bg-orange-200"></div>
            </div>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {adverts.map((ad) => (
              <div 
                key={ad.id} 
                className={`p-8 rounded-custom shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ${
                  ad.type === 'LOGISTICS' ? 'bg-zinc-900 text-white' : 'bg-white border-l-8 border-mango'
                }`}
              >
                <div>
                  <span className={`${
                    ad.type === 'LOGISTICS' ? 'bg-white/10 text-white/60' : 'bg-orange-100 text-mango'
                  } px-3 py-1 text-[10px] font-bold rounded mb-4 inline-block`}>
                    {ad.type}
                  </span>
                  <h5 className="font-bold text-xl mb-2">{ad.title}</h5>
                  <p className={`text-sm mb-6 ${ad.type === 'LOGISTICS' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {ad.description}
                  </p>
                </div>
                {ad.memberDiscount ? (
                  <Link href={ad.link} className="text-mango font-bold text-sm underline">
                    {ad.memberDiscount}
                  </Link>
                ) : (
                  <button className={`${
                    ad.type === 'LOGISTICS' ? 'bg-leaf text-black' : 'bg-mango text-white'
                  } px-4 py-2 text-xs font-bold rounded self-start`}>
                    GET DETAILS
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END: Marketplace */}

      {/* BEGIN: Footer */}
      <footer className="py-12 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-mango rounded-full mango-blob"></div>
            <p className="text-sm text-gray-500 font-medium tracking-wide">
              © 2026 The Mango Association of Kenya | A National Mango Value Chain Initiative.
            </p>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <Link href="#" className="hover:text-mango">Privacy</Link>
            <Link href="#" className="hover:text-mango">Terms</Link>
            <Link href="#" className="hover:text-mango">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
