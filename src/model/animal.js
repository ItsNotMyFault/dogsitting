class Animal {
  constructor(data) {
    this.data = data
    this.name = data?.name
    this.id = data?.id
    this.birthdate = data?.birthdate
    this.species = data?.species
    this.breed = data?.breed
  }

  get description() {
    return `${this.name}, ${this.age}, ${this.breed}`
  }

  get age() {
    return '4 years old'
  }
}

export default Animal
