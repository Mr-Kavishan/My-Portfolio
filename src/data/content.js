/** 
 * Every piece of text on the site lives in this file.
 * Edit here once — every section component reads from this object.
 */
export const content = {
  /* ---------- Site-wide ---------- */
  site: {
    name: 'Kavishan Hettiarachchi',
    initials: 'KH',
    cvPath: '/cv.pdf', // replace public/cv.pdf with your real CV
  },

  /* ---------- Navbar ---------- */
  nav: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
     { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ],

  /* ---------- Hero ---------- */
  hero: {
    greeting: 'HI THERE,',
    name: 'Kavishan Hettiarachchi',
    roles: ['Software Engineer', 'Full Stack Developer', 'Mobile App Developer','UI/UX Designer'],
    tagline:
      'I turn ideas into fast, accessible web and mobile products currently seeking an Associate Software Engineer role.',
  },

  /* ---------- About ---------- */
  about: {
    // Photo shown in the About card (file lives in public/)
    photo: '/me.png',
    summary:
      'Motivated final-year Software Engineering undergraduate with hands-on experience developing web and mobile applications. I enjoy solving problems, learning new technologies and turning ideas into practical software working across programming languages, frameworks, databases, APIs and AI-powered development tools such as Cursor AI and Claude, plus server-side configuration, deployment and debugging. Currently seeking an Associate Software Engineer position where I can apply these skills to real-world projects and keep growing.',
    facts: [
      { icon: 'pin', value: 'Colombo, Sri Lanka' },
      { icon: 'briefcase', value: 'Open to Associate SWE roles' },
      { icon: 'code', value: 'Web & mobile' },
    ],
    stats: [
      { value: '14 mo', label: 'Industry experience', icon: 'briefcase' },
      { value: '4+', label: 'Projects shipped', icon: 'rocket' },
      { value: '3.52', label: 'CGPA / 4.00', icon: 'award' },
    ],
  },

  /* ---------- Skills ---------- */
  skills: [
    {
      category: 'Languages',
      icon: 'code',
      skills: [
        { name: 'C' },
        { name: 'Java' },
        { name: 'C#' },
        { name: 'Dart' },
      ],
    },
    {
      category: 'Web',
      icon: 'globe',
      skills: [
        { name: 'HTML5' },
        { name: 'CSS' },
        { name: 'JavaScript' },
        { name: 'React.js' },
         { name: 'Spring Boot' },
        { name: 'ASP.NET Core' },
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'Tailwind CSS' },
      ],
    },
    {
      category: 'Mobile',
      icon: 'phoneSmart',
      skills: [{ name: 'Flutter' },
               { name: 'React Native' },
               { name: 'React' },

      ],
    },
    {
      category: 'Databases',
      icon: 'database',
      skills: [
        { name: 'MongoDB' },
        { name: 'MySQL' },
        { name: 'MS SQL Server' },
        { name: 'Firebase' },
      ],
    },
    {
      category: 'Tools',
      icon: 'tool',
      skills: [
        { name: 'Git' },
        { name: 'GitHub' },
        { name: 'Cursor AI' },
        { name: 'Claude AI' },
      ],
    },
  ],

  /* ---------- Experience ---------- */
  experience: [
    {
      role: 'Trainee Software Engineer',
      org: 'FishiFox (Pvt) Ltd',
      period: 'Jan 2026 – Aug 2026',
      type: 'Industry',
    },
    {
      role: 'Software Engineer Intern',
      org: 'FishiFox (Pvt) Ltd',
      period: 'July 2025 – Jan 2026',
      type: 'Internship',
    },
  ],

  /* ---------- Education ---------- */
  education: [
    {
      degree: 'BSc (Hons) Software Engineering',
      school: 'NSBM Green University',
      period: '2022 – 2026',
      result: 'CGPA 3.52 / 4.00',
      cgpa: 3.52,
      cgpaMax: 4,
      note: 'Up to Level 4 Semester 1 · Final-year undergraduate, expected graduation in 2026.',
    },

  ],

  /* ---------- Projects
   * 👉 Replace `code` / `live` with your real repo + deployed URLs,
   *    and `image` with a screenshot in public/images/. Set `image` to null
   *    to fall back to the built-in illustrated scene for that project.
   */
  projects: [
    {
      title: 'LawAdviser',
      category: 'mobile',
      short: 'AI-powered legal awareness mobile application for Sri Lanka.',
      yearBuilt: 2026,
      sceneId: 'lawadviser',
      image: '/images/lawadviser.svg',
      points: [
      'Developed LawAdviser as a final-year research project to improve legal awareness in Sri Lanka through an AI-powered mobile application.',
      'Implemented a multilingual AI chatbot for legal guidance and real-time traffic sign detection with scenario-based legal guidance.'
],
      tech: ['React Native', 'Firebase', 'Mobile AI', 'Multilingual UI'],
      code: 'https://github.com/MrKavishan',
      live: null,
    },
    {
      title: 'Secure Event Management System',
      category: 'web',
      short: 'Secure, web-based event management platform with QR ticket verification.',
      yearBuilt: 2026,
      sceneId: 'secure-event-management-system',
      image: '/images/secure-event-management-system.svg',
      points: [
        'Engineered a secure, web-based event management platform using PHP and MySQL featuring user registration, QR code ticket generation and one-time QR ticket verification to prevent fraud.',
        'Implemented automated email notifications, a full admin dashboard and Excel export functionality for reporting and data analysis.',
      ],
      tech: ['PHP', 'MySQL', 'SQL', 'JS', 'Bootstrap'],
      code: 'https://github.com/MrKavishan',
      live: null,
    },
    {
      title: 'Spice Management System',
      category: 'web',
      short: 'Inventory management system for spice stock, sales and supplier records.',
      yearBuilt: 2026,
      sceneId: 'spice-management-system',
      image: '/images/spice-management-system.svg',
      points: [
        'Developed an inventory management system enabling real-time tracking of spice stock levels, sales monitoring and maintenance of supplier and product records.',
      ],
      tech: ['PHP', 'MySQL', 'Tailwind CSS'],
      code: 'https://github.com/MrKavishan',
      live: null,
    },
    {
      title: 'Portfolio Website',
      category: 'web',
      short: 'Fast, accessible single-page portfolio built with React and Tailwind CSS.',
      yearBuilt: 2025,
      sceneId: 'portfolio-website',
      image: '/images/portfolio-website.svg',
      points: [
        "Designed and deployed a responsive personal portfolio website showcasing technical skills, projects and professional experience.",
      ],
      tech: ['React.js', 'Tailwind CSS'],
      code: 'https://github.com/MrKavishan',
      live: null,
    },

    /* ---------------------------------------------------------------
     * Placeholder entries — added only to test the 3 × 2 grid + carousel
     * (8 projects = 2 pages). Delete this block once real projects land.
     * --------------------------------------------------------------- */
    {
      title: 'Placeholder Project 5',
      category: 'web',
      short: 'Sample entry for testing the paged project grid — replace with a real project.',
      yearBuilt: 2025,
      sceneId: 'portfolio-website',
      image: '/images/portfolio-website.svg',
      points: [],
      tech: ['Placeholder'],
      code: 'https://github.com/MrKavishan',
      live: null,
    },
    {
      title: 'Placeholder Project 6',
      category: 'mobile',
      short: 'Sample entry for testing the paged project grid — replace with a real project.',
      yearBuilt: 2025,
      sceneId: 'lawadviser',
      image: '/images/lawadviser.svg',
      points: [],
      tech: ['Placeholder'],
      code: 'https://github.com/MrKavishan',
      live: null,
    },
    {
      title: 'Placeholder Project 7',
      category: 'web',
      short: 'Sample entry for testing the paged project grid — replace with a real project.',
      yearBuilt: 2025,
      sceneId: 'secure-event-management-system',
      image: '/images/secure-event-management-system.svg',
      points: [],
      tech: ['Placeholder'],
      code: 'https://github.com/MrKavishan',
      live: null,
    },
    {
      title: 'Placeholder Project 8',
      category: 'web',
      short: 'Sample entry for testing the paged project grid — replace with a real project.',
      yearBuilt: 2025,
      sceneId: 'spice-management-system',
      image: '/images/spice-management-system.svg',
      points: [],
      tech: ['Placeholder'],
      code: 'https://github.com/MrKavishan',
      live: null,
    },
  ],

  /* ---------- Soft skills ---------- */
  softSkills: [
    { name: 'Problem Solving', icon: 'puzzle' },
    { name: 'Leadership', icon: 'flag' },
    { name: 'Communication', icon: 'chat' },
    { name: 'Time Management', icon: 'clock' },
    { name: 'Critical Thinking', icon: 'brain' },
    { name: 'Adaptability', icon: 'refresh' },
  ],

  /* ---------- Contact ---------- */
  contact: {
    blurb: "Open to Associate Software Engineer opportunities — feel free to reach out, I usually reply within a day.",
    details: [
      { type: 'email', value: 'ukavishan1234@gmail.com', href: 'mailto:ukavishan1234@gmail.com' },
      { type: 'phone', value: '+94 76 087 0731', href: 'tel:+94760870731' },
      { type: 'location', value: 'Hakmana, Sri Lanka', href: null },
    ],
    socials: [
      { name: 'GitHub', href: 'https://github.com/MrKavishan', icon: 'github' },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/kavishan-hettiarachchi', icon: 'linkedin' },
      { name: 'Email', href: 'mailto:ukavishan1234@gmail.com', icon: 'mail' },
    ],
    // 👉 Optional: point this at a real endpoint (Formspree, EmailJS, your API).
    // When null, the form shows a simulated success message only.
    endpoint: null,
  },

  /* ---------- Footer ---------- */
  footer: {
    text: 'Designed & built by Kavishan Hettiarachchi.',
    year: new Date().getFullYear(),
  },
}
