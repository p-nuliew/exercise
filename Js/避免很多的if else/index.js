 // 多态示例
 class Shape {
   calculateArea() {
     // Abstract method
   }
 }

 class Circle extends Shape {
   constructor(radius) {
     super();
     this.radius = radius;
   }

   calculateArea() {
     return Math.PI * this.radius ** 2;
   }
 }

 class Square extends Shape {
   constructor(sideLength) {
     super();
     this.sideLength = sideLength;
   }

   calculateArea() {
     return this.sideLength ** 2;
   }
 }


 const circle = new Circle(5);
 const square = new Square(4);

 printArea(circle); // Output: Area: 78.54
 printArea(square); // Output: Area: 16

 // 多态写法
 function printArea(shape) {
   console.log("Area:", shape.calculateArea());
 }

 //  if/else 写法
 //  function printArea(shape) {
 //    if (shape instanceof Circle) {
 //      console.log("Area:", Math.PI * shape.radius ** 2);
 //    } else if (shape instanceof Square) {
 //      console.log("Area:", shape.sideLength ** 2);
 //    } else {
 //      console.log("Unknown shape type");
 //    }
 //  }

 //  区别在于多态性通过继承和动态绑定实现了统一接口(calculateArea)的调用，避免了 if-else 中大量的类型检查，同时也提高了可读性和可维护性


 // 策略模式
 // 通过定义不同的策略类累封装不同的算法，并在运行时动态选择执行的策略
 function calculate(num1, num2, operation) {
   if (operation === 'add') {
     return num1 + num2;
   } else if (operation === 'subtract') {
     return num1 - num2;
   } else {
     console.log('unsupported operation');
     return null;
   }
 }
 // 日常开发中，这种封装方法很常见，如果if-else越来越多，必会造成难以维护的局面。我们用策略模式来解决，抓住策略模式的特点【动态选择执行的策略】，就很容易实现
 // 1. 定义不同的策略
 class OperationAdd {
   doOperation(num1, num2) {
     return num1 + num2;
   }
 }
 class OperationSubtract {
   doOperation(num1, num2) {
     return num1 - num2;
   }
 }
 // 2. 创建一个策略执行类
 class Context {
   constructor(strategy) {
     this.strategy = strategy
   }

   executeStrategy(num1, num2) {
     return this.strategy.doOperation(num1, num2)
   }
 }
 // 3. 选择要执行的策略
 const contextAdd = new Context(new OperationAdd())
 // 4. 执行策略
 console.log(contextAdd.executeStrategy(3, 4));

 const contextSubtract = new Context(new OperationSubtract())
 console.log(contextSubtract.executeStrategy(10, 5));