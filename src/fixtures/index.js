import * as fixtureUsers from "./fixture-users.js";

async function initialCollections() {
  await fixtureUsers.drop();
  await fixtureUsers.syncIndexes();
  await fixtureUsers.insertMany();
}

export default initialCollections;
