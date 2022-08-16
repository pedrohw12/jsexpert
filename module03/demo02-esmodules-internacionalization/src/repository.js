import { writeFile, readFile } from "fs/promises";

export const save = async (data) => {
  // there is no __filename,__dirname and require in the ESModules
  const { pathname: databaseFile } = new URL(
    "../database.json",
    import.meta.url
  );
  const currentData = JSON.parse(await readFile(databaseFile));
  currentData.push(data);

  await writeFile(databaseFile, JSON.stringify(currentData));
};
