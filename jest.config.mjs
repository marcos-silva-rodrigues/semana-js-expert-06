const defaultConfig = {
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "text",
    "lcov"
  ],
  coverageThreshold: {
    global: {
      branch: 100,
      function: 100,
      lines: 100,
      statements: 100,
    }
  },
  maxWorkers: '50%',
  watchPathIgnorePatterns: [
    "node_modules"
  ],
  transformIgnorePatterns: [
    "node_modules"
  ]
}

export default {
  projects: [{
    ...defaultConfig,
    textEnvironment: "node",
    displayName: "backend",
    collectCoverageForm: [
      "server/",
      "!server/index.js",
    ],
    transformIgnorePatterns: [
      ...defaultConfig.transformIgnorePatterns,
      "public"
    ],
    testMatch: [
      "**/tests/**/server/**/*.test.js"
    ]
  },
  {
    ...defaultConfig,
    textEnvironment: "jsdom",
    displayName: "frontend",
    collectCoverageForm: [
      "public/",
    ],
    transformIgnorePatterns: [
      ...defaultConfig.transformIgnorePatterns,
      "server"
    ],
    testMatch: [
      "**/tests/**/public/**/*.test.js"
    ]
  }]
}