class ShootPills {
  constructor(posicionX) {
    this.node = document.createElement("img");
    this.node.src = "./images/pill.png";
    gameBox.append(this.node);

    this.w = 20;
    this.h = 20;
    this.x = posicionX;
    this.y = gameBox.offsetHeight - 100;

    this.node.style.position = "absolute";
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.speed = 5;
  }

  automaticMovement() {
    this.y -= this.speed;
    this.node.style.top = `${this.y}px`;
  }
}
