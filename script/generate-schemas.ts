import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { generatedJsonSchemas } from "../src/json-schemas";
const directory = new URL("../schemas/", import.meta.url);
const check = process.argv.includes("--check");
if (!check) mkdirSync(directory, { recursive: true });
const schemas = generatedJsonSchemas();
const obsolete = readdirSync(directory).filter(name => name.endsWith(".schema.json") && !(name in schemas));
if (obsolete.length) throw new Error(`Obsolete generated schemas: ${obsolete.join(", ")}. Review and remove them.`);
for (const [filename, schema] of Object.entries(schemas)) {
  const file = new URL(filename, directory);
  const expected = JSON.stringify(schema, null, 2) + "\n";
  if (check) {
    if (readFileSync(file, "utf8") !== expected) throw new Error(`Schema drift: ${filename}. Run npm run schemas:generate.`);
  } else writeFileSync(file, expected);
}
