import { EXPERIENCES } from '../data/portfolioData';

export function ExperienceSection() {
  return (
    <section
      id="trajetoria"
      className="border-b border-[#0A0B0D]/15 bg-[#F3EFEA] py-20 text-[#0A0B0D] sm:py-28"
    >
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#B84A27]">
              03 / HISTÓRICO PROFISSIONAL
            </div>
            <h2 className="font-poster mt-2 text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl">
              EXPERIÊNCIA PROFISSIONAL
            </h2>
          </div>
          <span className="font-mono text-xs text-[#5B5852]">2019 — 2026 · RESULTADOS EM PRODUÇÃO</span>
        </div>

        <div className="divide-y divide-[#0A0B0D]/15 border-y border-[#0A0B0D]/15">
          {EXPERIENCES.map((exp) => (
            <article
              key={exp.id}
              className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-4">
                <div className="font-mono text-xs text-[#5B5852]">{exp.period}</div>
                <div className="font-poster mt-1 text-3xl font-extrabold uppercase tracking-tight text-[#0A0B0D]">
                  {exp.company}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#B84A27]">
                  {exp.area}
                </div>
              </div>

              <div className="md:col-span-8">
                <h3 className="text-xl font-bold text-[#0A0B0D]">{exp.role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4A4842]">{exp.summary}</p>
                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-[#0A0B0D] sm:text-[13.5px]">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F05A16]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
