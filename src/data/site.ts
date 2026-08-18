import type { IconName } from "../icons";

export const site = {
  name: "Shohruh Bekmurodov",
  initials: "SB",
  role: "Software Engineer",
  company: "OctaneFuel",
  email: "bekmurodovshohruh0224@gmail.com",
  github: "https://github.com/SHOXAKONG",
  githubLabel: "github.com/SHOXAKONG",
  bio: "Software engineer. At OctaneFuel I look after the reporting and the overnight jobs behind it. Most of the work is making sure the numbers people rely on are actually right.",
  authorBio:
    "Software engineer at OctaneFuel. Writing about how systems fail quietly, and what it takes to fix them for good.",
};

/** `match: "prefix"` keeps the tab lit on nested routes. */
export const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

/**
 * The kinds of problem that keep landing on my desk. Each one points at the
 * project on /projects where it actually got solved.
 */
export const focus = [
  { label: "Numbers that disagree", href: "/projects#one-set-of-numbers" },
  { label: "Jobs that break on re-run", href: "/projects#two-systems-one-record" },
  { label: "Access that isn't enforced", href: "/projects#ask-the-warehouse" },
  { label: "Work that should be automatic", href: "/projects#self-hosted-tunnel" },
];

export const stats = [
  { value: "2+", label: "years shipping to production" },
  { value: "20+", label: "automated workflows running" },
  { value: "4", label: "systems I look after" },
];

export type Tone = "violet" | "coral" | "mint" | "sky" | "amber" | "aqua";

/**
 * Projects are described as problem → approach → result, with no stack
 * names: what was broken, what I changed, what got better.
 */
export type Project = {
  title: string;
  /** Anchor id on /projects, linked to from the hero's problem index. */
  slug: string;
  /** Problem domain, not technology. */
  category: string;
  tone: Tone;
  /** What was actually broken before. */
  problem: string;
  /** What I changed, and where the optimisation is. */
  approach: string;
  /** What improved as a result. */
  result: string;
  /** Two-to-four word summary of the win. */
  outcome: string;
  /** Repo or write-up URL. Omit it and the "View project" link is left off
   *  rather than rendered as a dead `#` — fill these in when they exist. */
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Ask the Warehouse",
    slug: "ask-the-warehouse",
    category: "SELF-SERVICE ANSWERS",
    tone: "violet",
    outcome: "Answers without a ticket",
    problem:
      "Every answer the company needed already existed in its data, but only the handful of people who could write queries could reach it. Everyone else filed a request and waited.",
    approach:
      "I let people ask in plain language and made the safe path the only path. A request has to prove who it belongs to, and it is then narrowed to read-only access over a small set of curated reporting tables — anything that isn't a single read is rejected before it ever reaches the database.",
    result:
      "The people with the questions get their own answers, and the destructive operations aren't discouraged, they're impossible.",
  },
  {
    title: "One Set of Numbers",
    slug: "one-set-of-numbers",
    category: "REPORTING FOUNDATION",
    tone: "coral",
    outcome: "One source of truth",
    problem:
      "The same question could be answered three different ways depending on which report you opened. Meetings turned into arguments about whose figure was right instead of what to do about it.",
    approach:
      "I rebuilt reporting in layers, with one canonical table that every transaction metric derives from. The rules live in one reviewed place, run on a schedule, and any change to them has to pass automated checks before it reaches anyone's dashboard.",
    result:
      "There is exactly one correct place to answer a question, so being consistent and being correct stopped being different goals.",
  },
  {
    title: "Two Systems, One Record",
    slug: "two-systems-one-record",
    category: "KEEPING SYSTEMS IN STEP",
    tone: "mint",
    outcome: "History that survives",
    problem:
      "Two business systems held overlapping records and neither kept a history — an update quietly erased what came before. Copying everything across each night also got slower every month as the data grew.",
    approach:
      "The sync only moves what actually changed: each record carries a fingerprint, so untouched rows are skipped entirely, and a real change is stored as a new version instead of overwriting the old one. Because the work is derived from the data rather than the clock, re-running yesterday is safe. The same job also pushes decisions back into the tool the team already works in.",
    result:
      "Nightly work shrank to the size of the change instead of the size of the database, past states became answerable, and nobody has to switch tools to see what matters.",
  },
  {
    title: "Self-Hosted Tunnel",
    slug: "self-hosted-tunnel",
    category: "INFRASTRUCTURE",
    tone: "sky",
    outcome: "Own the trust boundary",
    problem:
      "Exposing a service running on my own machine meant sending all of its traffic through a third party — their limits, their uptime, and their view of everything passing through.",
    approach:
      "I built the piece myself, small and self-hosted, with a command-line interface that does one thing. Packaging and release are automated, so standing it up is a single command rather than a page of setup steps.",
    result:
      "The trust boundary ends at hardware I control, and getting a new environment online takes a command instead of an afternoon.",
  },
];

export type Skill = {
  icon: IconName;
  variant: "data" | "backend" | "infra";
  title: string;
  sub: string;
  items: string[];
};

export const skills: Skill[] = [
  {
    icon: "database",
    variant: "data",
    title: "Data people trust",
    sub: "Figures that agree with each other, at any size.",
    items: [
      "One number, one definition",
      "Work that's safe to run twice",
      "A change history you can query",
      "Every figure traceable to its source",
    ],
  },
  {
    icon: "server",
    variant: "backend",
    title: "Services that hold up",
    sub: "The same behaviour on the ten-thousandth call as the first.",
    items: [
      "Access checked, never assumed",
      "Interfaces that don't change under you",
      "Failures that surface early and loudly",
      "Sign-in paths with nothing to slip through",
    ],
  },
  {
    icon: "cube",
    variant: "infra",
    title: "Deploys that are boring",
    sub: "Self-hosted, reproducible, one command away.",
    items: [
      "One command from clone to running",
      "The same result on every machine",
      "Recoverable when something breaks",
      "No third party setting the limits",
    ],
  },
];

export const footerColumns = [
  {
    heading: "Explore",
    links: [
      { label: "Work", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

/** How a problem usually goes, in the order it usually goes. */
export const process: { step: string; tone: Tone; body: string }[] = [
  {
    step: "Understand",
    tone: "violet",
    body: "The reported symptom is rarely the problem. Find out what people are actually working around before changing anything.",
  },
  {
    step: "Write the failure cases",
    tone: "coral",
    body: "List the ways it can go wrong first. That list decides the design — afterwards it only justifies it.",
  },
  {
    step: "Narrow the path",
    tone: "mint",
    body: "Make the correct route the easiest one and the dangerous route unavailable, so nobody has to remember the rule.",
  },
  {
    step: "Automate and verify",
    tone: "sky",
    body: "A fix that needs a human to remember it isn't finished. Put it on a schedule, and check it keeps working.",
  },
];

/**
 * Working principles. Each one is lifted from copy Shohruh already wrote —
 * the MCP article's closing lines and the three skill blurbs — so the page
 * states his positions, not invented ones.
 */
export const principles = [
  {
    title: "Make the safe path the only path",
    body: "Write the abuse cases down first. Every branch that skips the guardrail is a vulnerability, not a shortcut.",
  },
  {
    title: "One source of truth",
    body: "When exactly one place answers a question, “correct” and “consistent” stop being separate goals to chase.",
  },
  {
    title: "Trustworthy as it grows",
    body: "A figure is only useful while people still believe it, so the design has to hold at ten times today's volume.",
  },
  {
    title: "One command away",
    body: "Self-hosted and reproducible. If a deploy takes a runbook and a good mood, it isn't finished.",
  },
];

/** Categories for the blog filter row. "All" is prepended by the page. */
export const blogCategories = ["Data", "Backend", "Postgres", "Go", "Java"];

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
