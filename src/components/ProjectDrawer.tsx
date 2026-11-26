import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-project-title"
      onClick={onClose}
    >
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-2xl overflow-y-auto border-l border-[#DCD8CE] bg-[#F5F3EE] text-[#141413] shadow-2xl dark:border-[#2A2926] dark:bg-[#111110] dark:text-[#EAE6DF]"
      >
        <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-[#DCD8CE] bg-[#F5F3EE]/95 px-6 py-5 backdrop-blur-md dark:border-[#262522] dark:bg-[#111110]/95 sm:px-8">
          <div>
            <div className="font-mono text-xs text-[#B84A27] dark:text-[#E07A5F]">
              {project.index} · {project.category.toUpperCase()} · {project.year}
            </div>
            <h3
              id="drawer-project-title"
              className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl"
            >
              {project.title}
            </h3>
            <p className="mt-0.5 text-xs text-[#5B5852] dark:text-[#9D988E]">{project.role}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar estudo de caso"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#DCD8CE] text-[#141413] hover:border-[#141413] dark:border-[#2A2926] dark:text-[#EAE6DF] dark:hover:border-[#EAE6DF]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          {/* Main Real Project Screenshot */}
          <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#DCD8CE] bg-[#ECE9E2] dark:border-[#2A2926] dark:bg-[#171614]">
            <img
              src={project.image}
              alt={project.imageAlt}
              className="h-full w-full object-cover object-top"
            />
          </div>

          {/* Optional Project Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {project.gallery.map((item) => (
                <figure key={item.src} className="space-y-1">
                  <div className="aspect-[16/10] overflow-hidden rounded border border-[#DCD8CE] bg-[#ECE9E2] dark:border-[#2A2926] dark:bg-[#171614]">
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="font-mono text-[10px] text-[#5B5852] dark:text-[#9D988E]">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          <p className="text-base leading-relaxed text-[#141413] dark:text-[#EAE6DF]">
            {project.summary}
          </p>

          {/* 01 Challenge & Solution */}
          <div className="grid grid-cols-1 gap-6 border-y border-[#DCD8CE] py-6 dark:border-[#262522] sm:grid-cols-2">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#5B5852] dark:text-[#9D988E]">
                01 · Desafio
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#5B5852] dark:text-[#A5A096]">
                {project.challenge}
              </p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#B84A27] dark:text-[#E07A5F]">
                02 · Solução
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#5B5852] dark:text-[#A5A096]">
                {project.solution}
              </p>
            </div>
          </div>

          {/* 03 Architecture */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#5B5852] dark:text-[#9D988E]">
              03 · Arquitetura do Sistema
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {project.architectureSteps.map((step, i) => (
                <div
                  key={step.label}
                  className="rounded-md border border-[#DCD8CE] bg-white/70 p-3.5 dark:border-[#262522] dark:bg-[#181715]"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#5B5852] dark:text-[#9D988E]">
                    <span>0{i + 1}</span>
                    <span className="text-[#B84A27] dark:text-[#E07A5F]">{step.tag}</span>
                  </div>
                  <div className="mt-1 text-sm font-semibold">{step.label}</div>
                  <div className="text-xs text-[#5B5852] dark:text-[#9D988E]">{step.sublabel}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 04 Impact & Decisions */}
          <div className="space-y-4 border-t border-[#DCD8CE] pt-6 dark:border-[#262522]">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#5B5852] dark:text-[#9D988E]">
              04 · Resultados & Decisões Técnicas
            </div>
            <ul className="space-y-2 text-sm text-[#141413] dark:text-[#D4CFC7]">
              {[...project.impact, ...project.highlights].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B84A27] dark:bg-[#E07A5F]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 05 Stack & Links */}
          <div className="border-t border-[#DCD8CE] pt-6 dark:border-[#262522]">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#5B5852] dark:text-[#9D988E]">
              05 · Stack & Referências
            </div>
            <div className="mt-3 font-mono text-xs leading-relaxed text-[#141413] dark:text-[#EAE6DF]">
              {project.techStack.join(' · ')}
            </div>

            {project.links && project.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#141413] bg-[#141413] px-3.5 py-2 font-mono text-xs text-[#F5F3EE] transition-colors hover:border-[#B84A27] hover:bg-[#B84A27] dark:border-[#EAE6DF] dark:bg-[#EAE6DF] dark:text-[#111110]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
