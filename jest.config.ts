import { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  
  setupFilesAfterEnv: ['./jest.setup.ts'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    
  },

  //below adds table to test results showing test coverage etc
  collectCoverage: true,
 
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["src/**/*.{ts,tsx,js}","!src/test/","!src/index.*", "!src/*.{ts,tsx,js}"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)