const exec = require('child_process').execSync
const parse = require('./parse')
const handlebars = require('handlebars')
const data = require('./data.json')
const query = require('./query.json')
const fs = require('fs')


async function parseData(){
    let parsed = await parse(data)

    for(let i = 0; i < parsed.length; i++){
        let template = handlebars.compile(parsed[i].snippets[0])
        exec(`${parsed[i].environment} "${template(query)}"`, {stdio: 'inherit'})
        // str += `${parsed[i].environment} ${template(query)}`
    }

    fs.writeFileSync('./out.txt', `${parsed[i].environment} "${template(query)}"`)
}

parseData()
