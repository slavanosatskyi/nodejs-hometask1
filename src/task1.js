function main() {
  process.stdin.on("data", (data) => {
    data = data.reverse().slice(1).toString();
    process.stdout.write(data + "\n");
  });
}

main();
