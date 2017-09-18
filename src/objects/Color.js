/** @class Object to manage color values as red-green-blue triples */
class Color {
  /**
   * Create a new Color with the given tri-stimulus values
   * @param {R} number The amount of red in this color (between 0 and 1)
   * @param {G} number The amount of green in this color (between 0 and 1)
   * @param {B} number The amount of blue in this color (between 0 and 1)
   */
  constructor (R, G, B) {
    this._c = [0, 0, 0]
    // Note: these lines call the setters below
    this.r = R
    this.g = G
    this.b = B
  }

  /**
   * Pass this color value into a WebGL shader. The color is passed to
   * a uniform vec3 in the shader named 'uColor'
   * @param {shader} program Shader program from the nanogl library
   */
  passToShader (shader) {
    let data = new Float32Array(this._c)
    shader.uColor(data)
  }

  /**
   * These getters provide access to the internal tri-stimulus components
   */
  get r () { return this._c[0] }
  get g () { return this._c[1] }
  get b () { return this._c[2] }

  /**
   * These setters allow you to update the internal tri-stimulus
   * components and guard against out of range values.
   */
  set r (R) {
    if (typeof R === 'number' && R >= 0 && R <= 1) {
      this._c[0] = R
    }
  }
  set g (G) {
    if (typeof G === 'number' && G >= 0 && G <= 1) {
      this._c[1] = G
    }
  }
  set b (B) {
    if (typeof B === 'number' && B >= 0 && B <= 1) {
      this._c[2] = B
    }
  }
}

// Expose the Color class to other files for importing
export default Color

/**
 * Below are a bunch of predefined, constant colors that you
 * cann access any time you are using the Color class
 */

// Standard white, black, primary, and secondary colors
// Note: Pure gree is called lime because 'green' has meaning
//       as part of the SVG colors below.
Color.WHITE = new Color(1.000, 1.000, 1.000)
Color.BLACK = new Color(0.000, 0.000, 0.000)
Color.RED = new Color(1.000, 0.000, 0.000)
Color.LIME = new Color(0.000, 1.000, 0.000)
Color.BLUE = new Color(0.000, 0.000, 1.000)
Color.CYAN = new Color(0.000, 1.000, 1.000)
Color.MAGENTA = new Color(1.000, 0.000, 1.000)
Color.YELLOW = new Color(1.000, 1.000, 0.000)

// Standard named colors as specified in the documentation for
// the SVG data file format. Alphabetical order by name.
Color.ALICEBLUE = new Color(0.941, 0.973, 1.000)
Color.ANTIQUEWHITE = new Color(0.980, 0.922, 0.843)
Color.AQUA = new Color(0.000, 1.000, 1.000)
Color.AQUAMARINE = new Color(0.498, 1.000, 0.831)
Color.AZURE = new Color(0.941, 1.000, 1.000)
Color.BEIGE = new Color(0.961, 0.961, 0.863)
Color.BISQUE = new Color(1.000, 0.894, 0.769)
Color.BLANCHEDALMOND = new Color(1.000, 0.922, 0.804)
Color.BLUEVIOLET = new Color(0.541, 0.169, 0.886)
Color.BROWN = new Color(0.647, 0.165, 0.165)
Color.BURLYWOOD = new Color(0.871, 0.722, 0.529)
Color.CADETBLUE = new Color(0.373, 0.620, 0.627)
Color.CHARTREUSE = new Color(0.498, 1.000, 0.000)
Color.CHOCOLATE = new Color(0.824, 0.412, 0.118)
Color.CORAL = new Color(1.000, 0.498, 0.314)
Color.CORNFLOWERBLUE = new Color(0.392, 0.584, 0.929)
Color.CORNSILK = new Color(1.000, 0.973, 0.863)
Color.CRIMSON = new Color(0.863, 0.078, 0.235)
Color.DARKBLUE = new Color(0.000, 0.000, 0.545)
Color.DARKCYAN = new Color(0.000, 0.545, 0.545)
Color.DARKGOLDENROD = new Color(0.722, 0.525, 0.043)
Color.DARKGRAY = new Color(0.663, 0.663, 0.663)
Color.DARKGREEN = new Color(0.000, 0.392, 0.000)
Color.DARKGREY = new Color(0.663, 0.663, 0.663)
Color.DARKKHAKI = new Color(0.741, 0.718, 0.420)
Color.DARKMAGENTA = new Color(0.545, 0.000, 0.545)
Color.DARKOLIVEGREEN = new Color(0.333, 0.420, 0.184)
Color.DARKORANGE = new Color(1.000, 0.549, 0.000)
Color.DARKORCHID = new Color(0.600, 0.196, 0.800)
Color.DARKRED = new Color(0.545, 0.000, 0.000)
Color.DARKSALMON = new Color(0.914, 0.588, 0.478)
Color.DARKSEAGREEN = new Color(0.561, 0.737, 0.561)
Color.DARKSLATEBLUE = new Color(0.282, 0.239, 0.545)
Color.DARKSLATEGRAY = new Color(0.184, 0.310, 0.310)
Color.DARKSLATEGREY = new Color(0.184, 0.310, 0.310)
Color.DARKTURQUOISE = new Color(0.000, 0.808, 0.820)
Color.DARKVIOLET = new Color(0.580, 0.000, 0.827)
Color.DEEPPINK = new Color(1.000, 0.078, 0.576)
Color.DEEPSKYBLUE = new Color(0.000, 0.749, 1.000)
Color.DIMGRAY = new Color(0.412, 0.412, 0.412)
Color.DIMGREY = new Color(0.412, 0.412, 0.412)
Color.DODGERBLUE = new Color(0.118, 0.565, 1.000)
Color.FIREBRICK = new Color(0.698, 0.133, 0.133)
Color.FLORALWHITE = new Color(1.000, 0.980, 0.941)
Color.FORESTGREEN = new Color(0.133, 0.545, 0.133)
Color.FUCHSIA = new Color(1.000, 0.000, 1.000)
Color.GAINSBORO = new Color(0.863, 0.863, 0.863)
Color.GHOSTWHITE = new Color(0.973, 0.973, 1.000)
Color.GOLD = new Color(1.000, 0.843, 0.000)
Color.GOLDENROD = new Color(0.855, 0.647, 0.125)
Color.GRAY = new Color(0.502, 0.502, 0.502)
Color.GREEN = new Color(0.000, 0.502, 0.000)
Color.GREENYELLOW = new Color(0.678, 1.000, 0.184)
Color.GREY = new Color(0.502, 0.502, 0.502)
Color.HONEYDEW = new Color(0.941, 1.000, 0.941)
Color.HOTPINK = new Color(1.000, 0.412, 0.706)
Color.INDIANRED = new Color(0.804, 0.361, 0.361)
Color.INDIGO = new Color(0.294, 0.000, 0.510)
Color.IVORY = new Color(1.000, 1.000, 0.941)
Color.KHAKI = new Color(0.941, 0.902, 0.549)
Color.LAVENDER = new Color(0.902, 0.902, 0.980)
Color.LAVENDERBLUSH = new Color(1.000, 0.941, 0.961)
Color.LAWNGREEN = new Color(0.486, 0.988, 0.000)
Color.LEMONCHIFFON = new Color(1.000, 0.980, 0.804)
Color.LIGHTBLUE = new Color(0.678, 0.847, 0.902)
Color.LIGHTCORAL = new Color(0.941, 0.502, 0.502)
Color.LIGHTCYAN = new Color(0.878, 1.000, 1.000)
Color.LIGHTGOLDENRODYELLOW = new Color(0.980, 0.980, 0.824)
Color.LIGHTGRAY = new Color(0.827, 0.827, 0.827)
Color.LIGHTGREEN = new Color(0.565, 0.933, 0.565)
Color.LIGHTGREY = new Color(0.827, 0.827, 0.827)
Color.LIGHTPINK = new Color(1.000, 0.714, 0.757)
Color.LIGHTSALMON = new Color(1.000, 0.627, 0.478)
Color.LIGHTSEAGREEN = new Color(0.125, 0.698, 0.667)
Color.LIGHTSKYBLUE = new Color(0.529, 0.808, 0.980)
Color.LIGHTSLATEGRAY = new Color(0.467, 0.533, 0.600)
Color.LIGHTSLATEGREY = new Color(0.467, 0.533, 0.600)
Color.LIGHTSTEELBLUE = new Color(0.690, 0.769, 0.871)
Color.LIGHTYELLOW = new Color(1.000, 1.000, 0.878)
Color.LIMEGREEN = new Color(0.196, 0.804, 0.196)
Color.LINEN = new Color(0.980, 0.941, 0.902)
Color.MAROON = new Color(0.502, 0.000, 0.000)
Color.MEDIUMAQUAMARINE = new Color(0.400, 0.804, 0.667)
Color.MEDIUMBLUE = new Color(0.000, 0.000, 0.804)
Color.MEDIUMORCHID = new Color(0.729, 0.333, 0.827)
Color.MEDIUMPURPLE = new Color(0.576, 0.439, 0.859)
Color.MEDIUMSEAGREEN = new Color(0.235, 0.702, 0.443)
Color.MEDIUMSLATEBLUE = new Color(0.482, 0.408, 0.933)
Color.MEDIUMSPRINGGREEN = new Color(0.000, 0.980, 0.604)
Color.MEDIUMTURQUOISE = new Color(0.282, 0.820, 0.800)
Color.MEDIUMVIOLETRED = new Color(0.780, 0.082, 0.522)
Color.MIDNIGHTBLUE = new Color(0.098, 0.098, 0.439)
Color.MINTCREAM = new Color(0.961, 1.000, 0.980)
Color.MISTYROSE = new Color(1.000, 0.894, 0.882)
Color.MOCCASIN = new Color(1.000, 0.894, 0.710)
Color.NAVAJOWHITE = new Color(1.000, 0.871, 0.678)
Color.NAVY = new Color(0.000, 0.000, 0.502)
Color.OLDLACE = new Color(0.992, 0.961, 0.902)
Color.OLIVE = new Color(0.502, 0.502, 0.000)
Color.OLIVEDRAB = new Color(0.420, 0.557, 0.137)
Color.ORANGE = new Color(1.000, 0.647, 0.000)
Color.ORANGERED = new Color(1.000, 0.271, 0.000)
Color.ORCHID = new Color(0.855, 0.439, 0.839)
Color.PALEGOLDENROD = new Color(0.933, 0.910, 0.667)
Color.PALEGREEN = new Color(0.596, 0.984, 0.596)
Color.PALETURQUOISE = new Color(0.686, 0.933, 0.933)
Color.PALEVIOLETRED = new Color(0.859, 0.439, 0.576)
Color.PAPAYAWHIP = new Color(1.000, 0.937, 0.835)
Color.PEACHPUFF = new Color(1.000, 0.855, 0.725)
Color.PERU = new Color(0.804, 0.522, 0.247)
Color.PINK = new Color(1.000, 0.753, 0.796)
Color.PLUM = new Color(0.867, 0.627, 0.867)
Color.POWDERBLUE = new Color(0.690, 0.878, 0.902)
Color.PURPLE = new Color(0.502, 0.000, 0.502)
Color.ROSYBROWN = new Color(0.737, 0.561, 0.561)
Color.ROYALBLUE = new Color(0.255, 0.412, 0.882)
Color.SADDLEBROWN = new Color(0.545, 0.271, 0.075)
Color.SALMON = new Color(0.980, 0.502, 0.447)
Color.SANDYBROWN = new Color(0.957, 0.643, 0.376)
Color.SEAGREEN = new Color(0.180, 0.545, 0.341)
Color.SEASHELL = new Color(1.000, 0.961, 0.933)
Color.SIENNA = new Color(0.627, 0.322, 0.176)
Color.SILVER = new Color(0.753, 0.753, 0.753)
Color.SKYBLUE = new Color(0.529, 0.808, 0.922)
Color.SLATEBLUE = new Color(0.416, 0.353, 0.804)
Color.SLATEGRAY = new Color(0.439, 0.502, 0.565)
Color.SLATEGREY = new Color(0.439, 0.502, 0.565)
Color.SNOW = new Color(1.000, 0.980, 0.980)
Color.SPRINGGREEN = new Color(0.000, 1.000, 0.498)
Color.STEELBLUE = new Color(0.275, 0.510, 0.706)
Color.TAN = new Color(0.824, 0.706, 0.549)
Color.TEAL = new Color(0.000, 0.502, 0.502)
Color.THISTLE = new Color(0.847, 0.749, 0.847)
Color.TOMATO = new Color(1.000, 0.388, 0.278)
Color.TURQUOISE = new Color(0.251, 0.878, 0.816)
Color.VIOLET = new Color(0.933, 0.510, 0.933)
Color.WHEAT = new Color(0.961, 0.871, 0.702)
Color.WHITESMOKE = new Color(0.961, 0.961, 0.961)
Color.YELLOWGREEN = new Color(0.604, 0.804, 0.196)

// Extract the predefined color names and store in an array
// Caution: If you add any other static properties to the Color
//          class this may need to be updated. Presently it works
//          because the predefined colors are the ONLY ones.
Color.predefinedNames = Object.keys(Color)
