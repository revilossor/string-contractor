const doAndAdd = func => files => [
  ...files.map(func),
  ...files.map(file => `git add ${file}`)
]

module.exports = {
  './package.json': doAndAdd(file => `sort-package-json ${file}`),
  '.github/workflows/*.yml': doAndAdd(file => `github-actions-linter ${file}`),
  '*.ts': doAndAdd(file => `eslint ${file} --fix`)
}
