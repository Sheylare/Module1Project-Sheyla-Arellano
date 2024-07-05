class Honguito {
  constructor() {
    this.node = document.createElement("img");
    this.node.src = "./images/mushroom_walking_1.png";
    gameBox.append(this.node);

    this.w = 100;
    this.h = 100;
    this.x = 0;
    this.y = 670;

    this.node.style.position = "absolute";
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.movementSpeed = 22;
    this.imageNumber = 1;
    this.vida = 3;
  }

  movement(posicion) {
    if (posicion === "right" && this.x + this.w <= gameBox.offsetWidth) {
      this.x += this.movementSpeed;
      this.node.style.left = `${this.x}px`;
    } else if (posicion === "left" && this.x >= 0) {
      this.x -= this.movementSpeed;
      this.node.style.left = `${this.x}px`;
    }
  }

  changeImage() {
    if (this.imageNumber === 1) {
      this.imageNumber = 2;
      this.node.src = "./images/mushroom_walking_2.png";
    } else if (this.imageNumber === 2) {
      this.imageNumber = 3;
      this.node.src = "./images/mushroom_walking_3.png";
    } else if (this.imageNumber === 3) {
      this.imageNumber = 4;
      this.node.src = "./images/mushroom_walking_4.png";
    } else if (this.imageNumber === 4) {
      this.imageNumber = 1;
      this.node.src = "./images/mushroom_walking_1.png";
    }
  }
}
