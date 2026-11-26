import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { AboutAndSkills } from './components/AboutAndSkills';
import { CommandPalette } from './components/CommandPalette';
import { ContactFooter } from './components/ContactFooter';
import { EngineeringLab } from './components/EngineeringLab';
import { ExperienceSection } from './components/ExperienceSection';
import { Hero } from './components/Hero';
import { ManifestoSection } from './components/ManifestoSection';
import { Navbar } from './components/Navbar';
import { ProjectDrawer } from './components/ProjectDrawer';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { PROFILE, ProjectItem } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2200);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div id="portfolio-app-shell" className="min-h-screen">
        <Navbar onOpenResume={() => setResumeOpen(true)} />

        <main>
          <Hero onOpenResume={() => setResumeOpen(true)} />
          <ManifestoSection onSelectProject={setSelectedProject} />
          <ProjectsSection onSelectProject={setSelectedProject} />
          <EngineeringLab />
          <ExperienceSection />
          <AboutAndSkills />
        </main>

        <ContactFooter
          onCopyEmail={handleCopyEmail}
          emailCopied={emailCopied}
          onOpenResume={() => setResumeOpen(true)}
        />
      </div>

      <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectProject={setSelectedProject}
        onOpenResume={() => setResumeOpen(true)}
        onCopyEmail={handleCopyEmail}
      />
    </MotionConfig>
  );
}
