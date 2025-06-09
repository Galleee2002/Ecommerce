const fs = require("fs");
const strip = require("strip-comments");
const glob = require("glob");

glob("src/**/*.{js,jsx,ts,tsx}", (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    const code = fs.readFileSync(file, "utf8");
    const stripped = strip(code);
    fs.writeFileSync(file, stripped, "utf8");
    console.log(`Removed comments from ${file}`);
  });
});
