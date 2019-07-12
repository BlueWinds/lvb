const child_process = require('child_process')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const Handlebars = require('handlebars')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

const defines = require('./defines')

const nicePrint = (n) => n.toFixed(3).replace(/0+$/, '')

const modFolder = path.resolve(__dirname, '../mod/!!!LVB')
const modNoTradFolder = path.resolve(__dirname, '../mod/!!!LVB Traditionless')
rimraf.sync(modNoTradFolder)

// Copy over dds files
for (const file of glob.sync('**/*.*', {cwd: modFolder})) {
  const outPath = path.resolve(modNoTradFolder, file)
  mkdirp.sync(path.dirname(outPath))
  fs.copyFileSync(path.resolve(modFolder, file), outPath)
}

rimraf.sync(path.resolve(modNoTradFolder, 'interface/topbar_traditions_view.gui'))
rimraf.sync(path.resolve(modNoTradFolder, 'interface/lvb_traditions_icons.gfx'))
rimraf.sync(path.resolve(modNoTradFolder, 'gfx/interface/icons/traditions'))
rimraf.sync(path.resolve(modNoTradFolder, 'gfx/interface/traditions'))

fs.copyFileSync(path.resolve('src/', '!!!LVB Traditionless.mod'), modNoTradFolder + '.mod')
