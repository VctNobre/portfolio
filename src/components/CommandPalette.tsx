import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { PROFILE, PROJECTS, ProjectItem } from '../data/portfolioData';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenResume: () => void;
  onCopyEmail: () => void;
}

interface PaletteAction {
  id: string;
  group: string;
  label: string;
  hint: string;
  run: () => void;
}

export function CommandPalette({
  open,
  onClose,
  onSelectProject,
  onOpenResume,
  onCopyEmail,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const actions = useMemo<PaletteAction[]>(() => {
    const projectActions: PaletteAction[] = PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      group: 'Projetos',
      label: `${p.index} · ${p.title}`,
      hint: p.category,
      run: () => {
        onSelectProject(p);
        onClose();
      },
    }));

    const quickActions: PaletteAction[] = [
      {
        id: 'open-resume',
        group: 'Currículo',
        label: 'Abrir Currículo (3 versões)',
        hint: 'PDF / Texto',
        run: () => {
          onClose();
          onOpenResume();
        },
      },
      {
        id: 'open-linkedin',
        group: 'Links',
        label: 'Abrir LinkedIn',
        hint: 'Perfil',
        run: () => {
          window.open(PROFILE.linkedinUrl, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'open-github',
        group: 'Links',
        label: 'Abrir GitHub (@VctNobre)',
        hint: 'Código',
        run: () => {
          window.open(PROFILE.githubUrl, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'open-mergelabs',
        group: 'Links',
        label: 'Abrir Merge Labs',
        hint: 'mergelabs.com.br',
        run: () => {
          window.open(PROFILE.mergelabsUrl, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'copy-email',
        group: 'Contato',
        label: `Copiar e-mail (${PROFILE.email})`,
        hint: 'Copiar',
        run: () => {
          onCopyEmail();
          onClose();
        },
      },
      {
        id: 'goto-lab',
        group: 'Seções',
        label: 'Ir para Como Trabalho & Laboratório',
        hint: '#laboratorio',
        run: () => {
          onClose();
          document.getElementById('laboratorio')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'goto-exp',
        group: 'Seções',
        label: 'Ir para Experiência Profissional',
        hint: '#trajetoria',
        run: () => {
          onClose();
          document.getElementById('trajetoria')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
    ];

    return [...quickActions, ...projectActions];
  }, [onClose, onCopyEmail, onOpenResume, onSelectProject]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q) ||
        a.hint.toLowerCase().includes(q)
    );
  }, [actions, query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-20 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Busca rápida"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-lg border border-white/15 bg-[#101216] text-[#F3EFEA] shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="h-4 w-4 text-[#F05A16]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar projeto, seção, LinkedIn ou currículo..."
            className="w-full bg-transparent text-sm placeholder:text-[#7A7770] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar busca"
            className="rounded p-1 text-[#7A7770] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 divide-y divide-white/5 overflow-y-auto p-1.5">
          {filtered.length === 0 ? (
            <div className="py-8 text-center font-mono text-xs text-[#7A7770]">
              Nenhum resultado para &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={action.run}
                className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-white/5"
              >
                <div>
                  <div className="text-sm font-medium">{action.label}</div>
                  <div className="font-mono text-[10px] text-[#7A7770]">{action.group}</div>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#9E9A92]">
                  {action.hint}
                  <ArrowRight className="h-3 w-3" />
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
