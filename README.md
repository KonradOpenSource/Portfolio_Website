# Konrad Studziński's Portfolio

A responsive full-stack developer portfolio built with Angular. It includes a home page, a project list and individual project pages, professional experience, and contact information.


## Technologies 




## Requirements

- Node.js `^22.22.3`, `^24.15.0`, or `>=26.0.0`, as required by the Angular CLI version used in this project.
- npm.

## Run locally

From the project root, install dependencies and start the Angular development server:

```bash
nvm install 22 && nvm use 22 && npx ng serve --port 4200
```

Open `http://localhost:4200/` in your browser. Stop the server with `Ctrl+C`.

If you use `nvm`, select a compatible Node.js version first, for example:

```bash
nvm install 22.23.3
nvm use 22.23.3
```

## Tests and production build

Run the Vitest suite once:

```bash
npm test -- --run
```

Create a production build:

```bash
npm run build
```

Angular writes the deployable files to `dist/portfolio/browser/`. This project does not include a deployment script or a configured hosting provider.

## Deployment

1. Run the tests and create a production build.
2. Publish the contents of `dist/portfolio/browser/` to a static web host.
3. Configure the host to serve `index.html` for application routes that do not map to a static file. This is required for direct visits and page refreshes on routes such as `/projects/ats-system`.
4. Enable HTTPS.
5. Before deploying to a custom domain, review and update the `canonical`, `og:url`, and site metadata in `src/index.html` if needed.

The Angular CLI production configuration optimizes the build and adds content hashes to output filenames.

## Editing content

- **Project descriptions, technologies, features, repository links, demos, and slugs:** `src/app/data/projects.data.ts`. The data type is in `src/app/data/projects.model.ts`. Add new projects to the data array; the shared project detail page loads content by slug.
- **Application routes:** `src/app/app.routes.ts`.
- **Home page and Hero content:** `src/app/pages/home/home.component.ts`; its styles are in `home.component.scss`.
- **Bio, experience, and My Approach steps:** `src/app/pages/about/about.component.ts`.
- **Email address, GitHub, and LinkedIn:** `src/app/pages/contact/contact.component.ts` and `src/app/layout/footer/footer.component.ts`. Navigation links are in `src/app/layout/navbar/navbar.component.ts`.
- **Project detail page titles:** the shared component in `src/app/pages/project-detail/project-detail.component.ts`; project-specific content is edited in the data file.
- **Base title, SEO description, Open Graph, canonical URL, and fonts:** `src/index.html`.
- **Favicon:** `public/favicon.svg`.
- **Global styles and variables:** `src/styles/main.scss` and the other files in `src/styles/`; component styles are next to their TypeScript files.

After editing content, run the tests and build again. If you change the hosting provider or domain, also review the canonical URL and the server's route fallback configuration.

## Technologies and structure

- Angular 22, TypeScript 6, Angular Router, Signals, and RxJS.
- SCSS.
- Three.js for the lightweight Hero scene, with a fallback when WebGL is unavailable.
- Vitest, jsdom, and Angular Testing Library for the test environment.

Main directories:

```text
src/
  app/
    data/                 # Project data and models
    layout/               # Navigation, footer, and application layout
    pages/                # Home, Projects, project details, About, Contact, and 404 pages
    shared/hero-scene/    # Three.js scene
    app.routes.ts         # Application routes
  styles/                 # Global styles and design tokens
  index.html              # Document metadata
public/                   # Static assets copied to the build
```

## Known limitations and items to complete

- The `demoUrl` field is empty for all eight projects, so no live demo links are shown.
- The email contact link uses `mailto:` and opens the user's configured email app; the site does not send messages through a backend or contact form.
- The repository contains no local project screenshots or profile photo. Project card graphics are interface illustrations, not screenshots of running applications.
- The automated test suite is minimal: it contains one unit test and no comprehensive component or end-to-end tests.
- All eight checked GitHub repository links returned HTTP 200. An HTTP 999 response from LinkedIn prevented independent verification of that profile.
- No formal WCAG audit or Lighthouse/Core Web Vitals assessment has been performed; build and test results do not replace those measurements.
- Domain deployment, SPA server fallback rules, and continuous integration are not configured in this project.


##  License
This project is licensed under the MIT License.
