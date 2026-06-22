import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_jgp1mj5";
const EMAILJS_TEMPLATE_ID = "template_60hlm09";
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
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

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
    --glass-bg: rgba(255,255,255,0.07);
    --glass-border: rgba(255,255,255,0.15);
    --glass-hover: rgba(255,255,255,0.12);
    --text-primary: #fafafa;
    --text-secondary: rgba(255,255,255,0.62);
    --text-muted: rgba(255,255,255,0.38);
  }

  html { scroll-behavior: smooth; }

  body, #root {
    min-height: 100vh;
    background: #0a0612;
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  .bg-scene {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background: radial-gradient(ellipse 80% 60% at 20% 10%, rgba(109,40,217,0.22) 0%, transparent 60%),
                radial-gradient(ellipse 60% 50% at 80% 80%, rgba(167,139,250,0.16) 0%, transparent 55%),
                radial-gradient(ellipse 40% 40% at 60% 40%, rgba(139,92,246,0.09) 0%, transparent 50%),
                #0a0612;
  }

  .grain {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.032;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
  }

  .orb {
    position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
    filter: blur(80px);
    animation: orbDrift 18s ease-in-out infinite alternate;
  }

  @keyframes orbDrift {
    0% { transform: translate(0,0) scale(1); }
    100% { transform: translate(30px, -20px) scale(1.08); }
  }

  .page { position: relative; z-index: 1; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 5%;
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    background: rgba(10, 6, 18, 0.55);
    border-bottom: 0.5px solid var(--glass-border);
    transition: all 0.4s ease;
  }

  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.55rem; font-weight: 300; letter-spacing: 0.06em;
    color: var(--lavender-200);
  }

  .nav-logo span { color: var(--lavender-400); font-style: italic; }

  .nav-links { display: flex; gap: 2.5rem; list-style: none; }

  .nav-links a {
    font-size: 0.82rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--text-secondary); text-decoration: none; font-weight: 400;
    position: relative; transition: color 0.25s;
  }

  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px;
    background: var(--lavender-400); transition: width 0.3s ease;
  }

  .nav-links a:hover { color: var(--lavender-200); }
  .nav-links a:hover::after { width: 100%; }

  .nav-cta {
    font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.55rem 1.4rem; border-radius: 100px;
    border: 1px solid var(--lavender-400);
    color: var(--lavender-300); background: transparent;
    cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 400;
    transition: all 0.3s ease;
  }

  .nav-cta:hover { background: rgba(167,139,250,0.14); color: var(--lavender-200); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 4rem;
    padding: 8rem 7% 4rem;
    max-width: 1280px;
    margin: 0 auto;
  }

  .hero-content { text-align: left; }

  .hero-eyebrow {
    font-size: 0.75rem; letter-spacing: 0.24em; text-transform: uppercase;
    color: var(--lavender-400); margin-bottom: 1.5rem; font-weight: 400;
    display: flex; align-items: center; gap: 0.75rem;
  }

  .hero-eyebrow::before {
    content: ''; display: block; width: 36px; height: 0.5px; background: var(--lavender-400);
  }

  .hero-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.2rem, 7vw, 6.5rem);
    font-weight: 300; line-height: 0.92;
    color: var(--text-primary); margin-bottom: 0.3rem; letter-spacing: -0.01em;
  }

  .hero-name em {
    font-style: italic; color: var(--lavender-300);
    display: block;
  }

  .hero-title {
    font-size: clamp(0.75rem, 1.2vw, 0.9rem); letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--text-secondary);
    font-weight: 300; margin: 1.6rem 0 2.4rem;
  }

  .hero-desc {
    max-width: 480px; font-size: 0.97rem; line-height: 1.8;
    color: var(--text-secondary); margin-bottom: 3rem;
  }

  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }

  /* PHOTO PLACEHOLDER */
  .hero-photo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .hero-photo-ring {
    position: absolute;
    inset: -18px;
    border-radius: 50%;
    border: 1px solid rgba(167,139,250,0.22);
    animation: ringPulse 4s ease-in-out infinite;
  }

  .hero-photo-ring-2 {
    position: absolute;
    inset: -36px;
    border-radius: 50%;
    border: 1px solid rgba(167,139,250,0.1);
    animation: ringPulse 4s ease-in-out infinite 1s;
  }

  @keyframes ringPulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.015); }
  }

  .hero-photo-frame {
    position: relative;
    width: 340px;
    height: 420px;
    border-radius: 200px 200px 180px 180px;
    overflow: hidden;
    background: linear-gradient(160deg, rgba(167,139,250,0.14) 0%, rgba(109,40,217,0.18) 50%, rgba(59,7,100,0.28) 100%);
    border: 1px solid rgba(167,139,250,0.28);
    box-shadow:
      0 40px 100px rgba(109,40,217,0.3),
      0 0 0 1px rgba(167,139,250,0.1) inset,
      inset 0 1px 0 rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    flex-shrink: 0;
  }

  .hero-photo-inner {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: flex-end;
    padding-bottom: 2.5rem;
    position: relative;
  }

  .photo-silhouette {
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 220px;
    opacity: 0.18;
  }

  .photo-placeholder-icon {
    width: 90px; height: 90px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(167,139,250,0.3), rgba(109,40,217,0.2));
    border: 1.5px solid rgba(167,139,250,0.4);
    display: flex; align-items: center; justify-content: center;
    font-size: 2.2rem;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }

  .photo-placeholder-text {
    font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--lavender-400); text-align: center;
    position: relative; z-index: 1;
    line-height: 1.6;
  }

  .photo-placeholder-hint {
    font-size: 0.65rem; color: var(--text-muted);
    letter-spacing: 0.1em; margin-top: 0.3rem;
  }

  .hero-photo-badge {
    position: absolute;
    bottom: -16px; right: -16px;
    background: linear-gradient(135deg, rgba(167,139,250,0.25), rgba(109,40,217,0.2));
    border: 1px solid rgba(167,139,250,0.35);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 0.9rem 1.3rem;
    display: flex; align-items: center; gap: 0.7rem;
    box-shadow: 0 8px 32px rgba(109,40,217,0.2);
  }

  .badge-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #a3e635;
    box-shadow: 0 0 8px rgba(163,230,53,0.6);
    animation: dotPulse 2s ease-in-out infinite;
  }

  @keyframes dotPulse {
    0%, 100% { box-shadow: 0 0 8px rgba(163,230,53,0.6); }
    50% { box-shadow: 0 0 16px rgba(163,230,53,0.9); }
  }

  .badge-text {
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--lavender-200);
  }

  .hero-scroll {
    display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem;
    color: var(--text-muted); font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
    margin-top: 3rem;
  }

  .scroll-line {
    width: 1px; height: 48px; background: linear-gradient(to bottom, var(--lavender-400), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(0.6); }
  }

  .btn-primary {
    padding: 0.85rem 2.2rem; border-radius: 100px;
    background: linear-gradient(135deg, rgba(167,139,250,0.28), rgba(139,92,246,0.18));
    border: 1px solid rgba(167,139,250,0.45);
    color: var(--lavender-100); font-size: 0.85rem; letter-spacing: 0.08em;
    text-transform: uppercase; cursor: pointer; backdrop-filter: blur(10px);
    font-family: 'DM Sans', sans-serif; font-weight: 400;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, rgba(167,139,250,0.42), rgba(139,92,246,0.3));
    border-color: rgba(196,181,253,0.6);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(139,92,246,0.25);
  }

  .btn-ghost {
    padding: 0.85rem 2.2rem; border-radius: 100px;
    background: transparent; border: 1px solid rgba(255,255,255,0.14);
    color: var(--text-secondary); font-size: 0.85rem; letter-spacing: 0.08em;
    text-transform: uppercase; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 400;
    transition: all 0.3s ease;
  }

  .btn-ghost:hover {
    border-color: rgba(255,255,255,0.28); color: var(--text-primary);
    transform: translateY(-2px);
  }

  /* SECTION */
  section { padding: 6rem 5%; max-width: 1160px; margin: 0 auto; }

  .section-label {
    font-size: 0.72rem; letter-spacing: 0.26em; text-transform: uppercase;
    color: var(--lavender-400); margin-bottom: 1rem; font-weight: 400;
    display: flex; align-items: center; gap: 0.75rem;
  }

  .section-label::before {
    content: ''; display: block; width: 28px; height: 0.5px; background: var(--lavender-400);
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 300;
    line-height: 1.1; color: var(--text-primary); margin-bottom: 3.5rem;
  }

  .section-title em { font-style: italic; color: var(--lavender-300); }

  /* GLASS CARD */
  .glass-card {
    background: var(--glass-bg);
    border: 0.5px solid var(--glass-border);
    border-radius: 20px;
    backdrop-filter: blur(24px) saturate(160%);
    -webkit-backdrop-filter: blur(24px) saturate(160%);
    transition: all 0.35s ease;
  }

  .glass-card:hover {
    background: var(--glass-hover);
    border-color: rgba(167,139,250,0.28);
    transform: translateY(-4px);
    box-shadow: 0 24px 64px rgba(109,40,217,0.18), 0 0 0 1px rgba(167,139,250,0.08) inset;
  }

  /* ABOUT */
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;
  }

  .about-text { padding: 0; }

  .about-text p {
    font-size: 0.98rem; line-height: 1.9; color: var(--text-secondary); margin-bottom: 1.2rem;
  }

  .about-text p strong { color: var(--lavender-300); font-weight: 400; }

  .about-right { display: flex; flex-direction: column; gap: 1.25rem; }

  .about-card {
    padding: 2.4rem 2.2rem;
  }

  .about-stat { display: flex; flex-direction: column; gap: 0.25rem; }
  .stat-num {
    font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 300;
    color: var(--lavender-300); line-height: 1;
  }
  .stat-label { font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
  .stat-divider { width: 100%; height: 0.5px; background: var(--glass-border); margin: 1.5rem 0; }

  /* About photo small card */
  .about-photo-card {
    padding: 1.8rem 2.2rem;
    display: flex; align-items: center; gap: 1.5rem;
  }

  .about-photo-thumb {
    width: 72px; height: 88px;
    border-radius: 50px;
    flex-shrink: 0;
    background: linear-gradient(160deg, rgba(167,139,250,0.2), rgba(109,40,217,0.25));
    border: 1px solid rgba(167,139,250,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem;
    overflow: hidden;
    position: relative;
  }

  .about-photo-info { display: flex; flex-direction: column; gap: 0.3rem; }
  .about-photo-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem; font-weight: 300; color: var(--text-primary);
  }
  .about-photo-role {
    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--lavender-400);
  }
  .about-photo-location {
    font-size: 0.8rem; color: var(--text-muted);
    display: flex; align-items: center; gap: 0.4rem; margin-top: 0.2rem;
  }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }

  .skill-item {
    padding: 1.6rem 1.8rem;
    display: flex; flex-direction: column; gap: 1rem;
  }

  .skill-header { display: flex; justify-content: space-between; align-items: center; }
  .skill-name { font-size: 0.9rem; font-weight: 400; letter-spacing: 0.04em; color: var(--text-primary); }
  .skill-icon { font-size: 1.1rem; }
  .skill-pct { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 300; color: var(--lavender-300); }

  .skill-bar-bg { height: 2px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
  .skill-bar-fill {
    height: 100%; border-radius: 2px;
    background: linear-gradient(90deg, var(--lavender-600), var(--lavender-300));
    transition: width 1.2s cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* PROJECTS */
  .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }

  .project-card {
    padding: 2rem 2.2rem;
    position: relative; overflow: hidden;
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .project-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--project-color), transparent);
    opacity: 0; transition: opacity 0.3s;
  }

  .project-card:hover::before { opacity: 1; }

  .project-glow {
    position: absolute; top: -40px; right: -40px; width: 160px; height: 160px;
    border-radius: 50%; pointer-events: none;
    filter: blur(60px); opacity: 0.12;
    transition: opacity 0.4s;
  }

  .project-card:hover .project-glow { opacity: 0.22; }

  .project-num {
    font-family: 'Cormorant Garamond', serif; font-size: 0.85rem;
    color: var(--text-muted); letter-spacing: 0.08em; margin-bottom: 1.2rem;
  }

  .project-title {
    font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; font-weight: 300;
    color: var(--text-primary); margin-bottom: 0.8rem; line-height: 1.2;
  }

  .project-desc {
    font-size: 0.88rem; line-height: 1.75; color: var(--text-secondary); margin-bottom: 1.4rem;
  }

  .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }

  .tag {
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.3rem 0.8rem; border-radius: 100px;
    border: 0.5px solid rgba(255,255,255,0.14);
    color: var(--text-muted); font-weight: 400;
  }

  .project-arrow {
    position: absolute; bottom: 1.8rem; right: 2rem;
    font-size: 1.1rem; color: var(--text-muted);
    transition: all 0.3s;
  }

  .project-card:hover .project-arrow { color: var(--lavender-300); transform: translate(3px, -3px); }

  /* CONTACT */
  .contact-inner {
    display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3rem; align-items: start;
  }

  .contact-form-card { padding: 2.8rem 2.4rem; }

  .form-group { margin-bottom: 1.4rem; }
  .form-label {
    display: block; font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--text-muted); margin-bottom: 0.6rem;
  }

  .form-input {
    width: 100%; padding: 0.85rem 1.1rem; border-radius: 12px;
    background: rgba(255,255,255,0.04);
    border: 0.5px solid var(--glass-border);
    color: var(--text-primary); font-size: 0.9rem; font-family: 'DM Sans', sans-serif;
    outline: none; transition: all 0.25s; resize: none;
  }

  .form-input::placeholder { color: var(--text-muted); }
  .form-input:focus {
    border-color: rgba(167,139,250,0.45); background: rgba(255,255,255,0.07);
    box-shadow: 0 0 0 3px rgba(139,92,246,0.1);
  }

  .form-submit {
    width: 100%; padding: 1rem; border-radius: 12px; margin-top: 0.5rem;
    background: linear-gradient(135deg, rgba(167,139,250,0.3), rgba(109,40,217,0.25));
    border: 1px solid rgba(167,139,250,0.4);
    color: var(--lavender-100); font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 400;
    backdrop-filter: blur(10px); transition: all 0.3s ease;
  }

  .form-submit:hover {
    background: linear-gradient(135deg, rgba(167,139,250,0.45), rgba(109,40,217,0.38));
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(109,40,217,0.3);
  }

  .form-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .form-error {
    font-size: 0.8rem;
    color: #fca5a5;
    margin-top: 0.8rem;
    text-align: center;
  }

  .contact-info { display: flex; flex-direction: column; gap: 1.5rem; padding-top: 0.5rem; }

  .contact-info-item {
    display: flex; gap: 1.2rem; align-items: flex-start; padding: 1.4rem 1.6rem;
  }

  .contact-icon {
    width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
    background: rgba(167,139,250,0.12); border: 0.5px solid rgba(167,139,250,0.24);
    display: flex; align-items: center; justify-content: center; font-size: 1rem;
  }

  .contact-item-label { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.25rem; }
  .contact-item-value { font-size: 0.9rem; color: var(--lavender-200); }

  /* FOOTER */
  footer {
    text-align: center; padding: 3rem 5%;
    border-top: 0.5px solid var(--glass-border);
    color: var(--text-muted); font-size: 0.8rem; letter-spacing: 0.08em;
  }

  footer span { color: var(--lavender-400); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-in { animation: fadeUp 0.7s ease forwards; }
  .delay-1 { animation-delay: 0.15s; opacity: 0; }
  .delay-2 { animation-delay: 0.3s; opacity: 0; }
  .delay-3 { animation-delay: 0.45s; opacity: 0; }
  .delay-4 { animation-delay: 0.6s; opacity: 0; }

  /* SCROLL REVEAL */
  .reveal {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }

  .reveal.reveal-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .reveal-left { transform: translateX(-40px); }
  .reveal-left.reveal-visible { transform: translateX(0); }

  .reveal-right { transform: translateX(40px); }
  .reveal-right.reveal-visible { transform: translateX(0); }

  .reveal-scale { transform: scale(0.94); }
  .reveal-scale.reveal-visible { transform: scale(1); }

  @media (prefers-reduced-motion: reduce) {
    .reveal, .reveal-left, .reveal-right, .reveal-scale {
      opacity: 1 !important; transform: none !important; transition: none !important;
    }
    .orb { animation: none !important; }
  }

  .reveal-stagger-1 { transition-delay: 0.06s; }
  .reveal-stagger-2 { transition-delay: 0.12s; }
  .reveal-stagger-3 { transition-delay: 0.18s; }
  .reveal-stagger-4 { transition-delay: 0.24s; }
  .reveal-stagger-5 { transition-delay: 0.3s; }
  .reveal-stagger-6 { transition-delay: 0.36s; }

  .orb {
    transition: transform 0.1s linear;
  }

  @media (max-width: 900px) {
    .hero {
      grid-template-columns: 1fr;
      text-align: center;
      padding: 7rem 5% 4rem;
    }
    .hero-content { order: 2; }
    .hero-photo-wrapper { order: 1; }
    .hero-eyebrow { justify-content: center; }
    .hero-btns { justify-content: center; }
    .hero-scroll { align-items: center; }
    .hero-photo-frame { width: 240px; height: 300px; }
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
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(node);
        }
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
        <div className="nav-logo">A<span>MAE</span></div>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="page">
        {/* HERO — two-column with photo */}
        <section id="home" style={{ maxWidth: "none", padding: 0 }}>
          <div className="hero">
            {/* Left: text */}
            <div className="hero-content">
              <div className="hero-eyebrow fade-in">Creative Developer</div>
              <h1 className="hero-name fade-in delay-1">
                Angel Mae<em>Morado</em>
              </h1>
              <p className="hero-title fade-in delay-2">Frontend Engineer · UI Designer · Full Stack Developer</p>
              <p className="hero-desc fade-in delay-3">
                Crafting beautiful, performant digital experiences at the intersection of design and technology. As a Full-Stack Developer, UI Designer, and Frontend Engineer, I build intuitive interfaces and scalable web applications that deliver seamless user experiences.
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

            {/* Right: photo placeholder */}
            <div className="hero-photo-wrapper fade-in delay-2">
              <div className="hero-photo-ring" />
              <div className="hero-photo-ring-2" />
              <div className="hero-photo-frame">
                {/* ─── Replace this div's contents with an <img> tag once you have your photo ─── */}
                <img src="public/2.jpg" alt="Angel Mae Morado" style={{width:'100%',height:'99%',objectFit:'cover'}} />
                <div className="hero-photo-inner">
                  {/* Decorative gradient lines */}
                  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }} viewBox="0 0 340 420" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                    {[...Array(12)].map((_, i) => (
                      <line key={i} x1={i * 30} y1="0" x2={i * 30 + 420} y2="420" stroke="url(#lineGrad)" strokeWidth="0.8" />
                    ))}
                    <circle cx="170" cy="160" r="88" fill="none" stroke="url(#lineGrad)" strokeWidth="1" />
                    <circle cx="170" cy="160" r="60" fill="rgba(167,139,250,0.08)" />
                  </svg>

                  <div className="photo-placeholder-icon">👤</div>
                  <div className="photo-placeholder-text">
                    Your Photo Here
                    <div className="photo-placeholder-hint">Replace with &lt;img&gt; tag</div>
                  </div>
                </div>
              </div>
              {/* Available badge */}
              <div className="hero-photo-badge">
                <div className="badge-dot" />
                <span className="badge-text">Available for work</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
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
                <div className="about-photo-thumb">👤</div>
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

        {/* SKILLS */}
        <section id="skills" ref={skillsRef}>
          <Reveal className="section-label" as="div">Expertise</Reveal>
          <Reveal as="h2" className="section-title">
            Core <em>skills</em>
          </Reveal>
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

        {/* PROJECTS */}
        <section id="projects">
          <Reveal className="section-label" as="div">Work</Reveal>
          <Reveal as="h2" className="section-title">
            Featured <em>projects</em>
          </Reveal>
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

        {/* CONTACT */}
        <section id="contact">
          <Reveal className="section-label" as="div">Contact</Reveal>
          <Reveal as="h2" className="section-title">
            Let's <em>connect</em>
          </Reveal>
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
                { icon: "✦", label: "Email", value: "maemorado29@gmail.com" },
                { icon: "◉", label: "Location", value: "Alubihid, Buenavista, Philippines" },
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