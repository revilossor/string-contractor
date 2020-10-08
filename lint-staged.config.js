const doAndAdd = func => files => [
  ...files.map(func),
  ...files.map(file => `git add ${file}`)
]

module.exports = {
  './package.json': doAndAdd(file => `sort-package-json ${file}`),
  '*.ts': doAndAdd(file => `eslint ${file} --fix`)
}
