"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, ExternalLink, FileText, ChevronDown, ChevronUp } from "lucide-react"

const researchPapers = [
  {
    title: "Efficient Neural Architecture Search for Edge Computing Devices",
    authors: ["Your Name", "Co-Author 1", "Co-Author 2"],
    venue: "International Conference on Machine Learning (ICML) 2024",
    date: "2024-07-15",
    abstract:
      "This paper presents a novel approach to neural architecture search specifically optimized for edge computing devices with limited computational resources. Our method achieves 15% better accuracy while reducing inference time by 40% compared to existing approaches.",
    keywords: ["Neural Architecture Search", "Edge Computing", "Mobile AI", "Optimization"],
    link: "#",
    citations: 23,
  },
  {
    title: "Scalable Distributed Training for Large Language Models",
    authors: ["Your Name", "Research Team Lead", "Co-Author 3"],
    venue: "Neural Information Processing Systems (NeurIPS) 2023",
    date: "2023-12-10",
    abstract:
      "We introduce a new distributed training framework that enables efficient training of large language models across heterogeneous computing clusters. Our approach reduces training time by 35% while maintaining model quality.",
    keywords: ["Distributed Systems", "Large Language Models", "Parallel Computing", "Deep Learning"],
    link: "#",
    citations: 45,
  },
  {
    title: "Privacy-Preserving Federated Learning with Differential Privacy",
    authors: ["Your Name", "Privacy Research Group"],
    venue: "IEEE Symposium on Security and Privacy 2023",
    date: "2023-05-22",
    abstract:
      "This work addresses privacy concerns in federated learning by implementing differential privacy mechanisms that provide formal privacy guarantees while maintaining model utility across distributed clients.",
    keywords: ["Federated Learning", "Differential Privacy", "Security", "Machine Learning"],
    link: "#",
    citations: 67,
  },
  {
    title: "Real-time Anomaly Detection in High-Frequency Trading Systems",
    authors: ["Your Name", "Industry Partner", "Co-Author 4"],
    venue: "ACM SIGKDD Conference on Knowledge Discovery and Data Mining 2022",
    date: "2022-08-14",
    abstract:
      "We present a real-time anomaly detection system capable of processing millions of trading events per second while maintaining low latency and high accuracy in identifying suspicious trading patterns.",
    keywords: ["Anomaly Detection", "High-Frequency Trading", "Real-time Systems", "Financial Technology"],
    link: "#",
    citations: 89,
  },
]

export function ResearchSection() {
  const [expandedPaper, setExpandedPaper] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in-right")
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
    <section id="research" ref={sectionRef} className="py-20 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Research Papers</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Published research contributions in machine learning, distributed systems, and artificial intelligence
          </p>
        </div>

        <div className="space-y-8">
          {researchPapers.map((paper, index) => (
            <Card
              key={index}
              className="animate-on-scroll bg-card/50 border-border/50 hover:bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-primary mb-2 text-balance">{paper.title}</CardTitle>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{paper.authors.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(paper.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {paper.citations} citations
                        </div>
                      </div>
                      <p className="font-medium text-foreground">{paper.venue}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedPaper(expandedPaper === index ? null : index)}
                    >
                      {expandedPaper === index ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Hide Abstract
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          Show Abstract
                        </>
                      )}
                    </Button>
                    <Button size="sm" asChild>
                      <a href={paper.link} className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        View Paper
                      </a>
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedPaper === index && (
                <CardContent className="pt-0">
                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold mb-2">Abstract</h4>
                    <p className="text-muted-foreground mb-4 text-pretty">{paper.abstract}</p>
                    <div className="flex flex-wrap gap-2">
                      {paper.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
