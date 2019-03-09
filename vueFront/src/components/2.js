// function outter() {
//     var n = 0;
//     return function () {
//         console.log(n)
//         return n++;
//     }
// }

// var o1 = outter();
// o1();//n == 0 
// o1();//n == 1 
// console.log(o1());//n == 2 
// var o2 = outter();
// o2();//n == 0 
// console.log(o2());//n == 1


//创建一个对象并压入数组
var outter = [];
function clouseTest() {
    var array = ["one", "two", "three", "four"];
    for (var i = 0; i < array.length; i++) {

        var x = {};
        x.no = i;
        x.text = array[i];
        x.invoke = function () {
            console.log(i);
        }
        outter.push(x);
    }
}
//执行函数并调用每个数组元素对应的对象的方法
clouseTest();// 调用这个函数，向 outter 数组中添加对象
for (var i = 0, len = outter.length; i < len; i++) {

    outter[i].invoke(); //4,4,4,4
}
//由于 i 是闭包中的局部变量，for 循环最后退出时的值为 4，因此调用 outter 中的每个元素都会得到 4。


//创建一个对象并压入数组
var outter1 = [];
function clouseTest1() {
    var array = ["one", "two", "three", "four"];
    for (var i = 0; i < array.length; i++) {
        var x = {};
        x.no = i;
        x.text = array[i];
        //返回匿名函数，匿名函数中包含一个闭包，后续的括号表示立即执行
        x.invoke = function (no) {
            return function () {
                console.log(no);
            }
        }(i); //这个i是匿名函数的参数，会赋值给匿名函数的参数no，这个i导致了不同的no副本
        outter1.push(x);
    }
}
//执行函数并调用每个数组元素对应的对象的方法
clouseTest1();// 调用这个函数，向 outter 数组中添加对象
for (var i = 0, len = outter1.length; i < len; i++) {
    outter1[i].invoke(); //1,2,3,4
}