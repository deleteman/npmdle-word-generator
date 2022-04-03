const names = require("all-the-package-names")
                .filter(name => name.indexOf("@") == -1)
                .filter(name => !name.match(/[0-9]/))
                .map(name => {
                    if(name.indexOf("/") != -1){
                        let parts = name.split("/")
                        return parts[parts.length - 1]
                    }
                    return name
                })
                .filter(name => name.length == 5 && name.indexOf("-") == -1)

const uniqueNames = [...(new Set(names.map(n => n.toLowerCase())))]
                    .map(n => {
                        console.log(n)
                        return (Buffer(n)).toString('base64')
                    })

const fs = require("fs")

function getDate(idx) {
    let newdate = new Date()
    newdate.setHours(0,0,0,0)
    newdate.setDate(newdate.getDate() + idx)
    return newdate.getTime()
}


console.log(names.length)
// => 286289

const words = uniqueNames.sort(() => (Math.random() > 0.5) ? 1 : -1).slice(0, 365)

words.forEach( (w, idx) => {
    console.log("Saving the word: ", w)    
    let fname = getDate(idx)
    let fpath = './words/' + fname
    fs.writeFileSync(fpath, w)
});

console.log("Done...")