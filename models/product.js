var products = [];
const fs =require('fs')
const path =require('path')
const rootPath=require('../utils/path')

const path_=path.join(rootPath, 'data','products.json');

const getProductsFromFile = cb =>{
    fs.readFile(path_,(err, fileContent)=>{
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports=class Product{
    constructor(title){
        this.title=title
    }
    save(){
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(path_, JSON.stringify(products), (err)=>{
                console.log(err)
            });
        });
    }
    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}