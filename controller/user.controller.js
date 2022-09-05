const fs = require("fs");
let users = require("../users.json");

// get random users
module.exports.getRandomUser = (req, res, next) => {
  const max = users.length;
  const randomNumber = Math.floor(Math.random() * max);
  if (randomNumber >= 0 && randomNumber < users.length) {
    res.send(users[randomNumber]);
  } else {
    res.send("No users found");
  }
};

// get all users & limit the users
module.exports.getAllUser = (req, res, next) => {
  const { limit } = req.query;
  res.json(users.slice(0, limit));
};

//post user
module.exports.saveUser = (req, res, next) => {
  let user = req.body;

  if (
    user.id &&
    user.gender &&
    user.name &&
    user.contact &&
    user.address &&
    user.photoUrl
  ) {
    // adding new data to users object
    users.push(user);
    res.json(users);
  } else {
    res.json({ success: false, message: "Field Missing " });
  }
};

// patch:update user according to id
module.exports.updateUser = (req, res, next) => {
  const newData = req.body;
  const filterData = users.findIndex(
    (user) => Number(user.id) === Number(newData.id)
  );
  if (filterData !== -1) {
    users[filterData] = { ...users[filterData], ...newData };
    res.json(users);
  } else {
    res.json("Data Not Found");
  }
};

// patch: bulk update multiple users
module.exports.bulkUpdate = (req, res, next) => {
  const newData = req.body;
  // console.log(req.body);
  if (Array.isArray(newData)) {
    newData.forEach((data) => {
      const updateUser = users.findIndex((user) => user.id == data.id);
      if (updateUser !== -1) {
        users[updateUser] = { ...users[updateUser], ...data };
        res.json(users);
      }
    });
  } else {
    res.json({ success: false, message: "Provide body as Array of object" });
  }
};

// delete user
module.exports.deleteUser = (req, res, next) => {
  const newData = req.body;
  const filterValue = users.filter(
    (user) => Number(user.id) === Number(newData.id)
  );
  if (filterValue.length > 0) {
    const filterUsers = users.filter(
      (user) => Number(user.id) !== Number(newData.id)
    );
    users = filterUsers;
    res.json(users);
  } else {
    res.json("Data Not Found");
  }
};
