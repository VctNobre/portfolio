import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, ProjectCategory, ProjectItem } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORIES: ('Todos' | ProjectCategory)[] = [
  'Todos',
  'Operações & Campo',
  'IA & Automação',
  'Web & Produtos',
];

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | ProjectCategory>('Todos');

  const filtered = useMemo(() => {
    if (selectedCategory === 'Todos') return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const featuredProjects = filtered.filter((p) => p.featured);
  const archiveProjects = filtered.filter((p) => !p.featured);

  return (
    <section id="projetos" className="bg-[#F3EFEA] py-20 text-[#0A0B0D] sm:py-28">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
        {/* Matteo-inspired Monumental Split Header */}
        <div className="flex flex-col gap-6 border-b border-[#0A0B0D]/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#B84A27]">
              01 / {String(filtered.length).padStart(2, '0')} · PORTFÓLIO
            </div>
            <h2 className="font-poster mt-2 text-5xl font-black uppercase leading-[0.88] tracking-tight text-[#0A0B0D] sm:text-7xl">
              PROJETOS SELECIONADOS
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-md border px-3.5 py-2 font-mono text-xs font-medium transition-colors ${
                    active
                      ? 'border-[#0A0B0D] bg-[#0A0B0D] text-[#F3EFEA]'
                      : 'border-[#0A0B0D]/20 bg-transparent text-[#4A4842] hover:border-[#0A0B0D] hover:text-[#0A0B0D]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Case Studies with Real Screenshots */}
        {featuredProjects.length > 0 && (
          <div className="divide-y divide-[#0A0B0D]/15">
            {featuredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onClick={() => onSelectProject(project)}
                className="group grid cursor-pointer grid-cols-1 items-center gap-8 py-12 lg:grid-cols-12 lg:gap-12"
              >
                <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#0A0B0D]/15 bg-[#E6E0D7] transition-all group-hover:border-[#F05A16]">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-poster text-5xl font-black text-[#0A0B0D]/20 transition-colors group-hover:text-[#F05A16]">
                      {project.index}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#5B5852]">
                      {project.category} · {project.year}
                    </span>
                  </div>

                  <h3 className="font-poster mt-2 text-3xl font-extrabold uppercase leading-[0.98] tracking-tight text-[#0A0B0D] transition-colors group-hover:text-[#D1480E] sm:text-5xl">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[#4A4842] sm:text-base">
                    {project.summary}
                  </p>

                  <ul className="mt-5 space-y-1.5 border-l-2 border-[#F05A16] pl-4 text-xs font-medium text-[#0A0B0D] sm:text-[13px]">
                    {project.impact.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="font-mono text-[11px] text-[#5B5852]">
                      {project.techStack.slice(0, 5).join(' · ')}
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-md border border-[#0A0B0D] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-[#0A0B0D] transition-colors group-hover:bg-[#0A0B0D] group-hover:text-[#F3EFEA]">
                      <span>Estudo de Caso</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Archive & Merge Labs Real Screenshot Index */}
        {archiveProjects.length > 0 && (
          <div className="mt-8 pt-6">
            <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-[#5B5852]">
              <span>Arquivo Técnico &amp; Ecossistema Merge Labs</span>
              <span>Clique para detalhes</span>
            </div>

            <div className="divide-y divide-[#0A0B0D]/15 border-y border-[#0A0B0D]/15">
              {archiveProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="group grid w-full grid-cols-1 items-center gap-4 py-4 text-left transition-colors hover:bg-[#E8E2D9] md:grid-cols-12 md:px-3"
                >
                  <div className="flex items-center gap-4 md:col-span-6">
                    <span className="font-poster w-7 shrink-0 text-2xl font-bold text-[#0A0B0D]/35 group-hover:text-[#F05A16]">
                      {project.index}
                    </span>
                    <div className="h-14 w-24 shrink-0 overflow-hidden rounded border border-[#0A0B0D]/15 bg-[#E6E0D7]">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-base font-bold text-[#0A0B0D] group-hover:text-[#D1480E]">
                        {project.title}
                      </div>
                      <div className="truncate text-xs text-[#5B5852]">{project.subtitle}</div>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[#5B5852] md:col-span-4">
                    {project.techStack.slice(0, 4).join(' · ')}
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs text-[#5B5852] md:col-span-2 md:justify-end md:gap-3">
                    <span>{project.year}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F05A16]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
