import { RestCrudRepositoryBase } from "~/libs/repositories/RestCrudRepository";
import Animal from "@/model/animal";
import type { CreateAnimalDto, AnimalType, UpdateAnimalDto } from "@/model/AnimalType";

export class AnimalRepositoryHttp
  extends RestCrudRepositoryBase<AnimalType, number, CreateAnimalDto, UpdateAnimalDto> {
  protected readonly resource = "/api/animal";

  getAnimals = () => {
    return this.client(`${this.resource}`)
      .then((res: any) => {
        return res.map((animal: AnimalType) => new Animal(animal))
      })
      .catch((error) => {
        return error.response
      })
  }

  getUserAnimals = async (userId: string | number) => {
    return await this.client(`${this.resource}/user/${userId}`)
      .then((res: any) => {
        return res.data.map((Animal: any) => new Animal(Animal))
      })
      .catch((error) => {
        return error.response
      })
  }

  createWithFile = async (animal, file) => {
    const formData = new FormData()
    formData.append('file', file)

    for (const key in animal) {
      if (Object.prototype.hasOwnProperty.call(animal, key)) {
        const value = animal[key]
        if (value instanceof Date) {
          formData.append(key, value.toISOString()) // Convert Date objects to ISO string
        } else if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value)) // Convert other objects to JSON strings
        } else {
          formData.append(key, value)
        }
      }
    }

    return this.client(`${this.resource}/create`, { method: "POST", body: formData })
      .then((res: any) => {
        return new Animal(res.data)
      })
      .catch((error) => {
        return error.response
      })
  }

  updateWithFile = async (id, animal, file) => {
    const formData = new FormData()
    formData.append('file', file)

    for (const key in animal) {
      if (Object.prototype.hasOwnProperty.call(animal, key)) {
        const value = animal[key]
        if (value instanceof Date) {
          formData.append(key, value.toISOString()) // Convert Date objects to ISO string
        } else if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value)) // Convert other objects to JSON strings
        } else {
          formData.append(key, value)
        }
      }
    }

    return this.client(`${this.resource}/edit/${id}`, { method: "PUT", body: formData })
      .then((res: any) => {
        return new Animal(res.data)
      })
      .catch((error) => {
        return error.response
      })
  }


  saveAnimalFiles = (id: string | number, files: any) => {
    const formData = new FormData()
    const fileList = Array.from(files)
    console.log('fileList', fileList)
    fileList.forEach((file: any) => {
      formData.append('files', file.file)
      formData.append('positions', file.position) // Positions are 1-based
    })

    return this.client(`${this.resource}/${id}/media`, formData, {})
      .then((res: any) => {
        return res.data
      })
      .catch((error) => {
        console.log('error', error)
      })
  }



  getAnimalByNormalizedName = (AnimalNormalizedName: string) => {
    return this.client(`${this.resource}/${AnimalNormalizedName}`)
      .then((res: any) => {
        return new Animal(res.data)
      })
      .catch((error) => {
        console.error(error);
        const errorr = `${error.response?.data?.message}, ${error.response?.data?.code}`
        throw new Error(errorr)
      });
  }

}