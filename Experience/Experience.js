import * as THREE from 'three'
import * as dat from 'dat.gui'

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import World from "./World/World.js";
import Resources from "./Ressources.js";

export default class Experience
{
    constructor(canvas) {
        this.canvas = canvas;

        this.sizes = new Sizes()
        this.time = new Time()
        this.resources = new Resources()

        this.setConfig()
        this.setDebug()

        this.setRenderer()
        this.setCamera()

        this.setWorld()
    }

    setConfig() {
        this.config = {}
        this.config.debug = window.location.hash === '#debug'
        this.config.touch = false
    }

    setDebug() {
        if(this.config.debug)
        {
            this.debug = new dat.GUI({ width: 420 })
        }
    }

    setRenderer() {
        this.scene = new THREE.Scene()

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            powerPreference: 'high-performance'
        })
        this.renderer.setClearColor(0x000000, 1)
        this.renderer.setPixelRatio(2)
        this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
        this.renderer.autoClear = false

        this.sizes.on('resize', () =>
        {
            this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
        })

        this.time.on('tick', () =>
        {
            this.renderer.render(this.scene, this.camera.instance)
        })
    }

    setCamera() {
        this.camera = new Camera({
            time: this.time,
            sizes: this.sizes,
            renderer: this.renderer,
            debug: this.debug,
            config: this.config,
            canvas: this.canvas
        })

        this.scene.add(this.camera.container)

        this.time.on('tick', () =>
        {
            if(this.world && this.world.buzz)
            {
                // this.camera.target.x = this.world.buzz.position.x
                // this.camera.target.y = this.world.buzz.position.y
            }
        })
    }

    setWorld() {
        this.world = new World({
            config: this.config,
            scene: this.scene,
            camera: this.camera,
            renderer: this.renderer,
            ressources: this.resources,
            debug: this.debug,
            time: this.time,
            sizes: this.sizes,
        })

        this.scene.add(this.world.container)
    }


}