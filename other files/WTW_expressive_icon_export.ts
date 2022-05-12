/************************************************
Script that converts defined RGB colors to
defined CMY colors.
Saves a second .ai file in CMYK, and exports both 
RGB and CMYK versions to a folder named after the file
************************************************/

/********
SET RGB AND CMYK COLOR PALETTE HERE
********/
var RGBColorElements = [
  [112, 32, 130], //violet
  [130, 133, 136], //new gray
  [193, 16, 160], //magenta
  [0, 160, 210], //blue
  [0, 195, 137], //green
];
var CMYKColorElements = [
  [60, 100, 0, 10], //violet
  [23, 16, 13, 46], //new gray
  [36, 100, 0, 0], //magenta
  [100, 32, 14, 0], //blue
  [66, 0, 48, 0], //green
];

var CSTasks = (function () {
  var tasks: any = {};

  /********************
    POSITION AND MOVEMENT
    ********************/

  //takes an artboards array
  //returns the leftmost and topmost position of all the artboards as an array [x,y]
  tasks.getArtboardsTopLeft = function (artboards) {
    var pos = [Infinity, -Infinity]; //numbering goes up left to right, and down top to bottom
    for (var i = 0; i < artboards.length; i++) {
      var rect = artboards[i].artboardRect;
      if (rect[0] < pos[0]) pos[0] = rect[0];
      if (rect[1] > pos[1]) pos[1] = rect[1];
    }
    return pos;
  };

  //takes an array [x,y] for an item's position and an array [x,y] for the position of a reference point
  //returns an aray [x,y] for the offset between the two points
  tasks.getOffset = function (itemPos, referencePos) {
    var offset = [itemPos[0] - referencePos[0], itemPos[1] - referencePos[1]];
    return offset;
  };

  //takes an object (e.g. group) and a destination array [x,y]
  //moves the group to the specified destination
  tasks.translateObjectTo = function (object, destination) {
    var offset = tasks.getOffset(object.position, destination);
    object.translate(-offset[0], -offset[1]);
  };

  /*********************************
    SELECTING, GROUPING AND UNGROUPING
    **********************************/

  //take a document
  //returns a selection with everything in that document
  tasks.selectEverything = function (doc) {
    doc.selection = null;
    var i;
    for (i = 0; i < doc.pathItems.length; i++) {
      doc.pathItems[i].selected = true;
    }
    return doc.selection;
  };

  //takes a document and a collection of objects (e.g. selection)
  //returns a group made from that collection
  tasks.createGroup = function (doc, collection) {
    var newGroup = doc.groupItems.add();
    var k;
    for (k = 0; k < collection.length; k++) {
      collection[k].moveToBeginning(newGroup);
    }
    return newGroup;
  };

  //takes a group
  //ungroups that group at the top layer (no recursion for nested groups)
  tasks.ungroupOnce = function (group) {
    var i;
    var ElementPlacement;
    for (i = group.pageItems.length - 1; i >= 0; i--) {
      group.pageItems[i].move(
        group.pageItems[i].layer,
        ElementPlacement.PLACEATEND
      );
    }
  };

  /****************************
    CREATING AND SAVING DOCUMENTS
    *****************************/

  //take a source document and a colorspace (e.g. DocumentColorSpace.RGB)
  //opens and returns a new document with the source document's units and the specified colorspace
  tasks.newDocument = function (sourceDoc, colorSpace) {
    var preset = new DocumentPreset();
    DocumentPreset.colorMode = colorSpace;
    DocumentPreset.units = sourceDoc.rulerUnits;

    var newDoc = Documents.addDocument(colorSpace, preset);
    newDoc.pageOrigin = sourceDoc.pageOrigin;
    newDoc.rulerOrigin = sourceDoc.rulerOrigin;

    return newDoc;
  };

  //take a source document and a colorspace (e.g. DocumentColorSpace.RGB)
  //opens and returns a new document with the source document's units and artboards, the specified colorspace
  tasks.duplicateArtboardsInNewDoc = function (sourceDoc, colorspace) {
    var rectsToCopy = new Array(sourceDoc.artboards.length);
    for (var i = 0; i < sourceDoc.artboards.length; i++) {
      rectsToCopy[i] = sourceDoc.artboards[i].artboardRect;
    }

    var newDoc = tasks.newDocument(sourceDoc, colorspace);

    for (var i = 0; i < rectsToCopy.length; i++) {
      var thisRect = rectsToCopy[i];
      newDoc.artboards.add(thisRect);
    }
    newDoc.artboards.remove(0);
    return newDoc;
  };

  /***
	TEXT
	****/

  //takes a document, message string, position array and font size
  //creates a text frame with the message
  tasks.createTextFrame = function (doc, message, pos, size) {
    var textRef = doc.textFrames.add();
    textRef.contents = message;
    textRef.left = pos[0];
    textRef.top = pos[1];
    textRef.textRange.characterAttributes.size = size;
  };

  /***************
    COLOR CONVERSION
    ****************/

  //takes two equal-length arrays of corresponding colors [[R,G,B], [R2,G2,B2],...] and [[C,M,Y,K],[C2,M2,Y2,K2],...] (fairly human readable)
  //returns an array of ColorElements [[RGBColor,CMYKColor],[RGBColor2,CMYKColor2],...] (usable by the script for fill colors etc.)
  tasks.initializeColors = function (RGBArray, CMYKArray) {
    var colors = new Array(RGBArray.length);

    for (var i = 0; i < RGBArray.length; i++) {
      var rgb = new RGBColor();
      rgb.red = RGBArray[i][0];
      rgb.green = RGBArray[i][1];
      rgb.blue = RGBArray[i][2];

      var cmyk = new CMYKColor();
      cmyk.cyan = CMYKArray[i][0];
      cmyk.magenta = CMYKArray[i][1];
      cmyk.yellow = CMYKArray[i][2];
      cmyk.black = CMYKArray[i][3];

      colors[i] = [rgb, cmyk];
    }
    return colors;
  };

  //takes a collection of pathItems and an array of specified RGB and CMYK colors [[RGBColor,CMYKColor],[RGBColor2,CMYKColor2],...]
  //returns an array with an index to the RGB color if it is in the array
  tasks.indexRGBColors = function (pathItems, matchArray) {
    var colorIndex = new Array(pathItems.length);
    var i;
    for (i = 0; i < pathItems.length; i++) {
      var itemColor = pathItems[i].fillColor;
      colorIndex[i] = tasks.matchRGB(itemColor, matchArray);
    }
    return colorIndex;
  };

  //take a single RGBColor and an array of corresponding RGB and CMYK colors [[RGBColor,CMYKColor],[RGBColor2,CMYKColor2],...]
  //returns the index in the array if it finds a match, otherwise returns -1
  tasks.matchRGB = function (color, matchArray) {
    //compares a single color RGB color against RGB colors in [[RGB],[CMYK]] array
    for (var i = 0; i < matchArray.length; i++) {
      if (
        Math.abs(color.red - matchArray[i][0].red) < 1 &&
        Math.abs(color.green - matchArray[i][0].green) < 1 &&
        Math.abs(color.blue - matchArray[i][0].blue) < 1
      ) {
        //can't do equality because it adds very small decimals
        return i;
      }
    }
    return -1;
  };

  //takes a doc, collection of pathItems, an array of specified colors and an array of colorIndices
  //converts the fill colors to the indexed CMYK colors and adds a text box with the unmatched colors
  //Note that this only makes sense if you've previously indexed the same path items and haven't shifted their positions in the pathItems array
  tasks.convertToCMYK = function (doc, pathItems, colorArray, colorIndex) {
    var unmatchedColors = [];
    for (i = 0; i < pathItems.length; i++) {
      if (colorIndex[i] >= 0 && colorIndex[i] < colorArray.length)
        pathItems[i].fillColor = colorArray[colorIndex[i]][1];
      else {
        var unmatchedColor =
          "(" +
          pathItems[i].fillColor.red +
          ", " +
          pathItems[i].fillColor.green +
          ", " +
          pathItems[i].fillColor.blue +
          ")";
        unmatchedColors.push(unmatchedColor);
      }
    }
    if (unmatchedColors.length > 0) {
      alert(
        "One or more colors don't match the brand palette and weren't converted."
      );
      unmatchedColors = tasks.unique(unmatchedColors);
      var unmatchedString = "Unconverted colors:";
      for (var i = 0; i < unmatchedColors.length; i++) {
        unmatchedString = unmatchedString + "\n" + unmatchedColors[i];
      }
      var errorMsgPos = [Infinity, Infinity]; //gets the bottom left of all the artboards
      for (var i = 0; i < doc.artboards.length; i++) {
        var rect = doc.artboards[i].artboardRect;
        if (rect[0] < errorMsgPos[0]) errorMsgPos[0] = rect[0];
        if (rect[3] < errorMsgPos[1]) errorMsgPos[1] = rect[3];
      }
      errorMsgPos[1] = errorMsgPos[1] - 20;

      tasks.createTextFrame(doc, unmatchedString, errorMsgPos, 18);
    }
  };

  //takes an array
  //returns a sorted array with only unique elements
  tasks.unique = function (a) {
    if (a.length > 0) {
      var sorted = a.sort();
      var uniq = [sorted[0]];
      for (var i = 1; i < sorted.length; i++) {
        if (sorted[i] != sorted[i - 1]) uniq.push(sorted[i]);
      }
      return uniq;
    }
    return [];
  };

  return tasks;
})();

function main() {
  var sourceDoc = app.activeDocument;
  var colors = CSTasks.initializeColors(RGBColorElements, CMYKColorElements);

  /*****************************
	Find or create the save folder
	******************************/
  var name = sourceDoc.name.split(".")[0];
  var nameArray = name.split("_");

  //strip out the "_expressive" from the filename
  var folderName = nameArray[0];
  for (var i = 1; i < nameArray.length - 1; i++) {
    folderName = folderName + "_" + nameArray[i];
  }

  var destFolder = Folder(sourceDoc.path + "/" + folderName);
  if (!destFolder.exists) destFolder.create();

  /*****************
	export EPS in RGB
	*****************/
  var rgbFilename = "/" + name + "_RGB.eps";
  var rgbDestFile = new File(destFolder + rgbFilename);
  var rgbSaveOpts = new EPSSaveOptions();
  EPSSaveOptions.cmykPostScript = false;
  sourceDoc.saveAs(rgbDestFile, rgbSaveOpts);

  /*************************
	Duplicate document in CMYK
	**************************/
  //select everything in the document, get their colors,
  var sel = CSTasks.selectEverything(sourceDoc);
  var colorIndex = CSTasks.indexRGBColors(sourceDoc.pathItems, colors);

  // group the selection and get its position relative to the artboards
  var everythingGroup = CSTasks.createGroup(sourceDoc, sel);
  var offset = CSTasks.getOffset(
    everythingGroup.position,
    CSTasks.getArtboardsTopLeft(sourceDoc.artboards)
  );

  //create a new file in CMYK color mode that duplicates all the artboards and their contents
  var cmykDoc = CSTasks.duplicateArtboardsInNewDoc(
    sourceDoc,
    DocumentColorSpace.CMYK
  );
  cmykDoc.swatches.removeAll();
  var ElementPlacement;
  var copiedGroup = everythingGroup.duplicate(
    cmykDoc.layers[0],
    ElementPlacement.PLACEATEND
  );

  var abCorner = CSTasks.getArtboardsTopLeft(cmykDoc.artboards);
  var dest = [abCorner[0] + offset[0], abCorner[1] + offset[1]];
  CSTasks.translateObjectTo(copiedGroup, dest);

  CSTasks.ungroupOnce(copiedGroup);

  //convert colors to cmyk and keep track of the unconverted colors
  CSTasks.convertToCMYK(cmykDoc, cmykDoc.pathItems, colors, colorIndex);

  /*****************
	export EPS in CMYK
	*****************/
  var cmykFilename = "/" + name + "_CMYK.eps";
  var cmykDestFile = new File(destFolder + cmykFilename);
  var cmykSaveOpts = new EPSSaveOptions();
  cmykDoc.saveAs(cmykDestFile, cmykSaveOpts);

  /*****************
	close and clean up
	*****************/
  cmykDoc.close(SaveOptions.DONOTSAVECHANGES);
  cmykDoc = null;
  CSTasks.ungroupOnce(everythingGroup);
  sourceDoc.selection = null;
}

main();
