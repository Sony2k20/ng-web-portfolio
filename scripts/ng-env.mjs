// Runs the Angular CLI with variables from .env (or the shell) exposed as NG_APP_ENV.
// Replaces dotenv-webpack, which only worked with the Webpack builder.
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const KEYS = ['URL', 'COOKIES', 'EMAIL_SERVER_URL', 'EMAIL_ADRESS']

if (existsSync('.env')) process.loadEnvFile('.env')

const env = Object.fromEntries(
  KEYS.filter((key) => process.env[key]).map((key) => [key, process.env[key]]),
)

const { status } = spawnSync(
  'ng',
  [...process.argv.slice(2), '--define', `NG_APP_ENV=${JSON.stringify(env)}`],
  { stdio: 'inherit', shell: process.platform === 'win32' },
)
process.exit(status ?? 1)
