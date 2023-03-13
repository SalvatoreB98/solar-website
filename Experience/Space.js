import * as THREE from 'three';
import Experience from './Experience';


export default class Space {
    constructor() {
        this.experience = new Experience();
        this.clock = new THREE.Clock();
        this.resources = this.experience.resources;
        this.scene = this.experience.scene;
        this.initAstronaut();
    }

    update() {
        let delta = this.clock.getDelta(); 
        this.astronautMixer.update(delta);
    }

    initAstronaut(){
        this.astronaut = this.resources.items["astronaut"].scene;
        this.astronautObject = this.resources.items["astronaut"].scene.children[0];
        console.log(this.astronautObject)
        this.astronautClips = this.resources.items["astronaut"].animations;
        
        this.experience.scene.add(this.astronautObject);
        this.astronautObject.scale.set(0.1,0.1,0.1);
        this.astronaut.renderOrder = 1;

        this.astronautMixer = new THREE.AnimationMixer(this.scene);
        this.astronautMoving = this.astronautMixer.clipAction( this.astronautClips[0])
        this.astronautMoving.play();
    }
}
