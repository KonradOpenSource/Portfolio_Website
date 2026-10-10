import { Component, signal, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Project, ProjectCategory } from "../../data/projects.model";
import { PROJECTS_DATA } from "../../data/projects.data";

interface CategoryFilterOption {
  id: "all" | ProjectCategory;
  label: string;
  icon: string;
  count: number;
}

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- ===== PROJECTS HERO ===== -->
    <section class="projects-hero section" aria-labelledby="projects-heading">
      <div class="projects-hero__glow" aria-hidden="true"></div>
      <div class="container">
        <div class="section-heading" style="max-width: 800px; text-align: center; margin-inline: auto;">
          <p class="section-heading__label">
            <span aria-hidden="true">// </span>Portfolio projektów
          </p>
          <h1 id="projects-heading" class="section-heading__title">
            Od pomysłu do <span class="text-gradient">działającego kodu</span>
          </h1>
          <p class="section-heading__description" style="margin-inline: auto;">
            Zbiór 8 autorskich projektów potwierdzających moje umiejętności full-stack — od systemów rekrutacyjnych
            i obsługi zgłoszeń, przez fintech i e-commerce, po zaawansowane interfejsy i multimedia.
          </p>
        </div>

        <!-- Filter buttons -->
        <nav class="projects-filter" role="tablist" aria-label="Filtruj projekty według kategorii">
          @for (filter of filterOptions; track filter.id) {
            <button
              type="button"
              role="tab"
              class="projects-filter__btn"
              [class.projects-filter__btn--active]="activeCategory() === filter.id"
              [attr.aria-selected]="activeCategory() === filter.id"
              (click)="setCategory(filter.id)"
            >
              <span class="projects-filter__icon" aria-hidden="true">{{ filter.icon }}</span>
              <span>{{ filter.label }}</span>
              <span class="projects-filter__count">{{ filter.count }}</span>
            </button>
          }
        </nav>
      </div>
    </section>

    <!-- ===== PROJECTS SHOWCASE ===== -->
    <section class="section projects-showcase" aria-labelledby="showcase-heading">
      <div class="container">
        <h2 id="showcase-heading" class="sr-only">Lista projektów</h2>

        <div class="projects-list" role="list" aria-label="Wszystkie projekty">
          @for (project of filteredProjects(); track project.id) {

            <!-- ─── 1. FEATURED HERO LAYOUT ─── -->
            @if (project.layoutType === 'featured-hero') {
              <article class="project-hero-card" role="listitem">
                <div class="project-hero-card__inner">

                  <!-- Visual Showcase Column -->
                  <div class="project-hero-card__visual" [style.background]="project.preview.gradient">
                    <div class="project-hero-card__visual-header">
                      <div class="project-hero-card__dots" aria-hidden="true">
                        <span></span><span></span><span></span>
                      </div>
                      <span class="project-hero-card__badge">{{ project.preview.badge }}</span>
                    </div>

                    <!-- Unique Mock Graphic based on project type -->
                    <div class="project-hero-card__mock" aria-hidden="true">
                      @if (project.preview.visualType === 'kanban') {
                        <div class="mock-kanban">
                          <div class="mock-kanban__col">
                            <span class="mock-kanban__col-title">Nowe (8)</span>
                            <div class="mock-kanban__card">Kandydat: Senior Dev</div>
                            <div class="mock-kanban__card">Kandydat: UI Designer</div>
                          </div>
                          <div class="mock-kanban__col">
                            <span class="mock-kanban__col-title">Weryfikacja (3)</span>
                            <div class="mock-kanban__card mock-kanban__card--active">Rozmowa techniczna</div>
                          </div>
                          <div class="mock-kanban__col">
                            <span class="mock-kanban__col-title">Oferta (1)</span>
                            <div class="mock-kanban__card mock-kanban__card--success">Zatwierdzony kandydat</div>
                          </div>
                        </div>
                      } @else if (project.preview.visualType === 'chart') {
                        <div class="mock-chart">
                          <div class="mock-chart__header">
                            <span class="mock-chart__val">32,450.80 USD</span>
                            <span class="mock-chart__gain">+14.2%</span>
                          </div>
                          <div class="mock-chart__bars">
                            <span style="height: 35%"></span>
                            <span style="height: 48%"></span>
                            <span style="height: 72%"></span>
                            <span style="height: 55%"></span>
                            <span style="height: 85%"></span>
                            <span style="height: 95%"></span>
                          </div>
                        </div>
                      }
                    </div>

                    <div class="project-hero-card__visual-footer">
                      <span class="project-hero-card__emoji">{{ project.preview.emoji }}</span>
                      <span class="project-hero-card__slug">// {{ project.slug }}</span>
                    </div>
                  </div>

                  <!-- Details Column -->
                  <div class="project-hero-card__content">
                    <div class="project-hero-card__meta">
                      <span class="project-category-tag">{{ project.category }}</span>
                      <span class="project-hero-card__featured-tag">★ Wiodący projekt</span>
                    </div>

                    <h3 class="project-hero-card__title">{{ project.title }}</h3>
                    <p class="project-hero-card__desc">{{ project.description }}</p>

                    <!-- Features Highlights -->
                    <div class="project-hero-card__features">
                      <h4 class="project-section-subtitle">Kluczowe funkcjonalności:</h4>
                      <ul class="project-features-list">
                        @for (feat of project.features.slice(0, 3); track feat) {
                          <li>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span>{{ feat }}</span>
                          </li>
                        }
                      </ul>
                    </div>

                    <!-- Role & Contribution -->
                    <div class="project-role-box">
                      <strong>Mój wkład:</strong>
                      <p>{{ project.myRole }}</p>
                    </div>

                    <!-- Tags -->
                    <div class="project-tags-row" role="list" [attr.aria-label]="project.title + ' technologie'">
                      @for (tech of project.technologies; track tech) {
                        <span class="badge" role="listitem">{{ tech }}</span>
                      }
                    </div>

                    <!-- Action buttons -->
                    <div class="project-card-actions">
                      <a
                        [href]="project.repoUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn--primary"
                        [attr.aria-label]="'Zobacz kod projektu ' + project.title + ' na GitHubie (otwiera nową kartę)'"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                        <span>Kod na GitHubie</span>
                      </a>

                      <a
                        [routerLink]="['/projects', project.slug]"
                        class="btn btn--outline"
                        [attr.aria-label]="'Więcej szczegółów projektu ' + project.title"
                      >
                        Wszystkie szczegóły
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </a>

                      @if (project.demoUrl) {
                        <a
                          [href]="project.demoUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="btn btn--ghost"
                          [attr.aria-label]="'Zobacz wersję demonstracyjną ' + project.title"
                        >
                          Demo na żywo &rarr;
                        </a>
                      }
                    </div>
                  </div>

                </div>
              </article>
            }

            <!-- ─── 2. INTERACTIVE PREVIEW LAYOUT ─── -->
            @else if (project.layoutType === 'interactive-preview') {
              <article class="project-system-card" role="listitem">
                <!-- Top System Header -->
                <div class="project-system-card__header" [style.background]="project.preview.gradient">
                  <div class="project-system-card__header-bar">
                    <div class="project-system-card__dots" aria-hidden="true">
                      <span></span><span></span><span></span>
                    </div>
                    <span class="project-system-card__title-bar">{{ project.slug }}.app</span>
                    <span class="project-system-card__badge">{{ project.preview.badge }}</span>
                  </div>

                  <!-- Mock Preview -->
                  <div class="project-system-card__preview-body">
                    @if (project.preview.visualType === 'ticket') {
                      <div class="mock-ticket-view">
                        <div class="mock-ticket-row mock-ticket-row--crit">
                          <span class="mock-ticket-tag">#TICK-104 [Krytyczny]</span>
                          <span class="mock-ticket-desc">Błąd autoryzacji sesji</span>
                          <span class="mock-ticket-status">W toku</span>
                        </div>
                        <div class="mock-ticket-row">
                          <span class="mock-ticket-tag">#TICK-105 [Średni]</span>
                          <span class="mock-ticket-desc">Aktualizacja szablonu e-mail</span>
                          <span class="mock-ticket-status">Nowy</span>
                        </div>
                      </div>
                    } @else if (project.preview.visualType === 'ai') {
                      <div class="mock-ai-view">
                        <div class="mock-ai-prompt">> Generuj konspekt artykułu technicznego...</div>
                        <div class="mock-ai-response">
                          <span class="mock-ai-token"># Architektura</span>
                          <span class="mock-ai-token">Aplikacji</span>
                          <span class="mock-ai-token">Webowych</span>
                          <span class="mock-ai-cursor">|</span>
                        </div>
                      </div>
                    } @else if (project.preview.visualType === 'desktop') {
                      <div class="mock-desktop-view">
                        <div class="mock-desktop-window">
                          <div class="mock-desktop-win-header">Terminal — zsh</div>
                          <div class="mock-desktop-win-body">konrad&#64;macbook ~ % ng serve</div>
                        </div>
                        <div class="mock-desktop-dock">
                          <span>Finder</span><span>Safari</span><span>Terminal</span><span>Kalkulator</span>
                        </div>
                      </div>
                    }
                  </div>
                </div>

                <!-- Body -->
                <div class="project-system-card__body">
                  <div class="project-system-card__meta">
                    <span class="project-category-tag">{{ project.category }}</span>
                  </div>

                  <h3 class="project-system-card__title">{{ project.title }}</h3>
                  <p class="project-system-card__desc">{{ project.description }}</p>

                  <div class="project-challenges-box">
                    <strong>Wyzwanie techniczne:</strong>
                    <p>{{ project.challenges }}</p>
                  </div>

                  <div class="project-tags-row" role="list">
                    @for (tech of project.technologies; track tech) {
                      <span class="badge" role="listitem">{{ tech }}</span>
                    }
                  </div>

                  <div class="project-card-actions">
                    <a
                      [href]="project.repoUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn--outline btn--sm"
                      [attr.aria-label]="'Zobacz kod projektu ' + project.title + ' na GitHubie'"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                      <span>Kod na GitHubie</span>
                    </a>

                    <a
                      [routerLink]="['/projects', project.slug]"
                      class="btn btn--ghost btn--sm"
                      [attr.aria-label]="'Wszystkie szczegóły projektu ' + project.title"
                    >
                      Szczegóły &rarr;
                    </a>
                  </div>
                </div>
              </article>
            }

            <!-- ─── 3. COMPACT CARD LAYOUT ─── -->
            @else {
              <article class="project-compact-card" role="listitem">
                <div class="project-compact-card__thumb" [style.background]="project.preview.gradient">
                  <div class="project-compact-card__thumb-header">
                    <span class="project-category-tag">{{ project.category }}</span>
                    <span class="project-compact-card__emoji">{{ project.preview.emoji }}</span>
                  </div>
                  <div class="project-compact-card__thumb-mock">
                    @if (project.preview.visualType === 'shop') {
                      <div class="mock-shop-preview">
                        <span>🛒 Koszyk: 3 prod.</span>
                        <span>Suma: 489 PLN</span>
                      </div>
                    } @else if (project.preview.visualType === 'audio') {
                      <div class="mock-audio-preview">
                        <div class="mock-audio-wave">
                          <span></span><span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <span class="mock-audio-bpm">BPM: 128</span>
                      </div>
                    } @else if (project.preview.visualType === 'medical') {
                      <div class="mock-medical-preview">
                        <span>☀️ Rano: Przyjęto</span>
                        <span>🌙 Wieczór: 19:00</span>
                      </div>
                    }
                  </div>
                </div>

                <div class="project-compact-card__body">
                  <h3 class="project-compact-card__title">{{ project.title }}</h3>
                  <p class="project-compact-card__desc">{{ project.description }}</p>

                  <div class="project-tags-row" role="list">
                    @for (tech of project.technologies.slice(0, 4); track tech) {
                      <span class="badge" role="listitem">{{ tech }}</span>
                    }
                  </div>

                  <div class="project-card-actions">
                    <a
                      [href]="project.repoUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn--outline btn--sm"
                      [attr.aria-label]="'Zobacz kod projektu ' + project.title + ' na GitHubie'"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>

                    <a
                      [routerLink]="['/projects', project.slug]"
                      class="btn btn--ghost btn--sm"
                      [attr.aria-label]="'Wszystkie szczegóły projektu ' + project.title"
                    >
                      Szczegóły &rarr;
                    </a>
                  </div>
                </div>
              </article>
            }

          }
        </div>
      </div>
    </section>

    <!-- ===== PROJECT DETAILS MODAL ===== -->
    @if (selectedProject()) {
      <div
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="'modal-title-' + selectedProject()!.id"
        (click)="closeDetails()"
      >
        <div class="modal-card" (click)="$event.stopPropagation()">

          <!-- Modal Header -->
          <div class="modal-card__header">
            <div class="modal-card__header-meta">
              <span class="project-category-tag">{{ selectedProject()!.category }}</span>
              <span class="modal-card__badge">{{ selectedProject()!.preview.badge }}</span>
            </div>
            <button
              type="button"
              class="modal-card__close"
              (click)="closeDetails()"
              aria-label="Zamknij szczegóły projektu"
            >
              ✕
            </button>
          </div>

          <!-- Modal Title -->
          <h2 [id]="'modal-title-' + selectedProject()!.id" class="modal-card__title">
            {{ selectedProject()!.title }}
          </h2>
          <p class="modal-card__lead">{{ selectedProject()!.description }}</p>

          <!-- Modal Body Grid -->
          <div class="modal-card__body">

            <!-- All Features -->
            <div class="modal-card__section">
              <h3 class="modal-card__section-title">Wszystkie funkcjonalności</h3>
              <ul class="modal-features-list">
                @for (feat of selectedProject()!.features; track feat) {
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{{ feat }}</span>
                  </li>
                }
              </ul>
            </div>

            <!-- Role -->
            <div class="modal-card__section modal-box--role">
              <h3 class="modal-card__section-title">Mój wkład w projekt</h3>
              <p>{{ selectedProject()!.myRole }}</p>
            </div>

            <!-- Challenges -->
            <div class="modal-card__section modal-box--challenge">
              <h3 class="modal-card__section-title">Wyzwania techniczne i rozwiązania</h3>
              <p>{{ selectedProject()!.challenges }}</p>
            </div>

            <!-- Technologies -->
            <div class="modal-card__section">
              <h3 class="modal-card__section-title">Wykorzystane technologie</h3>
              <div class="project-tags-row" role="list">
                @for (tech of selectedProject()!.technologies; track tech) {
                  <span class="badge" role="listitem">{{ tech }}</span>
                }
              </div>
            </div>

          </div>

          <!-- Modal Footer Actions -->
          <div class="modal-card__footer">
            <a
              [href]="selectedProject()!.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn--primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span>Zobacz repozytorium na GitHubie</span>
            </a>

            @if (selectedProject()!.demoUrl) {
              <a
                [href]="selectedProject()!.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn--outline"
              >
                Wersja demo &rarr;
              </a>
            }

            <button
              type="button"
              class="btn btn--ghost"
              (click)="closeDetails()"
            >
              Zamknij
            </button>
          </div>

        </div>
      </div>
    }
  `,
  styleUrl: "./projects.component.scss",
})
export class ProjectsComponent {
  private titleService = inject(Title);

  protected activeCategory = signal<"all" | ProjectCategory>("all");
  protected selectedProject = signal<Project | null>(null);

  protected allProjects: Project[] = PROJECTS_DATA;

  constructor() {
    this.titleService.setTitle("Projekty — Konrad Studziński Portfolio");
  }

  protected filterOptions: CategoryFilterOption[] = [
    { id: "all", label: "Wszystkie", icon: "✨", count: this.allProjects.length },
    {
      id: "Full-Stack & Systemy",
      label: "Full-Stack & Systemy",
      icon: "🏢",
      count: this.allProjects.filter((p) => p.showInCategoryFilters !== false && p.category === "Full-Stack & Systemy").length,
    },
    {
      id: "Fintech & E-Commerce",
      label: "Fintech & E-Commerce",
      icon: "💳",
      count: this.allProjects.filter((p) => p.showInCategoryFilters !== false && p.category === "Fintech & E-Commerce").length,
    },
    {
      id: "Zaawansowane UI & Creative",
      label: "Zaawansowane UI & Creative",
      icon: "🎨",
      count: this.allProjects.filter((p) => p.showInCategoryFilters !== false && p.category === "Zaawansowane UI & Creative").length,
    },
  ];

  protected filteredProjects = computed(() => {
    const cat = this.activeCategory();
    if (cat === "all") return this.allProjects;
    return this.allProjects.filter((p) => p.showInCategoryFilters !== false && p.category === cat);
  });

  setCategory(category: "all" | ProjectCategory): void {
    this.activeCategory.set(category);
  }

  closeDetails(): void {
    this.selectedProject.set(null);
    document.body.style.overflow = "";
  }
}
