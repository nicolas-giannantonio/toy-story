import * as THREE from 'three'
import {TransformControls} from "three/addons/controls/TransformControls.js";

export default class Buzz {
    constructor(_options) {
        this.container = new THREE.Object3D()
        this.position = new THREE.Vector3()

        this.ressources = _options.ressources
        this.time = _options.time
        this.camera = _options.camera
        this.renderer = _options.renderer
        this.controls = _options.controls
        this.debug = _options.debug

        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder('buzz')
            this.debugFolder.open()
        }
    }

    init() {
        this.setModel();
        this.setTransformControls();
        this.setMovement();
        this.setBuzzPosition()
    }

    setMovement() {
        this.movement = {}
        this.movement.speed = new THREE.Vector3()

        this.time.on("tick", () => {
            // const max = 1
            // const accelerationX = Math.min(Math.max(this.movement.acceleration.x, - max), max)
            // const accelerationY = Math.min(Math.max(this.movement.acceleration.y, - max), max)
            this.model.position.y += this.controls.actions.up ? .1 : 0
            this.model.position.y -= this.controls.actions.down ? .1 : 0
        })
    }

    setBuzzPosition() {
        this.container.position.copy(this.position);
        this.container.add(this.model)

        this.model.rotation.set(0, 0, 0)
        this.model.position.set(0, 0, 0)
    }

    setModel() {
        this.model = this.ressources.items.buzz.scene.children[0]
    }

    setTransformControls() {
        this.transformControls = new TransformControls(this.camera.instance, this.renderer.domElement)
        this.transformControls.size = 0.5

        this.transformControls.attach(this.movement)
        this.transformControls.enabled = false
        this.transformControls.visible = this.transformControls.enabled

        this.container.add(this.transformControls)

        if(this.debug)
        {
            const folder = this.debugFolder.addFolder('controls')
            folder.open()

            folder.add(this.transformControls, 'enabled').onChange(() =>
            {
                this.transformControls.visible = this.transformControls.enabled
            })
        }
    }



}