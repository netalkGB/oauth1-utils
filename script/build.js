const spawn = require('cross-spawn-promise')
const fs = require('fs')
const fsPromises = fs.promises

async function main () {
  try {
    await spawn('tsc', ['--build', 'tsconfig.json'], { stdio: 'inherit', stderr: 'inherit' })
    await fsPromises.cp('exportEsm.mjs', 'lib/exportEsm.mjs')
  } catch (e) {
    console.error(e)
  }
}

main()
