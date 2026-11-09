Type Narrowing in TypeScript

When a variable’s type is a union, like string | number, TypeScript doesn’t know which one it is at that moment. So if you try to call .toUpperCase() on it, you get an error, because a number doesn’t have that method.

Type narrowing is just you adding a check in your code so TypeScript can figure out the exact type inside that block. Once it knows, you can use that type’s methods freely.

typescript
function printLength(value: string | number) {
  // value.length; // error, numbers don't have length
}

Let’s look at the three most common ways to do this.

1. Narrowing with typeof

This is the simplest one. Use it for primitives like string, number, and boolean.

typescript
function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // value is a string here
  }

  if (typeof value === "number") {
    return value.toFixed(2); // value is a number here
  }

  return value ? "Yes" : "No"; // only boolean is left
}

console.log(formatValue("hello")); // HELLO
console.log(formatValue(3.14159)); // 3.14
console.log(formatValue(true));    // Yes

It’s also really handy with unknown, for example when data comes from an API or user input:

typescript
function double(input: unknown): number {
  if (typeof input === "number") return input * 2;
  if (typeof input === "string") return Number(input) * 2;
  throw new Error("Can't double this value");
}

One thing to watch out for: in JavaScript, typeof null returns "object". It’s an old bug that never got fixed. So whenever you check for an object, check for null too:

typescript
function logObject(value: object | string | null) {
  if (typeof value === "object" && value !== null) {
    console.log(Object.keys(value));
  }
}
2. Narrowing with instanceof

Use this when you want to know whether a value is an instance of a certain class. At runtime it looks at the prototype chain.

typescript
class Dog {
  bark() { return "Woof!"; }
}

class Cat {
  meow() { return "Meow!"; }
}

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    return animal.bark(); // Dog
  }
  return animal.meow(); // Cat
}

It works with built-in classes too, like Date, Error, and Array:

typescript
function formatDate(input: string | Date): string {
  if (input instanceof Date) {
    return input.toISOString();
  }
  return new Date(input).toISOString();
}

You’ll use it a lot in try...catch. In strict mode the error in a catch block is typed as unknown, so you have to check it before using it:

typescript
try {
  JSON.parse("{ bad json }");
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error("Invalid JSON:", error.message);
  } else if (error instanceof Error) {
    console.error("Something else went wrong:", error.message);
  } else {
    console.error("Someone threw something weird:", error);
  }
}

Keep in mind that instanceof only works with classes. Interfaces and type aliases are erased when TypeScript compiles to JavaScript, so there’s nothing left to check at runtime.

3. Narrowing with the in operator

The in operator checks whether a property exists on an object. It’s very useful when you have a union of objects with different shapes.

typescript
interface Car {
  drive(): void;
  wheels: number;
}

interface Boat {
  sail(): void;
  hullType: string;
}

function move(vehicle: Car | Boat) {
  if ("drive" in vehicle) {
    vehicle.drive(); // Car
    console.log(`Rolling on ${vehicle.wheels} wheels`);
  } else {
    vehicle.sail(); // Boat
    console.log(`Floating on a ${vehicle.hullType} hull`);
  }
}

A very common real-world use is handling API responses:

typescript
interface SuccessResponse {
  data: { id: number; name: string };
}

interface ErrorResponse {
  error: { code: number; message: string };
}

function handleResponse(res: SuccessResponse | ErrorResponse) {
  if ("error" in res) {
    console.error(`Error ${res.error.code}: ${res.error.message}`);
    return;
  }
  console.log(`Loaded user: ${res.data.name}`);
}