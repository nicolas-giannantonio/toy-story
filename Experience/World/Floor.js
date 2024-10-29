import * as THREE from 'three';

export default class Floor
{
    constructor(_options)
    {
        this.container = new THREE.Object3D()
        this.scene = _options.scene
    }


    init() {
        this.setModel()
    }


    setModel() {
        this.model = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({color: "lightgray"}))
        this.model.rotation.set(-Math.PI / 2, 0, 0)
        this.container.add(this.model)
    }

}