"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import aboutMeData from "../data/aboutMe.json";
import experienceData from "../data/experience.json";
import projectData from "../data/project.json";
import blogsData from "../data/blogs.json";
import resumeDataRaw from "../data/resume.json";
import ThemeSwitcher from "./interactibles/themeSwitcher";
import styles from "./cyberPortfolio.module.css";

const githubLink = "https://github.com/KarthikeyanRV2601";

const socialLinks = [
  { label: "LinkedIn", short: "in", href: aboutMeData.data.linkedInLink },
  { label: "GitHub", short: "gh", href: githubLink },
  { label: "CV", short: "cv", href: "/KarthikeyanRV_Resume.pdf" },
];

const specializationCards = [
  { title: "UI Systems", count: "40+ components", icon: "UI" },
  { title: "Microservices", count: "20+ APIs", icon: "MS" },
  { title: "AI Workflows", count: "RAG + Agents", icon: "AI" },
  { title: "Performance", count: "Latency -20%", icon: "PX" },
];

const companyLogoPath = (organization: string) => {
  if (organization.toLowerCase().includes("oracle")) {
    return "/resources/images/company-logos/oracle.svg";
  }
  return "/resources/images/company-logos/appscms.svg";
};

export default function CyberPortfolio() {
  const about = aboutMeData.data;
  const experiences = experienceData.data;
  const projects = projectData.data;
  const blogs = blogsData.data;
  const resume = resumeDataRaw.data;

  const [darkMode, setDarkMode] = useState(false);
  const [experienceImageIndex, setExperienceImageIndex] = useState<Record<number, number>>({});
  const [coverBasePath, setCoverBasePath] = useState("/resources/images/profile");

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

  const coverPhotoSrc = `${coverBasePath}/${darkMode ? "cover-dark.png" : "cover-light.png"}?theme=${darkMode ? "dark" : "light"}`;

  const experienceProjectMap = useMemo(() => {
    return experiences.map((experience, index) => {
      const org = experience.organization.toLowerCase();
      if (org.includes("oracle")) {
        if (index === 0) {
          return projects.find((project) => project.title.includes("Cloud PMS")) ?? projects[0];
        }
        if (index === 1) {
          return projects.find((project) => project.title.includes("Policy Compliance")) ?? projects[1];
        }
        return projects.find((project) => project.title.includes("Vortex")) ?? projects[1];
      }
      return projects.find((project) => project.title.includes("Online Video")) ?? projects[projects.length - 1];
    });
  }, [experiences, projects]);

  const stats = [
    { value: "3.5+ years", label: "Professional experience" },
    { value: "20+ features", label: "Production delivered" },
    { value: "40K+ hotels", label: "Platform impact" },
    { value: "2 OCI certs", label: "AI foundations" },
  ];

  const nextExperienceImage = (experienceIndex: number, imageCount: number) => {
    setExperienceImageIndex((previous) => {
      const current = previous[experienceIndex] ?? 0;
      return {
        ...previous,
        [experienceIndex]: (current + 1) % imageCount,
      };
    });
  };

  const previousExperienceImage = (experienceIndex: number, imageCount: number) => {
    setExperienceImageIndex((previous) => {
      const current = previous[experienceIndex] ?? 0;
      return {
        ...previous,
        [experienceIndex]: (current - 1 + imageCount) % imageCount,
      };
    });
  };

  return (
    <main className={styles.page}>
      <ThemeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />

      <header className={styles.topBar}>
        <a href="#home" className={styles.brand}>
          KRV
        </a>
        <nav className={styles.nav}>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#blogs">Blogs</a>
          <a href="#resume">Resume</a>
        </nav>
      </header>

      <section id="home" className={`${styles.section} ${styles.hero}`}>
        <div className={styles.heroLeft}>
          <p className={styles.heroIntro}>Hi, I&apos;m a Web developer and UI/UX designer</p>
          <h1 className={styles.heroTitle}>
            <span>{about.name.split(" ").slice(0, 2).join(" ")}</span>
            <span>{about.name.split(" ").slice(2).join(" ")}</span>
          </h1>
          <p className={styles.heroDescription}>{about.tagline}</p>
          <a href="#contact" className={styles.primaryButton}>
            Let&apos;s talk
          </a>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroImageCard}>
            <Image
              key={coverPhotoSrc}
              src={coverPhotoSrc}
              alt={about.name}
              fill
              sizes="(max-width: 900px) 92vw, 40vw"
              className={styles.coverPhoto}
              priority
              unoptimized
            />
            <span className={styles.verticalLabel}>UI/UX Designer</span>
          </div>
          <div className={styles.socialRail}>
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                {social.short}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className={styles.section}>
        <div className={styles.headingGrid}>
          <h2 className={styles.sectionHeading}>{about.mainLandingTitle}</h2>
          <div>
            <p className={styles.leadText}>{about.description}</p>
            <a href="/KarthikeyanRV_Resume.pdf" target="_blank" rel="noreferrer" className={styles.primaryButton}>
              Download CV
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.aboutGrid}>
          <div className={styles.infoCard}>
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
                <dd>karthikeyan.rv.portfolio@gmail.com</dd>
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
          </div>
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
              const mappedProject = experienceProjectMap[index] ?? projects[0];
              const activeIndex = experienceImageIndex[index] ?? 0;
              const imageCount = mappedProject.projectImages.length;
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
                      </div>
                    </div>
                    <span>{item.start} - {item.end}</span>
                  </summary>

                  <div className={styles.experienceBody}>
                    <p>{item.description}</p>
                    <div className={styles.inlineCarousel}>
                      <div className={styles.carouselImageWrap}>
                        <Image
                          src={`/resources/images/projects/${mappedProject.projectImages[activeIndex]}`}
                          alt={`${mappedProject.title} preview ${activeIndex + 1}`}
                          fill
                          sizes="(max-width: 900px) 90vw, 28vw"
                          className={styles.carouselImage}
                        />
                      </div>
                      <div className={styles.carouselControls}>
                        <button type="button" onClick={() => previousExperienceImage(index, imageCount)}>Prev</button>
                        <span>{activeIndex + 1}/{imageCount}</span>
                        <button type="button" onClick={() => nextExperienceImage(index, imageCount)}>Next</button>
                      </div>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>My specializations</h2>
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
          {projects.map((project) => (
            <article key={project.title} className={styles.projectCard}>
              <a href={project.url} target="_blank" rel="noreferrer">
                <div className={styles.projectImageWrap}>
                  <Image
                    src={`/resources/images/projects/${project.projectImages[0]}`}
                    alt={project.title}
                    fill
                    sizes="(max-width: 900px) 92vw, 46vw"
                    className={styles.projectImage}
                  />
                </div>
                <div className={styles.projectText}>
                  <h3>{project.title}</h3>
                  <p>{project.role}</p>
                  <span>{project.start} - {project.end}</span>
                </div>
              </a>
            </article>
          ))}
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
          <h2 className={styles.sectionHeading}>Let&apos;s connect</h2>
          <p className={styles.bodyText}>Email: karthikeyan.rv.portfolio@gmail.com</p>
          <div className={styles.contactLinks}>
            <a href={about.linkedInLink} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={githubLink} target="_blank" rel="noreferrer">GitHub</a>
            <a href="/KarthikeyanRV_Resume.pdf" target="_blank" rel="noreferrer">CV</a>
          </div>
        </div>
      </section>
    </main>
  );
}
