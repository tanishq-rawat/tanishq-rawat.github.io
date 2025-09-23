"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    title: "Software Engineer",
    company: "Simform LLC",
    location: "Remote",
    duration: "Feb'25 - Present",
    description:
      "Led the development of scalable microservices architecture serving millions of users. Implemented AI-powered recommendation systems and optimized database performance by 40%.",
    technologies: ["Python", "Go", "PostgreSQL", "Redis", "Kubernetes", "TensorFlow"],
  },
  {
    title: "Software Engineer",
    company: "Mobileum",
    location: "Remote",
    duration: "Apr'24 - Feb'25",
    description:
      "Built robust APIs and data pipelines for a fintech platform. Developed machine learning models for fraud detection and risk assessment.",
    technologies: ["Node.js", "MongoDB", "AWS", "Docker", "Scikit-learn", "Apache Kafka"],
  },
  {
    title: "Associate Software Engineer",
    company: "Mobileum",
    location: "Bengaluru, India",
    duration: "Aug'22 - Mar'24",
    description:
      "Conducted research on natural language processing and computer vision. Published 3 papers in top-tier conferences and contributed to open-source ML libraries.",
    technologies: ["Python", "PyTorch", "CUDA", "OpenCV", "Jupyter", "Git"],
  },
  {
    title: "AI Engineer Intern",
    company: "Cerebry",
    location: "Remote",
    duration: "Aug'21 - Feb'22",
    description:
      "Developed internal tools and automation scripts. Worked on data migration projects and performance optimization of legacy systems.",
    technologies: ["Java", "Spring Boot", "MySQL", "Jenkins", "Maven", "Linux"],
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in-left")
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
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Professional Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            My journey through various roles in software engineering, research, and development
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-border"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center animate-on-scroll ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} ml-12 md:ml-0`}>
                  <Card className="bg-card/50 border-border/50 hover:bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">{exp.title}</CardTitle>
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-foreground">{exp.company}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {exp.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 text-pretty">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
