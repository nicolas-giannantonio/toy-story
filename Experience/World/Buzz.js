import * as THREE from 'three'

export default class Buzz {
    constructor(_options) {
        this.container = new THREE.Object3D()
        this.rotation = new THREE.Vector3()

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
}


export class BuzzControler {
    constructor(_options) {
        this.controls = _options.controls
        this.ressources = _options.ressources
        this.scene = _options.scene

        this.init()
    }

    init() {
        this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
        this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
        this._velocity = new THREE.Vector3(0, 0, 0);
        this._position = new THREE.Vector3();

        this._animations = {};
        // this._target = this.ressources.items.buzz.scene.children[0]
        this._target = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: 0xff0000})
        )

        this._target.scale.set(5, 10, 5);
        this._target.position.set(0, 5, 0);
        this._animations = this.ressources.items.buzz.animations

        this.scene.add(this._target)
    }

    get position() {
        return this._position;
    }

    get rotation() {
        if (!this._target) {
            return new THREE.Quaternion();
        }
        return this._target.quaternion;
    }

    update(timeInSeconds) {
        const velocity = this._velocity;
        const frameDecceleration = new THREE.Vector3(
            velocity.x * this._decceleration.x,
            velocity.y * this._decceleration.y,
            velocity.z * this._decceleration.z
        );
        frameDecceleration.multiplyScalar(timeInSeconds);
        frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
            Math.abs(frameDecceleration.z), Math.abs(velocity.z));

        velocity.add(frameDecceleration);

        const controlObject = this._target;
        const _Q = new THREE.Quaternion();
        const _A = new THREE.Vector3();
        const _R = controlObject.quaternion.clone();

        const acc = this._acceleration.clone();

        if (this.controls.actions.up) {
            console.log('Forward')
            velocity.z += acc.z * timeInSeconds;
        }
        if (this.controls.actions.down) {
            velocity.z -= acc.z * timeInSeconds;
        }
        if (this.controls.actions.left) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
            _R.multiply(_Q);
        }
        if (this.controls.actions.right) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
            _R.multiply(_Q);
        }

        controlObject.quaternion.copy(_R);

        const oldPosition = new THREE.Vector3();
        oldPosition.copy(controlObject.position);

        const forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();

        const sideways = new THREE.Vector3(1, 0, 0);
        sideways.applyQuaternion(controlObject.quaternion);
        sideways.normalize();

        sideways.multiplyScalar(velocity.x * timeInSeconds);
        forward.multiplyScalar(velocity.z * timeInSeconds);

        controlObject.position.add(forward);
        controlObject.position.add(sideways);

        this._position.copy(controlObject.position);
    }
}