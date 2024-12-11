const cart = document.querySelector(".products")
const cartContainer = document.querySelector(".cart")
const productContainer = document.querySelector(".productContainer")
const loader = document.querySelector(".loader")
const addToCartBtn = document.getElementById("addToCartBtn")
const closeCart = document.querySelector("#closeCart")
const viewPurchase = document.querySelector(".viewPurchase")
const totalAmount = document.getElementById("totalPrice")

addToCartBtn.addEventListener("click", ()=>{
    const btn=cartContainer.classList.toggle("visible")
})
closeCart.addEventListener("click", ()=>{
    cartContainer.classList.remove("visible")
})

function show(){
    loader.classList.add("loader")
}
function hide(){
    loader.classList.remove("loader")
}
show()
fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(productsArray=>{
                hide()
                displayProductUi(productsArray)
            })
            .catch(err => console.error("Error fetching products:", err));

function displayProductUi(data){
    productContainer.innerHTML = ""
    data.forEach((product)=>{
        const div = document.createElement("div")
        div.classList.add("product")
        div.innerHTML = `
            <div class="img">
                <img src="${product.image}" alt="">
            </div>
                <div class="content">
                <h2 class="lineClamp">${product.title}</h2>
                <p class="lineClamp">${product.description}</p>
                <button onclick = "pushToCart('${product.image}','${product.title}','${product.price}','${product.description}', '${product.id}')" class="btn">Add To Cart</button>
            </div>
        `
        productContainer.appendChild(div)
    })
}

let cartArray =JSON.parse(localStorage.getItem("cartItems")) || []
displayCart(cartArray)


function displayCart(cartArray){
        cart.innerHTML = ""
        cartArray.forEach((product)=>{
            const div = document.createElement("products")
            div.classList.add("product")
            div.innerHTML = `
                <div class="img">
                    <img src="${product.image}" alt="">
                </div>
                <div class="content">
                <h2 class="lineClamp">${product.title}</h2>
                <p class="lineClamp">${product.description}</p>
                <p class="price" >${product.price}</p>
                <button class="btn" onclick="deleteCart(${product.id})">Delete</button>
            </div>
            `
            cart.appendChild(div)
        }) 
        calcTotal()
}
function pushToCart(image, title, price,description, id){
    id = Number(id)
    cartArray.push({
        image,
        title,
        price,
        description,
        id,
    })
    localStorage.setItem("cartItems", JSON.stringify(cartArray))
    displayCart(cartArray)
    // console.log(cartArray)
        viewPurchase.classList.toggle("view")
        setTimeout(() => {
            viewPurchase.classList.remove('view');
          }, 1500);
    calcTotal()
}

function calcTotal(){
    let totalPrice = 0
    cartArray.forEach((product)=>{
        totalPrice += parseFloat(product.price)
    })
    totalAmount.textContent = `total: ${totalPrice.toFixed(2)}`
}

function deleteCart(id){
    cartArray = cartArray.filter((product) => product.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(cartArray));
    displayCart(cartArray);
}
