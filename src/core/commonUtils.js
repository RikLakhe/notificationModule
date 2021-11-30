/*
* Message body manipulation
* @param {string} text
* @param {object} keyValueObject
* @return {string}
*/
const bodyManipulation = (text, keyValueObject) => {
  let result = Buffer.from(text,'base64').toString('ascii');

  if (Object.keys(keyValueObject) && Object.keys(keyValueObject).length > 0 && Object.keys(keyValueObject) instanceof Array) {
    Object.keys(keyValueObject).forEach((keyValueItem) => {
      const tempRegex = new RegExp(`${keyValueItem}`, 'g');
      result = result.replace(tempRegex, keyValueObject.keyValueItem);
    });
  }

  return result;
};

module.exports = {
  bodyManipulation,
};
