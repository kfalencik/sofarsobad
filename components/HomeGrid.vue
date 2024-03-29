<template>
  <div id="hero" class="hero">
    <canvas id="mainstage"></canvas>
    <svg id="weirdFilter">
      <filter id="svgFilter">
        <feTurbulence id="turbulence" type="turbulence" baseFrequency="0.009" numOctaves="10" />
        <feDisplacementMap id="displacement" in="SourceGraphic" scale="140" />
      </filter>
    </svg>

    <div class="hero__title">
      <img src="/medusa.png" alt="So Far So Bad" />
    </div>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      starArray: [],
      starColors: [],
      mouseEngaged: false,
      mousePressed: false,
      speedAmplifier: 30,
      mouseX: null,
      mouseY: null,
      canvas: null,
      context: null,
      calcWidth: null,
      then: null
    }
  },
  mounted: function() {
    this.createStarField();
  },
  methods: {
    createStarField() {
      //create variables and set the canvas stage.
      this.canvas = document.getElementById("mainstage");
      this.context = this.canvas.getContext("2d");
      //calculate the distances of the canvas and the width we use to determine number of stars.
      this.calcWidth = document.getElementById("mainstage").clientWidth / 10;
      this.canvas.width = document.getElementById("mainstage").clientWidth;
      this.canvas.height = document.getElementById("hero").clientHeight;
      //create the stars
      this.initiateStars(this.canvas, this.starArray, this.calcWidth);
      //start the main loop to keep the canvas updates.
      this.main();
    },
    main() {
      const self = this;
      setInterval(function() {
        self.update();
        self.render();
      }, 1000/120);
    },
    update() {
      if (this.speedAmplifier > 1) {
        this.speedAmplifier = this.speedAmplifier - 0.1;
      }
      for (let k = 0; k < this.starArray.length; k++) {
          if (
            //if the stars are close to the edge, change their direction.
            this.starArray[k].y < -1 ||
            this.starArray[k].y > this.canvas.height + 1 ||
            this.starArray[k].x < -1 ||
            this.starArray[k].x > this.canvas.width + 1
          ) {
            let remainder = this.starArray[k].angle % 90;
            this.starArray[k].angle = this.starArray[k].angle + 90 + remainder;
            this.starArray[k].startAngle = this.starArray[k].angle;
          } else {
            this.starArray[k].angle = this.starArray[k].startAngle;
          }
        this.calculateStarMovement(this.starArray[k]);
      }
    },
    render() {
      let distance = 220;
      //clear the canvas.
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //Run through the stars
      for (let i = 0; i < this.starArray.length; i++) {
        //draw the stars individual points
        this.drawSingleStar(this.starArray[i], this.context);
      }
      //double for loop to check each star against all the others.
      for (let k = 0; k < this.starArray.length; k++) {
        for (let u = 0; u < this.starArray.length; u++) {
          if (
            //check the distance between the two points
            this.starArray[k].x >= this.starArray[u].x - distance &&
            this.starArray[k].x <= this.starArray[u].x + distance &&
            this.starArray[k].y >= this.starArray[u].y - distance &&
            this.starArray[k].y <= this.starArray[u].y + distance &&
            // and make sure it's not the same star
            u != k
          ) {
            //if they are within the range set, calculate their distance and draw line with color and opacity matching distance and color difference between them.
            let a = this.starArray[k].x - this.starArray[u].x;
            let b = this.starArray[k].y - this.starArray[u].y;
            //calculate the opacity based on distance.
            let opacity = 1 - 1 / distance * Math.sqrt(a * a + b * b);
            let red = Math.round((this.starArray[k].color.red + this.starArray[u].color.red) / 2);
            let green = Math.round((this.starArray[k].color.green + this.starArray[u].color.green) / 2);
            let blue = Math.round((this.starArray[k].color.blue + this.starArray[u].color.blue) / 2);
            // set color of the line based on the middle value of red, green and blue from the two points.
            this.context.strokeStyle = "rgba(" + red + "," + green + "," + blue + "," + opacity + ")";
            this.context.beginPath();
            this.context.lineWidth = 3;
            this.context.moveTo(this.starArray[k].x, this.starArray[k].y);
            this.context.lineTo(this.starArray[u].x, this.starArray[u].y);
            this.context.stroke();
          }
        }
      }
    },
    calculateStarMovement(target) {
      target.x -= target.speed * Math.sin(target.angle * (Math.PI / 180));
      target.y += target.speed * Math.cos(target.angle * (Math.PI / 180));
    },
    drawSingleStar(star, context) {
      context.fillStyle = "rgba(" + star.color.red + "," + star.color.green + "," + star.color.blue + "," + 0.5 + ")";
      context.beginPath();
      context.arc(star.x, star.y, 5, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    },
    initiateStars(canvas, starArray, calcWidth) {
      let starColor = {
        red: 255,
        green: 255,
        blue: 255
      };
      this.starColors.push(starColor);
      //generate number of star objects with variables based on the calcWidth variable.
      for (let y = 0; y < calcWidth/2; y++) {
        let starAngle = Math.floor(Math.random() * 360) + 0;
        let star = {
          x: Math.floor(Math.random() * canvas.width) + 0,
          y: Math.floor(Math.random() * canvas.height) + 0,
          color: this.starColors[Math.floor(Math.random() * this.starColors.length) + 0],
          angle: starAngle,
          startAngle: starAngle,
          speed: (Math.floor(Math.random() * 12) + 6) / 15
        };
        this.starArray.push(star);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  height: calc(100vh - 82px);
  overflow: hidden;
  margin-bottom: 50px;
  position: relative;
  min-height: 568px;
  background: #000;

  &::after {
    box-shadow: inset 0 0 70px #000000;
    content: '';
    display: block;
    position: absolute;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  @media (max-width: $medium) {
    height: calc(100vh - 100px);

    &::after {
      box-shadow: inset 0 0 150px #000000;
    }
  }

  &__title {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    width: 98%;
    text-align: center;
    transform: translate(-50%, -50%);

    img {
      width: 768px;
      max-width: 90%;
    }
  }
}

#svgFilter {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
}

#mainstage {
  width: 100%;
  height: 150%;
  overflow:hidden;
  margin: 0;
  margin-top: 50px;
  padding: 0px;
  background-color: black;
  filter:blur(5px) url(#svgFilter);
}
</style>