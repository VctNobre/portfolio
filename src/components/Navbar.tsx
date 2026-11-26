import { useEffect, useState } from 'react';
import { ArrowUpRight, FileText, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

const OVERLAY_LINKS = [
  { index: '01', label: 'Projetos Selecionados', href: '#projetos' },
  { index: '02', label: 'Sobre Mim', href: '#manifesto' },
  { index: '03', label: 'Processo & Simulações', href: '#laboratorio' },
  { index: '04', label: 'Experiência & Base', href: '#trajetoria' },
  { index: '05', label: 'Contato', href: '#contato' },
];

function getLocalClockBR() {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Fortaleza',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date());
  } catch {
    return '';
  }
}

export function Navbar({ onOpenResume }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [localTime, setLocalTime] = useState(getLocalClockBR);

  useEffect(() => {
    const id = window.setInterval(() => setLocalTime(getLocalClockBR()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-[#080A0C]/85 text-[#F3EFEA] backdrop-blur-md'
            : 'bg-transparent text-[#0A0B0D]'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1380px] items-center justify-between px-5 sm:px-8">
          {/* Left: Favicon + Brand + Location */}
          <a href="#topo" className="flex items-center gap-3">
            <img src="/favicon.svg" alt="Logo VN" className="h-7 w-7 shrink-0 rounded-md" />
            <div className="leading-tight">
              <div className="text-[11px] font-medium opacity-75">Baseado em</div>
              <div className="text-xs font-semibold tracking-tight sm:text-[13px]">
                Vicente Nobre · {PROFILE.shortLocation}
              </div>
            </div>
          </a>

          {/* Center: Live Clock */}
          {localTime && (
            <div className="hidden text-center leading-tight md:block">
              <div className="text-[11px] opacity-75">Hora local</div>
              <div className="font-mono text-xs font-medium tracking-wider">{localTime}</div>
            </div>
          )}

          {/* Right: Currículo + Menu */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenResume}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                scrolled
                  ? 'border-white/25 bg-white/10 text-[#F3EFEA] hover:border-[#F05A16] hover:bg-[#F05A16]'
                  : 'border-[#0A0B0D]/30 bg-[#0A0B0D] text-[#F3EFEA] hover:bg-[#1B1D22]'
              }`}
            >
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span>Currículo</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu de navegação"
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                scrolled
                  ? 'border-white/25 text-[#F3EFEA] hover:border-white'
                  : 'border-white/20 bg-[#0A0B0D]/75 text-[#F3EFEA] backdrop-blur-xs hover:bg-[#0A0B0D]'
              }`}
            >
              <Menu className="h-3.5 w-3.5 shrink-0" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Overlay Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#080A0C] px-6 py-6 text-[#F3EFEA] sm:px-10 sm:py-8"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/favicon.svg" alt="Logo VN" className="h-7 w-7 rounded-md" />
              <span className="font-mono text-xs text-[#9E9A92]">
                {PROFILE.fullName} · {PROFILE.shortLocation}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3.5 py-2 font-mono text-xs hover:border-[#F05A16] hover:text-[#F05A16]"
            >
              <X className="h-4 w-4" />
              <span>Fechar</span>
            </button>
          </div>

          <nav className="mx-auto my-auto flex w-full max-w-[1380px] flex-col divide-y divide-white/10">
            {OVERLAY_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline justify-between py-4 transition-colors sm:py-5"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-xs text-[#F05A16]">{item.index}</span>
                  <span className="font-poster text-4xl uppercase tracking-tight transition-transform group-hover:translate-x-2 group-hover:text-[#F05A16] sm:text-6xl">
                    {item.label}
                  </span>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[#7A7770] transition-colors group-hover:text-[#F05A16]" />
              </a>
            ))}
          </nav>

          <div className="mx-auto flex w-full max-w-[1380px] flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 font-mono text-xs text-[#9E9A92]">
            <div className="flex flex-wrap gap-5">
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F05A16]"
              >
                LinkedIn ↗
              </a>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F05A16]"
              >
                GitHub ↗
              </a>
              <a
                href={PROFILE.mergelabsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F05A16]"
              >
                Merge Labs ↗
              </a>
              <a
                href={PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F05A16]"
              >
                WhatsApp ↗
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenResume();
              }}
              className="text-[#F3EFEA] underline underline-offset-4 hover:text-[#F05A16]"
            >
              Abrir Currículo (3 versões)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
