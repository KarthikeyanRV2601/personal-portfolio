"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import aboutMeData from "../data/aboutMe.json";
import experienceData from "../data/experience.json";
import projectData from "../data/project.json";
import blogsData from "../data/blogs.json";
import siteConfig from "../data/site.json";
import skillsData from "../data/skills.json";
import contactPageData from "../data/contactPage.json";
import resumeDataRaw from "../data/resume.json";
import PortfolioChat from "./portfolioChat";
import { projectElementId } from "../../lib/portfolioChat";
import ThemeSwitcher from "./interactibles/themeSwitcher";
import styles from "./cyberPortfolio.module.css";
import { ContactFormFieldType, ContactPageData } from "../types";

const projectPriority = new Map([["JobBuddy", 0], ["Vortex AI", 1], ["Cloud PMS - OPERA Cloud", 2]]);

const githubLink = "https://github.com/KarthikeyanRV2601";

type SocialIcon = "linkedin" | "github" | "cv";

const socialLinks = [
  { label: "LinkedIn", icon: "linkedin" as SocialIcon, href: aboutMeData.data.linkedInLink },
  { label: "GitHub", icon: "github" as SocialIcon, href: githubLink },
  { label: "CV", icon: "cv" as SocialIcon, href: "/KarthikeyanRV_Resume.pdf" },
];

const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  ...(siteConfig.showBlogs ? [{ id: "blogs", label: "Notes" }] : []),
  { id: "resume", label: "Résumé" },
  { id: "contact", label: "Contact" },
];

const companyLogoPath = (organization: string) => {
  if (organization.toLowerCase().includes("oracle")) {
    return "/resources/images/company-logos/oracle.svg";
  }
  return "/resources/images/company-logos/appscms.svg";
};

const renderSocialIcon = (icon: SocialIcon) => {
  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zM4.943 13.5V6.17H2.542V13.5h2.401zM3.742 5.154c.837 0 1.358-.554 1.358-1.248-.016-.71-.52-1.248-1.342-1.248S2.4 3.196 2.4 3.906c0 .694.504 1.248 1.326 1.248h.016zM13.5 13.5V9.55c0-2.116-1.128-3.1-2.633-3.1-1.214 0-1.757.668-2.06 1.137V6.17H6.406c.031.937 0 7.33 0 7.33h2.401V9.406c0-.218.016-.436.08-.592.175-.436.574-.887 1.247-.887.88 0 1.232.67 1.232 1.652V13.5H13.5z"
        />
      </svg>
    );
  }

  if (icon === "github") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.49 7.49 0 012.01-.27c.68 0 1.36.09 2.01.27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 0h5.5L14 4.5V14a2 2 0 01-2 2H4a2 2 0 01-2-2V2a2 2 0 012-2zm5 1.5V5h3.5L9 1.5zM5 7.25c-.41 0-.75.34-.75.75s.34.75.75.75h6a.75.75 0 000-1.5H5zm0 2.5c-.41 0-.75.34-.75.75s.34.75.75.75h6a.75.75 0 000-1.5H5zm0 2.5c-.41 0-.75.34-.75.75s.34.75.75.75h4a.75.75 0 000-1.5H5z"
      />
    </svg>
  );
};

export default function CyberPortfolio() {
  const about = aboutMeData.data;
  const experiences = experienceData.data;
  const projects = [...projectData.data].sort(
    (left, right) => (projectPriority.get(left.title) ?? 3) - (projectPriority.get(right.title) ?? 3)
  );
  const blogs = blogsData.data;
  const resume = resumeDataRaw.data;
  const { interestsDropDownData, projectTimeData } = contactPageData;

  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [portraitOn, setPortraitOn] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [projectImageIndex, setProjectImageIndex] = useState<Record<string, number>>({});
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const initialContactData: ContactPageData = useMemo(
    () => ({
      name: {
        id: ContactFormFieldType.NAME,
        value: "",
      },
      email: {
        id: ContactFormFieldType.EMAIL,
        value: "",
      },
      interest: {
        id: ContactFormFieldType.INTEREST,
        value: interestsDropDownData.data[0]?.value ?? "",
      },
      projectTime: {
        id: ContactFormFieldType.TIME,
        value: projectTimeData.data[0]?.value ?? "",
      },
      message: {
        id: ContactFormFieldType.MESSAGE,
        value: "",
      },
    }),
    [interestsDropDownData.data, projectTimeData.data]
  );

  const [contactData, setContactData] = useState<ContactPageData>(initialContactData);

  useEffect(() => {
    const observedIds = ["home", "about", "experience", "skills", "projects", "blogs", "resume", "contact"];

    const updateActiveSection = () => {
      const offset = 110;
      let currentSection = "home";

      for (const id of observedIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (window.scrollY + offset >= element.offsetTop) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const stats = [
    { value: "30+", label: "OPERA Cloud features delivered" },
    { value: "8+", label: "Modules with reusable UI frameworks" },
    { value: "~80%", label: "Less manual effort through AI automation" },
    { value: "40K+", label: "Hotels served by OPERA Cloud" },
  ];

  const beyondWorkItems = [
    {
      title: "Digital Sketching and 3D Designing",
      description: "I enjoy sketching and creating digital 3D design concepts in my free time.",
      ask: "Ask me about my favorite digital design workflows.",
      askSubject: "Tell me about your digital design workflow",
    },
    {
      title: "Fishing and Travel",
      description: "I love fishing and traveling to discover new fishing experiences.",
      ask: "Ask me for my best fishing spots.",
      askSubject: "What are your best fishing spots?",
    },
  ];

  const validateContactForm = (data: ContactPageData) => {
    const errors: Record<string, string> = {};

    if (!data.name.value.trim()) {
      errors.name = "Name is required.";
    } else if (data.name.value.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    if (!data.email.value.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.value)) {
      errors.email = "Invalid email format.";
    }

    if (!data.interest.value.trim()) {
      errors.interest = "Interest is required.";
    }

    if (!data.projectTime.value.trim()) {
      errors.projectTime = "Project timeline is required.";
    }

    if (!data.message.value.trim()) {
      errors.message = "Message is required.";
    }

    return errors;
  };

  const handleInputChange = (
    field: ContactFormFieldType,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setContactData((previous) => {
      const nextData: ContactPageData = {
        ...previous,
        name: { ...previous.name },
        email: { ...previous.email },
        interest: { ...previous.interest },
        projectTime: { ...previous.projectTime },
        message: { ...previous.message },
      };

      if (field === ContactFormFieldType.NAME) nextData.name.value = value;
      if (field === ContactFormFieldType.EMAIL) nextData.email.value = value;
      if (field === ContactFormFieldType.INTEREST) nextData.interest.value = value;
      if (field === ContactFormFieldType.TIME) nextData.projectTime.value = value;
      if (field === ContactFormFieldType.MESSAGE) nextData.message.value = value;

      setFormErrors(validateContactForm(nextData));
      return nextData;
    });
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateContactForm(contactData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setFormStatus("Please fix the highlighted fields.");
      return;
    }

    setFormStatus("Sending...");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFormStatus("Email sent successfully!");
      setContactData(initialContactData);
      setFormErrors({});
    } catch {
      setFormStatus("Failed to send email. Please try again, or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextProjectImage = (projectTitle: string, imageCount: number) => {
    setProjectImageIndex((previous) => {
      const current = previous[projectTitle] ?? 0;
      return {
        ...previous,
        [projectTitle]: (current + 1) % imageCount,
      };
    });
  };

  const previousProjectImage = (projectTitle: string, imageCount: number) => {
    setProjectImageIndex((previous) => {
      const current = previous[projectTitle] ?? 0;
      return {
        ...previous,
        [projectTitle]: (current - 1 + imageCount) % imageCount,
      };
    });
  };

  const goToProjectImage = (projectTitle: string, imageIndex: number) => {
    setProjectImageIndex((previous) => ({
      ...previous,
      [projectTitle]: imageIndex,
    }));
  };

  return (
    <main className={styles.page}>
      <a href="#about" className={styles.skipLink}>Skip to content</a>
      <header className={styles.topBar}>
        <a href="#home" className={styles.brand}>
          KRV<span className={styles.brandDot}>✳</span>
        </a>
        <span className={styles.headerNote}>SOFTWARE ENGINEER / HYDERABAD, IN</span>
        <div className={styles.headerControls}>
          <button id="menu-toggle" className={styles.menuToggle} type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close −" : "Menu +"}</button>
          <nav id="main-nav" className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Main navigation" onKeyDown={(event) => { if (event.key === "Escape") { setMenuOpen(false); document.getElementById("menu-toggle")?.focus(); } }}>
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`${styles.navItem} ${activeSection === link.id ? styles.navItemActive : ""}`}
                aria-current={activeSection === link.id ? "location" : undefined}
                onClick={() => { setActiveSection(link.id); setMenuOpen(false); }}
              >
                <span className={styles.navNumber}>{index + 1}.</span> {link.label}
              </a>
            ))}
          </nav>
          <ThemeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </header>

      <section id="home" className={`${styles.section} ${styles.hero}`}>
        <div className={styles.heroTopline}>
          <p className={styles.heroGreeting}>Hey,<br />I build full-stack products<br />and AI workflows.</p>
          <div className={styles.heroIndex}><span>PERSONAL PORTFOLIO</span><span>VOL. 01 / 2026</span><span className={styles.barcode} aria-hidden="true" /></div>
        </div>
        <div className={styles.heroMain}>
          <div className={styles.heroContent}>
            <p className={styles.heroLabel}><span aria-hidden="true">✳</span> SOFTWARE ENGINEER II @ ORACLE</p>
            <h1 className={styles.heroTitle} aria-label="Karthikeyan R.V.">KARTHI<span>KEYAN<span className={styles.nameSuffix}> R.V.</span></span></h1>
            <div className={styles.ctaRow}>
              <a href="#projects" className={styles.primaryButton}>See the work <span aria-hidden="true">↘</span></a>
              <a href="/KarthikeyanRV_Resume.pdf" target="_blank" rel="noreferrer" className={styles.secondaryButton}>Get my résumé <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <a href="#projects" className={styles.heroArtwork} aria-label="Explore selected projects">
            <span className={styles.vinyl} aria-hidden="true"><span>FULL STACK / APPLIED AI</span></span>
            <div className={styles.recordSleeve}>
              <div className={styles.sleeveTop}><span>KRV / ENGINEERING</span><span>VOL. 01</span></div>
              <svg className={styles.sleeveSymbol} viewBox="0 0 200 200" fill="none" aria-hidden="true"><path d="M100 12v176M12 100h176M38 38l124 124M38 162 162 38" stroke="currentColor" strokeWidth="28"/><circle cx="100" cy="100" r="25" fill="var(--color-accent)"/></svg>
              <p>FULL STACK<br />& APPLIED AI</p>
              <div className={styles.sleeveBottom}><span>SIDE A — SELECTED WORK</span><span>↗</span></div>
            </div>
            <span className={styles.artworkCaption}>SELECTED PROJECTS / 2022–2026</span>
          </a>
        </div>
        <div className={styles.heroFootnote}><span>REACT / TYPESCRIPT / JAVA / PYTHON</span><a href="#projects">SCROLL TO EXPLORE ↓</a></div>
      </section>

      <div className={styles.focusStrip}><span>FULL-STACK ENGINEERING</span><span aria-hidden="true">✳</span><span>AGENTIC WORKFLOWS</span><span aria-hidden="true">✳</span><span>RAG SYSTEMS</span><span aria-hidden="true">✳</span><span>REACT / JAVA / PYTHON</span></div>

      <section id="about" className={styles.section}>
        <p className={styles.eyebrow}>01 / ABOUT</p>
        <div className={styles.aboutLayout}>
          <figure className={styles.aboutPhoto}>
            <div className={styles.tvAerial} aria-hidden="true" />
            <div className={styles.television}>
              <div id="portrait-screen" className={styles.aboutImageWrap}>
                {portraitOn ? <Image src="/resources/images/profile/mountain-portrait.png" alt="Karthikeyan in the mountains, shown inside a small retro television" fill sizes="180px" className={styles.aboutImage} /> : <span className={styles.offAir}>OFF AIR</span>}
                <div className={styles.scanlines} aria-hidden="true" />
              </div>
              <div className={styles.tvControls}>
                <span className={styles.tvDial} aria-hidden="true" />
                <button type="button" onClick={() => setPortraitOn(!portraitOn)} aria-label={portraitOn ? "Turn off portrait screen" : "Turn on portrait screen"} aria-pressed={portraitOn} aria-controls="portrait-screen" className={styles.tvPower}>⏻</button>
                <span className={styles.tvGrille} aria-hidden="true" />
              </div>
            </div>
            <figcaption>CH. 01 / {about.name}</figcaption>
          </figure>
          <div className={styles.aboutDescriptionBlock}>
            <h2 className={styles.sectionHeading}>OFF<br /><span className={styles.headingAccent}>SCREEN.</span></h2>
            <p className={styles.leadText}>{about.description}</p>
            <dl className={styles.aboutFacts}>
              <div><dt>Current role</dt><dd>{about.title}</dd></div>
              <div><dt>Based in</dt><dd>Hyderabad, India</dd></div>
            </dl>
            <p className={styles.personalNote}>Outside work, I enjoy digital sketching, 3D design, fishing, and travel.</p>
            <div className={styles.socialRail}>
              {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className={styles.socialButton}><span className={styles.socialIcon}>{renderSocialIcon(social.icon)}</span>{social.label}</a>)}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className={styles.section}>
        <p className={styles.eyebrow}>02 / EXPERIENCE</p>
        <h2 className={styles.sectionHeading}>THE DAY JOB<span className={styles.headingAccent}>.</span></h2>
        <div className={styles.experienceLayout}>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <article key={stat.value} className={styles.statCard}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </article>
            ))}
          </div>

          <div className={styles.experienceList}>
            {experiences.map((item, index) => {
              return (
                <details key={`${item.organization}-${item.start}-${item.position}`} className={styles.experienceItem} open={index === 0}>
                  <summary>
                    <div className={styles.experienceSummaryLeft}>
                      <div className={styles.companyLogoWrap}>
                        <Image
                          src={companyLogoPath(item.organization)}
                          alt={item.organization}
                          fill
                          sizes="80px"
                          className={styles.companyLogo}
                        />
                      </div>
                      <div>
                        <h3>{item.position}</h3>
                        <p>{item.organization}</p>
                        <small>{item.location}</small>
                      </div>
                    </div>
                    <span>
                      {item.start} - {item.end}
                    </span>
                  </summary>

                  <div className={styles.experienceBody}>
                    <p className={styles.experienceExpertise}>
                      <strong>Expertise:</strong> {item.expertise}
                    </p>
                    <div>
                      <h4 className={styles.responsibilityHeading}>Responsibilities</h4>
                      <ul className={styles.responsibilityList}>
                        {item.responsibilities.map((responsibility) => (
                          <li key={responsibility}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      <section id="skills" className={styles.section}>
        <p className={styles.eyebrow}>03 / SKILLS</p>
        <h2 className={styles.sectionHeading}>SKILLS &<br /><span className={styles.headingAccent}>SPECIALTIES.</span></h2>
        <p className={styles.skillsIntro}>Agentic application flows, documentation retrieval, and Python / LLM automation.</p>
        <div className={styles.skillsGrid}>
          {skillsData.categories.map((category, index) => (
            <details key={category.title} className={styles.skillCategory} open={index === 0}>
              <summary><span className={styles.skillNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{category.title === "AI & retrieval" ? "Agentic AI & retrieval" : category.title}</h3><span className={styles.skillPlus} aria-hidden="true" /></summary>
              <ul>{category.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </details>
          ))}
        </div>
      </section>

      <section id="projects" className={styles.section}>
        <p className={styles.eyebrow}>04 / SELECTED WORK</p>
        <h2 className={styles.sectionHeading}>SELECTED WORK<span className={styles.headingAccent}>.</span></h2>
        <div className={styles.projectGrid}>
          {projects.map((project, index) => {
            const activeIndex = projectImageIndex[project.title] ?? 0;
            const imageCount = project.projectImages.length;

            return (
              <article id={projectElementId(project.title)} key={project.title} className={styles.projectCard}>
                <div className={styles.projectText}>
                  <span className={styles.projectRank}>RELEASE {String(index + 1).padStart(2, "0")} / {project.start}</span>
                  <h3>{project.title}</h3>
                  <p>{project.role}</p>
                  <span className={styles.projectMeta}>
                    {project.start} - {project.end}
                  </span>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectTechList} aria-label={`${project.title} technologies`}>
                    {project.technologies.slice(0, 5).map((technology) => (
                      <span key={`${project.title}-${technology}`}>{technology}</span>
                    ))}
                  </div>
                  <a href={project.url} target="_blank" rel="noreferrer" className={styles.projectLink}>
                    View project ↗
                  </a>
                </div>
                <div className={styles.projectCarousel}>
                  <div className={styles.projectImageWrap}>
                    <Image
                      src={`/resources/images/projects/${project.projectImages[activeIndex]}`}
                      alt={`${project.title} preview ${activeIndex + 1}`}
                      fill
                      sizes="(max-width: 700px) 90vw, 42vw"
                      className={styles.projectImage}
                    />
                    <span className={styles.projectImageCount}>
                      {activeIndex + 1}/{imageCount}
                    </span>
                  </div>
                  {imageCount > 1 ? (
                    <div className={styles.projectCarouselControls}>
                      <button type="button" className={styles.projectNavButton} onClick={() => previousProjectImage(project.title, imageCount)} aria-label={`Previous image for ${project.title}`}>
                        Prev
                      </button>
                      <div className={styles.projectDots}>
                        {project.projectImages.map((_, imageIndex) => (
                          <button
                            key={`${project.title}-dot-${imageIndex + 1}`}
                            type="button"
                            className={`${styles.projectDot} ${imageIndex === activeIndex ? styles.projectDotActive : ""}`}
                            onClick={() => goToProjectImage(project.title, imageIndex)}
                            aria-pressed={imageIndex === activeIndex}
                            aria-label={`Show image ${imageIndex + 1} for ${project.title}`}
                          />
                        ))}
                      </div>
                      <button type="button" className={styles.projectNavButton} onClick={() => nextProjectImage(project.title, imageCount)} aria-label={`Next image for ${project.title}`}>
                        Next
                      </button>
                    </div>
                  ) : null}
                  <a className={styles.imageLink} href={`/resources/images/projects/${project.projectImages[activeIndex]}`} target="_blank" rel="noreferrer" aria-label={`Open full-size image ${activeIndex + 1} for ${project.title}`}>Open full-size ↗</a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {siteConfig.showBlogs && (
      <section id="blogs" className={styles.section}>
        <p className={styles.eyebrow}>05 / NOTES & IDEAS</p>
        <h2 className={styles.sectionHeading}>Thinking out loud.</h2>
        <div className={styles.blogGrid}>
          {blogs.map((blog) => (
            <article key={blog.title} className={styles.blogCard}>
              <div className={styles.blogImageWrap}>
                <Image
                  src={`/resources/images/blogs/${blog.image}`}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 900px) 92vw, 30vw"
                  className={styles.blogImage}
                />
              </div>
              <h3>{blog.title}</h3>
              <small>{blog.date}</small>
              <details>
                <summary>Read</summary>
                <p>{blog.description}</p>
              </details>
            </article>
          ))}
        </div>
      </section>
      )}

      <section id="resume" className={styles.section}>
        <p className={styles.eyebrow}>05 / RÉSUMÉ</p>
        <div className={styles.resumeHeading}>
          <h2 className={styles.sectionHeading}>THE RÉSUMÉ<span className={styles.headingAccent}>.</span></h2>
          <a href="/KarthikeyanRV_Resume.pdf" target="_blank" rel="noreferrer" className={styles.secondaryButton}>Download PDF <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.resumeGrid}>
          <article className={styles.resumeCard}>
            <h3>Education</h3>
            {resume.education.map((item) => <div key={item.university}><p className={styles.resumeEmphasis}>{item.course}</p><p>{item.university}</p><p>2018–2022 · {item.score}</p></div>)}
          </article>
          <article className={styles.resumeCard}>
            <h3>Certifications & achievements</h3>
            <ul><li>OCI 2025 AI Foundations Associate</li><li>OCI 2025 Certified Generative AI Professional</li><li>Atlassian App Dev Hackathon finalist — Top 10 of 2,000+ teams</li></ul>
          </article>
        </div>
      </section>

      <section id="contact" className={styles.section}>
        <p className={styles.eyebrow}>06 / CONTACT</p>
        <div className={styles.contactCard}>
          <div className={styles.contactHeader}>
            <h2 className={styles.sectionHeading}>LET’S<br /><span className={styles.headingAccent}>TALK.</span></h2>
            <a href="mailto:karthikeyan.r.v.2601@gmail.com" className={styles.contactEmail}>karthikeyan.r.v.2601@gmail.com ↗</a>
            <p className={styles.contactCopy}>Hyderabad, India</p>
            <div className={styles.beyondWorkBlock}>
              <h3>Interests</h3>
              {beyondWorkItems.map((item) => <p key={item.title} className={styles.personalNote}>{item.title}</p>)}
            </div>
          </div>
          <div className={styles.contactFormWrap}>
            <h3 className={styles.bodyText}>Send a message</h3>
            <div className={styles.contactLinks}>
              {socialLinks.map((social) => (
                <a key={`contact-${social.label}`} href={social.href} target="_blank" rel="noreferrer" className={styles.contactLinkButton}>
                  <span className={styles.socialIcon}>{renderSocialIcon(social.icon)}</span>
                  <span>{social.label}</span>
                </a>
              ))}
            </div>

            <form className={styles.contactForm} onSubmit={handleContactSubmit}>
              <div className={styles.formGrid}>
                <label className={styles.formField}>
                  <span>Name</span>
                  <input
                    type="text"
                    autoComplete="name"
                    aria-invalid={Boolean(formErrors.name)}
                    aria-describedby={formErrors.name ? "contact-name-error" : undefined}
                    value={contactData.name.value}
                    onChange={(event) => handleInputChange(ContactFormFieldType.NAME, event)}
                    placeholder="Your name"
                  />
                  {formErrors.name ? <small id="contact-name-error">{formErrors.name}</small> : null}
                </label>

                <label className={styles.formField}>
                  <span>Email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={formErrors.email ? "contact-email-error" : undefined}
                    value={contactData.email.value}
                    onChange={(event) => handleInputChange(ContactFormFieldType.EMAIL, event)}
                    placeholder="you@example.com"
                  />
                  {formErrors.email ? <small id="contact-email-error">{formErrors.email}</small> : null}
                </label>

                <label className={styles.formField}>
                  <span>Interest</span>
                  <select
                    aria-invalid={Boolean(formErrors.interest)}
                    aria-describedby={formErrors.interest ? "contact-interest-error" : undefined}
                    value={contactData.interest.value}
                    onChange={(event) => handleInputChange(ContactFormFieldType.INTEREST, event)}
                  >
                    {interestsDropDownData.data.map((interest) => (
                      <option key={interest.id} value={interest.value}>
                        {interest.value}
                      </option>
                    ))}
                  </select>
                  {formErrors.interest ? <small id="contact-interest-error">{formErrors.interest}</small> : null}
                </label>

                <label className={styles.formField}>
                  <span>Project Timeline</span>
                  <select
                    aria-invalid={Boolean(formErrors.projectTime)}
                    aria-describedby={formErrors.projectTime ? "contact-projectTime-error" : undefined}
                    value={contactData.projectTime.value}
                    onChange={(event) => handleInputChange(ContactFormFieldType.TIME, event)}
                  >
                    {projectTimeData.data.map((timeline) => (
                      <option key={timeline.id} value={timeline.value}>
                        {timeline.value}
                      </option>
                    ))}
                  </select>
                  {formErrors.projectTime ? <small id="contact-projectTime-error">{formErrors.projectTime}</small> : null}
                </label>
              </div>

              <label className={styles.formField}>
                <span>Message</span>
                <textarea
                  aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={formErrors.message ? "contact-message-error" : undefined}
                    value={contactData.message.value}
                  onChange={(event) => handleInputChange(ContactFormFieldType.MESSAGE, event)}
                  rows={5}
                  placeholder="Your message..."
                />
                {formErrors.message ? <small id="contact-message-error">{formErrors.message}</small> : null}
              </label>

              <button type="submit" className={styles.primaryButton} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message ↗"}
              </button>
              {formStatus ? <p role="status" className={styles.formStatus}>{formStatus}</p> : null}
            </form>
          </div>
        </div>
      </section>
      <footer className={styles.footer}><a href="#home" className={styles.brand}>KRV<span className={styles.brandDot}>✳</span></a><span>© {new Date().getFullYear()} KARTHIKEYAN R.V.<br />FULL STACK & APPLIED AI</span><a href="#home">Back to top ↑</a></footer>
      <PortfolioChat />
    </main>
  );
}
