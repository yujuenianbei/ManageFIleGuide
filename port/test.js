// 传参 名称： name 排序方式： desc
const data = [
  {
    extData: 'name0'
  },
  {
    extData: 'name1'
  },
  {
    extData: 'name2'
  },
  {
    extData: 'name3'
  },
  {
    extData: 'name4'
  },
  {
    extData: 'name5'
  }
]

function sort(name,type,a,b){
  if(name === 'one') {
    if( type === 'asc') {
      return a - b
    }
    if( type === 'desc') {
      return b - a
    }
  }
}

// 数组对象排序
const arr = [{ name: "zlw", age: 24 }, { name: "wlz", age: 25 }, { name: "ylz", age: 25 }];
const compare = (prop, name, type) => {
  return (obj1, obj2)=> {
    let a,b;
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (name === 'one') {
      if (type === 'asc') {
        a = -1;b = 1;
      }
      if (type === 'desc') {
        a = 1;b = -1;
      }
      if (val1 < val2) {
        return a;
      } else if (val1 > val2) {
        return b;
      } else {
        return 0;
      }
    }
  }
}
console.log(arr.sort(compare('name','one','asc')));


const name = data.map(item => (
  item.extData
))
console.log(name)