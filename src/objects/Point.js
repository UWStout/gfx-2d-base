/** @class Object to manage points in space (in 2d or 3d) */
class Point {
  /**
   * Create a new Point with the given coordinates
   * @param {X} number The value of the X-dimension for this point
   * @param {Y} number The value of the Y-dimension for this point
   * @param {Z} number The value of the Z-dimension (optional, defaults to 0)
   */
  constructor (X, Y, Z) {
    // Note: these lines call the x y z setters below
    this.x = X
    this.y = Y
    this.z = ((typeof Z !== 'undefined') ? Z : 0)
  }

  /**
   * These getters provide read access to the internal _x, _y, _z components
   */
  get x () { return this._x }
  get y () { return this._y }
  get z () { return this._z }

  /**
   * These setters provide write access to the internal _x, _y, _z components.
   * They guard against assigning non-number values.
   */
  set x (X) {
    if (typeof X === 'number') {
      this._x = X
    }
  }
  set y (Y) {
    if (typeof Y === 'number') {
      this._y = Y
    }
  }
  set z (Z) {
    if (typeof Z === 'number') {
      this._z = Z
    }
  }
}

// Predefined object for the point (0, 0).
// Note, this is a static member of the Point class.
Point.ORIGIN = new Point(0, 0)

// Expose the Point class to other modules for importing
export default Point
