var products = [];
const fs =require('fs')
const path =require('path')
const rootPath=require('../utils/path')

module.exports=class Product{
    constructor(title){
        this.title=title
    }
    save(){
        const p=path.join(rootPath, 'data','products.json');
        fs.readFile(p, (err, fileContent)=>{
            let products=[];
            if(!err){
                products=JSON.parse(fileContent);
            }

            products.push(this);

            fs.writeFile(p, JSON.stringify(products), (err)=>{
                console.log(err)
            });
        });
    }
    static fetchAll(cb){
        const path_=path.join(rootPath, 'data','products.json');
        fs.readFile(path_,(err, fileContent)=>{
            if(err){
                cb([]);
            }
            cb(JSON.parse(fileContent));
        })
    }
}