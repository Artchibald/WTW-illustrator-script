try {
    /**********************************
     ** JUST CONTACT_SHEET
     ***********************************/
    var sourceDoc_1 = app.activeDocument;
    //folder names
    var nameByDimensions_1 = "sorted-by-type";
    var nameByIcon = "sorted-by-icon";
    var nameByColor = "sorted-by-color";
    var name300x300 = "300x300";
    var name512x512 = "512x512";
    var name64x64 = "64x64";
    var name48x48 = "48x48";
    var name32x32 = "32x32";
    var name24x24 = "24x24";
    var nameSVG_1 = "SVG";
    var nameEPS = "EPS";
    // target icons for main loop
    var myIconsLayer = sourceDoc_1.layers["icons"];
    var myIconsSublayers = myIconsLayer.layers;
    // target colors for main loop
    var myColorsLayer = sourceDoc_1.layers["colors"];
    var myColorsSublayers = myColorsLayer.layers;
    var guideLayer = sourceDoc_1.layers["Guides (DO NOT MOVE)"];
    /**********************************
     ** INSTRUCTIONS DIALOG
     ***********************************/
    alert("FULL README: https://github.com/Artchibald/WTW-illustrator-script   \n\nVideo set up tutorial available here: https://youtu.be/9hrQIdJDNxY \n\nTHIS IS JUST THE CONTACT SHEET GENERATOR. \n\nThe main icons .ai template must be open and active. Not the contact-sheet.ai. \n\nYou can only run this script if you have run the other one first, Otherwise it won't work.\n\nWhen the contact sheet is ready to be generated, you can edit the rows and columns in the pop up. If you increase the columns, you should increase the rows, to avoid overlapping icons. The script will look in here: /sorted-by-type/SVG/ and generate the contact sheet from the .svg files saved there. Any issues: archie@archibaldbutler.com.");
    /**********************************
     ** CREATE CONTACT SHEET (2nd part of the script and separate, but relies on the above to work)
     ***********************************/
    var userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
    ;
    var originalInteractionLevel = userInteractionLevel;
    userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
    var LANG_1 = {
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
        LAYER_NOT_CREATED: "Could not create layer. ",
        DOES_NOT_EXIT: "Does not exist"
    };
    var CONFIG_1 = {
        NUM_ROWS: "",
        NUM_COLS: "",
        /**
         * Whether or not to add the file name as text
         * under the imported icons.
         */
        ADD_LABELS: true,
        /**
         * Number of rows
         */
        ROWS: 120,
        /**
         * Number of columns
         */
        COLS: 8,
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
        ROW_WIDTH: 128,
        ROW_HEIGHT: 128,
        /**
         * Column Height. This is set programmatically.
         */
        COL_WIDTH: 128,
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
        PG_HEIGHT: 15360,
        PG_COUNT: 1,
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
        START_FOLDER: sourceDoc_1.path,
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
        LOG_FILE_PATH: sourceDoc_1.path + "/ai-contactsheet-log.txt",
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
    };
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
        var dialog = new Window("dialog", LANG_1.LABEL_SETTINGS, [550, 350, 900, 700]);
        var response = false;
        try {
            dialog.pageWidthLabel = dialog.add("statictext", [32, 30, 132, 60], LANG_1.LABEL_PG_WIDTH);
            dialog.pageWidth = dialog.add("edittext", [150, 30, 200, 60], CONFIG_1.PG_WIDTH);
            dialog.pageWidth.active = true;
            dialog.pageHeightLabel = dialog.add("statictext", [32, 70, 132, 100], LANG_1.LABEL_PG_HEIGHT);
            dialog.pageHeight = dialog.add("edittext", [150, 70, 200, 100], CONFIG_1.PG_HEIGHT);
            dialog.pageHeight.active = true;
            dialog.colsLabel = dialog.add("statictext", [32, 110, 132, 140], LANG_1.LABEL_COL_COUNT);
            dialog.cols = dialog.add("edittext", [150, 110, 200, 140], CONFIG_1.COLS);
            dialog.cols.active = true;
            dialog.rowsLabel = dialog.add("statictext", [32, 150, 132, 180], LANG_1.LABEL_ROW_COUNT);
            dialog.rows = dialog.add("edittext", [150, 150, 200, 180], CONFIG_1.ROWS);
            dialog.rows.active = true;
            dialog.scaleLabel = dialog.add("statictext", [32, 190, 132, 220], LANG_1.LABEL_SCALE);
            dialog.scale = dialog.add("edittext", [150, 190, 200, 220], CONFIG_1.SCALE);
            dialog.scale.active = true;
            dialog.filenameLabel = dialog.add("statictext", [32, 230, 132, 260], LANG_1.LABEL_FILE_NAME);
            dialog.filename = dialog.add("edittext", [150, 230, 320, 260], CONFIG_1.FILENAME);
            dialog.filename.active = true;
            dialog.logging = dialog.add('checkbox', [32, 270, 132, 340], LANG_1.LABEL_LOGGING);
            dialog.logging.value = CONFIG_1.LOGGING;
            dialog.cancelBtn = dialog.add("button", [80, 300, 170, 330], LANG_1.BUTTON_CANCEL, {
                name: "cancel"
            });
            dialog.openBtn = dialog.add("button", [180, 300, 270, 330], LANG_1.BUTTON_OK, {
                name: "ok"
            });
            dialog.cancelBtn.onClick = function () {
                dialog.close();
                response = false;
                return false;
            };
            dialog.openBtn.onClick = function () {
                CONFIG_1.PG_WIDTH = parseInt(dialog.pageWidth.text);
                CONFIG_1.PG_HEIGHT = parseInt(dialog.pageHeight.text);
                CONFIG_1.LOGGING = dialog.logging.value;
                CONFIG_1.SCALE = parseInt(dialog.scale.text);
                CONFIG_1.COLS = parseInt(dialog.cols.text);
                CONFIG_1.ROWS = parseInt(dialog.rows.text);
                CONFIG_1.COL_WIDTH = Math.floor((CONFIG_1.PG_WIDTH - (CONFIG_1.HOFF * 2)) / CONFIG_1.COLS);
                CONFIG_1.ROW_HEIGHT = Math.floor((CONFIG_1.PG_HEIGHT - (CONFIG_1.VOFF * 2)) / CONFIG_1.ROWS);
                CONFIG_1.FRM_WIDTH = CONFIG_1.COL_WIDTH;
                CONFIG_1.FRM_HEIGHT = CONFIG_1.ROW_HEIGHT;
                if (CONFIG_1.DEBUG) {
                    logger("CONFIG.PG_WIDTH: " + CONFIG_1.PG_WIDTH);
                    logger("CONFIG.PG_HEIGHT: " + CONFIG_1.PG_HEIGHT);
                    logger("CONFIG.FRM_WIDTH: " + CONFIG_1.FRM_WIDTH);
                    logger("CONFIG.FRM_HEIGHT: " + CONFIG_1.FRM_HEIGHT);
                    logger("CONFIG.COL_WIDTH: " + CONFIG_1.COL_WIDTH);
                    logger("CONFIG.ROW_HEIGHT: " + CONFIG_1.ROW_HEIGHT);
                    logger("CONFIG.SCALE: " + CONFIG_1.SCALE);
                    logger("CONFIG.ROWS: " + CONFIG_1.ROWS);
                    logger("CONFIG.COLS: " + CONFIG_1.COLS);
                    logger("CONFIG.VOFF: " + CONFIG_1.VOFF);
                    logger("CONFIG.HOFF: " + CONFIG_1.HOFF);
                }
                dialog.close();
                response = true;
                return true;
            };
            dialog.show();
        }
        catch (ex) {
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
        var bits = filename.split(".");
        var bit = bits[bits.length - 1];
        var found = false;
        var ext;
        if (bits.length > 1 && bit) {
            for (ext in CONFIG_1.STRIP) {
                if (ext.toLowerCase() == bit.toLowerCase()) {
                    found = true;
                }
            }
        }
        if (found)
            bits = bits[bits.length - 1] = "";
        return bits.join(".");
    }
    /**
     * Main logic to create the contact sheet.
     * @return void
     */
    function doCreateContactSheet() {
        var doc, fileList, svgFile, svgFilePath, allFiles, theFolders, svgFileList, theLayer;
        var saveCompositeFile = false;
        var srcFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(nameSVG_1));
        if (srcFolder != null) {
            allFiles = srcFolder.getFiles();
            theFolders = [];
            for (var x = 0; x < allFiles.length; x++) {
                if (allFiles[x] instanceof Folder) {
                    theFolders.push(allFiles[x]);
                }
            }
            svgFileList = [];
            if (theFolders.length == 0) {
                svgFileList = srcFolder.getFiles(/\.svg$/i);
            }
            else {
                for (var x = 0; x < theFolders.length; x++) {
                    // Gets just the SVG files...  
                    fileList = theFolders[x].getFiles(/\.svg$/i);
                    for (var n = 0; n < fileList.length; n++) {
                        svgFileList.push(fileList[n]);
                    }
                }
            }
            if (svgFileList.length > 0) {
                if (!doDisplayDialog()) {
                    return;
                }
                if (CONFIG_1.FILENAME.replace(" ", "") == "") {
                    CONFIG_1.FILENAME = srcFolder.name.replace(" ", "-") + "-all";
                }
                // CONFIG.FILENAME = stripFileExtension(CONFIG.FILENAME);
                app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;
                doc = app.documents.add(DocumentColorSpace.RGB, CONFIG_1.PG_WIDTH, CONFIG_1.PG_HEIGHT, CONFIG_1.PG_COUNT = Math.ceil(svgFileList.length / (CONFIG_1.ROWS * CONFIG_1.COLS)), DocumentArtboardLayout.GridByCol, CONFIG_1.GUTTER, Math.round(Math.sqrt(Math.ceil(svgFileList.length / (CONFIG_1.ROWS * CONFIG_1.COLS)))));
                for (var i = 0; i < svgFileList.length; i++) {
                    var y1 = void 0;
                    var y2 = void 0;
                    var x2 = void 0;
                    var board = void 0;
                    var bounds = void 0;
                    var x1 = y1 = x2 = y2 = 0;
                    var myRowHeight = CONFIG_1.ROW_HEIGHT + CONFIG_1.GUTTER;
                    var myColumnWidth = CONFIG_1.COL_WIDTH + CONFIG_1.GUTTER;
                    var myFrameWidth = CONFIG_1.FRM_WIDTH;
                    var myFrameHeight = CONFIG_1.FRM_HEIGHT;
                    for (var pageCounter = CONFIG_1.PG_COUNT - 1; pageCounter >= 0; pageCounter--) {
                        var boardWidth = void 0;
                        doc.artboards.setActiveArtboardIndex(pageCounter);
                        board = doc.artboards[pageCounter];
                        bounds = board.artboardRect;
                        boardWidth = Math.round(bounds[2] - bounds[0]);
                        // loop through rows
                        var rowCount = Math.ceil((svgFileList.length / CONFIG_1.COLS));
                        rowCount = CONFIG_1.ROWS > rowCount ? rowCount : CONFIG_1.ROWS;
                        // If we are skipping a column, chances are we need to 
                        // add a new row for the overflow of the shift. Even if there 
                        // is not a new row needed, there are no consequences for 
                        // adding one, so just in case.
                        if (CONFIG_1.SKIP_COLS > 0) {
                            rowCount++;
                        }
                        var myY1 = void 0;
                        var myY2 = void 0;
                        for (var rowCounter = 1; rowCounter <= rowCount; rowCounter++) {
                            myY1 = bounds[1] + CONFIG_1.VOFF + (myRowHeight * (rowCounter - 1));
                            myY2 = myY1 + CONFIG_1.FRM_HEIGHT;
                            // loop through columns
                            var colCount = CONFIG_1.COLS;
                            if (rowCounter > 1) {
                                var remaining = Math.ceil(svgFileList.length - i);
                                if (remaining < colCount) {
                                    colCount = remaining;
                                }
                            }
                            for (var columnCounter = 1; columnCounter <= colCount; columnCounter++) {
                                try {
                                    // A hack to allow merging multiple contact sheets 
                                    // Shift the starting row so it aligns nicely with 
                                    // the icons already in the master contact sheet.
                                    if (CONFIG_1.SKIP_COLS > 0 && rowCounter == 1 && columnCounter <= CONFIG_1.SKIP_COLS) {
                                        continue;
                                    }
                                    var f = new File(svgFileList[i]);
                                    if (f.exists) {
                                        try {
                                            if (i == 0) {
                                                theLayer = doc.layers[0];
                                            }
                                            else {
                                                theLayer = doc.layers.add();
                                            }
                                            theLayer.name = f.name;
                                        }
                                        catch (ex) {
                                            logger(LANG_1.LAYER_NOT_CREATED + ex);
                                        }
                                        svgFile = doc.groupItems.createFromFile(f);
                                        var liveWidth = (CONFIG_1.COLS * (CONFIG_1.FRM_WIDTH + CONFIG_1.GUTTER)) - CONFIG_1.GUTTER;
                                        var hoff = Math.ceil((CONFIG_1.PG_WIDTH - liveWidth) / 2);
                                        var myX1 = void 0;
                                        var myX2 = void 0;
                                        myX1 = bounds[0] + hoff + (myColumnWidth * (columnCounter - 1));
                                        myX2 = myX1 + CONFIG_1.FRM_HEIGHT;
                                        var shiftX = Math.ceil((CONFIG_1.FRM_WIDTH - svgFile.width) / 2);
                                        var shiftY = Math.ceil((CONFIG_1.FRM_WIDTH - svgFile.height) / 2);
                                        x1 = myX1 + shiftX;
                                        y1 = (myY1 + shiftY) * -1;
                                        try {
                                            svgFile.position = [x1, y1];
                                            if (typeof (svgFile.resize) == "function") {
                                                svgFile.resize(CONFIG_1.SCALE, CONFIG_1.SCALE);
                                            }
                                            if (CONFIG_1.ADD_LABELS) {
                                                // f.name.toString().replace(/\%20/g, " "); //change %20 to spaces
                                                // f.name.toString().replace(/\.[^\.]*$/, ""); //remove extension
                                                // theLayer.name = theLayer.name.toString().replace(/\%20/g, " "); //change %20 to spaces
                                                // theLayer.name = theLayer.name.toString().replace(/\.[^\.]*$/, ""); //remove extension
                                                addLabel(theLayer, [x1 - (svgFile.width - 165), y1 - (svgFile.height + 100)], f.name.toString().replace(/\.[^\.]*$/, "").toString().replace(/\--SVG/g, "").replace(/\%20/g, " "));
                                            }
                                            // Only save the composite file if at least one 
                                            // icon exists and is successfully imported.
                                            saveCompositeFile = true;
                                            redraw();
                                        }
                                        catch (ex) {
                                            try {
                                                svgFile.position = [0, 0];
                                                logger(ex);
                                            }
                                            catch (ex) {
                                                /*Exit Gracefully*/
                                            }
                                        }
                                    }
                                    else {
                                        logger(svgFileList[i] + LANG_1.DOES_NOT_EXIT);
                                    }
                                }
                                catch (ex) {
                                    logger(ex);
                                    alert(ex);
                                }
                                i++;
                            }
                        }
                    }
                    ;
                    if (saveCompositeFile)
                        saveFileAsAi(sourceDoc_1.path + "/" + CONFIG_1.FILENAME);
                }
            }
            ;
        }
        ;
    }
    ;
    /**
     * Arranges items in the selection on a grid
     * @param <selection> sel    The current selection
     * @return void
     */
    function arrangeItems(sel) {
        var theItem;
        var rows;
        var doc;
        var y1;
        var board;
        var bounds;
        var itemBounds;
        var cols;
        var cellSize;
        var x1 = y1 = 0;
        var boardWidth, boardHeight;
        board = doc.artboards[doc.artboards.getActiveArtboardIndex()];
        bounds = board.artboardRect;
        boardWidth = Math.round(bounds[2] - bounds[0]);
        cols = CONFIG_1.NUM_COLS;
        rows = CONFIG_1.NUM_ROWS;
        x1 = bounds[0] + cellSize;
        y1 = bounds[1] - cellSize;
        for (var i = 0, slen = sel.length; i < slen; i++) {
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
        if (CONFIG_1.SHRINK_TO_FIT) {
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
    }
    ;
    /**
     * Places a text label
     * @param {string} text
     * @param {string} pos - The X/Y position of the label
     * @param {string} size - The text content of the label
     * @returns void
     */
    function addLabel(layer, pos, theText) {
        try {
            var theLabel = layer.textFrames.add();
            theLabel.contents = theText;
            var charAttributes = theLabel.textRange.characterAttributes;
            var parAttributes = theLabel.paragraphs[0].paragraphAttributes;
            charAttributes.size = 7;
            parAttributes.justification = Justification.CENTER;
            theText = theText.toString().replace(/\%20/g, " "); //change %20 to spaces
            theText = theText.toString().replace(/\.[^\.]*$/, ""); //remove extension
            try {
                theLabel.position = pos;
            }
            catch (e) {
                alert('labelPosition : ' + e);
            }
            return theLabel;
        }
        catch (e) {
            alert('addLabel : ' + e);
        }
    }
    /**
     * Saves the file in AI format.
     * @param <string> The file destination path
     * @return void
     */
    function saveFileAsAi(dest) {
        if (app.documents.length > 0) {
            var options = new IllustratorSaveOptions();
            var theDoc = new File(dest);
            IllustratorSaveOptions.compatibility = CONFIG_1.AIFORMAT;
            IllustratorSaveOptions.flattenOutput = OutputFlattening.PRESERVEAPPEARANCE;
            IllustratorSaveOptions.pdfCompatible = true;
            app.activeDocument.saveAs(theDoc, options);
        }
    }
    function redraw() { }
    /**
     * Aligns selection to nearest whole pixel
     * @param <selection> sel The selection object
     * @return void
     */
    function alignToNearestPixel2(sel) {
        try {
            if (typeof sel != "object") {
                logger(LANG_1.NO_SELECTION);
            }
            else {
                var i = void 0;
                for (i = 0; i < sel.length; i++) {
                    sel[i].left = Math.round(sel[i].left);
                    sel[i].top = Math.round(sel[i].top);
                }
                redraw();
            }
        }
        catch (ex) {
            logger(ex);
        }
    }
    /**
     * Logging for this script.
     * @param <string> The logging text
     * @return void
     */
    function logger(txt) {
        if (CONFIG_1.LOGGING == true)
            return;
        var file = new File(CONFIG_1.LOG_FILE_PATH);
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
    }
    ;
    /**
     * Adjusts a value to the nearest whole number
     * @param <float> n   The value to adjust
     * @return <int>
     */
    function moveToPixel(n) {
        return Math.round(n);
    }
    ;
    doCreateContactSheet();
    // Crop to selection with gutters!
    var offset = 10 * 2.83465;
    sourceDoc_1.selection = null;
    var idx = sourceDoc_1.artboards.getActiveArtboardIndex();
    sourceDoc_1.selectObjectsOnActiveArtboard();
    sourceDoc_1.fitArtboardToSelectedArt(idx); // does not work for visible bounds of editable fonts
    var rect = sourceDoc_1.artboards[idx].artboardRect;
    sourceDoc_1.artboards[idx].artboardRect = [rect[0] - offset, rect[1] + offset, rect[2] + offset, rect[3] - offset];
    sourceDoc_1.selection = null;
    // unselect everything
    userInteractionLevel = originalInteractionLevel;
    app.activeDocument.save();
    // close the document here without saving, uncomment for prod
    // app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    //photoshop
    //app.system(terminalCommand)
    // close the document here without saving, uncomment for prod
    // app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    //photoshop
    //app.system(terminalCommand)
    //photoshop
}
catch (_a) {
}
