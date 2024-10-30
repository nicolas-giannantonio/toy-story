import * as CANNON from 'cannon';

export default class Floor {
    constructor(_options) {
        this.scene = _options.scene;
    }

    init(physicsWorld) {
        this.physicsWorld = physicsWorld;
        const shape = new CANNON.Plane();
        this.body = new CANNON.Body({
            mass: 0,
            shape: shape,
            material: this.physicsWorld.defaultMaterial,
            name: 'floor',
        });
        this.body.name = 'floor';
        this.body.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.physicsWorld.addBody(this.body);
    }
}
