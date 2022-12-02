<h2 style="text-align: center;">talking about JS 继承</h2>

## 原型链继承

子类原型是父类实例，缺点是父类构造函数中有引用类型时，多个子类实例共享此属性，修改属性会影响其他实例

```js
function Father() {
  this.colors = ['red', 'blue', 'green'];
}
function Son() {}

Son.prototype = new Father();

var instance1 = new Son();
instance1.colors.push('black');
alert(instance1.colors); //"red,blue,green,black"

var instance2 = new Son();
alert(instance2.colors); //"red,blue,green,black"
```

## 构造函数继承

父类构造函数加强子类实例，缺点是没有继承父类原型

```js
function Father() {
  this.color = ['red', 'green', 'blue'];
}
function Son() {
  //继承自SuperType
  Father.call(this);
}
var instance1 = new Son();
instance1.color.push('black');
alert(instance1.color); //"red,green,blue,black"

var instance2 = new Son();
alert(instance2.color); //"red,green,blue"
```

## 组合式继承

结合原型链继承和构造函数继承，缺点是调用了两次父类，实例身上有一份属性/方法，原型上还有一份属性/方法

```js
function Father(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
Father.prototype.sayName = function() {
  alert(this.name);
};

function Son(name, age) {
  // 继承属性
  // 第二次调用SuperType()
  Father.call(this, name);
  this.age = age;
}

// 继承方法
// 构建原型链
// 第一次调用SuperType()
Son.prototype = new Father();
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
Son.prototype.constructor = Son;
Son.prototype.sayAge = function() {
  alert(this.age);
};

var instance1 = new Son('Nicholas', 29);
instance1.colors.push('black');
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new Son('Greg', 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
```

## 寄生式

补充

## 原型式

补充

## 寄生组合式

补充

## ES6 class

extends 关键字和 super 方法

```js
class Point {
  /* ... */
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```
