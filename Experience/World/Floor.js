import * as THREE from 'three';
import * as CANNON from 'cannon';

export default class Floor {
    constructor(_options) {
        this.scene = _options.scene;
    }

    init(physicsWorld) {
        this.physicsWorld = physicsWorld;

        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshStandardMaterial({ color: 'green' })
        );
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);

        const shape = new CANNON.Plane();
        this.body = new CANNON.Body({
            mass: 0,
            shape: shape,
            material: this.physicsWorld.defaultMaterial,
        });
        this.body.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.physicsWorld.addBody(this.body);
    }
}
