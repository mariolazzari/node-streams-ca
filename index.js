const fs = require("fs");
const { Transform } = require("stream");
const csv = require("csvtojson");

const FILE_IN = "./data/import.csv";
const FILE_OUT = "./data/export.csv";

// steam transform
const myTransform = new Transform({
  objectMode: true,
  transform(chunk, env, callback) {
    const { name, email, age, salary, isActive } = chunk;
    const user = {
      name,
      email: email.toLowerCase(),
      age: +age,
      salary: +salary,
      isActive: isActive === "true",
    };

    let error = null;
    if (!name) {
      error = "Name not found";
    }

    callback(error, user);
  },
});

// solve backp ressure with pipes
const main = () => {
  const readStream = fs.createReadStream(FILE_IN);
  const writeStream = fs.createWriteStream(FILE_OUT);

  // pipes chaining
  readStream
    // csv 2 json
    .pipe(csv({ delimiter: ";" }, { objectMode: true }))
    // transform stream
    .pipe(myTransform)
    .on("data", data => {
      console.log("Data", data);
    })
    .on("error", ex => {
      console.log("Error", ex);
    })
    .on("end", () => {
      console.log("End");
    });
  // write stream
  // .pipe(writeStream);

  readStream.on("end", () => {
    console.log("ReadStream End");
  });

  writeStream.on("finish", () => {
    console.log("WriteStream Finish");
  });
};
main();

// solve back pressure with highWaterMark
/*
const main = () => {
  // create readable stream (optional size)
  const readStream = fs.createReadStream(FILE_IN, { highWaterMark: 100 });
  // create writeble stream
  const writeStream = fs.createWriteStream(FILE_OUT);

  // error event
  readStream.on("error", ex => {
    console.log("ReadStream error", ex);
  });

  // open event
  readStream.on("open", () => {
    console.log("ReadStream Open");
  });

  // drain event
  readStream.on("drain", () => {
    console.log("ReadStream Drain");
  });

  // data event
  readStream.on("data", chunk => {
    // write chunk on writable stream
    writeStream.write(chunk);
    //console.log("ReadStream chunk", chunk.toString());
  });

  readStream.on("end", () => {
    writeStream.end();
    console.log("ReadStream End");
  });
};
*/
