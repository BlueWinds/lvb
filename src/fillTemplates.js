const child_process = require('child_process')
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const Handlebars = require('handlebars')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const os = require('os')

const defines = require('./defines')

const nicePrint = (n) => n.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')

Handlebars.registerHelper('getWeight', (mult) => nicePrint(1 + parseFloat(mult, 10)))
Handlebars.registerHelper('multiply', (base, mult) => nicePrint(parseFloat(base, 10) * parseFloat(mult, 10)))

const modFolder = path.resolve(__dirname, '../mod/LVB')
const stellarisModFolder =  path.resolve(os.homedir(), '.local/share/Paradox Interactive/Stellaris/mod/LVB')

rimraf.sync(modFolder)
rimraf.sync(stellarisModFolder)

// Read partial templates
for (const file of glob.sync('**/*.txt', {cwd: path.resolve(__dirname, 'partials')})) {
  const text = fs.readFileSync(path.resolve('src/partials', file)).toString()
  Handlebars.registerPartial(file.split('.')[0], text)
}


// Render and copy text files
for (const file of glob.sync('**/*.{txt,yml,gfx,gui,mod}', {cwd: path.resolve(__dirname, 'templates')})) {
  const text = fs.readFileSync(path.resolve('src/templates', file)).toString()
  const outPath = path.resolve(modFolder, file)
  mkdirp.sync(path.dirname(outPath))
  fs.writeFileSync(outPath, Handlebars.compile(text)(defines))
}

// Add non-english localisation
for (const file of glob.sync('**/*.yml', {cwd: modFolder})) {
  for (const language of ['braz_por', 'french', 'german', 'polish', 'russian', 'simp_chinese', 'spanish']) {
    const text = fs.readFileSync(path.resolve(modFolder, file)).toString()
    const outPath = path.resolve(modFolder, file.replace(/english/g, language))
    mkdirp.sync(path.dirname(outPath))
    fs.writeFileSync(outPath, text.replace('l_english', 'l_' + language))
  }
}

// Copy over dds files
for (const file of glob.sync('**/*.dds', {cwd: path.resolve(__dirname, 'templates')})) {
  const image = fs.readFileSync(path.resolve('src/templates', file))
  const outPath = path.resolve(modFolder, file)
  mkdirp.sync(path.dirname(outPath))
  fs.writeFileSync(outPath, image)
}

// Convert png to dds files
for (const file of glob.sync('**/*.png', {cwd: path.resolve(__dirname, 'templates')})) {
  const outPath = path.resolve(modFolder, file.replace(/png$/, 'dds'))
  mkdirp.sync(path.dirname(outPath))
  child_process.spawnSync('convert', [path.resolve('src/templates', file), outPath])
}

fs.copyFileSync(path.resolve('src/', 'LVB.mod'), modFolder + '.mod')

fs.copySync(modFolder + '.mod', stellarisModFolder + '.mod')
fs.copySync(modFolder + '/', stellarisModFolder + '/')
