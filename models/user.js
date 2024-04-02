const mongodb=require('mongodb');
const { getDB } = require('../utils/database');
const ObjectId=mongodb.ObjectId;

class User {
  constructor(username, email, cart, id){
    this.name=username;
    this.email=email;
    this.cart=cart;//{items:[]}
    this._id=id;
  }
  save(){
    const db=getDB();
    return db.collection('users').insertOne(this)
  }
  addToCart(product){
    const cartProductIndex=this.cart.items.findIndex(cp=>{
      console.log("1--",cp.productId,"2--",product._id)
      return cp.productId.toString()===product._id.toString()
    });
    let newQuantity=1;
    const updatedCartItems=[...this.cart.items];

    if(cartProductIndex >= 0){
      newQuantity=this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity=newQuantity;
    }else{
      updatedCartItems.push({productId:new ObjectId(product._id), quantity:1})
    }
    const updatedCart={items:updatedCartItems};
    const db=getDB();
    return db.collection('users').updateOne({_id:new ObjectId(this._id)}, {$set:{cart:updatedCart}});
  }
  static findById(userId){
    const db=getDB();
    return db.collection('users').findOne({_id:new ObjectId(userId)})
    //or
    //return db.collection('users').find({_id:new ObjectId(userId)}).next()
  }
}

module.exports = User;
