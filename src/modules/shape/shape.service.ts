import Shape from "./shape.model";
import { CrudService } from "../../common/services/crud.service";
import {
  Circle,
  Rectangle,
  Square,
  Triangle
} from "../../common/classes/shapes";
import { shapes } from "../../common/constants/shapes.contants";
import { Dimensions } from "../../common/interfaces/shape-dimensions";

class ShapeService extends CrudService {
  public model = Shape;
  public modelName = "Shape";

  public calculateArea(shape: string, dimensions: Dimensions): number | null {
    let area;

    switch (shape) {
      case shapes.TRIANGLE:
        const { length_a, length_b, length_c } = dimensions;
        area = new Triangle(length_a, length_b, length_c).getArea();
        break;

      case shapes.CIRCLE:
        const { radius } = dimensions;
        area = new Circle(radius).getArea();
        break;

      case shapes.RECTANGLE:
        const { length, breadth } = dimensions;
        area = new Rectangle(length, breadth).getArea();
        break;

      case shapes.SQUARE:
        const { side } = dimensions;
        area = new Square(side).getArea();
        break;
    }
    return area;
  }

  public async storeShapes(
    shape: string,
    area: number,
    uid: number
  ): Promise<Shape> {
    return await Shape.create({
      shape,
      area,
      uid
    });
  }
}

export default new ShapeService();
