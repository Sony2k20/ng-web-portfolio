# NgTemplate18

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8.

## Versioning

Releases follow [Semantic Versioning](https://semver.org) and are created automatically by [semantic-release](https://semantic-release.gitbook.io) on every push to `master`. The next version is derived from the commit messages, which must follow [Conventional Commits](https://www.conventionalcommits.org):

| Commit message                                                                            | Release                   |
| ----------------------------------------------------------------------------------------- | ------------------------- |
| `fix: …`, `perf: …`, `build: …`, `refactor: …`, `style: …`, `revert: …`, `chore(deps): …` | Patch (`1.0.0` → `1.0.1`) |
| `feat: …`                                                                                 | Minor (`1.0.1` → `1.1.0`) |
| `feat!: …` or a `BREAKING CHANGE:` footer                                                 | Major (`1.1.0` → `2.0.0`) |
| `docs: …`, `ci: …`, `test: …`, `chore: …`                                                 | No release                |

A release creates the git tag `vX.Y.Z` and a GitHub release with release notes, pushes the Docker image `sony2k20/ng-web-portfolio` with the tags `X.Y.Z`, `X.Y`, `X` and `latest`, and sets `X.Y.Z` in the GitOps repository. Pushes without a release-worthy commit are not deployed; running the workflow manually redeploys the latest version. The `version` field in `package.json` is not used.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
