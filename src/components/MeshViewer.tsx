import "@babylonjs/core/Debug/debugLayer";
import {
  ArcRotateCamera,
  PointLight,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import { GLTFFileLoader, STLFileLoader } from "@babylonjs/loaders";
import SceneComponent from "babylonjs-hook";

type MeshViewerProps = {
  onReady: (scene: Scene) => void;
};

export const MeshViewer = ({ onReady }: MeshViewerProps): JSX.Element => {
  const onSceneReady = (scene: Scene): void => {
    SceneLoader.RegisterPlugin(new STLFileLoader());
    SceneLoader.RegisterPlugin(new GLTFFileLoader());

    const canvas: HTMLCanvasElement | null = scene
      .getEngine()
      .getRenderingCanvas();

    const light: PointLight = new PointLight(
      "Omni",
      new Vector3(20, 20, 100),
      scene
    );

    const camera = new ArcRotateCamera(
      "camera",
      0,
      0,
      100,
      Vector3.Zero(),
      scene
    );
    camera.allowUpsideDown = true;
    camera.upperBetaLimit = NaN;
    camera.lowerBetaLimit = NaN;
    camera.panningInertia = 0;
    camera.panningSensibility = 5;

    camera.attachControl(canvas, false);

    light.position = camera.position;

    onReady(scene);
  };

  const onRender = (scene: Scene) => {
    scene.render();
  };

  return (
    <SceneComponent
      antialias
      adaptToDeviceRatio={false}
      onSceneReady={onSceneReady}
      onRender={onRender}
      id={"open_world"}
    />
  );
};
