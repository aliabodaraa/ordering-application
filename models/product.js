
const mongodb= require('mongodb')
const getDb = require('../utils/database').getDB;

class Product{
  constructor(title, price, description, imageUrl, id, userId){
    this.title=title;
    this.price=price;
    this.description=description;
    this.imageUrl=imageUrl;
    this._id=id?new mongodb.ObjectId(id):null;
    this.userId=userId
  }

  save(){
    const db = getDb();
    let dbOpt;
    if(this._id){
      //Update The Product
      dbOpt=db.collection('products').updateOne({_id:this._id}, {$set:this})
    }else{
      dbOpt=db.collection('products').insertOne(this)
    }

    return dbOpt
    .then(result=>{
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('products').find()
    .toArray()
    .then(result=>{
      // console.log("--result--",result)
      return result
    })
    .catch(err=>{
      console.log(err)
    })
  }

  static fetchById(prodId){
    const db = getDb();
    return db.collection('products').find({_id: new mongodb.ObjectId(prodId)})
    .next()
    .then(result=>{
      console.log(result)
      return result
    })
    .catch(err=>{
      console.log(err)
    })
  }

  static deleteById(prodId){
    const db = getDb();
    return db.collection('products')
    .deleteOne({_id: new mongodb.ObjectId(prodId)})
    .then(result=>{
      console.log(result)
      console.log("DELETED PRODUCT PROCESS ENDS SUCCESSFULLY")
      return result;
    })
    .catch(err=>{
      console.log(err)
    })
  }

}

module.exports = Product;