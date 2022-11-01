const fs = require("fs");

const FILE_IN = "./data/import.csv";
const FILE_OUT = "./data/export.csv";

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

main();
