try {
  /**********************************
   ** INSTRUCTIONS DIALOG
   ***********************************/
  alert(
    "Artboard size must be exactly 256px x 256px. Guides must be on a layer called exactly 'Guides (DO NOT MOVE)'. Make sure all layers and sublayers are invisible and unlocked to avoid bugs. Make sure all icons are on sublayers inside the layer called 'icons' with correct naming. Make sure all background colors are on individual layers after the icons layer with correct layer names. Exported assets will be saved where the .ai file is saved. The document will close without saving changes when complete so make sure you have saved your work so you can re-open it."
  );

  /**********************************
   ** MAKE ICONS LAYER VISIBLE
   ***********************************/
  try {
    app.activeDocument.layers["icons"].visible = true;
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
    let guideLayer = app.activeDocument.layers["Guides (DO NOT MOVE)"];
    guideLayer.visible = true;
    guideLayer.locked = false;
    guideLayer.remove();
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
    function create24x24Folder() {
      var sourceDoc = app.activeDocument;
      var name = "24x24";
      var destFolder = Folder(sourceDoc.path + "/" + name);
      if (!destFolder.exists) destFolder.create();
    }
    create24x24Folder();

    function create32x32Folder() {
      var sourceDoc = app.activeDocument;
      var name = "32x32";
      var destFolder = Folder(sourceDoc.path + "/" + name);
      if (!destFolder.exists) destFolder.create();
    }
    create32x32Folder();

    function create48x48Folder() {
      var sourceDoc = app.activeDocument;
      var name = "48x48";
      var destFolder = Folder(sourceDoc.path + "/" + name);
      if (!destFolder.exists) destFolder.create();
    }
    create48x48Folder();

    function create64x64Folder() {
      var sourceDoc = app.activeDocument;
      var name = "64x64";
      var destFolder = Folder(sourceDoc.path + "/" + name);
      if (!destFolder.exists) destFolder.create();
    }
    create64x64Folder();

    function create300x300Folder() {
      var sourceDoc = app.activeDocument;
      var name = "300x300";
      var destFolder = Folder(sourceDoc.path + "/" + name);
      if (!destFolder.exists) destFolder.create();
    }
    create300x300Folder();

    function create512x512Folder() {
      var sourceDoc = app.activeDocument;
      var name = "512x512";
      var destFolder = Folder(sourceDoc.path + "/" + name);
      if (!destFolder.exists) destFolder.create();
    }
    create512x512Folder();

    function createSVGFolder() {
      var sourceDoc = app.activeDocument;
      var name = "SVG";
      var destFolder = Folder(sourceDoc.path + "/" + name);
      if (!destFolder.exists) destFolder.create();
    }
    createSVGFolder();

    function createEPSFolder() {
      var sourceDoc = app.activeDocument;
      var name = "EPS";
      var destFolder = Folder(sourceDoc.path + "/" + name);
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
      // target icons sublayers
      var myIconsLayer = app.activeDocument.layers["icons"];
      var myIconsSublayers = myIconsLayer.layers;
      // loop through icons and export png for each
      for (let j = 0; j < myIconsSublayers.length; j++) {
        var iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        var pngFile = new File(
          `${app.activeDocument.path}/24x24/${iconLayer.name}${layerName}.png`
        );
        var type = ExportType.PNG24;
        var opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 9.375; // 24px x 24px
        ExportOptionsPNG24.verticalScale = 9.375; // 24px x 24px
        app.activeDocument.exportFile(pngFile, type, opts);
        iconLayer.visible = false;
      }
    }

    function saveAsPNGAt32x32(layerName) {
      // target icons sublayers
      var myIconsLayer = app.activeDocument.layers["icons"];
      var myIconsSublayers = myIconsLayer.layers;
      // loop through icons and export png for each
      for (let j = 0; j < myIconsSublayers.length; j++) {
        var iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        var pngFile = new File(
          `${app.activeDocument.path}/32x32/${iconLayer.name}${layerName}.png`
        );
        var type = ExportType.PNG24;
        var opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 12.5; // 32px x 32px
        ExportOptionsPNG24.verticalScale = 12.5; // 32px x 32px
        app.activeDocument.exportFile(pngFile, type, opts);
        iconLayer.visible = false;
      }
    }

    function saveAsPNGAt48x48(layerName) {
      // target icons sublayers
      var myIconsLayer = app.activeDocument.layers["icons"];
      var myIconsSublayers = myIconsLayer.layers;
      // loop through icons and export png for each
      for (let j = 0; j < myIconsSublayers.length; j++) {
        var iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        var pngFile = new File(
          `${app.activeDocument.path}/48x48/${iconLayer.name}${layerName}.png`
        );
        var type = ExportType.PNG24;
        var opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 18.75; // 48px x 48px
        ExportOptionsPNG24.verticalScale = 18.75; // 48px x 48px
        app.activeDocument.exportFile(pngFile, type, opts);
        iconLayer.visible = false;
      }
    }

    function saveAsPNGAt64x64(layerName) {
      // target icons sublayers
      var myIconsLayer = app.activeDocument.layers["icons"];
      var myIconsSublayers = myIconsLayer.layers;
      // loop through icons and export png for each
      for (let j = 0; j < myIconsSublayers.length; j++) {
        var iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        var pngFile = new File(
          `${app.activeDocument.path}/64x64/${iconLayer.name}${layerName}.png`
        );
        var type = ExportType.PNG24;
        var opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 25; // 300px x 300px
        ExportOptionsPNG24.verticalScale = 25; // 300px x 300px
        app.activeDocument.exportFile(pngFile, type, opts);
        iconLayer.visible = false;
      }
    }

    function saveAsPNGAt300x300(layerName) {
      // target icons sublayers
      var myIconsLayer = app.activeDocument.layers["icons"];
      var myIconsSublayers = myIconsLayer.layers;
      // loop through icons and export png for each
      for (let j = 0; j < myIconsSublayers.length; j++) {
        var iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        var pngFile = new File(
          `${app.activeDocument.path}/300x300/${iconLayer.name}${layerName}.png`
        );
        var type = ExportType.PNG24;
        var opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 117.2; // 300px x 300px
        ExportOptionsPNG24.verticalScale = 117.2; // 300px x 300px
        app.activeDocument.exportFile(pngFile, type, opts);
        iconLayer.visible = false;
      }
    }

    function saveAsPNGAt512x512(layerName) {
      // target icons sublayers
      var myIconsLayer = app.activeDocument.layers["icons"];
      var myIconsSublayers = myIconsLayer.layers;
      // loop through icons and export png for each
      for (let j = 0; j < myIconsSublayers.length; j++) {
        var iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        var pngFile = new File(
          `${app.activeDocument.path}/512x512/${iconLayer.name}${layerName}.png`
        );
        var type = ExportType.PNG24;
        var opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 200;
        ExportOptionsPNG24.verticalScale = 200;
        app.activeDocument.exportFile(pngFile, type, opts);
        iconLayer.visible = false;
      }
    }

    function saveAsSVG(layerName) {
      // target icons sublayers
      var myIconsLayer = app.activeDocument.layers["icons"];
      var myIconsSublayers = myIconsLayer.layers;
      // loop through icons and export png for each
      for (let j = 0; j < myIconsSublayers.length; j++) {
        var iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        var svgFile = new File(
          `${app.activeDocument.path}/SVG/${iconLayer.name}${layerName}.svg`
        );
        var type = ExportType.SVG;
        var opts = new ExportOptionsSVG();
        ExportOptionsSVG.embedRasterImages = true;
        ExportOptionsSVG.fontSubsetting = SVGFontSubsetting.GLYPHSUSED;
        app.activeDocument.exportFile(svgFile, type, opts);
        iconLayer.visible = false;
      }
    }
  } catch (e) {
    alert("Something went wrong while trying to export the icons.", e.message);
  }
  /**********************************
   ** LOOP LAYER VISIBILITY OF ICONS AGAINST BACKGROUND COLORS AND EXECUTE SAVE FUNCTIONS
   ***********************************/
  for (let i = 1; i < app.activeDocument.layers.length; i++) {
    var bgLayer = app.activeDocument.layers[i];
    bgLayer.visible = true;
    saveAsPNGAt24x24(bgLayer.name);
    saveAsPNGAt32x32(bgLayer.name);
    saveAsPNGAt48x48(bgLayer.name);
    saveAsPNGAt64x64(bgLayer.name);
    saveAsPNGAt300x300(bgLayer.name);
    saveAsPNGAt512x512(bgLayer.name);
    saveAsSVG(bgLayer.name);
    bgLayer.visible = false;
  }

  // close the document here without saving!
  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
} catch (e) {
  alert(e.message);
}
