const fs = require("fs");

const FILE_IN = "./data/import.csv";
const FILE_OUT = "./data/export.csv";

const main = () => {
  // create readable stream (optional size)
  const readStream = fs.createReadStream(FILE_IN, { highWaterMark: 100 });
  // create writeble stream
  const writeStream = fs.createWriteStream(FILE_OUT);

  // open event
  readStream.on("open", () => {
    console.log("Stream Open");
  });

  // drain event
  readStream.on("drain", () => {
    console.log("Stream Drain");
  });

  // data event
  readStream.on("data", chunk => {
    // write chunk on writable stream
    writeStream.write(chunk);
    //console.log("chunk", chunk.toString());
  });

  readStream.on("end", () => {
    console.log("Stream End");
  });
};

main();
