#!/usr/bin/env node


const fs = require("fs");
const { stringify } = require("querystring");
 
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];  
let secondaryArguments = [];

for(let i of arguments){
    if(i[0] == "-"){
        flags.push(i);
    } else if(i[0] == "$") {
        secondaryArguments.push(i.slice(1));
    }else{
        filenames.push(i);
    }
}

// if(flags.length == 0 && filenames.length!=0){
//     for(let file of filenames){
//         console.log(fs.readFileSync(file,"utf-8"));
//     }
// }else{
//     for(flag of flags){
//         if(flag == "-rs"){
//             for(let file of filenames){
//                 let fileData = fs.readFileSync(file,"utf-8")
//                 console.log(fileData.split(" ").join(""));
//             }
//         }
//     }
// }

for(let file of filenames){
    let fileData =fs.readFileSync(file,"utf-8");
    for(let flag of flags){
        if(flag == "-rs"){
            fileData = removeAll(fileData," ");
          // fileData = fileData.split(" ").join("");

        }
        if(flag == "-rn"){
            fileData = removeAll(fileData,"\r\n");
          // fileData = fileData.split("\r\n").join("");
        }
        if(flag == "-rsc") {
            for(let secondaryArgument of secondaryArguments) {
                fileData = removeAll(fileData,secondaryArgument);
                //fileData = fileData.split("\r\n").join("");
            }
        }

        if(flag == "-rc"){
            for(let secondaryArgument of secondaryArguments){
                fileData=fileData.split(secondaryArgument).join("");
            }    
        }

        if(flag == "-s"){
            //fileData = fileData.split("\r\n").join("");
            fileData = addSequence(fileData);
        }

        if(flag == "-sn"){
            //fileData = fileData.split("\r\n").join("");
            fileData = addSequenceTnel(fileData);
        }

        if(flag == "-rel"){   
            removeExtraLines(fileData);
            // printing in function directly
        }

        if(flag == "-rmel"){   
            removeManyExtraLines(fileData);
            // printing in function directly           
        }

        

    }
   // console.log(fileData);
}

function removeAll(string, removalData) {
    return string.split(removalData).join("");
}

function addSequence(content){
    let contentArr = content.split("\r\n");
    for(let i=0;i<contentArr.length;i++){
        contentArr[i] = (i+1) + " " + contentArr[i];
    }
    return contentArr;
}
function addSequenceTnel(content){
    let contentArr = content.split("\r\n");
    let count=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i] = (count++) + " " + contentArr[i];
        }
    }
    return contentArr;
}

function removeExtraLines(content){
    let contentArr = content.split("\r\n");
    let ansArr=[];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            ansArr.push(contentArr[i]);
        }
    }
    for(let i=0;i<ansArr.length;i++){
      //  console.log(ansArr[i]);
    }

}

function removeManyExtraLines(content){
    let contentArr = content.split("\r\n");
    let data = [];
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i]=null;
        }
        if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i]=null;
        }
    }
    console.log("loop 1 ended");
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            data.push(contentArr[i]);
        }
    }

    for(let i=0;i<data.length;i++){
        console.log(data[i]);
      }
      
}