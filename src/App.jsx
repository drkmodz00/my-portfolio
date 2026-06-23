import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_jgp1mj5";
const EMAILJS_TEMPLATE_ID = "template_axd7elg";
const EMAILJS_PUBLIC_KEY = "Xt5ZUdQVyBfjIS74F";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "React", level: 50, icon: "⚛️" },
  { name: "JavaScript", level: 50, icon: "🟡" },
  { name: "TypeScript", level: 50, icon: "🔷" },
  { name: "Node.js", level: 50, icon: "🟢" },
  { name: "CSS / Tailwind", level: 90, icon: "🎨" },
  { name: "UI/UX Design", level: 100, icon: "✦" },
];

const PROJECTS = [
  {
    title: "Fintrackr",
    desc: "A personal finance management system that allows users to record expenses, monitor spending habits, and track their budget.",
    tags: ["Node.js", "React", "Supabase", "Deployed", "Tailwind", "Next.js"],
    color: "#a5b4fc",
    accent: "#4f46e5",
    link: "https://fintrackr-mm7e.onrender.com",
  },
  {
    title: "DMEP Collection",
    desc: "A web-based shopping platform that enables customers to browse products, place orders, and manage purchases online with big sales for branded.",
    tags: ["Tailwind", "Django", "Supabase", "Javascript"],
    color: "#e9d5ff",
    accent: "#9333ea",
    link: "https://dmep.onrender.com/",
  },
];

const ORBS = [
  { top: "8%", left: "12%", size: 320, color: "rgba(167,139,250,0.18)" },
  { top: "55%", left: "70%", size: 380, color: "rgba(196,181,253,0.14)" },
  { top: "30%", left: "85%", size: 200, color: "rgba(139,92,246,0.1)" },
  { top: "75%", left: "5%", size: 260, color: "rgba(221,214,254,0.12)" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --lavender-50: #faf5ff;
    --lavender-100: #ede9fe;
    --lavender-200: #ddd6fe;
    --lavender-300: #c4b5fd;
    --lavender-400: #a78bfa;
    --lavender-500: #8b5cf6;
    --lavender-600: #7c3aed;
    --lavender-800: #3b0764;
    --gold: #c9a96e;
    --gold-light: #e2c89a;
    --glass-bg: rgba(255,255,255,0.045);
    --glass-border: rgba(255,255,255,0.10);
    --glass-hover: rgba(255,255,255,0.09);
    --text-primary: #f5f3ff;
    --text-secondary: rgba(245,243,255,0.58);
    --text-muted: rgba(245,243,255,0.34);
    --surface: rgba(16, 10, 30, 0.72);
  }

  html { scroll-behavior: smooth; }

  body, #root {
    min-height: 100vh;
    background: #07040f;
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  /* ── BACKGROUND ── */
  .bg-scene {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 90% 65% at 18% 8%,  rgba(90,30,200,0.26) 0%, transparent 60%),
      radial-gradient(ellipse 60% 55% at 82% 78%,  rgba(167,139,250,0.14) 0%, transparent 55%),
      radial-gradient(ellipse 38% 42% at 62% 38%,  rgba(120,70,230,0.09) 0%, transparent 50%),
      #07040f;
  }

  .grain {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.028;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
  }

  .orb {
    position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
    filter: blur(90px);
    animation: orbDrift 18s ease-in-out infinite alternate;
  }

  @keyframes orbDrift {
    0%   { transform: translate(0,0) scale(1); }
    100% { transform: translate(28px, -18px) scale(1.07); }
  }

  .page { position: relative; z-index: 1; }

  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.15rem 5.5%;
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    background: rgba(7, 4, 15, 0.58);
    border-bottom: 0.5px solid rgba(167,139,250,0.12);
  }

  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.45rem; font-weight: 300; letter-spacing: 0.05em;
    color: var(--lavender-200);
    display: flex; align-items: baseline; gap: 0.1em;
  }

  .nav-logo-first { font-style: italic; color: var(--gold-light); }
  .nav-logo-last  { color: var(--lavender-300); }

  .nav-divider {
    width: 1px; height: 14px; background: rgba(167,139,250,0.3);
    margin: 0 0.55rem;
    display: inline-block; vertical-align: middle;
  }

  .nav-tagline {
    font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--text-muted); font-weight: 400; vertical-align: middle;
  }

  .nav-links { display: flex; gap: 2.4rem; list-style: none; }

  .nav-links a {
    font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--text-muted); text-decoration: none; font-weight: 400;
    position: relative; transition: color 0.25s;
  }

  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 0.5px;
    background: var(--gold); transition: width 0.3s ease;
  }

  .nav-links a:hover { color: var(--lavender-200); }
  .nav-links a:hover::after { width: 100%; }

  .nav-cta {
    font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.5rem 1.3rem; border-radius: 100px;
    border: 0.5px solid rgba(167,139,250,0.35);
    color: var(--lavender-300); background: transparent;
    cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 400;
    transition: all 0.3s ease;
  }

  .nav-cta:hover {
    background: rgba(167,139,250,0.1);
    border-color: rgba(167,139,250,0.55);
    color: var(--lavender-200);
  }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;
    gap: 5rem;
    padding: 9rem 7.5% 5rem;
    max-width: 1320px;
    margin: 0 auto;
  }

  .hero-content { text-align: left; }

  .hero-eyebrow {
    font-size: 0.7rem; letter-spacing: 0.26em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.6rem; font-weight: 400;
    display: flex; align-items: center; gap: 0.8rem;
  }

  .hero-eyebrow::before {
    content: ''; display: block; width: 32px; height: 0.5px; background: var(--gold);
  }

  .hero-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 6.5vw, 6.2rem);
    font-weight: 300; line-height: 0.93;
    color: var(--text-primary); margin-bottom: 0.2rem; letter-spacing: -0.015em;
  }

  .hero-name em {
    font-style: italic; color: var(--lavender-300);
    display: block;
  }

  .hero-rule {
    width: 56px; height: 0.5px;
    background: linear-gradient(90deg, var(--gold), transparent);
    margin: 1.8rem 0;
  }

  .hero-title {
    font-size: 0.78rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--text-muted);
    font-weight: 300; margin-bottom: 2rem;
    display: flex; align-items: center; gap: 0.7rem; flex-wrap: wrap;
  }

  .title-dot {
    width: 3px; height: 3px; border-radius: 50%;
    background: var(--lavender-500); display: inline-block; flex-shrink: 0;
  }

  .hero-desc {
    max-width: 500px; font-size: 0.96rem; line-height: 1.88;
    color: var(--text-secondary); margin-bottom: 3rem;
  }

  .hero-btns { display: flex; gap: 0.9rem; flex-wrap: wrap; }

  /* ── HERO RIGHT — abstract identity card ── */
  .hero-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
    position: relative;
  }

  .hero-id-card {
    width: 100%;
    max-width: 360px;
    border-radius: 24px;
    overflow: hidden;
    background: linear-gradient(145deg,
      rgba(60,20,140,0.32) 0%,
      rgba(30,10,70,0.48) 50%,
      rgba(10,4,28,0.60) 100%
    );
    border: 0.5px solid rgba(167,139,250,0.22);
    box-shadow:
      0 48px 120px rgba(80,20,200,0.28),
      0 0 0 1px rgba(167,139,250,0.06) inset;
    backdrop-filter: blur(16px);
    padding: 2.8rem 2.4rem 2.4rem;
    position: relative;
  }

  /* Subtle top shimmer */
  .hero-id-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg,
      transparent 0%, rgba(201,169,110,0.5) 35%, rgba(167,139,250,0.5) 65%, transparent 100%
    );
  }

  .id-card-header {
    display: flex; align-items: center; gap: 1.1rem; margin-bottom: 2rem;
  }

  /* Monogram avatar */
  .id-monogram {
    width: 68px; height: 68px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, rgba(167,139,250,0.22), rgba(90,30,200,0.28));
    border: 1px solid rgba(167,139,250,0.32);
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }

  .id-monogram-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.55rem; font-weight: 300; font-style: italic;
    color: var(--lavender-300); letter-spacing: 0.04em;
  }

  .id-monogram::after {
    content: '';
    position: absolute; inset: -3px; border-radius: 50%;
    border: 0.5px solid rgba(167,139,250,0.18);
  }

  .id-name-block { display: flex; flex-direction: column; gap: 0.3rem; }

  .id-fullname {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem; font-weight: 300; color: var(--text-primary);
    letter-spacing: 0.01em;
  }

  .id-role {
    font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold); font-weight: 400;
  }

  .id-divider {
    height: 0.5px;
    background: linear-gradient(90deg, rgba(167,139,250,0.2), transparent);
    margin-bottom: 1.6rem;
  }

  .id-details { display: flex; flex-direction: column; gap: 0.9rem; margin-bottom: 2rem; }

  .id-detail-row {
    display: flex; align-items: flex-start; gap: 0.85rem;
  }

  .id-detail-icon {
    width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
    background: rgba(167,139,250,0.10);
    border: 0.5px solid rgba(167,139,250,0.18);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; margin-top: 1px;
  }

  .id-detail-label {
    font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--text-muted); line-height: 1; margin-bottom: 0.22rem;
  }

  .id-detail-value {
    font-size: 0.85rem; color: var(--lavender-200); line-height: 1.3;
  }

  .id-status-row {
    display: flex; align-items: center; gap: 0.7rem;
    padding: 0.7rem 1rem; border-radius: 10px;
    background: rgba(163,230,53,0.07);
    border: 0.5px solid rgba(163,230,53,0.18);
  }

  .id-status-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #a3e635;
    box-shadow: 0 0 8px rgba(163,230,53,0.7);
    animation: dotPulse 2.2s ease-in-out infinite; flex-shrink: 0;
  }

  .id-status-text {
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: #bef264; font-weight: 400;
  }

  /* Decorative grid overlay inside card */
  .id-card-grid {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.04;
    background-image:
      linear-gradient(rgba(167,139,250,1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px);
    background-size: 32px 32px;
    border-radius: 24px;
  }

  /* Floating stat chips */
  .hero-stat-chips {
    display: flex; gap: 0.9rem; width: 100%; max-width: 360px;
  }

  .stat-chip {
    flex: 1;
    padding: 1rem 0.9rem;
    border-radius: 14px;
    background: rgba(255,255,255,0.04);
    border: 0.5px solid rgba(255,255,255,0.09);
    display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
    backdrop-filter: blur(12px);
  }

  .stat-chip-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.85rem; font-weight: 300; line-height: 1;
    color: var(--lavender-300);
  }

  .stat-chip-label {
    font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--text-muted); text-align: center; line-height: 1.4;
  }

  .hero-scroll {
    display: flex; flex-direction: column; align-items: flex-start; gap: 0.55rem;
    color: var(--text-muted); font-size: 0.66rem; letter-spacing: 0.22em; text-transform: uppercase;
    margin-top: 3rem;
  }

  .scroll-line {
    width: 1px; height: 44px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollPulse 2.2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.35; transform: scaleY(1); }
    50%       { opacity: 1;    transform: scaleY(0.62); }
  }

  /* ── BUTTONS ── */
  .btn-primary {
    padding: 0.82rem 2.1rem; border-radius: 100px;
    background: linear-gradient(135deg, rgba(167,139,250,0.24), rgba(120,60,220,0.18));
    border: 0.5px solid rgba(167,139,250,0.42);
    color: var(--lavender-100); font-size: 0.8rem; letter-spacing: 0.1em;
    text-transform: uppercase; cursor: pointer; backdrop-filter: blur(10px);
    font-family: 'DM Sans', sans-serif; font-weight: 400;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, rgba(167,139,250,0.38), rgba(120,60,220,0.3));
    border-color: rgba(196,181,253,0.58);
    transform: translateY(-2px);
    box-shadow: 0 10px 36px rgba(120,60,220,0.22);
  }

  .btn-ghost {
    padding: 0.82rem 2.1rem; border-radius: 100px;
    background: transparent; border: 0.5px solid rgba(255,255,255,0.12);
    color: var(--text-secondary); font-size: 0.8rem; letter-spacing: 0.1em;
    text-transform: uppercase; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 400;
    transition: all 0.3s ease;
  }

  .btn-ghost:hover {
    border-color: rgba(255,255,255,0.26); color: var(--text-primary);
    transform: translateY(-2px);
  }

  /* ── SECTIONS ── */
  section { padding: 6.5rem 5.5%; max-width: 1180px; margin: 0 auto; }

  .section-label {
    font-size: 0.68rem; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 0.9rem; font-weight: 400;
    display: flex; align-items: center; gap: 0.7rem;
  }

  .section-label::before {
    content: ''; display: block; width: 24px; height: 0.5px; background: var(--gold);
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 300;
    line-height: 1.06; color: var(--text-primary); margin-bottom: 3.5rem;
    letter-spacing: -0.01em;
  }

  .section-title em { font-style: italic; color: var(--lavender-300); }

  /* ── GLASS CARD ── */
  .glass-card {
    background: var(--glass-bg);
    border: 0.5px solid var(--glass-border);
    border-radius: 18px;
    backdrop-filter: blur(24px) saturate(160%);
    -webkit-backdrop-filter: blur(24px) saturate(160%);
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .glass-card:hover {
    background: var(--glass-hover);
    border-color: rgba(167,139,250,0.22);
    transform: translateY(-3px);
    box-shadow: 0 22px 56px rgba(80,20,200,0.16), 0 0 0 1px rgba(167,139,250,0.07) inset;
  }

  /* ── ABOUT ── */
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: start;
  }

  .about-text { padding: 0; }

  .about-text p {
    font-size: 0.96rem; line-height: 1.95; color: var(--text-secondary); margin-bottom: 1.15rem;
  }

  .about-text p strong { color: var(--lavender-300); font-weight: 400; }

  .about-right { display: flex; flex-direction: column; gap: 1.2rem; }

  .about-card { padding: 2.2rem 2rem; }

  .about-stat { display: flex; flex-direction: column; gap: 0.22rem; }

  .stat-num {
    font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; font-weight: 300;
    color: var(--lavender-300); line-height: 1;
  }

  .stat-label {
    font-size: 0.74rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted);
  }

  .stat-divider {
    width: 100%; height: 0.5px; background: var(--glass-border); margin: 1.4rem 0;
  }

  /* About identity card */
  .about-photo-card { padding: 1.6rem 1.8rem; display: flex; align-items: center; gap: 1.4rem; }

  .about-monogram {
    width: 64px; height: 64px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, rgba(167,139,250,0.18), rgba(90,30,200,0.22));
    border: 1px solid rgba(167,139,250,0.28);
    display: flex; align-items: center; justify-content: center;
  }

  .about-monogram-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem; font-weight: 300; font-style: italic;
    color: var(--lavender-300);
  }

  .about-photo-info { display: flex; flex-direction: column; gap: 0.28rem; }

  .about-photo-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem; font-weight: 300; color: var(--text-primary);
  }

  .about-photo-role {
    font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gold);
  }

  .about-photo-location {
    font-size: 0.78rem; color: var(--text-muted);
    display: flex; align-items: center; gap: 0.4rem; margin-top: 0.15rem;
  }

  /* ── SKILLS ── */
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; }

  .skill-item { padding: 1.5rem 1.6rem; display: flex; flex-direction: column; gap: 0.9rem; }

  .skill-header { display: flex; justify-content: space-between; align-items: center; }
  .skill-name { font-size: 0.88rem; font-weight: 400; letter-spacing: 0.03em; color: var(--text-primary); }
  .skill-icon { font-size: 1rem; }

  .skill-pct {
    font-family: 'Cormorant Garamond', serif; font-size: 1.45rem; font-weight: 300;
    color: var(--lavender-300);
  }

  .skill-bar-bg { height: 1.5px; background: rgba(255,255,255,0.07); border-radius: 2px; overflow: hidden; }
  .skill-bar-fill {
    height: 100%; border-radius: 2px;
    background: linear-gradient(90deg, var(--lavender-600), var(--lavender-300));
    transition: width 1.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* ── PROJECTS ── */
  .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.4rem; }

  .project-card {
    padding: 2.2rem 2.2rem 2.8rem;
    position: relative; overflow: hidden;
    cursor: pointer; display: block; text-decoration: none; color: inherit;
    border-radius: 18px;
  }

  .project-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
    background: linear-gradient(90deg, transparent, var(--project-color, rgba(167,139,250,0.6)), transparent);
    opacity: 0; transition: opacity 0.35s;
  }

  .project-card:hover::before { opacity: 1; }

  .project-glow {
    position: absolute; top: -50px; right: -50px; width: 180px; height: 180px;
    border-radius: 50%; pointer-events: none;
    filter: blur(70px); opacity: 0.1; transition: opacity 0.4s;
  }

  .project-card:hover .project-glow { opacity: 0.2; }

  .project-num {
    font-family: 'Cormorant Garamond', serif; font-size: 0.78rem;
    color: var(--text-muted); letter-spacing: 0.1em; margin-bottom: 1.2rem;
    font-style: italic;
  }

  .project-title {
    font-family: 'Cormorant Garamond', serif; font-size: 1.65rem; font-weight: 300;
    color: var(--text-primary); margin-bottom: 0.75rem; line-height: 1.15;
  }

  .project-desc {
    font-size: 0.86rem; line-height: 1.78; color: var(--text-secondary); margin-bottom: 1.5rem;
  }

  .project-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; }

  .tag {
    font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.28rem 0.75rem; border-radius: 100px;
    border: 0.5px solid rgba(255,255,255,0.11);
    color: var(--text-muted); font-weight: 400;
    background: rgba(255,255,255,0.03);
  }

  .project-arrow {
    position: absolute; bottom: 1.6rem; right: 2rem;
    font-size: 1rem; color: var(--text-muted);
    transition: all 0.3s;
  }

  .project-card:hover .project-arrow { color: var(--lavender-300); transform: translate(3px, -3px); }

  /* ── CONTACT ── */
  .contact-inner {
    display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3rem; align-items: start;
  }

  .contact-form-card { padding: 2.6rem 2.4rem; }

  .form-group { margin-bottom: 1.3rem; }

  .form-label {
    display: block; font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--text-muted); margin-bottom: 0.55rem;
  }

  .form-input {
    width: 100%; padding: 0.82rem 1rem; border-radius: 11px;
    background: rgba(255,255,255,0.035);
    border: 0.5px solid rgba(255,255,255,0.09);
    color: var(--text-primary); font-size: 0.88rem; font-family: 'DM Sans', sans-serif;
    outline: none; transition: all 0.25s; resize: none;
  }

  .form-input::placeholder { color: var(--text-muted); }

  .form-input:focus {
    border-color: rgba(167,139,250,0.4);
    background: rgba(255,255,255,0.06);
    box-shadow: 0 0 0 3px rgba(120,60,220,0.1);
  }

  .form-submit {
    width: 100%; padding: 0.95rem; border-radius: 11px; margin-top: 0.4rem;
    background: linear-gradient(135deg, rgba(167,139,250,0.26), rgba(100,30,210,0.22));
    border: 0.5px solid rgba(167,139,250,0.36);
    color: var(--lavender-100); font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 400;
    backdrop-filter: blur(10px); transition: all 0.3s ease;
  }

  .form-submit:hover {
    background: linear-gradient(135deg, rgba(167,139,250,0.42), rgba(100,30,210,0.36));
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(90,20,200,0.28);
  }

  .form-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  .form-error {
    font-size: 0.78rem; color: #fca5a5; margin-top: 0.7rem; text-align: center;
  }

  .contact-info { display: flex; flex-direction: column; gap: 1.3rem; padding-top: 0.5rem; }

  .contact-info-item { display: flex; gap: 1.1rem; align-items: flex-start; padding: 1.3rem 1.5rem; }

  .contact-icon {
    width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
    background: rgba(167,139,250,0.10);
    border: 0.5px solid rgba(167,139,250,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 0.95rem;
  }

  .contact-item-label {
    font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--text-muted); margin-bottom: 0.22rem;
  }

  .contact-item-value { font-size: 0.88rem; color: var(--lavender-200); }

  /* ── FOOTER ── */
  footer {
    text-align: center; padding: 2.8rem 5%;
    border-top: 0.5px solid rgba(255,255,255,0.07);
    color: var(--text-muted); font-size: 0.75rem; letter-spacing: 0.1em;
  }

  footer span { color: var(--gold); }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .fade-in { animation: fadeUp 0.7s ease forwards; }
  .delay-1 { animation-delay: 0.15s; opacity: 0; }
  .delay-2 { animation-delay: 0.3s;  opacity: 0; }
  .delay-3 { animation-delay: 0.45s; opacity: 0; }
  .delay-4 { animation-delay: 0.6s;  opacity: 0; }

  @keyframes dotPulse {
    0%, 100% { box-shadow: 0 0 7px rgba(163,230,53,0.6); }
    50%       { box-shadow: 0 0 16px rgba(163,230,53,0.95); }
  }

  /* ── SCROLL REVEAL ── */
  .reveal {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }

  .reveal.reveal-visible { opacity: 1; transform: translateY(0); }

  .reveal-left  { transform: translateX(-36px); }
  .reveal-left.reveal-visible  { transform: translateX(0); }

  .reveal-right { transform: translateX(36px); }
  .reveal-right.reveal-visible { transform: translateX(0); }

  .reveal-scale { transform: scale(0.94); }
  .reveal-scale.reveal-visible { transform: scale(1); }

  @media (prefers-reduced-motion: reduce) {
    .reveal, .reveal-left, .reveal-right, .reveal-scale {
      opacity: 1 !important; transform: none !important; transition: none !important;
    }
    .orb { animation: none !important; }
  }

  .reveal-stagger-1 { transition-delay: 0.05s; }
  .reveal-stagger-2 { transition-delay: 0.10s; }
  .reveal-stagger-3 { transition-delay: 0.15s; }
  .reveal-stagger-4 { transition-delay: 0.20s; }
  .reveal-stagger-5 { transition-delay: 0.25s; }
  .reveal-stagger-6 { transition-delay: 0.30s; }

  .orb { transition: transform 0.1s linear; }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .hero {
      grid-template-columns: 1fr; text-align: center;
      padding: 7.5rem 5% 4rem; gap: 3rem;
    }
    .hero-content { order: 2; }
    .hero-right    { order: 1; }
    .hero-eyebrow  { justify-content: center; }
    .hero-title    { justify-content: center; }
    .hero-btns     { justify-content: center; }
    .hero-scroll   { align-items: center; }
    .hero-rule     { margin-left: auto; margin-right: auto; }
    .hero-id-card, .hero-stat-chips { max-width: 340px; }
  }

  @media (max-width: 768px) {
    .about-grid, .contact-inner { grid-template-columns: 1fr; }
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    .projects-grid { grid-template-columns: 1fr; }
    .nav-links { display: none; }
    .about-right { flex-direction: row; flex-wrap: wrap; }
    .about-right .glass-card { flex: 1 1 200px; }
  }
`;

function Reveal({ children, className = "", variant = "", as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.unobserve(node); }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const variantClass = variant ? `reveal-${variant}` : "";
  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${visible ? "reveal-visible" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function useParallaxOrbs(count) {
  const offsetsRef = useRef(Array(count).fill(0));
  const [, forceTick] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        offsetsRef.current = offsetsRef.current.map((_, i) => y * (0.04 + i * 0.015));
        forceTick((t) => t + 1);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return offsetsRef.current;
}

export default function Portfolio() {
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const orbOffsets = useParallaxOrbs(ORBS.length);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSkillsVisible(true); },
      { threshold: 0.2 }
    );
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSending(true);

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setSent(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 3000);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setError("Something went wrong sending your message. Please try again.");
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <>
      <style>{css}</style>

      {/* Background */}
      <div className="bg-scene" />
      <div className="grain" />
      {ORBS.map((o, i) => (
        <div
          key={i}
          className="orb"
          style={{
            top: o.top, left: o.left,
            width: o.size, height: o.size,
            background: o.color,
            animationDelay: `${i * 3}s`,
            animationDuration: `${16 + i * 4}s`,
            transform: `translateY(${-(orbOffsets[i] || 0)}px)`,
          }}
        />
      ))}

      {/* Navigation */}
      <nav>
        <div className="nav-logo">
          <span className="nav-logo-first">Angel</span>
          <span className="nav-divider" />
          <span className="nav-tagline">Portfolio</span>
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
          Hire Me
        </button>
      </nav>

      <div className="page">

        {/* ── HERO ── */}
        <section id="home" style={{ maxWidth: "none", padding: 0 }}>
          <div className="hero">

            {/* Left: text */}
            <div className="hero-content">
              <div className="hero-eyebrow fade-in">Creative Developer</div>
              <h1 className="hero-name fade-in delay-1">
                Angel Mae<em>Morado</em>
              </h1>
              <div className="hero-rule fade-in delay-1" />
              <p className="hero-title fade-in delay-2">
                Frontend Engineer
                <span className="title-dot" />
                UI Designer
                <span className="title-dot" />
                Full Stack Dev
              </p>
              <p className="hero-desc fade-in delay-3">
                Crafting beautiful, performant digital experiences at the intersection of design and technology. I build intuitive interfaces and scalable web applications that deliver seamless user experiences.
              </p>
              <div className="hero-btns fade-in delay-4">
                <button className="btn-primary" onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>
                  View Work
                </button>
                <button className="btn-ghost" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
                  Get in Touch
                </button>
              </div>
              <div className="hero-scroll fade-in delay-4">
                <div className="scroll-line" />
                <span>Scroll</span>
              </div>
            </div>

            {/* Right: professional identity card (no photo) */}
            <div className="hero-right fade-in delay-2">
              <div className="hero-id-card">
                <div className="id-card-grid" />

                <div className="id-card-header">
                  <div className="id-monogram">
                    <span className="id-monogram-text">AM</span>
                  </div>
                  <div className="id-name-block">
                    <div className="id-fullname">Angel Mae Morado</div>
                    <div className="id-role">Full-Stack Developer</div>
                  </div>
                </div>

                <div className="id-divider" />

                <div className="id-details">
                  <div className="id-detail-row">
                    <div className="id-detail-icon">📍</div>
                    <div>
                      <div className="id-detail-label">Location</div>
                      <div className="id-detail-value">Buenavista, Philippines</div>
                    </div>
                  </div>
                  <div className="id-detail-row">
                    <div className="id-detail-icon">✉</div>
                    <div>
                      <div className="id-detail-label">Email</div>
                      <div className="id-detail-value">maemorado29@gmail.com</div>
                    </div>
                  </div>
                  <div className="id-detail-row">
                    <div className="id-detail-icon">⚡</div>
                    <div>
                      <div className="id-detail-label">Speciality</div>
                      <div className="id-detail-value">Frontend · UI/UX · React</div>
                    </div>
                  </div>
                </div>

                <div className="id-status-row">
                  <div className="id-status-dot" />
                  <span className="id-status-text">Available for work</span>
                </div>
              </div>

              {/* Stat chips */}
              <div className="hero-stat-chips">
                <div className="stat-chip">
                  <span className="stat-chip-num">3+</span>
                  <span className="stat-chip-label">Years Experience</span>
                </div>
                <div className="stat-chip">
                  <span className="stat-chip-num">2</span>
                  <span className="stat-chip-label">Live Projects</span>
                </div>
                <div className="stat-chip">
                  <span className="stat-chip-num">6</span>
                  <span className="stat-chip-label">Core Skills</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about">
          <div className="about-grid">
            <Reveal variant="left" className="about-text">
              <div className="section-label">About Me</div>
              <h2 className="section-title">
                Design-led<em>engineering</em>
              </h2>
              <p>
                I'm a frontend engineer with a deep love for <strong>visual craft and interaction design</strong>. I believe great software is felt before it's understood — every transition, every spacing decision, every typographic choice matters.
              </p>
              <p>
                With 3 years building products for startups and enterprises, I bring both the technical depth to architect scalable systems and the <strong>aesthetic sensitivity</strong> to make them delightful.
              </p>
              <p>
                Currently open to <strong>select freelance projects</strong> and full-time opportunities.
              </p>
            </Reveal>

            <div className="about-right">
              {/* Identity card */}
              <Reveal variant="right" className="glass-card about-photo-card">
                <div className="about-monogram">
                  <span className="about-monogram-text">AM</span>
                </div>
                <div className="about-photo-info">
                  <div className="about-photo-name">Angel Mae Morado</div>
                  <div className="about-photo-role">Full-Stack Developer</div>
                  <div className="about-photo-location">
                    <span style={{ fontSize: "0.7rem" }}>📍</span>
                    Buenavista, Philippines
                  </div>
                </div>
              </Reveal>

              {/* Stats card */}
              <Reveal variant="right" className="glass-card about-card" style={{ transitionDelay: "0.1s" }}>
                <div className="about-stat">
                  <span className="stat-num">3+</span>
                  <span className="stat-label">Years of experience</span>
                </div>
                <div className="stat-divider" />
                <div className="about-stat">
                  <span className="stat-num">2</span>
                  <span className="stat-label">Projects</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" ref={skillsRef}>
          <Reveal className="section-label" as="div">Expertise</Reveal>
          <Reveal as="h2" className="section-title">Core <em>skills</em></Reveal>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <Reveal
                key={s.name}
                variant="scale"
                className={`glass-card skill-item reveal-stagger-${(i % 6) + 1}`}
              >
                <div className="skill-header">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-icon">{s.icon}</span>
                </div>
                <div className="skill-header">
                  <div className="skill-bar-bg" style={{ flex: 1, marginRight: "1rem" }}>
                    <div
                      className="skill-bar-fill"
                      style={{
                        width: skillsVisible ? `${s.level}%` : "0%",
                        transitionDelay: `${i * 0.08}s`,
                      }}
                    />
                  </div>
                  <span className="skill-pct">{s.level}%</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects">
          <Reveal className="section-label" as="div">Work</Reveal>
          <Reveal as="h2" className="section-title">Featured <em>projects</em></Reveal>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <Reveal
                as="a"
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="scale"
                className={`glass-card project-card reveal-stagger-${(i % 6) + 1}`}
                style={{ "--project-color": p.color }}
              >
                <div className="project-glow" style={{ background: p.color }} />
                <div className="project-num">0{i + 1}</div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <span className="project-arrow">↗</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact">
          <Reveal className="section-label" as="div">Contact</Reveal>
          <Reveal as="h2" className="section-title">Let's <em>connect</em></Reveal>
          <div className="contact-inner">
            <Reveal variant="left" className="glass-card contact-form-card">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text" className="form-input" placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email" className="form-input" placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-input" rows={4} placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="form-submit" disabled={sending}>
                  {sending ? "Sending..." : sent ? "Message Sent ✦" : "Send Message"}
                </button>
                {error && <div className="form-error">{error}</div>}
              </form>
            </Reveal>

            <div className="contact-info">
              {[
                { icon: "✦", label: "Email",        value: "maemorado29@gmail.com" },
                { icon: "◉", label: "Location",     value: "Alubihid, Buenavista, Philippines" },
                { icon: "◈", label: "Availability", value: "Open to projects" },
              ].map((item, i) => (
                <Reveal
                  key={item.label}
                  variant="right"
                  className={`glass-card contact-info-item reveal-stagger-${i + 1}`}
                >
                  <div className="contact-icon">{item.icon}</div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">{item.value}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Reveal as="footer">
          Designed & built with care · <span>Angel Mae Morado</span> · {new Date().getFullYear()}
        </Reveal>

      </div>
    </>
  );
}