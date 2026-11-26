import { CERTIFICATIONS, EDUCATION, PROFILE, SKILL_ROWS } from '../data/portfolioData';

export function AboutAndSkills() {
  return (
    <section
      id="sobre"
      className="bg-[#F3EFEA] py-20 text-[#0A0B0D] sm:py-28"
    >
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#B84A27]">
                04 / COMPETÊNCIAS &amp; BASE ACADÊMICA
              </div>
              <h2 className="font-poster mt-2 text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-6xl">
                ENGENHARIA + CÓDIGO
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#4A4842] sm:text-[15px]">
                <p>
                  Dupla graduação pela <strong>UFERSA</strong> (Ciência &amp; Tecnologia e Engenharia
                  de Produção) aliada a seis anos de prática entre robótica, desenvolvimento
                  full-stack, automação industrial e análise de dados.
                </p>
              </div>

              {/* Education */}
              <div className="mt-8 border-t border-[#0A0B0D]/15 pt-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#5B5852]">
                  Formação Acadêmica
                </div>
                <div className="mt-4 space-y-4">
                  {EDUCATION.map((edu) => (
                    <div key={edu.degree} className="flex items-baseline justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-[#0A0B0D]">{edu.degree}</div>
                        <div className="text-xs text-[#5B5852]">{edu.institution}</div>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-[#5B5852]">
                        {edu.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications + Language */}
              <div className="mt-8 border-t border-[#0A0B0D]/15 pt-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#5B5852]">
                  Certificações &amp; Idioma
                </div>
                <div className="mt-3 space-y-2 text-xs text-[#4A4842]">
                  {CERTIFICATIONS.map((cert) => (
                    <div key={cert.title} className="flex items-center justify-between">
                      <span>
                        <strong className="font-semibold text-[#0A0B0D]">{cert.title}</strong> ·{' '}
                        {cert.issuer}
                      </span>
                      <span className="font-mono">{cert.year}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-1">
                    <span>
                      <strong className="font-semibold text-[#0A0B0D]">Idioma</strong>
                    </span>
                    <span className="font-mono">{PROFILE.language}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#0A0B0D]/15 border-y border-[#0A0B0D]/15 lg:col-span-7">
            {SKILL_ROWS.map((group) => (
              <div key={group.index} className="py-7 first:pt-6 last:pb-6">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#B84A27]">{group.index}</span>
                    <h3 className="font-poster text-2xl font-extrabold uppercase tracking-tight text-[#0A0B0D]">
                      {group.title}
                    </h3>
                  </div>
                  <span className="text-xs text-[#5B5852]">{group.subtitle}</span>
                </div>

                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-[#0A0B0D]"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F05A16]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
