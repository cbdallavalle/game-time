const Planet = require('./Planet.js');
const Ufo = require('./Ufo.js');
const Refuel = require('./Refueling.js');
const Sun = require('./Sun.js');
const planet = new Planet();
let sun = new Sun();
let canvasWidth = 750;
let canvasHeight = 500;

class Game {
  constructor() {
    this.planetsArray = [];
    this.scoreIncrement = 10;
    this.score = 0;
    this.level = 0;
    this.planetsGenerated = 0;
    this.ufo = new Ufo(250, 460);
    this.refuel = new Refuel(1, -40, 40, 40);
    this.upArrowPressed = false;
    this.levelChange = false;
    this.loss = false;
  }

  onPlay(ctx) {
    this.ufo.draw(ctx, this.ufo.imgsrc);
    this.ufo.makeGravity();
    this.ufo.makeFriction();
    this.ufo.arrowUp();
    this.movePlanets();
    this.checkCollision();
    this.changeLevelState();
    this.generateRefuel(ctx);
    this.generateSun(ctx);
    this.planetsArray.forEach( planet => {
      planet.draw(ctx, planet.imgsrc);
      planet.makePlanetFriction(this.upArrowPressed);
    })
  }

  checkLoss() {
    if (this.ufo.y > canvasHeight + 40) {
      this.loss = true;
      this.ufo.y = canvasHeight + 50;
      this.level = 0;
    }
  }

  resetStates() {
    this.ufo.velocityY = 0;
    this.ufo.x = canvasWidth / 2;
    this.ufo.removeBottom = false;
    this.scoreIncrement = 10;
    this.planetsArray = [];
    this.refuel.refuelExists = false;
  }

  changeLevelState() {
    if (this.score >= 1000 && this.level === 0) {
      this.level = 1;
      this.levelChange = true;
      this.upArrowPressed = false;
      this.resetStates();
    } 
  }

  checkKeyFunctionality(string) {
    this.checkBottom();
    if (string == '38' && this.upArrowPressed === false) {
      this.ufo.bounceUp();
    } else if (string == '37') {
      this.ufo.moveLeft();
    } else if (string == '39') {
      this.ufo.moveRight();
    }
  }

  checkBottom() {
    if (this.upArrowPressed === true) {
      this.ufo.removeBottom = true;
    }
  }

  resetVelocityX(string) {
    //left arrow
    if (string == '37') {
      if (this.ufo.x < 10) {
        this.ufo.x = 0;
        this.ufo.velocityX = 0;
        this.ufo.x = 0;
      } else {
        this.ufo.velocityX = -0.5;
      }
    // right arrow
    } else if (string == '39') {
      if (this.ufo.x > canvasWidth - 50) {
        this.ufo.velocityX = 0;
        this.ufo.x = canvasWidth - 40;
      } else {
        this.ufo.velocityX = 0.5;
      }   
    }
  }

  checkCollision() {
    this.planetsArray = this.ufo.checkForPlanetCollision(this.planetsArray); 
    this.refuel = this.ufo.checkForRefuelCollision(this.refuel);
    this.calculateScore();
  }

  generatePlanets() {
    let lastPlanet = this.planetsArray[ this.planetsArray.length - 1 ];

    if (!lastPlanet || lastPlanet.y > 50) {
      let level = this.level;
      var planetSizes = planet.checkPlanetSize(level);
      let newPlanet = new Planet(planetSizes.width, planetSizes.height);

      this.planetsArray.push(newPlanet);
      this.removePlanets();
      this.planetsGenerated++; 
      this.checkForRefuel();
      this.checkForSun();
    }
  }

  checkForRefuel() {
    if (this.planetsGenerated === 10) {
      this.planetsGenerated = 0;
      this.refuel.refuelExists = true;
    }
  }

  generateRefuel(ctx) {
    if (this.refuel.refuelExists) {
      this.refuel.moveRefuel();
      this.refuel.draw(ctx, this.refuel.imgsrc);
      this.refuel.checkRefuelY();
    }
  }

  checkForSun() {
    if (this.planetsGenerated == 2) {
      sun.sunExists = true;
    }
  }

  generateSun() {
    if (sun.sunExists) {
      let sun1 = new Sun();

      this.planetsArray.push(sun1);
      sun.sunExists = false;
    }
  }

  removePlanets() {
    this.planetsArray.forEach((planet, index) => {
      if (planet.y > canvasHeight - 40) {
        this.planetsArray.splice(index, 1);
      }
    })
  }

  movePlanets() {
    this.planetsArray.forEach(function(planet) {
      planet.move();
    })
  }

  calculateScore() {
    if (this.ufo.planetCollision) {
      this.upArrowPressed = true;
      this.planetsBounceDown();
      this.score += this.scoreIncrement;
      this.scoreIncrement += 10;
      this.ufo.planetCollision = false;
    } else if (this.ufo.refuelCollision) {
      this.score *= 2;
      this.ufo.refuelCollision = false;
      this.planetsBounceDown();
    } else if ( this.ufo.sunCollision) {
      this.planetsBounceDown();
      this.score -= this.scoreIncrement;
      this.ufo.sunCollision = false;
    }
  }

  planetsBounceDown() {
    this.planetsArray.forEach( planet => {
      planet.oppositeBounce(this.ufo);
    })
  }

}

module.exports = Game;