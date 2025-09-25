"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, ExternalLink, FileText, ChevronDown, ChevronUp } from "lucide-react"

const researchPapers = [
  {
    title: "Comparative Study for Backend in AI-Driven APIs",
    authors: ["Tanishq Rawat"],
    venue: "Arxiv",
    date: "To be published",
    abstract:"The demand for real-time AI-powered APIs is rapidly increasing across industries, necessitating backend frameworks that are efficient, scalable, and portable. This study benchmarks the performance of four widely-used backend technologies—Python (FastAPI), C++ (Crow), Java (SpringBoot), and Node.js (Express)—in serving an AI model designed to predict second-hand iPhone prices. The model, exported to the ONNX format for cross-language compatibility, uses input features such as iPhone version, damage percentage, battery health, purchase year, and usage. We evaluate each backend based on latency, throughput, transfer rate, memory consumption, and development complexity. Our findings provide actionable insights for engineering teams deploying AI inference APIs in production environments. All source code, containerized applications, and benchmark results are open-sourced to promote reproducibility and transparency.",
    keywords: ["AI APIs", "Crow","FastAPI", "Springboot", "Express", "ONNX", "Express", "Docker"],
    link: "https://ijsrem.com/download/viper-http-web-server-a-custom-web-server/",
  },
  {
    title: "VIPER HTTP WEB SERVER: Efficient Web Serving on Edge Devices",
    authors: ["Tanishq Rawat"],
    venue: "International Journal of Science and Research (IJSR), IJSREM",
    date: "2023-03-03",
    abstract:"This research paper presents the design and implementation of a Web Server designed in C++ which is a Custom Web server that is it can be used for specific tasks which makes it faster than other open-source web servers it can also be used to meet the specific needs of a particular organization. The paper discusses the challenges faced during the development process and the solutions that were implemented to overcome them. Performance tests were conducted to evaluate the server's efficiency and effectiveness using different web applications that interact with Data Bases and external Third Party APIs, and the results demonstrate that it performs at a high level even under heavy loads. Overall, this paper provides valuable insights into the development of custom web servers and highlights the benefits of creating a tailored solution for specific organizational needs.",
    keywords: ["Socket Programming", "HTTP Server","C++", "TCP/IP"],
    link: "https://ijsrem.com/download/viper-http-web-server-a-custom-web-server/",
  },
  {
    title: "TICKETLESS ENTRY SYSTEM TO MONUMENTS/MUESUM",
    authors: ["Tanishq Rawat", "Sarthak Jain", "Tanish Solanki"],
    venue: "International Journal of Science and Research (IJSR), IJSREM",
    date: "2022-11-08",
    abstract:
      "Easing up the process of entry to museums and monuments with the help of a ticketless entry system. It will also help in keeping proper track of total number of people present at the said location, managing proper resources for the people present and preventing fraudulent entries for the people without tickets, the process of checking tickets can be optimized as only people with e-ticket would be able to enter the premises and all this would fasten up the process of getting entry. Also implementing the option to make payment through UPI is an ease for customers to easily make payments without getting in the hassle of net banking transactions. Providing an easy interface for user to interact with. A QR code or a quick response code is a type of matrix barcode (or two-dimensional barcode) QR codes use four standardized encoding modes (numeric, alphanumeric, byte/binary, and kanji) to store data efficiently.",
    keywords: ["Distributed Systems", "Large Language Models", "Parallel Computing", "Deep Learning"],
    link: "https://ijsrem.com/download/ticketless-entry-system-to-monuments-muesum/",
  }
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
                          {paper.date}
                        </div>
                      </div>
                      <p className="font-medium text-foreground">Published in {paper.venue}</p>
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
