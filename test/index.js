const express = require("express");
const { exec } = require("child_process");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");

app.use(cors());
app.post("/checkurl", (req, res) => {
  const { url } = req.body;
  const pythonScriptPath = "run.py";
  exec(`python ${pythonScriptPath} ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return res
        .status(500)
        .json({ message: "Internal Server Error", status: 500 });
    }
    if (stdout == 1) {
      console.log(`Python script output: ${stdout}`);
      return res.status(200).json({ data: 1, status: 200 });
    } else {
      console.log(`Python script output: ${stdout}`);
      return res.status(200).json({ data: 0, status: 200 });
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
