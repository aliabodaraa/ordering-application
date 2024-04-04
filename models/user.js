const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  cart:{
    items:[{
      productId:{type:Schema.Types.ObjectId,ref:'Product',required:true},
      quantity:{type:Number,required:true}
    }]
  }
});
userSchema.methods.addToCart = function(product){
  const cartProductIndex=this.cart.items.findIndex(item=>{
    console.log("1--",item.productId,"2--",product._id)
    //item.productId is the id of the product object
    //.toString() convert new ObjectId("660ef8f5f3fb003d73eab0b8") to "660ef8f5f3fb003d73eab0b8"
    return item.productId.toString()===product._id.toString()
  });
  let newQuantity=1;
  const updatedCartItems=[...this.cart.items];

  if(cartProductIndex >= 0){
    newQuantity=updatedCartItems[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity=newQuantity;
  }else{
    updatedCartItems.push({productId: product._id, quantity:1})
  }
  const updatedCart={items:updatedCartItems};
  this.cart=updatedCart;
  return this.save();
}
userSchema.methods.removeFromCart = function(productId){
  const updatedCartItems=this.cart.items.filter(item=>{
    //item._id is the id of the items object
    console.log(item._id.toString(),"----",productId.toString(),this.cart.items)
    return item._id.toString() !== productId.toString();
  });
  this.cart.items=updatedCartItems;
  return this.save();
}
userSchema.methods.clearCart=function(){
  this.cart={items:[]};
  return this.save();
}

module.exports = mongoose.model('User',userSchema);