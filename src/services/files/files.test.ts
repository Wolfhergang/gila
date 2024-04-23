import { writeToFile, readFromFile, appendToFile, prependToFile } from "./files";
import fs from "fs";

const pathToTestFileDir = __filename.split("/").slice(0, -1).join("/") + "/test_files";

const existingWriteFilePath = `${pathToTestFileDir}/garbage_file.txt`;
const testFilePath = `${pathToTestFileDir}/read_test.txt`;

describe("service: files", () => {
    describe("readFromFile", () => {
        it("should be able to read from a file", async () => {
            const content = await readFromFile(testFilePath)

            expect(content).toBe("Test file content");
        });
    });

    describe("writeToFile", () => {
        it("should be able to write to a not existing file", async () => {
            const randomFileName = Math.random().toString(36).substring(7);
            const path = `${pathToTestFileDir}/${randomFileName}.txt`;
            const data = "I am a test file!";
            
            await writeToFile(path, data);

            const content = await readFromFile(path);
            expect(content).toBe(data);
        });

        it("should be able to write to an existing file", async () => {
            const data = "I am a test file!";
            const path = `${pathToTestFileDir}/garbage_file.txt`;
            await writeToFile(path, data);

            const content = await readFromFile(path);
            expect(content).toBe(data);
        });
    });

    describe("appendToFile", () => {
        it("should be able to append content to an existing file", async () => {
            const data = "I am appended content!";
            const path = `${pathToTestFileDir}/garbage_file.txt`;

            await writeToFile(path, "Test file content");
            await appendToFile(path, data);

            const content = await readFromFile(path);
            expect(content).toBe("Test file content" + data);
        });
    });

    describe("prependToFile", () => {
        it("should be able to prepend content to an existing file", async () => {
            const data = "I am prepended content!";
            const path = `${pathToTestFileDir}/garbage_file.txt`;

            await writeToFile(path, "Test file content");
            await prependToFile(path, data);

            const content = await readFromFile(path);
            expect(content).toBe(data + "Test file content");
        });
    });

    afterEach(async () => {
        // Clean up    
        
        // Write an empty string to the "existing" file
        await writeToFile(existingWriteFilePath, "");

        // Delete all files created during the test
        fs.readdir(pathToTestFileDir, (err: any, files: string[]) => {
            if (err) {
                console.error(err);
                return;
            }

            files.forEach((file) => {
                if (file.endsWith(".txt") && file !== "read_test.txt" && file !== "garbage_file.txt") {
                    fs.unlink(`${pathToTestFileDir}/${file}`, (err: any) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                }
            });
        });
    });
});