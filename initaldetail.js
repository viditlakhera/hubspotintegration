let database = [];

module.exports = {
  // Function to add an item to the "database"
  addItem: (item) => {
    database.push(item);
  },

  // Function to retrieve all items from the "database"
  getAllItems: () => {
    return database;
  },
};