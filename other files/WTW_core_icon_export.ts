/************************************************
 * target Illustrator
Script to automate creating variations and exporting files for WTW icons
Starting with an open AI file with a single icon on a single 256 x 256 artboard
– Creates a new artboard at 16x16
- Creates a new artboard at 24x24
- Creates a new artboard at 1400x128
(if these artboards already exist, optionally clears and rebuilds these artboards instead)

- Adds resized copies of the icon to the artboards
- Asks for the name of the icon and adds text to the masthead icon

- Creates exports of the icon:
- RGB EPS
- RGB inverse EPS
- RGB inactive EPS
- PNGs at 1024, 256, 128, 64, 48, 32
- RGB masthead
- CMYK EPS
- CMYK inverse EPS
************************************************/

/*********************************
VARIABLES YOU MIGHT NEED TO CHANGE
**********************************/

// var RGBColorElements = [
//   [112, 32, 130], //violet
//   [130, 133, 136], //icon gray
//   [193, 16, 160], //magenta
//   [0, 160, 210], //blue
//   [0, 195, 137], //green
//   [255, 255, 255], //white
// ];
// var CMYKColorElements = [
//   [60, 100, 0, 10], //violet
//   [23, 16, 13, 46], //icon gray
//   [36, 100, 0, 0], //magenta
//   [100, 32, 14, 0], //blue
//   [66, 0, 48, 0], //green
//   [0, 0, 0, 0], //white
// ];

// var desiredFont = "NHaasGroteskTXStd-55Rg";
// var PNGSizes = [1024, 256, 128, 64, 48, 32]; //sizes to export
// var violetIndex = 0; //these are for converting to inverse and inactive versions
// var grayIndex = 1;
// var whiteIndex = 5;

// /**********************************
// Module for image manipulation tasks
// ***********************************/

// var CSTasks = (function () {
//   var tasks: any = {};

//   /********************
//     POSITION AND MOVEMENT
//     ********************/

//   //takes an artboard
//   //returns its left top corner as an array [x,y]
//   tasks.getArtboardCorner = function (artboard) {
//     var corner = [artboard.artboardRect[0], artboard.artboardRect[1]];
//     return corner;
//   };

//   //takes an array [x,y] for an item's position and an array [x,y] for the position of a reference point
//   //returns an aray [x,y] for the offset between the two points
//   tasks.getOffset = function (itemPos, referencePos) {
//     var offset = [itemPos[0] - referencePos[0], itemPos[1] - referencePos[1]];
//     return offset;
//   };

//   //takes an object (e.g. group) and a destination array [x,y]
//   //moves the group to the specified destination
//   tasks.translateObjectTo = function (object, destination) {
//     var offset = tasks.getOffset(object.position, destination);
//     object.translate(-offset[0], -offset[1]);
//   };

//   //takes a document and index of an artboard
//   //deletes everything on that artboard
//   tasks.clearArtboard = function (doc, index) {
//     //clears an artboard at the given index
//     doc.selection = null;
//     doc.artboards.setActiveArtboardIndex(index);
//     doc.selectObjectsOnActiveArtboard();
//     var sel = doc.selection; // get selection
//     // for (k=0; k<sel.length; k++) {
//     // 	sel[k].remove();
//     // }
//   };

/*********************************
    SELECTING, GROUPING AND UNGROUPING
    **********************************/

//takes a document and the index of an artboard in that document's artboards array
//returns a selection of all the objects on that artboard
// tasks.selectContentsOnArtboard = function(doc, i){
//     doc.selection = null;
//     doc.artboards.setActiveArtboardIndex(i);
//     doc.selectObjectsOnActiveArtboard();
//     return doc.selection;
// };

//takes a document and a collection of objects (e.g. selection)
//returns a group made from that collection
// tasks.createGroup = function(doc, collection){
//     var newGroup = doc.groupItems.add();
//     for (k=0; k<collection.length; k++) {
//         collection[k].moveToBeginning(newGroup);
//     }
//     return newGroup;
// };

//takes a group
//ungroups that group at the top layer (no recursion for nested groups)
// tasks.ungroupOnce = function(group){
//     for (i=group.pageItems.length-1; i>=0; i--)  {
//         group.pageItems[i].move(group.pageItems[i].layer, ElementPlacement.PLACEATEND);
//     }
// };

/****************************
    CREATING AND SAVING DOCUMENTS
    *****************************/

//take a source document and a colorspace (e.g. DocumentColorSpace.RGB)
//opens and returns a new document with the source document's units and the specified colorspace
// tasks.newDocument = function(sourceDoc, colorSpace){
//     var preset = new DocumentPreset();
//     preset.colorMode = colorSpace;
//     preset.units = sourceDoc.rulerUnits;

//     var newDoc = app.documents.addDocument(colorSpace, preset);
//     newDoc.pageOrigin = sourceDoc.pageOrigin;
//     newDoc.rulerOrigin = sourceDoc.rulerOrigin;

//     return newDoc;
// };

//take a source document, artboard index, and a colorspace (e.g. DocumentColorSpace.RGB)
//opens and returns a new document with the source document's units and specified artboard, the specified colorspace
// tasks.duplicateArtboardInNewDoc = function(sourceDoc, artboardIndex, colorspace){
//     var rectToCopy = sourceDoc.artboards[artboardIndex].artboardRect;
//     var newDoc = tasks.newDocument(sourceDoc, colorspace);
//     newDoc.artboards.add(rectToCopy);
//     newDoc.artboards.remove(0);
//     return newDoc;
// };

//takes a document, destination file, starting width and desired width
//scales the document proportionally to the desired width and exports as a PNG
//   tasks.scaleAndExportPNG = function(doc, destFile, startWidth, desiredWidth) {
// 	var scaling = 100.0*desiredWidth/startWidth;
// 	var options = new ExportOptionsPNG24();
// 	options.antiAliasing = true;
// 	options.transparency = true;
// 	options.artBoardClipping = true;
// 	options.horizontalScale = scaling;
// 	options.verticalScale = scaling;

// 	doc.exportFile(destFile, ExportType.PNG24, options);
// };

//takes left x, top y, width, and height
//returns a Rect that can be used to create an artboard
// tasks.newRect = function(x, y, width, height) {
//     var rect = [];
//     rect[0] = x;
//     rect[1] = -y;
//     rect[2] = width + x;
//     rect[3] = -(height + y);
//     return rect;
// };

/***
	TEXT
	****/

//takes a text frame and a string with the desired font name
//sets the text frame to the desired font or alerts if not found
// tasks.setFont = function(textRef, desiredFont){
// 	var foundFont = false;
// 	for (var i = 0; i < textFonts.length; i++){
// 		if (textFonts[i].name == desiredFont) {
// 			textRef.textRange.characterAttributes.textFont = textFonts[i];
// 			foundFont = true;
// 			break;
// 		}
// 	}
// 	if (!foundFont) alert("Didn't find the font. Please check if the font is installed or check the script to make sure the font name is right.");
// };

//takes a document, message string, position array and font size
//creates a text frame with the message
// tasks.createTextFrame = function(doc, message, pos, size){
//     var textRef = doc.textFrames.add();
//     textRef.contents = message;
//     textRef.left = pos[0];
//     textRef.top = pos[1];
//     textRef.textRange.characterAttributes.size = size;
// };

/***************
    COLOR CONVERSION
    ****************/

//takes two equal-length arrays of corresponding colors [[R,G,B], [R2,G2,B2],...] and [[C,M,Y,K],[C2,M2,Y2,K2],...] (fairly human readable)
//returns an array of ColorElements [[RGBColor,CMYKColor],[RGBColor2,CMYKColor2],...] (usable by the script for fill colors etc.)
// tasks.initializeColors = function(RGBArray, CMYKArray){

//     var colors = new Array(RGBArray.length);

//     for (var i = 0; i < RGBArray.length; i++){
//         var rgb = new RGBColor();
//         rgb.red = RGBArray[i][0];
//         rgb.green = RGBArray[i][1];
//         rgb.blue = RGBArray[i][2];

//         var cmyk = new CMYKColor();
//         cmyk.cyan = CMYKArray[i][0];
//         cmyk.magenta = CMYKArray[i][1];
//         cmyk.yellow = CMYKArray[i][2];
//         cmyk.black = CMYKArray[i][3];

//         colors[i] = [rgb,cmyk];
//     }
//     return colors;
// };

//take a single RGBColor and an array of corresponding RGB and CMYK colors [[RGBColor,CMYKColor],[RGBColor2,CMYKColor2],...]
//returns the index in the array if it finds a match, otherwise returns -1
// tasks.matchRGB = function(color, matchArray){ //compares a single color RGB color against RGB colors in [[RGB],[CMYK]] array
//     for (var i = 0; i < matchArray.length; i++){
//         if (Math.abs(color.red - matchArray[i][0].red) < 1 &&
//         Math.abs(color.green - matchArray[i][0].green) < 1 &&
//         Math.abs(color.blue - matchArray[i][0].blue) < 1) { //can't do equality because it adds very small decimals
//             return i;
//         }
//     }
//     return -1;
// };

//take a single RGBColor and an array of corresponding RGB and CMYK colors [[RGBColor,CMYKColor],[RGBColor2,CMYKColor2],...]
//returns the index in the array if it finds a match, otherwise returns -1
// tasks.matchColorsRGB = function(color1, color2){ //compares two colors to see if they match
// if (Math.abs(color1.red - color2.red) < 1 &&
// Math.abs(color1.green - color2.green) < 1 &&
// Math.abs(color1.blue - color2.blue) < 1) { //can't do equality because it adds very small decimals
// 	return true;
// }
//     return false;
// };

//takes a pathItems array, startColor and endColor and converts all pathItems with startColor into endColor
// tasks.convertColorCMYK = function(pathItems, startColor, endColor){
//     for ( i = 0; i < pathItems.length; i++ ) {
//         if (tasks.matchColorsCMYK(pathItems[i].fillColor, startColor)) pathItems[i].fillColor = endColor;
//     }
// };

//take a single CMYKColor and an array of corresponding RGB and CMYK colors [[RGBColor,CMYKColor],[RGBColor2,CMYKColor2],...]
//returns the index in the array if it finds a match, otherwise returns -1
// tasks.matchColorsCMYK = function(color1, color2){ //compares two colors to see if they match
// if (Math.abs(color1.cyan - color2.cyan) < 1 &&
// Math.abs(color1.magenta - color2.magenta) < 1 &&
// Math.abs(color1.yellow - color2.yellow) < 1 &&
// Math.abs(color1.black - color2.black) < 1) { //can't do equality because it adds very small decimals
// 	return true;
// }
//     return false;
// };

//takes a pathItems array, startColor and endColor and converts all pathItems with startColor into endColor
// tasks.convertColorRGB = function(pathItems, startColor, endColor){
//     for ( i = 0; i < pathItems.length; i++ ) {
//         if (tasks.matchColorsRGB(pathItems[i].fillColor, startColor)) pathItems[i].fillColor = endColor;
//     }
// };

//takes a pathItems array, endColor and opacity and converts all pathItems into endColor at the specified opacity
// tasks.convertAll = function(pathItems, endColor, opcty){
//      for ( i = 0; i < pathItems.length; i++ ) {
//         pathItems[i].fillColor = endColor;
//         pathItems[i].opacity = opcty;
//     }
// };

//takes a collection of pathItems and an array of specified RGB and CMYK colors [[RGBColor,CMYKColor],[RGBColor2,CMYKColor2],...]
//returns an array with an index to the RGB color if it is in the array
// tasks.indexRGBColors = function(pathItems, matchArray){
//     var colorIndex = new Array(pathItems.length);
//     for ( i = 0; i < pathItems.length; i++ ) {
//         var itemColor = pathItems[i].fillColor;
//         colorIndex[i] = tasks.matchRGB(itemColor, matchArray);
//     }
//     return colorIndex;
// };

//takes a doc, collection of pathItems, an array of specified colors and an array of colorIndices
//converts the fill colors to the indexed CMYK colors and adds a text box with the unmatched colors
//Note that this only makes sense if you've previously indexed the same path items and haven't shifted their positions in the pathItems array
// tasks.convertToCMYK = function(doc, pathItems, colorArray, colorIndex){
//     var unmatchedColors = [];
//     for ( i = 0; i < pathItems.length; i++ ) {
//         if (colorIndex[i] >=0 && colorIndex[i] < colorArray.length) pathItems[i].fillColor = colorArray[colorIndex[i]][1];
//         else {
//             var unmatchedColor = "(" + pathItems[i].fillColor.red + ", " + pathItems[i].fillColor.green + ", " + pathItems[i].fillColor.blue + ")";
//             unmatchedColors.push(unmatchedColor);
//         }
//     }
//     if (unmatchedColors.length > 0){
//     	alert("One or more colors don't match the brand palette and weren't converted.");
//         unmatchedColors = tasks.unique(unmatchedColors);
//         var unmatchedString = "Unconverted colors:";
//         for (var i = 0; i < unmatchedColors.length; i++){
//             unmatchedString = unmatchedString + "\n" + unmatchedColors[i];
//         }
//         var errorMsgPos = [Infinity, Infinity]; //gets the bottom left of all the artboards
//         for (var i = 0; i < doc.artboards.length; i++){
//         var rect = doc.artboards[i].artboardRect;
// 		if (rect[0] < errorMsgPos[0]) errorMsgPos[0] = rect[0];
// 		if (rect[3] < errorMsgPos[1]) errorMsgPos[1] = rect[3];
//     	}
//     	errorMsgPos[1] = errorMsgPos[1] - 20;

//         tasks.createTextFrame(doc, unmatchedString, errorMsgPos, 18);
//     }
// };

//takes an array
//returns a sorted array with only unique elements
// tasks.unique = function(a) {
//     if (a.length > 0){
//         sorted =  a.sort();
//         uniq = [sorted[0]];
//         for (var i = 1; i < sorted.length; i++){
//             if (sorted[i] != sorted[i-1]) uniq.push(sorted[i]);
//         }
//         return uniq;
//     }
//     return [];
// };
//   return tasks;
// })();

/****************
 ***************/

// function main(){

// 	var sourceDoc = app.activeDocument;

// 	/*****************************
// 	create export folder if needed
// 	******************************/
// 	var name = sourceDoc.name.split(".")[0];
// 	var destFolder = Folder(sourceDoc.path + "/" + name);
// 	if(!destFolder.exists) destFolder.create();

// 	/******************
// 	set up artboards
// 	******************/
// 	var rebuild = true;
// 	var gutter = 32;

// 	//if there is one artboard at 256x256, create the new artboard
// 	if (sourceDoc.artboards.length == 1
// 	&& sourceDoc.artboards[0].artboardRect[2]-sourceDoc.artboards[0].artboardRect[0] == 256
// 	&& sourceDoc.artboards[0].artboardRect[1]-sourceDoc.artboards[0].artboardRect[3] == 256){
// 		var firstRect = sourceDoc.artboards[0].artboardRect;
// 		sourceDoc.artboards.add(CSTasks.newRect(firstRect[2] + gutter,firstRect[1],2400,256));
// 	}

// 	//if the masthead artboard is present, check if rebuilding or just exporting
// 	else if (sourceDoc.artboards.length == 2 && sourceDoc.artboards[1].artboardRect[1]-sourceDoc.artboards[1].artboardRect[3] == 256){
// 		rebuild = confirm ("It looks like your artwork already exists. This script will rebuild the masthead and export various EPS and PNG versions. Do you want to proceed?");
// 		if (rebuild) CSTasks.clearArtboard(sourceDoc,1);
// 		else return;
// 	}

// 	//otherwise abort
// 	else{
// 		alert("Please try again with a single artboard that is 256x256px.");
// 		return;
// 	}

// 	//select the contents on artboard 0
// 	var sel = CSTasks.selectContentsOnArtboard(sourceDoc, 0);

// 	if (sel.length == 0){ //if nothing is in the artboard
// 		alert("Please try again with artwork on the main 256x256 artboard.");
// 		return;
// 	}

// 	var colors = CSTasks.initializeColors(RGBColorElements, CMYKColorElements); //initialize the colors from the brand palette
// 	var iconGroup = CSTasks.createGroup(sourceDoc, sel); //group the selection (easier to work with)
// 	var iconOffset = CSTasks.getOffset(iconGroup.position, CSTasks.getArtboardCorner(sourceDoc.artboards[0]));

// 	/********************************
// 	Create new artboard with masthead
// 	*********************************/

// 	//place icon on masthead
// 	var mast = iconGroup.duplicate(iconGroup.layer,ElementPlacement.PLACEATEND);
// 	var mastPos = [sourceDoc.artboards[1].artboardRect[0] + iconOffset[0],sourceDoc.artboards[1].artboardRect[1] + iconOffset[1]];
// 	CSTasks.translateObjectTo(mast,mastPos);

// 	//request a name for the icon, and place that as text on the masthead artboard
// 	var appName = prompt("What name do you want to put in the masthead?");

// 	var textRef = sourceDoc.textFrames.add();
// 	textRef.contents = appName;
// 	textRef.textRange.characterAttributes.size = 178;
// 	CSTasks.setFont(textRef,desiredFont);

// 	//vertically align the baseline to be 64 px above the botom of the artboard
// 	var bottomEdge = sourceDoc.artboards[1].artboardRect[3] + 0.25*sourceDoc.artboards[0].artboardRect[2] - sourceDoc.artboards[0].artboardRect[0]; //64px (0.25*256px) above the bottom edge of the artboard
// 	var vOffset = CSTasks.getOffset(textRef.anchor,[0,bottomEdge]);
// 	textRef.translate(0,-vOffset[1]);

// 	//create an outline of the text
// 	var textGroup = textRef.createOutline();

// 	//horizontally align the left edge of the text to be 96px to the right of the edge
// 	var rightEdge = mast.position[0] + mast.width + 0.375*sourceDoc.artboards[0].artboardRect[2] - sourceDoc.artboards[0].artboardRect[0]; //96px (0.375*256px) right of the icon
// 	var hOffset = CSTasks.getOffset(textGroup.position,[rightEdge,0]);
// 	textGroup.translate(-hOffset[0],0);

// 	//resize the artboard to be only a little wider than the text
// 	var leftMargin = mast.position[0] - sourceDoc.artboards[1].artboardRect[0];
// 	var newWidth = textGroup.position[0] + textGroup.width - sourceDoc.artboards[1].artboardRect[0] + leftMargin;
// 	var resizedRect = CSTasks.newRect(sourceDoc.artboards[1].artboardRect[0], -sourceDoc.artboards[1].artboardRect[1], newWidth, 256);
// 	sourceDoc.artboards[1].artboardRect = resizedRect;

// 	//get the text offset for exporting
// 	var mastTextOffset = CSTasks.getOffset(textGroup.position, CSTasks.getArtboardCorner(sourceDoc.artboards[1]));

// 	/*********************************************************************
// 	RGB export (EPS, PNGs at multiple sizes, inactive EPS and inverse EPS)
// 	**********************************************************************/

// 	//create a new document with the artboard and contents from artboard 0
// 	var rgbDoc = CSTasks.duplicateArtboardInNewDoc(sourceDoc, 0, DocumentColorSpace.RGB);
// 	rgbDoc.swatches.removeAll();

// 	var rgbGroup = iconGroup.duplicate(rgbDoc.layers[0],ElementPlacement.PLACEATEND);
// 	var rgbLoc = [rgbDoc.artboards[0].artboardRect[0] + iconOffset[0], rgbDoc.artboards[0].artboardRect[1] + iconOffset[1]];
// 	CSTasks.translateObjectTo(rgbGroup, rgbLoc);

// 	CSTasks.ungroupOnce(rgbGroup);

// 	//save all sizes of PNG into the export folder
// 	var startWidth = rgbDoc.artboards[0].artboardRect[2] - rgbDoc.artboards[0].artboardRect[0];
// 	for (var i = 0; i < PNGSizes.length; i++){
// 		var filename = '/' + name + '_Core_RGB_' + PNGSizes[i] + '.png';
// 		var destFile = new File(destFolder + filename);
// 		CSTasks.scaleAndExportPNG(rgbDoc, destFile, startWidth, PNGSizes[i]);
// 	}

// 	//save EPS into the export folder
// 	var filename = '/' + name + '_Core_RGB.eps';
// 	var destFile = new File(destFolder + filename);
// 	var rgbSaveOpts = new EPSSaveOptions();
// 	rgbSaveOpts.cmykPostScript = false;
// 	rgbDoc.saveAs(destFile, rgbSaveOpts);

// 	//index the RGB colors for conversion to CMYK. An inelegant location.
// 	var colorIndex = CSTasks.indexRGBColors(rgbDoc.pathItems, colors);

// 	//convert violet to white and save as EPS
// 	CSTasks.convertColorRGB(rgbDoc.pathItems, colors[violetIndex][0], colors[whiteIndex][0]);

// 	var inverseFilename = '/' + name + '_Inverse_RGB.eps';
// 	var inverseFile = new File(destFolder + inverseFilename);
// 	rgbDoc.saveAs(inverseFile, rgbSaveOpts);

// 	//save inverse file in all the PNG sizes
// 	for (var i = 0; i < PNGSizes.length; i++){
// 		var filename = '/' + name + '_Inverse_RGB_' + PNGSizes[i] + '.png';
// 		var destFile = new File(destFolder + filename);
// 		CSTasks.scaleAndExportPNG(rgbDoc, destFile, startWidth, PNGSizes[i]);
// 	}

// 	//convert to inactive color (WTW Icon grey at 50% opacity) and save as EPS
// 	CSTasks.convertAll(rgbDoc.pathItems, colors[grayIndex][0], 50);

// 	var inactiveFilename = '/' + name + '_Inactive_RGB.eps';
// 	var inactiveFile = new File(destFolder + inactiveFilename);
// 	rgbDoc.saveAs(inactiveFile, rgbSaveOpts);

// 	for (var i = 0; i < PNGSizes.length; i++){
// 		var filename = '/' + name + '_Inactive_RGB_' + PNGSizes[i] + '.png';
// 		var destFile = new File(destFolder + filename);
// 		CSTasks.scaleAndExportPNG(rgbDoc, destFile, startWidth, PNGSizes[i]);
// 	}

// 	//close and clean up
// 	rgbDoc.close(SaveOptions.DONOTSAVECHANGES);
// 	rgbDoc = null;

// 	/****************
// 	CMYK export (EPS)
// 	****************/

// 	//open a new document with CMYK colorspace, and duplicate the icon to the new document
// 	var cmykDoc = CSTasks.duplicateArtboardInNewDoc(sourceDoc, 0, DocumentColorSpace.CMYK);
// 	cmykDoc.swatches.removeAll();

// 	//need to reverse the order of copying the group to get the right color ordering
// 	var cmykGroup = iconGroup.duplicate(cmykDoc.layers[0],ElementPlacement.PLACEATBEGINNING);
// 	var cmykLoc = [cmykDoc.artboards[0].artboardRect[0] + iconOffset[0], cmykDoc.artboards[0].artboardRect[1] + iconOffset[1]];
// 	CSTasks.translateObjectTo(cmykGroup, cmykLoc);
// 	CSTasks.ungroupOnce(cmykGroup);

// 	CSTasks.convertToCMYK(cmykDoc, cmykDoc.pathItems, colors, colorIndex);

// 	//save EPS into the export folder
// 	var cmykFilename = '/' + name + '_Core_CMYK.eps';
// 	var cmykDestFile = new File(destFolder + cmykFilename);
// 	var cmykSaveOpts = new EPSSaveOptions();
// 	cmykDoc.saveAs(cmykDestFile, cmykSaveOpts);

// 	//convert violet to white and save as EPS
// 	CSTasks.convertColorCMYK(cmykDoc.pathItems, colors[violetIndex][1], colors[whiteIndex][1]);

// 	var cmykInverseFilename = '/' + name + '_Inverse_CMYK.eps';
// 	var cmykInverseFile = new File(destFolder + cmykInverseFilename);
// 	cmykDoc.saveAs(cmykInverseFile, rgbSaveOpts);

// 	//close and clean up
// 	cmykDoc.close(SaveOptions.DONOTSAVECHANGES);
// 	cmykDoc = null;

// 	/********************
// 	Masthead export (EPS)
// 	********************/

// 	//open a new doc and copy and position the icon and the masthead text
// 	var mastDoc = CSTasks.duplicateArtboardInNewDoc(sourceDoc, 1, DocumentColorSpace.RGB);
// 	mastDoc.swatches.removeAll();

// 	var mastGroup = iconGroup.duplicate(mastDoc.layers[0],ElementPlacement.PLACEATEND);
// 	var mastLoc = [mastDoc.artboards[0].artboardRect[0] + iconOffset[0], mastDoc.artboards[0].artboardRect[1] + iconOffset[1]];
// 	CSTasks.translateObjectTo(mastGroup, mastLoc);
// 	CSTasks.ungroupOnce(mastGroup);

// 	var mastText = textGroup.duplicate(mastDoc.layers[0],ElementPlacement.PLACEATEND);
// 	var mastTextLoc = [mastDoc.artboards[0].artboardRect[0] + mastTextOffset[0], mastDoc.artboards[0].artboardRect[1] + mastTextOffset[1]];
// 	CSTasks.translateObjectTo(mastText, mastTextLoc);

// 	//save RGB EPS into the export folder
// 	var mastFilename = '/' + name + '_Masthead_RGB.eps';
// 	var mastDestFile = new File(destFolder + mastFilename);
// 	var mastSaveOpts = new EPSSaveOptions();
// 	mastSaveOpts.cmykPostScript = false;
// 	mastDoc.saveAs(mastDestFile, mastSaveOpts);

// 	//close and clean up
// 	mastDoc.close(SaveOptions.DONOTSAVECHANGES);
// 	mastDoc = null;

// 	/************
// 	Final cleanup
// 	************/
// 	CSTasks.ungroupOnce(iconGroup);
// 	CSTasks.ungroupOnce(mast);
// 	sourceDoc.selection = null;

// }

// main();
