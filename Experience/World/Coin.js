import * as THREE from 'three';
import * as CANNON from 'cannon';

export default class Coin {
    constructor(_options) {
        this.scene = _options.scene;
    }

    init(physicsWorld) {
        this.physicsWorld = physicsWorld;

        // Créer le mesh Three.js
        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(5, 5, 10),
            new THREE.MeshBasicMaterial({ color: 'red' })
        );

        this.cube.position.set(8.5, 2.5, 8.5);

        this.scene.add(this.cube);

        // Créer le corps physique
        const shape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 5)); // Demi-tailles
        this.body = new CANNON.Body({
            mass: 0, // Objet statique
            position: new CANNON.Vec3(8.5, 2.5, 8.5),
            shape: shape,
            material: this.physicsWorld.defaultMaterial,
        });

        this.physicsWorld.addBody(this.body);
    }

    update() {
        // Synchroniser le mesh avec le corps physique
        this.cube.position.copy(this.body.position);
        this.cube.quaternion.copy(this.body.quaternion);
    }
}
