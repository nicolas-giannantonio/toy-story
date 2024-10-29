import * as THREE from 'three';

export default class Coin {
    constructor(_options) {

        this.scene = _options.scene;
    }


    init() {
        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(5, 5, 10),
            new THREE.MeshBasicMaterial({ color: "red" })
        );

        this.cube.position.x = 8.5;
        this.cube.position.z = 8.5;
        this.cube.position.y = 2.5;


        this.cubeBB = new THREE.Box3().setFromObject(this.cube);

        this.scene.add(this.cube);
    }

}