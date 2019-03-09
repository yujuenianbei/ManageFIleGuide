
    function fn(n) {
        if (n == 1) {
            return 1;
        }
        return fn(n - 1) * n;
    }
 
    var result = fn(4);
    console.log(result);