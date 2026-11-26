import { jsPDF } from 'jspdf';
import {
  CERTIFICATIONS,
  EDUCATION,
  PROFILE,
  RESUME_VARIANTS,
  ResumeTrackId,
} from '../data/portfolioData';

interface InlineSegment {
  text: string;
  url?: string;
  bold?: boolean;
  color?: [number, number, number];
}

const PDF_FILENAMES: Record<ResumeTrackId, string> = {
  complete: 'Curriculo_Vicente_Nobre_Hibrido.pdf',
  software: 'Curriculo_Vicente_Nobre_FullStack_IA.pdf',
  engineering: 'Curriculo_Vicente_Nobre_Engenharia_Producao.pdf',
};

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN_X = 14;
const MARGIN_TOP = 15;
const MARGIN_BOTTOM = 15;
const CONTENT_W = PAGE_W - MARGIN_X * 2; // 182mm
const MAX_Y = PAGE_H - MARGIN_BOTTOM; // 282mm

const COLOR_INK: [number, number, number] = [17, 17, 17];
const COLOR_BODY: [number, number, number] = [34, 34, 34];
const COLOR_MUTED: [number, number, number] = [68, 68, 68];

export function generateResumePdf(track: ResumeTrackId): void {
  const variant = RESUME_VARIANTS[track];
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  doc.setProperties({
    title: `Currículo — ${PROFILE.fullName} (${variant.label})`,
    author: PROFILE.fullName,
    subject: variant.roleTitle,
    keywords: variant.atsTargetKeywords.join(', '),
    creator: PROFILE.portfolioUrl,
  });

  let y = MARGIN_TOP;

  const nextPage = () => {
    doc.addPage();
    y = MARGIN_TOP;
  };

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > MAX_Y && y > MARGIN_TOP + 2) {
      nextPage();
    }
  };

  const drawLinkLine = (x: number, baselineY: number, width: number, url: string) => {
    doc.setDrawColor(148, 163, 184);
    doc.setLineWidth(0.2);
    doc.line(x, baselineY + 0.65, x + width, baselineY + 0.65);
    doc.link(x, baselineY - 3.2, width, 4.2, { url });
  };

  const drawInlineSegments = (
    segments: InlineSegment[],
    startX: number,
    baselineY: number,
    baseFontSize: number,
    maxLineWidth: number,
  ) => {
    let fontSize = baseFontSize;

    const measureTotal = (size: number) => {
      doc.setFontSize(size);
      return segments.reduce((sum, seg) => {
        doc.setFont('helvetica', seg.bold ? 'bold' : 'normal');
        return sum + doc.getTextWidth(seg.text);
      }, 0);
    };

    while (measureTotal(fontSize) > maxLineWidth && fontSize > 7.2) {
      fontSize -= 0.2;
    }

    let x = startX;
    doc.setFontSize(fontSize);

    for (const seg of segments) {
      doc.setFont('helvetica', seg.bold ? 'bold' : 'normal');
      const color = seg.color ?? (seg.url ? COLOR_INK : COLOR_MUTED);
      doc.setTextColor(color[0], color[1], color[2]);
      doc.text(seg.text, x, baselineY);
      const w = doc.getTextWidth(seg.text);
      if (seg.url) {
        drawLinkLine(x, baselineY, w, seg.url);
      }
      x += w;
    }
  };

  const drawSectionHeading = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(COLOR_INK[0], COLOR_INK[1], COLOR_INK[2]);
    doc.text(title, MARGIN_X, y);
    y += 1.5;
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.25);
    doc.line(MARGIN_X, y, MARGIN_X + CONTENT_W, y);
    y += 4.3;
  };

  const splitBoldPrefixParagraph = (
    boldPrefix: string,
    boldSuffix: string,
    body: string,
    maxWidth: number,
    fontSize: number,
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'bold');
    const fullBoldLabel = `${boldPrefix}${boldSuffix}`;
    const trimmedBoldLabel = fullBoldLabel.trimEnd();
    const trailingSpaces = fullBoldLabel.length - trimmedBoldLabel.length;
    const prefixW = doc.getTextWidth(boldPrefix);
    doc.setFont('helvetica', 'normal');
    const unitSpaceW = doc.getTextWidth('a b') - doc.getTextWidth('ab');
    const leadingSpaces = body.startsWith(' ') ? 1 : 0;
    doc.setFont('helvetica', 'bold');
    const trimmedBoldW = doc.getTextWidth(trimmedBoldLabel);
    // Built-in PDF Helvetica-Bold metrics slightly underestimate wide labels; scale + pad to keep clear gap after ":"
    const totalPrefixW =
      trimmedBoldW * 1.02 + (trailingSpaces + leadingSpaces) * unitSpaceW + 0.35;

    doc.setFont('helvetica', 'normal');
    const availableFirstLine = Math.max(20, maxWidth - totalPrefixW);
    const words = body.trim().split(/\s+/).filter(Boolean);
    let firstLineBody = '';
    let idx = 0;

    while (idx < words.length) {
      const candidate = firstLineBody ? `${firstLineBody} ${words[idx]}` : words[idx];
      if (doc.getTextWidth(candidate) <= availableFirstLine) {
        firstLineBody = candidate;
        idx += 1;
      } else {
        break;
      }
    }

    const remainingBody = words.slice(idx).join(' ');
    const remainingLines: string[] = remainingBody
      ? doc.splitTextToSize(remainingBody, maxWidth)
      : [];

    return {
      fullBoldLabel: trimmedBoldLabel,
      prefixW,
      totalPrefixW,
      firstLineBody,
      remainingLines,
    };
  };

  const drawBoldPrefixParagraph = (options: {
    boldPrefix: string;
    boldSuffix?: string;
    prefixUrl?: string;
    body: string;
    x: number;
    maxWidth: number;
    fontSize: number;
    lineHeight: number;
    bullet?: boolean;
  }) => {
    const {
      boldPrefix,
      boldSuffix = '',
      prefixUrl,
      body,
      x,
      maxWidth,
      fontSize,
      lineHeight,
      bullet = false,
    } = options;

    const layout = splitBoldPrefixParagraph(boldPrefix, boldSuffix, body, maxWidth, fontSize);
    const totalLines = 1 + layout.remainingLines.length;
    ensureSpace(totalLines * lineHeight + 1);

    if (bullet) {
      doc.setFillColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
      doc.circle(x - 3.0, y - 1.05, 0.55, 'F');
    }

    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLOR_INK[0], COLOR_INK[1], COLOR_INK[2]);

    if (prefixUrl) {
      doc.text(boldPrefix, x, y);
      drawLinkLine(x, y, layout.prefixW, prefixUrl);
      if (boldSuffix) {
        doc.text(boldSuffix, x + layout.prefixW, y);
      }
    } else {
      doc.text(layout.fullBoldLabel, x, y);
    }

    if (layout.firstLineBody) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
      doc.text(layout.firstLineBody, x + layout.totalPrefixW, y);
    }

    y += lineHeight;

    if (layout.remainingLines.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
      for (const line of layout.remainingLines) {
        ensureSpace(lineHeight);
        doc.text(line, x, y);
        y += lineHeight;
      }
    }
  };

  const drawWrappedBullet = (text: string, x: number, maxWidth: number, fontSize: number, lineHeight: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    const lines: string[] = doc.splitTextToSize(text, maxWidth);
    ensureSpace(lines.length * lineHeight + 0.8);

    doc.setFillColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
    doc.circle(x - 3.0, y - 1.05, 0.55, 'F');

    doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
    for (const line of lines) {
      doc.text(line, x, y);
      y += lineHeight;
    }
    y += 0.5;
  };

  // ==================== HEADER ====================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16.5);
  doc.setTextColor(COLOR_INK[0], COLOR_INK[1], COLOR_INK[2]);
  doc.text(PROFILE.fullName.toUpperCase(), MARGIN_X, y + 4.5);
  y += 9.2;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
  const roleLines: string[] = doc.splitTextToSize(variant.roleTitle, CONTENT_W);
  for (const line of roleLines) {
    doc.text(line, MARGIN_X, y);
    y += 4.3;
  }
  y += 1.0;

  drawInlineSegments(
    [
      { text: `${PROFILE.location}  |  Telefone/WhatsApp: ` },
      { text: PROFILE.phoneDisplay, url: PROFILE.whatsappUrl },
      { text: '  |  E-mail: ' },
      { text: PROFILE.email, url: `mailto:${PROFILE.email}` },
    ],
    MARGIN_X,
    y,
    8.5,
    CONTENT_W,
  );
  y += 4.2;

  drawInlineSegments(
    [
      { text: 'LinkedIn: ' },
      { text: PROFILE.linkedinHandle, url: PROFILE.linkedinUrl },
      { text: '  |  GitHub: ' },
      { text: PROFILE.githubHandle, url: PROFILE.githubUrl },
      { text: '  |  Portfólio: ' },
      { text: PROFILE.portfolioHandle, url: PROFILE.portfolioUrl },
    ],
    MARGIN_X,
    y,
    8.5,
    CONTENT_W,
  );
  y += 2.6;

  doc.setDrawColor(COLOR_INK[0], COLOR_INK[1], COLOR_INK[2]);
  doc.setLineWidth(0.55);
  doc.line(MARGIN_X, y, MARGIN_X + CONTENT_W, y);
  y += 5.8;

  // ==================== 1. RESUMO PROFISSIONAL ====================
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const summaryLines: string[] = doc.splitTextToSize(variant.summary, CONTENT_W);
  ensureSpace(8 + summaryLines.length * 4.0);
  drawSectionHeading('RESUMO PROFISSIONAL');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
  for (const line of summaryLines) {
    doc.text(line, MARGIN_X, y);
    y += 4.0;
  }
  y += 3.5;

  // ==================== 2. COMPETÊNCIAS TÉCNICAS ====================
  ensureSpace(18);
  drawSectionHeading('COMPETÊNCIAS TÉCNICAS');
  for (const pillar of variant.skillPillars) {
    drawBoldPrefixParagraph({
      boldPrefix: `${pillar.label}: `,
      body: pillar.skills,
      x: MARGIN_X,
      maxWidth: CONTENT_W,
      fontSize: 8.8,
      lineHeight: 3.9,
      bullet: false,
    });
    y += 0.9;
  }
  y += 2.8;

  // ==================== 3. EXPERIÊNCIA PROFISSIONAL ====================
  const estimateExperienceHeight = (exp: (typeof variant.experiences)[number]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const periodW = doc.getTextWidth(exp.period);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.3);
    const titleLines: string[] = doc.splitTextToSize(
      `${exp.role} — ${exp.company}`,
      CONTENT_W - periodW - 5,
    );
    let total = titleLines.length * 4.1 + 1.4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.7);
    for (const b of exp.bullets) {
      const bLines: string[] = doc.splitTextToSize(b, CONTENT_W - 5);
      total += bLines.length * 3.85 + 0.6;
    }
    return total + 3.0;
  };

  if (variant.experiences.length > 0) {
    ensureSpace(8 + estimateExperienceHeight(variant.experiences[0]));
  }
  drawSectionHeading('EXPERIÊNCIA PROFISSIONAL');

  for (const exp of variant.experiences) {
    const estH = estimateExperienceHeight(exp);
    if (y + estH > MAX_Y && estH <= MAX_Y - MARGIN_TOP) {
      nextPage();
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const periodW = doc.getTextWidth(exp.period);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(exp.period, MARGIN_X + CONTENT_W, y, { align: 'right' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.3);
    doc.setTextColor(COLOR_INK[0], COLOR_INK[1], COLOR_INK[2]);
    const headerLines: string[] = doc.splitTextToSize(
      `${exp.role} — ${exp.company}`,
      CONTENT_W - periodW - 5,
    );
    for (const line of headerLines) {
      doc.text(line, MARGIN_X, y);
      y += 4.1;
    }
    y += 0.6;

    for (const bullet of exp.bullets) {
      drawWrappedBullet(bullet, MARGIN_X + 5, CONTENT_W - 5, 8.7, 3.85);
    }
    y += 2.6;
  }

  // ==================== 4. PROJETOS RELEVANTES EM PRODUÇÃO ====================
  const estimateProjectsHeight = () => {
    let h = 7;
    for (const proj of variant.featuredProjects) {
      const layout = splitBoldPrefixParagraph(
        proj.name,
        ': ',
        proj.description,
        CONTENT_W - 5,
        8.7,
      );
      h += (1 + layout.remainingLines.length) * 3.85 + 0.9;
    }
    return h + 2.5;
  };

  ensureSpace(estimateProjectsHeight());
  drawSectionHeading('PROJETOS RELEVANTES EM PRODUÇÃO');
  for (const proj of variant.featuredProjects) {
    drawBoldPrefixParagraph({
      boldPrefix: proj.name,
      boldSuffix: ': ',
      prefixUrl: proj.url,
      body: proj.description,
      x: MARGIN_X + 5,
      maxWidth: CONTENT_W - 5,
      fontSize: 8.7,
      lineHeight: 3.85,
      bullet: true,
    });
    y += 0.7;
  }
  y += 2.8;

  // ==================== 5. FORMAÇÃO ACADÊMICA & 6. CERTIFICAÇÕES ====================
  // Keep Formação + Certificações together so Certificações never orphans alone on Page 2
  const educationAndCertsH =
    7 + EDUCATION.length * 4.6 + 3 + 7 + (CERTIFICATIONS.length + 1) * 4.5;
  ensureSpace(educationAndCertsH);
  drawSectionHeading('FORMAÇÃO ACADÊMICA');
  for (const edu of EDUCATION) {
    ensureSpace(5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    const periodW = doc.getTextWidth(edu.period);
    doc.text(edu.period, MARGIN_X + CONTENT_W, y, { align: 'right' });

    drawInlineSegments(
      [
        { text: edu.degree, bold: true, color: COLOR_INK },
        { text: ` — ${edu.institution}`, bold: false, color: COLOR_BODY },
      ],
      MARGIN_X,
      y,
      8.8,
      CONTENT_W - periodW - 4,
    );
    y += 4.6;
  }
  y += 2.8;

  // ==================== 6. CERTIFICAÇÕES E IDIOMAS ====================
  ensureSpace(7 + (CERTIFICATIONS.length + 1) * 4.5);
  drawSectionHeading('CERTIFICAÇÕES E IDIOMAS');
  for (const cert of CERTIFICATIONS) {
    drawBoldPrefixParagraph({
      boldPrefix: cert.title,
      body: ` — ${cert.issuer} (${cert.year})`,
      x: MARGIN_X + 5,
      maxWidth: CONTENT_W - 5,
      fontSize: 8.7,
      lineHeight: 3.85,
      bullet: true,
    });
    y += 0.5;
  }
  drawBoldPrefixParagraph({
    boldPrefix: 'Idioma: ',
    body: PROFILE.language,
    x: MARGIN_X + 5,
    maxWidth: CONTENT_W - 5,
    fontSize: 8.7,
    lineHeight: 3.85,
    bullet: true,
  });

  doc.save(PDF_FILENAMES[track]);
}
