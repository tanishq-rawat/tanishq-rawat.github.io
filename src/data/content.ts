/**
 * SINGLE SOURCE OF TRUTH for all site content.
 * Edit jobs / projects / skills / blogs / socials here — components read from this file.
 * All values below are realistic PLACEHOLDERS. Swap them for your real details.
 */

import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Cpu,
  Database,
  LayoutDashboard,
  Wrench,
} from "lucide-react";

/* ----------------------------------- Identity ---------------------------------- */

export const profile = {
  name: "Tanishq Rawat",
  firstName: "Tanishq",
  role: "Software Engineer",
  tagline: "I build scalable backend systems and AI-powered applications.",
  oneLiner:
    "Specializing in backend development, Generative AI, and RAG — building systems that are fast, reliable, and ready for production.",
  location: "Ujjain, Madhya Pradesh, India",
  email: "tanishqrawat8@gmail.com",
  resumeUrl: "/resume.pdf", // drop a resume.pdf in /public to enable
};

/* ----------------------------------- Socials ---------------------------------- */

export type SocialKey = "github" | "leetcode" | "medium" | "linkedin" | "x";

export interface Social {
  key: SocialKey;
  label: string;
  href: string;
}

export const socials: Social[] = [
  { key: "github", label: "GitHub", href: "https://github.com/tanishq-rawat" },
  { key: "leetcode", label: "LeetCode", href: "https://leetcode.com/tanishqrawat8" },
  { key: "medium", label: "Medium", href: "https://tanishq0917t.medium.com" },
  { key: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/tanishqrawat17" },
  { key: "x", label: "X", href: "https://x.com/tanishqrawat" },
];

/* ----------------------------------- About ---------------------------------- */

export const about = {
  paragraphs: [
    "I'm a software engineer who specializes in building scalable backend systems and integrating AI into real-world products. My strengths lie in designing FastAPI services, event-driven architectures, LLM-powered pipelines, and cloud-native solutions on AWS and Azure — writing code that holds up under production load and is easy to evolve.",
    "I'm comfortable working across the backend stack — from data modeling and API design to async pipelines, caching strategies, and RAG systems. I enjoy the work that sits at the intersection of backend engineering and Generative AI: making intelligent features fast, reliable, and cost-effective to run.",
    "Long-term, I'm working towards becoming a Solution Architect — someone who can look at a business problem and design the right system for it, not just the technically interesting one. That means thinking beyond individual services to how systems interact, scale, and fail gracefully.",
  ],
  facts: [
    { label: "Years building", value: "4+" },
    { label: "LeetCode solved", value: "550+" },
    { label: "P95 response cut", value: "56%" },
    { label: "DB queries cut", value: "55%" },
  ],
};

/* ----------------------------------- Experience ---------------------------------- */

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location?: string;
  bullets: string[];
  tech: string[];
}

export const experience: Experience[] = [
  {
    company: "Simform Solutions",
    role: "Software Engineer",
    duration: "Feb 2025 — Present",
    location: "Remote",
    bullets: [
      "Architected a multi-tenant FastAPI backend using a strict repository + service pattern (SOLID-aligned), reducing code change ripple effects by 40%.",
      "Optimized API performance via query path refactoring, pagination, and selective serializer variants, cutting P95 response time from 480 ms to 210 ms and reducing DB query count per request by 55%.",
      "Built an event-driven notification framework over Redis Streams, enabling real-time tenant alerts, audit trails, and reactive data pipelines (latency ↓65%, scalability ↑3x).",
      "Designed and implemented a robust RBAC system with centralized authorization policies, strengthening security and simplifying permission management.",
      "Integrated Azure Functions and Graph API utilities for asynchronous tenant operations, improving throughput capacity by 45% under peak load.",
      "Developed an LLM-powered document intelligence pipeline to extract structured knowledge from unstructured documents and ingest it into reporting systems, enabling real-time analytics.",
      "Built a scalable Document Manager service handling thousands of documents with secure storage, retrieval, versioning, and lifecycle management in Azure Blob Storage — reducing operational overhead by 54%.",
    ],
    tech: ["Python", "FastAPI", "Redis Streams", "Azure Functions", "Azure Blob Storage", "PostgreSQL", "LangChain", "OpenAI"],
  },
  {
    company: "Mobileum Inc.",
    role: "Software Engineer",
    duration: "Apr 2024 — Feb 2025",
    location: "Remote",
    bullets: [
      "Designed and implemented a scalable document processing pipeline leveraging LLMs for context-aware tagging, categorization, and metadata extraction across heterogeneous document formats.",
      "Designed and implemented an ORM-driven DataModel layer to automate data injection into dashboards, eliminating manual query handling and improving development efficiency.",
      "Implemented transactional workflows and idempotent service methods for complex annuity operations, improving data integrity and eliminating race-condition defects (error rate ↓30%).",
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "LangChain", "AWS"],
  },
  {
    company: "Mobileum Inc.",
    role: "Associate Software Engineer",
    duration: "Aug 2022 — Mar 2024",
    location: "Bengaluru, India",
    bullets: [
      "Engineered a modular orchestration workflow engine enabling no-code ETL pipeline design, empowering teams to build multi-stage data flows with visual drag-and-drop nodes and reducing manual integration effort by 60%.",
      "Worked on caching mechanism for DataModel helping in dashboard development, resulting in decreased latency.",
      "Automated utility tasks related to data extraction from various data sources using Shell scripting and Python.",
    ],
    tech: ["Python", "Shell", "PostgreSQL", "Redis", "Kafka", "Docker"],
  },
  {
    company: "Cerebry",
    role: "AI Software Developer",
    duration: "Aug 2021 — Feb 2022",
    location: "Singapore, Remote",
    bullets: [
      "Led the development of a framework to extract text from images and convert it into LaTeX, enabling automated question generation.",
      "Developed backend modules to generate parameterized LaTeX representations of math questions, enabling dynamic question creation and consistent formatting.",
    ],
    tech: ["Python", "Django", "Computer Vision", "LaTeX", "PostgreSQL"],
  },
];

/* ----------------------------------- Projects ---------------------------------- */

export interface Project {
  name: string;
  problem: string;
  tech: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: "Online Judge — Code Execution on Scale",
    problem:
      "A secure code-execution service that runs user-submitted solutions inside isolated Docker containers, with a scalable evaluation pipeline using FastAPI, Redis, and Celery workers — enforcing resource limits and returning test-case results like LeetCode/HackerRank.",
    tech: ["FastAPI", "Docker", "Celery", "Redis", "Python", "GenAI"],
    github: "https://github.com/tanishq-rawat",
    featured: true,
  },
  {
    name: "Cloud On Tips",
    problem:
      "A web application to create and manage VPS and Serverless Computing Services without needing cloud configuration expertise. Automates all EC2 actions via boto3 SDK — create, start, stop, or terminate with a single click. Serverless services built from scratch without AWS Lambda.",
    tech: ["Python", "Django", "AWS", "Celery", "Flask", "Boto3", "jQuery"],
    github: "https://github.com/tanishq-rawat/CloudOnTips",
    live: "https://youtu.be/5xwmuKZXdIc",
  },
  {
    name: "Real-time Analytics — Formula 1",
    problem:
      "A real-time telemetry analytics dashboard ingesting live Formula 1 race data, visualizing driver and car performance metrics across laps using streaming data pipelines.",
    tech: ["PySpark", "Azure", "Python", "PostgreSQL"],
    github: "https://github.com/tanishq-rawat/Formula-1",
    live: "https://youtu.be/EEnuW8ZqbVg",
  },
];

/* ----------------------------------- Skills ---------------------------------- */

export interface SkillCategory {
  key: string;
  label: string;
  icon: LucideIcon;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    key: "backend",
    label: "Backend",
    icon: Boxes,
    skills: ["Python", "JavaScript", "C++", "Shell", "FastAPI", "Django", "Celery", "jQuery"],
  },
  {
    key: "data",
    label: "Data",
    icon: LayoutDashboard,
    skills: ["Pandas", "Polars", "NumPy", "PySpark", "Kafka"],
  },
  {
    key: "database",
    label: "Database",
    icon: Database,
    skills: ["PostgreSQL", "Redis", "Qdrant"],
  },
  {
    key: "aiml",
    label: "AI / GenAI",
    icon: Cpu,
    skills: ["OpenAI", "LangChain", "RAG", "LLMs", "Computer Vision"],
  },
  {
    key: "tools",
    label: "Tools & Cloud",
    icon: Wrench,
    skills: ["Azure", "AWS", "Docker", "Kafka", "Git", "Claude Code", "GitHub Copilot"],
  },
];

/* ----------------------------------- Blogs ---------------------------------- */

export interface Blog {
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  tag: string;
  href: string;
}

export const blogs: Blog[] = [
  {
    title: "Say Goodbye to Boring Endpoints: Master Dynamic Routing in FastAPI",
    excerpt:
      "A practical guide to building flexible, dynamic routes in FastAPI — path parameters, query params, and advanced routing patterns that keep your API clean and maintainable.",
    readTime: "7 min read",
    date: "Oct 2025",
    tag: "Backend",
    href: "https://tanishq0917t.medium.com/say-goodbye-to-boring-endpoints-master-dynamic-routing-in-fastapi-bf4f05830d6b",
  },
  {
    title: "The Polars Revolution: A Faster Alternative to Pandas?",
    excerpt:
      "Benchmarking Polars against Pandas for real-world data engineering tasks — where the speed gains are real and where the trade-offs bite.",
    readTime: "8 min read",
    date: "May 2025",
    tag: "Data Engineering",
    href: "https://medium.com/simform-engineering/the-polars-revolution-a-faster-alternative-to-pandas-db1572c89285",
  },
  {
    title: "Importance of Feature Scaling in Machine Learning",
    excerpt:
      "Why normalization and standardization matter more than most tutorials admit — and how the wrong scaling choice silently tanks model performance.",
    readTime: "6 min read",
    date: "Aug 2024",
    tag: "AI / ML",
    href: "https://tanishq0917t.medium.com/importance-of-feature-scaling-in-machine-learning-88b249845117",
  },
];

/* ----------------------------------- Nav ---------------------------------- */

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];
