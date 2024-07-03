<template>
  <div class="main-container">
    <div class="canvas-container">
      <canvas ref="canvasRef" class="canvas"></canvas>
      <div class="charts-overlay">
        <div class="column left-column">
          <div class="chart"><Echarts1 /></div>
          <div class="chart"><Echarts2 /></div>
          <div class="chart"><Echarts3 /></div>
        </div>
        <div class="column right-column">
          <div class="chart"><Echarts4 /></div>
          <div class="chart"><Echarts5 /></div>
          <div class="chart"><Echarts6 /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import '@babylonjs/inspector';
import navList from '../utils/navList';

import Echarts1 from '../echarts/Echarts1.vue';
import Echarts2 from '../echarts/Echarts2.vue';
import Echarts3 from '../echarts/Echarts3.vue';
import Echarts4 from '../echarts/Echarts4.vue';
import Echarts5 from '../echarts/Echarts5.vue';
import Echarts6 from '../echarts/Echarts6.vue';

let loopIndex = 0;
const canvasRef = ref(null);
const camera = ref(null);
const activeKey = ref(0);
const cacheName = reactive([]);

// Helper function to create and start an animation
const animateCamera = (type, newPos, camera) => {
  const speed = 60;
  const frameCount = 240;

  const ease = new BABYLON.CubicEase();
  ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  BABYLON.Animation.CreateAndStartAnimation(
    "animation",
    camera,
    type,
    speed,
    frameCount,
    camera[type],
    newPos,
    0,
    ease
  );
};

const showModel = ({ position, target }) => {
  animateCamera("position", new BABYLON.Vector3(...position), camera.value);
  animateCamera("target", new BABYLON.Vector3(...target), camera.value);
};

// Function to add hover and click actions to a mesh
const addMeshActions = (mesh, scene) => {
  // Ensure the mesh has a material
  if (!mesh.material) {
    mesh.material = new BABYLON.StandardMaterial("defaultMaterial", scene);
  }

  // Ensure the material has a diffuseColor
  if (!mesh.material.diffuseColor) {
    mesh.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
  }

  mesh.actionManager = new BABYLON.ActionManager(scene);

  // Change color on hover
  mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(
    BABYLON.ActionManager.OnPointerOverTrigger,
    mesh.material,
    "diffuseColor",
    new BABYLON.Color3(1, 0, 0),
    150
  ));
  
  // Revert color on hover out
  mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(
    BABYLON.ActionManager.OnPointerOutTrigger,
    mesh.material,
    "diffuseColor",
    new BABYLON.Color3(1, 1, 1),
    150
  ));

  // Handle click action
  mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
    BABYLON.ActionManager.OnPickTrigger,
    () => {
      alert(`${mesh.name} clicked`);
      // Here you can add logic to focus on the object, like:
      // showModel with appropriate position and target for the clicked object
    }
  ));
};

// Adding actions to all meshes in the scene
const addActionsToAllMeshes = (scene) => {
  scene.meshes.forEach(mesh => {
    addMeshActions(mesh, scene);
  });
};

// Initializing Babylon.js engine and scene
const initEngine = async () => {
  if (canvasRef.value) {
    const engine = new BABYLON.Engine(canvasRef.value, true);
    const scene = new BABYLON.Scene(engine);
    camera.value = new BABYLON.ArcRotateCamera(
      'camera',
      Math.PI / 10,
      Math.PI / 3,
      20,
      BABYLON.Vector3.Zero(),
      scene
    );

    camera.value.attachControl(canvasRef.value);
    camera.value.lowerBetaLimit = 0;
    camera.value.upperBetaLimit = Math.PI / 2;
    camera.value.lowerRadiusLimit = 3;
    camera.value.upperRadiusLimit = 40;

    const light = new BABYLON.HemisphericLight(
      "HemisphericLight",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    light.intensity = 1;
    light.specular = new BABYLON.Color3(1, 1, 0);

    BABYLON.SceneLoader.Append('/model/', 'library_draco.glb', scene, () => {
      // Add actions to all meshes in the loaded model
      addActionsToAllMeshes(scene);
      showModel(animation);
    });

    engine.runRenderLoop(() => {
      scene.render();
    });

    scene.debugLayer.show({
      embedMode: true,
    });

    window.addEventListener('resize', () => {
      engine.resize();
    });

    // autoPlay(scene);
  }
};

onMounted(() => {
  initEngine();
  // autoPlay();
});
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.canvas-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.canvas {
  width: 100%;
  height: 100%;
}

.charts-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none; /* This allows clicks to pass through to the canvas */
}

.column {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.chart {
  background-color: rgba(255, 255, 255, 0.4);
  pointer-events: all; /* This ensures the charts themselves can still be interacted with */
  box-sizing: border-box;
  padding: 10px;
  flex: 1;
  margin: 5px 0;
}
</style>
