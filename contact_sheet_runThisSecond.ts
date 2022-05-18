let sourceDoc = app.activeDocument;

//folder names
let nameByDimensions = "sorted-by-dimensions";
let nameByIcon = "sorted-by-icon";
let nameByColor = "sorted-by-color";
let name300x300 = "300x300";
let name512x512 = "512x512";
let name64x64 = "64x64";
let name48x48 = "48x48";
let name32x32 = "32x32";
let name24x24 = "24x24";
let nameSVG = "SVG";
let nameEPS = "EPS";
// target icons for main loop
let myIconsLayer = sourceDoc.layers["icons"];
let myIconsSublayers = myIconsLayer.layers;

// target icons for main loop
let myColorsLayer = sourceDoc.layers["colors"];
let myColorsSublayers = myColorsLayer.layers;
let guideLayer = sourceDoc.layers["Guides (DO NOT MOVE)"];


let userInteractionLevel;
let originalInteractionLevel = userInteractionLevel;
userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

let LANG = {
  CHOOSE_FOLDER: "Please choose your Folder of files to place...",
  NO_SELECTION: "No selection",
  LABEL_SETTINGS: "Contact Sheet Settings",
  LABEL_PG_WIDTH: "Page Width:",
  LABEL_PG_HEIGHT: "Page Height:",
  LABEL_COL_COUNT: "Column Count:",
  LABEL_ROW_COUNT: "Row Count:",
  LABEL_SCALE: "Scale:",
  LABEL_FILE_NAME: "File Name:",
  LABEL_LOGGING: "Logging?",
  BUTTON_CANCEL: "Cancel",
  BUTTON_OK: "Ok",
  DOES_NOT_EXIST: " does not exist",
  LAYER_NOT_CREATED: "Could not create layer. "
}

let CONFIG = {
  ROW_HEIGHT: 0,
  PG_COUNT: 0,
  NUM_COLS: 0,
  NUM_ROWS: 0,
  /**
   * Number of rows
   */

  ROWS: 80,

  /**
   * Number of columns
   */

  COLS: 10,

  /**
   * Top & bottom page margins 
   */

  VOFF: 64,

  /**
   * Left & Right page margins
   */

  HOFF: 64,

  /**
   * Row height. This is set programmatically.
   */

  ROW_WIDTH: 256,

  /**
   * Column Height. This is set programmatically.
   */

  COL_WIDTH: 256,

  /**
   * @deprecated
   */
  FRM_WIDTH: 128,

  /**
   * @deprecated
   */
  FRM_HEIGHT: 128,

  /**
   * Artboard width
   * 
   * 10 columns 128 px wide, with 64 px page margins
   */

  PG_WIDTH: 1408,

  /**
   * Artboard height
   *
   * 20 rows 128 px tall, with 64 px page margins
   */

  PG_HEIGHT: 10480,

  /**
   * Not yet fully-implemented. Will support multiple units
   */

  PG_UNITS: "px",

  /**
   * @deprecated
   */

  GUTTER: 0,

  /**
   * Enter scale in percentage 1-100
   */

  SCALE: 30,

  /**
   * Illustrator version compatibility
   */

  AIFORMAT: Compatibility.ILLUSTRATOR10,

  /**
   * If the icon is larger than the cell size, shrink it to the cell size
   */

  SHRINK_TO_FIT: true,

  /**
   * Start folder for selection
   */

  START_FOLDER: sourceDoc.path,

  /**
   * The contact sheet file name
   */

  FILENAME: "contact-sheet",

  /**
   * Enable logging?
   */

  LOGGING: true,

  /**
   * Log file location
   */

  LOG_FILE_PATH: sourceDoc.path + "/ai-contactsheet-log.txt",

  /**
   * Verbose logging output?
   */
  DEBUG: true,

  /**
   * @deprecated
   */

  SKIP_COLS: 0,

  /**
   * Not fully-implemented
   */

  STRIP: ["svg", "ai", "eps", "txt", "pdf"]
}

/**
 * Displays the settings dialog
 *
 * Inputs:
 *    - skip columns
 *    - page width
 *    - page height
 *    - cell width
 *    - cell height
 *    - scale
 *    - logging enabled
 *    
 *    - number of cols        = divide page width by cell width
 *    - number of rows        = divide page height by cell height
 *    - side margins          = (page width - (col count * col width))/2
 *    - top/bottom margins    = (page height - (row count * row width))/2
 *
 * @return Settings object
 */

function doDisplayDialog() {

  let dialog = new Window("dialog", LANG.LABEL_SETTINGS, [550, 350, 900, 700] as Bounds) as any;
  let response = false;

  try {
    dialog.pageWidthLabel = dialog.add("statictext", [32, 30, 132, 60], LANG.LABEL_PG_WIDTH);
    dialog.pageWidth = dialog.add("edittext", [150, 30, 200, 60], CONFIG.PG_WIDTH);
    dialog.pageWidth.active = true;

    dialog.pageHeight = dialog.add("edittext", [150, 70, 200, 100], CONFIG.PG_HEIGHT);
    dialog.pageHeight.active = true;

    dialog.colsLabel = dialog.add("statictext", [32, 110, 132, 140], LANG.LABEL_COL_COUNT);
    dialog.cols = dialog.add("edittext", [150, 110, 200, 140], CONFIG.COLS);
    dialog.cols.active = true;

    dialog.rowsLabel = dialog.add("statictext", [32, 150, 132, 180], LANG.LABEL_ROW_COUNT);
    dialog.rows = dialog.add("edittext", [150, 150, 200, 180], CONFIG.ROWS);
    dialog.rows.active = true;

    dialog.scaleLabel = dialog.add("statictext", [32, 190, 132, 220], LANG.LABEL_SCALE);
    dialog.scale = dialog.add("edittext", [150, 190, 200, 220], CONFIG.SCALE);
    dialog.scale.active = true;

    dialog.filenameLabel = dialog.add("statictext", [32, 230, 132, 260], LANG.LABEL_FILE_NAME);
    dialog.filename = dialog.add("edittext", [150, 230, 320, 260], CONFIG.FILENAME);
    dialog.filename.active = true;

    dialog.logging = dialog.add('checkbox', [32, 270, 132, 340], LANG.LABEL_LOGGING);
    dialog.logging.value = CONFIG.LOGGING;

    dialog.cancelBtn = dialog.add("button", [80, 300, 170, 330], LANG.BUTTON_CANCEL, { name: "cancel" });
    dialog.openBtn = dialog.add("button", [180, 300, 270, 330], LANG.BUTTON_OK, { name: "ok" });

    dialog.cancelBtn.onClick = function () {
      dialog.close();
      response = false;
      return false;
    };

    dialog.openBtn.onClick = function () {

      CONFIG.PG_WIDTH = parseInt(dialog.pageWidth.text);
      CONFIG.PG_HEIGHT = parseInt(dialog.pageHeight.text);
      CONFIG.LOGGING = dialog.logging.value;
      CONFIG.SCALE = parseInt(dialog.scale.text);

      CONFIG.COLS = parseInt(dialog.cols.text);
      CONFIG.ROWS = parseInt(dialog.rows.text);

      CONFIG.COL_WIDTH = parseInt((CONFIG.PG_WIDTH - (CONFIG.HOFF * 2)) / CONFIG.COLS);
      CONFIG.ROW_HEIGHT = parseInt((CONFIG.PG_HEIGHT - (CONFIG.VOFF * 2)) / CONFIG.ROWS);
      CONFIG.FRM_WIDTH = CONFIG.COL_WIDTH;
      CONFIG.FRM_HEIGHT = CONFIG.ROW_HEIGHT;

      if (CONFIG.DEBUG) {
        logger("CONFIG.PG_WIDTH: " + CONFIG.PG_WIDTH);
        logger("CONFIG.PG_HEIGHT: " + CONFIG.PG_HEIGHT);
        logger("CONFIG.FRM_WIDTH: " + CONFIG.FRM_WIDTH);
        logger("CONFIG.FRM_HEIGHT: " + CONFIG.FRM_HEIGHT);
        logger("CONFIG.COL_WIDTH: " + CONFIG.COL_WIDTH);
        logger("CONFIG.ROW_HEIGHT: " + CONFIG.ROW_HEIGHT);
        logger("CONFIG.SCALE: " + CONFIG.SCALE);
        logger("CONFIG.ROWS: " + CONFIG.ROWS);
        logger("CONFIG.COLS: " + CONFIG.COLS);
        logger("CONFIG.VOFF: " + CONFIG.VOFF);
        logger("CONFIG.HOFF: " + CONFIG.HOFF);
      }

      dialog.close();
      response = true;
      return true;
    };
    dialog.show();
  } catch (ex) {
    logger(ex);
    alert(ex);
  }
  return response;
}

/**
 * Utility function to strip the file extension from a user-supplied file name
 * @param <string> filename
 * @return <string> The new file name sans extension
 */
function stripFileExtension(filename) {
  let bits = filename.split(".");
  let bit = bits[bits.length - 1];
  let found = false;
  let ext;
  if (bits.length > 1 && bit) {
    for (ext in CONFIG.STRIP) {
      if (ext.toLowerCase() == bit.toLowerCase()) {
        found = true;
      }
    }
  }
  if (found) bits = bits[bits.length - 1] = "";
  return bits.join(".");
}

/**
 * Main logic to create the contact sheet.
 * @return void
 */
function doCreateContactSheet() {

  let doc, fileList, svgFile,
    svgFilePath, allFiles,
    theFolders, svgFileList, theLayer;

  let saveCompositeFile = false;
  let srcFolder = Folder(`${sourceDoc.path}/${nameByDimensions}/${nameSVG}`);


  if (srcFolder != null) {

    allFiles = srcFolder.getFiles();
    theFolders = [];

    for (let x = 0; x < allFiles.length; x++) {
      if (allFiles[x] instanceof Folder) {
        theFolders.push(allFiles[x]);
      }
    }

    svgFileList = [];
    if (theFolders.length == 0) {
      svgFileList = srcFolder.getFiles(/\.svg$/i);
    } else {
      for (let x = 0; x < theFolders.length; x++) {
        // Gets just the SVG files...  
        fileList = theFolders[x].getFiles(/\.svg$/i);
        for (let n = 0; n < fileList.length; n++) {
          svgFileList.push(fileList[n]);
        }
      }
    }

    if (svgFileList.length > 0) {

      if (!doDisplayDialog()) {
        return;
      }

      if (CONFIG.FILENAME.replace(" ", "") == "") {
        CONFIG.FILENAME = srcFolder.name.replace(" ", "-") + "-all";
      }
      // CONFIG.FILENAME = stripFileExtension(CONFIG.FILENAME);

      app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;

      doc = app.documents.add(
        DocumentColorSpace.RGB,
        CONFIG.PG_WIDTH,
        CONFIG.PG_HEIGHT,
        CONFIG.PG_COUNT = Math.ceil(svgFileList.length / (CONFIG.ROWS * CONFIG.COLS)),
        DocumentArtboardLayout.GridByCol,
        CONFIG.GUTTER,
        Math.round(Math.sqrt(Math.ceil(svgFileList.length / (CONFIG.ROWS * CONFIG.COLS))))
      );

      for (let i = 0; i < svgFileList.length; i++) {
        let myX2;
        let myY1;
        let myY2;
        let myX1;
        let y1;
        let x2;
        let y2;
        let board;
        let bounds;
        let x1 = y1 = x2 = y2 = 0;
        let boardWidth
        let myRowHeight = CONFIG.ROW_HEIGHT + CONFIG.GUTTER;
        let myColumnWidth = CONFIG.COL_WIDTH + CONFIG.GUTTER
        let myFrameWidth = CONFIG.FRM_WIDTH
        let myFrameHeight = CONFIG.FRM_HEIGHT

        for (let pageCounter = CONFIG.PG_COUNT - 1; pageCounter >= 0; pageCounter--) {

          doc.artboards.setActiveArtboardIndex(pageCounter);
          board = doc.artboards[pageCounter];
          bounds = board.artboardRect;
          boardWidth = Math.round(bounds[2] - bounds[0]);

          // loop through rows

          let rowCount = Math.ceil((svgFileList.length / CONFIG.COLS));

          rowCount = CONFIG.ROWS > rowCount ? rowCount : CONFIG.ROWS;

          // If we are skipping a column, chances are we need to 
          // add a new row for the overflow of the shift. Even if there 
          // is not a new row needed, there are no consequences for 
          // adding one, so just in case.

          if (CONFIG.SKIP_COLS > 0) {
            rowCount++;
          }

          for (let rowCounter = 1; rowCounter <= rowCount; rowCounter++) {

            myY1 = bounds[1] + CONFIG.VOFF + (myRowHeight * (rowCounter - 1));
            myY2 = myY1 + CONFIG.FRM_HEIGHT;

            // loop through columns

            let colCount = CONFIG.COLS;

            if (rowCounter > 1) {

              let remaining = Math.ceil(svgFileList.length - i);
              if (remaining < colCount) {
                colCount = remaining;
              }
            }

            for (let columnCounter = 1; columnCounter <= colCount; columnCounter++) {
              try {

                // A hack to allow merging multiple contact sheets 
                // Shift the starting row so it aligns nicely with 
                // the icons already in the master contact sheet.

                if (CONFIG.SKIP_COLS > 0 && rowCounter == 1 && columnCounter <= CONFIG.SKIP_COLS) {
                  continue;
                }

                let f = new File(svgFileList[i]);

                if (f.exists) {

                  try {
                    if (i == 0) {
                      theLayer = doc.layers[0];
                    } else {
                      theLayer = doc.layers.add();
                    }

                    theLayer.name = f.name;
                  } catch (ex) {
                    logger(LANG.LAYER_NOT_CREATED + ex);
                  }
                  svgFile = doc.groupItems.createFromFile(f);

                  let liveWidth = (CONFIG.COLS * (CONFIG.FRM_WIDTH + CONFIG.GUTTER)) - CONFIG.GUTTER;
                  let hoff = Math.ceil((CONFIG.PG_WIDTH - liveWidth) / 2);

                  myX1 = bounds[0] + hoff + (myColumnWidth * (columnCounter - 1));
                  myX2 = myX1 + CONFIG.FRM_HEIGHT;

                  let shiftX = Math.ceil((CONFIG.FRM_WIDTH - svgFile.width) / 2);
                  let shiftY = Math.ceil((CONFIG.FRM_WIDTH - svgFile.height) / 2);

                  x1 = myX1 + shiftX;
                  y1 = (myY1 + shiftY) * -1;

                  try {
                    svgFile.position = [x1, y1];

                    if (typeof (svgFile.resize) == "function") {
                      svgFile.resize(CONFIG.SCALE, CONFIG.SCALE);
                    }

                    // Only save the composite file if at least one 
                    // icon exists and is successfully imported.
                    saveCompositeFile = true;


                  } catch (ex) {
                    try {
                      svgFile.position = [0, 0];
                      logger(ex);
                    } catch (ex) { /*Exit Gracefully*/ }
                  }
                } else {
                  logger(svgFileList[i] + LANG);
                }
              } catch (ex) {
                logger(ex);
                alert(ex);
              }
              i++;
            }
          }
        };
        if (saveCompositeFile)
          saveFileAsAi(sourceDoc.path + "/" + CONFIG.FILENAME);
      }
    };
  };
};

/**
 * Arranges items in the selection on a grid
 * @param <selection> sel    The current selection
 * @return void
 */
function arrangeItems(sel) {
  let y1;
  let rows;
  let board;
  let bounds;
  let itemBounds;
  let cols;
  let cellSize;
  let x1 = y1 = 0;
  let boardWidth, boardHeight;

  let theItem;
  board = sourceDoc.artboards[sourceDoc.artboards.getActiveArtboardIndex()];
  bounds = board.artboardRect;

  boardWidth = Math.round(bounds[2] - bounds[0]);

  cols = CONFIG.NUM_COLS;
  rows = CONFIG.NUM_ROWS;

  x1 = bounds[0] + cellSize;
  y1 = bounds[1] - cellSize;

  for (let i = 0, slen = sel.length; i < slen; i++) {

    theItem = sel[i];

    itemBounds = theItem.visibleBounds;

    theItem.top = y1 - ((cellSize - theItem.height) / 2);
    theItem.left = x1 + ((cellSize - theItem.width) / 2);

    alignToNearestPixel(theItem);

    x1 += cellSize;

    if (i % cols == cols - 1) {
      x1 = bounds[0] + cellSize;
      y1 -= cellSize;
    }
  }

  if (CONFIG.SHRINK_TO_FIT) {

    // The bounds are plotted on a Cartesian Coordinate System.
    // So a 32 x 32 pixel artboard with have the following coords:
    // (assumes the artboard is positioned at 0, 0)
    // x1 = -16, y1 = 16, x2 = 16, y2 = -16

    // board.artboardRect = [x1, y1, x2, y2];

    board.artboardRect = [
      bounds[0],
      bounds[1],
      bounds[0] + ((cols * cellSize) + (2 * cellSize)),
      bounds[1] - (rows * cellSize)
    ];
  }
};

/**
 * Saves the file in AI format.
 * @param <string> The file destination path
 * @return void
 */
function saveFileAsAi(dest) {
  if (app.documents.length > 0) {
    let options = new IllustratorSaveOptions();
    let theDoc = new File(dest);
    // options.compatibility = CONFIG.AIFORMAT;
    // options.flattenOutput = OutputFlattening.PRESERVEAPPEARANCE;
    // options.pdfCompatible = true;
    app.activeDocument.saveAs(theDoc, options);
  }
}

/**
 * Aligns selection to nearest whole pixel
 * @param <selection> sel The selection object
 * @return void
 */
function alignToNearestPixel2(sel) {
  try {
    if (typeof sel != "object") {

      logger(LANG.NO_SELECTION);
    } else {
      let i;
      for (i = 0; i < sel.length; i++) {
        sel[i].left = Math.round(sel[i].left);
        sel[i].top = Math.round(sel[i].top);
      }

    }
  } catch (ex) {
    logger(ex);
  }
}

/**
 * Logging for this script.
 * @param <string> The logging text
 * @return void
 */
function logger(txt) {
  if (CONFIG.LOGGING as any == 0) return;
  let file = new File(CONFIG.LOG_FILE_PATH);
  file.open("e", "TEXT", "????");
  file.seek(0, 2);
  $.os.search(/windows/i) != -1 ? file.lineFeed = 'windows' : file.lineFeed = 'macintosh';
  file.writeln("[" + new Date().toUTCString() + "] " + txt);
  file.close();
}

/**
 * Aligns the item to the nearest pixel for crisp rendering.
 * @param <object> item    The item to align
 * @return void
 */
function alignToNearestPixel(item) {
  if (item.height) {
    item.height = moveToPixel(item.height);
  }
  if (item.width) {
    item.width = moveToPixel(item.width);
  }
  item.top = moveToPixel(item.top);
  item.left = moveToPixel(item.left);
};

/**
 * Adjusts a value to the nearest whole number
 * @param <float> n   The value to adjust
 * @return <int>
 */
function moveToPixel(n) {
  return Math.round(n)
};

doCreateContactSheet();


// Crop to selection with gutters!
var offset = 10 * 2.83465;
sourceDoc.selection = null;
var idx = sourceDoc.artboards.getActiveArtboardIndex();
sourceDoc.selectObjectsOnActiveArtboard();
sourceDoc.fitArtboardToSelectedArt(idx); // does not work for visible bounds of editable fonts
var rect = sourceDoc.artboards[idx].artboardRect;
sourceDoc.artboards[idx].artboardRect = [rect[0] - offset, rect[1] + offset, rect[2] + offset, rect[3] - offset];
sourceDoc.selection = null;
// unselect everything
userInteractionLevel = originalInteractionLevel;
app.activeDocument.save();