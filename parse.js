var handlebars = require('handlebars')
var exec = require('child_process').execSync
module.exports = function parse(data, query){
    return new Promise((resolve, reject)=> {
        let parsed = []
        let str = ''
        let nodes = data.data
        if(nodes.allJobs.nodes.length == 0) reject()
        for(let i = 0; i < nodes.allJobs.nodes.length; i++){
            let node = nodes.allJobs.nodes[i]
            str += `Job name: ${node.name}\n`
            if(node.tasksByJobId.nodes.length == 0) reject()
            for(let i = 0; i < node.tasksByJobId.nodes.length; i++){
                let node1 = node.tasksByJobId.nodes[i]
                let task = {snippets: [], environment: node1.environment, name: node1.name}
                // str += ` Task name: ${node1.name}\n`
                // str += ` Task docker environment: ${node1.environment}\n`
                
                if(node1.snippetsByTaskId.nodes.length == 0) reject()
                for(let i = 0; i < node1.snippetsByTaskId.nodes.length; i++){
                    let node2 = node1.snippetsByTaskId.nodes[i]
                    // str += `  Snippet name: ${node2.name}\n`
                    // str += `  Snippet code: ${node2.text}\n`



                    task.snippets.push(node2.text)


                    // let template = handlebars.compile(node2.text)
                    // str += `  Snippet resolved: ${template(query)}\n`
                    // exec(`${node1.environment} ${template(query)}`, {stdio: 'inherit'})
                    // resolve(str)
                }

                parsed.push(task)
            }
        }

        resolve(parsed)
    })    
}

//docker run -v $PWD:/images --rm -d v4tech/imagemagick