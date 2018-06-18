'use strict';

const Item = (function () {
  function validateName(name) {
    if (!name) {
      throw new Error('Name does not exist');
    }
  }
  const create = function (name) {
    return {
      id: cuid(),
      name,
      checked: false
    };
  };

  return {
    validateName, create
  };
}());