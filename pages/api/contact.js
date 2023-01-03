import { readFile, writeFile } from "fs/promises";
import path from "path";

export default async function handler(req, res) {
    const requestMethod = req.method;

    if (requestMethod === "POST") {
        try {
            const data = await readFile(
                path.join(process.cwd(), "Data", "contact.json"),
                "utf-8"
            );
            const jsonFileData = JSON.parse(data);

            let newFileData = [
                ...jsonFileData,
                typeof req.body === "string" ? JSON.parse(req.body) : req.body,
            ];

            await writeFile(
                path.join(process.cwd(), "Data", "contact.json"),
                JSON.stringify(newFileData)
            );
        } catch (error) {
            // if error => there was no such file
            await writeFile(
                path.join(process.cwd(), "Data", "contact.json"),
                JSON.stringify([
                    typeof req.body === "string"
                        ? JSON.parse(req.body)
                        : req.body,
                ])
            );
        }

        res.status(200).json({
            message: `You submitted the data`,
            success: true,
        });
    } else {
        res.status(200).json({ message: "Welcome to API Routes!" });
    }
}
