try {
  /**********************************
   ** README https://github.com/Artchibald/WTW-illustrator-script
  
  helpers:
    alert("App V  ersion : ", app.version);
  alert("App Scripting Version: ", app.scriptingVersion);
   ***********************************/

  /**********************************
   ** GLOBAL VARIABLES
   ***********************************/
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
  /**********************************
   ** INSTRUCTIONS DIALOG
   ***********************************/
  // alert(
  //   "FULL README: https://github.com/Artchibald/WTW-illustrator-script /n/n Artboard size must be exactly 256px x 256px. \n\n Guides must be on a layer called exactly 'Guides (DO NOT MOVE)'. \n\n Make sure all layers and sublayers are invisible and unlocked to avoid bugs. \n\n Make sure all icons are on sublayers inside the layer called 'icons' with correct naming. \n\n Make sure all background colors are on individual layers after the icons layer with correct layer names.Exported assets will be saved where the.ai file is saved. \n\n The document will close without saving changes when complete so make sure you have saved your work so you can re - open it."
  // );

  /**********************************
   ** MAKE ICONS LAYER VISIBLE
   ***********************************/
  try {
    // alert(app.version);
    sourceDoc.layers["icons"].visible = true;
  } catch (e) {
    alert(
      "can't locate the top level layer called 'icons', the script won't work without it.",
      e.message
    );
  }
  /**********************************
   ** REMOVE GUIDES LAYER
   ***********************************/
  try {
    // guide layer for removal
    let guideLayer = sourceDoc.layers["Guides (DO NOT MOVE)"];
    guideLayer.visible = true;
    if (guideLayer.visible === true) {
      guideLayer.locked = false;
      // This needs work we dont want to delete it, just remove/ignore it from loop somehow
      guideLayer.remove();
    }
  } catch (e) {
    alert(
      "the guide layer doesn't exist, the script will still work though.",
      e.message
    );
  }

  /**********************************
   ** CREATE REQUIRED FOLDERS
   ***********************************/
  try {
    function createByDimensionsFolder() {
      let destFolder = Folder(sourceDoc.path + "/" + nameByDimensions);
      if (!destFolder.exists) destFolder.create();
    }
    createByDimensionsFolder();
    // For each icon in icons, create the folder
    function createByIconFolder() {
      let destFolder = Folder(sourceDoc.path + "/" + nameByIcon);
      if (!destFolder.exists) destFolder.create();
    }
    createByIconFolder();
    // For each  color in color layers, create the folder
    function createByColorFolder() {
      let destFolder = Folder(sourceDoc.path + "/" + nameByColor);
      if (!destFolder.exists) destFolder.create();
    }
    createByColorFolder();

    function create24x24Folder() {
      let destFolder = Folder(sourceDoc.path + "/" + nameByDimensions + "/" + name24x24);
      if (!destFolder.exists) destFolder.create();
    }
    create24x24Folder();

    function create32x32Folder() {
      let destFolder = Folder(sourceDoc.path + "/" + nameByDimensions + "/" + name32x32);
      if (!destFolder.exists) destFolder.create();
    }
    create32x32Folder();

    function create48x48Folder() {
      let destFolder = Folder(sourceDoc.path + "/" + nameByDimensions + "/" + name48x48);
      if (!destFolder.exists) destFolder.create();
    }
    create48x48Folder();

    function create64x64Folder() {
      let destFolder = Folder(sourceDoc.path + "/" + nameByDimensions + "/" + name64x64);
      if (!destFolder.exists) destFolder.create();
    }
    create64x64Folder();

    function create300x300Folder() {
      let destFolder = Folder(sourceDoc.path + "/" + nameByDimensions + "/" + name300x300);
      if (!destFolder.exists) destFolder.create();
    }
    create300x300Folder();

    function create512x512Folder() {
      let destFolder = Folder(sourceDoc.path + "/" + nameByDimensions + "/" + name512x512);
      if (!destFolder.exists) destFolder.create();
    }
    create512x512Folder();

    function createSVGFolder() {
      let destFolder = Folder(sourceDoc.path + "/" + nameByDimensions + "/" + nameSVG);
      if (!destFolder.exists) destFolder.create();
    }
    createSVGFolder();

    function createEPSFolder() {
      let destFolder = Folder(sourceDoc.path + "/" + nameByDimensions + "/" + nameEPS);
      if (!destFolder.exists) destFolder.create();
    }
    createEPSFolder();
  } catch (e) {
    alert("Something went wrong while creating the folders.", e.message);
  }
  /**********************************
   ** MAIN EXPORT LOOP
   ***********************************/
  try {
    function saveAsPNGAt24x24(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/24x24/${iconLayer.name}${layerName}.png`
        );
        let type = ExportType.PNG24;
        let opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 9.375; // 24px x 24px
        ExportOptionsPNG24.verticalScale = 9.375; // 24px x 24px
        sourceDoc.exportFile(pngFile, type, opts);
        iconLayer.visible = false;
      }
    }

    function saveAsPNGAt32x32(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/32x32/${iconLayer.name}${layerName}.png`
        );
        let type = ExportType.PNG24;
        let opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 12.5; // 32px x 32px
        ExportOptionsPNG24.verticalScale = 12.5; // 32px x 32px
        sourceDoc.exportFile(pngFile, type, opts);
        iconLayer.visible = false;
      }
    }

    function saveAsPNGAt48x48(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/48x48/${iconLayer.name}${layerName}.png`
        );
        let type = ExportType.PNG24;
        let opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 18.75; // 48px x 48px
        ExportOptionsPNG24.verticalScale = 18.75; // 48px x 48px
        sourceDoc.exportFile(pngFile, type, opts);
        iconLayer.visible = false;
      }
    }

    function saveAsPNGAt64x64(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/64x64/${iconLayer.name}${layerName}.png`
        );
        let type = ExportType.PNG24;
        let opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 25; // 300px x 300px
        ExportOptionsPNG24.verticalScale = 25; // 300px x 300px
        sourceDoc.exportFile(pngFile, type, opts);
        iconLayer.visible = false;
      }
    }

    function saveAsPNGAt300x300(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/300x300/${iconLayer.name}${layerName}.png`
        );
        let type = ExportType.PNG24;
        let opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 117.2; // 300px x 300px
        ExportOptionsPNG24.verticalScale = 117.2; // 300px x 300px
        sourceDoc.exportFile(pngFile, type, opts);
        iconLayer.visible = false;
      }
    }

    function saveAsPNGAt512x512(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/512x512/${iconLayer.name}${layerName}.png`
        );
        let type = ExportType.PNG24;
        let opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 200;
        ExportOptionsPNG24.verticalScale = 200;
        sourceDoc.exportFile(pngFile, type, opts);
        iconLayer.visible = false;
      }
    }

    function saveAsSVG(layerName) {
      for (let k = 0; k < myIconsSublayers.length; k++) {
        let iconLayer = myIconsSublayers[k];
        iconLayer.visible = true;
        let svgFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/${nameSVG}/${iconLayer.name}${layerName}`
        );
        let aiFile = new File(
          `${sourceDoc.path}/${sourceDoc.name}`
        );
        let type = ExportType.SVG;
        ExportOptionsSVG.optimizeForSVGViewer = true;
        ExportOptionsSVG.saveMultipleArtboards = true;
        sourceDoc.exportFile(svgFile, type);
        iconLayer.visible = false;
        // redeclare what and where to original to avoid SVG export MEGA bug
        DocumentType.ILLUSTRATOR;
        sourceDoc.saveAs(aiFile);
      }
    }

    function saveAsEPS(layerName) {
      for (let l = 0; l < myIconsSublayers.length; l++) {
        let iconLayer = myIconsSublayers[l];
        iconLayer.visible = true;
        let epsFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/${nameEPS}/${iconLayer.name}${layerName}.eps`
        );
        let aiFile = new File(
          `${sourceDoc.path}/${sourceDoc.name}`
        );
        let opts = new EPSSaveOptions();
        EPSSaveOptions.cmykPostScript = false;
        EPSSaveOptions.embedAllFonts = false;
        EPSSaveOptions.artboardRange = "";
        EPSSaveOptions.embedLinkedFiles = true;
        EPSSaveOptions.includeDocumentThumbnails = true;
        EPSSaveOptions.saveMultipleArtboards = true;
        sourceDoc.saveAs(epsFile, opts);
        iconLayer.visible = false;
        DocumentType.ILLUSTRATOR;
        sourceDoc.saveAs(aiFile);
      }
    }

  } catch (e) {
    alert("Something went wrong while trying to export the icons.", e.message);
  }
  /**********************************
   ** LOOP LAYER VISIBILITY OF ICONS AGAINST BACKGROUND COLORS AND EXECUTE SAVE FUNCTIONS
   ***********************************/
  // separate SVG and EPS into their own loops after duplicating main file script research?
  for (let i = 1; i < sourceDoc.layers.length; i++) {
    let bgLayer = sourceDoc.layers[i];
    bgLayer.visible = true;
    saveAsPNGAt24x24(bgLayer.name);
    saveAsPNGAt32x32(bgLayer.name);
    saveAsPNGAt48x48(bgLayer.name);
    saveAsPNGAt64x64(bgLayer.name);
    saveAsPNGAt300x300(bgLayer.name);
    saveAsPNGAt512x512(bgLayer.name);
    saveAsSVG(bgLayer.name);
    saveAsEPS(bgLayer.name);
    bgLayer.visible = false;
  }
  // revert the doc from a .svg to a .ai, I don't want it to be svg!
  DocumentType.ILLUSTRATOR;
  sourceDoc.save();
  // close the document here without saving, uncomment for prod
  // app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
} catch (e) {
  alert(e.message);
}
