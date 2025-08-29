"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  ExternalLink,
  Sun,
  Moon,
  Calendar,
  Eye,
  Check,
  ChevronDown,
  Play,
  Zap,
  Star,
  ArrowRight,
  Menu,
  X,
  Code,
  Terminal,
  Database,
  Shield,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// Add this component after the imports
const TypingAnimation = () => {
  const roles = [
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Full Stack Developer",
    "React Developer",
  ]

  const [currentRole, setCurrentRole] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = roles[currentRole]

        if (isDeleting) {
          setCurrentText(current.substring(0, currentText.length - 1))
        } else {
          setCurrentText(current.substring(0, currentText.length + 1))
        }

        if (!isDeleting && currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000)
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentRole, roles])

  return (
    <span className="inline-block min-w-[300px] text-left">
      {currentText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        className="text-cyan-500 dark:text-blue-400 ml-1"
      >
        |
      </motion.span>
    </span>
  )
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showCertificationsModal, setShowCertificationsModal] = useState(false)
  const [activeContestTab, setActiveContestTab] = useState("hackathons")


  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Enhanced Loading animation with progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(progressInterval)
  }, [])

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "certifications", "contests", "publications", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("m.guruchandhran@gmail.com")
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 3000)
    } catch (err) {
      console.error("Failed to copy email:", err)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsMenuOpen(false)
    }
  }

  const downloadResume = () => {
    // Create a dummy PDF download
    const link = document.createElement("a")
    link.href = "/Guru_Resume.pdf?height=800&width=600&text=Guru Resume"
    link.download = "Guru_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const openProject = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const projects = [
    {
      title: "Placement Database System",
      description:
        "A web-based system for colleges to manage student data and placement records. Allows authorized users to upload, view, and update placement information securely with comprehensive data management features.",
      tech: ["HTML", "CSS", "PHP", "MySQL"],
      // liveDemo: "https://placement-system-demo.vercel.app",
      image: "/sms.png?height=300&width=500&text=Placement+Database+System",
      featured: true,
      duration: "Sep 2024 – Dec 2024",
    },
    {
      title: "Educational Based Keylogger Identification & Prevention Website",
      description:
        "Security Awareness Training Tool designed as a web-based platform that practically demonstrates how attackers use keylogger techniques to capture keystrokes and how to prevent them.",
      tech: ["TypeScript", "Node.js", "Security", "Education"],
      liveDemo: "https://edu-keylogger.vercel.app/",
      image: "/keylogger.png?height=300&width=500&text=Keylogger+Prevention",
      featured: true,
      duration: "Jan 2025 – Feb 2025",
    },
    {
      title: "Network Monitoring System",
      description:
        "Comprehensive monitoring solution designed with a dashboard that provides real-time visibility of how actual networking tools work. Demonstrates network analysis and monitoring capabilities.",
      tech: ["Next.js", "Node.js", "Networking", "Monitoring"],
      liveDemo: "https://network-monitoring-system-intern.vercel.app/ ",
      // image: "/nms.png?height=300&width=500&text=Network+Monitoring",
      featured: false,
    },
    {
      title: "AI Based Phishing Detection",
      description:
        "Developed a phishing detection system leveraging Artificial Intelligence (AI) and Machine Learning (ML) techniques using Python.Analysed and pre-processed over 10,000 email and URL features, applying data structures and algorithms for feature engineering and selection.",
      tech: ["Python", "AIML", "Education", "Cybersecurity"],
      // liveDemo: "https://keylogger-training-demo.vercel.app",
      // image: "/placeholder.svg?height=300&width=500&text=Security+Training",
      featured: false,
    },
  ]

  const certifications = [
    {
      title: "36 Hours Hackathon",
      issuer: "MKCE",
      logo: "/certificates/hackathon.png?height=100&width=180&text=Hackathon",
      date: "2025",
      description: "Developed a strong foundation of practical skills and gained meaningful exposure to real-world environments, enhancing both technical proficiency and problem-solving abilities.",
    },
    {
      title: "Cyber Security & Privacy",
      issuer: "NPTEL",
      logo: "/certificates/nptel.png?height=100&width=180&text=NPTEL",
      date: "2024",
      description: "Enrolled in the 'Cyber Security & Privacy' course offered by NPTEL, which provided a comprehensive overview of key government regulations and privacy laws, including HIPAA, GDPR.",
    },
    {
      title: "Geo Data and Cyber Privcy",
      issuer: "ISRO",
      logo: "/certificates/isro.png?height=100&width=1800&text=ISRO",
      date: "2025",
      description: "This 2 weeks bootcamp teaches how Indian Government is securing the databases from cyber threads by making ai gapped systems and maintaining authentication levels.",
    },
    {
      title: "Python for Beginners",
      issuer: "EC Council",
      logo: "/certificates/python.png?height=100&width=180&text=Python",
      date: "2024",
      description: "Successfully completed a foundational Python course for beginners, which strengthened my understanding of basic programming concepts such as syntax, loops, functions in Python.",
    },
  ]

  const skills = [
    { name: "Python", level: 62, icon: "🐍", category: "Backend" },
    { name: "Java", level: 46, icon: "☕", category: "Backend" },
    { name: "HTML", level: 86, icon: "🌐", category: "Frontend" },
    { name: "Node.js", level: 78, icon: "🟢", category: "Backend" },
    { name: "React", level: 72, icon: "⚛️", category: "Frontend" },
    { name: "MySQL", level: 80, icon: "🗄️", category: "Database" },
    { name: "GitHub", level: 70, icon: "🐙", category: "Tools" },
    { name: "VS Code", level: 82, icon: "💻", category: "Tools" },
    { name: "Linux", level: 75, icon: "🐧", category: "Systems" },
    { name: "Windows", level: 82, icon: "🪟", category: "Systems" },
    { name: "Networking", level: 66, icon: "🔗", category: "Systems" },
    { name: "Security", level: 43, icon: "🔒", category: "Security" },
  ]

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👨‍💻" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "certifications", label: "Certifications", icon: "📜" },
    { id: "contests", label: "Contests", icon: "🏆" },
    { id: "publications", label: "Publications", icon: "📚" },
    { id: "contact", label: "Contact", icon: "📬" },
  ]

  // Enhanced Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50 overflow-hidden">
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Floating Code Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {["</>", "{}", "[]", "();", "=>", "&&", "||", "!="].map((symbol, i) => (
            <motion.div
              key={symbol}
              className="absolute text-white/20 text-2xl font-mono"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>

        <div className="text-center z-10">
          {/* Main Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mb-8"
          >
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-40 h-40 border-4 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full"
            />

            {/* Middle Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-4 border-2 border-transparent border-l-blue-400 border-b-pink-400 rounded-full"
            />

            {/* Inner Circle */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 20px rgba(34, 211, 238, 0.5)",
                  "0 0 40px rgba(168, 85, 247, 0.8)",
                  "0 0 20px rgba(34, 211, 238, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <span className="text-4xl font-bold text-white">GURU</span>
            </motion.div>

            {/* Orbiting Elements */}
            {[Code, Database, Terminal, Shield].map((Icon, index) => (
              <motion.div
                key={index}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 4 + index,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute inset-0"
                style={{ transformOrigin: "50% 50%" }}
              >
                <div
                  className="absolute w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                  style={{
                    top: `${20 + index * 15}px`,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Loading Text with Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1
              className="text-4xl font-bold text-white mb-4"
              animate={{
                textShadow: [
                  "0 0 10px rgba(34, 211, 238, 0.5)",
                  "0 0 20px rgba(168, 85, 247, 0.8)",
                  "0 0 10px rgba(34, 211, 238, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Loading Portfolio...
            </motion.h1>

            {/* Progress Bar */}
            <div className="w-80 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="text-white/80 text-lg font-medium"
            >
              {Math.round(loadingProgress)}%
            </motion.div>

            {/* Loading Status Messages */}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-white/60 text-sm"
            >
              {loadingProgress < 30 && "Initializing components..."}
              {loadingProgress >= 30 && loadingProgress < 60 && "Loading projects..."}
              {loadingProgress >= 60 && loadingProgress < 90 && "Setting up animations..."}
              {loadingProgress >= 90 && "Almost ready!"}
            </motion.div>

            {/* Animated Dots */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                    backgroundColor: ["rgba(34, 211, 238, 0.8)", "rgba(168, 85, 247, 0.8)", "rgba(236, 72, 153, 0.8)"],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                  className="w-3 h-3 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
        {/* Custom Cursor */}
        <motion.div
          className="fixed w-6 h-6 bg-blue-500/30 rounded-full pointer-events-none z-50 mix-blend-difference"
          animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent cursor-pointer"
                onClick={() => scrollToSection("home")}
              >
                Guruchandhran M
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-cyan-500 text-white shadow-lg"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Theme Toggle & Mobile Menu */}
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-3 rounded-full bg-gray-100 dark:bg-gray-800"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="container mx-auto px-6 py-4 space-y-2">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 10 }}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <motion.div style={{ y }} className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </motion.div>

            <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-20 left-40 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-6 z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-4"
                >
                  <motion.h1
                    className="text-4xl lg:text-6xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                      className="inline-block origin-bottom-right"
                    >
                      👋
                    </motion.span>{" "}
                    Hi, I'm{" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 dark:from-cyan-300 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent animate-gradient drop-shadow-lg dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                      Guruchandhran M
                    </span>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-3xl lg:text-4xl text-gray-600 dark:text-gray-300 font-medium"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                      className="inline-block mr-3"
                    >
                      💻
                    </motion.span>
                    <TypingAnimation />
                  </motion.div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed text-justify"
                >
                  Passionate about creating{" "}
                  <span className="text-cyan-500 dark:text-blue-400 font-semibold">innovative solutions</span> and
                  building{" "}
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">amazing user experiences</span>{" "}
                  with modern technologies. Ready to make an impact in the tech world!
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex flex-wrap gap-6"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      onClick={() => scrollToSection("projects")}
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
                    >
                      <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      View Projects
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={downloadResume}
                      className="border-2 border-gray-300 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-blue-400 px-8 py-4 text-lg font-semibold bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
                    >
                      <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                      Download Resume
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="flex items-center space-x-6 pt-8"
                  >
                    <span className="text-gray-600 dark:text-gray-400">Follow me:</span>
                    {[
                      {
                        icon: Github,
                        href: "https://github.com/GD-125",
                        color: "hover:text-gray-900 dark:hover:text-white",
                      },
                      { icon: Linkedin, href: "https://linkedin.com/in/guruchandhran-m/", color: "hover:text-blue-600" },
                      { icon: Mail, href: "mailto:m.guruchandhran@gmail.com", color: "hover:text-red-500" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-gray-500 ${social.color} transition-all duration-300`}
                      >
                        <social.icon className="w-6 h-6" />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right Side - Photo */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex justify-center lg:justify-end"
              >
                <motion.div className="relative group">
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full opacity-60"
                  />
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-500 rounded-full opacity-60"
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute -inset-8 border-2 border-dashed border-blue-400/30 rounded-full"
                  />

                  {/* Main Photo Container */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
                    <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                      <Image
                        src="/Pic.png?height=400&width=400&text=Photo"
                        alt="Guruchandhran M - Software Developer"
                        width={400}
                        height={400}
                        className="rounded-full border-4 border-white dark:border-gray-800 shadow-2xl object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 group-hover:from-cyan-500/30 group-hover:to-purple-600/30 transition-all duration-500"></div>
                    </div>
                  </motion.div>

                  {/* Skill Badges Floating Around Photo */}
                  {["React", "Node.js", "Security", "Python"].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + index * 0.2, duration: 0.5 }}
                      className={`absolute ${
                        index === 0
                          ? "-top-8 left-8"
                          : index === 1
                            ? "top-8 -right-8"
                            : index === 2
                              ? "-bottom-8 right-8"
                              : "bottom-8 -left-8"
                      }`}
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2 + index * 0.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-sm font-medium"
                      >
                        {skill}
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => scrollToSection("about")}
              >
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
                <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Me Section */}
        <section
          id="about"
          className="py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-6xl font-bold mb-6 text-cyan-500 dark:text-cyan-400"
              >
                Who Am I? <span className="animate-bounce inline-block">🧍‍♂️</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl text-gray-700 dark:text-gray-300"
              >
                Get to know the person behind the code
              </motion.p>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16 max-w-4xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  Passionate Developer & Problem Solver
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I'm a recent Computer Science graduate with an insatiable curiosity for technology and a passion for
                  creating solutions that make a difference. I believe in writing clean, efficient code and building
                  applications that not only work flawlessly but also provide exceptional user experiences.
                </p>
              </div>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Technologies & Skills */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-2xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                    <span className="text-3xl mr-3">🛠️</span>
                    Technologies & Skills
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-600 group hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{skill.icon}</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                          >
                            {skill.category}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 h-3 rounded-full relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          </motion.div>
                        </div>
                        <div className="text-right text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">
                          {skill.level}%
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Education & Interests */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Education */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-2xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                    <span className="text-3xl mr-3">🎓</span>
                    Education
                  </h4>
                  <div className="space-y-6">
                    <div className="relative pl-8 border-l-4 border-blue-500">
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                      <div className="space-y-2">
                        <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                          Bachelor of Technology in Information Technology
                        </h5>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">P.A. College of Engineering and Technology • 2022 - 2026</p>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">CGPA:</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 h-3 bg-gray-200 dark:bg-gray-600 rounded-full">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "85%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                              ></motion.div>
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">8.6/10</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 text-justify">
                            <strong className="text-gray-900 dark:text-white">Relevant Coursework:</strong> Data
                            Structures, Algorithms, Database Management, Software Engineering, Web Development, Machine
                            Learning
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interests & Passions */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-3xl border border-blue-200 dark:border-blue-800 shadow-xl">
                  <h4 className="text-2xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                    <span className="text-3xl mr-3">🎯</span>
                    Interests & Passions
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Web Development", icon: "🌐", color: "from-blue-500 to-cyan-500" },
                      { name: "Mobile Apps", icon: "📱", color: "from-green-500 to-emerald-500" },
                      { name: "Cybersecurity", icon: "🔒", color: "from-red-500 to-pink-500" },
                      { name: "Open Source", icon: "🔓", color: "from-orange-500 to-red-500" },
                      { name: "AI/ML", icon: "🤖", color: "from-indigo-500 to-purple-500" },
                      { name: "Networking", icon: "🔗", color: "from-teal-500 to-cyan-500" },
                    ].map((interest, index) => (
                      <motion.div
                        key={interest.name}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-default group"
                      >
                        <div className="text-center space-y-2">
                          <div
                            className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${interest.color} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}
                          >
                            {interest.icon}
                          </div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{interest.name}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                      "I believe in continuous learning and staying updated with the latest technologies to create
                      innovative solutions."
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-6xl font-bold mb-6 dark:text-cyan-300"
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  className="inline-block"
                >
                  🚀
                </motion.span>{" "}
                Featured Projects
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl text-gray-600 dark:text-gray-400"
              >
                Some of my recent work that I'm proud of
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {projects
                .filter((p) => p.featured)
                .map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Card className="h-full bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden group">
                      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 dark:opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-cyan-500 text-white">Featured</Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="sm"
                              onClick={() => openProject(project.liveDemo)}
                              className="bg-cyan-500 hover:bg-cyan-600 text-white w-full"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Live Demo
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                      <CardContent className="p-8 space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <motion.div key={tech} whileHover={{ scale: 1.1 }} className="cursor-default">
                              <Badge
                                variant="secondary"
                                className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>

            {/* Other Projects */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-bold text-center mb-12">Other Notable Projects</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {projects
                  .filter((p) => !p.featured)
                  .map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="h-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 group">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-start justify-between">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300">
                              {project.title}
                            </h4>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => openProject(project.liveDemo)}
                                className="text-gray-500 hover:text-cyan-600 transition-colors duration-300"
                              >
                                <ExternalLink className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-justify">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, 4).map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.tech.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.tech.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* View All Projects Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => openProject("https://github.com/GD-125")}
                  className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 group"
                >
                  <Github className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  View All Projects on GitHub
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Certifications Section */}
        <section
          id="certifications"
          className="py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-6xl font-bold mb-6 dark:text-cyan-300"
              >
                <motion.span
                  animate={{ rotateY: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                  className="inline-block"
                >
                  📜
                </motion.span>{" "}
                Certifications
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl text-gray-600 dark:text-gray-400"
              >
                My learning achievements and professional credentials
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, rotateY: 90 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="h-full bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-300"></div>
                      <CardContent className="p-6 space-y-4 relative">
                        <div className="flex items-center justify-between">
                          <div className="relative">
                            <Image
                              src={cert.logo || "/placeholder.svg"}
                              alt={cert.issuer}
                              width={320}
                              height={160}
                              className="rounded-lg shadow-md"
                            />
{/*                             {cert.verified && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                              >
                                <Check className="w-3 h-3 text-white" />
                              </motion.div>
                            )} */}
                          </div>
{/*                           <Badge
                            variant="secondary"
                            className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            {cert.date}
                          </Badge> */}
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-bold text-lg leading-tight group-hover:text-cyan-500 transition-colors duration-300">
                            {cert.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{cert.issuer}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{cert.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">Date: {cert.date}</p>
                        </div>

{/*                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                            onClick={() => window.open("#", "_blank")}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Certificate
                            <motion.div
                              className="ml-2"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <ArrowRight className="w-4 h-4" />
                            </motion.div>
                          </Button>
                        </motion.div> */}

                        {/* Floating Achievement Badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="absolute -top-2 -left-2"
                        >
                          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                            <Star className="w-4 h-4 text-yellow-800" />
                          </div>
                        </motion.div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          {/* View More Button */}
{/*             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => setShowCertificationsModal(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <Eye className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  View More Certifications
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </motion.div>
            </motion.div> */}

            {/* Certification Stats */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            >
              {[
                { number: "6+", label: "Certifications", icon: "🏆" },
                { number: "100%", label: "Verified", icon: "✅" },
                { number: "2025", label: "Latest", icon: "📅" },
                { number: "100%", label: "Passion Level", icon: "🔥" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-cyan-500 dark:text-cyan-400 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
{/* Contests Section */}
        <section id="contests" className="py-32 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-6xl font-bold mb-6 dark:text-cyan-300"
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  className="inline-block"
                >
                  🏆
                </motion.span>{" "}
                Contests & Competitions
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl text-gray-600 dark:text-gray-400"
              >
                My competitive programming and hackathon journey
              </motion.p>
            </motion.div>

            {/* Contest Categories Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {[
                { id: "hackathons", label: "Hackathons", icon: "💻", color: "from-red-500 to-orange-500" },
                { id: "events", label: "Events", icon: "🎯", color: "from-blue-500 to-indigo-500" },
                { id: "forage", label: "Forage Simulations", icon: "🎓", color: "from-green-500 to-emerald-500" },
              ].map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveContestTab(category.id)}
                  className={`px-6 py-3 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 ${
                    activeContestTab === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.label}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Contest Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeContestTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto"
              >
                {/* Hackathons Content */}
                {activeContestTab === "hackathons" && (
                  <div className="space-y-6">
                    {[
                      {
                        title: "NAF Uzhavu Hackathon",
                        organizer: "IIT Madras",
                        location: "Chennai, Tamil Nadu",
                        date: "Jan 2025",
                        description:
                          "Participated in agricultural technology hackathon focusing on innovative farming solutions. Developed a comprehensive platform for farmers to optimize crop yield using IoT sensors and machine learning algorithms.",
                        image: "/hackathon/naf.jpeg?height=200&width=300&text=NAF+Uzhavu+Hackathon",
                        achievement: "Finalist",
                        color: "from-green-500 to-emerald-500",
                      },
                      {
                        title: "36 Hours HackFest",
                        organizer: "M.Kumarasamy College of Engineering, Karur",
                        location: "Karur, Tamil Nadu",
                        date: "Mar 2025",
                        description:
                          "Intensive 36-hour hackathon developing innovative tech solutions. Created a real-time collaboration platform for remote teams with advanced video conferencing and project management features.",
                        image: "/hackathon/36.jpg?height=200&width=300&text=36+Hours+HackFest",
                        achievement: "Participant",
                        color: "from-blue-500 to-cyan-500",
                      },
                      {
                        title: "Seed Hackathon",
                        organizer: "Seed Global Education",
                        location: "Online",
                        date: "Nov 2024",
                        description:
                          "Educational technology hackathon focusing on learning innovations. Built an AI-powered personalized learning assistant that adapts to individual student learning patterns and preferences.",
                        image: "/hackathon/seed.jpeg?height=200&width=300&text=Seed+Hackathon",
                        achievement: "Participant",
                        color: "from-purple-500 to-pink-500",
                      },
                    ].map((hackathon, index) => (
                      <motion.div
                        key={hackathon.title}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-3xl shadow-xl border border-red-200 dark:border-red-800 group"
                      >
                        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                          {/* Image */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative flex-shrink-0 w-full lg:w-80 h-48 lg:h-56 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300"
                          >
                            <Image
                              src={hackathon.image || "/hackathon/hackathon.png"}
                              alt={hackathon.title}
                              width={320}
                              height={224}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute top-4 right-4">
                              <Badge className={`bg-gradient-to-r ${hackathon.color} text-white border-0`}>
                                {hackathon.achievement}
                              </Badge>
                            </div>
                            <div className="absolute bottom-4 left-4">
                              <div className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                                Hackathon
                              </div>
                            </div>
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300">
                                {hackathon.title}
                              </h3>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                  <span className="text-lg">🏢</span>
                                  <span className="font-medium">{hackathon.organizer}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                  <MapPin className="w-4 h-4" />
                                  <span>{hackathon.location}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                  <Calendar className="w-4 h-4" />
                                  <span>{hackathon.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                              {hackathon.description}
                            </p>
                            {/* <div className="flex items-center space-x-4 pt-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                              >
                                <Eye className="w-4 h-4" />
                                <span>View Details</span>
                              </motion.button>
                            </div> */}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Events Content */}
                {activeContestTab === "events" && (
                  <div className="space-y-6">
                    {[
                      {
                        title: "Code Vault",
                        organizer: "Department of CSE",
                        location: "College Campus",
                        date: "Oct 2024",
                        description:
                          "Competitive programming event focusing on algorithmic problem solving. Participated in various coding challenges including data structures, algorithms, and mathematical problem-solving competitions.",
                        image: "/events/code.png?height=200&width=300&text=Code+Vault",
                        achievement: "Participant",
                        color: "from-indigo-500 to-purple-500",
                      },
                      {
                        title: "Code Warriors",
                        organizer: "Engiversee",
                        location: "Online",
                        date: "Dec 2024",
                        description:
                          "Coding competition testing programming skills and logical thinking. Solved complex algorithmic problems and competed with developers from across the country in real-time coding challenges.",
                        image: "/events/codewarriors.jpeg?height=200&width=300&text=Code+Warriors",
                        achievement: "Participant",
                        color: "from-orange-500 to-red-500",
                      },
                      {
                        title: "Cyber Security Bootcamp",
                        organizer: "Novitech",
                        location: "Hybrid Event",
                        date: "Dec 2024",
                        description:
                          "Intensive bootcamp covering cybersecurity fundamentals and practical skills. Learned about network security, ethical hacking, vulnerability assessment, and incident response techniques.",
                        image: "/events/cyber.png?height=200&width=300&text=Cyber+Security+Bootcamp",
                        achievement: "Completed",
                        color: "from-teal-500 to-cyan-500",
                      },
                    ].map((event, index) => (
                      <motion.div
                        key={event.title}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-3xl shadow-xl border border-blue-200 dark:border-blue-800 group"
                      >
                        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                          {/* Image */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative flex-shrink-0 w-full lg:w-80 h-48 lg:h-56 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300"
                          >
                            <Image
                              src={event.image || "/events/events.png"}
                              alt={event.title}
                              width={320}
                              height={224}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute top-4 right-4">
                              <Badge className={`bg-gradient-to-r ${event.color} text-white border-0`}>
                                {event.achievement}
                              </Badge>
                            </div>
                            <div className="absolute bottom-4 left-4">
                              <div className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                                Event
                              </div>
                            </div>
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                                {event.title}
                              </h3>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                  <span className="text-lg">🏢</span>
                                  <span className="font-medium">{event.organizer}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                  <Calendar className="w-4 h-4" />
                                  <span>{event.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                              {event.description}
                            </p>
                            {/* <div className="flex items-center space-x-4 pt-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                              >
                                <Eye className="w-4 h-4" />
                                <span>View Details</span>
                              </motion.button>
                            </div> */}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Forage Simulations Content */}
                {activeContestTab === "forage" && (
                  <div className="space-y-6">
                    {[
                      {
                        title: "Cybersecurity Analyst Job Simulation",
                        organizer: "TCS by Forage",
                        location: "Online",
                        date: "May 2025",
                        description:
                          "Comprehensive simulation of cybersecurity analyst role with real-world scenarios. Gained hands-on experience in threat detection, incident response, security monitoring, and vulnerability assessment in enterprise environments.",
                        image: "/forage/tata.png?height=200&width=300&text=TCS+Cybersecurity+Simulation",
                        achievement: "Completed",
                        color: "from-emerald-500 to-teal-500",
                      },
                      {
                        title: "Shields Up: Cybersecurity Job Simulation",
                        organizer: "AIG by Forage",
                        location: "Online",
                        date: "June 2025",
                        description:
                          "Advanced cybersecurity simulation focusing on threat detection and response. Learned about risk assessment, security frameworks, compliance requirements, and advanced persistent threat (APT) analysis techniques.",
                        image: "/forage/aig.png?height=200&width=300&text=AIG+Shields+Up+Simulation",
                        achievement: "Completed",
                        color: "from-cyan-500 to-blue-500",
                      },
                    ].map((forage, index) => (
                      <motion.div
                        key={forage.title}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-3xl shadow-xl border border-green-200 dark:border-green-800 group"
                      >
                        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                          {/* Image */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative flex-shrink-0 w-full lg:w-80 h-48 lg:h-56 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300"
                          >
                            <Image
                              src={forage.image || "/forage.png"}
                              alt={forage.title}
                              width={320}
                              height={224}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute top-4 right-4">
                              <Badge className={`bg-gradient-to-r ${forage.color} text-white border-0`}>
                                {forage.achievement}
                              </Badge>
                            </div>
                            <div className="absolute bottom-4 left-4">
                              <div className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                                Simulation
                              </div>
                            </div>
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-300">
                                {forage.title}
                              </h3>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                  <span className="text-lg">🏢</span>
                                  <span className="font-medium">{forage.organizer}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                  <MapPin className="w-4 h-4" />
                                  <span>{forage.location}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                  <Calendar className="w-4 h-4" />
                                  <span>{forage.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                              {forage.description}
                            </p>
                            {/* <div className="flex items-center space-x-4 pt-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                              >
                                <Eye className="w-4 h-4" />
                                <span>View Certificate</span>
                              </motion.button>
                            </div> */}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Contest Summary Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-3xl border border-purple-200 dark:border-purple-800 shadow-xl"
            >
              <h4 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                Contest Journey Summary
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: "3", label: "Hackathons", icon: "💻", color: "text-red-600 dark:text-red-400" },
                  { number: "3", label: "Events", icon: "🎯", color: "text-blue-600 dark:text-blue-400" },
                  { number: "2", label: "Simulations", icon: "🎓", color: "text-green-600 dark:text-green-400" },
                  { number: "8", label: "Total", icon: "🏆", color: "text-purple-600 dark:text-purple-400" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center group"
                  >
                    <div className="text-4xl mb-3 group-hover:animate-bounce">{stat.icon}</div>
                    <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Leadership & Achievements Section */}
        <section className="py-32 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-6xl font-bold mb-6 dark:text-cyan-300"
              >
                <motion.span
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  className="inline-block"
                >
                  🏆
                </motion.span>{" "}
                Leadership & Achievements
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl text-gray-600 dark:text-gray-400"
              >
                Leading initiatives and achieving excellence
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* Leadership Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 md:p-8 rounded-3xl border border-blue-200 dark:border-blue-800 shadow-xl">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center text-gray-900 dark:text-white">
                    <span className="text-3xl md:text-4xl mr-3 md:mr-4">👨‍💼</span>
                    Leadership
                  </h3>

                  <div className="space-y-4 md:space-y-6">
                    {[
                      {
                        title: "Department Secretary",
                        organization: "Information Technology",
                        period: "2025-Present",
                        description: "Led departmental activities and coordinated between faculty and students.",
                        icon: "🎯",
                        color: "from-blue-500 to-cyan-500",
                      },
                      {
                        title: "Department Placement Coordinator",
                        organization: "Career Services",
                        period: "2023-Present",
                        description: "Coordinated placement activities and helped students with career guidance.",
                        icon: "💼",
                        color: "from-green-500 to-emerald-500",
                      },
                      {
                        title: "Events Technical Lead",
                        organization: "Technical Symposium",
                        period: "2024-Present",
                        description: "Led technical event organization and managed technical competitions.",
                        icon: "⚡",
                        color: "from-purple-500 to-pink-500",
                      },
                      {
                        title: "ISTE Member",
                        organization: "Indian Society for Technical Education",
                        period: "2022-Present",
                        description: "Active member contributing to technical education initiatives.",
                        icon: "🎓",
                        color: "from-orange-500 to-red-500",
                      },
                    ].map((leadership, index) => (
                      <motion.div
                        key={leadership.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                          <div
                            className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-r ${leadership.color} flex items-center justify-center text-xl md:text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0`}
                          >
                            {leadership.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                              <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                                {leadership.title}
                              </h4>
                              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mt-1 sm:mt-0 self-start">
                                Leadership
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                              {leadership.organization}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">{leadership.period}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {leadership.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Achievements Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 md:p-8 rounded-3xl border border-yellow-200 dark:border-yellow-800 shadow-xl">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center text-gray-900 dark:text-white">
                    <span className="text-3xl md:text-4xl mr-3 md:mr-4">🏅</span>
                    Achievements
                  </h3>

                  <div className="space-y-4 md:space-y-6">
                    {[
                      {
                        title: "Finalist in NAF Uzhavu Hackathon",
                        event: "IIT Madras",
                        achievement: "Top 10 Finalist",
                        date: "Jan 2025",
                        description:
                          "Developed innovative agricultural technology solution and reached finals among 1300+ teams.",
                        icon: "🚀",
                        color: "from-green-500 to-teal-500",
                      },
                      {
                        title: "1st Prize in Intra College Project Expo",
                        event: "College Technical Symposium",
                        achievement: "First Place",
                        date: "2024",
                        description:
                          "Won first prize for innovative project presentation and technical implementation.",
                        icon: "🥇",
                        color: "from-yellow-500 to-orange-500",
                      },
                    ].map((achievement, index) => (
                      <motion.div
                        key={achievement.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 group relative overflow-hidden"
                      >
                        {/* Achievement Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative z-10">
                          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                            <div
                              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r ${achievement.color} flex items-center justify-center text-2xl md:text-3xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 flex-shrink-0`}
                            >
                              {achievement.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                                <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300 leading-tight">
                                  {achievement.title}
                                </h4>
                                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs mt-1 sm:mt-0 self-start">
                                  Achievement
                                </Badge>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                  {achievement.event}
                                </p>
                                <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full mt-1 sm:mt-0 self-start">
                                  {achievement.date}
                                </span>
                              </div>
                              <div className="mb-3">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/50 dark:to-orange-900/50 text-yellow-800 dark:text-yellow-200">
                                  <Star className="w-4 h-4 mr-1" />
                                  {achievement.achievement}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Floating Achievement Elements */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-60 transition-opacity duration-300"
                        >
                          <Star className="w-4 h-4 text-yellow-800" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Achievement Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-8 grid grid-cols-2 gap-4"
                  >
                    {[
                      { number: "2", label: "Major Awards", icon: "🏆" },
                      { number: "500+", label: "Teams Competed", icon: "👥" },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center"
                      >
                        <div className="text-2xl mb-2">{stat.icon}</div>
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stat.number}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Publications Section */}
        <section id="publications" className="py-32 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-6xl font-bold mb-6 dark:text-cyan-300"
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  className="inline-block"
                >
                  📚
                </motion.span>{" "}
                Publications
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl text-gray-600 dark:text-gray-400"
              >
                Research contributions and knowledge sharing
              </motion.p>
            </motion.div>

            {/* Research Papers Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-3xl border border-green-200 dark:border-green-800 shadow-xl">
                <h3 className="text-3xl font-bold mb-8 flex items-center text-gray-900 dark:text-white">
                  <span className="text-4xl mr-4">📄</span>
                  Research Papers
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title:
                        "Real-time Network Traffic Visualization and Analysis: A Web-based Network Monitoring System",
                      journal: "TNSTC Sponsored Conference",
                      date: "2025",
                      status: "Published",
                      description:
                        "This research paper explores innovative approaches to educate students by teaching how the actual Network Monitoring Tools like NMAP, Wireshark, etc. will work.",
                      tags: ["Network Monitoring", "Web Development", "Real-time Analysis"],
                      link: "https://drive.google.com/file/d/1LP_rDYIg_M4j21yM90Pea--82wNknqjO/view?pli=1",
                    },
                    {
                      title:
                        "From Theory to Practice: Keylogger Detection and Cyber Threat Intelligence in IT Security Education",
                      journal: "International Conference",
                      date: "2025",
                      status: "Published",
                      description:
                        "A comprehensive analysis of Keylogger which creates awareness among individuals and students about the major hidden threat in the Modern-era.",
                      tags: ["Cybersecurity", "Education", "Threat Intelligence"],
                      link: "https://drive.google.com/file/d/10-FQYpAg3nOqV_BIzRxOdaK2Ha_awF4q/view",
                    },
                  ].map((paper, index) => (
                    <motion.div
                      key={paper.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 group cursor-pointer"
                      onClick={() => window.open(paper.link, "_blank")}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-300 mb-2 text-justify">
                            {paper.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            {paper.journal} • {paper.date}
                          </p>
                        </div>
                        <Badge className="ml-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {paper.status}
                        </Badge>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed text-justify">
                        {paper.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {paper.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center text-green-500 dark:text-green-400 text-sm font-medium group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors duration-300">
                        <FileText className="w-4 h-4 mr-2" />
                        <span>Read Paper</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Articles Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-8"
              >
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-8 rounded-3xl border border-blue-200 dark:border-blue-800 shadow-xl">
                  <h3 className="text-3xl font-bold mb-8 flex items-center text-gray-900 dark:text-white">
                    <span className="text-4xl mr-4">📝</span>
                    Articles
                  </h3>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Authentication Bypass using SQL Injection on Login Page",
                        type: "Tech Article",
                        date: "2024",
                        description: "This article addresses how to bypass Login pages by using SQL Injection attacks.",
                        tags: ["SQL Injection", "Cybersecurity", "Authentication"],
                        link: "https://www.tutorialspoint.com/authentication-bypass-using-sql-injection-on-login-page",
                      },
                      {
                        title: "How to Set Git Username and Password in GitBash?",
                        type: "Tech Article",
                        date: "2024",
                        description: "An article which clearly describes how to set username and password in Gitbash.",
                        tags: ["Git", "Version Control", "Tutorial"],
                        link: "https://www.tutorialspoint.com/how-to-set-git-username-and-password-in-gitbash",
                      },
                      {
                        title: "Top 10 AI Tools for Text Spam Detection",
                        type: "Tech Article",
                        date: "2024",
                        description: "This article describes the Top 10 AI tools to detect Spam Texts.",
                        tags: ["AI", "Machine Learning", "Spam Detection"],
                        link: "https://www.tutorialspoint.com/top-10-ai-tools-for-text-spam-detection",
                      },
                      {
                        title: "10 Best AI Tools for Inventory Management",
                        type: "Tech Article",
                        date: "2024",
                        description:
                          "A comprehensive article consisting of 10 AI tools used for Inventory Management in the industry.",
                        tags: ["AI", "Inventory Management", "Business"],
                        link: "https://www.tutorialspoint.com/top-10-ai-tools-for-text-spam-detection",
                      },
                      {
                        title: "Top 15 Extensions for ReactJS in VSCode",
                        type: "Tech Article",
                        date: "2024",
                        description: "This article shows that top 15 extensions required for ReactJS in VSCode.",
                        tags: ["React", "VSCode", "Development Tools"],
                        link: "https://www.tutorialspoint.com/top-extensions-for-reactjs-in-vscode",
                      },
                    ].map((article, index) => (
                      <motion.div
                        key={article.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 group cursor-pointer"
                        onClick={() => window.open(article.link, "_blank")}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300 mb-2">
                              {article.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                              {article.type}, {article.date}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed text-justify">
                          {article.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center text-cyan-500 dark:text-cyan-400 text-sm font-medium group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300">
                          <span>Read Article</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Conference Presentations */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-3xl border border-purple-200 dark:border-purple-800 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                    <span className="text-3xl mr-3">🎤</span>
                    Conference Presentations
                  </h3>

                  <div className="space-y-6">
                    {[
                      {
                        title: "International Conference on Emerging Trends in Artificial Intelligence (ICETAI'25)",
                        conference: "DSCE, Coimbatore",
                        location: "Coimbatore",
                        date: "March 2025",
                        type: "Conference Presentation",
                        description:
                          "Presented research on emerging trends in artificial intelligence and its applications.",
                        link: "https://drive.google.com/file/d/1CPc--PvTclFHNiuu_6rkX90ikxJQHJlo/view?usp=drive_link",
                      },
                      {
                        title:
                          "Futuristic Trends in Artificial Intelligence and Nano Science for Modern Engineering Applications",
                        conference: "PACET, Pollachi",
                        location: "Pollachi",
                        date: "January 2025",
                        type: "Conference Presentation",
                        description:
                          "Discussed futuristic trends combining AI and nano science for engineering applications.",
                        link: "https://drive.google.com/file/d/1CPc--PvTclFHNiuu_6rkX90ikxJQHJlo/view?usp=drive_link",
                      },
                    ].map((presentation, index) => (
                      <motion.div
                        key={presentation.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 group cursor-pointer"
                        onClick={() => window.open(presentation.link, "_blank")}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs">
                              {presentation.type}
                            </Badge>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{presentation.date}</span>
                          </div>

                          <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 leading-tight text-justify">
                            {presentation.title}
                          </h4>

                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {presentation.conference}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {presentation.location}
                            </p>
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                            {presentation.description}
                          </p>

                          <div className="flex items-center text-purple-500 dark:text-purple-400 text-sm font-medium group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300">
                            <Play className="w-4 h-4 mr-2" />
                            <span>View Slides</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Publication Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-cyan-200 dark:border-cyan-800"
                >
                  <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Publication Impact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { number: "2", label: "Research Papers", icon: "📄" },
                      { number: "5", label: "Articles", icon: "📝" },
                      { number: "2", label: "Conferences", icon: "🎤" },
                      { number: "2025", label: "Latest", icon: "📅" },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center"
                      >
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">{stat.number}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-6xl font-bold mb-6 dark:text-cyan-400"
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  className="inline-block"
                >
                  📬
                </motion.span>{" "}
                Let's Connect
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              >
                Always open to collaboration, opportunities, and interesting conversations about technology
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-9xl mx-auto">
              {[
                {
                  icon: Mail,
                  title: "📧 Email",
                  value: "m.guruchandhran@gmail.com",
                  subtitle: emailCopied ? "Copied to clipboard!" : "Click to copy",
                  action: copyEmail,
                  color: "from-red-500 to-pink-500",
                  bgColor: "bg-red-50 dark:bg-red-900/20",
                  hoverColor: "hover:bg-red-100 dark:hover:bg-red-900/30",
                },
                {
                  icon: Github,
                  title: "💻 GitHub",
                  value: "@GD-125",
                  subtitle: "View my repositories",
                  action: () => openProject("https://github.com/GD-125"),
                  color: "from-gray-600 to-gray-800",
                  bgColor: "bg-gray-50 dark:bg-gray-800/50",
                  hoverColor: "hover:bg-gray-100 dark:hover:bg-gray-800/70",
                },
                {
                  icon: Linkedin,
                  title: "🌐 LinkedIn",
                  value: "Guruchandhran M",
                  subtitle: "Let's network",
                  action: () => openProject("https://linkedin.com/in/guruchandhran-m"),
                  color: "from-blue-600 to-blue-800",
                  bgColor: "bg-blue-50 dark:bg-blue-900/20",
                  hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
                },
                {
                  icon: MapPin,
                  title: "📍 Location",
                  value: "Pollachi, Tamilnadu",
                  subtitle: "Open to remote work",
                  action: () => {},
                  color: "from-green-500 to-emerald-600",
                  bgColor: "bg-green-50 dark:bg-green-900/20",
                  hoverColor: "hover:bg-green-100 dark:hover:bg-green-900/30",
                },
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center group cursor-pointer"
                  onClick={contact.action}
                >
                  <div
                    className={`${contact.bgColor} ${contact.hoverColor} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 group-hover:border-transparent relative overflow-hidden`}
                  >
                    {/* Background Gradient Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="relative z-10 mb-6"
                    >
                      <div
                        className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      >
                        <contact.icon className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10 space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {contact.title}
                      </h3>
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                        {contact.value}
                      </p>
                      <p
                        className={`text-sm transition-all duration-300 ${
                          contact.title.includes("Email") && emailCopied
                            ? "text-green-600 dark:text-green-400 font-semibold"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {contact.subtitle}
                      </p>
                    </div>

                    {/* Hover Effect Particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-20"
            >
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-12 rounded-3xl border border-blue-200 dark:border-blue-800 max-w-4xl mx-auto">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="text-6xl mb-6"
                >
                  💬
                </motion.div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  Ready to Start a Conversation?
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Whether you have a project in mind, want to discuss opportunities, or just want to chat about
                  technology, I'd love to hear from you!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      onClick={copyEmail}
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    >
                      <Mail className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                      Get In Touch
                      <Zap className="w-5 h-5 ml-2 group-hover:animate-pulse" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={downloadResume}
                      className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 group bg-transparent"
                    >
                      <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                      Download Resume
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Floating Geometric Shapes */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute ${
                  i % 3 === 0
                    ? "w-4 h-4 bg-blue-500/20 rounded-full"
                    : i % 3 === 1
                      ? "w-6 h-6 bg-purple-500/20 rotate-45"
                      : "w-3 h-8 bg-pink-500/20 rounded-full"
                }`}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.sin(i) * 50, 0],
                  rotate: [0, 360],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 h-full">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border-r border-white/10 h-full"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 py-20">
            <div className="container mx-auto px-6">
              {/* Main Footer Content */}
              <div className="grid lg:grid-cols-4 gap-12 mb-16">
                {/* Brand Section */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="lg:col-span-2 space-y-6"
                >
                  <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                      Guruchandhran M
                    </h3>
                  </motion.div>
                  <p className="text-xl text-gray-300 leading-relaxed max-w-md text-justify">
                    Crafting digital experiences with passion, precision, and purpose. Let's build something amazing
                    together.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-gray-300">
                      <p className="text-sm">Available for opportunities</p>
                      <p className="text-xs text-gray-400">Remote • Full-time </p>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
                  <div className="space-y-3">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ x: 10, color: "#60a5fa" }}
                        onClick={() => scrollToSection(item.id)}
                        className="flex items-center text-gray-400 hover:text-cyan-500 transition-all duration-300 group"
                      >
                        <span className="mr-3 text-lg group-hover:animate-bounce">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h4 className="text-xl font-bold text-white mb-4">Get In Touch</h4>
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                      onClick={copyEmail}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">m.guruchandhran@gmail.com</p>
                        <p className="text-xs text-gray-400">{emailCopied ? "Copied!" : "Click to copy"}</p>
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 text-gray-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Pollachi, Tamilnadu</p>
                        <p className="text-xs text-gray-400">Open to remote work</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Social Media & CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="border-t border-white/20 pt-12 mb-12"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
                  {/* Social Links */}
                  <div className="flex items-center space-x-6">
                    <span className="text-gray-400 font-medium">Follow me:</span>
                    {[
                      {
                        icon: Github,
                        href: "https://github.com/GD-125",
                        label: "GitHub",
                        color: "from-gray-600 to-gray-800",
                      },
                      {
                        icon: Linkedin,
                        href: "https://linkedin.com/in/guruchandhran-m",
                        label: "LinkedIn",
                        color: "from-blue-600 to-blue-800",
                      },
                      {
                        icon: Mail,
                        href: "mailto:m.guruchandhran@gmail.com",
                        label: "Email",
                        color: "from-red-500 to-pink-600",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="group relative"
                        aria-label={social.label}
                      >
                        <div
                          className={`w-14 h-14 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                        >
                          <social.icon className="w-7 h-7 text-white relative z-10" />
                          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                          {social.label}
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={copyEmail}
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                      >
                        <Mail className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                        Let's Talk
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        onClick={downloadResume}
                        className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-6 py-3 font-semibold transition-all duration-300 group bg-transparent"
                      >
                        <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                        Resume
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="border-t border-white/20 pt-8 text-center space-y-4"
              >
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <p className="text-gray-400">
                    © 2025 DevQueens. Crafted with{" "}
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                      className="text-red-500 inline-block"
                    >
                      ❤️
                    </motion.span>{" "}
                    and lots of{" "}
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="inline-block"
                    >
                      ☕
                    </motion.span>
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <span className="flex items-center">
                      <span className="text-blue-400 font-semibold mr-1">Next.js</span> •
                    </span>
                    <span className="flex items-center">
                      <span className="text-purple-400 font-semibold mr-1">Tailwind</span> •
                    </span>
                    <span className="flex items-center">
                      <span className="text-pink-400 font-semibold">Framer Motion</span>
                    </span>
                  </div>
                </div>

                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="text-center"
                >
                  <p className="text-sm text-gray-500 italic">
                    "The best way to predict the future is to create it" ✨
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: scrollYProgress.get() > 0.2 ? 1 : 0, scale: scrollYProgress.get() > 0.2 ? 1 : 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection("home")}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center group"
        >
          <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            <ChevronDown className="w-6 h-6 rotate-180 group-hover:animate-bounce" />
          </motion.div>
        </motion.button>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .typewriter {
          overflow: hidden;
          border-right: 0.15em solid #3b82f6;
          white-space: nowrap;
          margin: 0 auto;
          letter-spacing: 0.05em;
          animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: #3b82f6; }
        }

        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .dark ::-webkit-scrollbar-track {
          background: #1e293b;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }

        /* Enhanced Dark Theme Visibility */
        .dark {
          --foreground: 255 255 255;
          --card-foreground: 255 255 255;
          --popover-foreground: 255 255 255;
          --primary-foreground: 15 23 42;
          --secondary-foreground: 255 255 255;
          --muted-foreground: 203 213 225;
          --accent-foreground: 255 255 255;
          --destructive-foreground: 255 255 255;
        }

        .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6 {
          color: #56FFFF !important;
        }

        .dark .text-gray-600 {
          color: rgb(203 213 225) !important;
        }

        .dark .text-gray-700 {
          color: rgb(226 232 240) !important;
        }

        .dark .text-gray-800 {
          color: rgb(241 245 249) !important;
        }

        .dark .text-gray-900 {
          color: rgb(255 255 255) !important;
        }
      `}</style>
    </div>
  )
}
