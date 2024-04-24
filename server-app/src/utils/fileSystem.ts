import path from 'path';
import { fileURLToPath } from 'url';

export const getFilePath = (importData: any) => {
    const __filename = fileURLToPath(importData.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, importData);
}