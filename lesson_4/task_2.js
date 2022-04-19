function countBasketprice(){
const basket= [{item: "Печенье", amount: 2, price: 5, total_sum: 10},
{item: "Варенье", amount: 2, price: 5, total_sum: 10}
]
var key = 'total_sum';
var index;
var sum = 0;
for (index = 0; index < basket.length; ++index) {
    sum = sum+basket[index][key];

}
return(sum);
}
console.log(countBasketprice())