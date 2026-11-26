import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROFILE } from '../data/portfolioData';

interface ContactFooterProps {
  onCopyEmail: () => void;
  emailCopied: boolean;
  onOpenResume: () => void;
}

export function ContactFooter({
  onCopyEmail,
  emailCopied,
  onOpenResume,
}: ContactFooterProps) {
  return (
    <footer id="contato" className="bg-[#080A0C] pt-20 pb-8 text-[#F3EFEA] sm:pt-28">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#F05A16]">
              05 / CONTATO DIRETO
            </div>
            <h2 className="font-poster mt-3 text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl">
              VAMOS CONVERSAR.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#9E9A92]">
              Disponível para entrevistas técnicas, projetos de automação, dados, IA aplicada e
              engenharia de software.
            </p>
            <div className="mt-7">
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 rounded-md bg-[#F05A16] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wide text-[#0A0B0D] transition-colors hover:bg-[#ff6d2b]"
              >
                <span>Ver Currículo (3 versões)</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10 lg:col-span-6">
            <div className="flex items-center justify-between py-4">
              <div>
                <div className="font-mono text-[11px] text-[#9E9A92]">E-MAIL</div>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="mt-0.5 block text-sm font-medium text-[#F3EFEA] hover:text-[#F05A16]"
                >
                  {PROFILE.email}
                </a>
              </div>
              <button
                type="button"
                onClick={onCopyEmail}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 font-mono text-xs text-[#F3EFEA] hover:border-[#F05A16] hover:text-[#F05A16]"
              >
                {emailCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            <a
              href={PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4"
            >
              <div>
                <div className="font-mono text-[11px] text-[#9E9A92]">WHATSAPP</div>
                <div className="mt-0.5 text-sm font-medium group-hover:text-[#F05A16]">
                  {PROFILE.phoneDisplay}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#9E9A92] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F05A16]" />
            </a>

            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4"
            >
              <div>
                <div className="font-mono text-[11px] text-[#9E9A92]">LINKEDIN</div>
                <div className="mt-0.5 text-sm font-medium group-hover:text-[#F05A16]">
                  {PROFILE.linkedinHandle}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#9E9A92] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F05A16]" />
            </a>

            <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-4 sm:pr-4"
              >
                <div>
                  <div className="font-mono text-[11px] text-[#9E9A92]">GITHUB</div>
                  <div className="mt-0.5 text-sm font-medium group-hover:text-[#F05A16]">
                    @VctNobre
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#9E9A92] group-hover:text-[#F05A16]" />
              </a>

              <a
                href={PROFILE.mergelabsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-4 sm:pl-4"
              >
                <div>
                  <div className="font-mono text-[11px] text-[#9E9A92]">ESTÚDIO</div>
                  <div className="mt-0.5 text-sm font-medium group-hover:text-[#F05A16]">
                    {PROFILE.mergelabsHandle}
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#9E9A92] group-hover:text-[#F05A16]" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-5 font-mono text-xs text-[#9E9A92] sm:flex-row sm:items-center">
          <span>
            © 2026 {PROFILE.fullName} · {PROFILE.shortLocation}
          </span>
          <a href="#topo" className="hover:text-[#F05A16]">
            Voltar ao topo ↑
          </a>
        </div>

        {/* Monumental Matteo-style Footer Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden pt-2 text-center select-none"
          aria-hidden="true"
        >
          <div className="font-poster text-[18vw] font-black uppercase leading-[0.8] tracking-[-0.03em] text-white/10 sm:text-[15vw]">
            VICENTE NOBRE
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
