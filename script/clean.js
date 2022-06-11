const fs = require('fs')
const fsPromises = fs.promises

fsPromises.rm('lib', { recursive: true }).catch(e => console.error(e))
