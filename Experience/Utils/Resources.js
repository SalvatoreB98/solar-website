import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js';
import Experience from './../Experience';
import { EventEmitter } from 'eventemitter3';

export default class Resources extends EventEmitter {
    constructor(assets) {
        super();
        this.loaders = {};
        this.items = {};
        this.assets = assets;
        this.loaded = 0;
        this.setLoaders();
        this.startLoading();
    }
    setLoaders(){
    
        this.queue = this.assets.length;
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }
    startLoading(){
        for(const asset of this.assets){
            if(asset.type==="glbModel"){
                this.loaders.gltfLoader.load(asset.path, (file)=>{  
                    this.singleAssetLoaded(asset, file);
                })
            }
        }
    }
    singleAssetLoaded(asset, file){
        this.items[asset.name] = file;
        this.loaded++;
        if(this.loaded === this.queue){
            this.emit("loaded")
        }
    }
}