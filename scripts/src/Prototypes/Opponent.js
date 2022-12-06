/** Counter to keep track of opponent ids. */
let COUNTER = 0;
/** The part of the DOM where we add opponents. */
let FIELD = document.querySelector("#opponent_field");

/** Public constructor for Opponent objects. */
function Opponent(position) {
  //set health to starting value 10
  this.health = 10;
  COUNTER++;
  this.id = COUNTER;
  //store the character's associated tag in an instance variable.
  let url = 'https://poly.google.com/view/5v5j_lqOHTO';
  this.tag = `<a-entity follow='speed: 1; target:#player' class='opponent' 
  id='opponent${this.id}' static-body gblock='${url}' position='${position}' 
  scale='0.3 0.3 0.3'></a-entity>`;
}

/** Executes when the opponent gets hit by a snowball. 
  * @param e {event} the handler for collisions with the opponent
  */
Opponent.prototype.damage = function(e) {
  console.log('hit');
  let healthBar = document.querySelector('#content');
  this.health--;
  if (this.health >= 1) {
    healthBar.innerHTML = `<h3>Opponent Health: ${this.health}</h3>`;
  } else {
    healthBar.innerHTML = `<h3>Opponent Defeated</h3>`;
    this.deactivate();
  }
};

/** Appends the opponent to the DOM. */
Opponent.prototype.appear = function() {
  //make opponent appear on the DOM
  FIELD.innerHTML += this.tag;
};

/** Ends a defeated Opponent's movement and danger. */
Opponent.prototype.deactivate = function() {
  let htmlObject = document.querySelector(`#opponent${this.id}`);
  htmlObject.removeAttribute('follow');
}