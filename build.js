const child_process = require('child_process')
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const os = require('os')

const modFolder = path.resolve(__dirname, './LVB')
const stellarisModFolder =  path.resolve(os.homedir(), '.local/share/Paradox Interactive/Stellaris/mod/LVB')

rimraf.sync(modFolder)
rimraf.sync(stellarisModFolder)

// Render and copy text files
for (const file of glob.sync('**/*.{txt,yml,gfx,gui,mod}', {cwd: path.resolve(__dirname, 'src')})) {
  fs.copySync(path.resolve('src/', file), path.resolve(modFolder, file))
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
for (const file of glob.sync('**/*.dds', {cwd: path.resolve(__dirname, 'src')})) {
  const image = fs.readFileSync(path.resolve('src/', file))
  const outPath = path.resolve(modFolder, file)
  mkdirp.sync(path.dirname(outPath))
  fs.writeFileSync(outPath, image)
}

// Convert png to dds files
for (const file of glob.sync('**/*.png', {cwd: path.resolve(__dirname, 'src')})) {
  const outPath = path.resolve(modFolder, file.replace(/png$/, 'dds'))
  mkdirp.sync(path.dirname(outPath))
  child_process.spawnSync('convert', [path.resolve('src/', file), outPath])
}

fs.copySync(modFolder + '/', stellarisModFolder + '/')
