import { Component, OnInit, OnDestroy, signal, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { PROJECTS_DATA } from "../../data/projects.data";
import { HeroSceneComponent } from "../../shared/hero-scene/hero-scene.component";

export interface SkillItem {
  id: string;
  categoryId: "frontend" | "backend" | "database" | "tools" | "extra";
  categoryName: string;
  name: string;
  icon: string;
  application: string;
  points: string[];
  tags: string[];
}

export interface SkillCategoryTab {
  id: "all" | "frontend" | "backend" | "database" | "tools" | "extra";
  label: string;
  icon: string;
  count: number;
}

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, HeroSceneComponent],
  template: `
    <!-- ===== HERO SECTION ===== -->
    <section class="hero" id="hero" aria-labelledby="hero-heading">
      <div class="hero__bg-grid" aria-hidden="true"></div>
      <div class="hero__glow hero__glow--cyan" aria-hidden="true"></div>
      <div class="hero__glow hero__glow--violet" aria-hidden="true"></div>
      <app-hero-scene aria-hidden="true"></app-hero-scene>

      <div class="container">
        <div class="hero__layout">

          <!-- ── LEFT: Hero Content ── -->
          <div class="hero__text">

            <!-- Availability badge -->
            <div class="hero__badge-row">
              <span class="hero__availability" aria-label="Status: otwarty na nowe projekty i współpracę">
                <span class="hero__availability-dot" aria-hidden="true"></span>
                <span class="hero__availability-text">Otwarty na propozycje & projekty</span>
              </span>
            </div>

            <!-- Main headline -->
            <h1 id="hero-heading" class="hero__heading">
              Od pomysłu<br>
              do działającej<br>
              <span class="text-gradient">aplikacji.</span>
            </h1>

            <!-- Specialization badge & subtitle -->
            <div class="hero__spec">
              <span class="hero__spec-badge">Full-Stack Developer</span>
              <span class="hero__spec-motto">Buduję produkty cyfrowe, które rozwiązują realne problemy.</span>
            </div>

            <!-- Dynamic typing line -->
            <div class="hero__typed" aria-live="polite" [attr.aria-label]="'Tworzę: ' + typedText()">
              <span class="hero__typed-prefix">Specjalizacja & pasja:&nbsp;</span>
              <span class="hero__typed-val">
                {{ typedText() }}<span class="hero__cursor" aria-hidden="true">|</span>
              </span>
            </div>

            <!-- Description -->
            <p class="hero__description">
              Rozwijam się w kierunku <strong>Full-Stack Development</strong>, tworząc własne,
              dopracowane aplikacje webowe od podstaw. Łączę nowoczesny, responsywny frontend
              z przemyślaną architekturą backendu i bazami danych. Uczę się przez praktykę
              i skupiam na rozwiązaniach, które naprawdę działają.
            </p>

            <!-- Action buttons (CTAs) -->
            <div class="hero__actions">
              <a
                routerLink="/projects"
                class="btn btn--primary btn--lg"
                id="hero-cta-projects"
                aria-label="Zobacz moje projekty"
              >
                Zobacz projekty
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>

              <a
                href="#about"
                (click)="scrollToAbout($event)"
                class="btn btn--outline btn--lg"
                id="hero-cta-about"
                aria-label="Poznaj mnie - przejście do sekcji o mnie"
              >
                Poznaj mnie
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
              </a>
            </div>

            <!-- Social links -->
            <div class="hero__social" role="list" aria-label="Profile i serwisy społecznościowe">
              <a
                href="https://github.com/KonradOpenSource"
                target="_blank"
                rel="noopener noreferrer"
                class="hero__social-btn"
                id="hero-github"
                role="listitem"
                aria-label="Profil GitHub (otwiera się w nowej karcie)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/konrad-studziński"
                target="_blank"
                rel="noopener noreferrer"
                class="hero__social-btn"
                id="hero-linkedin"
                role="listitem"
                aria-label="Profil LinkedIn (otwiera się w nowej karcie)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>

            <!-- Stack tags -->
            <div class="hero__stack" role="list" aria-label="Główne technologie">
              @for (tech of techStack; track tech) {
                <span class="badge" role="listitem">{{ tech }}</span>
              }
            </div>

          </div>

          <!-- ── RIGHT: Interactive Developer Card ── -->
          <aside class="hero__card" aria-label="Wizytówka techniczna developera">
            <div class="hero__card-terminal">
              <div class="hero__card-dots" aria-hidden="true">
                <span class="hero__card-dot hero__card-dot--red"></span>
                <span class="hero__card-dot hero__card-dot--yellow"></span>
                <span class="hero__card-dot hero__card-dot--green"></span>
              </div>
              <span class="hero__card-filename">konrad.config.ts</span>
            </div>

            <div class="hero__card-code">
              <pre><code><span class="c-kw">const</span> <span class="c-var">developer</span> <span class="c-op">=</span> &#123;
  <span class="c-key">name</span><span class="c-op">:</span>       <span class="c-str">'Konrad Studziński'</span><span class="c-op">,</span>
  <span class="c-key">focus</span><span class="c-op">:</span>      <span class="c-str">'Full-Stack Development'</span><span class="c-op">,</span>
  <span class="c-key">methodology</span><span class="c-op">:</span><span class="c-str">'Learning by building'</span><span class="c-op">,</span>
  <span class="c-key">openToWork</span><span class="c-op">:</span> <span class="c-bool">true</span><span class="c-op">,</span>
  <span class="c-key">corePillars</span><span class="c-op">:</span> <span class="c-op">[</span>
    <span class="c-str">'Modern Frontend'</span><span class="c-op">,</span>
    <span class="c-str">'Scalable Backend'</span><span class="c-op">,</span>
    <span class="c-str">'Databases (SQL)'</span><span class="c-op">,</span>
    <span class="c-str">'Tools & DevOps'</span><span class="c-op">,</span>
  <span class="c-op">],</span>
&#125;<span class="c-op">;</span></code></pre>
            </div>

            <!-- Status bar in card -->
            <div class="hero__card-status">
              <span class="hero__card-status-dot" aria-hidden="true"></span>
              <div class="hero__card-status-info">
                <span class="hero__card-status-main">Gotowy na wyzwania</span>
                <span class="hero__card-status-sub">Nowe projekty i współpraca</span>
              </div>
            </div>

            <!-- 4 Key Areas badges -->
            <div class="hero__card-areas">
              <span class="hero__card-area-title">Obszary rozwoju:</span>
              <ul class="hero__card-area-list" aria-label="Główne obszary">
                @for (item of keyAreas; track item.label) {
                  <li class="hero__card-area-item">
                    <span aria-hidden="true">{{ item.icon }}</span>
                    <span>{{ item.label }}</span>
                  </li>
                }
              </ul>
            </div>
          </aside>

        </div>

        <!-- Scroll down indicator -->
        <div class="hero__scroll" aria-hidden="true">
          <a href="#about" (click)="scrollToAbout($event)" class="hero__scroll-link" aria-label="Przewiń w dół do sekcji O mnie">
            <span class="hero__scroll-text">scroll</span>
            <div class="hero__scroll-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- ===== ABOUT ME SECTION ===== -->
    <section class="section about-section" id="about" aria-labelledby="about-heading">
      <div class="container">

        <!-- Section Heading -->
        <div class="section-heading">
          <p class="section-heading__label">
            <span aria-hidden="true">// </span>O mnie
          </p>
          <h2 id="about-heading" class="section-heading__title">Rozwój przez budowanie i praktykę</h2>
          <p class="section-heading__description">
            Tworzę aplikacje webowe od zera — łącząc nowoczesny frontend z solidnym backendem,
            przemyślaną architekturą i wysoką dbałością o jakość kodu.
          </p>
        </div>

        <!-- Main About Grid: Bio + 4 Pillars -->
        <div class="about-section__grid">

          <!-- Left Column: Narrative Card -->
          <article class="about-section__narrative card">
            <div class="card__body">
              <div class="about-section__header-meta">
                <div class="about-section__avatar-mini" aria-hidden="true">KS</div>
                <div>
                  <h3 class="about-section__name">Konrad Studziński</h3>
                  <p class="about-section__role">Rozwijający się Full-Stack Developer</p>
                </div>
              </div>

              <div class="about-section__paragraphs">
                <p>
                  Moja droga do programowania opiera się na <strong>praktycznym rozwiązywaniu problemów</strong>.
                  Zamiast ograniczać się do tutoriali, tworzę własne, kompletne aplikacje webowe od pierwszego
                  szkicu po wdrożenie.
                </p>
                <p>
                  Interesuje mnie pełny cykl życia produktu cyfrowego: jak zaprojektować intuicyjny,
                  dostępny interfejs, jak ułożyć architekturę komponentów, by kod był modułowy i czytelny,
                  oraz jak zbudować niezawodny backend z poprawnym modelowaniem danych.
                </p>
                <p>
                  Wierzę, że najlepszy kod to taki, który jest nie tylko elegancki technologicznie,
                  ale przede wszystkim <strong>rozwiązuje rzeczywiste potrzeby użytkowników</strong>.
                </p>
              </div>

              <!-- Practical Principles -->
              <div class="about-section__principles">
                <h4 class="about-section__principles-title">Moje zasady pracy:</h4>
                <div class="about-section__principle-item">
                  <span class="about-section__principle-icon" aria-hidden="true">🚀</span>
                  <div>
                    <strong>Praktyka ponad teorię</strong>
                    <p>Każdy projekt to poligon dla nowo poznanych technologii i wzorców.</p>
                  </div>
                </div>
                <div class="about-section__principle-item">
                  <span class="about-section__principle-icon" aria-hidden="true">📐</span>
                  <div>
                    <strong>Myślenie architektoniczne</strong>
                    <p>Czysty podział na warstwy, unikanie niepotrzebnej złożoności.</p>
                  </div>
                </div>
                <div class="about-section__principle-item">
                  <span class="about-section__principle-icon" aria-hidden="true">♿</span>
                  <div>
                    <strong>Dostępność i estetyka</strong>
                    <p>Dbałość o a11y, semantykę HTML, kontrast i dopracowany design system.</p>
                  </div>
                </div>
              </div>

              <div class="about-section__actions">
                <a routerLink="/about" class="btn btn--primary" aria-label="Zobacz pełną podstronę o mnie">
                  Poznaj całą moją drogę
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <a routerLink="/contact" class="btn btn--outline" aria-label="Przejdź do danych kontaktowych">
                  Porozmawiajmy
                </a>
              </div>
            </div>
          </article>

          <!-- Right Column: 4 Pillars of Competence -->
          <div class="about-section__pillars" role="list" aria-label="Główne filary techniczne">

            @for (pillar of pillars; track pillar.title) {
              <article class="pillar-card card" role="listitem">
                <div class="card__body">
                  <div class="pillar-card__top">
                    <span class="pillar-card__icon" aria-hidden="true">{{ pillar.icon }}</span>
                    <span class="pillar-card__badge">{{ pillar.badge }}</span>
                  </div>
                  <h3 class="pillar-card__title">{{ pillar.title }}</h3>
                  <p class="pillar-card__desc">{{ pillar.description }}</p>
                  <ul class="pillar-card__points" aria-label="Kluczowe zagadnienia">
                    @for (pt of pillar.points; track pt) {
                      <li>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{{ pt }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </article>
            }

          </div>

        </div>

      </div>
    </section>

    <!-- ===== SKILLS & TOOLS SECTION (ETAP 4) ===== -->
    <section class="section skills-section" id="skills" aria-labelledby="skills-heading">
      <div class="container">

        <!-- Section Heading -->
        <div class="section-heading">
          <p class="section-heading__label">
            <span aria-hidden="true">// </span>Umiejętności & Narzędzia
          </p>
          <h2 id="skills-heading" class="section-heading__title">Mój warsztat technologiczny</h2>
          <p class="section-heading__description">
            Technologie i narzędzia potwierdzone w moich projektach — uporządkowane w czytelne grupy,
            z naciskiem na ich praktyczne zastosowanie w kodzie.
          </p>
        </div>

        <!-- Category Tabs Filter -->
        <nav class="skills-tabs" role="tablist" aria-label="Filtruj umiejętności według kategorii">
          @for (tab of skillTabs; track tab.id) {
            <button
              type="button"
              role="tab"
              class="skills-tabs__btn"
              [class.skills-tabs__btn--active]="activeSkillCategory() === tab.id"
              [attr.aria-selected]="activeSkillCategory() === tab.id"
              (click)="selectCategory(tab.id)"
              [id]="'tab-' + tab.id"
            >
              <span class="skills-tabs__icon" aria-hidden="true">{{ tab.icon }}</span>
              <span class="skills-tabs__label">{{ tab.label }}</span>
              <span class="skills-tabs__count">{{ tab.count }}</span>
            </button>
          }
        </nav>

        <!-- Category Info Bar -->
        <div class="skills-info-bar">
          <span class="skills-info-bar__icon" aria-hidden="true">💡</span>
          <p class="skills-info-bar__text">
            <strong>Praktyczne zastosowanie:</strong>
            {{ currentCategorySummary() }}
          </p>
        </div>

        <!-- Skills Grid: No percentage bars! Aesthetic cards with practical application -->
        <div class="skills-grid" role="list" aria-label="Lista umiejętności i technologii">
          @for (skill of visibleSkills(); track skill.id) {
            <article class="skill-card card" role="listitem">
              <div class="card__body">

                <!-- Card Header -->
                <div class="skill-card__header">
                  <div class="skill-card__icon-box" aria-hidden="true">
                    <span>{{ skill.icon }}</span>
                  </div>
                  <div class="skill-card__meta">
                    <span class="skill-card__category">{{ skill.categoryName }}</span>
                    <h3 class="skill-card__name">{{ skill.name }}</h3>
                  </div>
                </div>

                <!-- Practical Application Description -->
                <div class="skill-card__application">
                  <p class="skill-card__application-text">
                    {{ skill.application }}
                  </p>
                </div>

                <!-- Practical Competence Points -->
                <ul class="skill-card__points" aria-label="Kluczowe umiejętności w projektach">
                  @for (pt of skill.points; track pt) {
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{{ pt }}</span>
                    </li>
                  }
                </ul>

                <!-- Tags footer -->
                <div class="skill-card__tags" role="list" [attr.aria-label]="skill.name + ' - technologie'">
                  @for (tag of skill.tags; track tag) {
                    <span class="skill-card__tag" role="listitem">{{ tag }}</span>
                  }
                </div>

              </div>
            </article>
          }
        </div>

      </div>
    </section>

    <!-- ===== FEATURED PROJECTS ===== -->
    <section class="section featured" id="featured-projects" aria-labelledby="featured-heading">
      <div class="container">
        <div class="section-heading">
          <p class="section-heading__label">
            <span aria-hidden="true">// </span>Portfolio
          </p>
          <h2 id="featured-heading" class="section-heading__title">Wybrane projekty</h2>
          <p class="section-heading__description">
            Aplikacje, które stworzyłem, rozwiązując konkretne wyzwania technologiczne.
          </p>
        </div>

        <div class="featured__grid">
          @for (project of featuredProjects; track project.title) {
            <article class="featured__card" [class.featured__card--large]="$index === 0">
              <div class="featured__card-image" aria-hidden="true">
                <div class="featured__card-image-inner" [style.background]="project.gradient"></div>
                <div class="featured__card-image-label" aria-hidden="true">{{ project.emoji }}</div>
              </div>
              <div class="featured__card-body">
                <div class="featured__card-tags" role="list" [attr.aria-label]="'Technologie: ' + project.tags.join(', ')">
                  @for (tag of project.tags; track tag) {
                    <span class="badge" role="listitem">{{ tag }}</span>
                  }
                </div>
                <h3 class="featured__card-title">{{ project.title }}</h3>
                <p class="featured__card-desc">{{ project.description }}</p>
                <a [routerLink]="['/projects', project.slug]" class="btn btn--ghost" [attr.aria-label]="'Szczegóły projektu ' + project.title">
                  Szczegóły
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </article>
          }
        </div>

        <div class="featured__more">
          <a routerLink="/projects" class="btn btn--outline btn--lg" id="home-all-projects-link" aria-label="Zobacz wszystkie projekty">
            Zobacz wszystkie projekty
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- ===== CTA BANNER ===== -->
    <section class="section cta-section" aria-labelledby="cta-heading">
      <div class="container">
        <div class="cta-banner">
          <div class="cta-banner__glow" aria-hidden="true"></div>
          <p class="section-label" aria-hidden="true">// Współpraca</p>
          <h2 id="cta-heading" class="cta-banner__title">
            Have a project in mind? Let's build something meaningful.
          </h2>
          <p class="cta-banner__desc">
            Chętnie porozmawiam o Twoim pomyśle i możliwościach współpracy.
          </p>
          <div class="cta-banner__actions">
            <a href="mailto:konradgo23@gmail.com" class="btn btn--primary btn--lg" id="home-cta-contact" aria-label="Napisz do mnie na adres konradgo23@gmail.com">
              Skontaktuj się
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="https://github.com/KonradOpenSource" target="_blank" rel="noopener noreferrer" class="btn btn--outline btn--lg" aria-label="Profil GitHub KonradOpenSource">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/konrad-studziński" target="_blank" rel="noopener noreferrer" class="btn btn--outline btn--lg" aria-label="Profil LinkedIn Konrada">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly titleService = inject(Title);
  protected typedText = signal("");
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;
  private motionPreference?: MediaQueryList;

  private readonly PHRASES = [
    "aplikacje webowe od zera",
    "responsywny, nowoczesny frontend",
    "wydajne backendy i REST API",
    "kod, który rozwiązuje realne problemy",
  ];

  techStack = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "SEO",
    "RWD",
    "BEM",
    "ITCSS",
    "Sass/SCSS",
    "WordPress",
    "Git",
    "TypeScript",
    "Fetch API",
    "REST API",
    "Angular",
    "RxJS",
    "Angular Material",
    "SPA",
    "Node.js (podstawy)",
    "Java",
    "Spring",
    "Docker",
    "PostgreSQL",
    "Maven",
    "Nginx",
    "SQL",
    "Testy (Jasmine, Karma, JUnit)",
    "Microsoft Azure",
    "AI tools (GitHub Copilot, Windsurf)",
    "CI/CD (GitHub Actions)",
    "Swagger",
  ];

  keyAreas = [
    { icon: "🖥️", label: "Frontend & UI/UX" },
    { icon: "⚙️", label: "Backend & REST API" },
    { icon: "🗄️", label: "Bazy danych & SQL" },
    { icon: "🛠️", label: "Narzędzia & Docker" },
  ];

  pillars = [
    {
      icon: "🎨",
      badge: "User Interface",
      title: "Frontend & Doświadczenie użytkownika",
      description: "Tworzenie intuicyjnych, estetycznych interfejsów opartych na nowoczesnym Angularze i TypeScript.",
      points: [
        "Reaktywność z Angular Signals i nowoczesnymi wzorcami",
        "Dostępność (a11y), semantyczny HTML5 i wysoki kontrast",
        "Płynny, w pełni responsywny layout (Mobile First)",
      ],
    },
    {
      icon: "⚙️",
      badge: "Server & Data",
      title: "Backend & Integracja danych",
      description: "Projektowanie stabilnej warstwy serwerowej w Node.js i Java ze Springiem, integracji z bazami SQL oraz przygotowanie aplikacji z użyciem Dockera, Mavena i Nginx.",
      points: [
        "Budowa REST API w środowisku Node.js i Express oraz z użyciem Java i Spring",
        "Modelowanie danych i relacyjne bazy PostgreSQL oraz SQL",
        "Budowanie i uruchamianie aplikacji z użyciem Maven, Docker i Nginx",
        "Walidacja danych wejściowych, autoryzacja i bezpieczeństwo",
      ],
    },
    {
      icon: "🏗️",
      badge: "Scalability",
      title: "Architektura aplikacji",
      description: "Dbanie o uporządkowaną i skalowalną strukturę projektu od pierwszej linijki kodu.",
      points: [
        "Modułowość i izolacja odpowiedzialności komponentów",
        "Separacja logiki biznesowej od warstwy prezentacji",
        "Utrzymywalny kod gotowy na rozbudowę o nowe funkcjonalności",
      ],
    },
    {
      icon: "🛡️",
      badge: "Clean Code",
      title: "Jakość kodu & Standardy",
      description: "Tworzenie kodu, który jest czytelny, bezpieczny typologicznie i łatwy w refaktoryzacji.",
      points: [
        "Ścisłe typowanie w TypeScript bez niepotrzebnych kompromisów",
        "Czytelne konwencje nazewnicze i zasady Clean Code",
        "Dbałość o optymalizację wydajności renderowania i bundle size",
      ],
    },
  ];

  
  protected activeSkillCategory = signal<"all" | "frontend" | "backend" | "database" | "tools" | "extra">("all");

  allSkills: SkillItem[] = [
   
    {
      id: "fe-angular",
      categoryId: "frontend",
      categoryName: "Frontend",
      name: "Angular & Signals",
      icon: "⚡",
      application: "Projektowanie modularnych architektur opartych o Standalone Components, reaktywne zarządzanie stanem (Signals) oraz płynny routing.",
      points: [
        "Komponenty Standalone i nowoczesny Control Flow (@if, @for)",
        "Zarządzanie stanem i reaktywny przepływ z Signals i computed",
        "Zaawansowany routing z lazy-loadingiem modułów i stron",
      ],
      tags: ["Angular", "Signals", "Standalone", "Routing"],
    },
    {
      id: "fe-typescript",
      categoryId: "frontend",
      categoryName: "Frontend",
      name: "TypeScript w warstwie UI",
      icon: "📘",
      application: "Ścisłe typowanie modeli domenowych, kontraktów odpowiedzi API i propsów komponentów, eliminujące błędy już na etapie kompilacji.",
      points: [
        "Interfejsy, typy unijne, generyki i strażnicy typów (Type Guards)",
        "Zero kompromisów z typem any — ścisła konfiguracja tsconfig",
        "Bezpieczna transformacja danych pomiędzy backendem a UI",
      ],
      tags: ["TypeScript", "Generics", "Strict Type Safety"],
    },
    {
      id: "fe-scss",
      categoryId: "frontend",
      categoryName: "Frontend",
      name: "Nowoczesny SCSS & Design System",
      icon: "🎨",
      application: "Tworzenie skalowalnych architektur styli z wykorzystaniem tokenów projektowych, mixinów oraz w pełni responsywnych siatek CSS.",
      points: [
        "Architektura tokenów: palety kolorów, typografia, spacing, glowy",
        "Layouty Mobile First oparte o CSS Grid i Flexbox",
        "Efekty glassmorphism, neon-borders i płynne mikroanimacje",
      ],
      tags: ["SCSS", "CSS Grid", "Flexbox", "Mobile First", "Design Tokens"],
    },
    {
      id: "fe-forms",
      categoryId: "frontend",
      categoryName: "Frontend",
      name: "Formularze & Reaktywna Walidacja",
      icon: "📝",
      application: "Budowa zaawansowanych formularzy użytkownika z dynamiczną walidacją synchroniczną, czytelnymi komunikatami błędów i stanami UX.",
      points: [
        "Reaktywne formularze z walidatorami synchronicznymi",
        "Wizualne stany pól (focus, error, success, pristine/touched)",
        "Dostępne etykiety formularzy powiązane z atrybutami ARIA",
      ],
      tags: ["Forms", "Walidacja", "FormGroup", "User Experience"],
    },
    {
      id: "fe-api-integration",
      categoryId: "frontend",
      categoryName: "Frontend",
      name: "Integracja REST API & Stan Sieci",
      icon: "🌐",
      application: "Wydajna komunikacja HTTP z backendem, transformacja odpowiedzi JSON, obsługa stanów ładowania (spinners) oraz bezpieczna obsługa błędów.",
      points: [
        "Klient HTTP w Angularze z interfejsami odpowiedzi",
        "Zarządzanie stanami asynchronicznymi (loading, success, error)",
        "Przechwytywanie wyjątków sieciowych i obsługa fallbacków",
      ],
      tags: ["HttpClient", "REST Integration", "Error Handling", "Async State"],
    },
    {
      id: "fe-a11y",
      categoryId: "frontend",
      categoryName: "Frontend",
      name: "Dostępność (a11y) & Semantyka HTML5",
      icon: "♿",
      application: "Projektowanie kodu zorientowanego na każdego użytkownika: poprawna semantyka HTML, hierarchia nagłówków i nawigacja klawiaturą.",
      points: [
        "Semantyczne znaczniki: main, nav, section, article, header, footer",
        "Atrybuty ARIA (aria-label, aria-labelledby, aria-hidden)",
        "Widoczne stany focus-visible oraz wysoki kontrast WCAG",
      ],
      tags: ["WCAG 2.1", "HTML5 Semantics", "Keyboard Nav", "ARIA"],
    },

    // 2. BACKEND
    {
      id: "be-nodejs",
      categoryId: "backend",
      categoryName: "Backend",
      name: "Node.js & Express",
      icon: "⚙️",
      application: "Projektowanie wydajnych, modułowych serwerów HTTP obsługujących logikę biznesową aplikacji oraz komunikację z klientem, a także poznawanie backendu Java ze Springiem, baz SQL i narzędzi wdrożeniowych.",
      points: [
        "Modularny routing z podziałem na routery domenowe",
        "Asynchroniczna obsługa zapytań (async/await) z obsługą błędów",
        "Konfiguracja nagłówków bezpieczeństwa i middleware'ów",
        "Podstawy backendu Java i Spring oraz pracy z bazami SQL",
        "Poznawanie narzędzi budowania i wdrażania: Maven, Docker i Nginx",
      ],
      tags: ["Node.js", "Express", "Java", "Spring", "SQL", "Maven", "Docker", "Nginx", "Modular Routing", "Asynchronous JS"],
    },
    {
      id: "be-rest",
      categoryId: "backend",
      categoryName: "Backend",
      name: "Projektowanie REST API",
      icon: "📡",
      application: "Tworzenie uporządkowanych punktów końcowych (endpoints) zgodnie z zasadami REST, z precyzyjnymi kodami statusów HTTP.",
      points: [
        "Spójne konwencje nazewnictwa zasobów i metody HTTP (GET, POST, PUT, DELETE)",
        "Kody odpowiedzi: 200 OK, 201 Created, 400 Bad Request, 401, 404, 500",
        "Parametry zapytań (query params) dla filtrowania, sortowania i paginacji",
      ],
      tags: ["REST Architecture", "CRUD", "HTTP Status Codes", "Pagination"],
    },
    {
      id: "be-business-logic",
      categoryId: "backend",
      categoryName: "Backend",
      name: "Logika Biznesowa & Serwisy",
      icon: "🏗️",
      application: "Architektura trójwarstwowa oddzielająca przyjmowanie zapytań (Controllers), przetwarzanie reguł (Services) i operacje na bazie (Repositories).",
      points: [
        "Separacja odpowiedzialności ułatwiająca testowanie i rozwój",
        "Izolacja reguł domenowych od warstwy protokołu HTTP",
        "Czysty, modularny kod bez duplikacji logiki biznesowej",
      ],
      tags: ["Layered Architecture", "Business Logic", "Service Pattern"],
    },
    {
      id: "be-validation",
      categoryId: "backend",
      categoryName: "Backend",
      name: "Walidacja Danych Wejściowych",
      icon: "🛡️",
      application: "Weryfikacja integralności i typów danych przychodzących z zewnątrz przed przekazaniem ich do bazy danych.",
      points: [
        "Walidacja ciał zapytań (payload validation) i parametrów URL",
        "Natychmiastowe odrzucanie niepoprawnych danych z czytelnym komunikatem 400",
        "Ochrona przed wstrzykiwaniem nieoczekiwanych pól do encji",
      ],
      tags: ["Data Validation", "Payload Sanitization", "Defensive Coding"],
    },
    {
      id: "be-errors",
      categoryId: "backend",
      categoryName: "Backend",
      name: "Obsługa Błędów & Middleware",
      icon: "🚨",
      application: "Centralny mechanizm wychwytywania wyjątków serwerowych gwarantujący spójne odpowiedzi JSON i brak wycieku wrażliwych danych.",
      points: [
        "Globalny middleware przechwytujący błędy synchroniczne i asynchroniczne",
        "Jednolity format odpowiedzi błędu: timestamp, kod, czytelny komunikat",
        "Logowanie błędów w konsoli serwera dla łatwiejszego debugowania",
      ],
      tags: ["Error Middleware", "Exception Handling", "Logging"],
    },

    
    {
      id: "db-postgresql",
      categoryId: "database",
      categoryName: "Bazy danych",
      name: "PostgreSQL & Relacyjny SQL",
      icon: "🐘",
      application: "Projektowanie relacyjnych schematów baz danych z odpowiednimi typami kolumn, kluczami głównymi (PK) i obcymi (FK).",
      points: [
        "Definiowanie tabel i precyzyjnych typów (UUID, VARCHAR, TIMESTAMP, JSONB)",
        "Więzy integralności: NOT NULL, UNIQUE, CHECK constraints",
        "Zarządzanie połączeniami (Connection Pooling) w aplikacjach Node.js",
      ],
      tags: ["PostgreSQL", "Relational Schema", "Primary Keys", "Foreign Keys"],
    },
    {
      id: "db-relations",
      categoryId: "database",
      categoryName: "Bazy danych",
      name: "Modelowanie Relacji Danych",
      icon: "🔗",
      application: "Właściwe odwzorowywanie struktur rzeczywistego świata w powiązaniach między tabelami bazy danych.",
      points: [
        "Relacje 1:1, 1:N (jeden-do-wielu) oraz tabele łączące dla M:N (wiele-do-wielu)",
        "Klucze obce z poprawną polityką usuwania (CASCADE / SET NULL / RESTRICT)",
        "Unikanie redundancji i anomalii poprzez normalizację schematu",
      ],
      tags: ["Data Modeling", "1:N & M:N Relations", "Schema Normalization"],
    },
    {
      id: "db-queries",
      categoryId: "database",
      categoryName: "Bazy danych",
      name: "SQL & Optymalizacja Zapytań",
      icon: "🔍",
      application: "Pisanie efektywnych zapytań pobierających dokładnie te dane, które są wymagane przez interfejs użytkownika.",
      points: [
        "Zapytania z JOIN (INNER, LEFT) do łączenia powiązanych tabel",
        "Filtrowanie (WHERE), sortowanie (ORDER BY) oraz paginacja (LIMIT / OFFSET)",
        "Tworzenie indeksów (B-tree) na często wyszukiwanych kolumnach",
      ],
      tags: ["SQL", "JOINs", "Aggregation", "Indexing", "Query Optimization"],
    },
    {
      id: "db-integrity",
      categoryId: "database",
      categoryName: "Bazy danych",
      name: "Integralność Danych & Transakcje",
      icon: "🔒",
      application: "Zapewnienie spójności wieloetapowych operacji bazodanowych za pomocą mechanizmów transakcyjnych ACID.",
      points: [
        "Wykonywanie operacji w transakcjach (BEGIN, COMMIT, ROLLBACK)",
        "Gwarancja atomowości: wszystkie kroki kończą się sukcesem lub żaden",
        "Ochrona danych biznesowych (np. stan zamówienia, zmiana salda, powiązania)",
      ],
      tags: ["ACID Transactions", "Data Integrity", "Atomic Operations"],
    },

    // 4. NARZĘDZIA
    {
      id: "tool-git",
      categoryId: "tools",
      categoryName: "Narzędzia",
      name: "Git & GitHub",
      icon: "🐙",
      application: "Profesjonalna kontrola wersji, praca w zespole, zarządzanie historią zmian i code review w serwisie GitHub.",
      points: [
        "Praca na gałęziach funkcyjnych (feature branches) i merge bez konfliktów",
        "Standard Conventional Commits (feat, fix, refactor, docs, chore)",
        "Przeglądy kodu (Pull Requests) i organizacja zadań (Issues)",
      ],
      tags: ["Git", "GitHub", "Branching", "Conventional Commits", "PR Review"],
    },
    {
      id: "tool-docker",
      categoryId: "tools",
      categoryName: "Narzędzia",
      name: "Docker & Konteneryzacja",
      icon: "🐳",
      application: "Lokalne konteneryzowanie usług pomocniczych (np. bazy PostgreSQL) zapewniające czyste, powtarzalne środowisko pracy.",
      points: [
        "Uruchamianie kontenerów baz danych i aplikacji z docker-compose",
        "Definiowanie wolumenów dla trwałego przechowywania danych (volumes)",
        "Izolacja zależności bez zaśmiecania lokalnego systemu operacyjnego",
      ],
      tags: ["Docker", "docker-compose", "Containers", "Dev Environment"],
    },
    {
      id: "tool-postman",
      categoryId: "tools",
      categoryName: "Narzędzia",
      name: "Testowanie API (Postman / Insomnia)",
      icon: "🚀",
      application: "Ręczne i automatyczne weryfikowanie endpointów backendowych przed integracją z interfejsem użytkownika.",
      points: [
        "Testowanie metod GET, POST, PUT, DELETE z różnymi payloadami JSON",
        "Weryfikacja nagłówków autoryzacyjnych (Bearer Token) i statusów HTTP",
        "Tworzenie kolekcji zapytań i zmiennych środowiskowych (Environment vars)",
      ],
      tags: ["Postman", "Insomnia", "API Testing", "Request Payloads"],
    },
    {
      id: "tool-ide-devtools",
      categoryId: "tools",
      categoryName: "Narzędzia",
      name: "Narzędzia IDE & Chrome DevTools",
      icon: "💻",
      application: "Precyzyjne debugowanie kodu frontendowego i backendowego, profilowanie wydajności i kontrola jakości.",
      points: [
        "Debugowanie w Chrome DevTools: Network tab, Console, Elements, Memory",
        "Konfiguracja VS Code: TypeScript language server, lintery i formatowanie",
        "Inspekcja dostępności (Accessibility Tree) i wydajności Core Web Vitals",
      ],
      tags: ["Chrome DevTools", "VS Code", "Debugging", "Profiler"],
    },
    {
      id: "tool-build-cli",
      categoryId: "tools",
      categoryName: "Narzędzia",
      name: "Angular CLI, Vite & npm",
      icon: "📦",
      application: "Zarządzanie cyklem życia projektu, instalacja zależności, konfiguracja skryptów budowania i optymalizacja bundla.",
      points: [
        "Zarządzanie zależnościami i wersjami w package.json",
        "Optymalizacja procesu budowania produkcyjnego (tree-shaking, minifikacja)",
        "Szybki dev-server z hot-module-replacement (HMR)",
      ],
      tags: ["npm", "Angular CLI", "Vite", "Build Scripts", "HMR"],
    },

    {
      id: "extra-auth-jwt",
      categoryId: "extra",
      categoryName: "Architektura & Bezpieczeństwo",
      name: "Autoryzacja & Tokeny JWT",
      icon: "🔑",
      application: "Bezstanowe uwierzytelnianie użytkowników w aplikacjach webowych z podziałem na role i zabezpieczaniem tras.",
      points: [
        "Generowanie i weryfikacja tokenów JSON Web Token z czasem wygaśnięcia",
        "Zabezpieczanie tras na frontendzie (Angular Route Guards) i backendzie (Auth middleware)",
        "Bezpieczne przesyłanie tokenu w nagłówku Authorization: Bearer",
      ],
      tags: ["JWT", "Route Guards", "Auth Middleware", "Bearer Tokens"],
    },
    {
      id: "extra-security",
      categoryId: "extra",
      categoryName: "Architektura & Bezpieczeństwo",
      name: "Bezpieczeństwo Aplikacji Webowych",
      icon: "🛡️",
      application: "Stosowanie dobrych praktyk chroniących aplikację i dane użytkowników przed popularnymi wektorami ataków.",
      points: [
        "Ochrona przed XSS poprzez sanitizację danych i mechanizmy Angulara",
        "Poprawna konfiguracja nagłówków CORS na serwerze Express",
        "Haszowanie haseł algorytmem bcrypt przed zapisem do bazy danych",
      ],
      tags: ["CORS", "XSS Prevention", "Bcrypt Hashing", "Web Security"],
    },
    {
      id: "extra-perf",
      categoryId: "extra",
      categoryName: "Architektura & Bezpieczeństwo",
      name: "Optymalizacja Wydajności",
      icon: "⚡",
      application: "Maksymalizacja szybkości ładowania aplikacji i płynności interakcji użytkownika na każdym urządzeniu.",
      points: [
        "Lazy loading modułów i komponentów redukujący początkowy transfer danych",
        "Optymalizacja wielkości paczek produkcyjnych (tree-shaking)",
        "Dobre praktyki renderowania zapobiegające niepotrzebnym cyklom detekcji zmian",
      ],
      tags: ["Performance", "Lazy Loading", "Bundle Budget", "Core Web Vitals"],
    },
    {
      id: "extra-deployment",
      categoryId: "extra",
      categoryName: "Architektura & Bezpieczeństwo",
      name: "Wdrażanie & Zarządzanie Środowiskiem",
      icon: "🚀",
      application: "Przygotowanie aplikacji do uruchomienia produkcyjnego z poprawną obsługą zmiennych środowiskowych.",
      points: [
        "Zarządzanie konfiguracją środowiskową za pomocą zmiennych .env",
        "Wdrażanie aplikacji SPA (Vercel, Netlify) z routingiem fallback",
        "Wdrażanie serwisów backendowych w środowisku chmurowym (Render / Cloud)",
      ],
      tags: ["Deployment", "Environment Variables", "Hosting", "SPA Routing"],
    },
  ];

  skillTabs: SkillCategoryTab[] = [
    { id: "all", label: "Wszystkie", icon: "✨", count: this.allSkills.length },
    { id: "frontend", label: "Frontend", icon: "🎨", count: this.allSkills.filter(s => s.categoryId === "frontend").length },
    { id: "backend", label: "Backend", icon: "⚙️", count: this.allSkills.filter(s => s.categoryId === "backend").length },
    { id: "database", label: "Bazy danych", icon: "🗄️", count: this.allSkills.filter(s => s.categoryId === "database").length },
    { id: "tools", label: "Narzędzia", icon: "🛠️", count: this.allSkills.filter(s => s.categoryId === "tools").length },
    { id: "extra", label: "Architektura & Bezpieczeństwo", icon: "🛡️", count: this.allSkills.filter(s => s.categoryId === "extra").length },
  ];

  visibleSkills = computed(() => {
    const cat = this.activeSkillCategory();
    if (cat === "all") return this.allSkills;
    return this.allSkills.filter((s) => s.categoryId === cat);
  });

  currentCategorySummary = computed(() => {
    switch (this.activeSkillCategory()) {
      case "frontend":
        return "Komponenty Standalone, reaktywny stan z Signals, formularze reaktywne, semantyka HTML5, WCAG i responsywne layouty SCSS.";
      case "backend":
        return "Serwery Node.js / Express, tworzenie REST API, logika biznesowa w serwisach, walidacja payloadów i obsługa błędów.";
      case "database":
        return "Projektowanie tabel PostgreSQL, relacje 1:N oraz M:N, zapytania SQL, transakcje ACID i integralność danych.";
      case "tools":
        return "Praca w Git / GitHub, konteneryzacja w Dockerze, testowanie API w Postmanie, debugowanie w Chrome DevTools i narzędzia CLI.";
      case "extra":
        return "Bezpieczeństwo aplikacji webowych, uwierzytelnianie z tokenami JWT, CORS, ochrona przed XSS i optymalizacja wydajności.";
      default:
        return "Każda technologia w moim portfolio jest poparta konkretnym kodem w autorskich projektach — bez zmyślonych pozycji i bez procentowych pasków.";
    }
  });

  selectCategory(category: "all" | "frontend" | "backend" | "database" | "tools" | "extra"): void {
    this.activeSkillCategory.set(category);
  }

  // ============================================================
  // FEATURED PROJECTS
  // ============================================================
  featuredProjects = PROJECTS_DATA.filter((p) => p.featured).slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.shortDescription,
    tags: p.technologies,
    gradient: p.preview.gradient,
    emoji: p.preview.emoji,
    repoUrl: p.repoUrl,
  }));

  ngOnInit(): void {
    this.titleService.setTitle("Konrad Studziński — Full-Stack Developer & UI/UX Portfolio");
    this.motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.motionPreference.addEventListener("change", this.onMotionPreferenceChange);
    if (this.motionPreference.matches) this.typedText.set(this.PHRASES[0]);
    else this.runTyping();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    this.motionPreference?.removeEventListener("change", this.onMotionPreferenceChange);
  }

  scrollToAbout(event: Event): void {
    event.preventDefault();
    const el = document.getElementById("about");
    if (el) {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth";
      el.scrollIntoView({ behavior, block: "start" });
    }
  }

  private runTyping(): void {
    const current = this.PHRASES[this.phraseIndex];

    if (!this.isDeleting) {
      this.typedText.set(current.substring(0, this.charIndex + 1));
      this.charIndex++;

      if (this.charIndex === current.length) {
        this.typingTimer = setTimeout(() => {
          this.isDeleting = true;
          this.runTyping();
        }, 2200);
        return;
      }
    } else {
      this.typedText.set(current.substring(0, this.charIndex - 1));
      this.charIndex--;

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.PHRASES.length;
      }
    }

    const speed = this.isDeleting ? 40 : 80;
    this.typingTimer = setTimeout(() => this.runTyping(), speed);
  }

  private readonly onMotionPreferenceChange = (): void => {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    this.typingTimer = null;

    if (this.motionPreference?.matches) {
      this.typedText.set(this.PHRASES[0]);
      return;
    }

    this.phraseIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.runTyping();
  };
}
