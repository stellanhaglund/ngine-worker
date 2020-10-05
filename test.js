const exec = require('child_process').execSync
var query = require('./query.json')

let test = 'test'

let str = `
    #! /bin/bash


    cat <<EOF > ./out.test 
    ${JSON.stringify(query)}
    EOF

    echo test

    cat <<EOF > ./out1.test
    ${JSON.stringify(query)}
    EOF
    `




exec(str, {stdio: 'inherit'})