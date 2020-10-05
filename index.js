const parse = require('./parse')
const handlebars = require('handlebars')
const data = require('./data.json')
const query = require('./query.json')
var fs = require('fs')

async function parseData(){
    let parsed = await parse(data)
    let str = ''

    for(let i = 0; i < parsed.length; i++){
        let template = handlebars.compile(parsed[i].snippets[0])
        str += `${parsed[i].environment} ${template(query)}`
    }

    fs.writeFileSync('./out.txt', str)
}

parseData()
