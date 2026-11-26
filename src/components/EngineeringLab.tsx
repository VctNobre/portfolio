import { useEffect, useMemo, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { PROCESS_STEPS } from '../data/portfolioData';

type LabTab = 'twin' | 'pipeline';

interface PipelineStage {
  id: string;
  title: string;
  actor: string;
  system: string;
  status: string;
  latency: string;
  payload: Record<string, unknown>;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'request',
    title: '01 · Solicitação & Rateio',
    actor: 'Técnico / Agrônomo',
    system: 'MFlow Web (Next.js)',
    status: 'Aguardando Aplicação',
    latency: '120ms · PostgreSQL',
    payload: {
      request_id: 'REQ-2026-0891',
      type: 'pulverizacao',
      well: 'POCO-04',
      plots: ['P-101', 'P-102', 'P-103'],
      placeholder_fleet: 'MF00',
      distribution: 'ratear',
    },
  },
  {
    id: 'field',
    title: '02 · Campo Offline-First',
    actor: 'Operador em Cabine',
    system: 'MF Track (Capacitor + Dexie)',
    status: 'Apontado Localmente',
    latency: '0ms · IndexedDB',
    payload: {
      doc_number: 'OP-2026-0142',
      detected_placeholder: 'MF00 -> MF14',
      initial_hourmeter: 4821.4,
      final_hourmeter: 4824.1,
      connectivity: 'offline_buffer_queued',
    },
  },
  {
    id: 'sync',
    title: '03 · Sync & Auditoria',
    actor: 'Controlador / Confirmador',
    system: 'MFlow Sync + PostgreSQL',
    status: 'Aguardando Cadastro / OS',
    latency: '340ms · Cloud Sync',
    payload: {
      sync_state: 'committed',
      os_number: 'OS-77412',
      area_applied_ha: 10.5,
      stock_validation: 'verified',
    },
  },
  {
    id: 'rpa',
    title: '04 · Agente RPA + OCR',
    actor: 'Agente Autônomo',
    system: 'Playwright + Tesseract',
    status: 'Lançando no Mega ERP',
    latency: '4.2s · Headless Bot',
    payload: {
      agent: 'mega-erp-bot.js',
      ocr_confidence: 0.986,
      erp_screen: 'MOV_ESTOQUE_BAIXA',
      planilha_audit: 'PL-2026-991',
    },
  },
  {
    id: 'bi',
    title: '05 · Custos & KPIs',
    actor: 'Engenharia / Gestão',
    system: 'Custos + Power BI',
    status: 'Finalizado · 0.00 Erro',
    latency: 'Tempo Real',
    payload: {
      status: 'Finalizado',
      cost_per_ha_brl: 412.85,
      divergence_audit: 0.0,
      cycle_status: 'closed_verified',
    },
  },
];

export function EngineeringLab() {
  const [activeTab, setActiveTab] = useState<LabTab>('twin');

  // Digital Twin state
  const [cutters, setCutters] = useState(8);
  const [passers, setPassers] = useState(10);
  const [receivers, setReceivers] = useState(4);
  const [distanceM, setDistanceM] = useState(28);

  // Pipeline state
  const [stageIndex, setStageIndex] = useState(0);
  const [autoRunning, setAutoRunning] = useState(false);

  useEffect(() => {
    if (!autoRunning) return;
    const timer = window.setInterval(() => {
      setStageIndex((prev) => {
        if (prev >= PIPELINE_STAGES.length - 1) {
          setAutoRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1100);

    return () => window.clearInterval(timer);
  }, [autoRunning]);

  const twinMetrics = useMemo(() => {
    const cuttingCap = cutters * 135;
    const powderCap = Math.round(cutters * 0.55 * 245);
    const distanceFactor = Math.max(0.52, 1 - (distanceM - 15) * 0.011);
    const chainCap = Math.round(passers * 118 * distanceFactor);
    const loadingCap = Math.round(receivers * 270);

    const stages = [
      { name: 'Corte (Frente)', cap: cuttingCap },
      { name: 'Tratamento (Pó)', cap: powderCap },
      { name: 'Cadeia de Transporte', cap: chainCap },
      { name: 'Recepção & Carga', cap: loadingCap },
    ];

    const throughput = Math.min(...stages.map((s) => s.cap));
    const maxCap = Math.max(...stages.map((s) => s.cap));
    const bottleneck = stages.reduce((min, cur) => (cur.cap < min.cap ? cur : min), stages[0]);
    const utilization = stages.map((s) => ({
      ...s,
      pct: Math.min(100, Math.round((throughput / Math.max(1, s.cap)) * 100)),
      isBottleneck: s.name === bottleneck.name,
    }));

    const efficiency = Math.round((throughput / Math.max(1, maxCap)) * 100);

    let recommendation = 'Fluxo balanceado entre frente operacional e carregamento.';
    if (bottleneck.name === 'Cadeia de Transporte') {
      recommendation =
        distanceM > 32
          ? 'Distância elevada reduzindo a cadeia de transporte. Aproxime o ponto de carga ou adicione passadores.'
          : 'Gargalo na cadeia de transporte. Reforce os passadores para liberar a frente.';
    } else if (bottleneck.name === 'Recepção & Carga') {
      recommendation = 'Gargalo na recepção final. Reforce a equipe de carga para evitar fila.';
    } else if (bottleneck.name === 'Corte (Frente)') {
      recommendation = 'Frente de corte limitando o sistema. Adicione operadores na etapa inicial.';
    }

    return { throughput, bottleneck, utilization, efficiency, recommendation };
  }, [cutters, passers, receivers, distanceM]);

  const currentStage = PIPELINE_STAGES[stageIndex];

  return (
    <section
      id="laboratorio"
      className="border-y border-white/10 bg-[#080A0C] py-20 text-[#F3EFEA] sm:py-28"
    >
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
        {/* Matteo-inspired HOW I WORK Block */}
        <div className="border-b border-white/10 pb-14">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#F05A16]">
            02 / MÉTODO DE ENGENHARIA
          </div>
          <h2 className="font-poster mt-2 text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl">
            COMO EU TRABALHO
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.index}
                className="border-t border-white/15 pt-5"
              >
                <div className="font-mono text-xs text-[#F05A16]">{step.index}</div>
                <h3 className="font-poster mt-2 text-3xl font-extrabold uppercase tracking-tight text-[#F3EFEA]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#9E9A92]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Engineering Lab */}
        <div className="pt-14">
          <div className="flex flex-col gap-6 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#F05A16]">
                SIMULAÇÕES PRÁTICAS
              </div>
              <h3 className="font-poster mt-2 text-4xl font-extrabold uppercase leading-[0.92] sm:text-5xl">
                EXEMPLOS INTERATIVOS
              </h3>
            </div>

            <div className="flex gap-6 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('twin')}
                className={`border-b-2 pb-2 transition-colors ${
                  activeTab === 'twin'
                    ? 'border-[#F05A16] text-[#F3EFEA]'
                    : 'border-transparent text-[#8F8A80] hover:text-[#F3EFEA]'
                }`}
              >
                01 · Simulador Digital Twin
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pipeline')}
                className={`border-b-2 pb-2 transition-colors ${
                  activeTab === 'pipeline'
                    ? 'border-[#F05A16] text-[#F3EFEA]'
                    : 'border-transparent text-[#8F8A80] hover:text-[#F3EFEA]'
                }`}
              >
                02 · Pipeline Campo → RPA
              </button>
            </div>
          </div>

          {activeTab === 'twin' ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="rounded-lg border border-white/10 bg-[#111317] p-6 lg:col-span-5">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#9E9A92]">
                    Parâmetros da Operação
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCutters(8);
                      setPassers(10);
                      setReceivers(4);
                      setDistanceM(28);
                    }}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#9E9A92] hover:text-[#F05A16]"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Resetar</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      label: 'Operadores de Frente',
                      value: cutters,
                      min: 3,
                      max: 14,
                      unit: 'pessoas',
                      onChange: setCutters,
                    },
                    {
                      label: 'Cadeia de Transporte',
                      value: passers,
                      min: 4,
                      max: 18,
                      unit: 'pessoas',
                      onChange: setPassers,
                    },
                    {
                      label: 'Recepção & Carga',
                      value: receivers,
                      min: 2,
                      max: 8,
                      unit: 'pessoas',
                      onChange: setReceivers,
                    },
                    {
                      label: 'Distância até o Carroção',
                      value: distanceM,
                      min: 10,
                      max: 55,
                      unit: 'm',
                      onChange: setDistanceM,
                    },
                  ].map((ctrl) => (
                    <div key={ctrl.label}>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="text-[#D4CFC7]">{ctrl.label}</span>
                        <span className="font-mono text-[#F05A16]">
                          {ctrl.value} {ctrl.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={ctrl.min}
                        max={ctrl.max}
                        value={ctrl.value}
                        onChange={(e) => ctrl.onChange(Number(e.target.value))}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded bg-[#23262E] accent-[#F05A16]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-lg border border-white/10 bg-[#111317] p-6 lg:col-span-7">
                <div>
                  <div className="grid grid-cols-1 gap-4 border-b border-white/10 pb-6 sm:grid-cols-3">
                    <div>
                      <div className="font-mono text-[11px] text-[#9E9A92]">VAZÃO ESTIMADA</div>
                      <div className="mt-1 font-mono text-2xl font-medium text-[#F3EFEA]">
                        {twinMetrics.throughput} un/h
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[11px] text-[#9E9A92]">BALANCEAMENTO</div>
                      <div className="mt-1 font-mono text-2xl font-medium text-[#F3EFEA]">
                        {twinMetrics.efficiency}%
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[11px] text-[#F05A16]">GARGALO ATUAL</div>
                      <div className="mt-1 truncate text-lg font-semibold text-[#F3EFEA]">
                        {twinMetrics.bottleneck.name}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {twinMetrics.utilization.map((stage) => (
                      <div key={stage.name}>
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2 text-[#F3EFEA]">
                            {stage.name}
                            {stage.isBottleneck && (
                              <span className="font-mono text-[10px] text-[#F05A16]">
                                Gargalo atual
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-[#9E9A92]">
                            {stage.cap} un/h · {stage.pct}%
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-sm bg-[#23262E]">
                          <div
                            className={`h-full transition-all duration-300 ${
                              stage.isBottleneck ? 'bg-[#F05A16]' : 'bg-[#F3EFEA]/75'
                            }`}
                            style={{ width: `${stage.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 font-mono text-xs text-[#D4CFC7]">
                  <span className="text-[#F05A16]">Diagnóstico: </span>
                  {twinMetrics.recommendation}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-white/10 bg-[#111317] p-6">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="font-mono text-xs text-[#D4CFC7]">
                  Fluxo Auditável: MFlow Web → MF Track Offline → PostgreSQL → Agente RPA Mega ERP
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStageIndex(0);
                    setAutoRunning(true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#F05A16] px-3.5 py-2 font-mono text-xs font-semibold text-[#0A0B0D] hover:bg-[#ff6d2b]"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>{autoRunning ? 'Executando...' : 'Simular Ciclo'}</span>
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-5">
                {PIPELINE_STAGES.map((stage, idx) => {
                  const active = idx === stageIndex;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => {
                        setAutoRunning(false);
                        setStageIndex(idx);
                      }}
                      className={`rounded-md border p-3 text-left transition-colors ${
                        active
                          ? 'border-[#F05A16] bg-[#F05A16]/12 text-[#F3EFEA]'
                          : 'border-white/10 bg-[#080A0C] text-[#9E9A92] hover:border-white/30'
                      }`}
                    >
                      <div className="font-mono text-[10px]">{stage.system}</div>
                      <div className="mt-1 text-xs font-semibold text-[#F3EFEA]">{stage.title}</div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="space-y-3 rounded-md border border-white/10 bg-[#080A0C] p-4 lg:col-span-5">
                  <div className="font-mono text-[11px] text-[#F05A16]">ESTÁGIO SELECIONADO</div>
                  <div className="text-lg font-semibold text-[#F3EFEA]">{currentStage.title}</div>
                  <dl className="space-y-2 pt-1 font-mono text-xs">
                    <div className="flex justify-between border-b border-white/10 pb-1.5">
                      <dt className="text-[#9E9A92]">Responsável</dt>
                      <dd className="text-[#F3EFEA]">{currentStage.actor}</dd>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1.5">
                      <dt className="text-[#9E9A92]">Status</dt>
                      <dd className="text-[#F05A16]">{currentStage.status}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#9E9A92]">Telemetria</dt>
                      <dd className="text-[#F3EFEA]">{currentStage.latency}</dd>
                    </div>
                  </dl>
                </div>

                <div className="overflow-x-auto rounded-md border border-white/10 bg-[#050608] p-4 font-mono text-xs lg:col-span-7">
                  <div className="mb-2 flex justify-between text-[10px] text-[#9E9A92]">
                    <span>Dados da etapa</span>
                    <span>JSON</span>
                  </div>
                  <pre className="leading-relaxed text-[#D4CFC7]">
                    {JSON.stringify(currentStage.payload, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
