<template>
    <div>
        <canvas ref="canvasRef" style="width: 100%;"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as BABYLON from 'babylonjs';

const canvasRef = ref(null);

const initEngine = async () => {
    if (canvasRef.value) {
        const engine = new BABYLON.Engine(canvasRef.value, true);
        const scene = new BABYLON.Scene(engine);

        const camera = new BABYLON.ArcRotateCamera(
            'camera',
            Math.PI / 2,
            Math.PI / 4,
            10,
            BABYLON.Vector3.Zero(),
            scene
        );
        camera.attachControl(canvasRef.value, true);
        camera.position = new BABYLON.Vector3(0, 6, -6);

        // 创建球体并设置位置
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
        sphere.position.set(-1.5, 1, 0)

        // 创建圆柱体并设置位置
        const cylinder = BABYLON.MeshBuilder.CreateCylinder(
            'cylinder',
            { height: 2, diameter: 0.1 },
            scene
        );
        cylinder.position.set(2, 1, 0)
        const sphere1 = BABYLON.MeshBuilder.CreateSphere('sphere1', { diameter: 0.7 }, scene);
        sphere1.position.set(2, 1, 0)
        const sphere2 = BABYLON.MeshBuilder.CreateSphere('sphere2', { diameter: 0.7 }, scene);
        sphere2.position.set(2, 1.7, 0)
        const sphere3 = BABYLON.MeshBuilder.CreateSphere('sphere3', { diameter: 0.7 }, scene);
        sphere3.position.set(2, 2.4, 0)

        const light = new BABYLON.DirectionalLight(
            'light',
            new BABYLON.Vector3(0, -1, 0),
            scene
        );
        light.intensity = 1;

        // 创建自定义地面
        const myGround = BABYLON.MeshBuilder.CreateGround(
            'myGround',
            { width: 6, height: 4, subdivisions: 4 },
            scene
        );

        // 渲染循环
        engine.runRenderLoop(() => {
            scene.render();
        });

        // 处理窗口调整大小事件
        window.addEventListener('resize', () => {
            engine.resize();
        });

        // 清理函数，避免内存泄漏
        onBeforeUnmount(() => {
            engine.dispose();
        });

        return scene;
    }
};

onMounted(initEngine);
</script>

<style scoped>
canvas {
    width: 100%;
    height: 100vh;
    display: block;
}
</style>