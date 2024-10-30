import * as THREE from 'three';

import Floor from './Floor.js';
import Coin from './Coin.js';
import { AmbientLight, DirectionalLight, PointLight } from 'three';
import Room from "./Room.js";

export default class World {
    constructor(_options) {
        this.config = _options.config;
        this.scene = _options.scene;
        this.camera = _options.camera;
        this.renderer = _options.renderer;
        this.ressources = _options.ressources;
        this.debug = _options.debug;
        this.time = _options.time;
        this.sizes = _options.sizes;
        this.controls = _options.controls;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        // this.setAxes();

        this.ambientLight = new AmbientLight('white', 0.25);
        this.scene.add(this.ambientLight);

        this.directionalLight = new DirectionalLight('orange', 5);
        this.directionalLight.position.set(0, 4, 10);
        this.directionalLight.castShadow = true;

        this.pointLight = new PointLight('white', 150);
        this.pointLight.position.set(-11, 36.5, -45);
        this.pointLight.castShadow = true;

        this.rectLight = new THREE.RectAreaLight( 0xf1f1f1, 5,  50, 50 );
        this.rectLight.position.set( 0, 80, 0 );
        this.rectLight.lookAt( 0, 0, 0 );


        this.scene.add(this.directionalLight, this.pointLight, this.rectLight);

        this.setFloor();
        this.setCoin();
        this.setRoom();

        this.init();
    }

    init() {
        this.floor.init(this.camera.physicsWorld);
        this.coin.init(this.camera.physicsWorld);
        this.room.init(this.camera.physicsWorld);


        this.time.on('tick', () => {
            const deltaTime = this.time.delta * 0.001;
            this.updatePhysics(deltaTime);
        });
    }

    setAxes() {
        this.axis = new THREE.AxesHelper(150);
        this.container.add(this.axis);
    }


    setCoin() {
        this.coin = new Coin({
            scene: this.scene,
        });
    }

    setFloor() {
        this.floor = new Floor({
            scene: this.scene,
        });
    }

    setRoom() {
        this.room = new Room({
            scene: this.scene,
            ressources: this.ressources,
        });
    }

    updatePhysics() {
        if (this.coin) {
            this.coin.update();
        }
    }
}
