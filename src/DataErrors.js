export default class extends Error {
  constructor(type) {
    super(`${type}`);

    this.name = 'InputDataTypeError';
    this.type = type;
    this.message = `${type} is incorrect data type. These data can not be parsed.
      Please, try again with data of ".JSON", ".yaml" or ".ini" types\n`;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}
