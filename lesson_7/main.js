const mainEl = document.querySelector('main');

const products = [];
const cart = [];

let lastId = 1;

function Product(title, price, img) {
    this.id = lastId++;
    this.title = title;
    this.price = price;
    this.img = img;
    this.quantity = 1;
}

function loadProducts() {
    const entity = ['Shirt', 'Shoes', 'Hat', 'Pants', 'Skirt', 'Jacket'];
    const colors = ['Red', 'White', 'Black', 'Green', 'Yellow'];
    for (let i = 0; i < 9; i++) {
        const title = entity[_.random(0, entity.length - 1)] + ' ' + colors[_.random(0, colors.length - 1)]
        products.push(new Product(title, _.random(10, 999), `img/${i + 1}.png`));
    }
}

function drawProductCard(product) {
    const cardEl = document.createElement('DIV');
    const imgEl = document.createElement('IMG');
    const titleEl = document.createElement('P');
    const priceEl = document.createElement('P');
    const btnEl = document.createElement('BUTTON')

    cardEl.classList.add('product-card');
    imgEl.classList.add('product-card__img');
    titleEl.classList.add('product-card__title');
    priceEl.classList.add('product-card__price');
    btnEl.classList.add('product-card__btn');

    imgEl.setAttribute('src', product.img);
    titleEl.textContent = product.title;
    priceEl.textContent = product.price + '$';
    btnEl.textContent = 'В Корзину';
    btnEl.setAttribute('data-id', product.id)

    cardEl.append(imgEl);
    cardEl.append(titleEl);
    cardEl.append(priceEl);
    cardEl.append(btnEl);

    mainEl.append(cardEl);
}

function drawProducts() {
    for (let product of products) {
        drawProductCard(product)
    }
}

loadProducts();
drawProducts();


const basket = [];
const strBasket = document.querySelector('#cart')
const strBasketEdit = document.querySelector('#basketEdit')



var x = document.querySelectorAll(".product-card__btn");
for (var i = 0; i < x.length; i++)

    x[i].onclick = function () {
        var idPos = this.getAttribute('data-id');

        var item = { 'item': products[idPos - 1].title, 'amount': 1, 'price': products[idPos - 1].price };
        basket.push(item);

        updateBasketInfo();
    }


function updateBasketInfo() {
    var items = 0;
    var totalSum = 0;
    for (var i = 0; i < basket.length; i++) {
        items = items + basket[i].amount;
        totalSum = totalSum + basket[i].price;
    }
    strBasket.innerHTML = 'В корзине ' + items + ' товара на ' + totalSum + '$';
}


// Нажатие на корзину
function openModal() {
    if (strBasketEdit.style.display == 'block') {
        strBasketEdit.style.display = 'none';
        // Удаляем table
        if (document.querySelector('#editBasket')) {
            document.querySelector('#editBasket').remove();
        }
    } else {
        strBasketEdit.style.display = 'block';
        if (basket.length != 0) {
            viewBasketEdit();
        } else {
            strBasketEdit.innerHTML = 'Ваше корзина пуста.';
        }

    }

}
strBasket.addEventListener('click', openModal);

// добавляем элементы в блок корзины
var divClose = document.createElement('DIV');
divClose.classList.add('basketEditClose');
divClose.innerHTML = 'Закрыть';
strBasketEdit.append(divClose)

divClose.addEventListener('click', openModal);

function viewBasketEdit() {

    if (basket.length == 0) {
        strBasketEdit.innerHTML = 'Ваша корзина пуста.';
    } else {

        // Добавляем в к корзину перечень товаров
        var basketTable = document.createElement('table');
        basketTable.id = 'editBasket';

        var basketTableTR = document.createElement('tr');
        var basketTableTD = document.createElement('td');
        basketTableTD.innerHTML = 'Наименоваие';
        basketTableTR.append(basketTableTD);

        basketTableTD = document.createElement('td');
        basketTableTD.innerHTML = 'Количество';
        basketTableTR.append(basketTableTD);

        basketTableTD = document.createElement('td');
        basketTableTD.innerHTML = 'Цена';
        basketTableTR.append(basketTableTD);
        basketTable.append(basketTableTR);

        // Перебираем корзину и выводим значения на экран
        totalSum = 0
        for (var i = 0; i < basket.length; i++) {
            var basketTableTR = document.createElement('tr');
            basketTableTR.id = 'basket_row_' + i;

            var basketTableTD = document.createElement('td');
            basketTableTD.innerHTML = basket[i].item;
            basketTableTR.append(basketTableTD);

            basketTableTD = document.createElement('td');
            basketTableTD.innerHTML = basket[i].amount;
            basketTableTR.append(basketTableTD);

            basketTableTD = document.createElement('td');
            basketTableTD.innerHTML = basket[i].price;
            basketTableTR.append(basketTableTD);

            basketTableTD = document.createElement('td');
            basketTableTD.innerHTML = 'Удалить';
            basketTableTD.classList.add('del_item');
            basketTableTD.setAttribute('basket-id', i);

            basketTableTR.append(basketTableTD);
            basketTable.append(basketTableTR);
            totalSum = totalSum + basket[i].price;
        }
        var basketTableTR = document.createElement('tr');
        var basketTableTD = document.createElement('td');
        basketTableTD.innerHTML = 'Итого';
        basketTableTR.append(basketTableTD);

        basketTableTD = document.createElement('td');
        basketTableTD.id = 'basket_total_sum';

        basketTableTD.innerHTML = totalSum;
        basketTableTR.append(basketTableTD);
        basketTable.append(basketTableTR);
        strBasketEdit.append(basketTable);

        // обработчик удаления строки
        var row_del = document.querySelectorAll(".del_item");
        for (var i = 0; i < row_del.length; i++) {
            row_del[i].onclick = function () {
                var idRow = this.getAttribute('basket-id');
                document.querySelector('#basket_row_' + idRow).remove();
                basket.splice(idRow, 1);

                if (document.querySelector('#editBasket')) {
                    document.querySelector('#editBasket').remove();
                }
                viewBasketEdit();

                document.querySelector('#basket_total_sum').innerHTML = GetTotalSum();
                updateBasketInfo();

            }
        }
    }


}

function GetTotalSum() {
    totalSum = 0;
    for (var i = 0; i < basket.length; i++) {
        totalSum = totalSum + basket[i].price;
    }
    return totalSum;
}






