import Experience from "./Experience.js";
import * as THREE from 'three';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.setAmbientLight();
        this.setSunlight();
    }
    setAmbientLight(){
        this.ambientLight = new THREE.AmbientLight("#e9c9c6",1)
        this.scene.add(this.ambientLight);
    }
    setSunlight(){
        this.sunlight = new THREE.DirectionalLight('#fdd892', 3);
        this.sunlight.shadow.bias = -0.0004
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far=20;
        this.sunlight.shadow.mapSize.set(2048,2048)
        this.sunlight.rotation.x = 50
        this.sunlight.position.set(0.8, 7, 3)
        this.scene.add(this.sunlight);
    }
}