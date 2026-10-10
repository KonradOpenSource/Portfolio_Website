import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  signal,
} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";

interface NavLink {
  label: string;
  path: string;
  ariaLabel: string;
}

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="navbar" [class.navbar--scrolled]="scrolled()" role="banner">
      <div class="container">
        <div class="navbar__inner">

          <!-- Logo / Brand -->
          <a
            routerLink="/"
            class="navbar__brand"
            aria-label="Portfolio – wróć do strony głównej"
          >
            <span class="navbar__brand-prefix" aria-hidden="true">&lt;</span>
            <span class="navbar__brand-name">KS</span>
            <span class="navbar__brand-suffix" aria-hidden="true">/&gt;</span>
          </a>

          <!-- Desktop navigation -->
          <nav
            class="navbar__nav"
            role="navigation"
            aria-label="Główna nawigacja"
          >
            @for (link of navLinks; track link.path) {
              <a
                [routerLink]="link.path"
                routerLinkActive="navbar__link--active"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                class="navbar__link"
                [attr.aria-label]="link.ariaLabel"
              >
                {{ link.label }}
              </a>
            }
          </nav>

          <!-- CTA button desktop -->
          <a
            routerLink="/contact"
            class="btn btn--primary navbar__cta"
            aria-label="Skontaktuj się"
          >
            Kontakt
          </a>

          <!-- Mobile hamburger -->
          <button
            #mobileToggle
            class="navbar__hamburger"
            [class.navbar__hamburger--open]="mobileOpen()"
            (click)="toggleMobile()"
            [attr.aria-expanded]="mobileOpen()"
            aria-controls="mobile-menu"
            aria-label="Otwórz/zamknij menu"
            type="button"
          >
            <span class="navbar__hamburger-line"></span>
            <span class="navbar__hamburger-line"></span>
            <span class="navbar__hamburger-line"></span>
          </button>
        </div>
      </div>

      <!-- Mobile drawer -->
      <div
        #mobileMenu
        class="navbar__mobile"
        id="mobile-menu"
        [class.navbar__mobile--open]="mobileOpen()"
        role="dialog"
        [attr.aria-hidden]="!mobileOpen()"
        [attr.inert]="mobileOpen() ? null : ''"
        [attr.aria-modal]="mobileOpen() ? 'true' : null"
        aria-label="Menu mobilne"
      >
        <nav role="navigation" aria-label="Nawigacja mobilna">
          @for (link of navLinks; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="navbar__mobile-link--active"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
              class="navbar__mobile-link"
              [attr.aria-label]="link.ariaLabel"
              (click)="closeMobile()"
            >
              <span class="navbar__mobile-link-number" aria-hidden="true">
                {{ ('0' + ($index + 1)).slice(-2) }}
              </span>
              {{ link.label }}
            </a>
          }

          <a
            routerLink="/contact"
            class="btn btn--primary navbar__mobile-cta"
            (click)="closeMobile()"
            aria-label="Skontaktuj się"
          >
            Skontaktuj się
          </a>
        </nav>
      </div>

      <!-- Mobile overlay -->
      @if (mobileOpen()) {
        <div
          class="navbar__overlay"
          (click)="closeMobile(true)"
          aria-hidden="true"
        ></div>
      }
    </header>
  `,
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnDestroy {
  @ViewChild("mobileMenu") private mobileMenu?: ElementRef<HTMLElement>;
  @ViewChild("mobileToggle") private mobileToggle?: ElementRef<HTMLButtonElement>;

  protected scrolled = signal(false);
  protected mobileOpen = signal(false);

  protected navLinks: NavLink[] = [
    { label: "Home",     path: "/",        ariaLabel: "Strona główna" },
    { label: "Projekty", path: "/projects", ariaLabel: "Moje projekty" },
    { label: "O mnie",   path: "/about",    ariaLabel: "O mnie" },
    { label: "Kontakt",  path: "/contact",  ariaLabel: "Kontakt" },
  ];

  @HostListener("window:scroll")
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  @HostListener("document:keydown", ["$event"])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.mobileOpen()) return;

    if (event.key === "Escape") {
      event.preventDefault();
      this.closeMobile(true);
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = this.mobileMenu?.nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && (activeElement === first || !this.mobileMenu?.nativeElement.contains(activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (activeElement === last || !this.mobileMenu?.nativeElement.contains(activeElement))) {
      event.preventDefault();
      first.focus();
    }
  }

  @HostListener("window:resize")
  onResize(): void {
    if (window.innerWidth >= 1024 && this.mobileOpen()) this.closeMobile();
  }

  @HostListener("window:popstate")
  onPopState(): void {
    if (this.mobileOpen()) this.closeMobile();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = "";
  }

  toggleMobile(): void {
    if (this.mobileOpen()) {
      this.closeMobile();
      return;
    }

    this.mobileOpen.set(true);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      if (!this.mobileOpen()) return;
      this.mobileMenu?.nativeElement.querySelector<HTMLElement>("a[href]")?.focus();
    });
  }

  closeMobile(restoreFocus = false): void {
    this.mobileOpen.set(false);
    document.body.style.overflow = "";
    if (restoreFocus) this.mobileToggle?.nativeElement.focus();
  }
}
