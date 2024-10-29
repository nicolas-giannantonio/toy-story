import * as THREE from 'three';

export default class Room {
    constructor(_options) {
        this.ressources = _options.ressources
        this.container = new THREE.Object3D()
    }

    init() {
        this.setModel()
    }

    setModel() {
        this.model = this.ressources.items.room.scene.children[0]
        this.model.scale.set(5, 5, 5)
        this.container.add(this.model)
    }

}