// Import the Shape and Point objects
import Shape from './Shape'
import Point from './Point'

// TODO: Import the transformPoint function from matrix_math
//       This is needed inside the updateBuffers() function

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
}

// Expose the Line class to other modules for importing
export default Line
