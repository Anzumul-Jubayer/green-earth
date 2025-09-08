**1) What is the difference between var, let, and const?** 
**Answer:**

| Var | Let | Const |
|-----|-----|-------|
| var is function scoped and it can be redeclared and updated. It hoisted top of it's scope. | Let is block scoped and it can be updated but not redeclared. In it's same scope. | Let is block scoped and it can not be updated but or redeclared.It usually used for that value which wont't be reassigned. |
| **Example:**<br> `var x = 10` <br> `x = 20 //working` | **Example:**<br> `let y = 15` <br> `y = 25 //working` | **Example:**<br> `const z = 35` <br> `z = 40 //not working` |




