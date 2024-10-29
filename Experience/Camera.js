import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { BuzzControler } from './World/Buzz'

export default class Camera
{
    constructor(_options)
    {
        this.time = _options.time
        this.sizes = _options.sizes
        this.renderer = _options.renderer
        this.debug = _options.debug
        this.config = _options.config
        this.controls = _options.controls
        this.ressources = _options.ressources
        this.scene = _options.scene

        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.target = {
            position: new THREE.Vector3(),
            rotation: new THREE.Quaternion(),
        }

        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder('camera')
            this.debugFolder.open()
        }

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance()
    {
        const fov = 60;
        const aspect = this.sizes.viewport.width / this.sizes.viewport.height;
        const near = 1.0;
        const far = 1000.0;

        this.instance = new THREE.PerspectiveCamera(fov, aspect, near, far)
        this.instance.position.set(25, 10, 25);

        this.buzzControler = new BuzzControler({
            controls: this.controls,
            scene: this.scene,
            ressources: this.ressources
        })
        
        this.thirdPersonCamera = new ThirdPersonCamera({
            camera: this.instance,
            target: this.buzzControler,
            debug: this.debug
        })

        this.container.add(this.instance)

        console.log(this.container)

        this.sizes.on('resize', () =>
        {
            this.instance.aspect = this.sizes.viewport.width / this.sizes.viewport.height
            this.instance.updateProjectionMatrix()
        })

        this.time.on('tick', (time) => {
            this.buzzControler.update(time)
            this.thirdPersonCamera.update(time)
        })
    }

    setOrbitControls() {
        this.orbitControls = new OrbitControls(this.instance, this.renderer.domElement)
        this.orbitControls.enabled = false
    }
}



class ThirdPersonCamera {
    constructor(params) {
        this._params = params;
        this._camera = params.camera;
        this.debug = params.debug

        this._currentPosition = new THREE.Vector3();
        this._currentLookat = new THREE.Vector3();


    }

    _CalculateIdealOffset() {
        const idealOffset = new THREE.Vector3(0, 20, -40);
        idealOffset.applyQuaternion(this._params.target.rotation);
        idealOffset.add(this._params.target.position);

        return idealOffset;
    }

    _CalculateIdealLookat() {
        const idealLookat = new THREE.Vector3(0, 10, 50);
        idealLookat.applyQuaternion(this._params.target.rotation);
        idealLookat.add(this._params.target.position);
        return idealLookat;
    }

    update(timeElapsed) {
        const idealOffset = this._CalculateIdealOffset();
        const idealLookat = this._CalculateIdealLookat();

        const t = 1.0 - Math.pow(0.001, timeElapsed);

        this._currentPosition.lerp(idealOffset, t);
        this._currentLookat.lerp(idealLookat, t);

        this._camera.position.copy(this._currentPosition);
        this._camera.lookAt(this._currentLookat);
    }
}