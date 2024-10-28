import * as THREE from 'three';
export default class Renderer {
    constructor(_options) {
        this.canvas = _options.canvas;
        this.sizes = _options.sizes;
        this.scene = _options.scene;
        this.camera = _options.camera;

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            powerPreference: 'high-performance'
        });

        this.instance.setClearColor("#000000")
        this.instance.setSize(this.sizes.width, this.sizes.height);
        // this.instance.autoClear = false
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.instance.toneMapping = THREE.ACESFilmicToneMapping
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    update() {
        this.instance.render(this.scene, this.camera.instance);
    }

}