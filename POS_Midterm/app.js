let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
const pay = document.getElementById("buys");




openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Blue Berry Meowfins',
        image: 'p1.jpg',
        price: 39
    },
    {
        id: 2,
        name: 'Purrfect Peach Mango Tango',
        image: 'p2.jpg',
        price: 39
    },
    {
        id: 3,
        name: 'Cool Cat Mocha Frappe',
        image: 'p3.jpg',
        price: 29
    },
    {
        id: 4,
        name: 'Lemon Meringue Paws',
        image: 'p4.jpg',
        price: 45
    },
    {
        id: 5,
        name: 'Berry Blast Iced Tea',
        image: 'p5.jpg',
        price: 39
    },
    {
        id: 6,
        name: 'Meowcha Latte',
        image: 'p6.jpg',
        price: 29
    }
];
let listCarts  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="asset/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">₱${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}

initApp();
function addToCard(key){
    if(listCarts[key] == null){
        listCarts[key] = JSON.parse(JSON.stringify(products[key]));
        listCarts[key].quantity = 1;
        window.alert(`Added successful`);
    }
    reloadCard(); 
}

function calculateTotalPrice() {
    let totalPrice = 0;
    listCarts.forEach((value) => {
        if (value != null) {
            totalPrice = totalPrice + value.price ;
        }
    });
    return totalPrice;
}
    
pay.addEventListener('click', function(){
    
    let hold = document.getElementById('payment').value;
    let totalPrice = calculateTotalPrice();
    console.log(totalPrice);
    hold = Number(hold);
    if( totalPrice === 0){
        info.textContent = `No item in your cart`;
    }else if( hold < 1){
        info.textContent = `Please Input Amount`;
    } else if(hold < totalPrice){
        info.textContent = `₱${hold} insufficient amount`;
    } else if( hold >= totalPrice){
        let change = hold - totalPrice;
        info.textContent = `Thank you for your purchase. Change ₱${change}`;
        setTimeout(()=>{
            location.reload(true);
        },2000)
    }
    
    console.log(hold);
});

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = calculateTotalPrice();
    listCarts.forEach((value, key) => {
        count += value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="asset/${value.image}"/></div>
                <div>${value.name}</div>
                <div>₱${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        };
    });  
    
    total.innerText = `Total: ₱${totalPrice.toLocaleString()}`; 
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCarts[key];
    }else{
        listCarts[key].quantity = quantity;
        listCarts[key].price = quantity * products[key].price;
    }
    reloadCard();
}
