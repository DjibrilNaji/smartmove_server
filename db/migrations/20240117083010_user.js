module.exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("userName").notNullable();
    table.text("firstName").notNullable();
    table.text("lastName").notNullable();
    table.text("matricule").notNullable().unique();
    table.timestamps(true, true, true);
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable("users");
};
