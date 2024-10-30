import * as CANNON from 'cannon';

export default class Room {
    constructor(_options) {
        this.ressources = _options.ressources;
        this.scene = _options.scene;
    }

    init(physicsWorld) {
        this.physicsWorld = physicsWorld;
        this.setModel();
        this.collision();
    }

    setModel() {
        this.model = this.ressources.items.room.scene.children[0];
        this.model.name = 'room';
        this.elements = this.model.children[0].children[0].children;
        this.model.scale.setScalar(10);
        this.model.position.set(0, 0, 0);
        this.scene.add(this.model);
    }

    collision() {
        this.elements.forEach((mesh) => {
            if(mesh.name === 'Luxo_BallMain_Ctrl') {
                mesh.tag = 'item';
            }
            if(mesh.name === 'Globe_Grp') {
                mesh.tag = 'item';
            }
            if(mesh.name === 'Army_Men_Bucket') {
                mesh.tag = 'item';
            }
        })

        this.items();

        this.walls();
        this.desk();
        this.deskJoy();
        this.deskRamp();
        this.bed();
        this.nightTable();
        this.cupboard();
        this.woodcupboard();
        this.boiteTop();
    }

    items() {
        const ballDesk = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Sphere(3),
            position: new CANNON.Vec3(-5, 30, -42),
        })
        ballDesk.tag = 'item';
        ballDesk.name = 'Luxo_BallMain_Ctrl';


        const army_Men_Bucket = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Sphere(4),
            position: new CANNON.Vec3(55, 52.5, -23.5),
        })
        army_Men_Bucket.tag = 'item';
        army_Men_Bucket.name = 'Army_Men_Bucket';


        const globe = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Sphere(5),
            position: new CANNON.Vec3(53, 39, 47),
        })

        globe.tag = 'item';
        globe.name = 'Globe_Grp';


        const car = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                2,
                2,
                3
            )),
            position: new CANNON.Vec3(-48.5, 2, -12),
        })


        this.physicsWorld.addBody(ballDesk);
        this.physicsWorld.addBody(globe);
        this.physicsWorld.addBody(car);
        this.physicsWorld.addBody(army_Men_Bucket);
    }

    walls() {
        const leftWall = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                1,
                100,
                100
            )),
            position: new CANNON.Vec3(-61, 25, 0),
        });

        const rightWall = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                1,
                100,
                100
            )),
            position: new CANNON.Vec3(61, 25, 0),
        });

        const backWall = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                100,
                100,
                1
            )),
            position: new CANNON.Vec3(0, 25, 61),
        });

        const frontWall = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                100,
                100,
                1
            )),
            position: new CANNON.Vec3(0, 25, -61),
        });

        this.physicsWorld.addBody(leftWall);
        this.physicsWorld.addBody(rightWall);
        this.physicsWorld.addBody(backWall);
        this.physicsWorld.addBody(frontWall);
    }

    desk() {
        const body = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                22.5,
                25,
                10
            )),
            position: new CANNON.Vec3(-7, 2, -45),
            material: this.physicsWorld.defaultMaterial,
        });
        this.physicsWorld.addBody(body);
    }

    deskJoy() {
        const body = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                10.5,
                12,
                8
            )),
            position: new CANNON.Vec3(-45, 2, -45),
            material: this.physicsWorld.defaultMaterial,
        });
        this.physicsWorld.addBody(body);
    }

    deskRamp() {
        const body = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                8,
                12,
                8
            )),
            position: new CANNON.Vec3(30, 2, -45),
            material: this.physicsWorld.defaultMaterial,
        });
        this.physicsWorld.addBody(body);
    }

    bed() {
        const body = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                37,
                9.5,
                20
            )),
            material: this.physicsWorld.defaultMaterial,
            position: new CANNON.Vec3(-37, 2, 45),
        });
        this.physicsWorld.addBody(body);
    }

    nightTable() {
        const body = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                5,
                10,
                5
            )),
            position: new CANNON.Vec3(-52, 10, 14),
            material: this.physicsWorld.defaultMaterial,
        });
        this.physicsWorld.addBody(body);
    }

    cupboard() {
        const body = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                5,
                17.5,
                10
            )),
            position: new CANNON.Vec3(52, 15, 47.5),
            material: this.physicsWorld.defaultMaterial,
        });
        this.physicsWorld.addBody(body);
    }

    woodcupboard() {
        const body = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                5,
                15.5,
                14
            )),
            material: this.physicsWorld.defaultMaterial,
            position: new CANNON.Vec3(52, 15, -24.5),
        });
        this.physicsWorld.addBody(body);
    }

    boiteTop() {
        const body = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(
                3,
                    .5,
                14
            )),
            material: this.physicsWorld.defaultMaterial,
            position: new CANNON.Vec3(55, 39, -25.5),
        });
        this.physicsWorld.addBody(body);
    }
}
