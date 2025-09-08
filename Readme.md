**1) What is the difference between var, let, and const?**  
**Answer:**

| Var | Let | Const |
|-----|-----|-------|
| var is function scoped and it can be redeclared and updated. It hoisted top of it's scope. | Let is block scoped and it can be updated but not redeclared. In it's same scope. | Let is block scoped and it can not be updated but or redeclared.It usually used for that value which wont't be reassigned. |
| **Example:** `var x = 10` | **Example:** `let y = 15` | **Example:** `const z = 35` |
| `x = 20 //working` | `y = 25 //working` | `z = 40 //not working` |

**2) What is the difference between map(), forEach(), and filter()?**  
**Answer:**

| forEach() | map() | filter() |
|-----------|-------|----------|
| It run a function of each element of the array but it doesn't return array. | Map creates a new array where each element is the result of applying function to the original array. | Filter create new array but specific element which pass specific task. |
| **Example:**<br> `const number=[1,2,3,4,5]` | **Example:**<br> `const number=[1,2,3,4,5]` | **Example:**<br> `const number=[1,2,3,4,5]` |
| `number.forEach((n)=>console.log(n))`<br> `//Output:1,2,3,4,5` | `const double=number.map((n)=>n*2)`<br> `//Output:[2,4,6,8,10]` | `const even=number.filter((n)=>n%2==0)`<br> `//Output:[2,4]` |

**3) What are arrow functions in ES6?**  
**Answer:**
Arrow function is different way to declare function in javascript. These are easier to read and cleaner version.
Example
```js
const add = (a, b) => a + b;

console.log(add(2, 3)); // Output:5
```
