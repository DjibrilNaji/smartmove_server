module.exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.text("matricule").primary();
    table.text("secretCode").notNullable();
    table.text("userName").notNullable();
    table.text("firstName").notNullable();
    table.text("lastName").notNullable();
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable("requests", (table) => {
    table.increments("id").primary();
    table.float("price").notNullable();
    table.text("motif").notNullable();
    table.date("date").notNullable();
    table.text("status").notNullable();
    table
      .text("matricule")
      .primary()
      .notNullable()
      .references("matricule")
      .inTable("users");
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable("stations", (table) => {
    table.increments("id").primary();
    table.text("city").notNullable();
    table.text("label").notNullable();
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable("voyages", (table) => {
    table.increments("id").primary();
    table
      .integer("idDepartureStation")
      .notNullable()
      .references("id")
      .inTable("stations");
    table
      .integer("idArrivalStation")
      .notNullable()
      .references("id")
      .inTable("stations");

    table.timestamps(true, true, true);
  });

  await knex.schema.createTable("hotels", (table) => {
    table.increments("id").primary();
    table.text("label").notNullable();
    table.text("address");
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable("hotelReservations", (table) => {
    table.increments("id").primary();
    table.integer("idHotel").notNullable().references("id").inTable("hotels");
    table.text("arrivalDate").notNullable();
    table.text("departureDate").notNullable();

    table.timestamps(true, true, true);
  });

  await knex.schema.createTable("reservations", (table) => {
    table.increments("id").primary();
    table
      .text("matriculeUser")
      .notNullable()
      .references("matricule")
      .inTable("users");
    table
      .text("matriculeManager")
      .notNullable()
      .references("matricule")
      .inTable("users");
    table.integer("outboundVoyageId").references("id").inTable("voyages");
    table.integer("returnVoyageId").references("id").inTable("voyages");
    table.integer("hotelResId").references("id").inTable("hotelReservations");

    table.timestamps(true, true, true);
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable("reservations");
  await knex.schema.dropTable("hotelReservations");
  await knex.schema.dropTable("hotels");
  await knex.schema.dropTable("voyages");
  await knex.schema.dropTable("stations");
  await knex.schema.dropTable("requests");
  await knex.schema.dropTable("users");
};
