"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Star, GitFork } from "lucide-react"

const projects = [
  {
    title: "Comparative Study for Backend in AI-Driven APIs",
    description:
      "This project conducts a comparative study of backend frameworks and languages—Python (FastAPI), Node.js (Express), C++ (Crow), and Java (Spring Boot)—for serving real-time AI inference APIs. Using a practical use case (predicting second-hand iPhone prices).",
    image: "/ai-code-review-dashboard-interface.jpg",
    technologies: ["AI APIs", "FastAPI", "Express", "Springboot", "Crow", "Docker"],
    github: "https://github.com/tanishq-rawat/Comparative-Study-for-Backend-in-AI-Driven-APIs",
    featured: true,
  },
  {
    title: "Cloud On Tips",
    description:
      "There are millions of developers willing to deploy their application on cloud to make them publicly accessible. But not all of them are aware about cloud services and their configurations. Such as creating and configuring Virtual Private Servers (VPS) or for small scale API's using serverless computing services such as AWS Lambda or Azure functions.",
    image: "/distributed-system-architecture-diagram.jpg",
    technologies: ["Django", "AWS", "Celery", "Redis", "MongoDB"],
    github: "https://github.com/tanishq-rawat/CloudOnTips",
    demo: "https://youtu.be/5xwmuKZXdIc",
    featured: true,
  },
  {
    title: "Real-time Analytics - Formula-1",
    description:
      "A real-time analytics dashboard for Formula-1 racing data. Ingests live telemetry",
    image: "/real-time-analytics-dashboard-with-charts.jpg",
    technologies: ["PySpark", "Azure", "Data Engineering", "ETL"],
    github: "https://github.com/tanishq-rawat/Formula-1",
    demo: "https://youtu.be/EEnuW8ZqbVg",
    featured: true,
  }
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

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

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            A showcase of my recent work in software engineering, AI, and distributed systems
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-primary">Featured Work</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                className="animate-on-scroll bg-card/50 border-border/50 hover:bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200 text-balance">
                      {project.title}
                    </CardTitle>
                    {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {project.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        {project.forks}
                      </div>
                    </div> */}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-pretty">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} className="flex items-center gap-1">
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={project.demo} className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          {/* <h3 className="text-2xl font-bold mb-8 text-primary">Other Projects</h3> */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <Card
                key={index}
                className="animate-on-scroll bg-card/50 border-border/50 hover:bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group"
                style={{ animationDelay: `${(index + featuredProjects.length) * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200 text-balance">
                      {project.title}
                    </CardTitle>
                    {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {project.stars}
                      </div>
                    </div> */}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 text-pretty">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github}>
                        <Github className="h-3 w-3" />
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={project.demo}>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/tanishq-rawat" className="flex items-center gap-2">
              View All Projects on GitHub
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
