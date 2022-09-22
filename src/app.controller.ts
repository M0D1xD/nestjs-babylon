import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

import { storage } from './utils/storage.util';
import { babylonFileFilter } from './utils/model-file-filter';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
global.XMLHttpRequest = require("xhr2").XMLHttpRequest;

@ApiTags('test')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get('local')
  @ApiOperation({ summary: 'Test for reading file locally' })
  async testLocalFile() {
    return this.appService.testLocal();
  }

  @Get('import-async')
  @ApiOperation({ summary: 'Test for reading file locally' })
  async testImport() {
    return this.appService.testImportAsync();
  }

  @Post('load')
  @UseInterceptors(
    FileInterceptor("model", {
      ...storage("models"),
      fileFilter: babylonFileFilter
    })
  )
  async testModel(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    return this.appService.upload(file);
  }

}
