abstract class Shape {
  public abstract getArea(): number;
}

export class Circle extends Shape {
  public constructor(public radius: number) {
    super();
  }

  public getArea(): number {
    return +(Math.PI * this.radius * this.radius).toFixed(2);
  }
}

export class Triangle extends Shape {
  public constructor(
    public length_a: number,
    public length_b: number,
    public length_c: number
  ) {
    super();
  }

  public getArea(): number {
    const s = (this.length_a + this.length_b + this.length_c) / 2;
    return +Math.sqrt(
      s * ((s - this.length_a) * (s - this.length_b) * (s - this.length_c))
    ).toFixed(2);
  }
}

export class Rectangle extends Shape {
  public constructor(public length: number, public breadth: number) {
    super();
  }

  public getArea(): number {
    return +(this.length * this.breadth).toFixed(2);
  }
}

export class Square extends Rectangle {
  public constructor(public square: number) {
    super(square, square);
  }
}
