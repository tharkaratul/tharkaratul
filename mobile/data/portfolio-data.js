/**
 * Portfolio content extracted from the main portfolio (index.html).
 * Paths are relative to mobile/index.html.
 *
 * This file intentionally exposes data on window instead of using ES modules,
 * so the mobile portfolio works when index.html is opened directly from disk.
 */
window.PORTFOLIO = {
  person: {
    name: "Atul Tharkar",
    tagline: "Cybersecurity Enthusiast",
    subtitle: "// CYBERSECURITY ENTHUSIAST",
    avatar: "../src/avatar.png",
    headline: "Cyber Security Enthusiast | Problem Solver",
    summary:
      "Computer Science undergraduate specializing in Cybersecurity with hands-on experience in networking, ethical hacking, SOC operations, encryption and decryption techniques. Familiar with security methodologies and frameworks including the MITRE ATT&CK Framework and Cyber Kill Chain Framework, with a strong interest in offensive security, threat analysis, and network security.",
    bio:
      "Aspiring Cybersecurity Analyst & Ethical Hacker with hands-on experience in penetration testing, network security, firewall management, encryption technologies, and security tool development, committed to solving real-world security challenges.",
    resume: {
      href: "../src/Atul_Resume_.pdf",
      filename: "Atul_Resume_.pdf",
    },
  },

  social: {
    github: {
      label: "GitHub",
      url: "https://github.com/tharkaratul?tab=repositories",
      icon: "../src/GitHub_Invertocat_White.svg",
    },
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/atul-tharkar",
    },
    email: {
      label: "Email",
      url: "mailto:atultharkar2004@gmail.com",
      display: "atultharkar2004@gmail.com",
      icon: "../src/mail-icon.png",
    },
    whatsapp: {
      label: "Mobile / WhatsApp",
      url: "https://wa.me/9765939243",
      display: "+91-9765939243",
      icon: "../src/whatsapp-icon.png",
    },
    googleForm: {
      label: "Google Form",
      url: "https://forms.gle/e1np7A6iPM3LC48H9",
      icon: "../src/google-icon.svg",
    },
  },

  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "certificates", label: "Certs" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],

  projects: [
    {
      title: "Web Vulnerability Scanner",
      image: "../src/Group 5.svg",
      url: "https://github.com/tharkaratul/Web-Vulnerability-Scanner",
      description:
        "Developed a CLI-based Python tool to perform automated web crawling and targeted SQL injection (SQLi) attacks on web applications.",
    },
    {
      title: "IP Location Look-Up",
      image: "../src/Group 6.svg",
      url: "https://github.com/tharkaratul/IP-Location-Look-Up",
      screenshot: "./assets/ip-lookup.png",
      screenshots: ["./assets/ip-lookup.png", "./assets/ip-lookup-1.png"],
      description:
        "Developed a Python-based tool that provides network intelligence, including resolving domain names into IP addresses and retrieving location information like country, city, latitude, longitude, ISP, and ASN.",
    },
    {
      title: "SOC Dashboard",
      image: "../src/Group_11.svg",
      url: "https://github.com/tharkaratul/Splunk-SSH_Dashboard",
      screenshot: "./assets/soc-dashboard.png",
      screenshots: ["./assets/soc-dashboard.png"],
      description:
        "Splunk SSH security dashboard for monitoring authentication events, threat indicators, and SOC-style log analysis workflows.",
    },
  ],

  skills: {
    technical: [
      {
        title: "Tools",
        items: [
          { label: "Nmap", value: 80 },
          { label: "Wireshark", value: 65 },
          { label: "Burp Suite", value: 60 },
          { label: "Splunk", value: 75 },
          { label: "Metasploit", value: 50 },
          { label: "Snort", value: 65 },
          { label: "OWASP ZAP", value: 60 },
        ],
      },
      {
        title: "Frameworks",
        items: [
          { label: "MITRE ATT&CK", value: 70 },
          { label: "Cyber Kill Chain", value: 60 },
        ],
      },
      {
        title: "Programming",
        items: [
          { label: "Python", value: 70 },
          { label: "Bash Scripting", value: 75 },
        ],
      },
      {
        title: "Operating Systems",
        items: [
          { label: "Kali Linux", value: 85 },
          { label: "Windows", value: 75 },
        ],
      },
    ],
    nonTechnical: [
      {
        title: "Soft Skills",
        items: [
          { label: "Communication", value: 75 },
          { label: "Analysis", value: 70 },
          { label: "Teamwork & Collaboration", value: 80 },
          { label: "Decision Making", value: 85 },
          { label: "Leadership", value: 70 },
          { label: "Public Speaking", value: 65 },
        ],
      },
      {
        title: "Courses",
        items: [
          { label: "Vulnerability Analysis & Penetration Testing", value: 70 },
          { label: "Bio-Metrics Security", value: 50 },
          { label: "Cloud Security", value: 60 },
          { label: "Reverse Engineering & Malware Analysis", value: 55 },
        ],
      },
    ],
  },

  certificates: [
    {
      title: "Ethical Hacking - LearnkartS",
      pdf: "../certificate/cehv12.pdf",
    },
    {
      title: "Ethical Hacking with Kali Linux",
      pdf: "../certificate/Coursera 34S3XPJH5AR4.pdf",
    },
    {
      title: "Cisco Certified Support Technician Cybersecurity (CCST Cybersecurity) - Cisco",
      pdf: "../certificate/certiport.pdf",
    },
    {
      title: "Networking Basics - Cisco",
      pdf: "../certificate/NetworkingBasicsUpdate.pdf",
    },
    {
      title: "Cyber Threat Management - Cisco",
      pdf: "../certificate/CyberThreatManagementUpdate20250905-31-41xlsn.pdf",
    },
    {
      title: "Foundations of Cybersecurity - Google",
      pdf: "../certificate/google certificate.pdf",
    },
    {
      title: "Introduction to SIEM (Splunk)",
      pdf: "../certificate/SIEM.pdf",
    },
    {
      title: "Hands-on Introduction to Linux Commands and Shell Scripting - IBM",
      pdf: "../certificate/Hands-On.pdf",
    },
  ],

  experience: [
    {
      role: "Freelance Web Designer",
      company: "Kafil Adventures",
      location: "Remote",
      period: "",
      highlights: [
        "Designed a modern and responsive website for Kafil Adventures, focusing on intuitive user experience, clean layouts, and a visually engaging interface that aligned with the brand identity.",
      ],
    },
    {
      role: "Freelance UI/Web Designer",
      company: "Meladen Perfumes",
      location: "Remote",
      period: "",
      highlights: [
        "Designed the Meladen Perfumes website, creating a premium, aesthetically appealing interface that reflected the brand's luxury image while ensuring a seamless and responsive user experience.",
      ],
    },
    {
      role: "Freelancing",
      company: "Margrets Beauty Bar",
      location: "Remote",
      period: "Ongoing",
      highlights: [
        "Collaborated asynchronously across US and Mexican time zones, managing remote client communications, feedback cycles, and delivery timelines for two concurrent international website projects.",
      ],
    },
    {
      role: "Visual Communication Intern",
      company: "J P Extrusiontech Pvt. Ltd",
      location: "Remote",
      period: "06/2025 – 12/2025",
      highlights: [
        "Designed and developed the company website to enhance online presence, improve user experience, and strengthen digital branding.",
        "Created professional product catalogues and marketing materials aligned with brand identity and business requirements.",
      ],
    },
    {
      role: "Ethical Hacking Intern",
      company: "Teachnook",
      location: "Remote",
      period: "Internship",
      highlights: [
        "Learned advanced Linux commands and practical ethical hacking workflows through hands-on lab sessions.",
        "Built a personal keylogger project to understand keystroke capture mechanics, detection risks, and defensive countermeasures.",
      ],
    },
  ],

  achievements: [
    {
      lead: "Best Project Award At MIT ADT IdeaSpark'24",
      detail:
        "For Innovative Project Development And Creative Problem-Solving Among Competing Student Teams.",
    },
    {
      lead: "2nd Place, Badminton 47th And 50th Foundation Day",
      detail:
        "Dr. Balasaheb Sawant Konkan Krushi Vidyapeeth, Dapoli",
    },
    {
      lead: "Disciplinary Co-Head, MIT ADT ACES Club",
      detail:
        "Led Event Discipline, Managed Teams, And Ensured Seamless Execution Of Large-Scale College Activities.",
    },
  ],

  terminal: {
    commands: ["help", "whoami", "skills", "projects", "social", "clear"],
    skillsBlock:
      "Recon      : Nmap, Burp Suite, Wireshark, OWASP ZAP\nDetection  : Splunk, MITRE ATT&CK, Kill Chain\nScripting  : Python, Bash, Linux shell scripting\nSystems    : Kali Linux, Windows",
  },
};
