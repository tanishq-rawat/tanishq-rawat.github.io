"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Brain, Server } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-12 md:py-20 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">About Me</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            I'm a passionate software engineer with expertise in backend development and artificial intelligence. My
            journey spans from building robust server architectures to researching cutting-edge AI algorithms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="animate-on-scroll">
            <div className="relative mx-auto flex items-center justify-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-xl">
                <img 
                  src="/cropped_circle_image.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover transform scale-110 hover:scale-115 transition-transform duration-300" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6 animate-on-scroll mt-6 md:mt-0">
            <p className="text-base sm:text-lg text-muted-foreground text-pretty">
              With over 4 years of experience in software development, I specialize in creating scalable backend
              systems and implementing AI solutions that solve real-world problems. My work spans across various domains
              including distributed systems, machine learning, and data engineering.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/50 border-border/50 hover:bg-card transition-colors duration-300">
                <CardContent className="p-3 sm:p-4 text-center">
                  <Server className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-1 sm:mb-2" />
                  <h3 className="font-semibold text-sm sm:text-base">Backend</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Scalable Systems</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 hover:bg-card transition-colors duration-300">
                <CardContent className="p-3 sm:p-4 text-center">
                  <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-1 sm:mb-2" />
                  <h3 className="font-semibold text-sm sm:text-base">AI/ML</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Research & Development</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 hover:bg-card transition-colors duration-300">
                <CardContent className="p-3 sm:p-4 text-center">
                  <Database className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-1 sm:mb-2" />
                  <h3 className="font-semibold text-sm sm:text-base">Data</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Engineering & Analytics</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 hover:bg-card transition-colors duration-300">
                <CardContent className="p-3 sm:p-4 text-center">
                  <Code className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-1 sm:mb-2" />
                  <h3 className="font-semibold text-sm sm:text-base">Research</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Innovation & Discovery</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
