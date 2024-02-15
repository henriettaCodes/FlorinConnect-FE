const { renderDom } = require('./helper')

let dom
let document

describe('index.htmll', () => {
    beforeEach(async () => {
        const jsdomConfig = {
            url: 'http://localhost',
            storageQuota: 10000000,
            localStorage: {},
        }
        dom = await renderDom('./HTML/public/index.html', jsdomConfig)
        document = await dom.window.document
    })

    it('has a navbar with correct buttons', () => {
        const navbar = document.querySelector('nav')
        expect(navbar).toBeTruthy()
    })
})