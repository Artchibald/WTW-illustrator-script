try {
  /**********************************
   ** README https://github.com/Artchibald/WTW-illustrator-script
  
  version helpers:
  alert("App Version : ", app.version);
  alert("App Scripting Version: ", app.scriptingVersion);
   ***********************************/

  /**********************************
   ** GLOBAL VARIABLES
   ***********************************/
  let sourceDoc = app.activeDocument;

  //folder names
  let nameByDimensions = "sorted-by-type";
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

  // target colors for main loop
  let myColorsLayer = sourceDoc.layers["colors"];
  let myColorsSublayers = myColorsLayer.layers;

  let guideLayer = sourceDoc.layers["Guides (DO NOT MOVE)"];
  /**********************************
   ** INSTRUCTIONS DIALOG
   ***********************************/
  alert(
    "FULL README: https://github.com/Artchibald/WTW-illustrator-script   \n\n   Make a coffee, this may take a while.  \n\n If you run the script again, you should probably delete the previous assets created. \n\n  Artboard size must be exactly 256px x 256px. \n\n Guides must be on a layer called exactly 'Guides (DO NOT MOVE)'. \n\n Make sure there are no spaces in the layer names, use hyphens(-) instead.  \n\n Make sure all layers and sublayers are invisible and unlocked to avoid bugs. <path>s (sub sub sub layers) should remain visible though in layers panel(this is standard). \n\n Make sure all icons are on sublayers inside the layer called 'icons' with correct naming. Make sure all colors are on sublayers inside the layer called 'colors' with correct naming. \n\n Exported assets will be saved where the .ai file is saved. \n\n"
  );

  /**********************************
   ** MAKE ICONS LAYER VISIBLE
   ***********************************/
  try {
    sourceDoc.layers["icons"].visible = true;
  } catch (e) {
    alert(
      "can't locate the top level layer called 'icons', the script won't work without it.",
      e.message
    );
  }
  /**********************************
   ** HIDE / SHOW SOME LAYERS NEEDED
   ***********************************/
  try {
    guideLayer.visible = false;
    myColorsLayer.visible = true;
    // guide layer for removal
    // let guideLayer = sourceDoc.layers["Guides (DO NOT MOVE)"];
    // guideLayer.visible = true;
    // if (guideLayer.visible === true) {
    //   guideLayer.locked = false;
    // This needs work we dont want to delete it, just remove/ignore it from loop somehow
    // can we cut at beginning and paste at end
    // guideLayer.remove();

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
      let destFolder = Folder(`${sourceDoc.path}/${nameByDimensions}`);
      if (!destFolder.exists) destFolder.create();
    }
    createByDimensionsFolder();
    function createByIconFolder() {
      let destFolder = Folder(`${sourceDoc.path}/${nameByIcon}`);
      if (!destFolder.exists) destFolder.create();
    }
    createByIconFolder();
    function createByColorFolder() {
      let destFolder = Folder(`${sourceDoc.path}/${nameByColor}`);
      if (!destFolder.exists) destFolder.create();
    }
    createByColorFolder();

    // loop through icon names and create folder for each icon name

    function createPerIconFolders() {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayerName = myIconsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByIcon}/${iconLayerName}`);
        if (!destFolder.exists) destFolder.create();
      }
    }
    createPerIconFolders();

    // loop through colors and create folder for each color

    function createPerColorFolders() {
      for (let j = 0; j < myColorsSublayers.length; j++) {
        let colorLayerName = myColorsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByColor}/${colorLayerName}`);
        if (!destFolder.exists) destFolder.create();
      }
    }
    createPerColorFolders();

    function create24x24Folders() {
      let destFolder = Folder(`${sourceDoc.path}/${nameByDimensions}/${name24x24}`);
      if (!destFolder.exists) destFolder.create();
      // loop through all Folders By Icons and add required folder
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayerName = myIconsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByIcon}/${iconLayerName}/${name24x24}`);
        if (!destFolder.exists) destFolder.create();
      }
      // loop through all Folders By Colors and add required folder
      for (let j = 0; j < myColorsSublayers.length; j++) {
        let colorLayerName = myColorsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByColor}/${colorLayerName}/${name24x24}`);
        if (!destFolder.exists) destFolder.create();
      }
    }
    create24x24Folders();

    function create32x32Folders() {
      let destFolder = Folder(`${sourceDoc.path}/${nameByDimensions}/${name32x32}`);
      if (!destFolder.exists) destFolder.create();
      // loop through all Folders By Icons and add required folder
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayerName = myIconsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByIcon}/${iconLayerName}/${name32x32}`);
        if (!destFolder.exists) destFolder.create();
      }
      // loop through all Folders By Colors and add required folder
      for (let j = 0; j < myColorsSublayers.length; j++) {
        let colorLayerName = myColorsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByColor}/${colorLayerName}/${name32x32}`);
        if (!destFolder.exists) destFolder.create();
      }
    }
    create32x32Folders();

    function create48x48Folders() {
      let destFolder = Folder(`${sourceDoc.path}/${nameByDimensions}/${name48x48}`);
      if (!destFolder.exists) destFolder.create();
      // loop through all Folders By Icons and add required folder
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayerName = myIconsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByIcon}/${iconLayerName}/${name48x48}`);
        if (!destFolder.exists) destFolder.create();
      }
      // loop through all Folders By Colors and add required folder
      for (let j = 0; j < myColorsSublayers.length; j++) {
        let colorLayerName = myColorsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByColor}/${colorLayerName}/${name48x48}`);
        if (!destFolder.exists) destFolder.create();
      }
    }
    create48x48Folders();

    function create64x64Folders() {
      let destFolder = Folder(`${sourceDoc.path}/${nameByDimensions}/${name64x64}`);
      if (!destFolder.exists) destFolder.create();
      // loop through all Folders By Icons and add required folder
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayerName = myIconsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByIcon}/${iconLayerName}/${name64x64}`);
        if (!destFolder.exists) destFolder.create();
      }
      // loop through all Folders By Colors and add required folder
      for (let j = 0; j < myColorsSublayers.length; j++) {
        let colorLayerName = myColorsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByColor}/${colorLayerName}/${name64x64}`);
        if (!destFolder.exists) destFolder.create();
      }
    }
    create64x64Folders();

    function create300x300Folders() {
      let destFolder = Folder(`${sourceDoc.path}/${nameByDimensions}/${name300x300}`);
      if (!destFolder.exists) destFolder.create();
      // loop through all Folders By Icons and add required folder
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayerName = myIconsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByIcon}/${iconLayerName}/${name300x300}`);
        if (!destFolder.exists) destFolder.create();
      }
      // loop through all Folders By Colors and add required folder
      for (let j = 0; j < myColorsSublayers.length; j++) {
        let colorLayerName = myColorsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByColor}/${colorLayerName}/${name300x300}`);
        if (!destFolder.exists) destFolder.create();
      }
    }
    create300x300Folders();

    function create512x512Folders() {
      let destFolder = Folder(`${sourceDoc.path}/${nameByDimensions}/${name512x512}`);
      if (!destFolder.exists) destFolder.create();
      // loop through all Folders By Icons and add required folder
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayerName = myIconsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByIcon}/${iconLayerName}/${name512x512}`);
        if (!destFolder.exists) destFolder.create();
      }
      // loop through all Folders By Colors and add required folder
      for (let j = 0; j < myColorsSublayers.length; j++) {
        let colorLayerName = myColorsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByColor}/${colorLayerName}/${name512x512}`);
        if (!destFolder.exists) destFolder.create();
      }
    }
    create512x512Folders();

    function createSVGFolders() {
      let destFolder = Folder(`${sourceDoc.path}/${nameByDimensions}/${nameSVG}`);
      if (!destFolder.exists) destFolder.create();
      // loop through all Folders By Icons and add required folder
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayerName = myIconsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByIcon}/${iconLayerName}/${nameSVG}`);
        if (!destFolder.exists) destFolder.create();
      }
      // loop through all Folders By Colors and add required folder
      for (let j = 0; j < myColorsSublayers.length; j++) {
        let colorLayerName = myColorsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByColor}/${colorLayerName}/${nameSVG}`);
        if (!destFolder.exists) destFolder.create();
      }
    }
    createSVGFolders();

    function createEPSFolders() {
      let destFolder = Folder(`${sourceDoc.path}/${nameByDimensions}/${nameEPS}`);
      if (!destFolder.exists) destFolder.create();
      // loop through all Folders By Icons and add required folder
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayerName = myIconsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByIcon}/${iconLayerName}/${nameEPS}`);
        if (!destFolder.exists) destFolder.create();
      }
      // loop through all Folders By Colors and add required folder
      for (let j = 0; j < myColorsSublayers.length; j++) {
        let colorLayerName = myColorsSublayers[j].name;
        let destFolder = Folder(`${sourceDoc.path}/${nameByColor}/${colorLayerName}/${nameEPS}`);
        if (!destFolder.exists) destFolder.create();
      }
    }
    createEPSFolders();



  } catch (e) {
    alert("Something went wrong while creating the folders.", e.message);
  }
  /**********************************
   ** MAIN EXPORT LOOP
   ***********************************/
  try {
    function saveAsPNGAt24x24ByDimensions(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/${name24x24}/${iconLayer.name}--${layerName}--24x24-PNG.png`
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

    function saveAsPNGAt32x32ByDimensions(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/${name32x32}/${iconLayer.name}--${layerName}--32x32-PNG.png`
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

    function saveAsPNGAt48x48ByDimensions(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/${name48x48}/${iconLayer.name}--${layerName}--48x48-PNG.png`
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

    function saveAsPNGAt64x64ByDimensions(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/${name64x64}/${iconLayer.name}--${layerName}--64x64-PNG.png`
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

    function saveAsPNGAt300x300ByDimensions(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/${name300x300}/${iconLayer.name}--${layerName}--300x300-PNG.png`
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

    function saveAsPNGAt512x512ByDimensions(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/${name512x512}/${iconLayer.name}--${layerName}--512x512-PNG.png`
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

    function saveAsSVGByDimensions(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let svgFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/${nameSVG}/${iconLayer.name}--${layerName}--SVG`
        );
        let aiFile = new File(
          `${sourceDoc.path}/${sourceDoc.name}`
        );
        let type = ExportType.SVG;
        // ExportOptionsSVG.optimizeForSVGViewer = true;
        // ExportOptionsSVG.saveMultipleArtboards = true;
        sourceDoc.exportFile(svgFile, type);
        iconLayer.visible = false;
        // redeclare what and where to original to avoid SVG export MEGA bug
        DocumentType.ILLUSTRATOR;
        sourceDoc.saveAs(aiFile);
      }
    }

    function saveAsEPSByDimensions(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let epsFile = new File(
          `${sourceDoc.path}/${nameByDimensions}/${nameEPS}/${iconLayer.name}${layerName}--EPS.eps`
        );
        let aiFile = new File(
          `${sourceDoc.path}/${sourceDoc.name}`
        );
        let opts = new EPSSaveOptions();
        // EPSSaveOptions.cmykPostScript = false;
        // EPSSaveOptions.embedAllFonts = false;
        // EPSSaveOptions.artboardRange = "";
        // EPSSaveOptions.embedLinkedFiles = true;
        // EPSSaveOptions.includeDocumentThumbnails = true;
        // EPSSaveOptions.saveMultipleArtboards = true;
        sourceDoc.saveAs(epsFile, opts);
        iconLayer.visible = false;
        DocumentType.ILLUSTRATOR;
        sourceDoc.saveAs(aiFile);
      }
    }
    /**********************************
     ** Save to By Icon Folder
     ***********************************/
    function saveAsPNGAt24x24ByIcon(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${name24x24}/${iconLayer.name}--${layerName}--24x24-PNG.png`
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

    function saveAsPNGAt32x32ByIcon(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${name32x32}/${iconLayer.name}--${layerName}--32x32-PNG.png`
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

    function saveAsPNGAt48x48ByIcon(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${name48x48}/${iconLayer.name}--${layerName}--48x48-PNG.png`
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

    function saveAsPNGAt64x64ByIcon(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${name64x64}/${iconLayer.name}--${layerName}--64x64-PNG.png`
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

    function saveAsPNGAt300x300ByIcon(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${name300x300}/${iconLayer.name}--${layerName}--300x300-PNG.png`
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

    function saveAsPNGAt512x512ByIcon(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${name512x512}/${iconLayer.name}--${layerName}--512x512-PNG.png`
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

    function saveAsSVGByIcon(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let svgFile = new File(
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${nameSVG}/${iconLayer.name}--${layerName}--SVG`
        );
        let aiFile = new File(
          `${sourceDoc.path}/${sourceDoc.name}`
        );
        let type = ExportType.SVG;
        // ExportOptionsSVG.optimizeForSVGViewer = true;
        // ExportOptionsSVG.saveMultipleArtboards = true;
        sourceDoc.exportFile(svgFile, type);
        iconLayer.visible = false;
        // redeclare what and where to original to avoid SVG export MEGA bug
        DocumentType.ILLUSTRATOR;
        sourceDoc.saveAs(aiFile);
      }
    }

    function saveAsEPSByIcon(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let epsFile = new File(
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${nameEPS}/${iconLayer.name}${layerName}--EPS.eps`
        );
        let aiFile = new File(
          `${sourceDoc.path}/${sourceDoc.name}`
        );
        let opts = new EPSSaveOptions();
        // EPSSaveOptions.cmykPostScript = false;
        // EPSSaveOptions.embedAllFonts = false;
        // EPSSaveOptions.artboardRange = "";
        // EPSSaveOptions.embedLinkedFiles = true;
        // EPSSaveOptions.includeDocumentThumbnails = true;
        // EPSSaveOptions.saveMultipleArtboards = true;
        sourceDoc.saveAs(epsFile, opts);
        iconLayer.visible = false;
        DocumentType.ILLUSTRATOR;
        sourceDoc.saveAs(aiFile);
      }
    }

    /**********************************
 ** Save to By Color Folder
 ***********************************/
    function saveAsPNGAt24x24ByColor(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByColor}/${layerName}/${name24x24}/${iconLayer.name}--${layerName}--24x24-PNG.png`
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

    function saveAsPNGAt32x32ByColor(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByColor}/${layerName}/${name32x32}/${iconLayer.name}--${layerName}--32x32-PNG.png`
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

    function saveAsPNGAt48x48ByColor(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByColor}/${layerName}/${name48x48}/${iconLayer.name}--${layerName}--48x48-PNG.png`
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

    function saveAsPNGAt64x64ByColor(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByColor}/${layerName}/${name64x64}/${iconLayer.name}--${layerName}--64x64-PNG.png`
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

    function saveAsPNGAt300x300ByColor(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByColor}/${layerName}/${name300x300}/${iconLayer.name}--${layerName}--300x300-PNG.png`
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

    function saveAsPNGAt512x512ByColor(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let pngFile = new File(
          `${sourceDoc.path}/${nameByColor}/${layerName}/${name512x512}/${iconLayer.name}--${layerName}--512x512-PNG.png`
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

    function saveAsSVGByColor(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let svgFile = new File(
          `${sourceDoc.path}/${nameByColor}/${layerName}/${nameSVG}/${iconLayer.name}--${layerName}--SVG`
        );
        let aiFile = new File(
          `${sourceDoc.path}/${sourceDoc.name}`
        );
        let type = ExportType.SVG;
        // ExportOptionsSVG.optimizeForSVGViewer = true;
        // ExportOptionsSVG.saveMultipleArtboards = true;
        sourceDoc.exportFile(svgFile, type);
        iconLayer.visible = false;
        // redeclare what and where to original to avoid SVG export MEGA bug
        DocumentType.ILLUSTRATOR;
        sourceDoc.saveAs(aiFile);
      }
    }

    function saveAsEPSByColor(layerName) {
      for (let j = 0; j < myIconsSublayers.length; j++) {
        let iconLayer = myIconsSublayers[j];
        iconLayer.visible = true;
        let epsFile = new File(
          `${sourceDoc.path}/${nameByColor}/${layerName}/${nameEPS}/${iconLayer.name}--${layerName}--EPS`
        );
        let aiFile = new File(
          `${sourceDoc.path}/${sourceDoc.name}`
        );
        let opts = new EPSSaveOptions();
        // EPSSaveOptions.cmykPostScript = false;
        // EPSSaveOptions.embedAllFonts = false;
        // EPSSaveOptions.artboardRange = "";
        // EPSSaveOptions.embedLinkedFiles = true;
        // EPSSaveOptions.includeDocumentThumbnails = true;
        // EPSSaveOptions.saveMultipleArtboards = true;
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
   ** LOOP LAYER VISIBILITY OF ICONS AGAINST BACKGROUND COLORS AND EXECUTE SAVE EXPORT FUNCTIONS
   ***********************************/
  for (let i = 0; i < myColorsSublayers.length; i++) {
    let bgLayer = myColorsSublayers[i];
    bgLayer.visible = true;
    // Save them to sorted-by-dimensions
    saveAsPNGAt24x24ByDimensions(bgLayer.name);
    saveAsPNGAt32x32ByDimensions(bgLayer.name);
    saveAsPNGAt48x48ByDimensions(bgLayer.name);
    saveAsPNGAt64x64ByDimensions(bgLayer.name);
    saveAsPNGAt300x300ByDimensions(bgLayer.name);
    saveAsPNGAt512x512ByDimensions(bgLayer.name);
    saveAsSVGByDimensions(bgLayer.name);
    saveAsEPSByDimensions(bgLayer.name);
    // Save them to sorted-by-icon
    saveAsPNGAt24x24ByIcon(bgLayer.name);
    saveAsPNGAt32x32ByIcon(bgLayer.name);
    saveAsPNGAt48x48ByIcon(bgLayer.name);
    saveAsPNGAt64x64ByIcon(bgLayer.name);
    saveAsPNGAt300x300ByIcon(bgLayer.name);
    saveAsPNGAt512x512ByIcon(bgLayer.name);
    saveAsSVGByIcon(bgLayer.name);
    saveAsEPSByIcon(bgLayer.name);
    // Save them to sorted-by-color
    saveAsPNGAt24x24ByColor(bgLayer.name);
    saveAsPNGAt32x32ByColor(bgLayer.name);
    saveAsPNGAt48x48ByColor(bgLayer.name);
    saveAsPNGAt64x64ByColor(bgLayer.name);
    saveAsPNGAt300x300ByColor(bgLayer.name);
    saveAsPNGAt512x512ByColor(bgLayer.name);
    saveAsSVGByColor(bgLayer.name);
    saveAsEPSByColor(bgLayer.name);
    bgLayer.visible = false;
    // Next we create a contact sheet here
  }
  // revert the doc from a .svg to a .ai, I don't want it to be svg!
  DocumentType.ILLUSTRATOR;
  sourceDoc.save();
  /**********************************
 ** CREATE CONTACT SHEET
 ***********************************/

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

    /**
     * Whether or not to add the file name as text 
     * under the imported icons.
     */
    ADD_LABELS: true,

    /**
     * Number of rows
     */

    ROWS: 20,

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

    ROW_WIDTH: 128,

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

    PG_HEIGHT: 2688,

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

    START_FOLDER: Folder.desktop,

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

    LOG_FILE_PATH: Folder.desktop + "/ai-contactsheet-log.txt",

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

    let dialog = new Window("dialog", LANG.LABEL_SETTINGS, [550, 350, 900, 700]);
    let response = false;

    try {
      dialog.pageWidthLabel = dialog.add("statictext", [32, 30, 132, 60], LANG.LABEL_PG_WIDTH);
      dialog.pageWidth = dialog.add("edittext", [150, 30, 200, 60], CONFIG.PG_WIDTH);
      dialog.pageWidth.active = true;

      dialog.pageHeightLabel = dialog.add("statictext", [32, 70, 132, 100], LANG.LABEL_PG_HEIGHT);
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

      dialog.cancelBtn = dialog.add("button", [80, 300, 170, 330], LANG.BUTTON_CANCEL, {
        name: "cancel"
      });
      dialog.openBtn = dialog.add("button", [180, 300, 270, 330], LANG.BUTTON_OK, {
        name: "ok"
      });

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

          let board;
          let bounds;
          let x1 = y1 = x2 = y2 = 0;

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

                      if (CONFIG.ADD_LABELS) {
                        addLabel(theLayer, [x1 - (svgFile.width - 165), y1 - (svgFile.height + 100)], f.name)
                      }

                      // Only save the composite file if at least one 
                      // icon exists and is successfully imported.
                      saveCompositeFile = true;

                      redraw();
                    } catch (ex) {
                      try {
                        svgFile.position = [0, 0];
                        logger(ex);
                      } catch (ex) {
                        /*Exit Gracefully*/
                      }
                    }
                  } else {
                    logger(svgFileList[i] + LANG.DOES_NOT_EXIT);
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
            saveFileAsAi(srcFolder.path + "/" + CONFIG.FILENAME);
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

    let board;
    let bounds;
    let itemBounds;
    let cols;
    let cellSize;
    let x1 = y1 = 0;
    let boardWidth, boardHeight;

    board = doc.artboards[doc.artboards.getActiveArtboardIndex()];
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
   * Places a text label 
   * @param {string} text
   * @param {string} pos - The X/Y position of the label
   * @param {string} size - The text content of the label 
   * @returns void 
   */
  function addLabel(layer, pos, theText) {
    try {
      let theLabel = layer.textFrames.add();

      theLabel.contents = theText;

      let charAttributes = theLabel.textRange.characterAttributes;
      let parAttributes = theLabel.paragraphs[0].paragraphAttributes;

      charAttributes.size = 5;
      parAttributes.justification = Justification.CENTER;




      try {
        theLabel.position = pos;

      } catch (e) {
        alert('labelPosition : ' + e)
      }

      return theLabel;
    } catch (e) {
      alert('addLabel : ' + e)
    }
  }

  /**
   * Saves the file in AI format.
   * @param <string> The file destination path
   * @return void
   */
  function saveFileAsAi(dest) {
    if (app.documents.length > 0) {
      let options = new IllustratorSaveOptions();
      let theDoc = new File(dest);
      options.compatibility = CONFIG.AIFORMAT;
      options.flattenOutput = OutputFlattening.PRESERVEAPPEARANCE;
      options.pdfCompatible = true;
      app.activeDocument.saveAs(theDoc, options);
    }
  }

  /**
   * Aligns selection to nearest whole pixel
   * @param <selection> sel The selection object
   * @return void
   */
  function alignToNearestPixel(sel) {
    try {
      if (typeof sel != "object") {

        logger(LANG.NO_SELECTION);
      } else {

        for (i = 0; i < sel.length; i++) {
          sel[i].left = Math.round(sel[i].left);
          sel[i].top = Math.round(sel[i].top);
        }
        redraw();
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
    if (CONFIG.LOGGING == 0) return;
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
  let offset = 10 * 2.83465;
  sourceDoc.selection = null;
  let idx = sourceDoc.artboards.getActiveArtboardIndex();
  sourceDoc.selectObjectsOnActiveArtboard();
  sourceDoc.fitArtboardToSelectedArt(idx); // does not work for visible bounds of editable fonts
  let rect = sourceDoc.artboards[idx].artboardRect;
  sourceDoc.artboards[idx].artboardRect = [rect[0] - offset, rect[1] + offset, rect[2] + offset, rect[3] - offset];
  sourceDoc.selection = null;
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
  //app.system(terminalCommand)
} catch (e) {
  alert(e.message);
}