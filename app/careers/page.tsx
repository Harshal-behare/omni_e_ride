import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const jobOpenings = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Technology",
    location: "Patna, Bihar",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "Join our tech team to develop cutting-edge software solutions for electric vehicle management systems.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in React, Node.js, and MongoDB",
      "Experience with IoT and embedded systems preferred",
      "Strong problem-solving and communication skills",
    ],
  },
  {
    id: 2,
    title: "Electric Vehicle Design Engineer",
    department: "R&D",
    location: "Patna, Bihar",
    type: "Full-time",
    experience: "2-4 years",
    description:
      "Design and develop innovative electric scooter models with focus on performance, safety, and user experience.",
    requirements: [
      "Bachelor's degree in Mechanical/Electrical Engineering",
      "Experience with CAD software (SolidWorks, AutoCAD)",
      "Knowledge of electric vehicle systems and battery technology",
      "Creative thinking and attention to detail",
    ],
  },
  {
    id: 3,
    title: "Sales Manager",
    department: "Sales",
    location: "Multiple Cities",
    type: "Full-time",
    experience: "5+ years",
    description: "Lead our sales team to expand Omni E-Ride's presence across Bihar and neighboring states.",
    requirements: [
      "Bachelor's degree in Business or related field",
      "5+ years of sales experience, preferably in automotive",
      "Strong leadership and team management skills",
      "Excellent communication and negotiation abilities",
    ],
  },
  {
    id: 4,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Patna, Bihar",
    type: "Full-time",
    experience: "2-3 years",
    description: "Drive our digital marketing initiatives to increase brand awareness and customer acquisition.",
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "Experience with Google Ads, Facebook Ads, and SEO",
      "Strong analytical skills and data-driven approach",
      "Creative content creation abilities",
    ],
  },
  {
    id: 5,
    title: "Service Technician",
    department: "Service",
    location: "Multiple Cities",
    type: "Full-time",
    experience: "1-3 years",
    description: "Provide excellent after-sales service and maintenance support for our electric scooters.",
    requirements: [
      "Diploma in Electrical/Mechanical Engineering",
      "Experience with electric vehicle maintenance",
      "Strong troubleshooting and problem-solving skills",
      "Customer service orientation",
    ],
  },
  {
    id: 6,
    title: "Quality Assurance Engineer",
    department: "Manufacturing",
    location: "Patna, Bihar",
    type: "Full-time",
    experience: "2-4 years",
    description: "Ensure the highest quality standards in our manufacturing processes and final products.",
    requirements: [
      "Bachelor's degree in Engineering",
      "Experience with quality control processes",
      "Knowledge of ISO standards and testing procedures",
      "Attention to detail and analytical mindset",
    ],
  },
]

export default function Careers() {
  return (
    <>
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#3CB043] to-[#2D7A32] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Be part of Bihar's electric revolution. Build your career while building a sustainable future.
            </p>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Work With Omni E-Ride?</h2>
              <p className="text-xl text-gray-600">
                Join a company that's making a real difference in sustainable mobility.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation-Driven</h3>
                <p className="text-gray-600">
                  Work on cutting-edge technology and be part of revolutionary changes in the automotive industry.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Great Team Culture</h3>
                <p className="text-gray-600">
                  Join a diverse, inclusive team that values collaboration, creativity, and personal growth.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Competitive Benefits</h3>
                <p className="text-gray-600">
                  Enjoy competitive salary, health insurance, performance bonuses, and professional development
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Current Openings</h2>
              <p className="text-xl text-gray-600">Find your perfect role and start your journey with us.</p>
            </div>

            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                        <span className="bg-[#3CB043] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {job.department}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{job.type}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {job.experience}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{job.description}</p>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="text-sm">
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <button className="w-full lg:w-auto bg-[#3CB043] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2D7A32] transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Hiring Process</h2>
              <p className="text-xl text-gray-600">
                Simple, transparent, and designed to find the best fit for both you and us.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Apply Online</h3>
                <p className="text-gray-600 text-sm">
                  Submit your application through our website with your resume and cover letter.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Initial Screening</h3>
                <p className="text-gray-600 text-sm">
                  Our HR team will review your application and conduct a preliminary phone screening.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Interview</h3>
                <p className="text-gray-600 text-sm">
                  Meet with our technical team to discuss your skills and experience in detail.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Final Decision</h3>
                <p className="text-gray-600 text-sm">
                  We'll make our decision and extend an offer to the successful candidate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact HR */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Have Questions?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our HR team is here to help you with any questions about careers at Omni E-Ride.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600">careers@omnierride.com</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600">+91 9876543210</p>
                </div>
              </div>

              <button className="bg-[#3CB043] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2D7A32] transition-colors">
                Contact HR Team
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
