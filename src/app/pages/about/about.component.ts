import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- ===== ABOUT HERO ===== -->
    <section class="about-hero section" aria-labelledby="about-heading">
      <div class="about-hero__glow" aria-hidden="true"></div>
      <div class="container">
        <div class="about-hero__content">

          <!-- Left Text Column -->
          <div class="about-hero__text">
            <p class="section-label">
              <span aria-hidden="true">// </span>O mnie
            </p>
            <h1 id="about-heading" class="about-hero__heading">
              Rozwój przez budowanie<br>
              i <span class="text-gradient">rozwiązywanie problemów</span>
            </h1>

            <div class="about-hero__tags" role="list" aria-label="Kierunki rozwoju">
              <span class="badge" role="listitem">Full-Stack Development</span>
              <span class="badge" role="listitem">Angular & TypeScript</span>
              <span class="badge" role="listitem">Node.js & PostgreSQL</span>
              <span class="badge" role="listitem">Clean Architecture</span>
            </div>

            <p class="about-hero__bio">
              Jestem deweloperem rozwijającym się w kierunku <strong>Full-Stack Development</strong>.
              Moje podejście do nauki opiera się na ciągłym tworzeniu własnych, kompletnych aplikacji webowych
              od pomysłu i architektury po wdrożenie.
            </p>
            <p class="about-hero__bio">
              Interesuje mnie pełny przekrój technologii: od dopracowanego, dostępnego i estetycznego interfejsu (Frontend),
              przez wydajną komunikację z serwerem i bazami danych (Backend), aż po przemyślaną architekturę
              i wysokie standardy jakości kodu. Rozwijam także umiejętności w obszarze backendu Java i Spring,
              pracy z Dockerem i Mavenem, serwerem Nginx oraz relacyjnymi bazami danych i SQL.
            </p>

            <div class="about-hero__actions">
              <a routerLink="/projects" class="btn btn--primary" aria-label="Zobacz moje projekty">
                Zobacz moje projekty
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a routerLink="/contact" class="btn btn--outline" aria-label="Skontaktuj się ze mną">
                Skontaktuj się
              </a>
            </div>
          </div>

          <!-- Right Avatar Column -->
          <div class="about-hero__avatar" aria-hidden="true">
            <div class="about-hero__avatar-ring">
              <div class="about-hero__avatar-placeholder">KS</div>
            </div>
            <!-- Floating Badges -->
            <div class="about-hero__badge about-hero__badge--top" aria-hidden="true">
              <span>🚀</span> Praktyka ponad teorię
            </div>
            <div class="about-hero__badge about-hero__badge--bottom" aria-hidden="true">
              <span>⚡</span> Clean Code & a11y
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ===== PROJECT EXPERIENCE ===== -->
    <section class="section experience-section" id="experience" aria-labelledby="experience-heading">
      <div class="container">
        <div class="section-heading">
          <p class="section-heading__label">
            <span aria-hidden="true">// </span>Doświadczenie
          </p>
          <h2 id="experience-heading" class="section-heading__title">Praktyka i doświadczenie projektowe</h2>
          <p class="section-heading__description">
            Rozwijam aplikacje w organizacji open-source, pracując nad produktami od architektury
            i struktur danych po integrację, testowanie i przygotowanie do wdrożenia.
          </p>
        </div>

        <article class="experience-card card">
          <div class="card__body">
            <header class="experience-card__header">
              <div>
                <p class="experience-card__eyebrow">Open Source · Kraków / praca zdalna</p>
                <h3 class="experience-card__title">Programista Fullstack</h3>
                <a
                  class="experience-card__organization"
                  href="https://github.com/KonradOpenSource"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/KonradOpenSource
                  <span class="sr-only">(otwiera się w nowej karcie)</span>
                </a>
              </div>
              <span class="experience-card__period">02/2025 – obecnie</span>
            </header>

            <p class="experience-card__summary">
              Programista Fullstack rozwijający aplikacje w Angularze, TypeScript, Javie i Spring Boot.
              Od ponad roku prowadzę organizację open-source na GitHubie, gdzie z zespołem pracuję
              nad autorskimi produktami w pełnym cyklu życia — od architektury po wdrożenie.
            </p>

            <ul class="experience-card__highlights">
              <li>
                Zaprojektowałem i wdrożyłem 8 aplikacji internetowych typu full-stack, m.in. system
                helpdesk, portfel kryptowalutowy oraz system śledzenia kandydatów.
              </li>
              <li>
                Budowałem REST API obejmujące uwierzytelnianie JWT, aktualizacje przez WebSockety
                oraz rate limiting.
              </li>
              <li>
                Tworzyłem testy jednostkowe i integracyjne z użyciem Jasmine, Karma, Vitest i JUnit.
              </li>
              <li>
                Konfigurowałem potoki CI/CD w GitHub Actions do automatyzacji budowania,
                testowania i wdrażania aplikacji.
              </li>
              <li>
                Prowadziłem przeglądy kodu, projektowałem architekturę, utrzymywałem repozytoria
                i dokumentowałem API w Swaggerze, wspierając współpracę zespołu.
              </li>
            </ul>

            <div class="experience-card__footer">
              <span class="experience-card__stat">
                <strong>8</strong>
                <span>projektów full-stack</span>
              </span>
              <span class="experience-card__stat">
                <strong>20+</strong>
                <span>technologii</span>
              </span>
              <span class="experience-card__tools">
                Angular · TypeScript · Java · Spring Boot · GitHub Actions · Swagger
              </span>
            </div>

            <p class="experience-card__learning">
              Obecnie rozwijam umiejętności w zakresie narzędzi AI (GitHub Copilot, Devin)
              oraz podstaw chmury Microsoft Azure.
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- ===== MY APPROACH ===== -->
    <section class="section approach-section" id="my-approach" aria-labelledby="approach-heading">
      <div class="container">
        <div class="section-heading">
          <p class="section-heading__label">
            <span aria-hidden="true">// </span>My Approach
          </p>
          <h2 id="approach-heading" class="section-heading__title">Praktyczne podejście do tworzenia aplikacji</h2>
          <p class="section-heading__description">
            Etapy pracy nad aplikacją — od zrozumienia problemu do przygotowania rozwiązania na dalszy rozwój.
          </p>
        </div>

        <ol class="approach-steps" aria-label="Etapy pracy nad aplikacją">
          @for (step of approachSteps; track step.number) {
            <li class="approach-step">
              <span class="approach-step__number" aria-hidden="true">{{ step.number }}</span>
              <div class="approach-step__content">
                <h3 class="approach-step__title">{{ step.title }}</h3>
                <p class="approach-step__description">{{ step.description }}</p>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>

    <!-- ===== 4 PILLARS OF COMPETENCE ===== -->
    <section class="section pillars-section" id="pillars" aria-labelledby="pillars-heading">
      <div class="container">
        <div class="section-heading">
          <p class="section-heading__label">
            <span aria-hidden="true">// </span>Kompetencje & Zainteresowania
          </p>
          <h2 id="pillars-heading" class="section-heading__title">Cztery filary mojego warsztatu</h2>
          <p class="section-heading__description">
            Obszary, na których koncentruję się przy tworzeniu każdej aplikacji webowej — od interfejsu,
            przez backend w Java i Spring, po konteneryzację Dockerem, Maven, Nginx oraz bazy danych SQL.
          </p>
        </div>

        <div class="pillars-grid" role="list">
          @for (pillar of pillars; track pillar.title) {
            <article class="pillar-box card" role="listitem">
              <div class="card__body">
                <div class="pillar-box__header">
                  <span class="pillar-box__icon" aria-hidden="true">{{ pillar.icon }}</span>
                  <span class="pillar-box__tag">{{ pillar.tag }}</span>
                </div>
                <h3 class="pillar-box__title">{{ pillar.title }}</h3>
                <p class="pillar-box__desc">{{ pillar.description }}</p>

                <ul class="pillar-box__list" aria-label="Szczegóły">
                  @for (point of pillar.points; track point) {
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{{ point }}</span>
                    </li>
                  }
                </ul>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- ===== LEARNING & PROJECT MILESTONES ===== -->
    <section class="section milestones" id="milestones" aria-labelledby="milestones-heading">
      <div class="container">
        <div class="section-heading">
          <p class="section-heading__label">
            <span aria-hidden="true">// </span>Ścieżka rozwoju
          </p>
          <h2 id="milestones-heading" class="section-heading__title">Jak zdobywam i utrwalam wiedzę</h2>
          <p class="section-heading__description">
            Moja droga opiera się na samodzielnych projektach, analizie dokumentacji i rozwiązywaniu realnych problemów programistycznych.
          </p>
        </div>

        <ol class="milestones-timeline" aria-label="Etapy nauki i rozwoju">
          @for (step of milestones; track step.title) {
            <li class="milestones-timeline__item">
              <div class="milestones-timeline__marker" aria-hidden="true"></div>
              <div class="milestones-timeline__content">
                <span class="milestones-timeline__badge">{{ step.stage }}</span>
                <h3 class="milestones-timeline__title">{{ step.title }}</h3>
                <p class="milestones-timeline__desc">{{ step.description }}</p>
                <div class="milestones-timeline__tags" role="list" [attr.aria-label]="'Technologie: ' + step.tech.join(', ')">
                  @for (t of step.tech; track t) {
                    <span class="badge" role="listitem">{{ t }}</span>
                  }
                </div>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>

    <!-- ===== VALUES & PHILOSOPHY ===== -->
    <section class="section values" id="values" aria-labelledby="values-heading">
      <div class="container">
        <div class="section-heading">
          <p class="section-heading__label">
            <span aria-hidden="true">// </span>Filozofia pracy
          </p>
          <h2 id="values-heading" class="section-heading__title">Zasady, którymi się kieruję</h2>
        </div>

        <div class="values__grid" role="list">
          @for (value of values; track value.title) {
            <article class="values__card card" role="listitem">
              <div class="card__body">
                <div class="values__icon" aria-hidden="true">{{ value.icon }}</div>
                <h3 class="values__title">{{ value.title }}</h3>
                <p class="values__desc">{{ value.description }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: "./about.component.scss",
})
export class AboutComponent {
  private readonly titleService = inject(Title);

  constructor() {
    this.titleService.setTitle("O mnie — Konrad Studziński Portfolio");
  }

  approachSteps = [
    {
      number: "01",
      title: "Analiza problemu i wymagań",
      description: "Określenie problemu, potrzeb użytkowników oraz wymagań aplikacji.",
    },
    {
      number: "02",
      title: "Projektowanie rozwiązania i struktury danych",
      description: "Zaplanowanie architektury, REST API i struktur danych odpowiednich dla projektu.",
    },
    {
      number: "03",
      title: "Implementacja interfejsu i logiki aplikacji",
      description: "Rozwijanie interfejsu oraz logiki aplikacji w technologiach dobranych do projektu.",
    },
    {
      number: "04",
      title: "Integracja komponentów i API",
      description: "Łączenie elementów aplikacji z backendem i punktami końcowymi API.",
    },
    {
      number: "05",
      title: "Testowanie i poprawianie błędów",
      description: "Weryfikowanie kluczowych modułów testami i poprawianie wykrytych błędów.",
    },
    {
      number: "06",
      title: "Przygotowanie do wdrożenia i dalszego rozwoju",
      description: "Przygotowanie budowania, testowania i wdrożenia oraz utrzymania projektu.",
    },
  ];

  pillars = [
    {
      icon: "🎨",
      tag: "Frontend",
      title: "Nowoczesny Frontend",
      description: "Projektowanie i kodowanie interfejsów, z których użytkownicy korzystają z przyjemnością.",
      points: [
        "Architektura komponentowa Angular (Signals, Standalone)",
        "Nowoczesny CSS/SCSS, responsywność (Mobile First)",
        "Dostępność cyfrowa (WCAG 2.1, semantyka, kontrast, focus)",
      ],
    },
    {
      icon: "⚙️",
      tag: "Backend",
      title: "Niezawodny Backend",
      description: "Tworzenie wydajnej warstwy serwerowej w Node.js i Java ze Springiem, obsługa REST API, baz SQL oraz przygotowanie aplikacji z użyciem Dockera, Mavena i Nginx.",
      points: [
        "Projektowanie czytelnych REST API w Node.js & Express",
        "Tworzenie backendu w Java i Spring oraz modelowanie baz PostgreSQL i SQL",
        "Budowanie i uruchamianie aplikacji z użyciem Maven, Docker i Nginx",
        "Bezpieczeństwo: walidacja danych wejściowych, autoryzacja",
      ],
    },
    {
      icon: "🏗️",
      tag: "Architektura",
      title: "Architektura aplikacji",
      description: "Myślenie o skalowalności i porządku w projekcie od samego początku.",
      points: [
        "Separacja odpowiedzialności i logiki biznesowej",
        "Wzorce projektowe i modularna struktura plików",
        "Łatwość w refaktoryzacji i wprowadzaniu nowych funkcji",
      ],
    },
    {
      icon: "🛡️",
      tag: "Standardy",
      title: "Jakość kodu",
      description: "Kod tworzony z szacunkiem dla osób, które będą go czytać i rozwijać w przyszłości.",
      points: [
        "Ścisłe typowanie w TypeScript eliminujące błędy w runtime",
        "Zasady Clean Code, czytelne nazewnictwo i brak długu",
        "Optymalizacja bundle size, wydajność i kontrola zmian (Git)",
      ],
    },
  ];

  milestones = [
    {
      stage: "Etap 1 — Fundamenty",
      title: "Solidne podstawy web developmentu",
      description: "Opanowanie semantycznego HTML5, zaawansowanego CSS/SCSS (Flexbox, CSS Grid, architektura styli) oraz nowoczesnego JavaScriptu (ES6+), z naciskiem na pisanie czystego kodu.",
      tech: ["HTML5 Semantyka", "CSS3 / SCSS", "JavaScript ES6+", "Git"],
    },
    {
      stage: "Etap 2 — Frameworki & Reaktywność",
      title: "Ekosystem Angular & TypeScript",
      description: "Przejście na silne typowanie w TypeScript i zaawansowany ekosystem Angular. Opanowanie komponentów Standalone, reaktywnego zarządzania stanem z Signals, routingu oraz zaawansowanych formularzy.",
      tech: ["Angular", "TypeScript", "Signals", "RxJS", "SCSS"],
    },
    {
      stage: "Etap 3 — Full-Stack & Bazy Danych",
      title: "Rozszerzenie o backend i integrację danych",
      description: "Budowa samodzielnych aplikacji full-stack: tworzenie serwerów Node.js/Express i backendu w Java ze Springiem, projektowanie REST API, modelowanie baz PostgreSQL i SQL oraz poznawanie procesu budowania i uruchamiania aplikacji z Mavenem, Dockerem i Nginx.",
      tech: ["Node.js", "Express", "Java", "Spring", "PostgreSQL", "SQL", "Maven", "Docker", "Nginx", "REST API", "JWT"],
    },
    {
      stage: "Etap 4 — Jakość & Architektura",
      title: "Dobre praktyki architektoniczne & a11y",
      description: "Pogłębianie wiedzy z zakresu skalowalnej architektury aplikacji, standardów dostępności (a11y), optymalizacji wydajności oraz tworzenia własnych spójnych systemów wzorniczych (Design Systems).",
      tech: ["Clean Architecture", "WCAG / a11y", "Design Systems", "Performance"],
    },
    {
      stage: "Aktualny Fokus",
      title: "Budowanie kompleksowych produktów cyfrowych",
      description: "Tworzenie zaawansowanych, w pełni funkcjonalnych aplikacji rozwiązujących realne problemy — od makiety i specyfikacji wymagań po działający kod produkcyjny.",
      tech: ["Full-Stack", "Problem Solving", "Real Products"],
    },
  ];

  values = [
    {
      icon: "🎯",
      title: "Praktyka i realne problemy",
      description: "Najlepiej uczę się budując działające narzędzia. Każda linijka kodu w moich projektach ma konkretne uzasadnienie i cel.",
    },
    {
      icon: "💎",
      title: "Jakość ponad pośpiech",
      description: "Wolę poświęcić czas na przemyślenie architektury i typów, niż zmagać się z długiem technologicznym i niespójnym kodem.",
    },
    {
      icon: "♿",
      title: "Dostępność dla każdego",
      description: "Dbam o to, by tworzone aplikacje były czytelne, miały wysoki kontrast, prawidłową semantykę i były w pełni dostępne z poziomu klawiatury.",
    },
    {
      icon: "📱",
      title: "Podejście Mobile First",
      description: "Projektuję i wdrażam interfejsy z myślą o użytkownikach urządzeń mobilnych, skalując układ płynnie do dużych ekranów roboczych.",
    },
    {
      icon: "🔍",
      title: "Ciągła eksploracja",
      description: "Śledzę rozwój standardów webowych, czytam dokumentację i regularnie testuję nowe możliwości nowoczesnego ekosystemu JavaScript/TypeScript.",
    },
    {
      icon: "🤝",
      title: "Otwarta komunikacja",
      description: "Wierzę w transparentność, jasne formułowanie myśli technicznych i otwartość na konstruktywny feedback.",
    },
  ];
}
