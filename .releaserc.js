const config = {
  branches: [{ name: 'master' }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
  repositoryUrl: 'https://github.com/fastndead/poker.git',
  dryRun: false,
  debug: false, // Set to "true" for debugging purposes
}

module.exports = config
