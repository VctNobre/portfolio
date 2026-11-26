import { useEffect, useRef, useState } from 'react';
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';

interface ManifestoSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

interface WordToken {
  text: string;
  highlight?: boolean;
}

const LEAD_WORDS: WordToken[] = [
  { text: 'Gosto' },
  { text: 'de' },
  { text: 'entender' },
  { text: 'o' },
  { text: 'problema' },
  { text: 'no' },
  { text: 'chão', highlight: true },
  { text: 'de', highlight: true },
  { text: 'fábrica', highlight: true },
  { text: 'ou' },
  { text: 'no' },
  { text: 'campo', highlight: true },
  { text: 'e' },
  { text: 'resolver' },
  { text: 'com' },
  { text: 'software,', highlight: true },
  { text: 'automação', highlight: true },
  { text: 'e' },
  { text: 'dados.', highlight: true },
];

const BODY_WORDS: WordToken[] = [
  { text: 'Cada' },
  { text: 'sistema' },
  { text: 'aqui' },
  { text: 'nasceu' },
  { text: 'de' },
  { text: 'uma' },
  { text: 'necessidade' },
  { text: 'real:' },
  { text: 'eliminar' },
  { text: 'papel,' },
  { text: 'evitar' },
  { text: 'retrabalho' },
  { text: 'manual,' },
  { text: 'funcionar' },
  { text: 'mesmo' },
  { text: 'sem', highlight: true },
  { text: 'internet', highlight: true },
  { text: 'e' },
  { text: 'gerar' },
  { text: 'números' },
  { text: 'confiáveis' },
  { text: 'para' },
  { text: 'quem' },
  { text: 'decide.' },
];

interface ScrollWordProps {
  token: WordToken;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}

function ScrollWord({ token, index, total, progress, reducedMotion }: ScrollWordProps) {
  const start = 0.04 + (index / total) * 0.72;
  const end = Math.min(0.92, start + 0.12);

  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const blur = useTransform(progress, [start, end], ['blur(5px)', 'blur(0px)']);
  const y = useTransform(progress, [start, end], [6, 0]);

  if (reducedMotion) {
    return (
      <span
        className={`inline-block mr-[0.26em] ${
          token.highlight ? 'text-[#F05A16]' : 'text-[#F3EFEA]'
        }`}
      >
        {token.text}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity, filter: blur, y }}
      className={`inline-block mr-[0.26em] will-change-[opacity,filter,transform] ${
        token.highlight ? 'text-[#F05A16]' : 'text-[#F3EFEA]'
      }`}
    >
      {token.text}
    </motion.span>
  );
}

export function ManifestoSection({ onSelectProject }: ManifestoSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const featuredThumbs = PROJECTS.filter((p) => p.featured);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.78', 'end 0.92'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });

  const lineScaleY = useTransform(smoothProgress, [0, 1], [0.06, 1]);
  const cardParallaxY = useTransform(smoothProgress, [0, 1], [24, -24]);
  const stripX = useTransform(smoothProgress, [0, 1], [22, -22]);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const idx = Math.min(
      featuredThumbs.length - 1,
      Math.max(0, Math.floor(latest * featuredThumbs.length))
    );
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  useEffect(() => {
    if (reducedMotion) setActiveIndex(0);
  }, [reducedMotion]);

  const totalWords = LEAD_WORDS.length + BODY_WORDS.length;
  const activeProject = featuredThumbs[activeIndex] || featuredThumbs[0];

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative bg-[#080A0C] text-[#F3EFEA] lg:h-[185vh]"
    >
      <div className="mx-auto flex w-full max-w-[1380px] flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:sticky lg:top-0 lg:min-h-screen lg:py-24">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Label + Vertical Scroll Progress */}
          <div className="flex items-center justify-between lg:col-span-2 lg:flex-col lg:items-start lg:gap-6">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#F05A16]">
              SOBRE MIM
            </span>

            <div className="flex items-center gap-3 lg:flex-col lg:items-start">
              <div className="relative h-1 w-24 overflow-hidden rounded-full bg-white/10 lg:h-28 lg:w-[2px]">
                <motion.div
                  style={{
                    scaleX: reducedMotion ? 1 : lineScaleY,
                    scaleY: reducedMotion ? 1 : lineScaleY,
                  }}
                  className="h-full w-full origin-left bg-[#F05A16] lg:origin-top"
                />
              </div>
              <span className="font-mono text-[11px] text-[#7A7770]">
                0{activeIndex + 1} / 0{featuredThumbs.length}
              </span>
            </div>
          </div>

          {/* Center column: Word-by-word Blur/Opacity Reveal with balanced hierarchy */}
          <div className="lg:col-span-7">
            <h2 className="font-poster text-[2rem] font-extrabold uppercase leading-[0.98] tracking-tight sm:text-5xl lg:text-[3.35rem]">
              {LEAD_WORDS.map((token, idx) => (
                <ScrollWord
                  key={`lead-${idx}`}
                  token={token}
                  index={idx}
                  total={totalWords}
                  progress={smoothProgress}
                  reducedMotion={reducedMotion}
                />
              ))}
            </h2>

            <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed sm:text-xl lg:text-[1.45rem]">
              {BODY_WORDS.map((token, idx) => (
                <ScrollWord
                  key={`body-${idx}`}
                  token={token}
                  index={LEAD_WORDS.length + idx}
                  total={totalWords}
                  progress={smoothProgress}
                  reducedMotion={reducedMotion}
                />
              ))}
            </p>
          </div>

          {/* Right column: Scroll-synced Visual Preview Card with Parallax */}
          <motion.div
            style={{ y: reducedMotion ? 0 : cardParallaxY }}
            className="hidden lg:col-span-3 lg:block"
          >
            <button
              type="button"
              onClick={() => activeProject && onSelectProject(activeProject)}
              className="group w-full rounded-lg border border-white/10 bg-[#111317] p-3 text-left transition-colors hover:border-[#F05A16]"
            >
              <div className="mb-2.5 flex items-center justify-between font-mono text-[10px] text-[#9E9A92]">
                <span>EM FOCO · {activeProject.index}</span>
                <span className="text-[#F05A16]">{activeProject.year}</span>
              </div>
              <div className="aspect-[16/10] overflow-hidden rounded border border-white/10 bg-[#080A0C]">
                <motion.img
                  key={activeProject.id}
                  src={activeProject.image}
                  alt={activeProject.imageAlt}
                  initial={{ opacity: 0.4, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="truncate text-xs font-semibold text-[#F3EFEA] group-hover:text-[#F05A16]">
                  {activeProject.title.split('—')[0].trim()}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#9E9A92] group-hover:text-[#F05A16]" />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Bottom Horizontal Parallax Strip of Systems */}
        <div className="mt-12 border-t border-white/10 pt-7">
          <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-[#9E9A92]">
            <span>Sistemas em Produção</span>
            <span>Clique para abrir detalhes</span>
          </div>
          <motion.div
            style={{ x: reducedMotion ? 0 : stripX }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {featuredThumbs.map((project, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="group text-left transition-transform duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`aspect-[16/10] overflow-hidden rounded-md border bg-[#121418] transition-colors ${
                      isCurrent
                        ? 'border-[#F05A16]'
                        : 'border-white/10 group-hover:border-[#F05A16]'
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-[#9E9A92] group-hover:text-[#F3EFEA]">
                    <span className={`truncate ${isCurrent ? 'text-[#F3EFEA]' : ''}`}>
                      {project.title.split('—')[0].trim()}
                    </span>
                    <span className="text-[#F05A16]">{project.index}</span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
