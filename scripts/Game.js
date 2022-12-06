/** Scripts to run events for snowball game.
  * Author: KrautGTI
  * Date: 6 August 2018
  */

//Store relevant DOM elements using querySelector()
let ball_frame = document.querySelector('#ball_frame');
let camera = document.querySelector('[camera]').object3D;
let numOpponents = 5;
let opponents = [];
let spawnPoint = new THREE.Vector3(10, 0, 9);

/** Creates the ball element that we append to the DOM
  * in the throwBall() function. 
  * @param {string} velocity, the ball's velocity
  */
function construct_ball(velocity) {
  let position = [];
  position.push(camera.position.x, camera.position.z);
  let snowball = {
    type: 'a-sphere',
    radius: '0.2',
    body: 'dynamic-body',
    position: `${position[0]} 3 ${position[1]}`,
    velocity: velocity
  };
  
  let tag = `<${snowball.type} ${snowball.body} class='snowball' 
  radius='${snowball.radius}' position='${snowball.position}'
  velocity='${snowball.velocity}'></${snowball.type}>`;
  return tag;
}

/** Here we actually append the created ball to the DOM. */
function throwBall() {
  let position = camera.getWorldDirection();
  let velocity = `${position.x * -25} 2 ${position.z * -25}`;
  ball_frame.innerHTML = construct_ball(velocity);
}

/** Throw every time the user clicks. */
window.addEventListener('click', e => {
  throwBall();
});

/** Create players and add to page */
for (let i = 0; i < numOpponents; i++) {
  let location = `${spawnPoint.x} ${spawnPoint.y} ${spawnPoint.z}`;
  let opponent = new Opponent(location);
  opponent.appear();
  opponents.push(opponent);
  spawnPoint.x -= 5;
}

opponents.forEach(o => {
  //console.log(o.html)
  let html = document.querySelector(`#opponent${o.id}`)
  html.addEventListener('collide', e=> {
    if (e.detail.body.el.classList.contains('snowball')
      && o.health > 0) {
      o.damage();
    } else if (e.detail.body.el.classList.contains('player')
      && o.health > 0) {
      alert('game over');
      location.reload();
    }
  })
})