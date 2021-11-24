export class Validator {
  private regexName = /^[А-Я]{1}[а-я]+ [А-Я]{1}[а-я]+$/

  private regexPhone = /^\+7\([0-9]{3}\)-{1}[0-9]{3}-[0-9]{2}-[0-9]{2}$/

  private regexEmail = /^[a-zA-Z_]{1}[\da-zA-Z.-]+[a-zA-Z]{1}@[a-zA-Z]{1}[\da-zA-Z-]+[a-zA-Z]{1}\.[a-z]{2,3}$/

  private regexRegistration = /^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).20(0[0-9]|1[0-9]|2[0-1]|)$/

  private regexCode = /^[0-9]{3}$/

  private regexCity = /^[А-Я]{1}([а-я]+)?([\s]{1}?[А-Я]{1})?[а-я]+$/

  private testRegex (method: RegExp, value: string): boolean {
    return method.test(value)
  }

  public isValid (payload: { type: string; value: string }): boolean {
    switch (payload.type) {
      case 'name':
        return this.testRegex(this.regexName, payload.value)
      case 'phone':
        return this.testRegex(this.regexPhone, payload.value)
      case 'email':
        return this.testRegex(this.regexEmail, payload.value)
      case 'registration':
        return this.testRegex(this.regexRegistration, payload.value)
      case 'code':
        return this.testRegex(this.regexCode, payload.value)
      case 'city':
        return this.testRegex(this.regexCity, payload.value)
    }
  }

  public isAllValid (
    name: string,
    phone: string,
    email: string,
    registration: string,
    code: string,
    city: string
  ): boolean {
    return (
      this.testRegex(this.regexName, name) &&
      this.testRegex(this.regexPhone, phone) &&
      this.testRegex(this.regexEmail, email) &&
      this.testRegex(this.regexRegistration, registration) &&
      this.testRegex(this.regexCode, code) &&
      this.testRegex(this.regexCity, city)
    )
  }
}
