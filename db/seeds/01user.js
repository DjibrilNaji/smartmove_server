exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE "users" RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE "stations" RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE "voyages" RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE "hotels" RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE "hotelReservations" RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE "reservations" RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE "requests" RESTART IDENTITY CASCADE'); // Ajout de la ligne pour "requests"

  const users = [
    {
      userName: "Jonhy",
      firstName: "John",
      lastName: "Doe",
      matricule: "123456",
      secretCode: "abc123",
      email: "johnylebeaugosse@gmail.com",
      isManager: true,
    },
    {
      userName: "Janou",
      firstName: "Jane",
      lastName: "Smith",
      matricule: "789012",
      secretCode: "abc456",
      email: "janoulabellegosse@gmail.com",
      isManager: true,
    },
    {
      userName: "Aliçou",
      firstName: "Alice",
      lastName: "Johnson",
      matricule: "567890",
      secretCode: "abc789",
      email: "alicetupues@gmail.com",
      isManager: false,
    },
    {
      userName: "Bobby",
      firstName: "Bob",
      lastName: "Miller",
      matricule: "345678",
      secretCode: "xyz789",
      email: "bobby94@gmail.com",
      isManager: false,
    },
    {
      userName: "Emmou",
      firstName: "Emma",
      lastName: "Watson",
      matricule: "901234",
      secretCode: "xyz123",
      email: "emmoueheheh@gmail.com",
      isManager: false,
    },
    {
      userName: "Djib",
      firstName: "Djibril",
      lastName: "Naji",
      matricule: "903044",
      secretCode: "bar321",
      email: "najidjibril.supdevinci@gmail.com",
      isManager: false,
    },
    {
      userName: "noborder",
      firstName: "Adam",
      lastName: "Mehdaoui",
      matricule: "010101",
      secretCode: "ada000",
      email: "adam.mehdaouijorge@gmail.com",
      isManager: false,
    },
  ];

  await knex("users").insert(users);

  const stations = [
    { city: "Paris", label: "Gare du Nord" },
    { city: "London", label: "King's Cross Station" },
    { city: "Berlin", label: "Berlin Hauptbahnhof" },
  ];

  await knex("stations").insert(stations);

  const voyages = [
    { idDepartureStation: 1, idArrivalStation: 2 },
    { idDepartureStation: 2, idArrivalStation: 3 },
  ];

  await knex("voyages").insert(voyages);

  const hotels = [
    { label: "Hotel A", address: "123 Main St" },
    { label: "Hotel B", address: "456 Oak St" },
  ];

  await knex("hotels").insert(hotels);

  const hotelReservations = [
    { idHotel: 1, arrivalDate: "2024-01-20", departureDate: "2024-01-25" },
    { idHotel: 2, arrivalDate: "2024-02-10", departureDate: "2024-02-15" },
  ];

  await knex("hotelReservations").insert(hotelReservations);

  const reservations = [
    {
      matriculeUser: "123456",
      matriculeManager: "789012",
      outboundVoyageId: 1,
      returnVoyageId: 2,
      hotelResId: 1,
    },
    {
      matriculeUser: "567890",
      matriculeManager: "345678",
      outboundVoyageId: 2,
      returnVoyageId: 1,
      hotelResId: 2,
    },
  ];

  await knex("reservations").insert(reservations);

  const requests = [
    {
      matricule: "123456",
      price: 142.2,
      motif: "J'ai besoin de vacances",
      date: new Date("2024-01-20"),
      status: "En attente",
    },
    {
      matricule: "789012",
      price: 300.14,
      motif: "J'ai besoin de repos",
      date: new Date("2024-01-17"),
      status: "Validée",
    },
  ];

  await knex("requests").insert(requests);
};
