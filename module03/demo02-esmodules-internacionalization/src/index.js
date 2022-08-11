import Draftlog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import readline from "readline";

import database from "../database.json";
import Person from "./person.js";

Draftlog(console).addLineListener(process.stdin);
const DEFAULT_LANGUAGE = "pt-BR";

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.bgCyan("Vehicles") },
    { field: "kmTraveled", name: chalk.bgGreen("KM Traveled") },
    { field: "from", name: chalk.red("From") },
    { field: "to", name: chalk.bgRedBright("To") },
  ],
};

const table = chalkTable(
  options,
  database.map((item) => new Person(item).formatted(DEFAULT_LANGUAGE))
);
const print = console.draft(table);

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

terminal.question("Qual é o seu nome?", (msg) => {
  console.log("msg", msg.toString());
});
