# ng-web-portfolio

Angular website for [katharinaniesche.de](https://katharinaniesche.de) (coaching,
podcast, workbook, contact). Contact form and workbook requests are sent through
the [nestjs-email-service](https://github.com/Sony2k20/nestjs-email-service).

Stack: Angular (standalone components), Tailwind CSS, GSAP. The app is served by
nginx (`Dockerfile`, `nginx/nginx.conf`).

## Development

The Node.js version is in `.nvmrc`.

```bash
npm install
```

```bash
npm start
```

Starts the dev server at `http://localhost:4200/`.

```bash
npm run build
```

Production build into `dist/app`.

```bash
npm run lint
```

```bash
npm run format
```

The `CI` workflow lints and builds every pull request.

## Configuration

`src/environments/environment.ts` holds the settings for development and the test
system (`katy.csnguyen.de`); a production build (`npm run build`) uses
`environment.prod.ts` (`katharinaniesche.de`) instead. Note: the release workflow
currently builds the Docker image with `--configuration=development`, i.e. with
the values from `environment.ts`.

The values in `environment.ts` can be overridden by a `.env` file (template:
`.env-default`) or shell variables. This only works through the npm scripts
(`npm start`, `npm run build`, `npm run watch`), which pass them to the Angular
CLI via `scripts/ng-env.mjs`, not with `ng serve` / `ng build` directly.

| Variable           | Description                                      |
| ------------------ | ------------------------------------------------ |
| `URL`              | Public URL of the site (canonical links)         |
| `COOKIES`          | `true` enables the cookie banner and analytics   |
| `EMAIL_SERVER_URL` | Base URL of the email service                    |
| `EMAIL_ADRESS`     | Address that receives contact form inquiries     |

## Versioning and deployment

Releases follow [Semantic Versioning](https://semver.org) and are created automatically by [semantic-release](https://semantic-release.gitbook.io) on every push to `master` (`.github/workflows/docker-build.yml`). The next version is derived from the commit messages, which must follow [Conventional Commits](https://www.conventionalcommits.org):

| Commit message                                                          | Release                   |
| ----------------------------------------------------------------------- | ------------------------- |
| `fix: …`, `perf: …`, `build: …`, `refactor: …`, `style: …`, `revert: …` | Patch (`1.0.0` → `1.0.1`) |
| `feat: …`                                                               | Minor (`1.0.1` → `1.1.0`) |
| `feat!: …` or a `BREAKING CHANGE:` footer                               | Major (`1.1.0` → `2.0.0`) |
| `docs: …`, `ci: …`, `test: …`, `chore: …` (incl. `chore(deps)`)         | No release                |

A release creates the git tag `vX.Y.Z` and a GitHub release with release notes, pushes the Docker image `sony2k20/ng-web-portfolio` with the tags `X.Y.Z`, `X.Y`, `X` and `latest`, and sets `X.Y.Z` in `app-of-apps/apps/ng-web-portfolio.yaml` in [gitops-deployments](https://github.com/Sony2k20/gitops-deployments), from where Argo CD rolls it out. Pushes without a release-worthy commit are not deployed; running the workflow manually redeploys the latest version. The `version` field in `package.json` is not used.

## Dependency updates

[Renovate](https://docs.renovatebot.com) keeps dependencies up to date (`renovate.json`). It runs self-hosted as a CronJob in [gitops-deployments](https://github.com/Sony2k20/gitops-deployments) (`app-of-apps/apps/renovate.yaml`), not as a GitHub Action or app. It opens PRs on Monday mornings for updates that are at least 3 days old.

- Updates that change the deployed app (Angular, Tailwind, PostCSS and runtime dependencies) are committed as `fix(deps)` and therefore create a patch release when merged. They are never merged automatically.
- Minor/patch updates of dev tooling and GitHub Actions as well as the weekly lock file maintenance are committed as `chore(deps)` (no release) and merged automatically once CI is green.
- Angular majors and majors of the release tooling are only opened after approval in the Dependency Dashboard issue. Angular majors still need `ng update` migrations on the Renovate branch. TypeScript and zone.js are not updated separately; `ng update` moves them together with Angular.
