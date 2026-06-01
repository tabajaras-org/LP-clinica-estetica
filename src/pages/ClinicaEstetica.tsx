import {
  ArrowUpRight,
  Award,
  ChevronRight,
  Clock3,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { TweaksPanel } from '../components/TweaksPanel';

type Procedure = {
  title: string;
  description: string;
  dark?: boolean;
};

type PaletteId = 'classic' | 'rose' | 'sage' | 'pearl';
type HeadingFontId = 'playfair' | 'cormorant' | 'fraunces';
type BodyFontId = 'geist' | 'inter' | 'manrope';

const paletteOptions: {
  id: PaletteId;
  label: string;
  swatches: string[];
}[] = [
  {
    id: 'classic',
    label: 'Acento dourado',
    swatches: ['#A88346', '#D8BE8C', '#FBF8F3', '#161210'],
  },
  {
    id: 'rose',
    label: 'Rose couture',
    swatches: ['#9D4F64', '#DDB0B9', '#FCF6F5', '#201014'],
  },
  {
    id: 'sage',
    label: 'Sage premium',
    swatches: ['#6D7D54', '#C8BE86', '#F7F8EF', '#101811'],
  },
  {
    id: 'pearl',
    label: 'Pearl graphite',
    swatches: ['#6F8797', '#C8B07A', '#F6F8F8', '#101722'],
  },
];

const headingFontOptions: { id: HeadingFontId; label: string }[] = [
  { id: 'playfair', label: 'Playfair (atual)' },
  { id: 'cormorant', label: 'Cormorant (luxo)' },
  { id: 'fraunces', label: 'Fraunces (editorial)' },
];

const bodyFontOptions: { id: BodyFontId; label: string }[] = [
  { id: 'geist', label: 'Geist (atual)' },
  { id: 'inter', label: 'Inter (clean)' },
  { id: 'manrope', label: 'Manrope (soft)' },
];

const paletteClasses = paletteOptions.map((option) => `theme-${option.id}`);
const headingFontClasses = headingFontOptions.map((option) => `font-heading-${option.id}`);
const bodyFontClasses = bodyFontOptions.map((option) => `font-body-${option.id}`);

const procedures: Procedure[] = [
  {
    title: 'Harmonizacao\nFacial',
    description: 'Proporcao e equilibrio para contorno, labios, mento e sustentacao com acabamento natural.',
    dark: true,
  },
  {
    title: 'Rejuvenescimento\nGlobal',
    description: 'Protocolos combinados para suavizar sinais, restaurar vico e melhorar firmeza progressivamente.',
  },
  {
    title: 'Bioestimulo de\nColageno',
    description: 'Estimulo inteligente para densidade, elasticidade e qualidade estrutural da pele.',
  },
  {
    title: 'Toxina\nPremium',
    description: 'Relaxamento preciso de pontos estrategicos para expressao leve e descansada.',
  },
  {
    title: 'Skinbooster &\nGlow',
    description: 'Hidratacao profunda e luminosidade para textura refinada em alta definicao.',
  },
  {
    title: 'Laser e\nTecnologia',
    description: 'Recursos avancados para manchas, textura, poros e rejuvenescimento com precisao.',
  },
];

const testimonials = [
  {
    quote: 'Parece que eu dormi melhor por meses. Ninguem percebeu procedimento, so elogios.',
    author: 'Paciente, 38 anos',
  },
  {
    quote: 'Atendimento impecavel e resultado muito natural.',
    author: 'Paciente verificada',
  },
];

function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16,
      },
    );

    elements.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
}

function getStoredOption<T extends string>(key: string, fallback: T, allowed: readonly T[]) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const stored = localStorage.getItem(key);
  return stored && allowed.includes(stored as T) ? (stored as T) : fallback;
}

function useVisualTweaks(palette: PaletteId, headingFont: HeadingFontId, bodyFont: BodyFontId) {
  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove(...paletteClasses, ...headingFontClasses, ...bodyFontClasses);
    root.classList.add(`theme-${palette}`, `font-heading-${headingFont}`, `font-body-${bodyFont}`);

    return () => {
      root.classList.remove(...paletteClasses, ...headingFontClasses, ...bodyFontClasses);
    };
  }, [palette, headingFont, bodyFont]);
}

function CtaButton({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-body text-sm font-semibold shadow-glass transition hover:-translate-y-0.5 ${
        light ? 'border border-maison-line bg-transparent text-maison-ink' : 'bg-maison-ink text-maison-soft'
      }`}
      href="#agendar"
    >
      {!light && <MessageCircle className="h-[18px] w-[18px] text-maison-champagne" />}
      {children}
      <ArrowUpRight className="h-[17px] w-[17px]" />
    </a>
  );
}

function Eyebrow({ children, inverse = false }: { children: string; inverse?: boolean }) {
  return (
    <p className={`font-caption text-xs font-bold uppercase tracking-[0.18em] ${inverse ? 'text-maison-champagne' : 'text-maison-gold'}`}>
      {children}
    </p>
  );
}

function MaisonImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}) {
  return (
    <div className={`reveal relative overflow-hidden rounded-[34px] bg-maison-nude shadow-maison lg:rounded-[46px] ${className}`}>
      <img className="h-full w-full object-cover" src={src} alt={alt} loading={loading} decoding="async" />
    </div>
  );
}

function AuthorityPill({ icon: Icon, label }: { icon: typeof Award; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-maison-line bg-white/70 px-4 py-2.5 shadow-glass backdrop-blur">
      <Icon className="h-4 w-4 text-maison-gold" />
      <span className="font-body text-xs font-semibold text-maison-ink">{label}</span>
    </div>
  );
}

function BeforeAfter({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`reveal relative overflow-hidden rounded-[30px] bg-maison-nude shadow-maison ${compact ? 'h-[430px]' : 'h-[492px]'}`}>
      <div className="absolute inset-y-0 left-0 flex w-1/2 items-end bg-[#d4bda8] p-7">
        <span className="font-caption text-[10px] font-bold uppercase tracking-[0.2em] text-maison-soft">Antes</span>
      </div>
      <div className="absolute inset-y-0 right-0 flex w-1/2 items-end justify-end bg-[#bfa175] p-7">
        <span className="font-caption text-[10px] font-bold uppercase tracking-[0.2em] text-maison-soft">Depois</span>
      </div>
      <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-maison-soft" />
      <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-maison-line bg-maison-soft shadow-glass">
        <ChevronRight className="h-5 w-5 text-maison-gold" />
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="reveal rounded-[22px] border border-white/80 bg-white/65 px-5 py-4 shadow-glass backdrop-blur">
      <strong className="block font-heading text-3xl font-semibold text-maison-ink">{value}</strong>
      <span className="font-body text-xs text-maison-muted">{label}</span>
    </div>
  );
}

function ProcedureCard({ title, description, dark }: Procedure) {
  return (
    <article
      className={`reveal flex min-h-[248px] flex-col justify-between rounded-[28px] border p-6 shadow-glass ${
        dark ? 'border-[#3b2e27] bg-maison-ink text-maison-soft' : 'border-white/80 bg-maison-soft/80 text-maison-ink'
      }`}
    >
      <div className="flex items-center justify-between">
        <Sparkles className={`h-5 w-5 ${dark ? 'text-maison-champagne' : 'text-maison-gold'}`} />
        <ArrowUpRight className="h-5 w-5" />
      </div>
      <h3 className="whitespace-pre-line font-heading text-[28px] leading-[1.05]">{title}</h3>
      <p className={`font-body text-sm leading-relaxed ${dark ? 'text-[#d8cfc5]' : 'text-maison-muted'}`}>{description}</p>
      <span className={`inline-flex items-center gap-2 font-body text-sm font-semibold ${dark ? 'text-maison-champagne' : 'text-maison-gold'}`}>
        Conhecer protocolo <ArrowUpRight className="h-4 w-4" />
      </span>
    </article>
  );
}

function Testimonial({ quote, author }: { quote: string; author: string }) {
  return (
    <blockquote className="reveal rounded-[28px] border border-white/80 bg-white/70 p-6 shadow-glass backdrop-blur">
      <p className="mb-4 font-caption text-[11px] font-bold text-maison-gold">5.0 / 5.0</p>
      <p className="font-heading text-2xl leading-tight text-maison-ink">{quote}</p>
      <footer className="mt-4 font-body text-xs text-maison-muted">{author}</footer>
    </blockquote>
  );
}

function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [
    { href: '#resultados', label: 'Resultados' },
    { href: '#procedimentos', label: 'Protocolos' },
    { href: '#especialista', label: 'Especialista' },
    { href: '#agendar', label: 'Agenda' },
  ];

  return (
    <section className="relative min-h-[960px] overflow-hidden bg-maison-surface">
      <div className="absolute right-0 top-0 hidden h-full w-[40vw] bg-maison-surface2 lg:block" />
      <div className="absolute left-0 top-36 h-[440px] w-[440px] rounded-full border border-[#d8be8c66]" />
      <nav className="relative z-10 mx-auto flex max-w-[1296px] items-center justify-between px-6 py-8 lg:px-0">
        <a className="font-heading text-3xl font-semibold text-maison-ink" href="#">
          AUREA
        </a>
        <div className="hidden items-center gap-8 font-body text-sm text-maison-muted lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden lg:block">
          <CtaButton>WhatsApp</CtaButton>
        </div>
        <button
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="grid h-11 w-11 place-items-center rounded-full border border-maison-line bg-white/65 text-maison-ink shadow-glass backdrop-blur lg:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          type="button"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-[86px] z-50 rounded-[26px] border border-white/80 bg-maison-soft/95 p-4 shadow-maison backdrop-blur lg:hidden">
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <a
                className="rounded-2xl px-4 py-3 font-body text-sm font-semibold text-maison-ink transition hover:bg-maison-surface2"
                href={link.href}
                key={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-maison-ink px-5 py-3.5 font-body text-sm font-semibold text-maison-soft"
            href="#agendar"
            onClick={() => setMobileMenuOpen(false)}
          >
            <MessageCircle className="h-[18px] w-[18px] text-maison-champagne" />
            WhatsApp
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
      <div className="relative z-10 mx-auto grid max-w-[1296px] gap-12 px-6 pb-20 pt-20 lg:grid-cols-[1fr_594px] lg:px-0 lg:pt-24">
        <div className="reveal">
          <Eyebrow>Clinica boutique de estetica avancada</Eyebrow>
          <h1 className="mt-6 max-w-[690px] font-heading text-[48px] font-semibold leading-[0.98] text-maison-ink md:text-[82px]">
            Sua expressao em equilibrio. Sua autoestima em alta definicao.
          </h1>
          <p className="mt-8 max-w-[545px] font-body text-lg leading-relaxed text-maison-muted">
            Harmonizacao facial, rejuvenescimento e protocolos avancados conduzidos com diagnostico individual,
            precisao tecnica e uma estetica naturalmente sofisticada.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <CtaButton>Quero avaliar meu caso</CtaButton>
            <CtaButton light>Ver resultados</CtaButton>
          </div>
          <div className="reveal mt-10 flex flex-wrap gap-3">
            <AuthorityPill icon={Award} label="CRM ativo" />
            <AuthorityPill icon={Star} label="2.800+ casos" />
            <AuthorityPill icon={ShieldCheck} label="Privacidade total" />
          </div>
        </div>
        <div className="relative">
          <MaisonImage
            src="/assets/clinica-hero-premium.png"
            alt="Paciente em uma sala premium de clinica estetica"
            className="h-[428px] w-full sm:h-[620px] lg:h-[742px]"
            loading="eager"
          />
          <div className="reveal absolute -left-10 bottom-20 hidden w-[252px] rounded-[26px] border border-white/80 bg-white/70 p-5 shadow-glass backdrop-blur lg:block">
            <div className="mb-2 flex items-center gap-2 font-caption text-[11px] font-bold uppercase text-maison-gold">
              <Sparkles className="h-4 w-4" /> Naturalidade
            </div>
            <p className="font-body text-sm leading-snug text-maison-ink">
              Protocolos planejados para valorizar sua expressao sem padronizar o rosto.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:absolute lg:bottom-[-20px] lg:right-8 lg:mt-0">
            <Metric value="4.9" label="avaliacao media" />
            <Metric value="12+" label="anos de pratica" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="resultados" className="bg-maison-surface py-20 lg:py-24">
      <div className="mx-auto max-w-[1296px] px-6 lg:px-0">
        <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-start">
          <div className="reveal">
            <Eyebrow>Resultados com naturalidade</Eyebrow>
            <h2 className="mt-5 max-w-[650px] font-heading text-[38px] font-semibold leading-none text-maison-ink lg:text-[62px]">
              Transformacoes discretas, leitura facial precisa e desejo real.
            </h2>
          </div>
          <p className="reveal font-body text-[17px] leading-relaxed text-maison-muted">
            Cada resultado parte de uma analise individual. O objetivo e sofisticar proporcoes, suavizar sinais e
            manter a expressao reconhecivel.
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-[690px_1fr]">
          <div>
            <BeforeAfter />
            <div className="reveal mt-[-62px] ml-auto mr-6 hidden w-[330px] rounded-[26px] border border-white/80 bg-white/70 p-5 shadow-glass backdrop-blur lg:block">
              <p className="font-caption text-[10px] font-bold uppercase tracking-[0.18em] text-maison-gold">Comparador interativo</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-maison-ink">
                Area pensada para arraste lateral, com fotos autorizadas e mesma iluminacao para leitura honesta.
              </p>
            </div>
          </div>
          <div className="grid gap-5">
            <BeforeAfter compact />
            <Testimonial {...testimonials[0]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Procedures() {
  return (
    <section id="procedimentos" className="bg-maison-surface2 py-20 lg:py-24">
      <div className="mx-auto max-w-[1296px] px-6 lg:px-0">
        <div className="grid gap-8 lg:grid-cols-[1fr_430px]">
          <div className="reveal">
            <Eyebrow>Protocolos avancados</Eyebrow>
            <h2 className="mt-5 max-w-[650px] font-heading text-[38px] font-semibold leading-none text-maison-ink lg:text-[66px]">
              Cada procedimento nasce de um desenho facial exclusivo.
            </h2>
          </div>
          <p className="reveal font-body text-[17px] leading-relaxed text-maison-muted">
            A selecao de tecnicas e feita apos avaliacao presencial, respeitando anatomia, rotina, estilo pessoal e
            expectativa de evolucao.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-[318px_318px_318px_280px]">
          {procedures.slice(0, 3).map((procedure) => (
            <ProcedureCard key={procedure.title} {...procedure} />
          ))}
          <div className="reveal row-span-2 flex min-h-[520px] flex-col justify-between rounded-[34px] bg-maison-ink p-7 text-maison-soft shadow-maison">
            <Eyebrow inverse>Metodo AUREA</Eyebrow>
            <h3 className="font-heading text-4xl leading-tight">Diagnostico, planejamento e execucao em camadas.</h3>
            <p className="font-body text-sm leading-relaxed text-[#d8cfc5]">
              A experiencia combina proporcao facial, qualidade de pele, expressao emocional e longevidade do resultado.
            </p>
          </div>
          {procedures.slice(3).map((procedure) => (
            <ProcedureCard key={procedure.title} {...procedure} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Specialist() {
  return (
    <section id="especialista" className="bg-maison-ink py-20 text-maison-soft lg:py-24">
      <div className="mx-auto grid max-w-[1296px] gap-12 px-6 lg:grid-cols-[520px_1fr] lg:px-0">
        <MaisonImage
          src="/assets/clinica-especialista.png"
          alt="Especialista em estetica avancada em consultorio sofisticado"
          className="h-[428px] lg:h-[650px]"
        />
        <div className="reveal flex flex-col justify-center">
          <Eyebrow inverse>Especialista</Eyebrow>
          <h2 className="mt-5 max-w-[620px] font-heading text-[38px] font-semibold leading-none lg:text-[62px]">
            Tecnica, escuta e discricao em cada plano.
          </h2>
          <p className="mt-7 max-w-[560px] font-body text-base leading-relaxed text-[#d8cfc5]">
            A consulta comeca pela leitura facial completa e evolui para um plano individual, respeitando anatomia,
            estilo e expectativa de transformacao.
          </p>
          <div className="mt-10 grid max-w-[520px] grid-cols-2 gap-3">
            <div className="reveal rounded-[20px] border border-white/15 bg-white/10 p-5">
              <strong className="block font-heading text-3xl">CRM-SP</strong>
              <span className="font-body text-sm text-[#d8cfc5]">Registro ativo</span>
            </div>
            <div className="reveal rounded-[20px] border border-white/15 bg-white/10 p-5">
              <strong className="block font-heading text-3xl">12 anos</strong>
              <span className="font-body text-sm text-[#d8cfc5]">Atuacao facial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = ['Horarios espacados para privacidade', 'Sala privativa e protocolo sensorial', 'Acompanhamento proximo no pos'];

  return (
    <section className="bg-maison-surface py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1296px] gap-10 px-6 lg:grid-cols-[1fr_560px] lg:px-0">
        <div className="reveal">
          <Eyebrow>Experiencia</Eyebrow>
          <h2 className="mt-5 max-w-[610px] font-heading text-[38px] font-semibold leading-none text-maison-ink lg:text-[62px]">
            Ambiente reservado e atendimento sem pressa.
          </h2>
          <div className="mt-10 grid gap-3">
            {items.map((item) => (
              <div key={item} className="reveal flex items-center gap-3 rounded-[20px] border border-white/80 bg-maison-soft/80 p-4 shadow-glass">
                <Clock3 className="h-5 w-5 text-maison-gold" />
                <span className="font-body text-sm font-medium text-maison-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal relative min-h-[315px] overflow-hidden rounded-[30px] bg-maison-nude shadow-maison">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/assets/clinica-ambiente.png"
            alt="Ambiente reservado de clinica estetica boutique"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maison-ink/20 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="bg-maison-surface2 py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1296px] gap-10 px-6 lg:grid-cols-[1fr_460px] lg:px-0">
        <div className="reveal">
          <Eyebrow>Prova social</Eyebrow>
          <h2 className="mt-5 max-w-[640px] font-heading text-[38px] font-semibold leading-none text-maison-ink lg:text-[62px]">
            Confianca por resultados consistentes.
          </h2>
          <div className="reveal mt-10 rounded-[30px] bg-maison-ink p-6 text-maison-soft">
            {[
              ['2.800+', 'casos acompanhados'],
              ['4.9', 'avaliacao media'],
              ['1:1', 'planejamento individual'],
            ].map(([value, label]) => (
              <div key={value} className="flex items-center justify-between border-b border-white/10 py-4 last:border-b-0">
                <strong className="font-heading text-4xl">{value}</strong>
                <span className="font-body text-sm text-[#d8cfc5]">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid content-start gap-5">
          {testimonials.map((testimonial) => (
            <Testimonial key={testimonial.quote} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="agendar" className="relative overflow-hidden bg-maison-ink py-20 text-maison-soft lg:py-24">
      <div className="absolute right-[16%] top-6 h-64 w-64 rounded-full bg-[#d8be8c22]" />
      <div className="relative mx-auto grid max-w-[1296px] gap-10 px-6 lg:grid-cols-[1fr_430px] lg:px-0">
        <div className="reveal">
          <Eyebrow inverse>Agenda reservada</Eyebrow>
          <h2 className="mt-5 max-w-[680px] font-heading text-[42px] font-semibold leading-none lg:text-[68px]">
            Sua proxima versao pode comecar com uma conversa.
          </h2>
          <p className="mt-7 max-w-[520px] font-body text-base leading-relaxed text-[#d8cfc5]">
            Envie seus dados e receba o direcionamento inicial pelo WhatsApp com horarios disponiveis.
          </p>
        </div>
        <form className="reveal rounded-[26px] border border-white/15 bg-white/10 p-5">
          {['Nome completo', 'WhatsApp', 'Interesse principal'].map((placeholder) => (
            <input
              key={placeholder}
              className="mb-3 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-4 font-body text-sm text-maison-soft outline-none placeholder:text-[#d8cfc5] focus:border-maison-champagne"
              placeholder={placeholder}
              type="text"
            />
          ))}
          <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-maison-soft px-6 py-4 font-body text-sm font-semibold text-maison-ink">
            Solicitar disponibilidade <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
      </div>
      <footer className="relative mx-auto mt-20 flex max-w-[1296px] flex-col gap-2 px-6 lg:px-0">
        <span className="font-heading text-3xl font-semibold">AUREA</span>
        <span className="font-body text-xs text-[#d8cfc5]">Sao Paulo | Atendimento boutique</span>
      </footer>
    </section>
  );
}

const pageStoragePrefix = 'landing:clinica-estetica';

export default function ClinicaEsteticaPage() {
  useScrollReveal();
  const [palette, setPalette] = useState<PaletteId>(() =>
    getStoredOption(
      `${pageStoragePrefix}:palette`,
      'classic',
      paletteOptions.map((option) => option.id),
    ),
  );
  const [headingFont, setHeadingFont] = useState<HeadingFontId>(() =>
    getStoredOption(
      `${pageStoragePrefix}:heading-font`,
      'playfair',
      headingFontOptions.map((option) => option.id),
    ),
  );
  const [bodyFont, setBodyFont] = useState<BodyFontId>(() =>
    getStoredOption(
      `${pageStoragePrefix}:body-font`,
      'geist',
      bodyFontOptions.map((option) => option.id),
    ),
  );
  useVisualTweaks(palette, headingFont, bodyFont);

  function handlePaletteChange(nextPalette: PaletteId) {
    setPalette(nextPalette);
    localStorage.setItem(`${pageStoragePrefix}:palette`, nextPalette);
  }

  function handleHeadingFontChange(nextFont: HeadingFontId) {
    setHeadingFont(nextFont);
    localStorage.setItem(`${pageStoragePrefix}:heading-font`, nextFont);
  }

  function handleBodyFontChange(nextFont: BodyFontId) {
    setBodyFont(nextFont);
    localStorage.setItem(`${pageStoragePrefix}:body-font`, nextFont);
  }

  return (
    <main>
      <TweaksPanel
        bodyFont={bodyFont}
        bodyFontOptions={bodyFontOptions}
        headingFont={headingFont}
        headingFontOptions={headingFontOptions}
        onBodyFontChange={handleBodyFontChange}
        onHeadingFontChange={handleHeadingFontChange}
        onPaletteChange={handlePaletteChange}
        palette={palette}
        paletteOptions={paletteOptions}
        variant="maison"
      />
      <Hero />
      <Results />
      <Procedures />
      <Specialist />
      <Experience />
      <SocialProof />
      <FinalCta />
      <a
        aria-label="Abrir WhatsApp"
        className="fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full bg-maison-ink text-maison-champagne shadow-glass"
        href="#agendar"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </main>
  );
}
