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
  alert(
    "FULL README: https://github.com/Artchibald/WTW-illustrator-script  \n\n   IMPORTANT: THIS SCRIPT WILL DESTROY YOUR .AI FILE!!!! ONLY USE A COPY OF YOUR ORIGINAL AI FILE!!!  \n\n   Make a coffee, this may take a while.  \n\n  If you restart this script again, you may first want to delete the folders that were created in the previous run to avoid bugs. Otherwise it may ask to overwrite them with Save As Prompt and fail to complete  \n\n AIn the layer names, avoid weird characters and use hyphens instead of spaces to avoid bugs  \n\n Artboard size must be exactly 256px x 256px. \n\n Guides must be on a layer called exactly 'Guides (DO NOT MOVE)'. \n\n icons must be INSIDE a layer called exactly 'icons'. \n\n Make sure all layers and sublayers are invisible and unlocked to avoid bugs. \n\n Make sure all icons are on sublayers inside the layer called 'icons' with correct naming. \n\n Make sure all background colors are on individual layers after the icons layer with correct layer names, avoid weird characters. Exported assets will be saved where the .ai file is saved. \n\n Again, this script WILL DELETE LAYERS AND SAVE when complete so make sure you have saved your work elsewhere so you can re - open your file and not lose work."
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
   ** REMOVE GUIDES LAYER
   ***********************************/
  try {
    // guide layer for removal
    let guideLayer = sourceDoc.layers["Guides (DO NOT MOVE)"];
    guideLayer.visible = true;
    if (guideLayer.visible === true) {
      guideLayer.locked = false;
      // This needs work we dont want to delete it, just remove/ignore it from loop somehow
      // can we cut at beginning and paste at end
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
      for (let j = 1; j < sourceDoc.layers.length; j++) {
        let colorLayerName = sourceDoc.layers[j].name;
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
      for (let j = 1; j < sourceDoc.layers.length; j++) {
        let colorLayerName = sourceDoc.layers[j].name;
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
      for (let j = 1; j < sourceDoc.layers.length; j++) {
        let colorLayerName = sourceDoc.layers[j].name;
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
      for (let j = 1; j < sourceDoc.layers.length; j++) {
        let colorLayerName = sourceDoc.layers[j].name;
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
      for (let j = 1; j < sourceDoc.layers.length; j++) {
        let colorLayerName = sourceDoc.layers[j].name;
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
      for (let j = 1; j < sourceDoc.layers.length; j++) {
        let colorLayerName = sourceDoc.layers[j].name;
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
      for (let j = 1; j < sourceDoc.layers.length; j++) {
        let colorLayerName = sourceDoc.layers[j].name;
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
      for (let j = 1; j < sourceDoc.layers.length; j++) {
        let colorLayerName = sourceDoc.layers[j].name;
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
      for (let j = 1; j < sourceDoc.layers.length; j++) {
        let colorLayerName = sourceDoc.layers[j].name;
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
          `${sourceDoc.path}/${nameByDimensions}/${name24x24}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByDimensions}/${name32x32}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByDimensions}/${name48x48}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByDimensions}/${name64x64}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByDimensions}/${name300x300}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByDimensions}/${name512x512}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByDimensions}/${nameSVG}/${iconLayer.name}--${layerName}`
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
          `${sourceDoc.path}/${nameByDimensions}/${nameEPS}/${iconLayer.name}${layerName}.eps`
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
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${name24x24}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${name32x32}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${name48x48}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${name64x64}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${name300x300}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${name512x512}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${nameSVG}/${iconLayer.name}--${layerName}`
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
          `${sourceDoc.path}/${nameByIcon}/${iconLayer.name}/${nameEPS}/${iconLayer.name}${layerName}.eps`
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
          `${sourceDoc.path}/${nameByColor}/${layerName}/${name24x24}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByColor}/${layerName}/${name32x32}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByColor}/${layerName}/${name48x48}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByColor}/${layerName}/${name64x64}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByColor}/${layerName}/${name300x300}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByColor}/${layerName}/${name512x512}/${iconLayer.name}--${layerName}.png`
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
          `${sourceDoc.path}/${nameByColor}/${layerName}/${nameSVG}/${iconLayer.name}--${layerName}`
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
          `${sourceDoc.path}/${nameByColor}/${layerName}/${nameEPS}/${iconLayer.name}--${layerName}`
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
  for (let i = 1; i < sourceDoc.layers.length; i++) {
    let bgLayer = sourceDoc.layers[i];
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



  // close the document here without saving, uncomment for prod
  // app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
} catch (e) {
  alert(e.message);
}