function func(val,pow) {
    if (pow == 0) {
        return 1;
    }
    if (pow == 1) {
        return val;
    } else {
        return val * func(val,--pow);
    }

}

var a = func(2,5)
console.log(a)