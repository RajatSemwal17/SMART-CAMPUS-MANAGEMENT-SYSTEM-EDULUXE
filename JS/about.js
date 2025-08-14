import {products} from './data/products.js';

let productHTML = '';

products.forEach((product) => {
  productHTML += `
    <div class="box1">
      <img src=${product.image} class="image">
      <div class="heading">${product.title}</div>
      <div class="cnt">
        ${product.para}
      </div>
    </div>
    <br>
  `
})
console.log(productHTML);
document.querySelector('.content').innerHTML = productHTML;