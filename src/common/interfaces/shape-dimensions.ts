export declare interface Dimensions
  extends RectangleDimensions,
    SquareDimensions,
    CircleDimensions,
    TriangleDimensions {}

export declare interface RectangleDimensions {
  length: number;
  breadth: number;
}

export declare interface SquareDimensions {
  side: number;
}

export declare interface CircleDimensions {
  radius: number;
}

export declare interface TriangleDimensions {
  length_a: number;
  length_b: number;
  length_c: number;
}
