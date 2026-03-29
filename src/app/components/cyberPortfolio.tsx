"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import aboutMeData from "../data/aboutMe.json";
import experienceData from "../data/experience.json";
import projectData from "../data/project.json";
import blogsData from "../data/blogs.json";
import contactPageData from "../data/contactPage.json";
import resumeDataRaw from "../data/resume.json";
import ThemeSwitcher from "./interactibles/themeSwitcher";
import styles from "./cyberPortfolio.module.css";
import { ContactFormFieldType, ContactPageData } from "../types";

const githubLink = "https://github.com/KarthikeyanRV2601";

type SocialIcon = "linkedin" | "github" | "cv";

const socialLinks = [
  { label: "LinkedIn", icon: "linkedin" as SocialIcon, href: aboutMeData.data.linkedInLink },
  { label: "GitHub", icon: "github" as SocialIcon, href: githubLink },
  { label: "CV", icon: "cv" as SocialIcon, href: "/KarthikeyanRV_Resume.pdf" },
];

const specializationCards = [
  { title: "#LargeScaleApplications", count: "40+ components", icon: "UI" },
  { title: "#ProductionIssueResolution", count: "20+ APIs", icon: "MS" },
  { title: "#HighUserBasePlatforms", count: "RAG + Agents", icon: "AI" },
  { title: "#UserCentricDesign", count: "Latency -20%", icon: "PX" },
];

const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "blogs", label: "Blogs" },
  { id: "resume", label: "Resume" },
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
  const projects = projectData.data;
  const blogs = blogsData.data;
  const resume = resumeDataRaw.data;
  const { interestsDropDownData, projectTimeData } = contactPageData;

  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [projectImageIndex, setProjectImageIndex] = useState<Record<string, number>>({});
  const [coverBasePath, setCoverBasePath] = useState("/resources/images/profile");
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
    let cancelled = false;

    const checkImageExists = (path: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const probe = new window.Image();
        probe.onload = () => resolve(true);
        probe.onerror = () => resolve(false);
        probe.src = `${path}/cover-light.png`;
      });
    };

    const resolveCoverPath = async () => {
      const candidates = ["/images/profie", "/images/profile", "/resources/images/profile"];
      for (const path of candidates) {
        const exists = await checkImageExists(path);
        if (exists) {
          if (!cancelled) setCoverBasePath(path);
          return;
        }
      }
    };

    resolveCoverPath();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const observedIds = navLinks.map((link) => link.id);

    const updateActiveSection = () => {
      const offset = 140;
      let currentSection = observedIds[0];

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

  const coverPhotoSrc = `${coverBasePath}/${darkMode ? "cover-dark.png" : "cover-light.png"}?theme=${darkMode ? "dark" : "light"}`;

  const stats = [
    { value: "3.5+ years", label: "Professional experience" },
    { value: "20+ features", label: "Production delivered" },
    { value: "40K+ hotels", label: "Platform impact" },
    { value: "2 OCI certs", label: "AI foundations" },
  ];

  const coreSkills = useMemo(() => {
    return Array.from(
      new Set(
        [resume.skills.languages, resume.skills.frameworkAndTools, resume.skills.aiMlAndDataScience]
          .join(",")
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      )
    ).slice(0, 18);
  }, [resume.skills.aiMlAndDataScience, resume.skills.frameworkAndTools, resume.skills.languages]);

  const quickFacts = [
    { label: "Role", value: about.title },
    { label: "Location", value: "Hyderabad, India" },
    { label: "Experience", value: "3.5+ years" },
    { label: "Impact", value: "40K+ hotels platform" },
    { label: "Certification 1", value: "OCI 2025 AI Foundations Associate" },
    { label: "Certification 2", value: "OCI 2025 Certified Generative AI Professional" },
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
      <header className={styles.topBar}>
        <a href="#home" className={styles.brand}>
          K.R.V
        </a>
        <div className={styles.headerControls}>
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`${styles.navItem} ${activeSection === link.id ? styles.navItemActive : ""}`}
                onClick={() => setActiveSection(link.id)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </header>

      <section id="home" className={`${styles.section} ${styles.hero}`}>
        <div className={styles.ambientOne} aria-hidden="true" />
        <div className={styles.ambientTwo} aria-hidden="true" />

        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            <span>{about.name}</span>
            <span>{about.title}</span>
          </h1>
          <p className={styles.heroIntro}>{about.tagline}</p>
          <div className={styles.ctaRow}>
            <a href="/KarthikeyanRV_Resume.pdf" target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              Hire Me
            </a>
            <a href="#contact" className={styles.primaryButton}>
              Lets Talk
            </a>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroImageCard}>
            <Image
              key={coverPhotoSrc}
              src={coverPhotoSrc}
              alt={about.name}
              fill
              sizes="(max-width: 900px) 92vw, 42vw"
              className={styles.coverPhoto}
              priority
              unoptimized
            />
          </div>
          <div className={styles.socialRail}>
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className={styles.socialButton}>
                <span className={styles.socialIcon}>{renderSocialIcon(social.icon)}</span>
                <span className={styles.socialLabel}>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className={styles.section}>
        <div className={styles.headingGrid}>
          <h2 className={styles.sectionHeading}>{about.mainLandingTitle}</h2>
          <div className={styles.aboutDescriptionBlock}>
            <p className={styles.leadText}>{about.description}</p>
            <a href="/KarthikeyanRV_Resume.pdf" target="_blank" rel="noreferrer" className={styles.primaryButton}>
              Download CV
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.aboutGrid}>
          <article className={styles.infoCard}>
            <dl className={styles.infoList}>
              <div>
                <dt>Name</dt>
                <dd>{about.name}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{about.title}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>Hyderabad, India</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>karthikeyan.r.v.2601@gmail.com</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>Available on request</dd>
              </div>
            </dl>
            <div className={styles.interestsWrap}>
              {specializationCards.map((item) => (
                <span key={item.title} className={styles.interestChip}>
                  {item.title}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="experience" className={styles.section}>
        <h2 className={styles.sectionHeading}>My experience and journey</h2>
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

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Core Skills</h2>
        <div className={styles.skillCloud}>
          {coreSkills.map((skill) => (
            <span key={skill} className={styles.skillPill}>
              {skill}
            </span>
          ))}
        </div>

        <div className={styles.specializationGrid}>
          {specializationCards.map((item) => (
            <article key={item.title} className={styles.specializationCard}>
              <span>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.count}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className={styles.section}>
        <h2 className={styles.sectionHeading}>Selected work</h2>
        <div className={styles.projectGrid}>
          {projects.map((project) => {
            const activeIndex = projectImageIndex[project.title] ?? 0;
            const imageCount = project.projectImages.length;

            return (
              <article key={project.title} className={styles.projectCard}>
                <div className={styles.projectCarousel}>
                  <div className={styles.projectImageWrap}>
                    <Image
                      src={`/resources/images/projects/${project.projectImages[activeIndex]}`}
                      alt={`${project.title} preview ${activeIndex + 1}`}
                      fill
                      sizes="(max-width: 900px) 92vw, 46vw"
                      className={styles.projectImage}
                    />
                    <span className={styles.projectImageCount}>
                      {activeIndex + 1}/{imageCount}
                    </span>
                  </div>
                  {imageCount > 1 ? (
                    <div className={styles.projectCarouselControls}>
                      <button type="button" className={styles.projectNavButton} onClick={() => previousProjectImage(project.title, imageCount)}>
                        Prev
                      </button>
                      <div className={styles.projectDots}>
                        {project.projectImages.map((_, imageIndex) => (
                          <button
                            key={`${project.title}-dot-${imageIndex + 1}`}
                            type="button"
                            className={`${styles.projectDot} ${imageIndex === activeIndex ? styles.projectDotActive : ""}`}
                            onClick={() => goToProjectImage(project.title, imageIndex)}
                            aria-label={`Show image ${imageIndex + 1} for ${project.title}`}
                          />
                        ))}
                      </div>
                      <button type="button" className={styles.projectNavButton} onClick={() => nextProjectImage(project.title, imageCount)}>
                        Next
                      </button>
                    </div>
                  ) : null}
                </div>
                <div className={styles.projectText}>
                  <h3>{project.title}</h3>
                  <p>{project.role}</p>
                  <span className={styles.projectMeta}>
                    {project.start} - {project.end}
                  </span>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <a href={project.url} target="_blank" rel="noreferrer" className={styles.projectLink}>
                    View Project
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="blogs" className={styles.section}>
        <h2 className={styles.sectionHeading}>Blogs</h2>
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

      <section id="resume" className={styles.section}>
        <h2 className={styles.sectionHeading}>Resume highlights</h2>
        <div className={styles.resumeGrid}>
          <article className={styles.resumeCard}>
            <h3>{resume.resumeNameTitle}</h3>
            <p>{resume.resumeTagLine}</p>
            <p>{resume.skills.languages}</p>
          </article>
          <article className={styles.resumeCard}>
            <h3>Frameworks and Tools</h3>
            <p>{resume.skills.frameworkAndTools}</p>
          </article>
          <article className={styles.resumeCard}>
            <h3>AI and Data</h3>
            <p>{resume.skills.aiMlAndDataScience}</p>
          </article>
          <article className={styles.resumeCard}>
            <h3>Certifications</h3>
            <p>{resume.skills.certifications}</p>
          </article>
        </div>
      </section>

      <section id="contact" className={styles.section}>
        <div className={styles.contactCard}>
          <div className={styles.contactHeader}>
            <h2 className={styles.sectionHeading}>{about.name}</h2>
            <p className={styles.contactCopy}>Quick Facts</p>
            <div className={styles.quickFactsGrid}>
              {quickFacts.map((fact) => (
                <article key={fact.label} className={styles.quickFactCard}>
                  <h4>{fact.label}</h4>
                  <p>{fact.value}</p>
                </article>
              ))}
            </div>

            <div className={styles.beyondWorkBlock}>
              <h3>Beyond Work</h3>
              <div className={styles.beyondWorkGrid}>
                {beyondWorkItems.map((item) => (
                  <article key={item.title} className={styles.beyondWorkCard}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <a
                      href={`mailto:karthikeyan.r.v.2601@gmail.com?subject=${encodeURIComponent(item.askSubject)}`}
                      className={styles.beyondWorkAsk}
                    >
                      {item.ask}
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.contactFormWrap}>
            <h3 className={styles.bodyText}>Stay Connected</h3>
            <p className={styles.bodyText}>Email: karthikeyan.r.v.2601@gmail.com</p>
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
                    value={contactData.name.value}
                    onChange={(event) => handleInputChange(ContactFormFieldType.NAME, event)}
                    placeholder="Your name"
                  />
                  {formErrors.name ? <small>{formErrors.name}</small> : null}
                </label>

                <label className={styles.formField}>
                  <span>Email</span>
                  <input
                    type="email"
                    value={contactData.email.value}
                    onChange={(event) => handleInputChange(ContactFormFieldType.EMAIL, event)}
                    placeholder="you@example.com"
                  />
                  {formErrors.email ? <small>{formErrors.email}</small> : null}
                </label>

                <label className={styles.formField}>
                  <span>Interest</span>
                  <select
                    value={contactData.interest.value}
                    onChange={(event) => handleInputChange(ContactFormFieldType.INTEREST, event)}
                  >
                    {interestsDropDownData.data.map((interest) => (
                      <option key={interest.id} value={interest.value}>
                        {interest.value}
                      </option>
                    ))}
                  </select>
                  {formErrors.interest ? <small>{formErrors.interest}</small> : null}
                </label>

                <label className={styles.formField}>
                  <span>Project Timeline</span>
                  <select
                    value={contactData.projectTime.value}
                    onChange={(event) => handleInputChange(ContactFormFieldType.TIME, event)}
                  >
                    {projectTimeData.data.map((timeline) => (
                      <option key={timeline.id} value={timeline.value}>
                        {timeline.value}
                      </option>
                    ))}
                  </select>
                  {formErrors.projectTime ? <small>{formErrors.projectTime}</small> : null}
                </label>
              </div>

              <label className={styles.formField}>
                <span>Message</span>
                <textarea
                  value={contactData.message.value}
                  onChange={(event) => handleInputChange(ContactFormFieldType.MESSAGE, event)}
                  rows={5}
                  placeholder="Tell me about your requirement..."
                />
                {formErrors.message ? <small>{formErrors.message}</small> : null}
              </label>

              <button type="submit" className={styles.primaryButton} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Now"}
              </button>
              {formStatus ? <p className={styles.formStatus}>{formStatus}</p> : null}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
