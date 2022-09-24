import "reflect-metadata";

import "babylonjs";
import "babylonjs-loaders";
import { Injectable, Logger, OnModuleInit, StreamableFile } from '@nestjs/common';
import { join } from "path";
import { readFile, readFileSync } from "fs";
import { DracoCompression } from "babylonjs";
import { url } from "inspector";
const GetAbsoluteUrl: (url: string) => string =
  typeof document === "object"
    ? (url) => {
      const a = document.createElement("a");
      a.href = url;
      return a.href;
    }
    : typeof URL === "function" && typeof location === "object" ? (url) => new URL(url, location.origin).href : () => {
      Logger.log(`Error!!!!!!`);
      // return url;
      throw new Error("Unable to get absolute URL. Override BABYLON.Tools.GetAbsoluteUrl to a custom implementation for the current context.");
    };
BABYLON.Tools.GetAbsoluteUrl =
  // GetAbsoluteUrl

  (url): string => {
    Logger.log(`GetAbsoluteURL`, url)
    return url;
  }
BABYLON.DracoCompression.Configuration = {

  decoder: {
    wasmUrl: "http://127.0.0.1:4000/uploads/draco/draco_wasm_wrapper_gltf.js",
    wasmBinaryUrl: "http://127.0.0.1:4000/uploads/draco/draco_decoder_gltf.wasm",
    fallbackUrl: "http://127.0.0.1:4000/uploads/draco/draco_decoder_gltf.js"
  }
};
// BABYLON.Tools.LoadFile = () => { }

@Injectable()
export class AppService implements OnModuleInit {

  private engine_: BABYLON.NullEngine;
  private scene_: BABYLON.Scene;
  async upload(file: Express.Multer.File) {
    Logger.log(JSON.stringify(file))
    let base64_model_content = this.readFileBase64(file);
    try {
      BABYLON.SceneLoader.Append(
        "",
        base64_model_content,
        this.scene_,
        undefined,
        undefined,
        undefined,
        ".glb"
      );
    } catch (e) {
      throw e;
    }

    return;
  }

  async testLocal() {

    await this.loadDraco(this.scene_);

  }


  async testImportAsync() {
    const meshes = await this.loadModel();
    for (let m of meshes) {
      Logger.log(m)
    }
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

    return `data:model/gltf-binary;base64,${fileData.toString()}`
  }

  // Initialize Engine / scene on start
  async onModuleInit() {
    this.engine_ = new BABYLON.NullEngine();
    this.engine_.disableManifestCheck = true;
    this.scene_ = new BABYLON.Scene(this.engine_);
    this.scene_.useRightHandedSystem = true;
    this.engine_.runRenderLoop(() => {

    })
  }
  private async loadDraco(scene: BABYLON.Scene) {

    BABYLON.Tools.LoadFile("http://localhost:4000/uploads/0294_600.glb",
      async (data: any) => {
        var dracoCompression = new BABYLON.DracoCompression();

        var attributes = {
          // [BABYLON.VertexBuffer.UVKind]: 0,
          // [BABYLON.VertexBuffer.NormalKind]: 1,
          // [BABYLON.VertexBuffer.TangentKind]: 2,
          [BABYLON.VertexBuffer.PositionKind]: 3
        };

        var vertexData = await dracoCompression.decodeMeshAsync(data, attributes);
        var mesh = new BABYLON.Mesh("dracoMesh", scene);
        var geometry = new BABYLON.Geometry("dracoGeometry", scene, vertexData, undefined, mesh);

        mesh.material = new BABYLON.PBRMaterial("material", scene);
        mesh.material.sideOrientation = BABYLON.Material.CounterClockWiseSideOrientation;
        // mesh.material.metallic = 0;
      }, undefined, undefined, true);

  }



  private async loadModel() {
    try {
      const { meshes } = await BABYLON.SceneLoader.ImportMeshAsync('', 'http://localhost:4000/uploads/', '0294_600_draco.glb', this.scene_, undefined, '.glb');
      return meshes;
    } catch (e) {
      throw e;
    }
  }
}
