class Game {
  constructor() {
    //Get all the Game screen
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");

    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "../../Dom-Race-Car/images/car.png"
    );
    //Style for the Game Board
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    // Variable to check if I am in the process of creating an obstacle
    this.isPushingObstacle = false;

    this.gameIsOver = false;
  }
  /* START FUNCTION */
  start() {
    // Sets the height and width of the game screen.
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    // Hides the start screen
    this.startScreen.style.display = "none";
    // Shows the game screen
    this.gameScreen.style.display = "block";

    /*Starts the game loop using setInterval(), which repeatedly executes the gameLoop() function at a frequency of 60 times per second. */
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.update();
    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");

    this.player.move();

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();
    }

    if (!this.obstacles.length) {
      setTimeout(() => {
        this.obstacles.push(new Obstacle(this.gameScreen));
      }, 1500);
    }

    score.innerHTML = this.score;
    lives.innerHTML = this.lives;
  }
}
