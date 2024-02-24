const {MongoClient}=require('mongodb');
const ins_MongoClient=new MongoClient("mongodb://localhost:27017")
let _db;
const mongoconnect = (callback)=>{
    ins_MongoClient.connect()
    .then(client=>{
        callback()
        _db=client.db()
        console.log("Connect___")
    })
    .catch(err=>console.log("err",err))
}

const getDB=()=>{
    if(_db)
        return _db;
    throw "No Database Found"
}

exports.mongoconnect=mongoconnect;
exports.getDB=getDB;