"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, ExternalLink, Github, Linkedin, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import projectsData from "@/data/projects.json"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ProjectModal } from "@/components/project-modal"

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

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  useEffect(() => {
    setProjects(projectsData.projects)
  }, [])

  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Alex_Chen_Resume.pdf"
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10"
          style={{ y, opacity }}
        />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Dhananjay Kalaskar"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-6 border-4 border-purple-500/50"
                />
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Dhananjay Kalaskar
            </motion.h1>

            <motion.p
              className="text-xl lg:text-2xl text-purple-300 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              VR/Game Developer & Unity Developer
            </motion.p>

            <motion.p
              className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Crafting immersive experiences and innovative games with cutting-edge technology. Specializing in VR
              development, game mechanics, and interactive storytelling.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleDownloadResume}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-20"
                    initial={false}
                    animate={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-500/10 px-8 py-3 text-lg bg-transparent"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection projects={projects} onProjectClick={openModal} />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <motion.footer
        className="py-8 border-t border-slate-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 Dhananjay Kalaskar. All rights reserved. Built with Next.js and Tailwind CSS.</p>
        </div>
      </motion.footer>
      {/* Project Modal - Only render when there's a selected project */}
      {selectedProject && <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  )
}

// Projects Section Component
function ProjectsSection({
  projects,
  onProjectClick,
}: { projects: Project[]; onProjectClick: (project: Project) => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Featured Projects</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A showcase of my latest work in VR, game development, and interactive experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onProjectClick={onProjectClick} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Individual Project Card Component
function ProjectCard({
  project,
  index,
  onProjectClick,
}: { project: Project; index: number; onProjectClick: (project: Project) => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, rotateX: 5 }}
      className="perspective-1000"
    >
      <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group h-full">
        <motion.div className="relative overflow-hidden rounded-t-lg" whileHover={{ scale: 1.02 }}>
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={500}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-4 right-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + index * 0.1 }}>
              <Badge
                variant={project.status === "Released" ? "default" : "secondary"}
                className={project.status === "Released" ? "bg-green-600" : "bg-orange-600"}
              >
                {project.status}
              </Badge>
            </motion.div>
          </div>
        </motion.div>

        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-white text-xl">{project.title}</CardTitle>
            <motion.span
              className="text-purple-300 text-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {project.year}
            </motion.span>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Badge variant="outline" className="border-purple-500 text-purple-300 w-fit">
              {project.type}
            </Badge>
          </motion.div>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-slate-300 mb-4">{project.shortDescription}</CardDescription>
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            {project.technologies.map((tech, techIndex) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.6 + index * 0.1 + techIndex * 0.05 }}
              >
                <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="w-full border-purple-500 text-purple-300 hover:bg-purple-500/10 bg-transparent group relative overflow-hidden"
              onClick={() => onProjectClick(project)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 translate-x-[-100%] group-hover:translate-x-0"
                transition={{ duration: 0.3 }}
              />
              <ExternalLink className="mr-2 h-4 w-4 relative z-10" />
              <span className="relative z-10">View Details</span>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// About Section Component
function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              className="perspective-1000"
            >
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Alex working with VR"
                width={400}
                height={400}
                className="rounded-lg"
              />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.p
                className="text-lg text-slate-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                With over 6 years of experience in game development and VR technology, I specialize in creating
                immersive experiences that push the boundaries of interactive entertainment.
              </motion.p>

              <motion.p
                className="text-lg text-slate-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                My expertise spans across Unity 3D development, C# programming, shader development, and VR/AR
                implementation. I'm passionate about creating games that not only entertain but also inspire and educate
                players.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <h3 className="text-2xl font-semibold text-white">Core Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  <SkillCategory
                    title="Development"
                    skills={["Unity 3D", "C# Programming", "Shader Development", "Game Physics"]}
                    delay={1.2}
                  />
                  <SkillCategory
                    title="Platforms"
                    skills={["VR (Oculus, HTC Vive)", "AR (ARCore, ARKit)", "Mobile (iOS, Android)", "PC & Console"]}
                    delay={1.4}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Skill Category Component
function SkillCategory({ title, skills, delay }: { title: string; skills: string[]; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <h4 className="text-purple-300 font-medium mb-2">{title}</h4>
      <ul className="text-slate-300 space-y-1">
        {skills.map((skill, index) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: delay + 0.1 + index * 0.1 }}
            whileHover={{ x: 5, color: "#a855f7" }}
          >
            • {skill}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

// Contact Section Component
function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            Let's Work Together
          </motion.h2>

          <motion.p
            className="text-lg text-slate-300 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Interested in collaborating on your next VR experience or game project? Let's discuss how we can bring your
            vision to life.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="flex items-center gap-2 text-slate-300"
              whileHover={{ scale: 1.05, color: "#a855f7" }}
            >
              <MapPin className="h-5 w-5 text-purple-400" />
              <span>San Francisco, CA</span>

            </motion.div>
            <a href="mailto:kalaskard123@gmail.com" target="_blank" rel="noopener noreferrer">
            <motion.div
              className="flex items-center gap-2 text-slate-300"
              whileHover={{ scale: 1.05, color: "#a855f7" }}
            >
              <Mail className="h-5 w-5 text-purple-400" />
              <span>kalaskard123@gmail.com</span>
            </motion.div>
            </a>

          </motion.div>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[Github, Linkedin, Mail].map((Icon, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-500 text-purple-300 hover:bg-purple-500/10 bg-transparent relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 scale-0 group-hover:scale-100"
                    transition={{ duration: 0.3 }}
                  />
                  <Icon className="h-5 w-5 relative z-10" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
