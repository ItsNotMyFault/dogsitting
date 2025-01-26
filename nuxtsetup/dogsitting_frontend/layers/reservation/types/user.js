class User {
  constructor(data) {
    this.data = data
    this.email = data?.Email
    this.firstName = data?.FirstName
    this.lastName = data?.LastName
    this.phonenumber = data?.PhoneNumber
    this.name = data?.Name
    this.id = data?.Id //very important property.
  }

  get normalizedIdentifier() {
    return this.normalizedName
  }
}

export default User
