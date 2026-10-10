import { Component, DestroyRef, OnInit, signal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Project } from "../../data/projects.model";
import { PROJECTS_DATA } from "../../data/projects.data";

@Component({
  selector: "app-project-detail",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (project()) {
      <div class="project-detail">

        <!-- ===== BREADCRUMB & BACK NAVIGATION ===== -->
        <div class="project-detail__nav-bar">
          <div class="container">
            <nav class="breadcrumb" aria-label="Nawigacja okruszkowa">
              <a routerLink="/" class="breadcrumb__link">Home</a>
              <span class="breadcrumb__sep" aria-hidden="true">/</span>
              <a routerLink="/projects" class="breadcrumb__link">Projekty</a>
              <span class="breadcrumb__sep" aria-hidden="true">/</span>
              <span class="breadcrumb__current" aria-current="page">{{ project()!.title }}</span>
            </nav>

            <a routerLink="/projects" class="project-detail__back-btn" aria-label="Wróć do listy wszystkich projektów">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Wróć do listy projektów</span>
            </a>
          </div>
        </div>

        <!-- ===== HERO HEADER ===== -->
        <header class="project-detail__hero" [style.background]="project()!.preview.gradient">
          <div class="project-detail__glow" aria-hidden="true"></div>
          <div class="container">
            <div class="project-detail__hero-content">

              <div class="project-detail__meta-badge-row">
                <span class="project-category-tag">{{ project()!.category }}</span>
                <span class="project-detail__badge">{{ project()!.preview.badge }}</span>
                @if (project()!.featured) {
                  <span class="project-detail__featured-tag">★ Projekt Wiodący</span>
                }
              </div>

              <h1 class="project-detail__title">{{ project()!.title }}</h1>
              <p class="project-detail__lead">{{ project()!.shortDescription }}</p>

              <!-- Action Links -->
              <div class="project-detail__actions">
                <a
                  [href]="project()!.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn--primary btn--lg"
                  aria-label="Kod źródłowy projektu na GitHubie (otwiera w nowej karcie)"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  <span>Zobacz kod na GitHubie</span>
                </a>

                @if (project()!.demoUrl) {
                  <a
                    [href]="project()!.demoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn--outline btn--lg"
                    aria-label="Wersja demonstracyjna na żywo"
                  >
                    <span>Wersja demonstracyjna (Live Demo)</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                  </a>
                }
              </div>

            </div>
          </div>
        </header>

        <!-- ===== MAIN CONTENT BODY ===== -->
        <section class="section project-detail__body-section">
          <div class="container">
            <div class="project-detail__layout">

              <!-- Left Main Column -->
              <div class="project-detail__main-col">

                <!-- 1. Cel i problem -->
                <div class="detail-card card">
                  <div class="card__body">
                    <h2 class="detail-card__heading">
                      <span class="detail-card__icon" aria-hidden="true">🎯</span>
                      <span>Cel projektu i problem, który rozwiązuje</span>
                    </h2>

                    <div class="detail-split">
                      <div class="detail-split__box">
                        <h3 class="detail-split__label">Główny cel</h3>
                        <p>{{ project()!.goal }}</p>
                      </div>

                      <div class="detail-split__box detail-split__box--problem">
                        <h3 class="detail-split__label">Rozwiązywany problem</h3>
                        <p>{{ project()!.problemSolved }}</p>
                      </div>
                    </div>

                    <div class="detail-card__paragraph">
                      <h3 class="detail-split__label">Opis projektu</h3>
                      <p>{{ project()!.description }}</p>
                    </div>
                  </div>
                </div>

                <!-- 2. Najważniejsze funkcjonalności -->
                <div class="detail-card card">
                  <div class="card__body">
                    <h2 class="detail-card__heading">
                      <span class="detail-card__icon" aria-hidden="true">⚡</span>
                      <span>Najważniejsze funkcjonalności</span>
                    </h2>

                    <ul class="detail-features-grid" role="list">
                      @for (feat of project()!.features; track feat) {
                        <li class="detail-feature-item" role="listitem">
                          <div class="detail-feature-item__check" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </div>
                          <span>{{ feat }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                </div>

                <!-- 3. Architektura i Rozwiązania Techniczne -->
                <div class="detail-card card">
                  <div class="card__body">
                    <h2 class="detail-card__heading">
                      <span class="detail-card__icon" aria-hidden="true">🏗️</span>
                      <span>Architektura i moje rozwiązania techniczne</span>
                    </h2>

                    <div class="detail-section-block">
                      <h3 class="detail-split__label">Architektura aplikacji</h3>
                      <p>{{ project()!.architecture }}</p>
                    </div>

                    <div class="detail-section-block detail-section-block--highlight">
                      <h3 class="detail-split__label">Mój wkład i decyzje technologiczne</h3>
                      <p>{{ project()!.myRole }}</p>
                      <p class="detail-section-block__solutions">{{ project()!.technicalSolutions }}</p>
                    </div>
                  </div>
                </div>

                <!-- 4. Najważniejsze wyzwania techniczne -->
                <div class="detail-card card detail-card--challenge">
                  <div class="card__body">
                    <h2 class="detail-card__heading">
                      <span class="detail-card__icon" aria-hidden="true">🧗</span>
                      <span>Wyzwania techniczne i ich pokonanie</span>
                    </h2>
                    <p class="detail-challenge-text">{{ project()!.challenges }}</p>
                  </div>
                </div>

              </div>

              <!-- Right Sidebar Column -->
              <aside class="project-detail__sidebar" aria-label="Metryki i technologie projektu">

                <!-- Tech Stack Box -->
                <div class="sidebar-box card">
                  <div class="card__body">
                    <h3 class="sidebar-box__title">Zastosowane technologie</h3>
                    <div class="sidebar-tags" role="list">
                      @for (tech of project()!.technologies; track tech) {
                        <span class="badge" role="listitem">{{ tech }}</span>
                      }
                    </div>
                  </div>
                </div>

                <!-- Info Box -->
                <div class="sidebar-box card">
                  <div class="card__body">
                    <h3 class="sidebar-box__title">Informacje o projekcie</h3>
                    <dl class="sidebar-dl">
                      <div class="sidebar-dl__row">
                        <dt>Kategoria</dt>
                        <dd>{{ project()!.category }}</dd>
                      </div>
                      <div class="sidebar-dl__row">
                        <dt>Autor</dt>
                        <dd>Konrad Studziński</dd>
                      </div>
                      <div class="sidebar-dl__row">
                        <dt>Typ kodu</dt>
                        <dd>Open Source (GitHub)</dd>
                      </div>
                      <div class="sidebar-dl__row">
                        <dt>Status wdrożenia</dt>
                        <dd>{{ project()!.demoUrl ? 'Aktywna wersja demo' : 'Kod dostępny w repozytorium' }}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <!-- Repozytorium GitHub Link Card -->
                <div class="sidebar-box card sidebar-box--cta">
                  <div class="card__body">
                    <h3 class="sidebar-box__title">Kod źródłowy</h3>
                    <p class="sidebar-box__text">Pełny kod, konfiguracja i historia commitów są dostępne na moim profilu GitHub.</p>
                    <a
                      [href]="project()!.repoUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn--primary btn--full"
                      aria-label="Przejdź do repozytorium na GitHubie"
                    >
                      Otwórz repozytorium &rarr;
                    </a>
                  </div>
                </div>

                <!-- Return Button -->
                <a routerLink="/projects" class="btn btn--outline btn--full" aria-label="Wróć do listy wszystkich projektów">
                  &larr; Wszystkie projekty
                </a>

              </aside>

            </div>
          </div>
        </section>

      </div>
    } @else {
      <!-- 404 / Project Not Found State -->
      <section class="section project-not-found container text-center">
        <h1>Nie znaleziono projektu</h1>
        <p>Projekt o podanym adresie nie istnieje lub został przeniesiony.</p>
        <a routerLink="/projects" class="btn btn--primary">Wróć do listy projektów</a>
      </section>
    }
  `,
  styleUrl: "./project-detail.component.scss",
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private destroyRef = inject(DestroyRef);

  protected project = signal<Project | null>(null);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = params.get("slug");
      const found = PROJECTS_DATA.find((project) => project.slug === slug);

      if (found) {
        this.project.set(found);
        this.titleService.setTitle(`${found.title} — Konrad Studziński Portfolio`);
      } else {
        this.project.set(null);
        this.titleService.setTitle("Nie znaleziono projektu — Konrad Studziński");
      }
    });
  }
}
