import csv from "csvtojson";
import fs from "fs";

const DEFAULT_CSV_CONFIG = {
  delimiter: "auto",
  ignoreEmpty: true,
};

function getSuccessMessage(fileName) {
  return `File ${fileName} successfully saved!`;
}

async function readFullFile(fileName) {
  return await csv(DEFAULT_CSV_CONFIG).fromFile(fileName);
}

async function writeFullFile(json, fileName) {
  await fs.promises.writeFile(
    fileName,
    json.map((item) => JSON.stringify(item)).join("\n")
  );
  console.log(getSuccessMessage(fileName));
}

export async function processFullFile(inputFile, outputFile) {
  try {
    const content = await readFullFile(inputFile);
    writeFullFile(content, outputFile);
  } catch (error) {
    console.log(error.message);
  }
}

export async function processLineByLineFile(inputFile, outputFile) {
  const readStream = fs.createReadStream(inputFile).on("error", console.log);
  const writeStream = fs.createWriteStream(outputFile).on("error", console.log);

  readStream
    .pipe(csv(DEFAULT_CSV_CONFIG))
    .subscribe((json) => JSON.stringify(json) + "\n")
    .pipe(writeStream)
    .on("finish", () => console.log(getSuccessMessage(outputFile)));
}
