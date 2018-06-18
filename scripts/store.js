'use strict';
/* global store cuid, Item*/
const store = (function () {
  const items = [
    { id: cuid(), name: 'apples', checked: false },
    { id: cuid(), name: 'oranges', checked: false },
    { id: cuid(), name: 'milk', checked: true },
    { id: cuid(), name: 'bread', checked: false }
  ];
  const hideCheckedItems = false;
  const searchTerm = '';
  const findById = function(id) {
    this.items.find(item => item.id === id);
  };
  const addItem = function (name) {
    try {
      Item.validateName(name);
      this.items.push(Item.create(name));
    }
    catch(error) {
      console.error(`Cannot add item: ${error.message}`);
    }
  };
  const findAndToggleChecked = function(id) {
    this.findById(id).checked = !items.checked;
  };
  const findAndUpdateName = function(id, newName) {
    try {
      Item.validateName(newName);
      this.findById(id).name = newName;
    }
    catch (error) {
      console.error(`Cannot update name: ${error.message}`);
    }
  };
  const findAndDelete = function(id) {
    let filteredArray = this.items.filter(item => findById(id) !== item.id);
    this.items = filteredArray;
  };

  return {items, hideCheckedItems, searchTerm, addItem, findAndToggleChecked, findAndUpdateName, findAndDelete, findById};
}() );
