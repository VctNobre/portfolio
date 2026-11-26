export type ResumeTrackId = 'complete' | 'software' | 'engineering';

export type ProjectCategory =
  | 'Operações & Campo'
  | 'IA & Automação'
  | 'Web & Produtos';

export interface ArchitectureStep {
  label: string;
  sublabel: string;
  tag: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectGalleryItem {
  src: string;
  caption: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  featured: boolean;
  year: string;
  role: string;
  image: string;
  imageAlt: string;
  gallery?: ProjectGalleryItem[];
  summary: string;
  challenge: string;
  solution: string;
  impact: string[];
  architectureSteps: ArchitectureStep[];
  highlights: string[];
  techStack: string[];
  links?: ProjectLink[];
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface SkillRow {
  index: string;
  title: string;
  subtitle: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  area: string;
  summary: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  note: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}

export interface ResumeExperienceEntry {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ResumeVariant {
  id: ResumeTrackId;
  label: string;
  atsTargetKeywords: string[];
  roleTitle: string;
  summary: string;
  skillPillars: { label: string; skills: string }[];
  experiences: ResumeExperienceEntry[];
  featuredProjects: { name: string; description: string }[];
}

export const PROFILE = {
  name: 'Vicente Nobre',
  fullName: 'Vicente Antonio da Silva Nobre',
  location: 'Mossoró, RN — Brasil',
  shortLocation: 'Mossoró, Brasil',
  email: 'vicente_nobre@hotmail.com',
  phoneDisplay: '(84) 98878-3686',
  whatsappUrl:
    'https://wa.me/5584988783686?text=Ol%C3%A1%20Vicente!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.',
  linkedinUrl: 'https://www.linkedin.com/in/vicente-nobre-94a777222/',
  linkedinHandle: 'linkedin.com/in/vicente-nobre-94a777222',
  githubUrl: 'https://github.com/VctNobre',
  githubHandle: 'github.com/VctNobre',
  portfolioUrl: 'https://vicentenobre.com.br',
  portfolioHandle: 'vicentenobre.com.br',
  mergelabsUrl: 'https://mergelabs.com.br',
  mergelabsHandle: 'mergelabs.com.br',
  language: 'Inglês Intermediário (Leitura Técnica e Documentação)',
};

export const HERO_SPECIALTIES = [
  'Engenharia de Software',
  'Inteligência Artificial',
  'Automação RPA & OCR',
  'Dados & Eng. de Produção',
  'Apps Offline-First',
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'DIAGNÓSTICO DE CAMPO',
    description:
      'Mapeio o processo físico real, identifico gargalos, retrabalho e pontos de perda de dado antes de escrever a primeira linha de código.',
  },
  {
    index: '02',
    title: 'ARQUITETURA & DADOS',
    description:
      'Modelo banco relacional em PostgreSQL, fluxos de estados, controle de permissões (RBAC) e operação offline-first para ambientes sem sinal.',
  },
  {
    index: '03',
    title: 'ENGENHARIA & IA',
    description:
      'Construo interfaces rápidas, robôs RPA com OCR, pipelines em Python com Visão Computacional (OpenCV) e modelos de IA integrados ao fluxo.',
  },
  {
    index: '04',
    title: 'OPERAÇÃO & KPIs',
    description:
      'Entrego em produção com conferência cruzada (0.00 divergência), painéis de custo por unidade e acompanhamento contínuo de performance.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'mflow',
    index: '01',
    title: 'MFlow — Plataforma Operacional & Agente RPA',
    subtitle: 'Fluxo digital completo de campo, estoque e lançamento automático em ERP',
    category: 'Operações & Campo',
    featured: true,
    year: '2026',
    role: 'Arquiteto & Desenvolvedor Full-Stack',
    image: '/images/projects/mflow.jpg',
    imageAlt: 'Painel de Controle do MFlow Web com módulos de Plantio, SSM, Packing House, Irrigação e Centro de Custos',
    summary:
      'Sistema web e mobile-first que substitui ordens físicas por um fluxo auditável entre campo, almoxarifado e contabilidade, integrado a um robô RPA com OCR que executa baixas diretamente no Mega ERP.',
    challenge:
      'Operações distribuídas em múltiplas unidades sofriam com retrabalho de digitação entre campo e escritório, risco de divergência de dosagens e gargalos para lançar ordens manualmente no ERP legado.',
    solution:
      'Construí uma máquina de estados com 8 perfis RBAC, rateio dinâmico por poços e parcelas, gestão de substitutos de insumos, módulo Packing House, custos e um agente autônomo em Playwright + Sharp + Tesseract.js (OCR).',
    impact: [
      '8 perfis RBAC cobrindo desde solicitação técnica até auditoria contábil final',
      'Agente RPA autônomo com OCR operando telas do Mega ERP sem intervenção manual',
    ],
    architectureSteps: [
      { label: 'Solicitação', sublabel: 'Poços, parcelas e rateio', tag: 'MFlow Web' },
      { label: 'Execução', sublabel: 'Horímetro e área real', tag: 'MF Track' },
      { label: 'Auditoria', sublabel: 'OS e conferência contábil', tag: 'PostgreSQL' },
      { label: 'Lançamento', sublabel: 'Playwright + OCR', tag: 'Agente ERP' },
    ],
    highlights: [
      'Preservação de filtros na URL e carrossel consolidado por Poço, Solicitação ou Bloco',
      'Regras de calendário de entrega e controle de excedentes por parcela',
      'Módulo estruturado de custos operacionais (0054_create_cost_management_module.sql)',
    ],
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'Playwright',
      'Tesseract.js',
      'Sharp',
      'Zod',
    ],
  },
  {
    id: 'mftrack',
    index: '02',
    title: 'MF Track — Apontamento de Frota Offline-First',
    subtitle: 'PWA + App Android em produção (Play Store v1.5.9) para cabines de campo',
    category: 'Operações & Campo',
    featured: true,
    year: '2025 – 2026',
    role: 'Criador & Desenvolvedor Mobile',
    image: '/images/projects/mftrack.jpg',
    imageAlt: 'Aplicativo MF Track exibido na tela de celular com interface de campo offline-first',
    summary:
      'Aplicativo embarcado em tablets e celulares dentro da cabine de tratores em movimento, garantindo registro preciso de operações, paradas e horímetros mesmo em zonas sem internet.',
    challenge:
      'Operadores em movimento precisam de uma interface à prova de vibração, sem barras de rolagem, que não perca dados sem sinal e exporte no padrão contábil do ERP.',
    solution:
      'Desenvolvi um PWA empacotado com Capacitor Android (24+ builds na Google Play Store) usando IndexedDB via Dexie.js, layout landscape full-fit travado, teclado numérico grande com resposta háptica e sync engine resiliente com PostgreSQL.',
    impact: [
      '24+ versões publicadas na Google Play Store com auto-migração de conexões',
      'Zero perda de apontamentos em campo via persistência local IndexedDB (Dexie.js)',
    ],
    architectureSteps: [
      { label: 'Cabine', sublabel: 'UI Landscape Full-Fit', tag: 'Capacitor / PWA' },
      { label: 'Banco Local', sublabel: 'Operação offline segura', tag: 'Dexie IndexedDB' },
      { label: 'Sincronia', sublabel: 'Fila e diagnósticos', tag: 'Service Worker' },
      { label: 'Nuvem & ERP', sublabel: 'Dashboard + XLSX', tag: 'PostgreSQL' },
    ],
    highlights: [
      'Fluxo dedicado de paradas (manutenção, abastecimento, refeição) e alertas de deslocamento',
      'Integração inteligente com ordens do MFlow via placeholder de frota',
    ],
    techStack: ['JavaScript', 'Capacitor Android', 'Dexie.js', 'PostgreSQL', 'PWA', 'Vite', 'XLSX'],
  },
  {
    id: 'digital-twin',
    index: '03',
    title: 'Harvest Digital Twin — Simulador 3D',
    subtitle: 'Gêmeo digital em Three.js modelando cadeia física, filas e gargalos',
    category: 'IA & Automação',
    featured: true,
    year: '2026',
    role: 'Engenheiro de Simulação & Desenvolvedor 3D',
    image: '/images/projects/digital-twin.jpg',
    imageAlt: 'Cena 3D em Three.js e painel de métricas do Harvest Digital Twin',
    summary:
      'Simulador 3D interativo em Three.js + TypeScript que representa o fluxo sequencial real de uma operação de colheita para medir o impacto de efetivo, distância e formação de filas antes da alocação em campo.',
    challenge:
      'Dimensionar equipes por intuição oculta ociosidade entre etapas acopladas e reduz o rendimento diário quando a distância até o ponto de carga varia.',
    solution:
      'Modelei um motor discreto em TypeScript acoplado a uma cena 3D em Three.js simulando 5 estágios sequenciais, tempos de transferência, capacidade de carga e utilização por função.',
    impact: [
      'Identificação imediata do estágio gargalo conforme distância e tamanho da equipe',
      'Separação modular entre núcleo de simulação (sim/), renderização 3D (visual/) e UI',
    ],
    architectureSteps: [
      { label: 'Parâmetros', sublabel: 'Efetivo e distância', tag: 'Config' },
      { label: 'Motor Discreto', sublabel: 'Filas e transferências', tag: 'TypeScript' },
      { label: 'Cena 3D', sublabel: 'Agentes e carga', tag: 'Three.js' },
      { label: 'Diagnóstico', sublabel: 'Vazão e gargalo', tag: 'KPIs' },
    ],
    highlights: [
      'Arquitetura extensível para linhas de produção, pátios e logística operacional',
    ],
    techStack: ['Three.js', 'TypeScript', 'Vite', 'Simulação Discreta', 'Engenharia de Processos'],
  },
  {
    id: 'ai-video-factory',
    index: '04',
    title: 'AI Video Factory — Visão Computacional & IA',
    subtitle: 'Pipeline Python com OpenCV, Whisper local, IA semântica, NVENC e aprendizado contínuo',
    category: 'IA & Automação',
    featured: true,
    year: '2026',
    role: 'Engenheiro de IA & Visão Computacional',
    image: '/images/projects/ai-video-factory.jpg',
    imageAlt: 'Interface de visão computacional com rastreamento facial OpenCV e linha do tempo de corte',
    summary:
      'Pipeline autônomo de análise e edição audiovisual em Python que combina rastreamento facial suavizado em OpenCV (face_tracker.py), transcrição local sem custo, análise semântica com Modelos de IA (LLMs), render GPU (NVENC) e calibração contínua em SQLite.',
    challenge:
      'Automatizar detecção de trechos críticos e enquadramento dinâmico em vídeos longos mantendo custo mínimo de inferência e melhoria progressiva de acurácia.',
    solution:
      'Integrei faster-whisper local para timestamps palavra-por-palavra, compactação de contexto para IA, crop inteligente via OpenCV e um banco SQLite (factory.db) que reinjeta aprendizados de pós-mortem nos prompts seguintes.',
    impact: [
      'Rastreamento espacial suave em OpenCV com renderização acelerada por GPU (NVENC)',
      'Loop fechado de aprendizado em SQLite recalibrando automaticamente os prompts da IA',
    ],
    architectureSteps: [
      { label: 'Transcrição', sublabel: 'Word-level local', tag: 'faster-whisper' },
      { label: 'Análise por IA', sublabel: 'Contexto compactado', tag: 'IA / LLM' },
      { label: 'Visão OpenCV', sublabel: 'face_tracker.py', tag: 'OpenCV' },
      { label: 'Render & Loop', sublabel: 'FFmpeg NVENC + DB', tag: 'SQLite' },
    ],
    highlights: [
      'Pipeline transferível para análise automatizada de vídeos, monitoramento visual e inspeção por câmera',
    ],
    techStack: ['Python 3.12', 'OpenCV', 'Inteligência Artificial (LLMs)', 'faster-whisper', 'FFmpeg NVENC', 'SQLite'],
  },
  {
    id: 'automation-suite',
    index: '05',
    title: 'Suíte de Automação Industrial, RPA & Custos',
    subtitle: 'Robôs Playwright (STMF), apps Python (.exe), PCP e custos R$/ha',
    category: 'IA & Automação',
    featured: false,
    year: '2025 – 2026',
    role: 'Engenheiro de Automação & Dados',
    image: '/images/projects/automation-suite.jpg',
    imageAlt: 'Dashboard executivo de análise de custos por unidade produtiva e automação ERP',
    summary:
      'Conjunto de automações em produção: Controle de Horas Extras (0.00 divergência), Robô STMF em Playwright, Fechamento de Bonificação com PDF, Banco de Absenteísmo, Importador PCP e Modelagem de Custos integrada ao Mega ERP.',
    challenge:
      'Fechamentos mensais, conferências de ponto e apuração de custos por unidade produtiva exigiam dias de trabalho manual em planilhas sujeitas a erro humano.',
    solution:
      'Construí executáveis autônomos em Python (PyInstaller) com interface desktop, robôs Playwright e scripts de consolidação com validação cruzada automática e backup prévio.',
    impact: [
      '0.00 divergência na auditoria cruzada entre cartão de ponto e folha de horas extras',
      'Modelagem completa de custos (Insumos, MDO e Maquinário) em R$/ha a partir do Mega ERP',
    ],
    architectureSteps: [
      { label: 'Coleta', sublabel: 'STMF Web + Mega ERP', tag: 'Playwright / XLS' },
      { label: 'Validação', sublabel: 'Regras e desduplicação', tag: 'Python / Node' },
      { label: 'Consolidação', sublabel: 'Custos, HE e faltas', tag: 'OpenPyXL / SQL' },
      { label: 'Saída', sublabel: 'Executáveis .exe e PDF', tag: 'PyInstaller / BI' },
    ],
    highlights: [
      'Ferramentas com operação em 1 clique para times administrativos e de campo',
    ],
    techStack: ['Python', 'Playwright', 'OpenPyXL', 'PyInstaller', 'Node.js', 'SQL', 'Power BI', 'N8N'],
  },
  {
    id: 'missao1k',
    index: '06',
    title: 'Plataforma Missão 1K — LMS Full-Stack',
    subtitle: 'Plataforma comercial de videoaulas e correção de redações',
    category: 'Web & Produtos',
    featured: false,
    year: '2025',
    role: 'Desenvolvedor Full-Stack',
    image: '/images/projects/missao1k.jpg',
    imageAlt: 'Visual da Plataforma Missão 1K de videoaulas e correção de redações',
    summary:
      'Sistema educacional em produção com videoaulas, gestão de créditos, marcações em redações e feedback em áudio, construído com backend NestJS + Prisma + PostgreSQL em Docker.',
    challenge:
      'Orquestrar múltiplos papéis de acesso, controle transacional de créditos e interface fluida de correção assíncrona.',
    solution:
      'API modular em NestJS + Prisma ORM containerizada com Docker e frontend React responsivo.',
    impact: [
      'Plataforma comercial ativa em produção (plataforma.missao1k.com.br)',
      'Arquitetura desacoplada pronta para escala com PostgreSQL e Docker',
    ],
    architectureSteps: [
      { label: 'Frontend', sublabel: 'Portal e player', tag: 'React / TS' },
      { label: 'API REST', sublabel: 'Regras e créditos', tag: 'NestJS' },
      { label: 'Dados', sublabel: 'Schema versionado', tag: 'Prisma / PG' },
      { label: 'Infra', sublabel: 'Containers isolados', tag: 'Docker' },
    ],
    highlights: ['Controle transacional de créditos e entrega de áudio por correção'],
    techStack: ['NestJS', 'React', 'TypeScript', 'PostgreSQL', 'Prisma', 'Docker'],
    links: [{ label: 'plataforma.missao1k.com.br', url: 'https://plataforma.missao1k.com.br' }],
  },
  {
    id: 'mergelabs',
    index: '07',
    title: 'Merge Labs & Produtos Digitais',
    subtitle: 'Estúdio co-fundado · GovTech, e-commerces, portais e finanças',
    category: 'Web & Produtos',
    featured: false,
    year: '2024 – Atual',
    role: 'Co-fundador & Engenheiro de Software',
    image: '/images/projects/mergelabs.jpg',
    imageAlt: 'Site oficial do estúdio Merge Labs (mergelabs.com.br)',
    gallery: [
      { src: '/images/projects/ilovecasamento.jpg', caption: 'Ilovecasamento' },
      { src: '/images/projects/garrafeiraimperial.jpg', caption: 'Garrafeira Imperial' },
      { src: '/images/projects/ocamera.jpg', caption: 'Portal Ocamera' },
    ],
    summary:
      'Estúdio digital co-fundado (mergelabs.com.br) com projetos em produção como Ilovecasamento, Garrafeira Imperial, Ocamera, além de sistemas internos como Arcanjo Motos, EventOS e Financeiro App (leitura de PDF/QR Code e Playwright).',
    challenge:
      'Entregar produtos sob medida para segmentos distintos com rapidez, identidade visual própria e confiabilidade em produção.',
    solution:
      'Padronização em React 19, Next.js 16, TypeScript, Tailwind CSS e Prisma para levar sistemas do conceito ao domínio publicado.',
    impact: [
      'Múltiplos produtos comerciais ativos e indexados em produção',
      'Arquitetura GovTech com ouvidoria IA via WhatsApp e zeladoria georreferenciada',
    ],
    architectureSteps: [
      { label: 'Descoberta', sublabel: 'Escopo e interface', tag: 'Figma / UX' },
      { label: 'Aplicação', sublabel: 'SSR e interatividade', tag: 'Next.js / React' },
      { label: 'Persistência', sublabel: 'Auth e banco', tag: 'Prisma / SQL' },
      { label: 'Produção', sublabel: 'Domínio e SEO', tag: 'Live' },
    ],
    highlights: ['Da concepção de produto à publicação em domínio próprio'],
    techStack: ['React 19', 'Next.js 16', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    links: [
      { label: 'mergelabs.com.br', url: 'https://mergelabs.com.br' },
      { label: 'ilovecasamento.com.br', url: 'https://www.ilovecasamento.com.br' },
      { label: 'garrafeiraimperial.com', url: 'https://garrafeiraimperial.com' },
      { label: 'ocamera.com.br', url: 'https://ocamera.com.br' },
    ],
  },
  {
    id: 'cidadao-conectado',
    index: '08',
    title: 'Cidadão Conectado — Mobile Georreferenciado',
    subtitle: 'Registro em campo com GPS, câmera nativa, mapas e Firebase',
    category: 'Operações & Campo',
    featured: false,
    year: '2025',
    role: 'Desenvolvedor Mobile React Native',
    image: '/images/projects/cidadao-conectado.jpg',
    imageAlt: 'Mockup do aplicativo Cidadão Conectado com mapa urbano e pinos georreferenciados',
    summary:
      'Aplicativo mobile em React Native / Expo para captura de evidências fotográficas em campo com coordenadas GPS, mapa interativo e sincronização em tempo real no Firebase.',
    challenge:
      'Permitir registro rápido de ocorrências com localização exata e evidência visual em dispositivos móveis.',
    solution:
      'Integração de Expo Camera, Expo Location, React Native Maps e Firebase.',
    impact: ['Fluxo completo de captura georreferenciada e visualização em mapa'],
    architectureSteps: [
      { label: 'Captura', sublabel: 'Câmera + GPS', tag: 'Expo' },
      { label: 'Mapa', sublabel: 'Plotagem espacial', tag: 'RN Maps' },
      { label: 'Nuvem', sublabel: 'Sync e alertas', tag: 'Firebase' },
    ],
    highlights: ['Base reutilizável para inspeção visual de ativos em campo'],
    techStack: ['React Native', 'Expo', 'TypeScript', 'React Native Maps', 'Firebase'],
  },
];

export const SKILL_ROWS: SkillRow[] = [
  {
    index: '01',
    title: 'Engenharia de Software',
    subtitle: 'Aplicações web, APIs e bancos relacionais',
    items: [
      'TypeScript & JavaScript (ES2022)',
      'React 19 & Next.js 16',
      'Node.js & NestJS',
      'PostgreSQL & Prisma ORM',
      'Docker, Git & GitHub',
      'Zod & TanStack Table',
    ],
  },
  {
    index: '02',
    title: 'IA, Visão Computacional & RPA',
    subtitle: 'Automação inteligente e processamento visual',
    items: [
      'Python & OpenCV (Tracking)',
      'FFmpeg GPU (NVENC)',
      'Modelos de IA (LLMs) & faster-whisper',
      'Playwright RPA & PyInstaller (.exe)',
      'Tesseract.js (OCR) & Sharp',
      'N8N Workflows',
    ],
  },
  {
    index: '03',
    title: 'Engenharia de Produção & Dados',
    subtitle: 'Eficiência operacional, custos e decisão',
    items: [
      'Planejamento e Controle (PCP)',
      'Modelagem de Custos & ERP Mega',
      'Power BI & SQL Analítico',
      'Excel Avançado & Auditoria',
      'Mapeamento de Processos & POPs',
      'Simulação 3D (Three.js)',
    ],
  },
  {
    index: '04',
    title: 'Campo, Mobile & Robótica',
    subtitle: 'Tecnologia no ambiente físico e baixa conectividade',
    items: [
      'PWA Offline-First & Service Workers',
      'IndexedDB (Dexie.js)',
      'Capacitor Android & React Native (Expo)',
      'UX Industrial para Cabine / Campo',
      'Robótica Aplicada (UFERSA / Petrobras)',
      'Testes Automatizados (Cucumber / QA)',
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'mata-fresca',
    role: 'Analista de Dados, Automação & Sistemas Operacionais',
    company: 'Mata Fresca LTDA',
    period: 'Abr/2026 — Atual',
    area: 'Operações, ERP & Software',
    summary:
      'Atuação estratégica na ponte entre operação de campo, ERP Mega e engenharia de software, desenvolvendo plataformas próprias, agentes RPA com OCR, painéis de custos e simulação 3D.',
    highlights: [
      'Arquitetura e entrega do MFlow (Next.js, TypeScript, PostgreSQL, 8 perfis RBAC) digitalizando o ciclo de ordens, estoque, poços, parcelas, Packing House e custos',
      'Desenvolvimento e publicação do MF Track na Google Play Store (24+ builds, PWA/Capacitor Android offline-first com IndexedDB) embarcado em cabines de tratores',
      'Criação de agentes RPA autônomos com OCR (Playwright, Sharp, Tesseract.js e Python) integrados ao ERP Mega e STMF, atingindo 0.00 de divergência em auditorias de horas extras e bonificações',
      'Modelagem de custos operacionais por hectare (R$/ha) e desenvolvimento do Harvest Digital Twin 3D (Three.js) para dimensionamento de equipes e análise de gargalos',
    ],
  },
  {
    id: 'pequeno-principe',
    role: 'Analista de Processos e Dados',
    company: 'Pequeno Príncipe',
    period: '2026',
    area: 'Processos & Dados',
    summary:
      'Planejamento operacional, padronização de fluxos e construção de rotinas automatizadas para tratamento e análise gerencial de grandes volumes de dados.',
    highlights: [
      'Mapeamento e padronização de processos operacionais com foco em redução de retrabalho e controle de prazos',
      'Desenvolvimento de rotinas automatizadas em Excel para coleta, limpeza, validação e consolidação de bases operacionais',
      'Estruturação de KPIs de produtividade e suporte analítico direto à tomada de decisão gerencial',
    ],
  },
  {
    id: 'mergelabs-exp',
    role: 'Co-fundador & Engenheiro de Software Full-Stack',
    company: 'Merge Labs / Projetos Sob Demanda',
    period: '2024 — Atual',
    area: 'Software, Dados & IA',
    summary:
      'Co-fundação do estúdio de tecnologia Merge Labs (mergelabs.com.br) com entrega ponta a ponta de plataformas web comerciais, APIs escaláveis, automações e soluções com Inteligência Artificial.',
    highlights: [
      'Desenvolvimento e publicação de plataformas reais: Plataforma Missão 1K (NestJS, Prisma, PostgreSQL, Docker), Ilovecasamento, Garrafeira Imperial, Ocamera e sistemas financeiros/comerciais',
      'Construção do pipeline AI Video Factory em Python integrando Visão Computacional (OpenCV), transcrição local (Whisper), modelos de IA (LLMs), GPU (FFmpeg NVENC) e calibração em SQLite',
      'Desenvolvimento de aplicativo mobile georreferenciado em React Native / Expo (GPS, câmera e mapas) e orquestração de workflows com N8N e integrações REST',
    ],
  },
  {
    id: 'mater-christi',
    role: 'Coordenador de Projetos & Professor de Robótica',
    company: 'Colégio Mater Christi',
    period: '2022 — 2025',
    area: 'Robótica & Gestão de Projetos',
    summary:
      'Coordenação técnica e operacional de projetos educacionais de tecnologia e robótica, unindo gestão de cronogramas, KPIs, POPs e formação em lógica computacional.',
    highlights: [
      'Planejamento e controle de cronogramas operacionais, assegurando cumprimento de prazos, entregas e metas',
      'Implantação de Procedimentos Operacionais Padrão (POPs) e monitoramento de indicadores de desempenho (KPIs) para correção rápida de desvios',
      'Ensino prático de robótica, algoritmos e pensamento computacional aplicado à resolução de problemas reais',
    ],
  },
  {
    id: 'ufersa-petrobras',
    role: 'Mentor de Robótica (Projetos Robot em Ação & PENSARE)',
    company: 'UFERSA / Petrobras',
    period: '2019 — 2022',
    area: 'Robótica & Extensão Tecnológica',
    summary:
      'Mentoria técnica em robótica aplicada e lógica de programação em programas de extensão universitária da UFERSA em parceria com a Petrobras.',
    highlights: [
      'Condução de oficinas e projetos práticos de robótica, lógica computacional e automação básica',
      'Organização de atividades técnicas em equipe com foco em pensamento analítico, prototipagem e resolução estruturada de desafios',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Bacharel em Engenharia de Produção',
    institution: 'UFERSA — Universidade Federal Rural do Semi-Árido',
    period: '2021 — 2025',
    note: 'Ênfase em PCP, gestão de processos, análise de custos, otimização e tomada de decisão orientada a dados.',
  },
  {
    degree: 'Bacharel em Ciência e Tecnologia',
    institution: 'UFERSA — Universidade Federal Rural do Semi-Árido',
    period: '2018 — 2021',
    note: 'Base quantitativa em matemática, física, computação, modelagem e fundamentos de engenharia.',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  { title: 'Inteligência Artificial', issuer: 'DIO', year: '2025' },
  { title: 'Certificação em SQL', issuer: 'DataCamp', year: '2025' },
  { title: 'Cloud Services', issuer: 'Instituto de Pesquisas Eldorado', year: '2023' },
];

export const RESUME_VARIANTS: Record<ResumeTrackId, ResumeVariant> = {
  complete: {
    id: 'complete',
    label: 'Híbrido (Engenharia + Dev + IA)',
    atsTargetKeywords: [
      'Engenharia de Produção',
      'Full-Stack',
      'Inteligência Artificial',
      'Visão Computacional',
      'RPA & OCR',
      'PostgreSQL',
      'Dados & KPIs',
    ],
    roleTitle:
      'Engenheiro de Produção | Desenvolvedor Full-Stack | Automação (RPA), Dados & Inteligência Artificial',
    summary:
      'Engenheiro de Produção (UFERSA) e Desenvolvedor Full-Stack com experiência comprovada na entrega de sistemas críticos em produção, automação de processos industriais e aplicações de Inteligência Artificial e Visão Computacional. Sólida atuação conectando operação de campo e sistemas corporativos (ERP Mega): desenvolvimento de plataformas web (Next.js, NestJS, TypeScript, PostgreSQL), aplicativos mobile offline-first (Capacitor Android / Play Store), robôs RPA com OCR (Playwright, Python, Tesseract), pipelines de Visão Computacional (OpenCV, FFmpeg GPU) e gêmeos digitais 3D (Three.js).',
    skillPillars: [
      {
        label: 'Desenvolvimento Full-Stack & Mobile',
        skills:
          'TypeScript, JavaScript, React, Next.js, Node.js, NestJS, REST APIs, PostgreSQL, Prisma ORM, Docker, PWA Offline-First, IndexedDB (Dexie.js), Capacitor Android, React Native (Expo)',
      },
      {
        label: 'Inteligência Artificial, Visão Computacional & RPA',
        skills:
          'Python, OpenCV (Tracking Facial e Espacial), Inteligência Artificial (LLMs), Transcrição Local (faster-whisper), FFmpeg GPU (NVENC), Playwright RPA, Tesseract.js (OCR), N8N, PyInstaller',
      },
      {
        label: 'Engenharia de Produção, Dados & ERP',
        skills:
          'Planejamento e Controle da Produção (PCP), Gestão de Custos (R$/ha), KPIs Operacionais, ERP Mega, SQL Avançado, Power BI, Excel Avançado, POPs, Simulação 3D (Three.js)',
      },
      {
        label: 'Qualidade, Base Técnica & Idiomas',
        skills:
          'Git, GitHub, Testes Automatizados (Cucumber/QA), Robótica Aplicada (UFERSA/Petrobras), Inglês Intermediário (leitura técnica)',
      },
    ],
    experiences: [
      {
        role: 'Analista de Dados, Automação & Sistemas Operacionais',
        company: 'Mata Fresca LTDA — Mossoró, RN',
        period: 'Abr/2026 – Atual',
        bullets: [
          'Arquitetei e implementei o sistema MFlow (Next.js, TypeScript, PostgreSQL, 8 perfis RBAC), eliminando ordens em papel e garantindo rastreabilidade completa de insumos, poços, parcelas, estoque e auditoria contábil.',
          'Desenvolvi e publiquei o aplicativo MF Track (PWA + Capacitor Android na Google Play Store, 24+ versões) com banco local IndexedDB offline-first para apontamento de frota em zonas sem conectividade.',
          'Criei agentes RPA autônomos com OCR (Playwright, Sharp, Tesseract.js e Python) integrados ao ERP Mega e ao sistema STMF, zerando divergências (0.00) em fechamentos de horas extras, absenteísmo e bonificações.',
          'Estruturei a modelagem de custos operacionais (insumos, mão de obra e maquinário por hectare) e desenvolvi simulador Digital Twin 3D (Three.js) para identificação de gargalos e dimensionamento de equipes.',
        ],
      },
      {
        role: 'Analista de Processos e Dados',
        company: 'Pequeno Príncipe',
        period: '2026',
        bullets: [
          'Mapeei e padronizei processos operacionais críticos, reduzindo retrabalho manual e aumentando a confiabilidade dos prazos.',
          'Desenvolvi rotinas automatizadas em Excel para extração, tratamento e consolidação de grandes volumes de dados e KPIs gerenciais.',
        ],
      },
      {
        role: 'Co-fundador & Desenvolvedor Full-Stack',
        company: 'Merge Labs / Consultoria Independente',
        period: '2024 – Atual',
        bullets: [
          'Entreguei plataformas web e APIs comerciais em produção (Missão 1K com NestJS/PostgreSQL/Docker, Ilovecasamento, Garrafeira Imperial, Ocamera e sistemas financeiros com leitura de PDF/QR Code).',
          'Desenvolvi o AI Video Factory em Python combinando Visão Computacional (OpenCV), transcrição local (Whisper), modelos de IA (LLMs), renderização GPU e banco SQLite com aprendizado contínuo.',
        ],
      },
      {
        role: 'Coordenador de Projetos & Professor de Robótica',
        company: 'Colégio Mater Christi',
        period: '2022 – 2025',
        bullets: [
          'Gerenciei cronogramas operacionais, KPIs e implantação de Procedimentos Operacionais Padrão (POPs) para projetos tecnológicos.',
          'Liderança de ensino em robótica aplicada, algoritmos e resolução estruturada de problemas.',
        ],
      },
      {
        role: 'Mentor de Robótica (Projetos Robot em Ação & PENSARE)',
        company: 'UFERSA / Petrobras',
        period: '2019 – 2022',
        bullets: [
          'Atuei na mentoria de lógica computacional, automação básica e robótica em projetos de extensão da UFERSA em parceria com a Petrobras.',
        ],
      },
    ],
    featuredProjects: [
      {
        name: 'MFlow + Agente RPA Mega ERP',
        description:
          'Plataforma operacional multiperfil (Next.js/PostgreSQL) integrada a robô Playwright + OCR para baixas automáticas em ERP.',
      },
      {
        name: 'MF Track (Google Play Store v1.5.9)',
        description:
          'Aplicativo Android/PWA offline-first com IndexedDB embarcado em frotas de campo sem conectividade.',
      },
      {
        name: 'AI Video Factory (Python + OpenCV + IA)',
        description:
          'Pipeline de Visão Computacional com rastreamento facial, Whisper local, modelos de IA e aceleração GPU (NVENC).',
      },
      {
        name: 'Harvest Digital Twin 3D (Three.js)',
        description:
          'Gêmeo digital interativo em TypeScript para simulação de capacidade, filas e gargalos operacionais.',
      },
    ],
  },
  software: {
    id: 'software',
    label: 'Desenvolvedor Full-Stack & IA',
    atsTargetKeywords: [
      'TypeScript',
      'React / Next.js',
      'Node.js / NestJS',
      'PostgreSQL',
      'Python & OpenCV',
      'Inteligência Artificial',
      'RPA & Offline-First',
    ],
    roleTitle: 'Desenvolvedor Full-Stack | TypeScript • React • Next.js • Node.js • Python & IA',
    summary:
      'Desenvolvedor Full-Stack com formação em Engenharia de Produção e Ciência & Tecnologia (UFERSA). Experiência sólida na construção de aplicações web e mobile em produção (TypeScript, React, Next.js, Node.js, NestJS, PostgreSQL, Prisma, Docker), arquitetura offline-first para dispositivos móveis (PWA, IndexedDB, Capacitor Android, React Native), automação RPA com OCR (Playwright, Tesseract.js) e pipelines de Inteligência Artificial e Visão Computacional em Python (OpenCV, Whisper, LLMs).',
    skillPillars: [
      {
        label: 'Front-end & Mobile',
        skills:
          'TypeScript, JavaScript (ES2022), React 19, Next.js 16, Tailwind CSS, Three.js, PWA, Service Workers, IndexedDB (Dexie.js), Capacitor Android, React Native (Expo)',
      },
      {
        label: 'Back-end, APIs & Bancos de Dados',
        skills:
          'Node.js, NestJS, REST APIs, PostgreSQL, Prisma ORM, SQL, SQLite, Autenticação JWT, RBAC, Zod, Docker',
      },
      {
        label: 'Inteligência Artificial, Visão Computacional & Automação',
        skills:
          'Python, OpenCV, Inteligência Artificial (LLMs), faster-whisper, FFmpeg (NVENC), Playwright, Tesseract.js (OCR), Sharp, N8N, PyInstaller',
      },
      {
        label: 'Engenharia de Software, QA & Idiomas',
        skills:
          'Git, GitHub, Testes Automatizados (Cucumber/Ruby), Clean Architecture, Inglês Intermediário',
      },
    ],
    experiences: [
      {
        role: 'Desenvolvedor Full-Stack & Engenheiro de Automação',
        company: 'Mata Fresca LTDA — Mossoró, RN',
        period: 'Abr/2026 – Atual',
        bullets: [
          'Arquitetei e desenvolvi o MFlow Web (Next.js 16, React 19, TypeScript, PostgreSQL) com controle de acesso RBAC (8 perfis), máquina de estados auditável, Zod e TanStack Table.',
          'Publiquei e mantive o aplicativo MF Track na Google Play Store (24+ releases, Capacitor Android + PWA) com persistência offline-first em IndexedDB (Dexie.js) e sincronização resiliente.',
          'Implementei agente RPA autônomo em Node.js/TypeScript (Playwright + Sharp + Tesseract.js OCR) e robôs em Python para integração automatizada com ERP Mega e portais web externos.',
          'Construí o simulador 3D Harvest Digital Twin em Three.js + TypeScript separando motor físico de simulação da camada visual.',
        ],
      },
      {
        role: 'Co-fundador & Desenvolvedor Full-Stack',
        company: 'Merge Labs / Freelancer',
        period: '2024 – Atual',
        bullets: [
          'Desenvolvi a Plataforma Missão 1K em produção com backend NestJS + Prisma + PostgreSQL containerizado em Docker e frontend React para videoaulas e correção de redações.',
          'Entreguei sistemas web e financeiros completos (Ilovecasamento, Garrafeira Imperial, Ocamera, Arcanjo Motos, Financeiro App com parsing de PDF/QR Code e automação Playwright).',
          'Desenvolvi o pipeline AI Video Factory em Python (OpenCV tracking facial, transcrição local faster-whisper, modelos de IA e FFmpeg NVENC) e aplicativo georreferenciado em React Native / Expo.',
        ],
      },
      {
        role: 'Analista de Processos e Dados (Automação)',
        company: 'Pequeno Príncipe',
        period: '2026',
        bullets: [
          'Automatizei rotinas de coleta, tratamento e validação de grandes volumes de dados operacionais, reduzindo erros manuais.',
        ],
      },
      {
        role: 'Coordenador de Projetos & Professor de Robótica',
        company: 'Colégio Mater Christi',
        period: '2022 – 2025',
        bullets: [
          'Ensino de algoritmos, lógica computacional e robótica, além de gestão de cronogramas e padronização de entregas tecnológicas.',
        ],
      },
      {
        role: 'Mentor de Robótica (Projetos Robot em Ação & PENSARE)',
        company: 'UFERSA / Petrobras',
        period: '2019 – 2022',
        bullets: [
          'Mentoria técnica em lógica de programação, algoritmos e robótica em projetos de extensão universitária em parceria com a Petrobras.',
        ],
      },
    ],
    featuredProjects: [
      {
        name: 'MFlow Web & Agente RPA com OCR',
        description:
          'Next.js 16, TypeScript, PostgreSQL e agente Playwright + Tesseract.js em produção.',
      },
      {
        name: 'MF Track (Google Play Store v1.5.9)',
        description:
          'App Android/PWA offline-first com Dexie.js (IndexedDB) e sincronização em nuvem.',
      },
      {
        name: 'AI Video Factory (Python + OpenCV + IA)',
        description:
          'Rastreamento facial OpenCV, faster-whisper local, modelos de IA, NVENC e SQLite.',
      },
      {
        name: 'Plataforma Missão 1K & Merge Labs',
        description:
          'LMS em NestJS + Prisma + PostgreSQL + Docker e produtos web em produção.',
      },
    ],
  },
  engineering: {
    id: 'engineering',
    label: 'Engenheiro de Produção & Dados',
    atsTargetKeywords: [
      'Engenharia de Produção',
      'PCP',
      'Gestão de Custos',
      'KPIs & Power BI',
      'SQL & Excel',
      'ERP Mega',
      'Melhoria Contínua & POPs',
    ],
    roleTitle: 'Engenheiro de Produção | PCP • Análise de Dados • Custos & Automação de Processos',
    summary:
      'Engenheiro de Produção e Bacharel em Ciência & Tecnologia (UFERSA) com experiência em Planejamento e Controle da Produção (PCP), modelagem de custos operacionais, monitoramento de KPIs e automação de processos industriais e de campo. Domínio avançado de Excel, Power BI, SQL, ERP Mega, padronização via POPs, automações em Python/RPA e simulação de gargalos operacionais (Digital Twin 3D), com foco em eficiência e tomada de decisão em operações industriais e de Energia/Óleo & Gás.',
    skillPillars: [
      {
        label: 'Planejamento, Controle & Melhoria Contínua',
        skills:
          'PCP, Planejamento e Controle de Cronogramas, Mapeamento de Processos, Procedimentos Operacionais Padrão (POPs), Gestão de Gargalos, Simulação Operacional (Digital Twin 3D)',
      },
      {
        label: 'Análise de Dados, BI & Gestão de Custos',
        skills:
          'Excel Avançado, Power BI (Dashboards e KPIs), SQL (Consultas Analíticas), Modelagem de Custos por Unidade (R$/ha), Auditoria de Folha e Produtividade, ERP Mega',
      },
      {
        label: 'Automação Operacional & Sistemas',
        skills:
          'Python, Automação RPA (Playwright), N8N, PostgreSQL, Aplicações Web e Mobile Offline-First para Apontamento em Campo',
      },
      {
        label: 'Formação, Liderança & Idiomas',
        skills:
          'Engenharia de Produção (UFERSA), Ciência e Tecnologia (UFERSA), Coordenação de Projetos, Robótica Aplicada (UFERSA/Petrobras), Inglês Intermediário',
      },
    ],
    experiences: [
      {
        role: 'Analista de Dados & Automação Operacional',
        company: 'Mata Fresca LTDA — Mossoró, RN',
        period: 'Abr/2026 – Atual',
        bullets: [
          'Estruturei a modelagem e consolidação de custos operacionais por parcela/hectare (insumos, mão de obra e maquinário) integrando dados contábeis do ERP Mega.',
          'Automatizei fechamentos de horas extras, banco de absenteísmo, cálculo de bonificações (STMF) e importações de PCP via Python e RPA, atingindo 0.00 de divergência em conferências cruzadas.',
          'Liderei a digitalização do apontamento operacional de campo e almoxarifado (ecossistema MFlow e MF Track), garantindo rastreabilidade de horímetros, poços, paradas e produtividade.',
          'Desenvolvi simulador Digital Twin 3D para avaliar impacto de efetivo, distância e formação de filas na eficiência da operação.',
        ],
      },
      {
        role: 'Analista de Processos e Dados',
        company: 'Pequeno Príncipe',
        period: '2026',
        bullets: [
          'Atuei no planejamento e organização de processos operacionais com foco em eficiência, padronização e redução de atividades manuais.',
          'Criei rotinas automatizadas em Excel para coleta, tratamento e análise de grandes volumes de dados e indicadores de performance.',
        ],
      },
      {
        role: 'Coordenador de Projetos',
        company: 'Colégio Mater Christi',
        period: '2022 – 2025',
        bullets: [
          'Responsável pelo planejamento e controle de cronogramas operacionais, garantindo cumprimento de prazos e metas.',
          'Implementei Procedimentos Operacionais Padrão (POPs) e acompanhei KPIs de desempenho identificando desvios e propondo melhorias contínuas.',
        ],
      },
      {
        role: 'Automação & Desenvolvimento de Sistemas (Freelancer)',
        company: 'Merge Labs / Projetos Independentes',
        period: '2024 – Atual',
        bullets: [
          'Desenvolvimento de dashboards de indicadores, automações de workflows (N8N), consultas SQL e ferramentas digitais sob demanda para controle gerencial e operacional.',
        ],
      },
      {
        role: 'Mentor de Robótica (Projetos Robot em Ação & PENSARE)',
        company: 'UFERSA / Petrobras',
        period: '2019 – 2022',
        bullets: [
          'Mentoria em resolução analítica de problemas, organização de atividades técnicas e lógica computacional em iniciativa UFERSA/Petrobras.',
        ],
      },
    ],
    featuredProjects: [
      {
        name: 'Modelagem de Custos & Integração ERP Mega',
        description:
          'Consolidação automatizada de custos operacionais (Insumos, MDO, Maquinário) em R$/ha e dashboards gerenciais.',
      },
      {
        name: 'Suíte de Automação PCP, Horas Extras & Absenteísmo',
        description:
          'Aplicações desktop autônomas e robôs RPA com conferência cruzada (0.00 divergência).',
      },
      {
        name: 'Harvest Digital Twin 3D',
        description:
          'Simulador operacional modelando capacidade produtiva, distância, filas e gargalos de equipe.',
      },
      {
        name: 'MFlow & MF Track (Rastreabilidade Campo-ERP)',
        description:
          'Digitalização completa de ordens operacionais, estoque, horímetros e produtividade em campo.',
      },
    ],
  },
};
