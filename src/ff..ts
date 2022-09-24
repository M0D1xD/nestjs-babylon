import 'reflect-metadata';

import 'babylonjs';
import 'babylonjs-loaders';
import "babylonjs-serializers"
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';


BABYLON.Tools.GetAbsoluteUrl = (url): string => {
  Logger.log(`GetAbsoluteURL`, url);
  return url;
};

@Injectable()
export class AppService implements OnModuleInit {
  private engine_: BABYLON.NullEngine;
  private scene_: BABYLON.Scene;
  async upload(file: Express.Multer.File) {
    Logger.log(JSON.stringify(file));
    let base64_model_content = this.readFileBase64(file);
    try {
      // BABYLON.SceneLoader.Append(
      //   "",
      //   base64_model_content,
      //   this.scene_,
      //   undefined,
      //   undefined,
      //   undefined,
      //   ".glb"
      // );
    } catch (e) {
      throw e;
    }

    return;
  }

  async testLocal() {
    // let base64_model_content = this.readFileBase64(null);
    let models = [
      '0701_200.glb'
      // '0001_200.glb',
      // '0001_250.glb',
      // '0001_300.glb',
      // '0001_350.glb',
      // '0001_400.glb',
      // '0001_450.glb',
      // '0001_500.glb',
      // '0001_600.glb',
    ];
    for (let model of models) {

      const m = BABYLON.SceneLoader.ImportMesh(
        '',
        'http://localhost:4000/uploads/models/',
        model,
        this.scene_,
        null,
        null,
        null,
        '.glb'
      );


    }

  }

  async testImportAsync() {

    let models = [
      '0701_200.glb',
      '0001_200.glb',
      '0001_250.glb',
      '0001_300.glb',
      '0001_350.glb',
      '0001_400.glb',
      '0001_450.glb',
      '0001_500.glb',
      '0001_600.glb',
    ];
    // let models = [];
    for (let m of models) {
      try {
        const {meshes} = await BABYLON.SceneLoader.ImportMeshAsync(
          '',
          'http://localhost:4000/uploads/models/',
          m,
          this.scene_,
          undefined,
          '.glb',
        );

      } catch (e) {
        Logger.error(e)
      }
    };
  }

  private readFileBase64(file: Express.Multer.File | null) {
    let modelPath = 'public/uploads/models/model.glb';
    // if (file) {
    //   const { path: uploadedPath } = file;
    //   modelPath = uploadedPath;
    // }
    // let fileData = readFile(
    //   join(process.cwd(), `${modelPath}`)
    //   ,
    //   {
    //     encoding: "base64",
    //   }
    // );

    // return `data:model/gltf-binary;base64,${fileData.toString()}`
  }

  // Initialize Engine / scene on start
  async onModuleInit() {
    this.engine_ = new BABYLON.NullEngine();
    this.engine_.disableManifestCheck = true;
    this.scene_ = new BABYLON.Scene(this.engine_);
    this.scene_.useRightHandedSystem = true;

    this.engine_.runRenderLoop(() => { });
  }

  private async loadModel() {
    try {
      return await BABYLON.SceneLoader.ImportMeshAsync(
        '',
        '',
        'http://localhost:4000/uploads/models/BoomBox.glb',
        this.scene_,
        undefined,
        '.glb',
      );
    } catch (e) {
      throw e;
    }
  }
}
