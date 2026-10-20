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
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'soft-skills', label: 'Soft Skills' },
    { id: 'contact', label: 'Contact' },
  ],

  /* ---------- Hero ---------- */
  hero: {
    greeting: 'HI THERE,',
    name: 'Kavishan Hettiarachchi',
    roles: ['Software Engineer', 'Full Stack Developer', 'Mobile App Developer',],
    tagline:
      'I turn ideas into fast, accessible web and mobile products — currently seeking an Associate Software Engineer role.',
  },

  /* ---------- About ---------- */
  about: {
    // Photo shown in the About card (file lives in public/)
    photo: '/me.png',
    summary:
      'Motivated final-year Software Engineering undergraduate with hands-on experience developing web and mobile applications. I enjoy solving problems, learning new technologies and turning ideas into practical software — working across programming languages, frameworks, databases, APIs and AI-powered development tools such as Cursor AI and Claude, plus server-side configuration, deployment and debugging. Currently seeking an Associate Software Engineer position where I can apply these skills to real-world projects and keep growing.',
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
      skills: [{ name: 'Flutter,' },
               { name: 'React Native' }

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
      points: [
        'Worked on project-based web and mobile application development, including API integration and database management.',
        'Handled server-side configuration, debugging, testing and application deployment.',
        'Collaborated with the development team to deliver functional software solutions.',
      ],
    },
    {
      role: 'Software Engineer Intern',
      org: 'FishiFox (Pvt) Ltd',
      period: 'July 2025 – Jan 2026',
      type: 'Internship',
      points: [
        'Delivered practical software solutions within a professional team environment, adhering to project timelines, delivery standards and sprint-based workflows.',
        'Collaborated with developers, designers and stakeholders to plan, build and ship production-ready features across the project lifecycle.',
        'Produced clear technical documentation and communicated progress, blockers and outcomes effectively to team members and supervisors.',
      ],
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

  /* ---------- Projects ----------
   * 👉 Replace `code` / `live` with your real repo + deployed URLs,
   *    and `image` with a screenshot in public/images/.
   */
  projects: [
    {
      title: 'Spice Mountain E-Commerce Website',
      category: 'web',
      description:
        'Full-stack e-commerce site for a Sri Lankan spice brand: product catalogue, search & filters, shopping cart, user accounts and an admin dashboard for orders and inventory.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      image: null, // e.g. '/images/spice-mountain.png'
      code: 'https://github.com/MrKavishan', // real repo URL
      live: null, // hide the Live Demo button until it exists,
      featured: true,
    },
    {
      title: 'Online Train Ticket Booking Mobile App',
      category: 'mobile',
      description:
        'Flutter app for searching train routes, picking seats and booking tickets, with Firebase authentication and real-time booking confirmations.',
      tech: ['Flutter', 'Dart', 'Firebase'],
      image: null, // e.g. '/images/train-app.png'
      code: 'https://github.com/MrKavishan', // real repo URL
      live: null, // hide the Live Demo button until it exists,
      featured: true,
    },
    {
      title: 'Expense Tracker Application',
      category: 'web',
      description:
        'Track income and spending with categories, monthly summaries and simple charts. Built with a REST API backend and a clean, responsive dashboard.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
      image: null, // e.g. '/images/expense-tracker.png'
      code: 'https://github.com/MrKavishan', // real repo URL
      live: null, // hide the Live Demo button until it exists,
      featured: false,
    },
    {
      title: 'Portfolio Website',
      category: 'web',
      description:
        'This site — a fast, accessible single-page portfolio built with React and Tailwind CSS, featuring a dark/light theme, scroll animations and a fully responsive layout.',
      tech: ['React.js', 'Tailwind CSS', 'Vite'],
      image: null, // e.g. '/images/portfolio.png'
      code: 'https://github.com/MrKavishan', // real repo URL
      live: null, // hide the Live Demo button until it exists,
      featured: false,
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
