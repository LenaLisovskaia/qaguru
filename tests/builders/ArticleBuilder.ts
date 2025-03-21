import { faker } from '@faker-js/faker';

export class ArticleBuilder {
  private _title: string = faker.lorem.words(3);
  private _description: string = faker.lorem.sentence();
  private _body: string = faker.lorem.paragraph();
  private _tags: string[] = [faker.lorem.word()];

  withTitle(title: string) {
    this._title = title;
    return this;
  }

  withDescription(description: string) {
    this._description = description;
    return this;
  }

  withBody(body: string) {
    this._body = body;
    return this;
  }

  withTags(tags: string[]) {
    this._tags = tags;
    return this;
  }

  build() {
    return {
      title: this._title,
      description: this._description,
      body: this._body,
      tags: this._tags,
    };
  }
}
