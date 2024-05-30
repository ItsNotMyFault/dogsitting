class Animal {
  constructor(data) {
    this.data = data
    this.name = data?.Name
    this.id = data?.Id
    this.birthdate = data?.Birthdate
    this.species = data?.Species
    this.breed = data?.Breed
    this.gender = data?.Gender
    this.createdAt = data?.CreatedAt
  }

  get description() {
    return `${this.name}, ${this.age}, ${this.breed}`
  }

  get age() {
    return '4 years old'
  }
}

export default Animal
