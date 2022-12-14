import { processFullFile, processLineByLineFile } from "./utils";

const READ_MODES = {
  full: "full",
};

const OUTPUT_FILE = "result.txt";

function main(fileName, mode) {
  if (mode === READ_MODES.full) {
    processFullFile(fileName, OUTPUT_FILE);
  } else {
    processLineByLineFile(fileName, OUTPUT_FILE);
  }
}

main(process.argv[4], process.argv[5]);
