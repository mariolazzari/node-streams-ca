const fs = require("fs");
const { faker } = require("@faker-js/faker");
const { EOL } = require("os");

const writeStream = fs.createWriteStream("./import.csv");

writeStream.write("name;email;age;salary;isActive\n");

for (let index = 0; index < 10000; index++) {
  const firstName = faker.name.firstName();
  const email = faker.internet.email(firstName);
  const age = faker.datatype.number({ min: 10, max: 100 });
  const salary = faker.random.numeric(4, { allowLeadingZeros: true });
  const active = faker.datatype.boolean();

  const arr = [firstName, email, age, salary, active];
  writeStream.write(arr.join(";") + EOL);
}

writeStream.end();
