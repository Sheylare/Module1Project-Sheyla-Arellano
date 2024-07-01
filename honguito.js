class Honguito {
  constructor() {
    this.honguito = document.createElement("img");
    this.honguito.src = "./images/honguito_walking.png";
    gameBox.append(this.honguito);

    this.w = 200;
    this.h = 100;
    this.x = 0;
    this.y = 700;

    this.honguito.style.position = "absolute";
    this.honguito.style.width = `${this.w}px`;
    this.honguito.style.height = `${this.h}px`;
    this.honguito.style.top = `${this.y}px`;
    this.honguito.style.left = `${this.x}px`;

    this.movementSpeed = 10;
  }

  movement(posicion) {
    if (posicion === "right") {
      this.x += this.movementSpeed;
      this.honguito.style.left = `${this.x}px`;
    } else if (posicion === "left") {
      this.x -= this.movementSpeed;
      this.honguito.style.left = `${this.x}px`;
    }
  }
}
