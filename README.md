# Game Time - Casey Dallavalle and Melena Suliteanu (FE - Module 2)

Game Time is the first project in Module 2 for Frontend Development at Turing School of Software and Design. 
[Project Specification](http://frontend.turing.io/projects/game-time.html)
[Starter Kit Repository](https://github.com/turingschool-examples/game-time-starter-kit-FEm1) which contains webkit and instructions for setting up testing in mocha. To play the game, visit our live link [here](http://casey-dallavalle-spacehopper.surge.sh/).

## Game Inspiration: Winterbells
The game we replicate is [Winterbells](http://www.ferryhalim.com/orisinal/g3/bells.htm). 

## Our Game: SpaceHopper
In SpaceHopper we iterate on Winterbells with the original functionality as well as some added features. 
The bunny and bells from Winterbells become a ufo and planets. Birds that double points become a refueling station. We also add suns that decrement points but don't trigger a loss when the ufo jumps on them. The original game does not have levels, instead bells slowly get smaller as user progresses through the game. In SpaceHopper we add levels, which make the planets generated smaller based on a score threshold. Bunnies in spacesuits appear on all description screens to tie together the themes of Winterbells and SpaceHopper (and because astronaut bunnies are adorable). 

## Implementation
SpaceHopper is drawn on an HTML5 canvas element with div elements laid over it for start, instruction, and loss screens.
The project is done using jQuery. Each game component has its own class that inherits from a block class. The block class contains methods for movement and drawing as well as base properties such as original x and y generation and velocity. Suns further inherit from the planet class. Each game component also has an associated test file.
The game is coordinated almost entirely from a game class with methods and properties for tracking and changing state. The animation loop and DOM manipulation are contained in an index file that interacts minimally with game to update changes.

### Challenges
Initial organization of inheritance and file structure was a challenge given that we had never tackled a project of this scope before. We refactored multiple times throughout the project to structure the code logically.

This was also the first project where we implemented test driven development. Our biggest challenge with testing was related to structural issues that had DOM manipulation present in our game file. Once we refactored for seperation between game and DOM manipulation testing went much more smoothly.

### Successes
We are very proud of the presentation of the game.

The vertical and horizontal movement of the ufo are very smooth. This took a lot of tinkering and we like where it ended up. Especially how the planet vertical movement mirrors the ufo jump to keep the player roughly in the middle of the screen.

Our semi-random pathway for planet generation went through a lot of iterations to get the desired result. Initially we generated planets in the game loop with random x and y above the canvas: this was a good minimum viable product but left gaps and/or overlap between planets and made the game somewhat difficult to play. We transitioned to a static y generation with semi-random x that was based on the planet generated before to create more of a pathway. The game became playable when we took planet generation out of the game loop entirely and instead put it on a timer. The final iteration generates planets with the semi-random x and static y based on the last planet generated falling past a certain point. 

## Credits
Winterbells is an [Orisinal](http://www.ferryhalim.com/orisinal/) original game.
We take our planet images from [flaticon](https://www.flaticon.com/) and alter some of their colors:

[UFO Artist](https://www.flaticon.com/authors/nikita-golubev)

[Sun Artist](https://www.flaticon.com/authors/vectors-market)

[Saturn, Earth, Mars, and Jupiter Artist](https://www.flaticon.com/authors/freepik)

[Blue Ringed Planet Artist](https://www.flaticon.com/authors/smashicons)

[Space Bunnies Artist](MaikeVierkant.tumblr.com)

## SpaceHopper Screenshots

#### Start Screen (fades out to instruction screen after 1.5 seconds)
![Instruction Screen](https://i.imgur.com/ZfQySAA.png)

#### Instruction Screen
![Instruction Screen](https://i.imgur.com/K7zly4z.png)

#### Level One Action
![Level One](https://i.imgur.com/Cb19SPk.png)

#### Level Two
![Level Two](https://i.imgur.com/zwY3MMM.png)

#### Crash Screen:
![Crash Screen](https://i.imgur.com/9rKwTFi.png)
