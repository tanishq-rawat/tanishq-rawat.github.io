"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Star, GitFork } from "lucide-react"

const projects = [
  {
    title: "AI-Powered Code Review Assistant",
    description:
      "An intelligent code review tool that uses machine learning to identify potential bugs, security vulnerabilities, and suggest improvements. Integrated with popular version control systems.",
    image: "/ai-code-review-dashboard-interface.jpg",
    technologies: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL", "Docker"],
    github: "#",
    demo: "#",
    stars: 1247,
    forks: 89,
    featured: true,
  },
  {
    title: "Distributed Task Queue System",
    description:
      "A high-performance, fault-tolerant distributed task queue system built with Go. Supports priority queues, delayed tasks, and horizontal scaling across multiple nodes.",
    image: "/distributed-system-architecture-diagram.jpg",
    technologies: ["Go", "Redis", "gRPC", "Kubernetes", "Prometheus", "Grafana"],
    github: "#",
    demo: "#",
    stars: 892,
    forks: 156,
    featured: true,
  },
  {
    title: "Real-time Analytics Platform",
    description:
      "A scalable real-time analytics platform that processes millions of events per second. Features custom dashboards, alerting, and machine learning-based anomaly detection.",
    image: "/real-time-analytics-dashboard-with-charts.jpg",
    technologies: ["Apache Kafka", "ClickHouse", "Node.js", "Vue.js", "Docker", "AWS"],
    github: "#",
    demo: "#",
    stars: 634,
    forks: 78,
    featured: true,
  },
  {
    title: "Blockchain-based Supply Chain Tracker",
    description:
      "A transparent supply chain tracking system using blockchain technology. Enables end-to-end traceability of products from manufacturing to delivery.",
    image: "/blockchain-supply-chain-tracking-interface.jpg",
    technologies: ["Solidity", "Web3.js", "Node.js", "MongoDB", "React", "Ethereum"],
    github: "#",
    demo: "#",
    stars: 445,
    forks: 67,
    featured: false,
  },
  {
    title: "Microservices Monitoring Suite",
    description:
      "Comprehensive monitoring and observability suite for microservices architectures. Includes distributed tracing, metrics collection, and automated alerting.",
    image: "/microservices-monitoring-dashboard.jpg",
    technologies: ["Go", "Jaeger", "Prometheus", "Grafana", "Kubernetes", "Helm"],
    github: "#",
    demo: "#",
    stars: 723,
    forks: 134,
    featured: false,
  },
  {
    title: "Natural Language Processing API",
    description:
      "RESTful API for various NLP tasks including sentiment analysis, named entity recognition, and text summarization. Built for high throughput and low latency.",
    image: "/nlp-api-documentation-interface.jpg",
    technologies: ["Python", "spaCy", "FastAPI", "Redis", "Docker", "AWS Lambda"],
    github: "#",
    demo: "#",
    stars: 567,
    forks: 89,
    featured: false,
  },
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
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {project.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        {project.forks}
                      </div>
                    </div>
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
          <h3 className="text-2xl font-bold mb-8 text-primary">Other Projects</h3>
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {project.stars}
                      </div>
                    </div>
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
