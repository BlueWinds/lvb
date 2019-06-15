const fs = require('fs')
const path = require('path')
const glob = require('glob')
const mustache = require('mustache')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

const substitutions = {}
const partials = {}

// Read partial templates
for (const file of glob.sync('**/*.txt', {cwd: path.resolve(__dirname, 'partials')})) {
  const text = fs.readFileSync(path.resolve('src/partials', file)).toString()
  partials[file.split('.')[0]] = text
}

rimraf.sync(path.resolve(__dirname, '../mod/!!!LV Blue Edits/*'))

// Render and copy text files
for (const file of glob.sync('**/*.{txt,yml,gfx,gui}', {cwd: path.resolve(__dirname, 'templates')})) {
  const text = fs.readFileSync(path.resolve('src/templates', file)).toString()
  const outPath = path.resolve(__dirname, '../mod/!!!LV Blue Edits', file)
  mkdirp.sync(path.dirname(outPath))
  fs.writeFileSync(outPath, mustache.render(text, substitutions, partials))
}

// Copy over dds files
for (const file of glob.sync('**/*.dds', {cwd: path.resolve(__dirname, 'templates')})) {
  const image = fs.readFileSync(path.resolve('src/templates', file))
  const outPath = path.resolve(__dirname, '../mod/!!!LV Blue Edits', file)
  mkdirp.sync(path.dirname(outPath))
  fs.writeFileSync(outPath, image)
}
