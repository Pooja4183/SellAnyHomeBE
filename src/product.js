const { readFile } = require('fs/promises');
const path = require('path');

const getProducts = () => {
  const a = path.resolve('./assests/product.json');
  console.log(a, 'data found');
  const data = readFile(a, { encoding: 'utf8' });
  console.log('Inside Products', data);
  return data;
};

module.exports = getProducts;
