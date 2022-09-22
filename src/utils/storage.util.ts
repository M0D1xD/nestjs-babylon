import { diskStorage } from "multer";
import { editFileName } from "./edit-file-name";
import { existsSync, mkdirSync } from 'fs';
export const storage = (folder: string) => {
    return {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const baseDirectory = `./public/uploads/${folder}`;
                if (!existsSync(baseDirectory)) {
                    mkdirSync(baseDirectory, { recursive: true });
                }
                return cb(null, baseDirectory);
            },
            filename: editFileName,
        }),
    };
};
