import type { AnimalType } from "./AnimalType"

class Animal implements AnimalType {
  data: any;
  name: string;
  id: number;
  birthdate: Date;
  species: string;
  breed: string;
  gender: string;
  weightkg: number;
  createdAt: string;
  media: any;
  notes: string;

  constructor(data) {
    this.data = data
    this.name = data?.name
    this.id = data?.id
    this.birthdate = data?.birthdate
    this.species = data?.species
    this.breed = data?.breed
    this.gender = data?.gender
    this.weightkg = data?.weightKg
    this.createdAt = data?.createdAt
    this.media = data?.media || null
    this.notes = data?.notes
  }

  get description() {
    return `${this.name}, ${this.age}, ${this.breed}`
  }

  get age() {
    return '4 years old'
  }

  get asOption() {
    return { label: `${this.name} ${this.breed} ${this.gender}`, value: this.id, data: this }
  }
}

export default Animal
