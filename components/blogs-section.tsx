"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ExternalLink } from "lucide-react"

const blogPosts = [
  {
    title: "The Polars Revolution: A Faster Alternative to Pandas?",
    excerpt:
      "Comparing pandas and polars performance benchmarks based on a set of operations.",
    date: "2025-05-19",
    readTime: "6 min read",
    tags: ["Pandas", "Polars", "Data Analysis", "Python"],
    link: "https://medium.com/simform-engineering/the-polars-revolution-a-faster-alternative-to-pandas-db1572c89285",
  },
  {
    title: "Importance of Feature Scaling in Machine Learning",
    excerpt:
      "Understand the significance of feature scaling in machine learning and how it impacts model performance.",
    date: "2024-08-19",
    readTime: "5 min read",
    tags: ["Machine Learning", "Data Preprocessing", "Python", "Production"],
    link: "https://tanishq0917t.medium.com/importance-of-feature-scaling-in-machine-learning-88b249845117",
  },
  {
    title: "Introduction to Network Programming (Socket Programming)",
    excerpt:
      "Explore advanced network programming concepts including socket programming, protocols, and real-time communication.",
    date: "2022-04-02",
    readTime: "10 min read",
    tags: ["Networking", "Socket Programming", "Real-time", "Communication"],
    link: "https://tanishq0917t.medium.com/introduction-to-network-programming-socket-programming-95f88335adfb",
  },
  {
    title: "Creating C/C++ library for Linux",
    excerpt:
      "A comprehensive guide to creating and managing C/C++ libraries on Linux, including best practices and tools.",
    date: "2021-11-10",
    readTime: "6 min read",
    tags: ["C/C++", "Linux", "Libraries", "Development"],
    link: "https://tanishq0917t.medium.com/creating-c-c-library-for-linux-c1f4afd79229",
  },
  {
    title: "AWS Lambda",
    excerpt:
      "Step-by-step tutorial on creating serverless applications using AWS Lambda, API Gateway, and DynamoDB.",
    date: "2024-05-22",
    readTime: "9 min read",
    tags: ["AWS", "Serverless", "Lambda", "APIs"],
    link: "https://tanishq0917t.medium.com/aws-lambda-208a2695533b",
  },
  {
    title: "Online Compiler — Demonstration of SubProcess",
    excerpt:
      "A demonstration of building an online code compiler using Python's subprocess module.",
    date: "2022-12-26",
    readTime: "7 min read",
    tags: ["Subprocess", "Online-Compilers", "Backend", "Python"],
    link: "https://tanishq0917t.medium.com/online-compiler-demonstration-of-subprocess-7a961eef6536",
  },
]

export function BlogsSection() {
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

  return (
    <section id="blogs" ref={sectionRef} className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Blog Posts</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Sharing insights, tutorials, and thoughts on software engineering, AI, and technology trends
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="animate-on-scroll bg-card/50 border-border/50 hover:bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200 text-balance">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-pretty">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200 bg-transparent"
                  asChild
                >
                  <a href={post.link} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                    Read More
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="https://tanishq0917t.medium.com" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
              View All Posts on Medium
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
