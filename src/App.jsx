import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import Projects from './components/Projects.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import SiteBackground from './components/SiteBackground.jsx'
import Skills from './components/Skills.jsx'
import SoftSkills from './components/SoftSkills.jsx'

/**
 * Single-page portfolio.
 * Sections are rendered in the order they appear in the sticky navbar;
 * all text/content comes from src/data/content.js.
 */
export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <SiteBackground />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
         <Experience />
        <Skills />
        <Education />
        <Projects />
        <SoftSkills />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
