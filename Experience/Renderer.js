import * as THREE from 'three';
import Experience from './Experience';

export default class Renderer {
    // Create a WebGL renderer
    constructor(canvas) {
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.setRenderer();
    }

    setRenderer(){
        console.log(this.canvas)
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            side: THREE.FrontSide, 
            shadowSide: THREE.FrontSide
        });
        
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setClearColor(0x000000, 1);
        var gpuName = this.getGPU()
        console.log(gpuName)
        // gpuName.toLowerCase().includes("intel") AGGIUNGERE CONDIZIONE PER OTTIMIZZARE
        if(this.isMobile || gpuName.toLowerCase().includes("intel")){
            this.renderer.antialias = false
            this.renderer.setPixelRatio(this.sizes.pixelRatio*0.5); 
        } else {
            this.renderer.setPixelRatio(this.sizes.pixelRatio); 
        }
    }

    getGPU(){
        var canvas = document.createElement('canvas');
        var gl = canvas.getContext("experimental-webgl");
        return this.getUnmaskedInfo(gl).renderer;
    }
    getUnmaskedInfo(gl) {
        var unMaskedInfo = {
          renderer: '',
          vendor: ''
        };
  
        var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (dbgRenderInfo != null) {
          unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
          unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
        }
  
        return unMaskedInfo;
    }


    resize() {
        //update perspective Camera on Resize
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
        this.renderer.render(this.scene, this.camera.orthographicCamera) 
    }
}