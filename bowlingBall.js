AFRAME.registerComponent("bowl", {
    init: function () {
      this.throwBall();
    },
    throwBall: function () {

      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
            var bowl = document.createElement("a-entity");
            bowl.setAttribute("geometry", {primitive: "sphere",radius: 0.85,});
            bowl.setAttribute("material", "color", "black");
            bowl.setAttribute("dynamic-body" , {shape:"sphere" , mass: 0} )

            var cam = document.querySelector("#camera");
            pos = cam.getAttribute("position");
            bowl.setAttribute("position", {x: pos.x,y: pos.y,z: (pos.z ),});

            var camera = document.querySelector("#camera").object3D;
            //get the camera direction as Three.js Vector
            var direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
            //set the velocity and it's direction
            bowl.setAttribute("velocity", direction.multiplyScalar(-10));

            var scene = document.querySelector("#scene");
            bowl.addEventListener("collide" , this.removeBowl)
            scene.appendChild(bowl);
        }
      });
    },
    removeBowl:function(e){
        
        var element = e.detail.target.el
        var hitElement  = e.detail.body.el
        if(hitElement.id.includes("pin")){
            hitElement.setAttribute("material" , {opacity:1 })
            var impulse = new CANNON.Vec3(0 , 1 , -15)
            var worldPoint = new CANNON.Vec3().copy(hitElement.getAttribute("position"))
            hitElement.body.applyImpulse(impulse , worldPoint)

            element.removeEventListener("collide" , this.throwBall)
            var scene = document.querySelector("#scene")
            scene.removeChild(element)
        }
    },

  });
  
  
  