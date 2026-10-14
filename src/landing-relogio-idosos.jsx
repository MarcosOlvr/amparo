import { useState, useEffect, useRef } from "react";

// ── Ícones SVG inline ────────────────────────────────────────────────
const Icon = ({ path, size = 24, className = "" }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d={path} />
  </svg>
);

const icons = {
  heart:    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  sos:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  brain:    "M9.5 2a2.5 2.5 0 0 1 5 0M12 2v4M4.5 8.5A3.5 3.5 0 0 1 8 5h8a3.5 3.5 0 0 1 3.5 3.5v7A3.5 3.5 0 0 1 16 19H8a3.5 3.5 0 0 1-3.5-3.5v-7zM8 12h8M8 15h5",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  fall:     "M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zM5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2",
  bell:     "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  check:    "M20 6L9 17l-5-5",
  warning:  "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  lock:     "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  map:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  menu:     "M3 6h18M3 12h18M3 18h18",
  close:    "M18 6L6 18M6 6l12 12",
};

// ── FadeIn com IntersectionObserver ──────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Funcionalidades", href: "#features" },
  { label: "Como Funciona",   href: "#how" },
  { label: "Proteção",        href: "#protection" },
  { label: "IA",              href: "#ai" },
  { label: "Planos",          href: "#plans" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-blue-deep/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-mid to-green-vita flex items-center justify-center">
            <Icon path={icons.heart} size={18} className="text-white" />
          </div>
          <span className="text-white font-extrabold text-xl tracking-tight">Amparo</span>
        </div>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
              className="text-white/75 text-sm font-medium hover:text-green-vita transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </div>

        {/* Hamburguer */}
        <button onClick={() => setOpen(!open)}
          className="md:hidden text-white p-1">
          <Icon path={open ? icons.close : icons.menu} size={24} />
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-blue-deep px-6 pb-6 flex flex-col gap-4">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-white/85 text-base font-medium py-1">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-navy via-blue-deep to-[#163050] flex items-center justify-center pt-28 pb-20 px-6 relative overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-mid/10 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-green-vita/8 pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-16">
        {/* Texto */}
        <div className="flex-1 min-w-[320px] max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-vita/15 border border-green-vita/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-vita animate-pulse2" />
            <span className="text-green-vita text-xs font-semibold tracking-wide uppercase">
              Tecnologia com Propósito
            </span>
          </div>

          <h1 className="text-white font-black leading-[1.08] tracking-tight mb-5"
            style={{ fontSize: "clamp(36px,5vw,58px)" }}>
            Cuidar de quem<br />
            <span className="text-blue-mid">você ama,</span><br />
            onde quer que esteja.
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-9">
            O Amparo é o relógio inteligente que monitora saúde, previne quedas com IA e protege idosos de golpes digitais, tudo em tempo real, no pulso de quem você se importa.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#how"
              className="bg-green-vita text-navy font-extrabold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-green-vita/30 hover:opacity-90 transition-opacity">
              Saiba mais ↓
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-11">
            {[
              ["IA avançada",   "Prevenção de quedas"],
              ["SOS",           "Resposta imediata"],
              ["Anti-golpes",   "Proteção digital"],
            ].map(([n, l]) => (
              <div key={n}>
                <div className="text-green-vita text-xl font-black">{n}</div>
                <div className="text-white/50 text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Watch mockup */}
        <div className="relative flex-shrink-0">
          <div className="w-full h-56 sm:h-72 md:80 rounded-[50px] flex flex-col items-center justify-center relative">
              <img src="relogio-apenas.png" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Features ─────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: icons.heart, iconClass: "text-orange-alert", bgClass: "bg-orange-alert/10",
    title: "Monitoramento de Saúde",
    items: ["Frequência cardíaca","Monitoramento do sono","Contagem de passos diários","Lembrete de medicamentos com vibração"],
  },
  {
    icon: icons.sos, iconClass: "text-red-500", bgClass: "bg-red-500/10",
    title: "Emergência & SOS",
    items: ["Botão SOS de fácil acesso","Detecção automática de quedas com IA","Envio de localização aos familiares", "Compartilhamento de dados médicos"],
  },
  {
    icon: icons.users, iconClass: "text-blue-mid", bgClass: "bg-blue-mid/10",
    title: "App para Familiares",
    items: ["Monitoramento em tempo real","Alertas de queda e saúde fora do normal","Relatórios semanais de saúde"],
  },
  {
    icon: icons.eye, iconClass: "text-green-vita", bgClass: "bg-green-vita/10",
    title: "Acessibilidade",
    items: ["Letras grandes e ícones simples", "Vibração reforçada","Alto contraste visual","Interface intuitiva para idosos"],
  },
];

function Features() {
  return (
    <section id="features" className="bg-cream py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-mid font-bold text-xs tracking-widest uppercase">
            O que o Amparo oferece
          </span>
          <h2 className="text-navy font-black mt-3 tracking-tight"
            style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            Tudo em um só lugar,{" "}
            <span className="text-blue-mid">simples como deve ser.</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 100}
              className="bg-white rounded-2xl p-7 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col">
              <div className={`w-12 h-12 rounded-xl ${f.bgClass} flex items-center justify-center mb-3 mx-auto`}>
                <Icon path={f.icon} size={24} className={f.iconClass} />
              </div>
              <h3 className="text-navy font-extrabold text-base mb-2 text-center">{f.title}</h3>
              <ul className="flex flex-col gap-2.5 mt-auto">
                {f.items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-slate-500 text-sm leading-snug">
                    <Icon path={icons.check} size={13} className={`${f.iconClass} mt-0.5 shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Como Funciona ─────────────────────────────────────────────────────
const STEPS = [
  { n:"01", icon: icons.heart,    iconClass:"text-blue-mid",      ringClass:"border-blue-mid/40",   bgClass:"bg-blue-mid/10",    title:"O relógio monitora",  desc:"O Amparo coleta continuamente dados de saúde: batimento cardíaco, movimentos e padrões de sono, direto no pulso do idoso." },
  { n:"02", icon: icons.brain,    iconClass:"text-green-vita",    ringClass:"border-green-vita/40", bgClass:"bg-green-vita/10",  title:"A IA analisa",        desc:"Nossa inteligência artificial processa os dados em tempo real, detectando anomalias, padrões de risco e comportamentos que precisam de atenção." },
  { n:"03", icon: icons.bell,     iconClass:"text-orange-alert",  ringClass:"border-orange-alert/40", bgClass:"bg-orange-alert/10", title:"Alertas instantâneos", desc:"Familiares recebem notificações imediatas no app: queda, medicação esquecida, frequência cardíaca alterada ou saída da área segura." },
  { n:"04", icon: icons.users,    iconClass:"text-purple-500",    ringClass:"border-purple-400/40", bgClass:"bg-purple-500/10",  title:"Conexão com a família", desc:"Contatos de emergência com um toque e localização em tempo real mantêm o idoso sempre conectado." },
];

function HowItWorks() {
  return (
    <section id="how" className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-mid font-bold text-xs tracking-widest uppercase">Simples de usar</span>
          <h2 className="text-navy font-black mt-3 tracking-tight"
            style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            Como o <span className="text-green-vita">Amparo</span> funciona
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {STEPS.map((s, i) => (
            <FadeIn key={s.n} delay={i * 120} className="text-center px-2">
              <div className="relative inline-flex mb-6">
                <div className={`w-20 h-20 rounded-full ${s.bgClass} border-2 ${s.ringClass} flex items-center justify-center`}>
                  <Icon path={s.icon} size={32} className={s.iconClass} />
                </div>
              </div>
              <h3 className="text-navy font-extrabold text-base mb-3">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Proteção contra Golpes ────────────────────────────────────────────
function ProtectionSection() {
  const [activeAlert, setActiveAlert] = useState(0);
  const alerts = [
    { type: "Golpe Financeiro", msg: "Seu CPF foi bloqueado. Transfira R$500 agora para regularizar.", tag: "⚠️ GOLPE DETECTADO" },
    { type: "Phishing",         msg: "Link suspeito recebido: 'bancoitau-seguranca.click' — imita um banco real.", tag: "🔴 LINK PERIGOSO" },
    { type: "App Suspeito",     msg: "Tentativa de instalar aplicativo não verificado detectada pelo sistema.", tag: "🛡️ BLOQUEADO" },
  ];
  useEffect(() => {
    const t = setInterval(() => setActiveAlert(a => (a + 1) % alerts.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="protection" className="bg-[#0F1A2E] py-24 px-6 relative overflow-hidden">
      {/* Grade decorativa */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:"linear-gradient(rgba(74,144,196,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,144,196,0.04) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />

      <div className="max-w-5xl mx-auto relative">
        <div className="flex flex-wrap items-center justify-center gap-16">

          {/* Terminal */}
          <FadeIn className="flex-shrink-0 w-full max-w-md">
            <div className="bg-[#0A1220] border border-orange-alert/30 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {/* Barra */}
              <div className="bg-[#111B2C] px-5 py-3 flex items-center gap-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  {["bg-red-500","bg-yellow-400","bg-green-500"].map(c => (
                    <div key={c} className={`w-3 h-3 rounded-full ${c}`} />
                  ))}
                </div>
                <span className="text-white/30 text-xs font-mono">Amparo_shield — proteção ativa</span>
              </div>

              <div className="p-6">
                {/* Log */}
                <div className="text-green-vita text-xs font-mono mb-4 leading-relaxed">
                  &gt; Sistema de proteção digital ativo...<br />
                  &gt; Monitorando mensagens e links<br />
                  &gt; IA analisando padrões de golpe...
                </div>

                {/* Carrossel com altura fixa */}
                <div className="relative h-40">
                  {alerts.map((a, i) => (
                    <div key={i}
                      className="absolute inset-0 bg-orange-alert/8 border border-orange-alert/25 rounded-xl p-4 transition-opacity duration-500"
                      style={{ opacity: i === activeAlert ? 1 : 0, pointerEvents: i === activeAlert ? "auto" : "none" }}>
                      <div className="flex justify-between items-start gap-2 mb-2 flex-wrap">
                        <span className="text-white/50 text-[11px] font-mono">{a.type}</span>
                        <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full">{a.tag}</span>
                      </div>
                      <p className="text-white/70 text-xs leading-relaxed font-mono">"{a.msg}"</p>
                      <div className="flex gap-2 mt-3">
                        <div className="flex-1 bg-green-vita/15 border border-green-vita/30 rounded-lg py-1.5 text-center text-green-vita text-xs font-bold">✓ Protegido</div>
                        <div className="flex-1 bg-blue-mid/10 border border-blue-mid/20 rounded-lg py-1.5 text-center text-blue-mid text-xs">Avisar família</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Indicadores */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {alerts.map((_, i) => (
                    <div key={i}
                      className={`h-2 rounded-full bg-orange-alert transition-all duration-300 ${i === activeAlert ? "w-5 opacity-100" : "w-2 opacity-25"}`} />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Texto */}
          <FadeIn delay={150} className="flex-1 min-w-[280px] max-w-lg">
            <div className="inline-flex items-center gap-2 bg-orange-alert/15 border border-orange-alert/30 rounded-full px-4 py-1.5 mb-6">
              <Icon path={icons.shield} size={13} className="text-orange-alert" />
              <span className="text-orange-alert text-xs font-bold tracking-wide uppercase">Proteção Anti-Golpes</span>
            </div>

            <h2 className="text-white font-black leading-tight mb-5 tracking-tight"
              style={{ fontSize: "clamp(26px,3.5vw,40px)" }}>
              Golpistas não chegam<br />perto de quem<br />
              <span className="text-orange-alert">você protege.</span>
            </h2>

            <p className="text-white/65 text-base leading-relaxed mb-7">
              Idosos são o principal alvo de golpes financeiros e digitais no Brasil. O Amparo monitora mensagens, links e apps suspeitos em tempo real, alertando o idoso e a família antes que qualquer dano aconteça.
            </p>

            <div className="flex flex-col gap-3.5">
              {[
                ["Alertas sobre golpes comuns e mensagens suspeitas",     "text-orange-alert"],
                ["Avisos educativos: 'Nunca envie dinheiro para desconhecidos'", "text-blue-mid"],
                ["Notificação de apps suspeitos em tempo real",           "text-green-vita"],
                ["Central de educação digital para a família",            "text-purple-400"],
              ].map(([text, color]) => (
                <div key={text} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border ${color.replace("text-","border-")}/50 bg-current/10 flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon path={icons.check} size={11} className={color} />
                  </div>
                  <span className="text-white/75 text-sm leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

// ── IA ────────────────────────────────────────────────────────────────
const AI_FEATURES = [
  { icon: icons.fall,     iconClass:"text-red-500",       bgClass:"bg-red-500/10",       title:"Prevenção de Quedas",         desc:"A IA detecta padrões de movimento que antecedem quedas e envia alertas preventivos antes que o acidente aconteça.", badge:true },
  { icon: icons.lock,     iconClass:"text-yellow-500",    bgClass:"bg-yellow-500/10",    title:"Proteção Inteligente",        desc:"Explica mensagens suspeitas recebidas pelo idoso e avisa em linguagem simples sobre possíveis tentativas de golpe.", badge:true },
  { icon: icons.activity, iconClass:"text-blue-mid",      bgClass:"bg-blue-mid/10",      title:"Análise de Comportamento",    desc:"Detecta mudanças sutis na rotina, como redução de movimentos ou alterações no sono, que podem indicar problemas de saúde." },
  { icon: icons.heart,    iconClass:"text-green-vita",    bgClass:"bg-green-vita/10",    title:"Sinais Vitais Inteligentes",  desc:"Analisa padrões de batimento cardíaco ao longo do tempo e sugere buscar atendimento médico quando necessário." },
  { icon: icons.zap,      iconClass:"text-orange-alert",  bgClass:"bg-orange-alert/10",  title:"Lembrete digital",           desc:"Lembra remédios, consultas e compromissos, de forma clara e amigável." },
  { icon: icons.warning,  iconClass:"text-purple-500",    bgClass:"bg-purple-500/10",    title:"Risco de Sedentarismo",       desc:"Identifica períodos longos de inatividade e incentiva o idoso a se movimentar com mensagens amigáveis." }
];

function AISection() {
  return (
    <section id="ai" className="bg-gradient-to-br from-cream to-blue-light py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-mid/12 border border-blue-mid/25 rounded-full px-4 py-1.5 mb-4">
            <Icon path={icons.brain} size={13} className="text-blue-mid" />
            <span className="text-blue-mid text-xs font-bold tracking-wide uppercase">Inteligência Artificial</span>
          </div>
          <h2 className="text-navy font-black mt-2 tracking-tight"
            style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            IA que cuida,{" "}
            <span className="text-blue-mid">antes que seja tarde.</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Nosso diferencial está em antecipar riscos. A IA do Amparo aprende a rotina de cada idoso e age preventivamente.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 80}
              className="bg-white rounded-2xl p-7 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 relative">
              {f.badge && (
                <span className="absolute top-4 right-4 bg-red-500/10 text-red-500 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  🏆 Diferencial
                </span>
              )}
              <div className={`w-12 h-12 rounded-xl ${f.bgClass} flex items-center justify-center mb-5 mx-auto`}>
                <Icon path={f.icon} size={24} className={f.iconClass} />
              </div>
              <h3 className="text-navy font-extrabold text-base mb-2.5 text-center">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed text-center">{f.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── App Showcase ──────────────────────────────────────────────────────
const APP_TABS = [
  {
    id: "saude",
    label: "Saúde & Bem-estar",
    img: "app-saude.png",
    color: "text-blue-mid",
    activeBg: "bg-blue-mid",
    icon: icons.heart,
    iconClass: "text-blue-mid",
    bgClass: "bg-blue-mid/10",
    title: "Saúde na palma da mão",
    desc: "O app do idoso exibe de forma simples e clara todos os dados do relógio: frequência cardíaca, sono, passos e pressão arterial. Tudo pensado para ser fácil de ler e entender.",
    features: [
      "Frequência cardíaca em tempo real",
      "Monitoramento do sono com eficiência",
      "Agenda de medicamentos com alertas",
      "Histórico de saúde e exames",
    ],
  },
  {
    id: "emergencia",
    label: "Emergência & SOS",
    img: "app-emergencia.png",
    color: "text-red-500",
    activeBg: "bg-red-500",
    icon: icons.sos,
    iconClass: "text-red-500",
    bgClass: "bg-red-500/10",
    title: "Segurança a um toque",
    desc: "O botão SOS envia localização e aciona contatos de emergência automaticamente. A detecção de quedas por IA funciona 24h e notifica a família em segundos.",
    features: [
      "Proteção contra golpes digitais",
      "Detecção automática de quedas com IA",
      "Contatos de emergência com um toque",
      "Compartilhamento de localização em tempo real",
    ],
  },
];

function AppShowcase() {
  const [active, setActive] = useState("saude");
  const tab = APP_TABS.find(t => t.id === active);

  return (
    <section id="app" className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Cabeçalho */}
        <FadeIn className="text-center mb-12">
          <span className="text-blue-mid font-bold text-xs tracking-widest uppercase">
            Aplicativo Amparo
          </span>
          <h2 className="text-navy font-black mt-3 tracking-tight"
            style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            Um app pensado para{" "}
            <span className="text-blue-mid">quem importa.</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Interface simples, letras grandes e ícones claros — projetado para idosos usarem com autonomia e para famílias acompanharem com tranquilidade.
          </p>
        </FadeIn>

        {/* Tabs */}
        <FadeIn className="flex justify-center gap-3 mb-12 flex-wrap">
          {APP_TABS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                active === t.id
                  ? `${t.activeBg} text-white border-transparent shadow-md`
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}>
              <Icon path={t.icon} size={15} className={active === t.id ? "text-white" : t.iconClass} />
              {t.label}
            </button>
          ))}
        </FadeIn>

        {/* Conteúdo */}
        <div className="flex flex-wrap items-center justify-center gap-14">

          {/* Mockup do celular */}
          <FadeIn className="flex-shrink-0">
            <div className="relative">
              {/* Brilho atrás */}
              <div className={`absolute inset-0 rounded-[40px] blur-2xl opacity-20 scale-95 ${
                active === "saude" ? "bg-blue-mid" : "bg-red-500"
              } transition-colors duration-500`} />
              {/* Frame do celular */}
              <div className="relative w-56 rounded-[40px] bg-[#0d0d0d] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.35)] border border-white/10">
                {/* Tela */}
                <div className="rounded-[32px] overflow-hidden bg-white" style={{ height: 480 }}>
                  <img
                    key={tab.id}
                    src={tab.img}
                    alt={tab.label}
                    className="w-full h-full object-cover object-top transition-opacity duration-300"
                  />
                </div>
                {/* Botão home */}
                <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mt-2" />
              </div>
            </div>
          </FadeIn>

          {/* Texto e features */}
          <FadeIn delay={120} className="flex-1 min-w-[260px] max-w-md">
            <div className={`w-12 h-12 rounded-xl ${tab.bgClass} flex items-center justify-center mb-5`}>
              <Icon path={tab.icon} size={24} className={tab.iconClass} />
            </div>
            <h3 className="text-navy font-extrabold text-2xl mb-3 tracking-tight">{tab.title}</h3>
            <p className="text-slate-500 text-base leading-relaxed mb-7">{tab.desc}</p>
            <ul className="flex flex-col gap-3">
              {tab.features.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full ${tab.bgClass} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon path={icons.check} size={11} className={tab.iconClass} />
                  </div>
                  <span className="text-slate-600 text-sm leading-snug">{f}</span>
                </li>
              ))}
            </ul>

            {/* Badges */}
            <div className="flex gap-3 mt-8 flex-wrap">
              {["iOS","Android"].map(os => (
                <div key={os} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
                  <span className="text-slate-400 text-lg">{os === "iOS" ? "🍎" : "🤖"}</span>
                  <div>
                    <div className="text-[10px] text-slate-400 leading-none">Disponível no</div>
                    <div className="text-navy font-bold text-sm">{os === "iOS" ? "App Store" : "Google Play"}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}

// ── Planos ────────────────────────────────────────────────────────────
const PLANS = [
  {
    name:"Cuidado Plus", price:"Plano Cuidado", tag:"Mais Popular", accent:"border-green-vita", btnClass:"bg-green-vita text-navy",
    desc:"Para quem quer proteger e monitorar um ente querido.",
    items:["Relógio + App de monitoramento","IA de prevenção de quedas","Proteção anti-golpes básica","App dos Familiares","Relatórios médicos semanais","Localização em tempo real"],
  },
];

function PlansSection() {
  return (
    <section id="plans" className="bg-blue-deep py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-mid font-bold text-xs tracking-widest uppercase">Acompanhe quem você ama</span>
          <h2 className="text-white font-black mt-3 tracking-tight"
            style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            O plano certo para{" "}
            <span className="text-green-vita">você.</span>
          </h2>
          <p className="text-white/60 text-base mt-3">
            Cuide melhor de quem você ama com um plano perfeito para você.
          </p>
        </FadeIn>

        <div className="flex flex-wrap gap-6 justify-center">
          {PLANS.map((p, i) => (
            <FadeIn key={p.name} delay={i * 120} className="relative">
              {p.tag && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-green-vita text-navy text-xs font-extrabold px-4 py-1 rounded-full whitespace-nowrap z-10">
                  {p.tag}
                </div>
              )}
              <div className={`rounded-2xl p-8 border ${p.accent}/40 ${p.tag ? "bg-white shadow-2xl shadow-black/25" : "bg-white/7"} h-full flex flex-col`}>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${p.btnClass.split(" ")[0]}`} />
                  <span className={`text-xs font-semibold ${p.tag ? "text-slate-500" : "text-white/50"}`}>{p.name}</span>
                </div>
                <div className={`text-2xl font-black mb-2 ${p.tag ? "text-navy" : "text-white"}`}>{p.price}</div>
                <p className={`text-sm leading-relaxed mb-6 ${p.tag ? "text-slate-500" : "text-white/60"}`}>{p.desc}</p>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {p.items.map(item => (
                    <li key={item} className="flex items-center gap-2.5">
                      <Icon path={icons.check} size={14} className={p.btnClass.split(" ")[0].replace("bg-","text-")} />
                      <span className={`text-sm leading-snug ${p.tag ? "text-slate-600" : "text-white/75"}`}>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact"
                  className={`block text-center ${p.btnClass} font-bold text-sm py-3.5 rounded-xl hover:opacity-90 transition-opacity`}>
                  {p.name === "Institucional" ? "Falar com especialista" : "Quero o plano"}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0F1A2E] px-6 pt-12 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-between gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-mid to-green-vita flex items-center justify-center">
                <Icon path={icons.heart} size={18} className="text-white" />
              </div>
              <span className="text-white font-extrabold text-lg">Amparo</span>
            </div>
            <p className="text-white/40 text-sm max-w-[220px] leading-relaxed">
              Tecnologia com propósito. Cuidando de quem você ama.
            </p>
          </div>

          <div className="flex gap-12 flex-wrap">
            {[
              { title:"Produto",  links:["Funcionalidades","Como Funciona","IA","Planos"] },
              { title:"Empresa",  links:["Sobre nós","Missão","Parceiros","Contato"] },
            ].map(col => (
              <div key={col.title}>
                <p className="text-white/55 text-xs font-bold uppercase tracking-widest mb-4">{col.title}</p>
                {col.links.map(l => (
                  <a key={l} href="#"
                    className="block text-white/40 text-sm mb-2.5 hover:text-white transition-colors">
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/6 pt-6 flex flex-wrap justify-between gap-3">
          <span className="text-white/30 text-xs">© 2025 Amparo. Todos os direitos reservados.</span>
          <span className="text-white/30 text-xs">Feito com ❤️ para quem cuida.</span>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="font-sans antialiased">
      <style>{`html{scroll-behavior:smooth}`}</style>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <ProtectionSection />
      <AISection />
      <AppShowcase />
      <PlansSection />
      <Footer />
    </div>
  );
}
