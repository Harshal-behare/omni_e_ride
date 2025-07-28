interface Testimonial {
  id: number
  name: string
  location: string
  photo?: string
  quote: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 text-center">
      <img
        src={testimonial.photo || `/placeholder.svg?height=80&width=80&text=${testimonial.name}`}
        alt={testimonial.name}
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
      />
      <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
      <h4 className="font-semibold text-[#1F2937]">{testimonial.name}</h4>
      <p className="text-sm text-gray-500">{testimonial.location}</p>
      <div className="flex justify-center mt-2">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    </div>
  )
}
