"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Engineering Background */}
      <div className="absolute inset-0 opacity-50">
        {/* Floating Code Snippets */}
        <div className="absolute animate-float-slow" style={{ left: "5%", top: "10%" }}>
          <div className="text-sm font-mono text-primary/90 whitespace-pre backdrop-blur-sm bg-background/10 p-2 rounded">
            {`const server = express()
app.listen(3000)`}
          </div>
        </div>
        <div className="absolute animate-float-slow" style={{ right: "10%", top: "15%", animationDelay: "3s" }}>
          <div className="text-sm font-mono text-accent/90 whitespace-pre backdrop-blur-sm bg-background/10 p-2 rounded">
            {`SELECT * FROM users
WHERE active = true`}
          </div>
        </div>
        <div className="absolute animate-float-slow" style={{ left: "15%", bottom: "20%", animationDelay: "6s" }}>
          <div className="text-sm font-mono text-primary/90 whitespace-pre backdrop-blur-sm bg-background/10 p-2 rounded">
            {`{
  "status": "success",
  "data": [...results]
}`}
          </div>
        </div>

        {/* Data Flow Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {/* Animated data flow lines */}
          <path
            d="M 50 100 Q 200 50 350 100 T 650 100"
            stroke="url(#dataFlow)"
            strokeWidth="3"
            fill="none"
            className="animate-pulse"
            strokeDasharray="20 10"
            strokeDashoffset="30"
            style={{
              animation: "dash 4s linear infinite, pulse 2s ease-in-out infinite alternate"
            }}
          />
          <path
            d="M 100 300 Q 300 250 500 300 T 800 300"
            stroke="url(#dataFlow)"
            strokeWidth="3"
            fill="none"
            className="animate-pulse"
            strokeDasharray="15 8"
            strokeDashoffset="20"
            style={{
              animation: "dash 3s linear infinite, pulse 2s ease-in-out infinite alternate",
              animationDelay: "1s"
            }}
          />
        </svg>

        {/* Circuit Board Pattern */}
        <div className="absolute inset-0">
          <div className="absolute w-px h-20 bg-primary/60" style={{ left: "20%", top: "30%", transform: "rotate(45deg)" }} />
          <div className="absolute w-px h-16 bg-accent/60" style={{ right: "25%", top: "40%", transform: "rotate(-45deg)" }} />
          <div className="absolute w-20 h-px bg-primary/60" style={{ left: "60%", top: "60%" }} />
          <div className="absolute w-16 h-px bg-accent/60" style={{ left: "30%", bottom: "35%" }} />
          
          {/* Circuit nodes */}
          <div className="absolute w-3 h-3 bg-primary/80 rounded-full animate-pulse shadow-lg shadow-primary/50" style={{ left: "20%", top: "35%" }} />
          <div className="absolute w-3 h-3 bg-accent/80 rounded-full animate-pulse shadow-lg shadow-accent/50" style={{ right: "25%", top: "45%", animationDelay: "1s" }} />
          <div className="absolute w-3 h-3 bg-primary/80 rounded-full animate-pulse shadow-lg shadow-primary/50" style={{ left: "70%", top: "60%", animationDelay: "2s" }} />
        </div>

        {/* API Endpoint Indicators */}
        <div className="absolute animate-float" style={{ left: "8%", top: "60%", animationDelay: "2s" }}>
          <div className="flex items-center space-x-2 text-sm font-mono text-accent/90 backdrop-blur-sm bg-background/20 p-2 rounded-md border border-accent/20">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
            <span>GET /api/users</span>
          </div>
        </div>
        <div className="absolute animate-float" style={{ right: "12%", bottom: "40%", animationDelay: "4s" }}>
          <div className="flex items-center space-x-2 text-sm font-mono text-primary/90 backdrop-blur-sm bg-background/20 p-2 rounded-md border border-primary/20">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
            <span>POST /api/data</span>
          </div>
        </div>

        {/* Floating Tech Icons/Symbols */}
        <div className="absolute animate-bounce-slow" style={{ left: "75%", top: "25%", animationDelay: "3s" }}>
          <div className="text-3xl opacity-80 drop-shadow-lg">⚡</div>
        </div>
        <div className="absolute animate-bounce-slow" style={{ left: "85%", bottom: "30%", animationDelay: "5s" }}>
          <div className="text-3xl opacity-80 drop-shadow-lg">🔗</div>
        </div>
        <div className="absolute animate-bounce-slow" style={{ left: "25%", top: "70%", animationDelay: "1s" }}>
          <div className="text-3xl opacity-80 drop-shadow-lg">⚙️</div>
        </div>

        {/* Gradient Orbs (Original but reduced opacity) */}
        <div
          className="absolute w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: "10%",
            top: "20%",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            right: "10%",
            bottom: "20%",
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Hi, I'm{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tanishq Rawat
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
            Software Engineer • Backend Developer • AI Researcher
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
            Passionate about building scalable backend systems and advancing artificial intelligence. I create
            innovative solutions that bridge the gap between complex algorithms and real-world applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-3" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/tanishq-rawat"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/tanishqrawat17"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:tanishq.rawat@taskgrid.in"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-muted-foreground" />
      </div>
    </section>
  )
}
