import * as THREE from 'three';

import Buzz from "./Buzz.js";
import Floor from "./Floor.js";
import {AmbientLight, DirectionalLight} from "three";
import Room from "./Room.js";
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
        this.controls = _options.controls

        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.setAxes()

        this.ambientLight = new AmbientLight("white", .75)
        this.scene.add(this.ambientLight)

        this.directionalLight = new DirectionalLight("orange", 1)
        this.directionalLight.position.set(10, 10, 10)
        this.scene.add(this.directionalLight)


        this.setBuzz()
        this.setFloor()
        // this.setRoom()

        this.init();
    }

    init() {
        // this.room.init();
        this.floor.init();
    }

    setAxes()
    {
        this.axis = new THREE.AxesHelper(150)
        this.container.add(this.axis)
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

    setRoom() {
        this.room = new Room({
            ressources: this.ressources,
        })

        this.container.add(this.room.container)
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

    setFloor() {
        this.floor = new Floor({
            scene: this.scene,
        })

        this.container.add(this.floor.container)
    }
}

