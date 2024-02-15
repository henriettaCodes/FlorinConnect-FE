const path = require('path')
const jsdom = require('jsdom')

const { JSDOM } = jsdom

const renderDom = async (filename) => {

    const filePath = path.join(process.cwd(), filename)
    console.log(filePath)

    const dom = await JSDOM.fromFile(filePath, {
        runScripts: 'dangerously',
        resources: 'usable'
    })

    return new Promise((resolve, _) => {
        dom.window.document.addEventListener('DOMContentLoaded', () => {
            resolve(dom)
        })
    })

}

module.exports = { renderDom }