import { useEffect, useState } from 'react';
import { Check, Copy, Printer, X } from 'lucide-react';
import {
  CERTIFICATIONS,
  EDUCATION,
  PROFILE,
  RESUME_VARIANTS,
  ResumeTrackId,
} from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

const TRACK_ORDER: ResumeTrackId[] = ['complete', 'software', 'engineering'];

function buildPlainTextATS(track: ResumeTrackId): string {
  const v = RESUME_VARIANTS[track];
  const lines: string[] = [
    PROFILE.fullName.toUpperCase(),
    v.roleTitle,
    `${PROFILE.location} | Tel: ${PROFILE.phoneDisplay} | E-mail: ${PROFILE.email}`,
    `LinkedIn: ${PROFILE.linkedinUrl} | GitHub: ${PROFILE.githubUrl} | Portfolio: ${PROFILE.portfolioUrl}`,
    '',
    'RESUMO PROFISSIONAL',
    v.summary,
    '',
    'COMPETENCIAS TECNICAS',
    ...v.skillPillars.map((p) => `- ${p.label}: ${p.skills}`),
    '',
    'EXPERIENCIA PROFISSIONAL',
  ];

  for (const exp of v.experiences) {
    lines.push(`${exp.role} | ${exp.company} | ${exp.period}`);
    for (const b of exp.bullets) {
      lines.push(`- ${b}`);
    }
    lines.push('');
  }

  lines.push('PROJETOS EM PRODUCAO');
  for (const p of v.featuredProjects) {
    lines.push(`- ${p.name}: ${p.description}`);
  }
  lines.push('');
  lines.push('FORMACAO ACADEMICA');
  for (const e of EDUCATION) {
    lines.push(`- ${e.degree} — ${e.institution} (${e.period})`);
  }
  lines.push('');
  lines.push('CERTIFICACOES E IDIOMAS');
  for (const c of CERTIFICATIONS) {
    lines.push(`- ${c.title} — ${c.issuer} (${c.year})`);
  }
  lines.push(`- Idioma: ${PROFILE.language}`);

  return lines.join('\n');
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  const [track, setTrack] = useState<ResumeTrackId>('complete');
  const [copiedATS, setCopiedATS] = useState(false);

  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  if (!open) return null;

  const variant = RESUME_VARIANTS[track];

  const handlePrint = () => {
    document.body.classList.add('printing-resume');
    window.setTimeout(() => {
      window.print();
      window.setTimeout(() => {
        document.body.classList.remove('printing-resume');
      }, 300);
    }, 60);
  };

  const handleCopyPlainATS = () => {
    const text = buildPlainTextATS(track);
    navigator.clipboard?.writeText(text);
    setCopiedATS(true);
    window.setTimeout(() => setCopiedATS(false), 2200);
  };

  return (
    <div
      id="resume-print-root"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 p-3 backdrop-blur-xs sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Currículo"
      onClick={onClose}
    >
      <div className="mx-auto max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {/* Toolbar (hidden on print) */}
        <div
          id="resume-print-controls"
          className="mb-4 rounded-lg border border-white/15 bg-[#101216] p-4 text-[#F3EFEA] shadow-xl"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              {TRACK_ORDER.map((id) => {
                const active = track === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTrack(id)}
                    className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                      active
                        ? 'bg-[#F05A16] font-semibold text-[#0A0B0D]'
                        : 'bg-[#1A1D23] text-[#D4CFC7] hover:bg-[#242830]'
                    }`}
                  >
                    {RESUME_VARIANTS[id].label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyPlainATS}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-3 py-2 font-mono text-xs text-[#F3EFEA] hover:border-[#F05A16]"
              >
                {copiedATS ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Texto Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar Texto</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-md bg-[#F3EFEA] px-3.5 py-2 text-xs font-semibold text-[#0A0B0D] hover:bg-white"
              >
                <Printer className="h-4 w-4" />
                <span>Imprimir / Salvar PDF</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar currículo"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-[#D4CFC7] hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Strictly Single-Column ATS-Friendly A4 Resume */}
        <article
          id="resume-sheet"
          className="rounded-lg border border-slate-200 bg-white p-7 font-sans text-[#111111] shadow-2xl sm:p-11"
        >
          {/* ATS Linear Header */}
          <header className="border-b-2 border-[#111111] pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-[#111111] sm:text-[26px]">
              {PROFILE.fullName.toUpperCase()}
            </h1>
            <p className="mt-1 text-sm font-semibold text-[#222222]">{variant.roleTitle}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#333333]">
              {PROFILE.location} | Telefone/WhatsApp:{' '}
              <a
                href={PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-slate-400 underline-offset-2 hover:text-[#B84A27]"
              >
                {PROFILE.phoneDisplay}
              </a>{' '}
              | E-mail:{' '}
              <a
                href={`mailto:${PROFILE.email}`}
                className="underline decoration-slate-400 underline-offset-2 hover:text-[#B84A27]"
              >
                {PROFILE.email}
              </a>
              <br />
              LinkedIn:{' '}
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-slate-400 underline-offset-2 hover:text-[#B84A27]"
              >
                {PROFILE.linkedinHandle}
              </a>{' '}
              | GitHub:{' '}
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-slate-400 underline-offset-2 hover:text-[#B84A27]"
              >
                {PROFILE.githubHandle}
              </a>{' '}
              | Portfólio:{' '}
              <a
                href={PROFILE.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-slate-400 underline-offset-2 hover:text-[#B84A27]"
              >
                {PROFILE.portfolioHandle}
              </a>
            </p>
          </header>

          {/* 1. Resumo Profissional */}
          <section className="ats-block mt-5">
            <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-[#111111]">
              RESUMO PROFISSIONAL
            </h2>
            <p className="mt-2 text-[12.5px] leading-relaxed text-[#222222]">{variant.summary}</p>
          </section>

          {/* 2. Competências Técnicas */}
          <section className="ats-block mt-5">
            <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-[#111111]">
              COMPETÊNCIAS TÉCNICAS
            </h2>
            <ul className="mt-2 space-y-1.5 text-[12.5px] leading-snug text-[#222222]">
              {variant.skillPillars.map((pillar) => (
                <li key={pillar.label}>
                  <strong className="text-[#111111]">{pillar.label}:</strong> {pillar.skills}
                </li>
              ))}
            </ul>
          </section>

          {/* 3. Experiência Profissional */}
          <section className="mt-5">
            <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-[#111111]">
              EXPERIÊNCIA PROFISSIONAL
            </h2>
            <div className="mt-3 space-y-4">
              {variant.experiences.map((exp) => (
                <div key={`${exp.role}-${exp.company}`} className="ats-block">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[13px] font-bold text-[#111111]">
                      {exp.role} — {exp.company}
                    </h3>
                    <span className="text-xs font-medium text-[#444444]">{exp.period}</span>
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-[12px] leading-relaxed text-[#222222]">
                    {exp.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Projetos em Produção */}
          <section className="ats-block mt-5">
            <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-[#111111]">
              PROJETOS RELEVANTES EM PRODUÇÃO
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] leading-relaxed text-[#222222]">
              {variant.featuredProjects.map((proj) => (
                <li key={proj.name}>
                  <strong className="text-[#111111]">
                    {proj.url ? (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-slate-400 underline-offset-2 hover:text-[#B84A27]"
                      >
                        {proj.name}
                      </a>
                    ) : (
                      proj.name
                    )}
                    :
                  </strong>{' '}
                  {proj.description}
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Formação Acadêmica */}
          <section className="ats-block mt-5">
            <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-[#111111]">
              FORMAÇÃO ACADÊMICA
            </h2>
            <ul className="mt-2 space-y-1.5 text-[12.5px] text-[#222222]">
              {EDUCATION.map((edu) => (
                <li key={edu.degree} className="flex flex-wrap justify-between gap-2">
                  <span>
                    <strong className="text-[#111111]">{edu.degree}</strong> — {edu.institution}
                  </span>
                  <span className="text-xs text-[#444444]">{edu.period}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. Certificações e Idiomas */}
          <section className="ats-block mt-5">
            <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-[#111111]">
              CERTIFICAÇÕES E IDIOMAS
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] text-[#222222]">
              {CERTIFICATIONS.map((c) => (
                <li key={c.title}>
                  <strong className="text-[#111111]">{c.title}</strong> — {c.issuer} ({c.year})
                </li>
              ))}
              <li>
                <strong className="text-[#111111]">Idioma:</strong> {PROFILE.language}
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
