import { faker } from '@faker-js/faker';

export class UserBuilder {
  private _username: string = faker.internet.userName();
  private _email: string = faker.internet.email();
  private _password: string = faker.internet.password(10);

  withUsername(username: string) {
    this._username = username;
    return this;
  }

  withEmail(email: string) {
    this._email = email;
    return this;
  }

  withPassword(password: string) {
    this._password = password;
    return this;
  }

  build() {
    return {
      username: this._username,
      email: this._email,
      password: this._password,
    };
  }
}
