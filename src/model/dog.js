class Dog {
  constructor(data) {
    this.data = data
    this.name = data?.name
    this.id = data?.id
    this.age = data?.age
    this.race = data?.race
  }

  get description() {
    return `${this.name}, ${this.age}, ${this.race}`
  }
}

export default Dog
