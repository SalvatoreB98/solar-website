import * as THREE from 'three';
import assets from './Utils/assets';
import Resources from './Utils/Resources';
import Scene from './Space';
import Renderer from './Renderer';
import Sizes from './Utils/Sizes';
import Camera from './Camera';
import Time from './Utils/Time';
import Space from './Space';
import Environment from './Environment';
export default class Experience {
    static instance;
    constructor(canvas) {
        if(Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.assets = assets;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.resources = new Resources(this.assets);

        this.resources.on("loaded",()=>{
            this.environment = new Environment();
            this.space = new Space();
            this.camera = new Camera();
            this.renderer =  new Renderer();
        })

        this.time.on("update", () => {
            this.update();
        })
        
        this.sizes.on("resize", () => {
            this.resize();
        });
    }
    update(){
        if(this.renderer){
            this.renderer.update();
            this.space.update();
        }

    }
    resize(){
        if(this.renderer){
            this.camera.resize();
            this.renderer.resize();
        }

    }
}