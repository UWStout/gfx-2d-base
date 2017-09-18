/* globals __DEV__ */

// Import jQuery as the usual '$' variable
import $ from 'jquery'

// Import the Color and Point objects
import Color from './objects/Color'
import Point from './objects/Point'

// Import our three shape objects
import Triangle from './objects/Triangle'
import Line from './objects/Line'
import Circle from './objects/Circle'

// Import the rebuildTransformationMatrix function from matrix_math
// Note: this may produce a warning until you implement this function.
import { rebuildTransformationMatrix } from './matrix_math'

// Define the Interface object as a traditional JavaScript object.
// We don't bother with a class here because there is only ONE
// interface and all of its functions and properties are static.
let Interface = {
  /**
   * Establish all the event listeners needed in the interface.
   * Must be called once after the document is ready.
   */
  initialize: () => {
    // Set event handlers for the scene import/export buttons
    $('#saveImage').mouseover(updateData)

    // Set event handlers for the canvas and select elements
    $('#c').click(onClickCanvas)
    $('#shapeType').change(onTypeChanged)
    $('#shapeSelect').change(onActiveChanged)

    // Set event handlers for all shape property input elements
    $('.shape-prop-control').on('input', updateShapeProperties)
    $('#filled').change(updateShapeProperties)

    // Set event handlers for the shape transformation input elements
    $('.shape-trans-control').on('input', updateShapeTransformation)
    $('#pivotCentroid').change(updateShapeTransformation)

    /* Add all the appropriate options to the predefined colors select box */

    // The initial text let's the user know what this
    // box is for (instead of a label)
    $('#predefColors').append($('<option>', {
      disabled: true,
      text: 'Named Colors:'
    }))

    // A 'divider' select box option
    $('#predefColors').append($('<option>', {
      disabled: true,
      text: '──────────'
    }))

    // All the predefined colors from the Color class
    Color.predefinedNames.forEach((color) => {
      $('#predefColors').append($('<option>', { text: color, value: color }))
      if (color === 'YELLOW') {
        // Throw in a divider just before the SVG colors
        $('#predefColors').append($('<option>', {
          disabled: true,
          text: '──────────'
        }))
      }
    })

    // Set predefined color event handler
    $('#predefColors').change(loadPredefinedColor)

    // Call this once to initialize the scene list box
    updateSceneList()
  },

  // These properties are used to communicate with the main.js module
  scene: null,
  gl: null,
  updateRequested: false
}

// Expose the Interface object for use in other modules
export default Interface

/**
 * Convert the canvas to an image and set it as the HREF for
 * the save image 'button'
 * @param {e} event A jQuery event object
 */
function updateData (e) {
  let dataURL = $('#c')[0].toDataURL()
  $('#saveImage').attr('href', dataURL)
}

// Global array to store locations of previous clicks.  Needs to be
// global so that its state persists between function calls.
let clickList = []

/**
 * Respond to the canvas being clicked. This will transform the mouse
 * coordinates to WebGL viewport coordinates and store the result in
 * the clickList array. If there are enough points in the array to
 * make the currently select object, it does so and adds it to the
 * scene.
 * @param {e} event A jQuery event object
 */
function onClickCanvas (e) {
  // Compute point in pixel coordinates (note the inverted Y value)
  let rect = $('#c')[0].getBoundingClientRect()
  let lastClickPos = new Point(e.clientX - rect.left,
    rect.height - (e.clientY - rect.top))

  if (__DEV__) {
    // Print to the javascript console for debugging/verificaiton
    console.info('click at (' + lastClickPos.x + ',' + lastClickPos.y + ')')
  }

  // Add the point to the list
  clickList.push(lastClickPos)

  // Check if we have enough points to make the current shape
  let shapeAdded = false
  switch ($('#shapeType')[0].selectedIndex) {
    case 0: // Circle
      Interface.scene.push(new Circle(Interface.gl, clickList[0],
        GUIRadius(), GUIColor(), GUIFilled()))
      shapeAdded = true
      break

    case 1: // Line
      if (clickList.length >= 2) {
        Interface.scene.push(new Line(Interface.gl, clickList[0],
          clickList[1], GUIColor(), GUIFilled()))
        shapeAdded = true
      }
      break

    case 2: // Triangle
      if (clickList.length >= 3) {
        Interface.scene.push(new Triangle(Interface.gl, clickList[0],
          clickList[1], clickList[2], GUIColor(), GUIFilled()))
        shapeAdded = true
      }
      break
  }

  // Things to do every time a shape is added
  if (shapeAdded) {
    updateSceneList()
    Interface.updateRequested = true
    clickList = []
  }
}

/**
 * Respond to the selection of a new shape type.
 */
function onTypeChanged () {
  // Clear out old clicks and start fresh
  clickList = []

  // Deselect any scene shape and disable transformation controls
  $('#shapeSelect')[0].selectedIndex = -1
  $('#transformSet').prop('disabled', true)
}

/**
 * Respond to the selection of one of the pre-defined colors.
 */
function loadPredefinedColor () {
  // Get the name of the predefined color
  let colorName = $('#predefColors')[0].value

  // Verify that it is an actual color name
  if (Color.hasOwnProperty(colorName)) {
    // Get the color values and set them in the interface
    let newColor = Color[colorName]
    $('#redColor').val(Math.round(sanitizeValue(newColor.r, 0) * 255.0))
    $('#greenColor').val(Math.round(sanitizeValue(newColor.g, 0) * 255.0))
    $('#blueColor').val(Math.round(sanitizeValue(newColor.b, 0) * 255.0))

    // If a scene shape is currently selected, update its color
    let index = $('#shapeSelect')[0].selectedIndex
    if (index >= 0 && index < Interface.scene.length) {
      let shape = Interface.scene[$('#shapeSelect')[0].selectedIndex]
      shape.color = newColor
      Interface.updateRequested = true
    }
  }
}

/**
 * Respond to the selection of a new shape in the scene
 */
function onActiveChanged () {
  // Check index and retrieve relevant shape
  let index = $('#shapeSelect')[0].selectedIndex
  if (index >= 0 && index < Interface.scene.length) {
    let shape = Interface.scene[$('#shapeSelect')[0].selectedIndex]

    // Copy shape properties into the GUI
    $('#redColor').val(Math.round(sanitizeValue(shape.color.r, 0) * 255.0))
    $('#greenColor').val(Math.round(sanitizeValue(shape.color.g, 0) * 255.0))
    $('#blueColor').val(Math.round(sanitizeValue(shape.color.b, 0) * 255.0))
    $('#radius').val(sanitizeValue(shape.radius, 0))
    $('#filled')[0].checked = sanitizeValue(shape.filled, true)

    // Copy transformation properties into the GUI
    $('#xTranslate').val(sanitizeValue(shape.tx, 0))
    $('#yTranslate').val(sanitizeValue(shape.ty, 0))
    $('#xScale').val(sanitizeValue(shape.sx, 1))
    $('#yScale').val(sanitizeValue(shape.sy, 1))
    $('#rotAngle').val(sanitizeValue(shape.rotAngle, 0))
    $('#pivotCentroid')[0].checked =
      sanitizeValue(shape.rotAroundCenter, true)

    // Enable the transformation controls
    $('#transformSet').prop('disabled', false)
  } else if (index < 0) {
    $('#transformSet').prop('disabled', true)
  }
}

/**
 * Copy the current shape properties (color, filled and radius)
 * in the GUI to the current actively selected shape in the scene.
 */
function updateShapeProperties () {
  // Check index and retrieve relevant shape
  let index = $('#shapeSelect')[0].selectedIndex
  if (index >= 0 && index < Interface.scene.length) {
    let shape = Interface.scene[$('#shapeSelect')[0].selectedIndex]

    // Copy GUI values to shape properties
    shape.color = GUIColor()
    shape.filled = GUIFilled()

    let oldRadius = shape.radius
    shape.radius = GUIRadius()

    // If the radius changed then the shape's buffers need to rebuild
    if (shape.radius !== oldRadius) {
      shape.updateBuffers(Interface.gl)
    }

    // Re-render the scene to show changes
    Interface.updateRequested = true
  }
}

/**
 * Copy the current shape transformation values in the GUI
 * to the current actively selected shape in the scene.
 */
function updateShapeTransformation () {
  // Check index and retrieve relevant shape
  let index = $('#shapeSelect')[0].selectedIndex
  if (index >= 0 && index < Interface.scene.length) {
    let shape = Interface.scene[$('#shapeSelect')[0].selectedIndex]

    // Copy values from all transformation controls
    shape.tx = parseFloat($('#xTranslate').val())
    shape.ty = parseFloat($('#yTranslate').val())
    shape.sx = parseFloat($('#xScale').val())
    shape.sy = parseFloat($('#yScale').val())
    shape.rotAngle = parseFloat($('#rotAngle').val())
    shape.rotAroundCenter = $('#pivotCentroid')[0].checked

    // Rebuild the transformation matrix and buffer
    rebuildTransformationMatrix(shape)
    shape.updateBuffers(Interface.gl)

    // Re-render the scene to show changes
    Interface.updateRequested = true
  }
}

/**
 * Synchronize the list of shapes in the GUI with the shapes array.
 */
function updateSceneList () {
  let select = $('#shapeSelect')[0]
  select.selectedIndex = -1
  for (let i = select.length - 1; i >= 0; i--) {
    select.remove(i)
  }

  if (Interface.scene != null) {
    Interface.scene.forEach((shape, index) => {
      let newOption = document.createElement('option')
      newOption.text = shape.type + ' ' + shape.id
      select.add(newOption)
    })
  }
}

/**
 * Extract and parse out the color values in the GUI.
 */
function GUIColor () {
  return new Color(
    parseFloat($('#redColor').val()) / 255,
    parseFloat($('#greenColor').val()) / 255,
    parseFloat($('#blueColor').val()) / 255
  )
}

/**
 * Extract and parse out the radius value in the GUI.
 */
function GUIRadius () {
  return parseFloat($('#radius').val())
}

/**
 * Extract and parse out the filled value in the GUI.
 */
function GUIFilled () {
  return $('#filled')[0].checked
}

/**
 * check that a value is defined or fall back to a default
 */
function sanitizeValue (value, fallback) {
  return ((typeof value !== 'undefined') ? value : fallback)
}
