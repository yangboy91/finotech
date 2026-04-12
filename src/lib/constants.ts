import type { Resource, Week, WeekDeliverable, WeekKnowledgeItem, WeekTask } from "@/lib/types";

export const APP_NAME = "FinoTech BA/DA Internship Hub";

export const STUDENT_NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/weeks", label: "Weeks" },
  { href: "/submissions", label: "Submissions" },
  { href: "/resources", label: "Resources" },
  { href: "/feedback", label: "Feedback" },
] as const;

export const ADMIN_NAV = [
  { href: "/admin", label: "Admin" },
  { href: "/admin/weeks", label: "Weeks" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/feedback", label: "Feedback" },
] as const;

type SeedWeekContent = Pick<Week, "slug" | "week_number" | "title" | "summary" | "objective"> & {
  knowledgeItems: Array<Pick<WeekKnowledgeItem, "title" | "description">>;
  tasks: Array<Pick<WeekTask, "title" | "description">>;
  deliverables: Array<Pick<WeekDeliverable, "title" | "description">>;
  resources: Array<Pick<Resource, "title" | "description" | "resource_type" | "url">>;
};

export const WEEK_SEED_CONTENT: SeedWeekContent[] = [
  {
    slug: "business-understanding-company-analysis",
    week_number: 1,
    title: "Business Understanding & Company Analysis",
    summary: "Build a clear view of FinoTech’s business model, user segments, revenue drivers, and internal operating context.",
    objective: "Learn how analysts translate company context into measurable business questions.",
    knowledgeItems: [
      {
        title: "Company model and value chain",
        description: "Map the business model, monetization logic, and the main internal stakeholders.",
      },
      {
        title: "Core user journeys",
        description: "Identify the highest-leverage journeys that matter for product and commercial performance.",
      },
      {
        title: "Analyst mindset",
        description: "Frame ambiguous business requests into answerable analytics questions.",
      },
    ],
    tasks: [
      {
        title: "Create a company analysis brief",
        description: "Summarize the company, product lines, customer segments, and growth priorities in a 2-page memo.",
      },
      {
        title: "Stakeholder map",
        description: "List the key functions involved in an analytics workflow and what each team cares about.",
      },
    ],
    deliverables: [
      {
        title: "Company analysis memo",
        description: "A concise memo covering business model, product, customers, and metrics hypotheses.",
      },
      {
        title: "Stakeholder matrix",
        description: "A simple table describing teams, decisions, and data needs.",
      },
    ],
    resources: [
      {
        title: "Business Analysis Starter Template",
        description: "Reusable memo structure for documenting business context and assumptions.",
        resource_type: "template",
        url: "https://finotech.xyz/internal/business-analysis-template",
      },
      {
        title: "Internal Strategy Primer",
        description: "Reference doc explaining product direction and internal terminology.",
        resource_type: "doc",
        url: "https://finotech.xyz/internal/strategy-primer",
      },
    ],
  },
  {
    slug: "analytics-project-framing",
    week_number: 2,
    title: "Analytics Project Framing",
    summary: "Turn open-ended requests into scoped analytics projects with business goals, metrics, risks, and deliverables.",
    objective: "Practice defining measurable project goals and success criteria before analysis begins.",
    knowledgeItems: [
      {
        title: "Problem framing",
        description: "Break broad requests into objective, scope, stakeholders, constraints, and decision outcomes.",
      },
      {
        title: "Metric selection",
        description: "Choose leading and lagging indicators tied to business goals.",
      },
      {
        title: "Project risk assessment",
        description: "Spot data quality, timing, and scope risks early.",
      },
    ],
    tasks: [
      {
        title: "Write a project brief",
        description: "Document objective, north-star question, scope, and expected outputs for a sample analytics request.",
      },
      {
        title: "Define success metrics",
        description: "Propose primary and secondary metrics plus decision thresholds.",
      },
    ],
    deliverables: [
      {
        title: "Analytics framing document",
        description: "A one-pager that can be shared with a manager before analysis starts.",
      },
    ],
    resources: [
      {
        title: "Project Framing Checklist",
        description: "Checklist for clarifying request quality before jumping into SQL or dashboards.",
        resource_type: "doc",
        url: "https://finotech.xyz/internal/project-framing-checklist",
      },
    ],
  },
  {
    slug: "data-exploration-data-dictionary",
    week_number: 3,
    title: "Data Exploration & Data Dictionary",
    summary: "Understand available datasets, table relationships, field definitions, and data quality caveats.",
    objective: "Develop a disciplined approach to documenting data before analysis.",
    knowledgeItems: [
      {
        title: "Exploratory analysis workflow",
        description: "Use row counts, null checks, distincts, and basic joins to understand data structure.",
      },
      {
        title: "Data dictionary design",
        description: "Document definitions, owners, and caveats in a reusable format.",
      },
      {
        title: "Quality checks",
        description: "Look for stale data, missing fields, and inconsistent logic.",
      },
    ],
    tasks: [
      {
        title: "Profile source tables",
        description: "Review sample core tables and summarize the most important fields.",
      },
      {
        title: "Draft a data dictionary",
        description: "Create business-friendly definitions for key columns and entities.",
      },
    ],
    deliverables: [
      {
        title: "Data dictionary draft",
        description: "A maintained definition sheet covering core business tables and fields.",
      },
    ],
    resources: [
      {
        title: "Data Dictionary Template",
        description: "Starter template for documenting data entities, owners, and caveats.",
        resource_type: "template",
        url: "https://finotech.xyz/internal/data-dictionary-template",
      },
    ],
  },
  {
    slug: "sql-analysis-core-business-metrics",
    week_number: 4,
    title: "SQL Analysis on Core Business Metrics",
    summary: "Calculate business KPIs with clear metric logic and reproducible SQL queries.",
    objective: "Build confidence in translating business questions into SQL analysis.",
    knowledgeItems: [
      {
        title: "Metric logic",
        description: "Define numerator, denominator, time grain, and exclusions explicitly.",
      },
      {
        title: "Query quality",
        description: "Write readable SQL with CTEs, naming discipline, and validation checks.",
      },
      {
        title: "Business interpretation",
        description: "Explain what a KPI change means in operational terms.",
      },
    ],
    tasks: [
      {
        title: "Write KPI SQL queries",
        description: "Calculate activation, conversion, retention, and revenue-related metrics from sample data.",
      },
      {
        title: "Validate metric output",
        description: "Cross-check results with manual sanity checks or smaller extracts.",
      },
    ],
    deliverables: [
      {
        title: "Annotated SQL notebook",
        description: "SQL queries plus notes that explain assumptions and definitions.",
      },
    ],
    resources: [
      {
        title: "SQL Style Guide",
        description: "Formatting and naming rules used by the analytics team.",
        resource_type: "doc",
        url: "https://finotech.xyz/internal/sql-style-guide",
      },
    ],
  },
  {
    slug: "funnel-analysis-root-cause-investigation",
    week_number: 5,
    title: "Funnel Analysis & Root Cause Investigation",
    summary: "Analyze conversion funnels and use segmented evidence to explain performance shifts.",
    objective: "Learn how to move from symptom reporting to structured diagnosis.",
    knowledgeItems: [
      {
        title: "Funnel decomposition",
        description: "Break the customer journey into measurable stages and drop-off points.",
      },
      {
        title: "Segmentation logic",
        description: "Cut results by channel, cohort, geography, and user profile to isolate root causes.",
      },
      {
        title: "Hypothesis testing",
        description: "Use evidence-backed reasoning instead of surface-level explanations.",
      },
    ],
    tasks: [
      {
        title: "Build a funnel table",
        description: "Model stage-by-stage conversion for a key user journey.",
      },
      {
        title: "Root cause analysis",
        description: "Investigate one major drop and propose likely operational or product causes.",
      },
    ],
    deliverables: [
      {
        title: "Funnel review deck",
        description: "A short deck or memo showing funnel results, breakdowns, and recommendations.",
      },
    ],
    resources: [
      {
        title: "Funnel Analysis Example",
        description: "Sample analysis structure showing step conversion and segment drill-downs.",
        resource_type: "link",
        url: "https://finotech.xyz/internal/funnel-example",
      },
    ],
  },
  {
    slug: "advanced-sql-data-modeling",
    week_number: 6,
    title: "Advanced SQL & Data Modeling",
    summary: "Use advanced SQL patterns and lightweight modeling practices to create reliable analysis layers.",
    objective: "Strengthen technical depth for production-facing analytics work.",
    knowledgeItems: [
      {
        title: "Advanced SQL patterns",
        description: "Apply window functions, conditional aggregation, and reusable transformations.",
      },
      {
        title: "Analytical data modeling",
        description: "Separate raw inputs from curated marts that make downstream reporting easier.",
      },
      {
        title: "Documentation and governance",
        description: "Keep logic discoverable and maintainable for future analysts.",
      },
    ],
    tasks: [
      {
        title: "Refactor a messy query",
        description: "Turn a difficult one-off query into a cleaner layered SQL model.",
      },
      {
        title: "Design a metrics mart",
        description: "Define grain, keys, and major dimensions for a reusable reporting table.",
      },
    ],
    deliverables: [
      {
        title: "Modeled SQL project",
        description: "A set of SQL files or a notebook showing the cleaned model and final query.",
      },
    ],
    resources: [
      {
        title: "Modeling Review Notes",
        description: "Internal notes on choosing fact and dimension structures for analytics work.",
        resource_type: "doc",
        url: "https://finotech.xyz/internal/modeling-review-notes",
      },
    ],
  },
  {
    slug: "product-metrics-experiment-design",
    week_number: 7,
    title: "Product Metrics & Experiment Design",
    summary: "Define product metrics, craft experiment hypotheses, and interpret measurement trade-offs.",
    objective: "Connect product decisions with good metric design and experiment thinking.",
    knowledgeItems: [
      {
        title: "Product metric hierarchy",
        description: "Distinguish between north-star, outcome, guardrail, and diagnostic metrics.",
      },
      {
        title: "Experiment framing",
        description: "Write strong hypotheses, success metrics, and risks for controlled tests.",
      },
      {
        title: "Measurement pitfalls",
        description: "Recognize seasonality, sample size, bias, and instrumentation gaps.",
      },
    ],
    tasks: [
      {
        title: "Define a product metric tree",
        description: "Map a product goal to measurable leading and lagging metrics.",
      },
      {
        title: "Draft an experiment plan",
        description: "Specify hypothesis, primary metric, guardrails, rollout, and evaluation method.",
      },
    ],
    deliverables: [
      {
        title: "Experiment proposal",
        description: "A concise proposal that a PM and analyst could review together.",
      },
    ],
    resources: [
      {
        title: "Experiment Planning Template",
        description: "Template for hypotheses, metrics, exposure rules, and readout structure.",
        resource_type: "template",
        url: "https://finotech.xyz/internal/experiment-planning-template",
      },
    ],
  },
  {
    slug: "final-presentation-interview-readiness",
    week_number: 8,
    title: "Final Presentation & Interview Readiness",
    summary: "Synthesize learning into a polished presentation and prepare to communicate analytical thinking clearly.",
    objective: "Practice executive communication and articulate project impact with confidence.",
    knowledgeItems: [
      {
        title: "Storytelling for analytics",
        description: "Organize findings into context, method, insight, recommendation, and next steps.",
      },
      {
        title: "Presentation quality",
        description: "Design concise slides with clear narrative and strong evidence.",
      },
      {
        title: "Interview reflection",
        description: "Turn internship projects into credible case-study answers.",
      },
    ],
    tasks: [
      {
        title: "Prepare final presentation",
        description: "Summarize one internship project with business context, analysis, and recommendations.",
      },
      {
        title: "Practice interview questions",
        description: "Draft concise answers about business cases, SQL decisions, and trade-offs.",
      },
    ],
    deliverables: [
      {
        title: "Final presentation deck",
        description: "Executive-style presentation with recommendations and next steps.",
      },
      {
        title: "Interview readiness notes",
        description: "Talking points for common analytics and business analysis interview prompts.",
      },
    ],
    resources: [
      {
        title: "Presentation Review Rubric",
        description: "Rubric used by mentors to evaluate structure, clarity, and business impact.",
        resource_type: "doc",
        url: "https://finotech.xyz/internal/presentation-rubric",
      },
    ],
  },
];
