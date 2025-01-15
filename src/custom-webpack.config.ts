import { EnvironmentPlugin } from 'webpack'
const Dotenv = require('dotenv-webpack')
module.exports = {
  optimization: {
    usedExports: true, // Tree-shaking for used exports
    minimize: true, // Enable code minimization
    sideEffects: true, // Use sideEffects flag from package.json
  },
  mode: 'production',
  plugins: [new Dotenv()],
}
