exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  const users = [
    {
      userName: "Jonhy",
      firstName: "John",
      lastName: "Doe",
      matricule: "123456",
    },
    {
      userName: "Janou",
      firstName: "Jane",
      lastName: "Smith",
      matricule: "789012",
    },
    {
      userName: "Aliçou",
      firstName: "Alice",
      lastName: "Johnson",
      matricule: "567890",
    },
    {
      userName: "Bobby",
      firstName: "Bob",
      lastName: "Miller",
      matricule: "345678",
    },
    {
      userName: "Emmou",
      firstName: "Emma",
      lastName: "Watson",
      matricule: "901234",
    },
  ];

  await knex("users").insert(users);
};
