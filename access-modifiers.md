Access Modifiers and readonly in TypeScript Classes

In a class, it’s a separate decision who can read a piece of data, which data a subclass can use, and which data can be changed. TypeScript lets you control visibility with public, private, and protected. On top of that, readonly prevents a member from being reassigned after it has been set, even when it’s visible.

An Account Example

Here, the account’s id can be read by outside code. Because it is readonly, the ID received in the constructor can’t be changed later from TypeScript code. getSummary() is a public method, so anyone can call it on an instance. Also, if you don’t write a modifier at all, class members are public by default in TypeScript.

ts
class Account {
  constructor(
    public readonly id: string,
    protected owner: string,
    private balance: number,
  ) {}

  public getSummary(): string {
    return `${this.id}: ${this.balance}`;
  }
}

class SavingsAccount extends Account {
  public getOwnerLabel(): string {
    return `Savings account for ${this.owner}`;
  }
}

owner is protected, so both Account and its subclass SavingsAccount can read it from inside their own methods. For outside code, getOwnerLabel() exposes a specific, controlled result. balance, on the other hand, is private, so SavingsAccount can’t read it directly. The base class can still reveal information about the balance through a method like getSummary() if it wants to.

What Happens After Compilation

TypeScript’s private and protected access checks, as well as the readonly assignment check, only work at compile time. If you need real privacy at runtime in JavaScript, you can use a private field like #balance. Also note that putting readonly on an object property only stops you from assigning a different object to that property. To stop the inner members from being changed, you need separate type constraints for them.

Conclusion

Methods that outside users need can be kept public. State that subclasses need can be kept protected, and the base class’s internal state can be kept private. For properties that should be set once and never change, readonly can be applied separately.