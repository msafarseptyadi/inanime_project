import nextJest from 'next/jest.js'
 
/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}',  // cover komponen
    'app/**/*.{js,jsx,ts,tsx}',             // cover pages
    'src/libs/**/*.{js,jsx,ts,tsx}',        // cover utilities/libs
    '!**/node_modules/**',                  // exclude node_modules
    '!**/.next/**',                         // exclude .next build folder
    '!**/*.d.ts',                           // exclude type declarations
  ],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)