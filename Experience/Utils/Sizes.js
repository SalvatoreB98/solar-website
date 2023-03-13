
import { EventEmitter } from 'eventemitter3';
export default class Sizes extends EventEmitter{
    constructor(){
        super();
        this.width = window.innerWidth;
        this.height= window.innerHeight;
        this.aspect = this.width/this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.frustrum = 5;
        this.isMobile = /Mobi/i.test(window.navigator.userAgent)
        
        window.addEventListener("resize",()=>{
            this.width = window.innerWidth;
            this.height= window.innerHeight;
            this.aspect = this.width/this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.emit("resize");
        })
    }
}