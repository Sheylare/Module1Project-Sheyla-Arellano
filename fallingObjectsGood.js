class FallingObjGood {
  constructor( positionX, type) {
    this.node = document.createElement("img");
    if (type === "beer") {
      this.node.src = "./images/beer.png";
    } else if(type === "wine"){
        this.node.src = "./images/wine.png";
    }

    gameBox.append(this.node);

    this.x = positionX;
    this.y = 0
    this.w = 60;
    this.h = 60;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    
    this.speed = 5;

  }

  automaticMovement(){
    this.y += this.speed;
    this.node.style.top = `${this.y}px`;
  }

}
