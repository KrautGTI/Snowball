AFRAME.registerComponent('follow', {
  schema: {
    target: {type: 'selector'},
    speed: {type: 'number'}
  },

  init: function () {
    this.direction = new THREE.Vector3();
  },

  tick: function(time, td) {
    let targetPosition = this.data.target.object3D.position;
    let currentPosition = this.el.object3D.position;
    
    this.direction.copy(targetPosition).sub(currentPosition);
    let distance = this.direction.length();
    
    if (distance <= 1) {
    }
    
    let factor = this.data.speed / distance;
    ['x', 'y', 'z'].forEach(coordinate => {
      this.direction[coordinate] *= factor * (td / 1000);
    });
  
    
    let newPosition = {
      x: currentPosition.x + this.direction.x, 
      z: currentPosition.z + this.direction.z
    };
    
    this.el.setAttribute('position', newPosition);
  }
});