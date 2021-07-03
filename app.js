'use strict';

// Library land
const uid = Symbol('uid');
console.log(uid);

const user = {
  // id: 'p1',
  [uid]: 'p1',
  name: 'Max',
  age: 30,
  [Symbol.toStringTag]: 'User',
};

user[uid] = 'p3';

// app land => Using the library
user.id = 'p2'; // this shouldn't be possible!
console.log(user.toString());

const company = {
  // curEmployee: 0,
  employees: ['Max', 'Manu', 'Anna'],
  // next() {
  //   if (this.curEmployee >= this.employees.length) {
  //     return { value: this.curEmployee, done: true };
  //   }
  //   const returnValue = {
  //     value: this.employees[this.curEmployee],
  //     done: false,
  //   };
  //   this.curEmployee++;
  //   return returnValue;
  // },
  [Symbol.iterator]: function* employeeGenerator() {
    // let employee = company.next();
    // while (!employee.done) {
    //   console.log(employee.value);
    //   yield employee.value;
    //   employee = company.next();
    // }
    let currentEmployee = 0;
    while (currentEmployee < this.employees.length) {
      yield this.employees[currentEmployee];
      currentEmployee++;
    }
  },
};

// console.log(company.next());
// console.log(company.next());
// console.log(company.next());
// console.log(company.next());
// console.log(company.next());

// let employee = company.next();
// while (!employee.done) {
//   console.log(employee.value);
//   employee = company.next();
// }

for (const employee of company) {
  console.log(employee);
}
console.log([...company]);

// const it = company.getEmployee();
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

const persons = ['Max', 'Manu'];
console.log(persons);

// Reflect API

const course = {
  title: 'JavaScript - The Complete Guide',
};

Reflect.setPrototypeOf(course, {
  toString() {
    return this.title;
  },
});
console.log(course.toString());

Reflect.defineProperty(course, 'price', {
  value: '100$',
  configurable: true,
});
// console.log(course);
console.log(Object.getOwnPropertyDescriptor(course, 'price'));

//* unless in strict mode - in that case JS stops execution with TypeError unless it is caught in try-catch block
try {
  course.price = '20';
} catch (error) {
  console.log(error);
}
// console.log(course);

const boolean = Reflect.deleteProperty(course, 'price');
// delete course.title (ES5)
console.log(boolean, course);

console.log(Object.keys(course));
console.log(Reflect.ownKeys(course));

console.clear();

const courseHandler = {
  get(obj, propertyName) {
    console.log(propertyName);
    if (propertyName === 'length') {
      return 0;
    }
    return obj[propertyName] || 'NOT FOUND';
  },
  set(obj, propertyName, newValue) {
    console.log('Sending data...');
    if (propertyName === 'rating') {
      return true;
    }
    obj[propertyName] = newValue;
    return true;
  },
};
const pCourse = new Proxy(course, courseHandler);
pCourse.rating = 5;
console.log(pCourse.title, pCourse.length, pCourse.rating);
