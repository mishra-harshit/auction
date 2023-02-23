class Singleton {
  val = 1
  constructor () {
    if (!Singleton._instance) {
      Singleton._instance = this
    }
    return Singleton._instance
  }

  add () {
    this.val += 1
  }
}

const obj1 = new Singleton()
const obj2 = new Singleton()
obj2.add()
obj1.add()
console.log(obj1.val, obj2.val)
