import { MessageSquarePlus, Star, X } from "lucide-react"
import React, { useState } from "react"

import axiosInstance from "~lib/axios-instance"

interface TestimonialProps {
  username: string | undefined
}

type FeedbackType = "feedback" | "testimonial"

const Testimonial: React.FC<TestimonialProps> = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState("")
  const [type, setType] = useState<FeedbackType>("feedback")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!text.trim()) return

    setIsSubmitting(true)
    try {
      await axiosInstance.post("/api/pr/testimonial", {
        username: username || "anonymous",
        testimonial: text,
        type,
        rating: type === "testimonial" ? rating : undefined
      })

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting:", error)
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center animate-in fade-in duration-500">
        <p className="text-sm text-purple-300">
          {type === "testimonial"
            ? "Thanks for the love! ❤️"
            : "Thanks for your feedback! 🚀"}
        </p>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-400 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 hover:text-gray-200 transition-all duration-300 group">
        <MessageSquarePlus
          size={16}
          className="group-hover:text-purple-400 transition-colors"
        />
        <span>Share Feedback / Testimonial</span>
      </button>
    )
  }

  return (
    <div className="mt-6 p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl transition-all duration-300 hover:border-gray-600/50 group text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex bg-black/40 p-1 rounded-lg border border-gray-700/50">
          <button
            onClick={() => setType("feedback")}
            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
              type === "feedback"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm"
                : "text-gray-500 hover:text-gray-400"
            }`}>
            Feedback
          </button>
          <button
            onClick={() => setType("testimonial")}
            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
              type === "testimonial"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm"
                : "text-gray-500 hover:text-gray-400"
            }`}>
            Testimonial
          </button>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-300 transition-colors p-1 hover:bg-white/5 rounded-md">
          <X size={14} />
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          type === "feedback"
            ? "Found a bug? Have a suggestion? Let us know!"
            : "Loving the extension? Share your experience!"
        }
        className="w-full bg-black/20 border border-gray-700/50 rounded-lg p-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500/30 focus:border-purple-500/30 transition-all resize-none min-h-[80px]"
      />
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center h-8">
          {type === "testimonial" && (
            <div className="flex items-center space-x-1.5 bg-black/20 px-2.5 py-1 rounded-lg border border-gray-700/30 animate-in fade-in slide-in-from-left-2 duration-300">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform duration-200 hover:scale-110 active:scale-95">
                  <Star
                    size={16}
                    className={`transition-all duration-300 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]"
                        : "text-gray-600/50 hover:text-gray-500"
                    } ${star === 5 && (hoveredRating === 5 || rating === 5) ? "animate-pulse" : ""}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!text.trim() || isSubmitting}
          className={`text-[11px] font-bold px-5 py-1.5 rounded-full transition-all duration-300 ${
            !text.trim() || isSubmitting
              ? "bg-gray-800/50 text-gray-600 cursor-not-allowed"
              : "bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 border border-purple-500/20 active:scale-95 shadow-lg shadow-purple-500/5"
          }`}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  )
}

export default Testimonial