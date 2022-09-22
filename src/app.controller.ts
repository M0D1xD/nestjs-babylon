import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

import { storage } from './utils/storage.util';
import { babylonFileFilter } from './utils/model-file-filter';
global.XMLHttpRequest = require("xhr2").XMLHttpRequest;

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get('test-local')
  async testLocalFile() {
    return this.appService.testLocal();
  }

  @Get('test-import-async')
  async testImport() {
    return this.appService.testImportAsync();
  }

  @Post('')
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
