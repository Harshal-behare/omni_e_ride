import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "The Estimated Fall of Electric Scooter Prices in the Future",
    excerpt:
      "Facebook Youtube Instagram As the demand for electric scooters continues to grow, consumers are eager to know if prices will become more affordable. The future...",
    date: "June 18, 2025",
    category: "Electric Scooter",
    image: "/placeholder.svg?height=300&width=400&text=Electric+Scooter+Prices",
    slug: "electric-scooter-prices-future",
  },
  {
    id: 2,
    title: "Financing Your Electric Bike: EMI Plans, Loan Benefits & Best Price Deals",
    excerpt:
      "Facebook Youtube Instagram Financing your electric bike is now easier than ever. With rising fuel costs and better access to EV loans, more people are...",
    date: "May 15, 2025",
    category: "Electric Bike",
    image: "/placeholder.svg?height=300&width=400&text=Electric+Bike+Financing",
    slug: "electric-bike-financing-emi-plans",
  },
  {
    id: 3,
    title: "How Electric 2 Wheelers for Delivery Are Transforming Logistics in India?",
    excerpt:
      "Facebook Youtube Instagram That electric are rising. Delivery demand is growing. And cities are more crowded than ever.In the middle of all this, there's one...",
    date: "April 28, 2025",
    category: "Electric Scooter",
    image: "/placeholder.svg?height=300&width=400&text=Electric+Delivery+Vehicles",
    slug: "electric-2-wheelers-delivery-logistics",
  },
  {
    id: 4,
    title: "How to Convince Your Parents to Buy an Electric Scooter Instead of a Petrol One?",
    excerpt:
      "Facebook Youtube Instagram Convincing parents to buy something new always needs more than just excitement. It needs logic, responsibility and a solid set of...",
    date: "April 28, 2025",
    category: "Electric Scooter",
    image: "/placeholder.svg?height=300&width=400&text=Convince+Parents+Electric",
    slug: "convince-parents-buy-electric-scooter",
  },
  {
    id: 5,
    title: "Electric 2-Wheelers vs Noise Pollution in Indian Areas",
    excerpt:
      "Facebook Youtube Instagram When you think about life in Indian cities, what's the first thing that comes to mind? Crowded streets? Endless traffic? But above...",
    date: "April 28, 2025",
    category: "Electric Scooter",
    image: "/placeholder.svg?height=300&width=400&text=Electric+vs+Noise+Pollution",
    slug: "electric-2-wheelers-noise-pollution",
  },
  {
    id: 6,
    title: "The Growth of the EV Charging Infrastructure: What's in Store for Electric Scooter Owners",
    excerpt:
      "Facebook Youtube Instagram Owning an electric scooter today is no longer just about saving fuel money. It's about freedom - the freedom to ride without...",
    date: "April 24, 2025",
    category: "Electric Scooter",
    image: "/placeholder.svg?height=300&width=400&text=EV+Charging+Infrastructure",
    slug: "ev-charging-infrastructure-growth",
  },
  {
    id: 7,
    title: "How Electric Vehicles Combat Air Pollution in India's Cities?",
    excerpt:
      "Facebook Youtube Instagram Take a deep breath Now imagine if the air you're breathing was cleaner, cleaner and free from the smoke of thousands of petrol...",
    date: "April 24, 2025",
    category: "Electric Scooter",
    image: "/placeholder.svg?height=300&width=400&text=Electric+Vehicles+Air+Pollution",
    slug: "electric-vehicles-combat-air-pollution",
  },
  {
    id: 8,
    title: "How Different Countries Are Adopting Electric Two-Wheelers?",
    excerpt:
      "Facebook Youtube Instagram Adopting electric two-wheelers is no longer just a smart response to rising fuel costs, increasing pollution, and changing...",
    date: "April 24, 2025",
    category: "Electric Scooter",
    image: "/placeholder.svg?height=300&width=400&text=Global+Electric+Adoption",
    slug: "countries-adopting-electric-two-wheelers",
  },
  {
    id: 9,
    title: "Can Electric Two-Wheelers Reduce Stress? The Science Behind a Smoother Ride",
    excerpt:
      "Facebook Youtube Instagram We usually think of two-wheelers as a fast way to get around. But lately, more people have noticed something different. When they...",
    date: "April 24, 2025",
    category: "Electric Scooter",
    image: "/placeholder.svg?height=300&width=400&text=Electric+Reduce+Stress",
    slug: "electric-two-wheelers-reduce-stress",
  },
]

export default function Blog() {
  return (
    <>
      <Navbar />

      <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Electric Vehicle Blogs</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest trends, tips, and insights about electric vehicles and sustainable mobility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#3CB043] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#3CB043] transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[#3CB043] font-semibold hover:text-[#2D7A32] transition-colors"
                  >
                    Read story
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    page === 1 ? "bg-[#3CB043] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="px-3 py-2 text-gray-500">...</span>
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                36
              </button>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
