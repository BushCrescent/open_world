import { MeshBuilder, Scene, SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders";
import { useState } from "react";
import { MeshViewer } from "./components/MeshViewer";

export const App = (): JSX.Element => {
  const [scene, setScene] = useState<Scene>();

  const handleReady = async () => {
    setScene(scene);

    await SceneLoader.ImportMeshAsync(
      null,
      "./mesh/",
      "scene.gltf",
      scene,
      null,
      "gtlf"
    );
  };

  return (
    <div className="App">
      <MeshViewer onReady={handleReady} />
    </div>
  );
};
