"use client"

import { useState } from "react"
import { MessageCircle, X, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)

  const phoneNumber = "919876543210" // Replace with actual WhatsApp number
  const message = "Hi! I'm interested in Omni E-Ride electric scooters. Can you help me?"
  const quickMessages = [
    "Hi! I'm interested in OMNI E-RIDE scooters. Can you help me?",
    "I want to book a test ride. What's the process?",
    "What are the EMI options available?",
    "I need information about service centers near me.",
    "Can you tell me about the warranty and after-sales service?",
  ]

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleQuickMessage = (message: string) => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  const handleCustomMessage = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  return (
    <>
      {/* WhatsApp Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]">
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="bg-[#25D366] text-white rounded-t-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold">OMNI E-RIDE Support</CardTitle>
                    <p className="text-xs opacity-90">Typically replies instantly</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 bg-gray-50 border-b">
                <p className="text-sm text-gray-600 mb-3">👋 Hi there! How can we help you today?</p>
                <div className="space-y-2">
                  {quickMessages.map((message, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickMessage(message)}
                      className="w-full text-left p-2 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {message}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Phone className="h-3 w-3" />
                  <span>+91 1800-123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Mail className="h-3 w-3" />
                  <span>support@omnierride.com</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>Mon-Sat: 9 AM - 7 PM</span>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Button
                  onClick={handleCustomMessage}
                  className="w-full bg-[#25D366] hover:bg-[#20B858] text-white"
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start WhatsApp Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="w-6 h-6" />}

        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">1</span>
        </div>

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
      </button>
    </>
  )
}
