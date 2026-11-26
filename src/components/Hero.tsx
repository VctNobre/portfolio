import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Globe, Linkedin, MessageCircle } from 'lucide-react';
import { HERO_SPECIALTIES, PROFILE } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

const POSTER_TITLE_CLASS =
  'font-poster text-[22vw] font-black uppercase leading-[0.83] tracking-[-0.03em] sm:text-[12rem] lg:text-[11rem] xl:text-[12.5rem]';

export function Hero({ onOpenResume }: HeroProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const smokeStateRef = useRef({
    active: false,
    targetX: -300,
    targetY: -300,
    x: -300,
    y: -300,
    trailX: -300,
    trailY: -300,
    alpha: 0,
    rafId: 0,
  });

  useEffect(() => {
    const state = smokeStateRef.current;
    return () => {
      if (state.rafId) {
        window.cancelAnimationFrame(state.rafId);
      }
    };
  }, []);

  const applySmokeVars = (x: number, y: number, tx: number, ty: number, alpha: number) => {
    const el = titleRef.current;
    if (!el) return;
    el.style.setProperty('--mx', `${x.toFixed(1)}px`);
    el.style.setProperty('--my', `${y.toFixed(1)}px`);
    el.style.setProperty('--tx', `${tx.toFixed(1)}px`);
    el.style.setProperty('--ty', `${ty.toFixed(1)}px`);
    el.style.setProperty('--smoke-alpha', alpha.toFixed(3));
  };

  const stepSmoke = () => {
    const state = smokeStateRef.current;
    state.x += (state.targetX - state.x) * 0.24;
    state.y += (state.targetY - state.y) * 0.24;
    state.trailX += (state.targetX - state.trailX) * 0.09;
    state.trailY += (state.targetY - state.trailY) * 0.09;

    const targetAlpha = state.active ? 1 : 0;
    state.alpha += (targetAlpha - state.alpha) * (state.active ? 0.16 : 0.08);

    applySmokeVars(state.x, state.y, state.trailX, state.trailY, state.alpha);

    const settledPos =
      Math.abs(state.targetX - state.x) < 0.2 &&
      Math.abs(state.targetY - state.y) < 0.2 &&
      Math.abs(state.targetX - state.trailX) < 0.2 &&
      Math.abs(state.targetY - state.trailY) < 0.2;

    if (!state.active && state.alpha < 0.005) {
      state.alpha = 0;
      applySmokeVars(state.x, state.y, state.trailX, state.trailY, 0);
      state.rafId = 0;
      return;
    }

    if (state.active && settledPos && Math.abs(1 - state.alpha) < 0.005) {
      state.alpha = 1;
      applySmokeVars(state.x, state.y, state.trailX, state.trailY, 1);
      state.rafId = 0;
      return;
    }

    state.rafId = window.requestAnimationFrame(stepSmoke);
  };

  const ensureRaf = () => {
    const state = smokeStateRef.current;
    if (!state.rafId) {
      state.rafId = window.requestAnimationFrame(stepSmoke);
    }
  };

  const handleTitlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const el = titleRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const state = smokeStateRef.current;

    if (!state.active) {
      state.x = relX;
      state.y = relY;
      state.trailX = relX;
      state.trailY = relY;
    }
    state.active = true;
    state.targetX = relX;
    state.targetY = relY;

    if (reducedMotion) {
      state.x = relX;
      state.y = relY;
      state.trailX = relX;
      state.trailY = relY;
      state.alpha = 1;
      applySmokeVars(relX, relY, relX, relY, 1);
      return;
    }

    ensureRaf();
  };

  const handleTitlePointerLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const state = smokeStateRef.current;
    state.active = false;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      state.alpha = 0;
      applySmokeVars(state.x, state.y, state.trailX, state.trailY, 0);
      return;
    }

    ensureRaf();
  };

  return (
    <section
      id="topo"
      style={{
        background: 'linear-gradient(135deg, #F5621C 0%, #E64F10 55%, #BC3807 100%)',
      }}
      className="relative flex min-h-[94svh] flex-col justify-between overflow-hidden pt-20 pb-8 text-[#0A0B0D]"
    >
      {/* Hidden SVG filters for organic white smoke displacement */}
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
        <defs>
          <filter id="hero-smoke-plume" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.03"
              numOctaves="4"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="28"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="4" />
          </filter>
          <filter id="hero-smoke-core" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03 0.04"
              numOctaves="3"
              seed="11"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="11"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="1.2" />
          </filter>
        </defs>
      </svg>

      <div aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 opacity-70" />

      {/* Integrated Editorial Portrait on Right — 100% unobstructed */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        <img
          src="/images/vicente.jpg"
          alt="Vicente Nobre"
          className="h-full w-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #E85212 0%, rgba(232, 82, 18, 0.45) 24%, rgba(232, 82, 18, 0.04) 58%, rgba(10, 11, 13, 0.18) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background: 'linear-gradient(0deg, #BA3807 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Main Poster Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1380px] flex-1 flex-col justify-between px-5 sm:px-8">
        <div className="my-auto grid grid-cols-1 items-center gap-8 py-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            <div
              ref={titleRef}
              onPointerEnter={handleTitlePointerMove}
              onPointerMove={handleTitlePointerMove}
              onPointerLeave={handleTitlePointerLeave}
              className="relative inline-block w-fit cursor-default"
            >
              <h1 className={`${POSTER_TITLE_CLASS} text-[#0A0B0D]`}>
                <span className="block">VICENTE</span>
                <span className="block">NOBRE</span>
              </h1>

              {/* Overlay 1: Wispy white smoke plume displaced around cursor */}
              <div
                aria-hidden="true"
                className={`${POSTER_TITLE_CLASS} pointer-events-none select-none absolute inset-0 text-white`}
                style={{
                  filter: 'url(#hero-smoke-plume)',
                  opacity: 'calc(var(--smoke-alpha, 0) * 0.92)',
                  transform: 'translateY(-3px)',
                  maskImage:
                    'radial-gradient(155px circle at var(--mx, -300px) var(--my, -300px), rgba(255,255,255,1) 0%, rgba(255,255,255,0.58) 42%, rgba(255,255,255,0) 76%), radial-gradient(190px circle at var(--tx, -300px) var(--ty, -300px), rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.18) 46%, rgba(255,255,255,0) 78%)',
                  WebkitMaskImage:
                    'radial-gradient(155px circle at var(--mx, -300px) var(--my, -300px), rgba(255,255,255,1) 0%, rgba(255,255,255,0.58) 42%, rgba(255,255,255,0) 76%), radial-gradient(190px circle at var(--tx, -300px) var(--ty, -300px), rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.18) 46%, rgba(255,255,255,0) 78%)',
                }}
              >
                <span className="block">VICENTE</span>
                <span className="block">NOBRE</span>
              </div>

              {/* Overlay 2: Bright white smoke core inside letters */}
              <div
                aria-hidden="true"
                className={`${POSTER_TITLE_CLASS} pointer-events-none select-none absolute inset-0 text-[#FFFDF9]`}
                style={{
                  filter: 'url(#hero-smoke-core)',
                  opacity: 'var(--smoke-alpha, 0)',
                  maskImage:
                    'radial-gradient(110px circle at var(--mx, -300px) var(--my, -300px), rgba(255,255,255,1) 0%, rgba(255,255,255,0.72) 45%, rgba(255,255,255,0) 78%)',
                  WebkitMaskImage:
                    'radial-gradient(110px circle at var(--mx, -300px) var(--my, -300px), rgba(255,255,255,1) 0%, rgba(255,255,255,0.72) 45%, rgba(255,255,255,0) 78%)',
                }}
              >
                <span className="block">VICENTE</span>
                <span className="block">NOBRE</span>
              </div>

              {/* Overlay 3: Delicate white vapor mist right around cursor */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6"
                style={{
                  mixBlendMode: 'screen',
                  filter: 'url(#hero-smoke-plume)',
                  opacity: 'calc(var(--smoke-alpha, 0) * 0.65)',
                  background:
                    'radial-gradient(115px circle at calc(var(--mx, -300px) + 24px) calc(var(--my, -300px) + 24px), rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.16) 44%, rgba(255,255,255,0) 72%)',
                }}
              />
            </div>

            <p className="mt-6 max-w-lg text-sm leading-relaxed font-semibold text-[#0A0B0D]/90 sm:text-base">
              Engenheiro de Produção (UFERSA) e Desenvolvedor Full-Stack. Construo sistemas em
              produção que ligam a operação em campo ao escritório — de aplicativos offline-first e
              automações RPA até visão computacional e análise de custos.
            </p>

            {/* Specialties inline cleanly on left — nothing over portrait */}
            <p className="mt-4 max-w-lg font-mono text-xs font-medium text-[#0A0B0D]/75">
              {HERO_SPECIALTIES.join(' · ')}
            </p>
          </motion.div>

          {/* Mobile portrait */}
          <div className="mx-auto w-full max-w-[330px] overflow-hidden rounded-lg border border-[#0A0B0D]/20 bg-[#0A0B0D]/10 lg:hidden">
            <img
              src="/images/vicente.jpg"
              alt="Vicente Nobre"
              className="aspect-[4/4.6] w-full object-cover object-top"
            />
          </div>
        </div>

        {/* Bottom Action Row */}
        <div className="flex flex-col justify-between gap-5 border-t border-[#0A0B0D]/20 pt-5 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { href: PROFILE.linkedinUrl, label: 'LinkedIn', icon: Linkedin },
              { href: PROFILE.githubUrl, label: 'GitHub', icon: Github },
              { href: PROFILE.mergelabsUrl, label: 'Merge Labs', icon: Globe },
              { href: PROFILE.whatsappUrl, label: 'WhatsApp', icon: MessageCircle },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0A0B0D] text-[#F3EFEA] transition-transform hover:-translate-y-0.5 hover:bg-[#1E2024]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
            <button
              type="button"
              onClick={onOpenResume}
              className="ml-2 font-mono text-xs font-semibold text-[#0A0B0D] underline underline-offset-4 hover:opacity-75"
            >
              Currículo (3 versões)
            </button>
          </div>

          <a
            href="#projetos"
            className="group inline-flex w-fit items-center gap-3 rounded-md bg-[#0A0B0D] px-4 py-2 font-poster text-xl font-bold uppercase tracking-wide text-[#F3EFEA] transition-all hover:bg-[#1A1C21]"
          >
            <span>EXPLORAR PROJETOS</span>
            <span className="flex h-7 w-7 items-center justify-center rounded bg-[#F05A16] text-[#0A0B0D] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
