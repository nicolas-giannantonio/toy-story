import * as THREE from 'three';

import Buzz from "./Buzz.js";
import {AmbientLight} from "three";
import Room from "./Room.js";
import Controls from "./Controls.js";
import Objects from "./Objects.js";
import Physics from "./Physics.js";

export default class World {

    constructor(_options) {
        this.config = _options.config
        this.scene = _options.scene;
        this.camera = _options.camera
        this.renderer = _options.renderer
        this.ressources = _options.ressources;
        this.debug = _options.debug
        this.time = _options.time
        this.sizes = _options.sizes

        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.setAxes()
        this.setControls()

        this.ambientLight = new AmbientLight("white", 1)
        this.scene.add(this.ambientLight)

        this.init();
    }

    start() {
        this.buzz.init();
        this.room.init();

        // this.camera.pan.enable()
    }

    init() {
        this.setBuzz()
        this.setRoom()

        this.ressources.on("ready", () => {
            this.start();
        })
    }

    setAxes()
    {
        this.axis = new THREE.AxesHelper()
        this.container.add(this.axis)
    }

    setControls()
    {
        this.controls = new Controls({
            config: this.config,
            sizes: this.sizes,
            time: this.time,
            camera: this.camera,
        })
    }

    setPhysics()
    {
        this.physics = new Physics({
            config: this.config,
            debug: this.debug,
            scene: this.scene,
            time: this.time,
            sizes: this.sizes,
            controls: this.controls,
        })

        this.container.add(this.physics.models.container)
    }

    // setObjects()
    // {
    //     this.objects = new Objects({
    //         time: this.time,
    //         resources: this.ressources,
    //         materials: this.materials,
    //         physics: this.physics,
    //         // debug: this.debugFolder
    //     })
    //     this.container.add(this.objects.container)
    // }

    // 3D

    setRoom() {
        this.room = new Room()
    }

    setBuzz() {
        this.buzz = new Buzz({
            scene: this.scene,
            camera: this.camera,
            renderer: this.renderer,
            ressources: this.ressources,
            time: this.time,
            controls: this.controls,
            debug: this.debug
        })

        this.container.add(this.buzz.container)
    }
}
