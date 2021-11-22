const bodyManipulation = (text, keyValue) => {
  let result = text;

  if (keyValue && keyValue.length > 0 && keyValue instanceof Array) {
    keyValue.forEach((keyValueItem) => {
      const tempRegex = new RegExp(`${keyValueItem.key}`, 'g');
      result = result.replace(tempRegex, keyValueItem.value);
    });
  }

  return result;
};

module.exports = {
  bodyManipulation,
};
