import * as THREE from 'three';
import * as CANNON from 'cannon';

// Importez vos autres classes
import Floor from './Floor.js';
import Coin from './Coin.js';
import { AmbientLight, DirectionalLight, PointLight } from 'three';
import {BuzzControler} from "./Buzz.js";

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

        this.setAxes();

        this.ambientLight = new AmbientLight('white', 0.25);
        this.scene.add(this.ambientLight);

        this.directionalLight = new DirectionalLight('white', 2);
        this.directionalLight.position.set(0, 2, 30);
        this.directionalLight.castShadow = true;

        this.pointLight = new PointLight('white', 25);
        this.pointLight.position.set(0, 2, 30);
        this.pointLight.castShadow = true;

        this.scene.add(this.directionalLight);

        this.setFloor();
        this.setCoin();

        this.init();
    }

    init() {
        this.floor.init(this.camera.physicsWorld);
        this.coin.init(this.camera.physicsWorld);

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

    updatePhysics() {
        if (this.coin) {
            this.coin.update();
        }
    }
}
