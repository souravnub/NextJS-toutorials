import { readFile } from "fs/promises";
import path from "path";

// relPath : path of the JSON file from the baseWorkingDirectory
export default async function loadJsonFile(relPath) {
    const fileData = await readFile(path.join(process.cwd(), relPath), "utf-8");
    const jsonData = JSON.parse(fileData);
    return jsonData;
}
