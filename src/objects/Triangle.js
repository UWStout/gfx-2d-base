// Import the Shape and Point objects
import Shape from './Shape'
import Point from './Point'

// TODO: Import the Line object so you can use 'bresenham()'

// Import the setPixel funciton for rasterizing
import { setPixel } from '../main'

// Import the transformPoint function from matrix_math
import { transformPoint } from '../matrix_math'

// Import ArrayBuffer object from the nanogl library
import ArrayBuffer from 'nanogl/arraybuffer'

/** @class A drawable 2D triangle */
class Triangle extends Shape {
  /**
   * Create a new Triangle shape object
   * @param {gl} WebGLRenderingContext The canvas element rendering context
   * @param {newP1} Point object First triangle vertex in global coords
   * @param {newP2} Point object Second triangle vertex in global coords
   * @param {newP3} Point object Third triangle vertex in global coords
   * @param {C} Color object (default Color.WHITE)
   * @param {fill} boolean Is the shape filled or not (default true)
   */
  constructor (gl, newP1, newP2, newP3, color, filled) {
    // Call parent constructor first
    super(color, filled)

    // Increase the global triangle count
    Shape.shapeCount[Shape.SHAPE_TYPE.TRIANGLE]++

    // Update properties inherited from Shape to be specific to triangles
    this._type = Shape.SHAPE_TYPE.TRIANGLE
    this._id = Shape.shapeCount[Shape.SHAPE_TYPE.TRIANGLE]

    // New properties for this type of shape (public)
    this.P1 = newP1
    this.P2 = newP2
    this.P3 = newP3

    // Call updateBuffers() once to initialize them
    this.updateBuffers(gl)
  }

  /**
   * Compute the center of this shape
   * Averages the vertices together
   * @return {Point} The average of the three vertices
   */
  computeCentroid () {
    return new Point(
      (this.P1.x + this.P2.x + this.P3.x) / 3,
      (this.P1.y + this.P2.y + this.P3.y) / 3,
      (this.P1.z + this.P2.z + this.P3.z) / 3
    )
  }

  /**
   * Update the internal WebGL vertex buffers for this triangle
   * Stores the transformed vertices in an ArrayBuffer so they may be used
   * to draw this shape using WebGL.
   * @param {gl} WebGLRenderingContext The canvas element rendering context
   */
  updateBuffers (gl) {
    // Transform the three vertices
    let P1 = transformPoint(this.P1, this.M)
    let P2 = transformPoint(this.P2, this.M)
    let P3 = transformPoint(this.P3, this.M)

    // Pack the vertex information into a single, typed array
    // Note: Z is included even though it should always be 0
    //       This is because WebGL/OpenGL expects it
    this._positions = new Float32Array([
      P1.x, P1.y, P1.z,
      P2.x, P2.y, P2.z,
      P3.x, P3.y, P3.z
    ])

    // Make the WebGL ArayBuffer for this shape (using nanoGL)
    this.buffer = new ArrayBuffer(gl, this._positions)
    this.buffer.attrib('aPosition', 3, gl.FLOAT)
  }

  // TODO: Complete this function to rasterize a triangle.
  // Override parent function to rasterize a triangle. You may
  // not use WebGL functions or any other libraries to draw. All
  // changes to the canvas must happen through the 'setPixel' func.
  rasterize () {
    // Important notes:
    // - Transform and round the vertices first
    // - Feel free to use floating point arithmetic (DDA is recommended)
    // - Take care to hand the filled vs. non-filled cases
    // - Don't forget to pass this.color to setPixel or rasterizeLine calls
    // - Be sure to test your code with all the unusual cases:
    //   > Degenerate triangles (all the same point, all in a line)
    //   > Triangles where sides are perfectly horizontal or vertical
    //     (and combinations of vertical and horizontal)

    // NOTE: These lines are temporary, remove them once you are done.
    setPixel(this.P1, this.color)
    setPixel(this.P2, this.color)
    setPixel(this.P3, this.color)
  }
}

// Expose the Triangle class to other modules for importing
export default Triangle
