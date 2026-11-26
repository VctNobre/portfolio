import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Globe, Linkedin, MessageCircle } from 'lucide-react';
import { HERO_SPECIALTIES, PROFILE } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export function Hero({ onOpenResume }: HeroProps) {
  return (
    <section
      id="topo"
      style={{
        background: 'linear-gradient(135deg, #F5621C 0%, #E64F10 55%, #BC3807 100%)',
      }}
      className="relative flex min-h-[94svh] flex-col justify-between overflow-hidden pt-20 pb-8 text-[#0A0B0D]"
    >
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
            <h1 className="font-poster text-[22vw] font-black uppercase leading-[0.83] tracking-[-0.03em] text-[#0A0B0D] sm:text-[12rem] lg:text-[11rem] xl:text-[12.5rem]">
              <span className="block">VICENTE</span>
              <span className="block">NOBRE</span>
            </h1>

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
