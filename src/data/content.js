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
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'soft-skills', label: 'Soft Skills' },
    { id: 'contact', label: 'Contact' },
  ],

  /* ---------- Hero ---------- */
  hero: {
    greeting: "Hi, I'm",
    name: 'Kavishan Hettiarachchi',
    roles: ['Software Engineer', 'Frontend Developer', 'Flutter Developer'],
    tagline:
      'I turn ideas into fast, accessible web and mobile products — currently seeking an internship or entry-level role in software engineering.',
  },

  /* ---------- About ---------- */
  about: {
    // 👉 Replace with your real photo: put the file in public/ and update the path
    photo: null, // e.g. '/images/me.jpg'
    bio: [
      "I'm a final-year Software Engineering undergraduate (BSc Hons) at NSBM Green University, based in Hakmana, Sri Lanka. I love building things end to end — from clean React frontends to Flutter apps and the APIs that power them.",
      'During my six-month internship at FishiFox (Pvt) Ltd I worked on real production features, collaborated with a team, and learned how to ship software that people actually use. Outside of coursework I lead a campus tech club and take part in events that keep me learning.',
      "I'm now looking for an internship or entry-level role where I can contribute, keep growing, and work with people who care about quality.",
    ],
    stats: [
      { value: '6 mo', label: 'Industry internship', icon: 'briefcase' },
      { value: '4+', label: 'Projects shipped', icon: 'rocket' },
      { value: '3.48', label: 'CGPA / 4.00', icon: 'award' },
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
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'ASP.NET Core' },
        { name: 'Tailwind CSS' },
      ],
    },
    {
      category: 'Mobile',
      icon: 'phoneSmart',
      skills: [{ name: 'Flutter' }],
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
      ],
    },
  ],

  /* ---------- Experience ---------- */
  experience: [
    {
      role: 'Software Engineer Intern',
      org: 'FishiFox (Pvt) Ltd',
      period: 'June 2025 – December 2025',
      type: 'Internship',
      points: [
        'Contributed to real production features across the company’s web projects.',
        'Collaborated with senior engineers in code reviews, planning and daily stand-ups.',
        'Fixed bugs and improved UI responsiveness on existing client applications.',
      ],
    },
    {
      role: 'Project Manager',
      org: 'STEMUp Club',
      period: 'Leadership role',
      type: 'Leadership',
      points: [
        'Planned and coordinated club projects, delegating tasks and tracking progress.',
        'Kept team members and stakeholders aligned through clear communication.',
      ],
    },
    {
      role: 'Organizing Committee Member',
      org: 'Mantra Event — IEEE Student Branch',
      period: '2023',
      type: 'Leadership',
      points: [
        'Helped organize a flagship IEEE Student Branch event on campus.',
        'Handled logistics, outreach and coordination between volunteers and sponsors.',
      ],
    },
  ],

  /* ---------- Education ---------- */
  education: [
    {
      degree: 'BSc (Hons) Software Engineering',
      school: 'NSBM Green University',
      period: '2022 – 2026',
      result: 'CGPA 3.48 / 4.00',
      note: 'Focus on software architecture, web & mobile development, and databases.',
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
    blurb: "Open to internship and entry-level opportunities — feel free to reach out, I usually reply within a day.",
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
