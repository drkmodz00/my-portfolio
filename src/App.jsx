import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "React", level: 50, icon: "⚛️" },
  { name: "JavaScript", level: 50, icon: "🟡" },
  { name: "TypeScript", level: 20, icon: "🔷" },
  { name: "Node.js", level: 20, icon: "🟢" },
  { name: "CSS / Tailwind", level: 90, icon: "🎨" },
  { name: "UI/UX Design", level: 100, icon: "✦" },
];

const PROJECTS = [
  {
    title: "To-Do List",
    desc: "A simple full stack task management application that helps users organize, track, and complete daily activities efficiently.",
    tags: ["React", "TypeScript/JavaScript", "Node.js", "Supabase", "Android Studio"],
    color: "#c4b5fd",
    accent: "#7c3aed",
  },
  {
    title: "Fintrackr",
    desc: "A personal finance management system that allows users to record expenses, monitor spending habits, and track their budget.",
    tags: ["Node.js", "React", "Supabase", "Deployed", "Tailwind", "Next.js"],
    color: "#a5b4fc",
    accent: "#4f46e5",
  },
  {
    title: "Laboratory Management",
    desc: "A monitoring system designed to track laboratory equipment, resources, and activities to improve efficiency and management.",
    tags: ["Tailwind", "HTML", "Supabase", "Django"],
    color: "#ddd6fe",
    accent: "#6d28d9",
  },
  {
    title: "Vyber",
    desc: "An online platform of cars for browsing, viewing, and purchasing vehicles with interactive product displays and detailed specifications.",
    tags: ["Three.js", "React", "Supabase", "Javascript", "MySql", "PHP", "API", "Laravel"],
    color: "#e9d5ff",
    accent: "#9333ea",
  },
  {
    title: "DMEP Collection",
    desc: "A web-based shopping platform that enables customers to browse products, place orders, and manage purchases online with big sales for branded.",
    tags: ["Tailwind", "Django", "Supabase", "Javascript"],
    color: "#e9d5ff",
    accent: "#9333ea",
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
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center;
    padding: 8rem 5% 4rem;
  }

  .hero-eyebrow {
    font-size: 0.75rem; letter-spacing: 0.24em; text-transform: uppercase;
    color: var(--lavender-400); margin-bottom: 1.5rem; font-weight: 400;
    display: flex; align-items: center; gap: 0.75rem;
  }

  .hero-eyebrow::before, .hero-eyebrow::after {
    content: ''; display: block; width: 36px; height: 0.5px; background: var(--lavender-400);
  }

  .hero-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(4rem, 9vw, 8.5rem);
    font-weight: 300; line-height: 0.92;
    color: var(--text-primary); margin-bottom: 0.3rem; letter-spacing: -0.01em;
  }

  .hero-name em {
    font-style: italic; color: var(--lavender-300);
    display: block;
  }

  .hero-title {
    font-size: clamp(0.85rem, 1.5vw, 1.05rem); letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--text-secondary);
    font-weight: 300; margin: 1.6rem 0 2.4rem;
  }

  .hero-desc {
    max-width: 480px; font-size: 0.97rem; line-height: 1.8;
    color: var(--text-secondary); margin-bottom: 3rem;
  }

  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }

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

  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    color: var(--text-muted); font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
  }

  .scroll-line {
    width: 1px; height: 48px; background: linear-gradient(to bottom, var(--lavender-400), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(0.6); }
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
    display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;
  }

  .about-text { padding: 0; }

  .about-text p {
    font-size: 0.98rem; line-height: 1.9; color: var(--text-secondary); margin-bottom: 1.2rem;
  }

  .about-text p strong { color: var(--lavender-300); font-weight: 400; }

  .about-card {
    padding: 2.8rem 2.4rem;
  }

  .about-stat { display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 2rem; }
  .about-stat:last-child { margin-bottom: 0; }
  .stat-num {
    font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 300;
    color: var(--lavender-300); line-height: 1;
  }
  .stat-label { font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
  .stat-divider { width: 100%; height: 0.5px; background: var(--glass-border); margin: 1.5rem 0; }

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

  @media (max-width: 768px) {
    .about-grid, .contact-inner { grid-template-columns: 1fr; }
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    .projects-grid { grid-template-columns: 1fr; }
    .nav-links { display: none; }
  }
`;

export default function Portfolio() {
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

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
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: "", email: "", message: "" });
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
        <button className="nav-cta">Hire Me</button>
      </nav>

      <div className="page">
        {/* HERO */}
        <section id="home" className="hero" style={{ maxWidth: "none", position: "relative" }}>
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
          <div className="hero-scroll">
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="about-grid">
            <div className="about-text">
              <div className="section-label">About Me</div>
              <h2 className="section-title">
                Design-led<em>engineering</em>
              </h2>
              <p>
                I'm a frontend engineer with a deep love for <strong>visual craft and interaction design</strong>. I believe great software is felt before it's understood — every transition, every spacing decision, every typographic choice matters.
              </p>
              <p>
                With 5+ years building products for startups and enterprises, I bring both the technical depth to architect scalable systems and the <strong>aesthetic sensitivity</strong> to make them delightful.
              </p>
              <p>
                Currently open to <strong>select freelance projects</strong> and full-time opportunities.
              </p>
            </div>
            <div className="glass-card about-card">
              <div className="about-stat">
                <span className="stat-num">5+</span>
                <span className="stat-label">Years of experience</span>
              </div>
              <div className="stat-divider" />
              <div className="about-stat">
                <span className="stat-num">5</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-divider" />
              {/* <div className="about-stat">
                <span className="stat-num">12</span>
                <span className="stat-label">Happy clients</span>
              </div> */}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" ref={skillsRef}>
          <div className="section-label">Expertise</div>
          <h2 className="section-title">
            Core <em>skills</em>
          </h2>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <div key={s.name} className="glass-card skill-item">
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
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="section-label">Work</div>
          <h2 className="section-title">
            Featured <em>projects</em>
          </h2>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className="glass-card project-card"
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
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="section-label">Contact</div>
          <h2 className="section-title">
            Let's <em>connect</em>
          </h2>
          <div className="contact-inner">
            <div className="glass-card contact-form-card">
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
                <button type="submit" className="form-submit">
                  {sent ? "Message Sent ✦" : "Send Message"}
                </button>
              </form>
            </div>
            <div className="contact-info">
              {[
                { icon: "✦", label: "Email", value: "maemorado29@gmail.com" },
                { icon: "◉", label: "Location", value: "Butuan City, Philippines" },
                { icon: "◈", label: "Availability", value: "Open to projects" },
              ].map((item) => (
                <div key={item.label} className="glass-card contact-info-item">
                  <div className="contact-icon">{item.icon}</div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer>
          Designed & built with care · <span>Angel Mae Morado</span> · {new Date().getFullYear()}
        </footer>
      </div>
    </>
  );
}