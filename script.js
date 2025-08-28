class Product {
  constructor(name, price, img, quantity) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.quantity = quantity;
  }
}

class Cart {
  constructor() {
    this.items = [];
  }
  addToCart(product) {
    let newProductName = product.name.trim().toLowerCase();
     let sameName = null;
    for (let i = 0; i<this.items.length; i ++){
      let existingProduct = this.items[i].name.trim().toLowerCase();
      if(newProductName === existingProduct){
          sameName = this.items[i];
          break;
      }
    } 
    if(sameName){
    if(product.price == sameName.price){
      sameName.quantity = parseInt(sameName.quantity) + parseInt(product.quantity);
    }else{
      let totalquantity = parseInt(sameName.quantity) + parseInt(product.quantity);
      let totalPrice = parseInt(sameName.price) + parseInt(product.price);
      sameName.price = Math.round(totalPrice/totalquantity)
      sameName.quantity = totalquantity;
    }
  }else{
   this.items.push(product);
  }
this.displayCart();
  }

  removeFromCart(index) {
    this.items.splice(index, 1);
    this.displayCart();
  }

  updateQuantity(index, newQuantity) {
    this.items[index].quantity = parseInt(newQuantity);
    this.displayCart();
  }
  paying(index) {
    const item = this.items[index];
    const confirmPaying = confirm(
      `Are you sure, you want to pay for this item ${item.name} !`
    );
    if (confirmPaying) {
      alert("You have paid successfully!");
      this.items.splice(index, 1);
      this.displayCart();
    }
  }
  displayCart() {
    const showCart = document.getElementById("cart-body");
    let total = 0;
    let cartBody = `<table class="cart-body" border="1" cellspacing="0" cellpadding="5">
     <thead>
        <tr>
          <th>Product Name</th>
          <th>Picture</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      `;
    this.items.forEach((item, index) => {
      total += item.price * item.quantity;
      cartBody += `
      <tr>
        <td>${item.name}</td>
        <td><img src="${item.img}" width="60"/></td>
        <td>${item.price.toLocaleString()}</td>
       <td>
  <input id = "changeQuantities" type="number" min="1" value="${item.quantity}" 
    onchange="cart.updateQuantity(${index}, this.value)" />
</td>
        <td><button onclick="cart.removeFromCart(${index})">
        <i class="fa-solid fa-trash"></i> Delete</button>
       <button class="pay-btn" onclick="cart.paying(${index})">
    <i class="fa-solid fa-credit-card"></i> Pay
  </button>
      </tr>
    `;
    });
    cartBody += `
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" style="text-align:right;"><strong>Total:</strong></td>
          <td>${total.toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>
  `;
    showCart.innerHTML = cartBody;
  }
}
const cart = new Cart();
function add(event) {
  event.preventDefault();
  const name = document.getElementById("productName").value;
  const price = Number(document.getElementById("inputPrice").value);
  const img = document.getElementById("inputPicture").value;
  const quantity = Number (document.getElementById("inputQuantity").value);

  if (!name || !price || !quantity) {
    alert("Make sure you enter all of the necessary information!");
    return;
  }

  const product = new Product(name, price, img, quantity);
  cart.addToCart(product);
   document.getElementById("productName").value ="";
   document.getElementById("inputPrice").value = "";
   document.getElementById("inputPicture").value = "";
   document.getElementById("inputQuantity").value ="";

}

const addProduct = document.getElementById("addProduct").addEventListener("keydown", (event) => {
  if(event.key == "Enter"){
    add(event);
  }
});




const productDemo1 = new Product(
  "Blue t-shirt",
  500000,
  "pictures/blueT-Shirt.jpeg",
  1
);

const productDemo2 = new Product(
  "Iphone 16 Pro Max",
  27000000,
  "pictures/iphone.jpeg",
  1
);
const productDemo3 = new Product(
  "Adidas Sneaker",
  350000,
  "pictures/sneaker.jpeg",
  2
);

cart.addToCart(productDemo1);
cart.addToCart(productDemo2);
cart.addToCart(productDemo3);
