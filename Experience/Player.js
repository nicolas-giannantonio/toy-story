import gsap from 'gsap';

export default class Player {
    constructor(_options) {
        this.time = _options.time;
        this.scene = _options.scene;

        this.timeLeft = 60 * 1000;
        this.items = [];

        this.$w__start = document.querySelector('.overlay__start');
        this.$startButton = document.querySelector('.start__button');
        this.$timeleft__time = document.querySelector('.timeleft__time');

        this.$startButton.addEventListener("click",() => {
            this.startGame();
        })
    }


    resetGame() {
        window.location.reload();
    }

    startGame() {
        this.updateTimeLeft();

        gsap.to(this.$w__start, {
            opacity: 0,
            duration: 1,
            pointerEvents: 'none',
            ease: 'power3.out',
        });

        this.timeInterval = setInterval(() => {
            this.timeLeft -= 1000;
            this.updateTimeLeft();

            if (this.timeLeft <= 0) {
                clearInterval(this.timeInterval);
                this.resetGame();
            }
        }, 1000);
    }

    updateTimeLeft() {
        this.$timeleft__time.innerHTML = this.timeLeft / 1000;
    }

    addItem(item) {
        if (this.items.includes(item.id)) {
            return;
        }

        this.items.push(item.id);

        this.scene.children.forEach((child) => {
            if (child.name === item.id) {
                child.visible = false;
                item.remove();
                this.checkItem(item.id);
            }

            if (child.name === 'room') {
                const roomElements = child.children[0].children[0].children;
                roomElements.forEach((mesh) => {
                    if (mesh.name === item.id) {
                        mesh.visible = false;
                        item.remove();
                    }
                    this.checkItem(item.id);
                });
            }
        });

        if(this.items.length === 3) {
            alert("Todo: Win screen");
            setTimeout(() => this.resetGame(), 1000);
        }
    }

    checkItem(item) {
        document.querySelector(`.${item}`).classList.add('item_checked');
    }

}