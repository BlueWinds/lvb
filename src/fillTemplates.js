const fs = require('fs')
const path = require('path')
const glob = require('glob')
const Handlebars = require('handlebars')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

const defines = require('./defines')

const nicePrint = (n) => n.toFixed(3).replace(/0+$/, '')

Handlebars.registerPartial('test_partial', "partial - {{parameter}}")
Handlebars.registerHelper('getWeight', (mult) => nicePrint(1 + parseFloat(mult, 10)))
Handlebars.registerHelper('multiply', (base, mult) => nicePrint(parseFloat(base, 10) * parseFloat(mult, 10)))

// Read partial templates
for (const file of glob.sync('**/*.txt', {cwd: path.resolve(__dirname, 'partials')})) {
  const text = fs.readFileSync(path.resolve('src/partials', file)).toString()
  Handlebars.registerPartial(file.split('.')[0], text)
}

rimraf.sync(path.resolve(__dirname, '../mod/!!!LV Blue Edits/*'))

// Render and copy text files
for (const file of glob.sync('**/*.{txt,yml,gfx,gui}', {cwd: path.resolve(__dirname, 'templates')})) {
  const text = fs.readFileSync(path.resolve('src/templates', file)).toString()
  const outPath = path.resolve(__dirname, '../mod/!!!LV Blue Edits', file)
  mkdirp.sync(path.dirname(outPath))
  fs.writeFileSync(outPath, Handlebars.compile(text)(defines))
}

// Copy over dds files
for (const file of glob.sync('**/*.dds', {cwd: path.resolve(__dirname, 'templates')})) {
  const image = fs.readFileSync(path.resolve('src/templates', file))
  const outPath = path.resolve(__dirname, '../mod/!!!LV Blue Edits', file)
  mkdirp.sync(path.dirname(outPath))
  fs.writeFileSync(outPath, image)
}
