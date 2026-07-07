'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import {
  Play, Download, Mail, Phone, MapPin, ArrowUpRight, ArrowRight, X,
  Linkedin, Instagram, Youtube, Github, Palette, Film, Sparkles,
  Star, Layers, Zap, ChevronDown, Send, Award, Briefcase,
  GraduationCap, Trophy, Circle, Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

/* ---------------- DATA ---------------- */
const NAV = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Work', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

const SKILLS = [
  { name: 'Adobe Premiere Pro', level: 80, color: '#00D9FF' },
  { name: 'Adobe After Effects', level: 55, color: '#7A5CFF' },
  { name: 'Adobe Photoshop', level: 50, color: '#00D9FF' },
  { name: 'Autodesk Maya', level: 60, color: '#7A5CFF' },
  { name: 'Substance Painter', level: 30, color: '#00D9FF' },
  { name: 'ZBrush', level: 30, color: '#7A5CFF' },
]

const SERVICES = []

const PROJECTS = [
  { title: 'Cinematic Travel Edit', category: 'Video Editing', software: ['Premiere Pro', 'After Effects', 'Photoshop'], desc: 'A soul-stirring travel edit crafted in the Himalayas with cinematic pacing and grade.', role: 'Editor / Colorist', client: 'Personal', duration: '3 weeks', workflow: 'Ingest -> Assembly -> Rough Cut -> Sound Design -> Color -> Delivery', img: 'https://images.unsplash.com/photo-1627637819794-fba32f82be16?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', video: '/videos/cinematic-travel-edit.mp4', aspect: '9/16' },
  { title: 'Gaming Montage', category: 'Video Editing', software: ['After Effects', 'Premiere Pro'], desc: 'High-energy gaming montage with kinetic transitions and glitch effects.', role: 'Editor', client: 'Esports Team', duration: '2 weeks', workflow: 'Concept -> Sync -> FX -> Grade -> Sound -> Master', video: 'https://images.unsplash.com/photo-1601315488950-3b5047998b38?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0' },
  { title: 'Cinematic Intro Edit', category: 'Video Editing', software: ['After Effects', 'Premiere Pro'], desc: 'Signature intro sequence with kinetic type, seamless transitions and sound design.', role: 'Editor', client: 'Creator', duration: '1 week', workflow: 'Style Frames -> Edit -> Sound -> Master', video: 'https://images.unsplash.com/photo-1678986718987-76f0b9357e0f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0' },
  { title: 'Product Advertisement', category: 'Video Editing', software: ['Premiere Pro', 'After Effects'], desc: 'Cinematic product spot with studio-grade color, macro detail and punchy sound.', role: 'Editor', client: 'D2C Brand', duration: '3 weeks', workflow: 'Assembly -> Edit -> Color -> Sound -> Master', video: 'https://images.unsplash.com/photo-1652992252915-f9b6592a61a3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0' },
  { title: 'Anime Edit', category: 'Video Editing', software: ['Premiere Pro', 'After Effects'], desc: 'Beat-synced anime edit with stylized effects and cinematic color.', role: 'Editor', client: 'Community', duration: '1 week', workflow: 'Selects -> Beat Sync -> FX -> Color -> Master', video: 'https://images.unsplash.com/photo-1637140945341-f28ada987326?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0' },
  { title: 'Reel Edits', category: 'Video Editing', software: ['Premiere Pro', 'After Effects', 'CapCut'], desc: 'Fast-paced, hook-driven vertical edits engineered for Reels, Shorts and TikTok virality.', role: 'Editor', client: 'Creators / Brands', duration: 'Ongoing', workflow: 'Hook -> Cut -> Sound -> Captions -> Master', img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', video: '/videos/trend-reel.mp4', aspect: '9/16' },
  
]

const GALLERY = []

const PROCESS = [
  { step: '01', title: 'Research', desc: 'Deep-dive into brand, audience and references.' },
  { step: '02', title: 'Planning', desc: 'Storyboards, moodboards and production plan.' },
  { step: '03', title: 'Editing', desc: 'Craft cuts, pacing, color and sound.' },
  { step: '04', title: 'Review', desc: 'Iterate with feedback loops until pixel-perfect.' },
  { step: '05', title: 'Final Delivery', desc: 'Master-quality export in every required format.' },
]

const TESTIMONIALS = [
  { text: 'Retention on my channel jumped after the first cut. The pacing, the sound design, the color — everything landed.' },
  { text: 'Cinematic quality that felt like a big-budget commercial. Truly blown away by the craft.' },
  { text: 'The color grading has a signature cinematic feel. Every frame looks intentional.' },
  { text: 'Product videos that actually convert. Highly recommend for any brand who cares about quality.' },
  { text: 'Delivered on time, sharp turnaround on feedback, and the final edit exceeded expectations.' },
]

const EXPERIENCE = []


/* ---------------- COMPONENTS ---------------- */

function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setProgress(p => {
      const n = p + Math.random() * 12 + 4
      if (n >= 100) { clearInterval(t); setTimeout(onDone, 500); return 100 }
      return n
    }), 120)
    return () => clearInterval(t)
  }, [onDone])
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center"
    >
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center px-8">
        <div className="text-xs tracking-[0.5em] text-white/50 mb-6">PORTFOLIO 2025</div>
        <div className="text-4xl md:text-6xl font-bold text-gradient mb-8">AYUSH BIJALWAN</div>
        <div className="w-64 md:w-96 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto">
          <motion.div className="h-full bg-gradient-to-r from-[#00D9FF] to-[#7A5CFF]" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-4 text-sm text-white/50 font-mono">{Math.floor(progress)}%</div>
      </motion.div>
    </motion.div>
  )
}

function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0
    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY
      if (cursor) cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`
    }
    const animate = () => {
      followerX += (mouseX - followerX) * 0.15
      followerY += (mouseY - followerY) * 0.15
      if (follower) follower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`
      requestAnimationFrame(animate)
    }
    window.addEventListener('mousemove', onMove)
    const raf = requestAnimationFrame(animate)
    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)
    const attach = () => {
      const targets = document.querySelectorAll('a, button, [data-hover], input, textarea')
      targets.forEach(t => { t.addEventListener('mouseenter', onEnter); t.addEventListener('mouseleave', onLeave) })
      return targets
    }
    const targets = attach()
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      targets.forEach(t => { t.removeEventListener('mouseenter', onEnter); t.removeEventListener('mouseleave', onLeave) })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full bg-[#00D9FF] pointer-events-none z-[9999] mix-blend-difference" />
      <div ref={followerRef} className={`hidden md:block fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] transition-all duration-300 ${hovering ? 'w-16 h-16 border-[#00D9FF] bg-[#00D9FF]/10 -ml-3 -mt-3' : 'w-10 h-10 border-white/40'}`} />
    </>
  )
}

function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const jump = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}
    >
      <div className={`mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between ${scrolled ? 'glass-strong rounded-full py-2 px-6 md:px-8 mx-4 md:mx-auto' : ''}`}>
        <a onClick={() => jump('home')} data-hover className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#7A5CFF] flex items-center justify-center font-bold text-black">A</div>
          <span className="font-bold tracking-tight">Ayush<span className="text-[#00D9FF]">.</span></span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <button key={n.id} onClick={() => jump(n.id)} data-hover className={`px-4 py-2 text-sm rounded-full transition-all ${activeSection === n.id ? 'text-white bg-white/5' : 'text-white/60 hover:text-white'}`}>
              {n.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => jump('contact')} data-hover className="hidden sm:inline-flex bg-white text-black hover:bg-[#00D9FF] rounded-full px-5 h-10 font-medium group">
            Let's Talk <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:rotate-45" />
          </Button>
          <button onClick={() => setOpen(true)} data-hover className="md:hidden w-11 h-11 rounded-full glass flex items-center justify-center">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[80] bg-black/95 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#7A5CFF] flex items-center justify-center font-bold text-black">A</div>
                <span className="font-bold">Ayush<span className="text-[#00D9FF]">.</span></span>
              </div>
              <button onClick={() => setOpen(false)} className="w-11 h-11 rounded-full glass flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-8 pt-8 space-y-2">
              {NAV.map((n, i) => (
                <motion.button
                  key={n.id}
                  initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.06 }}
                  onClick={() => jump(n.id)}
                  className="block text-4xl font-bold text-white/90 hover:text-[#00D9FF] transition-colors py-2 w-full text-left"
                >
                  {n.label}
                </motion.button>
              ))}
              <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="pt-8">
                <Button onClick={() => jump('contact')} className="w-full rounded-full bg-white text-black h-12 font-medium">
                  Let's Talk <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
                <div className="pt-6"><SocialIcons /></div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00D9FF] to-[#7A5CFF] z-[60] origin-left" />
}

function Particles() {
  const [dots, setDots] = useState([])
  useEffect(() => {
    const arr = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100, y: Math.random() * 100,
      d: Math.random() * 8 + 4, s: Math.random() * 2 + 1,
    }))
    setDots(arr)
  }, [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#00D9FF]"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.s}px`, height: `${d.s}px` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: d.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function GradientBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#00D9FF] blur-[140px] opacity-20 float" />
      <div className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full bg-[#7A5CFF] blur-[140px] opacity-25 float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-[#00D9FF] blur-[120px] opacity-10 float" style={{ animationDelay: '4s' }} />
    </div>
  )
}

const BehanceIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M7.15 4.5c.98 0 1.86.08 2.65.24.8.16 1.47.42 2.03.79.56.36.99.85 1.3 1.46.31.61.46 1.37.46 2.28 0 .98-.22 1.8-.66 2.45-.44.65-1.1 1.19-1.96 1.6 1.18.34 2.06.94 2.64 1.79.58.85.87 1.87.87 3.07 0 .97-.19 1.81-.57 2.52-.38.71-.9 1.29-1.55 1.75-.65.45-1.4.79-2.24 1-.85.22-1.72.33-2.63.33H0V4.5h7.15zm-.42 6.6c.8 0 1.46-.19 1.97-.57.51-.38.77-1 .77-1.85 0-.47-.09-.86-.26-1.16-.17-.31-.4-.55-.69-.72-.29-.17-.62-.29-1-.35-.38-.06-.77-.09-1.18-.09H3.32v4.74h3.41zm.19 6.94c.44 0 .87-.04 1.28-.13.41-.09.77-.24 1.08-.44.31-.21.56-.49.75-.85.19-.36.28-.83.28-1.4 0-1.12-.32-1.92-.95-2.4-.63-.48-1.47-.72-2.51-.72H3.32v5.94h3.6zm11.9-.06c.45.44 1.11.66 1.96.66.61 0 1.14-.15 1.58-.46.44-.31.71-.63.81-.98h2.75c-.44 1.36-1.11 2.34-2.02 2.93-.9.59-2 .88-3.28.88-.89 0-1.7-.14-2.42-.43-.72-.29-1.34-.7-1.85-1.23-.51-.53-.9-1.17-1.18-1.91-.28-.74-.42-1.56-.42-2.45 0-.86.14-1.66.43-2.4.29-.74.69-1.38 1.21-1.92.52-.54 1.14-.96 1.86-1.27.72-.31 1.52-.46 2.4-.46.98 0 1.83.19 2.55.57.72.38 1.32.9 1.78 1.55.46.65.79 1.4 1 2.24.21.84.28 1.72.22 2.65h-7.83c0 .95.23 1.65.68 2.09zm3.42-5.68c-.36-.4-.94-.6-1.72-.6-.51 0-.94.09-1.29.26-.35.17-.63.39-.84.65-.21.26-.36.53-.44.82-.08.29-.13.55-.13.79h4.85c-.07-.75-.27-1.32-.63-1.72zM15.62 5.9h6.09v1.48h-6.09V5.9z" />
  </svg>
)

function SocialIcons() {
  const list = [
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: BehanceIcon, href: '#', label: 'Behance' },
    { Icon: Mail, href: '#contact', label: 'Email' },
  ]
  return (
    <div className="flex flex-row gap-3">
      {list.map(({ Icon, href, label }, i) => (
        <motion.a key={i} href={href} data-hover aria-label={label} whileHover={{ y: -4, scale: 1.05 }}
          className="w-11 h-11 rounded-full glass flex items-center justify-center text-white/70 hover:text-[#00D9FF] hover:border-[#00D9FF]/50 transition-colors">
          <Icon className="w-4 h-4" />
        </motion.a>
      ))}
    </div>
  )
}

function AnimatedCounter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const dur = 1600, t0 = performance.now()
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1)
          setVal(Math.floor(p * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{val}{suffix}</span>
}

function TextReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------------- SECTIONS ---------------- */

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 200])
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section id="home" ref={ref} className="relative min-h-screen w-full flex items-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <GradientBlobs />
      <Particles />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 w-full grid lg:grid-cols-12 gap-6 lg:gap-4 items-center">
        <motion.div style={{ y: yText, opacity }} className="lg:col-span-8 space-y-8">

          <div className="space-y-2">
            <TextReveal delay={1.4}>
              <div className="text-sm md:text-base tracking-[0.4em] text-white/50 uppercase">Portfolio</div>
            </TextReveal>
            <h1 className="text-[14vw] sm:text-[11vw] md:text-[8vw] lg:text-[6.5vw] xl:text-[6vw] font-bold leading-[0.95] tracking-tight">
              <motion.span initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 1.5, ease: [0.22, 1, 0.36, 1] }} className="block">AYUSH</motion.span>
              <motion.span initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 1.65, ease: [0.22, 1, 0.36, 1] }} className="block text-gradient whitespace-nowrap">BIJALWAN</motion.span>
            </h1>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} className="flex flex-wrap gap-3">
            {['Video Editor'].map((t, i) => (
              <span key={i} className="glass px-4 py-2 rounded-full text-sm text-white/80 border-white/10">{t}</span>
            ))}
          </motion.div>

          <TextReveal delay={2.0} className="max-w-xl text-lg text-white/60 leading-relaxed">
            I specialize in creating cinematic, engaging, and professional video edits for brands, businesses, creators, and social media. My focus is on storytelling, seamless transitions, clean pacing, color correction, and delivering high-quality visual content that captures attention and leaves a lasting impression.
          </TextReveal>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }} className="flex flex-wrap gap-3">
            <Button data-hover onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full bg-white text-black hover:bg-[#00D9FF] px-6 h-12 font-medium group">
              View Portfolio <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button data-hover variant="outline" className="rounded-full border-white/20 hover:border-[#00D9FF] hover:text-[#00D9FF] hover:bg-transparent px-6 h-12 bg-transparent">
              <Download className="w-4 h-4 mr-2" /> Download Resume
            </Button>
            <Button data-hover variant="ghost" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full text-white/80 hover:text-white hover:bg-white/5 px-6 h-12">
              Contact Me
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} className="pt-6">
            <SocialIcons />
          </motion.div>
        </motion.div>

        <motion.div style={{ y: yImg }} className="lg:col-span-4 lg:col-start-9 relative flex justify-center lg:justify-end">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }} className="relative">
            <div className="relative aspect-square w-80 sm:w-96 md:w-[420px] lg:w-full lg:max-w-[480px] rounded-full overflow-hidden noise ring-1 ring-white/10 shadow-2xl shadow-[#00D9FF]/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00D9FF]/20 via-transparent to-[#7A5CFF]/20 z-10 pointer-events-none" />
              <img src="/profile.jpeg" alt="Ayush Bijalwan" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-full z-20 pointer-events-none" />
            </div>
            
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest">
        SCROLL <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <TextReveal className="mb-16">
          <div className="text-xs tracking-[0.4em] text-[#00D9FF] mb-3">01 - ABOUT ME</div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">The art of <span className="text-gradient">the cut.</span></h2>
        </TextReveal>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <TextReveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?fm=jpg&q=70&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0" alt="Ayush working" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute bottom-6 left-6 z-20">
                <div className="text-xs text-white/50 tracking-widest">ON SET</div>
                <div className="text-lg font-semibold">Behind the craft</div>
              </div>
            </div>
          </TextReveal>

          <div className="lg:col-span-7 space-y-8">
            <TextReveal delay={0.1}>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                I am a passionate <span className="text-white font-medium">Video Editor</span> specializing in cinematic storytelling, seamless transitions, clean pacing and precise color correction. I turn raw footage into polished, high-impact content for brands, businesses, creators and social media - built to capture attention and leave a lasting impression.
              </p>
            </TextReveal>

            <div className="grid grid-cols-2 gap-4">
              {[
                { n: 3, s: '+', l: 'Years Experience' },
                { n: 6, s: '', l: 'Software' },
              ].map((s, i) => (
                <TextReveal key={i} delay={0.15 + i * 0.08}>
                  <div className="glass rounded-2xl p-6 hover:border-[#00D9FF]/50 transition-colors group">
                    <div className="text-4xl md:text-5xl font-bold text-gradient-blue mb-1"><AnimatedCounter target={s.n} suffix={s.s} /></div>
                    <div className="text-sm text-white/60">{s.l}</div>
                  </div>
                </TextReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7A5CFF]/10 blur-[160px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <TextReveal className="mb-16">
          <div className="text-xs tracking-[0.4em] text-[#00D9FF] mb-3">02 - SKILLS</div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Tools I use <span className="text-gradient">to create magic.</span></h2>
        </TextReveal>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
          {SKILLS.map((s, i) => (
            <TextReveal key={i} delay={i * 0.05}>
              <div className="group">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-lg font-medium">{s.name}</span>
                  <span className="text-sm text-white/50 font-mono">{s.level}%</span>
                </div>
                <div className="h-[6px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color === '#00D9FF' ? '#7A5CFF' : '#00D9FF'})` }} />
                </div>
              </div>
            </TextReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <TextReveal className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.4em] text-[#00D9FF] mb-3">03 - SERVICES</div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">What I <span className="text-gradient">deliver.</span></h2>
          </div>
          <p className="text-white/60 max-w-md">From cinematic edits to immersive 3D worlds - a full creative toolkit for brands, creators and studios.</p>
        </TextReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <TextReveal key={i} delay={i * 0.04}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }} data-hover
                  className="glass rounded-3xl p-7 h-full relative overflow-hidden group cursor-pointer">
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#00D9FF]/0 group-hover:bg-[#00D9FF]/10 blur-2xl transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-[#00D9FF] flex items-center justify-center mb-5 transition-colors">
                      <Icon className="w-5 h-5 group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#00D9FF] transition-colors">{s.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                    <ArrowUpRight className="w-5 h-5 mt-6 text-white/30 group-hover:text-[#00D9FF] group-hover:rotate-45 transition-all" />
                  </div>
                </motion.div>
              </TextReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p, onOpen, idx }) {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const timeoutRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    setMouse({ x: (e.clientX - r.left - r.width / 2) / 20, y: (e.clientY - r.top - r.height / 2) / 20 })
  }
  const reset = () => setMouse({ x: 0, y: 0 })
  const handleMouseEnter = () => {
  if (!videoRef.current) return

  videoRef.current.currentTime = 0
  videoRef.current.play()

  timeoutRef.current = setTimeout(() => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }, 8000)
}

const handleMouseLeave = () => {
  reset()

  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current)
  }

  if (videoRef.current) {
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }
}
  return (
    <TextReveal delay={idx * 0.04}>
      <motion.div ref={ref} onMouseMove={onMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => onOpen(p)} data-hover
        style={{ transform: `perspective(1000px) rotateY(${mouse.x}deg) rotateX(${-mouse.y}deg)` }}
        className="group relative rounded-3xl overflow-hidden cursor-pointer glass transition-transform duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
        <video
          ref={videoRef}
          src={p.video}
          muted
          playsInline
          preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
/>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 rounded-full bg-[#00D9FF]/90 flex items-center justify-center backdrop-blur">
              <Play className="w-6 h-6 text-black fill-black ml-0.5" />
            </motion.div>
          </div>
          <Badge className="absolute top-4 left-4 bg-black/60 backdrop-blur border-white/20 text-white text-[10px] tracking-widest">{p.category.toUpperCase()}</Badge>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-xl font-semibold group-hover:text-[#00D9FF] transition-colors">{p.title}</h3>
            <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-[#00D9FF] group-hover:rotate-45 transition-transform flex-shrink-0" />
          </div>
          <p className="text-sm text-white/60 line-clamp-2 mb-4">{p.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.software.slice(0, 3).map((s, i) => (
              <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">{s}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </TextReveal>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  if (!project) return null
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md overflow-y-auto" onClick={onClose}>
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
        className="min-h-screen max-w-6xl mx-auto p-6 md:p-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <div className="text-xs tracking-widest text-[#00D9FF]">{project.category.toUpperCase()}</div>
          <button onClick={onClose} data-hover className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">{project.title}</h2>
        <div
  className={`relative rounded-2xl overflow-hidden mb-10 ${
    project.aspect === "9/16"
      ? "w-full max-w-[420px] aspect-[9/16] mx-auto"
      : "w-full aspect-video"
  }`}
>
          <video
          src={project.video}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-contain bg-black"
        />
     </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[{ l: 'Client', v: project.client }, { l: 'Role', v: project.role }, { l: 'Duration', v: project.duration }].map((x, i) => (
            <div key={i} className="glass rounded-2xl p-5">
              <div className="text-xs tracking-widest text-white/40 mb-1">{x.l.toUpperCase()}</div>
              <div className="text-lg font-medium">{x.v}</div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div>
            <div className="text-xs tracking-widest text-[#00D9FF] mb-3">OVERVIEW</div>
            <p className="text-lg text-white/80 leading-relaxed">{project.desc}</p>
          </div>
          <div>
            <div className="text-xs tracking-widest text-[#00D9FF] mb-3">WORKFLOW</div>
            <p className="text-lg text-white/80 leading-relaxed">{project.workflow}</p>
          </div>
        </div>
        <div className="mb-10">
          <div className="text-xs tracking-widest text-[#00D9FF] mb-3">SOFTWARE USED</div>
          <div className="flex flex-wrap gap-2">
            {project.software.map((s, i) => <span key={i} className="px-4 py-2 rounded-full glass text-sm">{s}</span>)}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[project.img, project.img, project.img].map((im, i) => (
            <div key={i} className="aspect-video rounded-xl overflow-hidden">
              <img src={im} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function Projects({ onOpen }) {
  const cats = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))]
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter)
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <TextReveal className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.4em] text-[#00D9FF] mb-3">04 - FEATURED WORK</div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Selected <span className="text-gradient">projects.</span></h2>
          </div>
          <p className="text-white/60 max-w-md">A curated selection of my video edits - crafted for clients and creators across the globe.</p>
        </TextReveal>

        <TextReveal className="mb-10">
          <div className="flex flex-wrap gap-2">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                data-hover
                className={`px-4 py-2 rounded-full text-sm transition-all border ${filter === c ? 'bg-[#00D9FF] text-black border-[#00D9FF]' : 'glass text-white/70 hover:text-white border-white/10'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </TextReveal>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
              >
                <ProjectCard p={p} idx={i} onOpen={onOpen} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function Showreel() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1627637819794-fba32f82be16?fm=jpg&q=70&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0" className="w-full h-full object-cover opacity-30" alt="showreel" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 text-center">
        <TextReveal>
          <div className="text-xs tracking-[0.4em] text-[#00D9FF] mb-3">05 - SHOWREEL 2025</div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12">Watch the <span className="text-gradient">reel.</span></h2>
        </TextReveal>
        <TextReveal delay={0.2}>
          <div className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden glass group cursor-pointer" data-hover>
            <img src="https://images.unsplash.com/photo-1601315488950-3b5047998b38?fm=jpg&q=70&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" alt="reel" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <motion.div whileHover={{ scale: 1.15 }} className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#00D9FF] flex items-center justify-center pulse-glow">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-black fill-black ml-1.5" />
              </motion.div>
            </div>
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-left">
              <div className="text-xs text-white/70 tracking-widest">04:32</div>
              <div className="text-lg md:text-xl font-semibold">Ayush Bijalwan - Showreel</div>
            </div>
          </div>
        </TextReveal>
      </div>
    </section>
  )
}

function Gallery3D() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section id="gallery" className="relative py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <TextReveal className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.4em] text-[#00D9FF] mb-3">06 - 3D GALLERY</div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Renders and <span className="text-gradient">worlds.</span></h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Weapons', 'Architecture', 'Environment', 'Props', 'Characters', 'Hard Surface'].map(c => (
              <span key={c} className="px-3 py-1.5 rounded-full glass text-xs text-white/70">{c}</span>
            ))}
          </div>
        </TextReveal>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {GALLERY.map((g, i) => (
            <TextReveal key={i} delay={i * 0.05}>
              <motion.div whileHover={{ scale: 0.98 }} onClick={() => setLightbox(g)} data-hover
                className="mb-4 relative rounded-2xl overflow-hidden group cursor-pointer break-inside-avoid">
                <img src={g.img} alt={g.cat}
                  className={`w-full ${i % 3 === 0 ? 'aspect-[3/4]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[4/5]'} object-cover transition-transform duration-700 group-hover:scale-110`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  <div className="text-xs text-[#00D9FF] tracking-widest">{g.cat.toUpperCase()}</div>
                  <div className="text-lg font-semibold">3D Render - {String(i + 1).padStart(2, '0')}</div>
                </div>
              </motion.div>
            </TextReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
            <button onClick={() => setLightbox(null)} data-hover className="absolute top-6 right-6 w-11 h-11 rounded-full glass flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} src={lightbox.img} alt={lightbox.cat}
              onClick={(e) => e.stopPropagation()} className="max-w-full max-h-[85vh] rounded-2xl object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Process() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <TextReveal className="mb-20 text-center">
          <div className="text-xs tracking-[0.4em] text-[#00D9FF] mb-3">07 - WORK PROCESS</div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">My creative <span className="text-gradient">workflow.</span></h2>
        </TextReveal>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent md:-translate-x-1/2" />
          {PROCESS.map((p, i) => (
            <TextReveal key={i} delay={i * 0.08}>
              <div className={`relative mb-10 md:mb-16 flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-6`}>
                <div className="hidden md:block flex-1" />
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#00D9FF] pulse-glow z-10 mt-6" />
                <div className={`flex-1 ml-16 md:ml-0 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                  <div className="glass rounded-3xl p-8 hover:border-[#00D9FF]/50 transition-colors">
                    <div className="text-6xl font-bold text-gradient-blue mb-3">{p.step}</div>
                    <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
                    <p className="text-white/60">{p.desc}</p>
                  </div>
                </div>
              </div>
            </TextReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <TextReveal className="mb-16 text-center">
          <div className="text-xs tracking-[0.4em] text-[#00D9FF] mb-3">08 - TESTIMONIALS</div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Kind words from <span className="text-gradient">clients.</span></h2>
        </TextReveal>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex marquee gap-6 w-max">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="glass rounded-3xl p-8 w-[380px] md:w-[440px] flex-shrink-0">
              <div className="flex gap-1 mb-4 text-[#00D9FF]">
                {[...Array(5)].map((_, k) => <Star key={k} className="w-4 h-4 fill-[#00D9FF]" />)}
              </div>
              <p className="text-lg text-white/85 leading-relaxed">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <TextReveal className="mb-16">
          <div className="text-xs tracking-[0.4em] text-[#00D9FF] mb-3">09 - EXPERIENCE</div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Journey and <span className="text-gradient">milestones.</span></h2>
        </TextReveal>
        <div className="space-y-4">
          {EXPERIENCE.map((e, i) => {
            const Icon = e.icon
            return (
              <TextReveal key={i} delay={i * 0.06}>
                <motion.div whileHover={{ x: 8 }} data-hover
                  className="glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 group cursor-pointer hover:border-[#00D9FF]/40 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00D9FF]/20 to-[#7A5CFF]/20 flex items-center justify-center flex-shrink-0 group-hover:from-[#00D9FF] group-hover:to-[#7A5CFF] transition-all">
                    <Icon className="w-6 h-6 group-hover:text-black transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs tracking-widest text-[#00D9FF] mb-1">{e.year}</div>
                    <div className="text-xl font-semibold">{e.title}</div>
                    <div className="text-sm text-white/50 mb-2">{e.place}</div>
                    <p className="text-white/70">{e.desc}</p>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-white/30 group-hover:text-[#00D9FF] group-hover:rotate-45 transition-all hidden md:block" />
                </motion.div>
              </TextReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Resume() {
  const CV_URL = '/ayush-bijalwan-cv.png'
  return (
    <section id="resume" className="relative py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <TextReveal className="mb-14 text-center">
          <div className="text-xs tracking-[0.4em] text-[#00D9FF] mb-3">RESUME</div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Curriculum <span className="text-gradient">Vitae.</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mt-5 leading-relaxed">
            A complete overview of my qualifications, experience and skills. Recruiters and clients — feel free to preview and download my full CV below.
          </p>
        </TextReveal>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <TextReveal className="lg:col-span-3">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden glass-strong p-3 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/10 via-transparent to-[#7A5CFF]/10 pointer-events-none" />
              <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#00D9FF]/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[#7A5CFF]/20 blur-3xl pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden bg-white/5">
                <img
                  src={CV_URL}
                  alt="Ayush Bijalwan CV Preview"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>
          </TextReveal>

          <TextReveal delay={0.1} className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6">
              <div className="text-xs tracking-widest text-[#00D9FF] mb-3">SNAPSHOT</div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-3"><span className="text-[#00D9FF] mt-1.5">◆</span> Creative &amp; detail-oriented Video Editor</li>
                <li className="flex items-start gap-3"><span className="text-[#00D9FF] mt-1.5">◆</span> Freelance since 2025 — reels, montages, promos</li>
                <li className="flex items-start gap-3"><span className="text-[#00D9FF] mt-1.5">◆</span> Skilled in Premiere Pro, After Effects, Photoshop</li>
                <li className="flex items-start gap-3"><span className="text-[#00D9FF] mt-1.5">◆</span> B.Voc in VFX Film Making — currently pursuing</li>
              </ul>
            </div>
            <a
              href={CV_URL}
              download="Ayush-Bijalwan-CV.png"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group inline-flex items-center justify-center w-full rounded-full bg-white text-black hover:bg-[#00D9FF] transition-colors px-8 h-14 text-base font-medium"
            >
              <Download className="w-5 h-5 mr-2" /> Download CV
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="inline-flex items-center justify-center w-full rounded-full border border-white/15 hover:border-[#00D9FF] hover:text-[#00D9FF] transition-colors px-8 h-14 text-base font-medium"
            >
              View Full-Size
            </a>
          </TextReveal>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', details: '', budget: '' })
  const [loading, setLoading] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.details) {
      toast.error('Please fill in name, email and project details.')
      return
    }
    setLoading(true)
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const d = await r.json()
      if (r.ok) {
        toast.success("Message sent! I'll get back to you within 24 hours.")
        setForm({ name: '', email: '', phone: '', details: '', budget: '' })
      } else {
        toast.error(d.error || 'Something went wrong')
      }
    } catch {
      toast.error('Network error, please try again.')
    }
    setLoading(false)
  }
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <GradientBlobs />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <TextReveal className="mb-16 text-center">
          <div className="text-xs tracking-[0.4em] text-[#00D9FF] mb-3">11 - CONTACT</div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">Let's create <span className="text-gradient">together.</span></h2>
        </TextReveal>

        <div className="grid lg:grid-cols-5 gap-10">
          <TextReveal className="lg:col-span-2 space-y-6">
            <p className="text-lg text-white/70 leading-relaxed">Have a project in mind or just want to say hi? Drop me a line - I typically reply within 24 hours.</p>
            <div className="space-y-4">
              {[
                { Icon: Mail, label: 'Email', v: 'ayushbijalwan217@gmail.com' },
                { Icon: Phone, label: 'Phone', v: '+91 99584 63938' },
              ].map((c, i) => (
                <div key={i} className="glass rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
                    <c.Icon className="w-4 h-4 text-[#00D9FF]" />
                  </div>
                  <div>
                    <div className="text-xs tracking-widest text-white/40">{c.label.toUpperCase()}</div>
                    <div className="text-sm font-medium">{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2"><SocialIcons /></div>
          </TextReveal>

          <TextReveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={submit} className="glass-strong rounded-3xl p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest text-white/50 mb-2 block">NAME</label>
                  <Input data-hover value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-[#00D9FF]" />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-white/50 mb-2 block">EMAIL</label>
                  <Input data-hover type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-[#00D9FF]" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest text-white/50 mb-2 block">PHONE (OPTIONAL)</label>
                  <Input data-hover value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 ..." className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-[#00D9FF]" />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-white/50 mb-2 block">BUDGET</label>
                  <Input data-hover value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="$500 - $5000" className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-[#00D9FF]" />
                </div>
              </div>
              <div>
                <label className="text-xs tracking-widest text-white/50 mb-2 block">PROJECT DETAILS</label>
                <Textarea data-hover value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} rows={5} placeholder="Tell me about your project..." className="bg-white/5 border-white/10 rounded-xl focus-visible:ring-[#00D9FF] resize-none" />
              </div>
              <Button data-hover type="submit" disabled={loading} className="w-full rounded-full bg-white text-black hover:bg-[#00D9FF] h-13 py-6 font-medium group">
                {loading ? 'Sending...' : <>Send Message <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" /></>}
              </Button>
            </form>
          </TextReveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center mb-14">
          <div className="text-[8vw] sm:text-[7vw] md:text-[6.5vw] lg:text-[6vw] font-bold text-gradient leading-none tracking-tight opacity-90 select-none whitespace-nowrap">AYUSH BIJALWAN</div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/60">
          <div className="flex flex-wrap items-center gap-6">
            {NAV.map(n => <a key={n.id} href={`#${n.id}`} data-hover className="hover:text-white transition-colors">{n.label}</a>)}
          </div>
          <SocialIcons />
        </div>
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <div>(c) 2025 Ayush Bijalwan. All rights reserved.</div>
          <div>Designed with <span className="text-[#00D9FF]">passion</span> by AYUSH BIJALWAN</div>
        </div>
      </div>
    </footer>
  )
}

/* ---------------- APP ---------------- */

const App = () => {
  const [loading, setLoading] = useState(true)
  const [openProject, setOpenProject] = useState(null)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (loading) return
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [loading])

  useEffect(() => {
    if (loading) return
    const sections = NAV.map(n => document.getElementById(n.id)).filter(Boolean)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { rootMargin: '-40% 0px -40% 0px' })
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [loading])

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>
      {!loading && (
        <>
        <CustomCursor />
          <ScrollProgress />
          <Nav activeSection={activeSection} />
          <main className="relative">
            <Hero />
            <About />
            <Skills />
            <Projects onOpen={setOpenProject} />
            <Showreel />
            <Process />
            <Resume />
            <Contact />
            <Footer />
          </main>
          <AnimatePresence>
            {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
          </AnimatePresence>
        </>
      )}
    </>
  )
}

export default App
