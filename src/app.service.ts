import "reflect-metadata";

import "babylonjs";
import "babylonjs-loaders";
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { join } from "path";
import { readFileSync } from "fs";



BABYLON.Tools.GetAbsoluteUrl = (url): string => {
  Logger.log(`GetAbsoluteURL`, url)
  return url;
}

@Injectable()
export class AppService implements OnModuleInit {

  private engine_: BABYLON.NullEngine;
  private scene_: BABYLON.Scene;
  async upload(file: Express.Multer.File) {
    let base64_model_content = this.readFileBase64(file);
    BABYLON.SceneLoader.Append(
      "",
      base64_model_content,
      this.scene_,
      undefined,
      undefined,
      undefined,
      ".glb"
    );

    return;
  }

  async testLocal() {
    let base64_model_content = this.readFileBase64(null);
    BABYLON.SceneLoader.Append(
      "",
      base64_model_content,
      this.scene_,
      undefined,
      undefined,
      undefined,
      ".glb"
    );

    return;
  }


  async testImportAsync() {
    await this.loadModel();
  }

  
  private readFileBase64(file: Express.Multer.File | null) {
    let modelPath = 'public/uploads/models/model.glb';
    if (file) {
      const { path: uploadedPath } = file;
      modelPath = uploadedPath;
    }
    let fileData = readFileSync(join(process.cwd(), `${modelPath}`), {
      encoding: "base64",
    });

    return `data:;base64,${fileData.toString()}`
  }

  // Initialize Engine / scene on start
  async onModuleInit() {
    this.engine_ = new BABYLON.NullEngine();
    this.engine_.disableManifestCheck = true;
    this.scene_ = new BABYLON.Scene(this.engine_);
    this.scene_.useRightHandedSystem = true;
  }


  private async loadModel() {
    try {
      const { meshes } = await BABYLON.SceneLoader.ImportMeshAsync('', 'http://localhost:4000/uploads/models/', 'model.glb', this.scene_, undefined, '.glb');
      return meshes;
    } catch (e) {
      Logger.error(e)
    }
  }
}
