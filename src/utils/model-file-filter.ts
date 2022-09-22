import { BadRequestException } from "@nestjs/common";
import { parse } from 'path';

export const babylonFileFilter = (req, file: Express.Multer.File, callback) => {
    const extension: string = parse(file.originalname).ext;
    if (!extension.toLocaleLowerCase().match(/\.(babylon|glb)$/)) {
        return callback(
            new BadRequestException("Only .babylon | .glb files are allowed!"),
            false
        );
    }
    return callback(null, true);
};




