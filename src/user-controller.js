const users = [
  { id: 1, name: "Pato" },
  { id: 2, name: "Uno" },
];

const getUsers = (req, res) => {
  console.log(req.params);
  if (req.params.id) {
    return res.send(users.find((user) => user.id == req.params.id));
  }
  res.send(users);
};

const createUser = (req, res) => {
  console.log(req.params);
  const user = req.body;
  users.push(user);
  res.send(users);
};

module.exports = {
  getUsers,
  createUser,
};
