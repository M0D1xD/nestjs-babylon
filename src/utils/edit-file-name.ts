import * as fs from "fs";
import * as UUID from "uuid";
import { extname } from 'path';

export const editFileName = (req, file: Express.Multer.File, callback) => {
    const fileExtName = extname(file.originalname);
    callback(
        null,
        `${UUID.v4().replace(
            new RegExp(/[.*+\-?^${}()|[\]\\]/g, "g"),
            "g"
        )}${fileExtName}`
    );
};