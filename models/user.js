const mongodb=require('mongodb');
const { getDB } = require('../utils/database');
const ObjectId=mongodb.ObjectId;

class User {
  constructor(username, email){
    this.name=username;
    this.email=email;
  }
  save(){
    const db=getDB();
    return db.collection('users').insertOne(this)
  }
  static findById(userId){
    const db=getDB();
    return db.collection('users').findOne({_id:new ObjectId(userId)})
    //or
    //return db.collection('users').find({_id:new ObjectId(userId)}).next()
  }
}

module.exports = User;
