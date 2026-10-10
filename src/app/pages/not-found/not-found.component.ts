import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="section" aria-labelledby="not-found-heading">
      <div class="container">
        <p class="section-heading__label">404 · Nie znaleziono strony</p>
        <h1 id="not-found-heading" class="section-heading__title">
          Ta strona nie jest dostępna
        </h1>
        <p class="section-heading__description">
          Adres może być nieaktualny lub zawierać literówkę.
        </p>
        <div class="not-found__actions">
          <a routerLink="/" class="btn btn--primary">Wróć na stronę główną</a>
          <a routerLink="/projects" class="btn btn--outline">Zobacz projekty</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .not-found__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 2rem;
    }
  `,
})
export class NotFoundComponent {
  private readonly titleService = inject(Title);

  constructor() {
    this.titleService.setTitle("Nie znaleziono strony — Konrad Studziński");
  }
}
