const basket= [
    {item: "Печенье", amount: 2, price: 5, total_sum: 10}
    ,{item: "Варенье", amount: 2, price: 5, total_sum: 10}
]

const bntEl = document.querySelector('.btn')

const mod = document.querySelector('.modal')
addData();

function openModal(){
    mod.classList.toggle('active')
    
}

function addData(){
    const newPar = document.createElement('P');
    newPar.textContent = 'В корзине ' + basket.length + ' товара на сумму ' + countBasketprice() + ' рублей';
    mod.append(newPar);
}

bntEl.addEventListener('click' , openModal)

function countBasketprice(){

    var key = 'total_sum';
    var index;
    var sum = 0;
    for (index = 0; index < basket.length; ++index) {
        sum = sum+basket[index][key];
    
    }
    return(sum);
}
