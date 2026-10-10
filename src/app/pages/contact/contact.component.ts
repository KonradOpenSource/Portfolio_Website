import { Component, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-contact",
  standalone: true,
  template: `
    <!-- ===== CONTACT HERO ===== -->
    <section class="contact-hero section" aria-labelledby="contact-heading">
      <div class="contact-hero__glow" aria-hidden="true"></div>
      <div class="container">
        <div class="contact-hero__content">

          <!-- Text side -->
          <div class="contact-hero__text">
            <p class="section-label">
              <span aria-hidden="true">// </span>Kontakt
            </p>
            <h1 id="contact-heading" class="contact-hero__heading">
              Porozmawiajmy<br>
              <span class="text-gradient">o projekcie</span>
            </h1>
            <p class="contact-hero__desc">
              Jestem otwarty na nowe projekty, ciekawe współprace i ciekawe pytania.
              Napisz do mnie bezpośrednio lub znajdź mnie w serwisach zawodowych.
            </p>

            <!-- Contact info cards -->
            <div class="contact-info" role="list" aria-label="Dane kontaktowe">
              @for (info of contactInfo; track info.label) {
                <div class="contact-info__item" role="listitem">
                  <div class="contact-info__icon" aria-hidden="true">
                    {{ info.label === "Email" ? "@" : info.label === "GitHub" ? "GH" : "in" }}
                  </div>
                  <div class="contact-info__text">
                    <span class="contact-info__label">{{ info.label }}</span>
                    <a
                      [href]="info.href"
                      class="contact-info__value"
                      [attr.aria-label]="info.label + ': ' + info.value"
                      [attr.target]="info.external ? '_blank' : null"
                      [attr.rel]="info.external ? 'noopener noreferrer' : null"
                    >
                      {{ info.value }}
                    </a>
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="contact-cta card">
            <div class="card__body">
              <span class="contact-cta__eyebrow">Bezpośredni kontakt</span>
              <h2 class="contact-cta__title">Napisz o swoim projekcie</h2>
              <p class="contact-cta__description">
                Otwórz swoją aplikację pocztową i napisz do mnie — bez formularza, który nie wysyła wiadomości.
              </p>
              <a class="btn btn--primary btn--lg" href="mailto:konradgo23@gmail.com">
                Napisz e-mail
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: "./contact.component.scss",
})
export class ContactComponent {
  private readonly titleService = inject(Title);

  constructor() {
    this.titleService.setTitle("Kontakt — Konrad Studziński Portfolio");
  }

  contactInfo = [
    {
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
      label: "Email",
      value: "konradgo23@gmail.com",
      href: "mailto:konradgo23@gmail.com",
      external: false,
    },
    {
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
      label: "LinkedIn",
      value: "linkedin.com/in/konrad-studziński",
      href: "https://www.linkedin.com/in/konrad-studziński",
      external: true,
    },
    {
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>      </svg>`,
      label: "GitHub",
      value: "github.com/KonradOpenSource",
      href: "https://github.com/KonradOpenSource",
      external: true,
    },
  ];
}
