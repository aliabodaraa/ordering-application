const fs = require('fs');
const path = require('path');
const rootPath = require('../utils/path');

const path_ = path.join(
  rootPath,
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(path_, (err, fileContent) => {
    const isBufferReaderEmpty=!!!fileContent.byteLength;//the case where we not initialize the file products.json with an empty array

    if (err || isBufferReaderEmpty) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(path_, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
