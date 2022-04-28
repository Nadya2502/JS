var a; 
const transfer = {};
function transfer_to_object(a) {
    if (a >= 100 && a <= 999) {
    transfer['единицы'] = a % 10;
    transfer['десятки'] = ~~((a % 100) / 10);
    transfer['сотни'] = ~~(a / 100);
    return transfer
    }
    else {
        return {}
    }
}
console.log(transfer_to_object(775))