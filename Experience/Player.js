export default class Player {
    constructor(_options) {
        this.time = _options.time;

        this.timeLeft = 60 * 3;
        this.score = 0;
        this.items = [];

        this.startGame()
    }

    update() {
        if(this.timeLeft <= 0) {
            this.resetGame();
        }
        this.timeLeft--;
    }

    resetGame() {
        // this.time.off('tick');
    }

    startGame() {
        this.time.on('tick', () => {
            this.update();
        })
    }

    addItem(item) {
        this.items.push(item);
    }

}