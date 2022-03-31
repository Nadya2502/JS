function mathOperation(arg1, arg2, operation) {
    switch (operation){
        case 'plus':
            return(arg1+arg2)
        break;
        case 'minus':
            return arg1-arg2;
        break;
        case 'mult':
            return arg1*arg2
        break;
        case 'division':
            return arg1/arg2
        break;
    }
}

console.log(mathOperation (3,4,'plus'))