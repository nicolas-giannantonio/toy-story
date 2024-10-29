import * as THREE from 'three';
import { Mesh } from 'three';
import * as CANNON from 'cannon';

export class BuzzControler {
    constructor(_options) {
        this.controls = _options.controls;
        this.ressources = _options.ressources;
        this.scene = _options.scene;
        this.physicsWorld = _options.physicsWorld;

        this.init();
    }

    init() {
        this._acceleration = new THREE.Vector3(1, 0.25, 10.0);
        this._position = new THREE.Vector3();

        const shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
        this.body = new CANNON.Body({
            mass: 50,
            position: new CANNON.Vec3(0, 5, 0),
            shape: shape,
            material: this.physicsWorld.defaultMaterial,
            fixedRotation: false,
        });
        this.physicsWorld.addBody(this.body);

        this._target = new Mesh(
            new THREE.BoxGeometry(0.1, 0.1, 0.1),
            new THREE.MeshBasicMaterial({ color: "red" })
        );
        this._target.position.y = 0.5;
        this._target.scale.setScalar(30);

        this.scene.add(this._target);
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
        const controlObject = this._target;
        const _Q = new THREE.Quaternion();
        const _A = new THREE.Vector3();
        const _R = controlObject.quaternion.clone();

        const acc = this._acceleration.clone();

        if (this.controls.actions.left) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * acc.y);
            _R.multiply(_Q);
        }
        if (this.controls.actions.right) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, -4.0 * Math.PI * timeInSeconds * acc.y);
            _R.multiply(_Q);
        }

        controlObject.quaternion.copy(_R);

        const forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();

        const sideways = new THREE.Vector3(1, 0, 0);
        sideways.applyQuaternion(controlObject.quaternion);
        sideways.normalize();

        if (this.controls.actions.up) {
            const force = forward.clone().multiplyScalar(acc.z * (this.controls.actions.boost ? 5 : 1));
            this.body.velocity.x += force.x * timeInSeconds;
            this.body.velocity.z += force.z * timeInSeconds;
        }

        if (this.controls.actions.down) {
            const force = forward.clone().multiplyScalar(-acc.z);
            this.body.velocity.x += force.x * timeInSeconds;
            this.body.velocity.z += force.z * timeInSeconds;
        }

        if (!this.controls.actions.up && !this.controls.actions.down) {
            this.body.velocity.x *= Math.pow(0.9, timeInSeconds);
            this.body.velocity.z *= Math.pow(0.9, timeInSeconds);
        }

        if (this.controls.actions.jump) {

            if (Math.abs(this.body.velocity.y) < 0.1) {
                this.body.velocity.y = 10;
            }
            this.controls.actions.jump = false;
        }

        controlObject.position.copy(this.body.position);
        this._position.copy(controlObject.position);
    }
}
