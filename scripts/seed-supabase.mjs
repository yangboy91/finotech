import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
}

const supabase = createClient(url, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const weeks = [
  {
    slug: "business-understanding-company-analysis",
    week_number: 1,
    title: "Business Understanding & Company Analysis",
    summary: "Build a clear view of FinoTech’s business model, user segments, and growth context.",
    objective: "Translate company context into measurable business questions.",
    knowledgeItems: [
      ["Company model and value chain", "Map products, monetization logic, and operating model."],
      ["Core user journeys", "Identify the product journeys that matter most for growth."],
    ],
    tasks: [
      ["Company analysis memo", "Write a concise brief on business model, customers, and strategy."],
      ["Stakeholder matrix", "Map internal teams, decisions, and data needs."],
    ],
    deliverables: [
      ["Business memo", "2-page synthesis of business model and analytics opportunities."],
      ["Stakeholder matrix", "Simple table of teams, goals, and metrics needs."],
    ],
    resources: [
      ["Business Analysis Starter Template", "Template", "Reusable structure for company analysis and assumptions.", "https://finotech.xyz/internal/business-analysis-template"],
    ],
  },
  {
    slug: "analytics-project-framing",
    week_number: 2,
    title: "Analytics Project Framing",
    summary: "Turn broad requests into scoped analytics projects with clear goals and metrics.",
    objective: "Practice defining measurable project goals and success criteria before analysis begins.",
    knowledgeItems: [
      ["Problem framing", "Break requests into objective, scope, stakeholders, and expected decisions."],
      ["Metric selection", "Choose primary and supporting metrics tied to the business outcome."],
    ],
    tasks: [
      ["Project brief", "Write a one-pager with scope, business question, and decision goal."],
      ["Success metric proposal", "Define primary and secondary success metrics."],
    ],
    deliverables: [
      ["Analytics framing doc", "Shareable project brief for stakeholders before analysis starts."],
    ],
    resources: [
      ["Project Framing Checklist", "Doc", "Checklist for clarifying request quality before analysis.", "https://finotech.xyz/internal/project-framing-checklist"],
    ],
  },
  {
    slug: "data-exploration-data-dictionary",
    week_number: 3,
    title: "Data Exploration & Data Dictionary",
    summary: "Understand tables, fields, relationships, and data quality caveats before analysis.",
    objective: "Develop a disciplined approach to documenting data foundations.",
    knowledgeItems: [
      ["Exploratory analysis workflow", "Use counts, distincts, null checks, and joins to profile data."],
      ["Data dictionary design", "Document business definitions, owners, and caveats."],
    ],
    tasks: [
      ["Profile source tables", "Summarize the purpose and structure of core tables."],
      ["Draft a data dictionary", "Create business-friendly field definitions."],
    ],
    deliverables: [
      ["Data dictionary draft", "A documented table/field reference for the internship project."],
    ],
    resources: [
      ["Data Dictionary Template", "Template", "Starter template for documenting core datasets.", "https://finotech.xyz/internal/data-dictionary-template"],
    ],
  },
  {
    slug: "sql-analysis-core-business-metrics",
    week_number: 4,
    title: "SQL Analysis on Core Business Metrics",
    summary: "Calculate core KPIs using readable, validated SQL.",
    objective: "Translate business questions into clean SQL analysis.",
    knowledgeItems: [
      ["Metric logic", "Define numerator, denominator, grain, and exclusions clearly."],
      ["Query quality", "Use readable CTEs, naming discipline, and sanity checks."],
    ],
    tasks: [
      ["KPI query set", "Compute core business metrics from sample data."],
      ["Validation pass", "Cross-check outputs using spot checks and business expectations."],
    ],
    deliverables: [
      ["Annotated SQL notebook", "Queries plus notes covering logic and assumptions."],
    ],
    resources: [
      ["SQL Style Guide", "Doc", "Formatting and naming rules for analytics SQL.", "https://finotech.xyz/internal/sql-style-guide"],
    ],
  },
  {
    slug: "funnel-analysis-root-cause-investigation",
    week_number: 5,
    title: "Funnel Analysis & Root Cause Investigation",
    summary: "Analyze conversion funnels and diagnose performance changes with evidence.",
    objective: "Move from symptom reporting to structured diagnosis.",
    knowledgeItems: [
      ["Funnel decomposition", "Break the user journey into measurable steps and drop-off rates."],
      ["Segmentation logic", "Use segments to isolate likely root causes."],
    ],
    tasks: [
      ["Build funnel model", "Create stage-by-stage conversion output for a core journey."],
      ["Root cause analysis", "Investigate one major drop and propose likely causes."],
    ],
    deliverables: [
      ["Funnel review deck", "Short deck or memo with funnel results and recommendation."],
    ],
    resources: [
      ["Funnel Analysis Example", "Link", "Example showing stage conversion and segmentation.", "https://finotech.xyz/internal/funnel-example"],
    ],
  },
  {
    slug: "advanced-sql-data-modeling",
    week_number: 6,
    title: "Advanced SQL & Data Modeling",
    summary: "Use advanced SQL and lightweight modeling practices to improve analysis reliability.",
    objective: "Strengthen technical depth for production-facing analytics work.",
    knowledgeItems: [
      ["Advanced SQL patterns", "Apply window functions and reusable transformations."],
      ["Analytical data modeling", "Separate raw data from reusable marts and reporting layers."],
    ],
    tasks: [
      ["Refactor a messy query", "Convert a one-off analysis into a layered model."],
      ["Design a metrics mart", "Specify grain, keys, and major dimensions."],
    ],
    deliverables: [
      ["Modeled SQL project", "Set of cleaned SQL models and final analytical output."],
    ],
    resources: [
      ["Modeling Review Notes", "Doc", "Reference notes on designing analytics marts.", "https://finotech.xyz/internal/modeling-review-notes"],
    ],
  },
  {
    slug: "product-metrics-experiment-design",
    week_number: 7,
    title: "Product Metrics & Experiment Design",
    summary: "Define product metrics and experiment plans with strong analytical discipline.",
    objective: "Connect product decisions with good measurement design.",
    knowledgeItems: [
      ["Metric hierarchy", "Distinguish north-star, outcome, guardrail, and diagnostic metrics."],
      ["Experiment framing", "Write clear hypotheses, metrics, and rollout logic."],
    ],
    tasks: [
      ["Metric tree", "Map a product goal to leading and lagging metrics."],
      ["Experiment proposal", "Draft a test plan with metrics and evaluation method."],
    ],
    deliverables: [
      ["Experiment proposal", "A concise plan shared between PM and analytics."],
    ],
    resources: [
      ["Experiment Planning Template", "Template", "Template for hypotheses, metrics, and readout plans.", "https://finotech.xyz/internal/experiment-planning-template"],
    ],
  },
  {
    slug: "final-presentation-interview-readiness",
    week_number: 8,
    title: "Final Presentation & Interview Readiness",
    summary: "Synthesize internship learning into a final presentation and interview-ready story.",
    objective: "Practice executive communication and articulate analytical thinking clearly.",
    knowledgeItems: [
      ["Storytelling for analytics", "Organize findings into context, method, insight, and recommendation."],
      ["Presentation quality", "Design concise, evidence-backed slides for stakeholder review."],
    ],
    tasks: [
      ["Prepare final deck", "Summarize one internship project with impact and recommendation."],
      ["Interview readiness notes", "Prepare concise answers for business and SQL case prompts."],
    ],
    deliverables: [
      ["Final presentation deck", "Executive-style deck with business context and recommendation."],
      ["Interview readiness notes", "Case-study style reflection notes."],
    ],
    resources: [
      ["Presentation Review Rubric", "Doc", "Rubric for evaluating communication and business impact.", "https://finotech.xyz/internal/presentation-rubric"],
    ],
  },
];

async function createUser({ email, password, fullName, role }) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      role,
    },
  });

  if (error && !error.message.toLowerCase().includes("already")) {
    throw error;
  }

  const userId = data?.user?.id;

  if (!userId) {
    const { data: existingUsers, error: listError } =
      await supabase.auth.admin.listUsers();
    if (listError) throw listError;
    const existing = existingUsers.users.find((user) => user.email === email);
    if (!existing) throw new Error(`Unable to find user ${email}`);
    return existing.id;
  }

  return userId;
}

async function seedCurriculum() {
  for (const week of weeks) {
    const { data: weekRow, error: weekError } = await supabase
      .from("weeks")
      .upsert({
        slug: week.slug,
        week_number: week.week_number,
        title: week.title,
        summary: week.summary,
        objective: week.objective,
        published: true,
      }, {
        onConflict: "slug",
      })
      .select()
      .single();

    if (weekError) throw weekError;

    const weekId = weekRow.id;

    await supabase.from("week_knowledge_items").delete().eq("week_id", weekId);
    await supabase.from("week_tasks").delete().eq("week_id", weekId);
    await supabase.from("week_deliverables").delete().eq("week_id", weekId);
    await supabase.from("week_resources").delete().eq("week_id", weekId);

    const knowledgeRows = week.knowledgeItems.map(([title, description], index) => ({
      week_id: weekId,
      sort_order: index + 1,
      title,
      description,
    }));
    const taskRows = week.tasks.map(([title, description], index) => ({
      week_id: weekId,
      sort_order: index + 1,
      title,
      description,
    }));
    const deliverableRows = week.deliverables.map(([title, description], index) => ({
      week_id: weekId,
      sort_order: index + 1,
      title,
      description,
    }));

    if (knowledgeRows.length) {
      const { error } = await supabase.from("week_knowledge_items").insert(knowledgeRows);
      if (error) throw error;
    }

    if (taskRows.length) {
      const { error } = await supabase.from("week_tasks").insert(taskRows);
      if (error) throw error;
    }

    if (deliverableRows.length) {
      const { error } = await supabase.from("week_deliverables").insert(deliverableRows);
      if (error) throw error;
    }

    for (const [title, typeLabel, description, url] of week.resources) {
      const resourceType = typeLabel.toLowerCase();
      const { data: resource, error: resourceError } = await supabase
        .from("resources")
        .upsert({
          title,
          description,
          resource_type: resourceType,
          url,
        }, {
          onConflict: "title",
        })
        .select()
        .single();

      if (resourceError) throw resourceError;

      const { error: weekResourceError } = await supabase
        .from("week_resources")
        .upsert({
          week_id: weekId,
          resource_id: resource.id,
        }, {
          onConflict: "week_id,resource_id",
        });

      if (weekResourceError) throw weekResourceError;
    }
  }
}

async function main() {
  const adminUserId = await createUser({
    email: "admin@finotech.xyz",
    password: "FinotechAdmin123!",
    fullName: "FinoTech Admin",
    role: "admin",
  });

  const studentUserId = await createUser({
    email: "student@finotech.xyz",
    password: "FinotechStudent123!",
    fullName: "Demo Student",
    role: "student",
  });

  await supabase.from("profiles").upsert([
    {
      user_id: adminUserId,
      email: "admin@finotech.xyz",
      full_name: "FinoTech Admin",
      role: "admin",
      headline: "Program lead",
    },
    {
      user_id: studentUserId,
      email: "student@finotech.xyz",
      full_name: "Demo Student",
      role: "student",
      headline: "BA/DA intern",
    },
  ], {
    onConflict: "user_id",
  });

  await seedCurriculum();

  console.log("Seed complete.");
  console.log("Admin account: admin@finotech.xyz / FinotechAdmin123!");
  console.log("Student account: student@finotech.xyz / FinotechStudent123!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
