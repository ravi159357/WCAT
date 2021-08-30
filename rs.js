
const fs = require("fs");
//const { setFlagsFromString } = require("v8");
let arguments = process.argv.slice(2); // 0th index-> node ka path 1th index-> current file ka path therefore, we start looking for arguments from the second index
console.log(arguments);
//argument me koi flag nahi hona chahiye aur hoga 1 ya more than 1 flags ho sakta hai
//we need to separate flags from hyphens
let flags = [];
let filenames = []; //

//Segregation
for(let i of arguments)
{
    if(i[0] == '-'){
        flags.push(i);
    }
    else{
        filenames.push(i);
    }        
}
        
        // //console.log(flags);  -> prints the segregated flags array
        // //1. wcat file1 file2 -> prints all files one by one
        // if(flags.length == 0 && filenames.length != 0){ 
        //     for(let file of filenames){
        //         console.log(fs.readFileSync(file, "utf-8"));
        //     }
        // }
        // else{   //whenever flags exist, we need to manipulate according to the flag given
        //     let fileData =
