import * as THREE from 'three';

import Floor from "./Floor.js";
import {AmbientLight, DirectionalLight} from "three";
import Room from "./Room.js";
import Physics from "./Physics.js";
import Coin from "./Coin.js";

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
        this.player = _options.player

        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.setAxes()

        this.ambientLight = new AmbientLight("white", .25)
        this.scene.add(this.ambientLight)

        this.directionalLight = new DirectionalLight("white", 2)
        this.directionalLight.position.set(0, 2, 30)
        this.directionalLight.castShadow = true

        this.pointLight = new THREE.PointLight("white", 25)
        this.pointLight.position.set(0, 2, 30)
        this.pointLight.castShadow = true


        this.scene.add(this.directionalLight)

        this.setFloor()
        this.setCoin();
        // this.setRoom()

        this.init();
    }

    init() {
        // this.room.init();
        this.floor.init();
        this.coin.init();

        this.time.on('tick', () => {
            this.checkColisions()
        })
    }

    setAxes()
    {
        this.axis = new THREE.AxesHelper(150)
        this.container.add(this.axis)
    }


    setRoom() {
        this.room = new Room({
            ressources: this.ressources,
        })

        this.container.add(this.room.container)
    }

    setCoin() {
        this.coin = new Coin({
            scene: this.scene,
        })
    }

    setFloor() {
        this.floor = new Floor({
            scene: this.scene,
        })

        this.container.add(this.floor.container)
    }

    checkColisions() {
        const buzz = this.camera.buzzControler;
        if (!buzz || !buzz._target || !this.coin || !this.coin.cubeBB) {
            return;
        }

        if (buzz.targetBox && this.coin.cubeBB) {
            console.log(buzz.targetBox.intersectsBox(this.coin.cubeBB));
            buzz.isColide = buzz.targetBox.intersectsBox(this.coin.cubeBB);
        }

        if (!buzz.isColide) {
            buzz.isColide = false;
        }
    }

}



