"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Github, ExternalLink, Calendar, Users, Trophy, AlertCircle } from "lucide-react"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"

interface Project {
  id: number
  title: string
  shortDescription: string
  detailedDescription: string
  technologies: string[]
  techDetails: Record<string, string>
  type: string
  image: string
  gallery: string[]
  status: string
  year: string
  duration: string
  team: string
  challenges: string[]
  achievements: string[]
  links: Record<string, string>
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  useKeyboardNavigation(isOpen, onClose)

  // Reset selected image when project changes
  useEffect(() => {
    setSelectedImage(0)
  }, [project])

  // Don't render anything if project is null or modal is closed
  if (!project || !isOpen) {
    return null
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <motion.div
          className="bg-slate-900 border border-slate-700 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full p-2 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Image Gallery */}
          <div className="relative">
            <div className="relative h-80 md:h-96">
              <Image
                src={project.gallery?.[selectedImage] || project.image || "/placeholder.svg"}
                alt={`${project.title} - Image ${selectedImage + 1}`}
                className="object-cover object-center rounded-t-xl"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Image Navigation Dots */}
            {project.gallery && project.gallery.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {project.gallery.map((_, index) => (
                  <button
                    key={index}
                    className={`rounded-full w-3 h-3 transition-all ${
                      selectedImage === index ? "bg-white" : "bg-white/50 hover:bg-white/75"
                    }`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Project Status Badge */}
            <div className="absolute top-4 left-4">
              <Badge
                variant={project.status === "Released" ? "default" : "secondary"}
                className={project.status === "Released" ? "bg-green-600" : "bg-orange-600"}
              >
                {project.status}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <motion.div
                className="flex items-start justify-between mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 id="modal-title" className="text-3xl font-bold text-white">
                  {project.title}
                </h2>
                <Badge variant="outline" className="border-purple-500 text-purple-300">
                  {project.type}
                </Badge>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 text-slate-400 text-sm mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {project.year} • {project.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{project.team}</span>
                </div>
              </motion.div>

              <motion.p
                className="text-slate-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.detailedDescription}
              </motion.p>
            </div>

            {/* Technologies */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.technologies.map((tech) => (
                  <div key={tech} className="bg-slate-800/50 rounded-lg p-3">
                    <div className="font-medium text-purple-300">{tech}</div>
                    {project.techDetails[tech] && (
                      <div className="text-sm text-slate-400 mt-1">{project.techDetails[tech]}</div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-400" />
                  Technical Challenges
                </h3>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="text-slate-300 flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Key Achievements
                </h3>
                <ul className="space-y-2">
                  {project.achievements.map((achievement, index) => (
                    <li key={index} className="text-slate-300 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Links */}
            {project.links && Object.keys(project.links).length > 0 && (
              <motion.div
                className="flex flex-wrap gap-3 pt-4 border-t border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {project.links.github && (
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                    asChild
                  >
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.links.demo && (
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.links.store && (
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-400 hover:bg-green-600/10 bg-transparent"
                    asChild
                  >
                    <a href={project.links.store} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Store Page
                    </a>
                  </Button>
                )}
                {project.links.trailer && (
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600/10 bg-transparent"
                    asChild
                  >
                    <a href={project.links.trailer} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Trailer
                    </a>
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
