const backDrop = document.querySelector('.back');
const modalBox = document.querySelector('.modal');
const cartBox = document.querySelector('.nav-cart__box')
const btnAdd = document.querySelectorAll('.product-box__content-footer__button');

let products = [
    {
        id: 1,
        tag: 'kabab',
        amount: 0,
        name: 'چلوکباب',
        price: 25,
    },
    {
        id: 2,
        tag: 'joje',
        amount: 0,
        name: 'جوجه کباب',
        price: 30,

    },
    {
        id: 3,
        tag: 'mahi',
        amount: 0,
        name: 'ماهی',
        price: 40,

    },
    {
        id: 4,
        tag: 'morgh',
        amount: 0,
        name: 'مرغ سوخاری',
        price: 20,

    },
    {
        id: 5,
        tag: 'hamburger',
        amount: 0,
        name: 'همبرگر',
        price: 10,
    },
    {
        id: 6,
        tag: 'ash',
        amount: 0,
        name: 'آش رشته',
        price: 15,

    },
]

cartBox.addEventListener('click', () => {
    modalBox.classList.add('active-cart')
});
backDrop.addEventListener('click', () => {
    modalBox.classList.remove('active-cart')
});


for (let i = 0; i < btnAdd.length; i++) {
    btnAdd[i].addEventListener('click', () => {
        cartNumber(products[i]);
        totalCart(products[i]);
    })

}

const onLoad = () => {
    let productNumber = localStorage.getItem('cart-numbers');

    if (productNumber) {
        document.querySelector('.nav-cart__box-amount').textContent = productNumber
    }
}


const cartNumber = (product) => {
    let productNumber = localStorage.getItem('cart-numbers');

    productNumber = parseInt(productNumber);
    if (productNumber) {
        localStorage.setItem('cart-numbers', productNumber + 1);
        document.querySelector('.nav-cart__box-amount').textContent = productNumber + 1
    } else {
        localStorage.setItem('cart-numbers', 1)
        document.querySelector('.nav-cart__box-amount').textContent = 1

    }

    setItems(product)
}

const setItems = (product) => {
    let cartItems = localStorage.getItem('product');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems, [product.tag]: product
            }
        }
        cartItems[product.tag].amount += 1
    } else {
        product.amount = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('product', JSON.stringify(cartItems))
}

const totalCart = (products) => {
    let total = localStorage.getItem('total');

    if (total != null) {
        total = parseInt(total);
        localStorage.setItem('total', total + products.price)
    } else {
        localStorage.setItem('total', products.price)

    }
}

const productInCart = () => {
    let cartBox = JSON.parse(localStorage.getItem('product'));
    let valueBox = parseInt(localStorage.getItem('total'))

    let cart = document.querySelector('.cart')
    if (cartBox && cart) {
        cart.innerHTML = '';
        Object.values(cartBox).map(item => {


            cart.innerHTML +=
                `
                <ul class="cart-list">
                <li class="cart-list__content">
                    <div>
                        <h3 class="cart-list__content-name">${item.name}</h3>
                        <div class="cart-list__content-box">
                            <span class="cart-list__content-box__price">${item.price}/000</span>
                        </div>
                    </div>
                    <div>
                        <button id="btn-minus" class="cart-list__content-box__button">-</button>
                        <span class="cart-list__content-box__amount">${item.amount}</span>
                        <button id="btn-add" class="cart-list__content-box__button">+</button>
                    </div>
                </li>
            </ul>
            
            `
        })
        cart.innerHTML += `
        <div class="cart-button">
        <div class="cart-button__value">مجموع  :  ${valueBox}/000 </div>
        <button>تکمیل سفارش</button>
    </div>   
        `
    }


}

const btnMinusCartButton = () => {
    
    products.map(item => {
        alert(item.amount -= 1);
    })
}
const btnPlusCartButton = () => {
    
    products.map(item => {
        alert(item.amount += 1);
    })
}
onLoad();
productInCart();
