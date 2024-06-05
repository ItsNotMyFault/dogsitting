class Animal {
  constructor(data) {
    this.data = data
    this.name = data?.Name
    this.id = data?.Id
    this.birthdate = data?.Birthdate
    this.species = data?.Species
    this.breed = data?.Breed
    this.weightkg = data?.WeightKg
    this.gender = data?.Gender
    this.createdAt = data?.CreatedAt
    this.media = data?.Media || null
    this.notes = data?.Notes
  }

  get description() {
    return `${this.name}, ${this.age}, ${this.breed}`
  }

  get age() {
    return '4 years old'
  }
}

export default Animal
