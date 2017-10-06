// Import the Shape and Point objects
import Shape from './Shape'
import Point from './Point'

// Import the setPixel funciton for rasterizing
import { setPixel } from '../main'

// TODO: Import needed functions from ../matrix_math.js

// Import ArrayBuffer object from the nanogl library
import ArrayBuffer from 'nanogl/arraybuffer'

/** @class A drawable 2D line */
class Line extends Shape {
  /**
   * Create a new Line shape object
   * @param {gl} WebGLRenderingContext The canvas element rendering context
   * @param {newP1} Point object Endpoint of the line in global coords
   * @param {newP2} Point object Other endpoint of the line in global coords
   * @param {C} Color object (default Color.WHITE)
   * @param {fill} boolean Is the shape filled or not (default true)
   */
  constructor (gl, newP1, newP2, color, filled) {
    // Call parent constructor first
    super(color, filled)

    // Increase the global line count
    Shape.shapeCount[Shape.SHAPE_TYPE.LINE]++

    // Update properties inherited from Shape to be specific to lines
    this._type = Shape.SHAPE_TYPE.LINE
    this._id = Shape.shapeCount[Shape.SHAPE_TYPE.LINE]

    // New properties for this type of shape (public)
    this.P1 = newP1
    this.P2 = newP2

    // Call updateBuffers() once to initialize them
    this.updateBuffers(gl)
  }

  /**
   * Compute the center of this shape
   * Computes and returns a reasonable value for the center of the line
   * @return {Point} The center of the line
   */
  computeCentroid () {
    // TODO: Complete this function so it computes a reasonable value
    //       for the center of the line, then return tha value.

    // NOTE: This line is temporary, remove it once you are done.
    return Point.ORIGIN
  }

  /**
   * Update the internal WebGL vertex buffers for this line
   * Stores the transformed endpoints in an ArrayBuffer so they may be used
   * to draw this shape using WebGL.
   * @param {gl} WebGLRenderingContext The canvas element rendering context
   */
  updateBuffers (gl) {
    // TODO: Transform the endpoints of the line by the matrix this.M
    //       and store the result to new variables.  The endpoints are
    //       stored as this.P1 and this.P2.

    // TODO: Pack the transformed endpoints into a Float32Array and store
    //       it in this._positions.
    //
    // Here are some tips:
    //   - Float32Array is a special array object built into JavaScript
    //   - You create a new one by saying 'new Float32Array()'
    //   - Pass a normal JavaScript array with your values to the constructor
    //   - The array should contain the raw components of the endpoints
    //     in order as a single, one-dimensional array
    //   - Be sure to also include a value for the Z-axis even though
    //     we are in 2D, just to make WebGL happy.
    this._positions = new Float32Array([])

    // Make the WebGL ArayBuffer for this shape (using nanoGL)
    this.buffer = new ArrayBuffer(gl, this._positions)
    this.buffer.attrib('aPosition', 3, gl.FLOAT)
  }

  // Override parent function to rasterize a line
  rasterize () {
    // TODO: Complete this function to do the following
    // - Transform and round the endpoints
    // - Call Line.bresenham (defined below) with the ROUNDED points

    // NOTE: This line is temporary. It should be different in the
    // final version of this function.
    Line.bresenham(this.P1, this.P2, this.color)
  }
}

// TODO: Complete this function as Bresenham's Line algorithm
// Rasterize a general line using Bresenham's algorithm. You may
// not use WebGL functions or any other libraries to draw. All
// changes to the canvas must happen through the 'setPixel' func.
Line.bresenham = function (P1, P2, color) {
  // Important notes:
  // - Do NOT transform or round P1 and P2 (this has already happened)
  // - Handle perfectly horiz and vert lines as special cases
  //   > Use Shape.rasterizeHLine or Shape.rasterizeVLine
  //   > You will need to import these functions to use them
  // - For all remaining lines use Bresenham's algorithm
  // - You must use integer arithmetic EVERYWHERE
  // - You can only use integer addition inside the loop
  // - All types of lines (e.g. all slopes) must be handled

  // NOTE: These two lines are temporary. Remove them in the final
  // version of this function.
  setPixel(P1, color)
  setPixel(P2, color)
}

// Expose the Line class to other modules for importing
export default Line
