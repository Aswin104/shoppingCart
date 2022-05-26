let products=document.querySelectorAll('.add-cart');

let inCartProducts=[
    {
        name: 'Puma Black',
        tag: 'blacktees',
        price: 900,
        quantity: 0
    },
    {
        name: 'Puma Grey',
        tag: 'greytees',
        price: 700,
        quantity: 0
    },
    {
        name: 'Puma Blue',
        tag: 'lightbluetees',
        price: 800,
        quantity: 0
    },
    {
        name: 'Puma RCB',
        tag: 'rcbtees',
        price: 1000,
        quantity: 0
    },
    {
        name: 'Puma BMW',
        tag: 'whitebmwtees',
        price: 2000,
        quantity: 0
    }
]

products.forEach(function(elem,idx){
    elem.addEventListener('click',()=>{
        cartQuantity(inCartProducts[idx]);
        totalCost(inCartProducts[idx]);
    });
})

window.onload=(event)=>{
    displayCartNum();
    displayCart();
};

function displayCartNum(){
    let productnum=localStorage.getItem('cartnum');
    productnum=parseInt(productnum);
    if(productnum){
        document.querySelector('.cart span').textContent=productnum;
    }
    else{
        document.querySelector('.cart span').textContent=0;
    }
}


function cartQuantity(currProduct){
    let productnum=localStorage.getItem('cartnum');
    productnum=parseInt(productnum);
    let cartnumelem=document.querySelector('.cart span');

    if(productnum){
        localStorage.setItem('cartnum',productnum+1);
        cartnumelem.textContent=productnum+1;
    }
    else{
        localStorage.setItem('cartnum',1);
        cartnumelem.textContent=1;
    }
    setItems(currProduct);
}

function setItems(currProduct){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);

    if(cartItems!=null){
        if(cartItems[currProduct.tag] == undefined){
            cartItems={
                ...cartItems,
                [currProduct.tag]: currProduct
            }
        }
        cartItems[currProduct.tag].quantity+=1;
    }
    else{
        currProduct.quantity=1;
        cartItems={
            [currProduct.tag]: currProduct
        }
    }
    
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}

function totalCost(currProduct){
    let cartCost=localStorage.getItem('totalCost');
    if(cartCost == null){
        localStorage.setItem('totalCost',currProduct.price);
    }
    else{
        cartCost=parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost+currProduct.price);
    }

}

function displayCart(){
    let cartCost=localStorage.getItem('totalCost');
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);

    let productContainer=document.querySelector('.products');
    if(cartItems && productContainer){
        productContainer.innerHTML='';

        Object.values(cartItems).map( (item)=>{    
            productContainer.innerHTML+=`
            <div class="product">
                <ion-icon name="trash" id="${item.tag}" onclick="delProd(this.id)"></ion-icon>
                <img src="./images/${item.tag}.jpg" width="100" height="100">
                <span>${item.name}</span>
                <div class="price">₹ ${item.price}</div>
                <div class="quantity">
                <ion-icon name="remove-circle" id="${item.tag}m" onclick="decrQuan(this.id)"></ion-icon>
                ${item.quantity}
                <ion-icon name="add-circle" id="${item.tag}p" onclick="incrQuan(this.id)"></ion-icon>
                </div>
                <div class="total">₹ ${item.price * item.quantity}
            </div>
            `;
        });

        let cartnum=localStorage.getItem('cartnum');
        cartnum=parseInt(cartnum);
        if(cartnum){
            productContainer.innerHTML+=`
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal"> ${cartCost}</h4>
            </div>
            `;
        } 
    }
}

function incrQuan(product){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);

    let totalCost=localStorage.getItem('totalCost');
    totalCost=parseInt(totalCost);
    let cartnum=localStorage.getItem('cartnum');
    cartnum=parseInt(cartnum);
    cartItems[product.slice(0,-1)].quantity+=1;
    localStorage.setItem('totalCost',totalCost+cartItems[product.slice(0,-1)].price);
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
    localStorage.setItem('cartnum',cartnum+1);
    displayCartNum();
    displayCart();
}
function decrQuan(product){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);

    let totalCost=localStorage.getItem('totalCost');
    totalCost=parseInt(totalCost);
    let cartnum=localStorage.getItem('cartnum');
    cartnum=parseInt(cartnum);
    cartItems[product.slice(0,-1)].quantity-=1;
    localStorage.setItem('totalCost',totalCost-cartItems[product.slice(0,-1)].price);
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
    localStorage.setItem('cartnum',cartnum-1);
    displayCartNum();
    displayCart();
}
function delProd(product){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);

    let totalCost=localStorage.getItem('totalCost');
    totalCost=parseInt(totalCost);
    let cartnum=localStorage.getItem('cartnum');
    cartnum=parseInt(cartnum);
    cartnum-=cartItems[product].quantity;
    localStorage.setItem('cartnum',cartnum);
    displayCartNum();
    localStorage.setItem('totalCost',totalCost- (cartItems[product].quantity*cartItems[product].price) );
    delete cartItems[product];
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
    displayCart();
}