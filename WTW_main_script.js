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
    var sourceDoc_1 = app.activeDocument;
    //folder names
    var nameByDimensions_1 = "sorted-by-dimensions";
    var nameByIcon_1 = "sorted-by-icon";
    var nameByColor_1 = "sorted-by-color";
    var name300x300_1 = "300x300";
    var name512x512_1 = "512x512";
    var name64x64_1 = "64x64";
    var name48x48_1 = "48x48";
    var name32x32_1 = "32x32";
    var name24x24_1 = "24x24";
    var nameSVG_1 = "SVG";
    var nameEPS_1 = "EPS";
    // target icons for main loop
    var myIconsLayer = sourceDoc_1.layers["icons"];
    var myIconsSublayers_1 = myIconsLayer.layers;
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
        sourceDoc_1.layers["icons"].visible = true;
    }
    catch (e) {
        alert("can't locate the top level layer called 'icons', the script won't work without it.", e.message);
    }
    /**********************************
     ** REMOVE GUIDES LAYER
     ***********************************/
    try {
        // guide layer for removal
        var guideLayer = sourceDoc_1.layers["Guides (DO NOT MOVE)"];
        guideLayer.visible = true;
        if (guideLayer.visible === true) {
            guideLayer.locked = false;
            // This needs work we dont want to delete it, just remove/ignore it from loop somehow
            guideLayer.remove();
        }
    }
    catch (e) {
        alert("the guide layer doesn't exist, the script will still work though.", e.message);
    }
    /**********************************
     ** CREATE REQUIRED FOLDERS
     ***********************************/
    try {
        function createByDimensionsFolder() {
            var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1));
            if (!destFolder.exists)
                destFolder.create();
        }
        createByDimensionsFolder();
        function createByIconFolder() {
            var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1));
            if (!destFolder.exists)
                destFolder.create();
        }
        createByIconFolder();
        function createByColorFolder() {
            var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByColor_1));
            if (!destFolder.exists)
                destFolder.create();
        }
        createByColorFolder();
        // loop through icon names and create folder for each icon name
        function createPerIconFolders() {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayerName = myIconsSublayers_1[j].name;
                var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayerName));
                if (!destFolder.exists)
                    destFolder.create();
            }
        }
        createPerIconFolders();
        // loop through colors and create folder for each color
        function createPerColorFolders() {
            for (var j = 1; j < sourceDoc_1.layers.length; j++) {
                var colorLayerName = sourceDoc_1.layers[j].name;
                var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByColor_1, "/").concat(colorLayerName));
                if (!destFolder.exists)
                    destFolder.create();
            }
        }
        createPerColorFolders();
        function create24x24Folders() {
            var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(name24x24_1));
            if (!destFolder.exists)
                destFolder.create();
            // loop through all Folders By Icons and add required folder
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayerName = myIconsSublayers_1[j].name;
                var destFolder_1 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayerName, "/").concat(name24x24_1));
                if (!destFolder_1.exists)
                    destFolder_1.create();
            }
            // loop through all Folders By Colors and add required folder
            for (var j = 1; j < sourceDoc_1.layers.length; j++) {
                var colorLayerName = sourceDoc_1.layers[j].name;
                var destFolder_2 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByColor_1, "/").concat(colorLayerName, "/").concat(name24x24_1));
                if (!destFolder_2.exists)
                    destFolder_2.create();
            }
        }
        create24x24Folders();
        function create32x32Folders() {
            var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(name32x32_1));
            if (!destFolder.exists)
                destFolder.create();
            // loop through all Folders By Icons and add required folder
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayerName = myIconsSublayers_1[j].name;
                var destFolder_3 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayerName, "/").concat(name32x32_1));
                if (!destFolder_3.exists)
                    destFolder_3.create();
            }
            // loop through all Folders By Colors and add required folder
            for (var j = 1; j < sourceDoc_1.layers.length; j++) {
                var colorLayerName = sourceDoc_1.layers[j].name;
                var destFolder_4 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByColor_1, "/").concat(colorLayerName, "/").concat(name32x32_1));
                if (!destFolder_4.exists)
                    destFolder_4.create();
            }
        }
        create32x32Folders();
        function create48x48Folders() {
            var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(name48x48_1));
            if (!destFolder.exists)
                destFolder.create();
            // loop through all Folders By Icons and add required folder
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayerName = myIconsSublayers_1[j].name;
                var destFolder_5 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayerName, "/").concat(name48x48_1));
                if (!destFolder_5.exists)
                    destFolder_5.create();
            }
            // loop through all Folders By Colors and add required folder
            for (var j = 1; j < sourceDoc_1.layers.length; j++) {
                var colorLayerName = sourceDoc_1.layers[j].name;
                var destFolder_6 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByColor_1, "/").concat(colorLayerName, "/").concat(name48x48_1));
                if (!destFolder_6.exists)
                    destFolder_6.create();
            }
        }
        create48x48Folders();
        function create64x64Folders() {
            var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(name64x64_1));
            if (!destFolder.exists)
                destFolder.create();
            // loop through all Folders By Icons and add required folder
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayerName = myIconsSublayers_1[j].name;
                var destFolder_7 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayerName, "/").concat(name64x64_1));
                if (!destFolder_7.exists)
                    destFolder_7.create();
            }
            // loop through all Folders By Colors and add required folder
            for (var j = 1; j < sourceDoc_1.layers.length; j++) {
                var colorLayerName = sourceDoc_1.layers[j].name;
                var destFolder_8 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByColor_1, "/").concat(colorLayerName, "/").concat(name64x64_1));
                if (!destFolder_8.exists)
                    destFolder_8.create();
            }
        }
        create64x64Folders();
        function create300x300Folders() {
            var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(name300x300_1));
            if (!destFolder.exists)
                destFolder.create();
            // loop through all Folders By Icons and add required folder
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayerName = myIconsSublayers_1[j].name;
                var destFolder_9 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayerName, "/").concat(name300x300_1));
                if (!destFolder_9.exists)
                    destFolder_9.create();
            }
            // loop through all Folders By Colors and add required folder
            for (var j = 1; j < sourceDoc_1.layers.length; j++) {
                var colorLayerName = sourceDoc_1.layers[j].name;
                var destFolder_10 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByColor_1, "/").concat(colorLayerName, "/").concat(name300x300_1));
                if (!destFolder_10.exists)
                    destFolder_10.create();
            }
        }
        create300x300Folders();
        function create512x512Folders() {
            var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(name512x512_1));
            if (!destFolder.exists)
                destFolder.create();
            // loop through all Folders By Icons and add required folder
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayerName = myIconsSublayers_1[j].name;
                var destFolder_11 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayerName, "/").concat(name512x512_1));
                if (!destFolder_11.exists)
                    destFolder_11.create();
            }
            // loop through all Folders By Colors and add required folder
            for (var j = 1; j < sourceDoc_1.layers.length; j++) {
                var colorLayerName = sourceDoc_1.layers[j].name;
                var destFolder_12 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByColor_1, "/").concat(colorLayerName, "/").concat(name512x512_1));
                if (!destFolder_12.exists)
                    destFolder_12.create();
            }
        }
        create512x512Folders();
        function createSVGFolders() {
            var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(nameSVG_1));
            if (!destFolder.exists)
                destFolder.create();
            // loop through all Folders By Icons and add required folder
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayerName = myIconsSublayers_1[j].name;
                var destFolder_13 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayerName, "/").concat(nameSVG_1));
                if (!destFolder_13.exists)
                    destFolder_13.create();
            }
            // loop through all Folders By Colors and add required folder
            for (var j = 1; j < sourceDoc_1.layers.length; j++) {
                var colorLayerName = sourceDoc_1.layers[j].name;
                var destFolder_14 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByColor_1, "/").concat(colorLayerName, "/").concat(nameSVG_1));
                if (!destFolder_14.exists)
                    destFolder_14.create();
            }
        }
        createSVGFolders();
        function createEPSFolders() {
            var destFolder = Folder("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(nameEPS_1));
            if (!destFolder.exists)
                destFolder.create();
            // loop through all Folders By Icons and add required folder
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayerName = myIconsSublayers_1[j].name;
                var destFolder_15 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayerName, "/").concat(nameEPS_1));
                if (!destFolder_15.exists)
                    destFolder_15.create();
            }
            // loop through all Folders By Colors and add required folder
            for (var j = 1; j < sourceDoc_1.layers.length; j++) {
                var colorLayerName = sourceDoc_1.layers[j].name;
                var destFolder_16 = Folder("".concat(sourceDoc_1.path, "/").concat(nameByColor_1, "/").concat(colorLayerName, "/").concat(nameEPS_1));
                if (!destFolder_16.exists)
                    destFolder_16.create();
            }
        }
        createEPSFolders();
    }
    catch (e) {
        alert("Something went wrong while creating the folders.", e.message);
    }
    /**********************************
     ** MAIN EXPORT LOOP
     ***********************************/
    try {
        function saveAsPNGAt24x24(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(name24x24_1, "/").concat(iconLayer.name).concat(layerName, ".png"));
                var type = ExportType.PNG24;
                var opts = new ExportOptionsPNG24();
                ExportOptionsPNG24.antiAliasing = false;
                ExportOptionsPNG24.transparency = true;
                ExportOptionsPNG24.artBoardClipping = true;
                ExportOptionsPNG24.horizontalScale = 9.375; // 24px x 24px
                ExportOptionsPNG24.verticalScale = 9.375; // 24px x 24px
                sourceDoc_1.exportFile(pngFile, type, opts);
                iconLayer.visible = false;
            }
        }
        function saveAsPNGAt32x32(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(name32x32_1, "/").concat(iconLayer.name).concat(layerName, ".png"));
                var type = ExportType.PNG24;
                var opts = new ExportOptionsPNG24();
                ExportOptionsPNG24.antiAliasing = false;
                ExportOptionsPNG24.transparency = true;
                ExportOptionsPNG24.artBoardClipping = true;
                ExportOptionsPNG24.horizontalScale = 12.5; // 32px x 32px
                ExportOptionsPNG24.verticalScale = 12.5; // 32px x 32px
                sourceDoc_1.exportFile(pngFile, type, opts);
                iconLayer.visible = false;
            }
        }
        function saveAsPNGAt48x48(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(name48x48_1, "/").concat(iconLayer.name).concat(layerName, ".png"));
                var type = ExportType.PNG24;
                var opts = new ExportOptionsPNG24();
                ExportOptionsPNG24.antiAliasing = false;
                ExportOptionsPNG24.transparency = true;
                ExportOptionsPNG24.artBoardClipping = true;
                ExportOptionsPNG24.horizontalScale = 18.75; // 48px x 48px
                ExportOptionsPNG24.verticalScale = 18.75; // 48px x 48px
                sourceDoc_1.exportFile(pngFile, type, opts);
                iconLayer.visible = false;
            }
        }
        function saveAsPNGAt64x64(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(name64x64_1, "/").concat(iconLayer.name).concat(layerName, ".png"));
                var type = ExportType.PNG24;
                var opts = new ExportOptionsPNG24();
                ExportOptionsPNG24.antiAliasing = false;
                ExportOptionsPNG24.transparency = true;
                ExportOptionsPNG24.artBoardClipping = true;
                ExportOptionsPNG24.horizontalScale = 25; // 300px x 300px
                ExportOptionsPNG24.verticalScale = 25; // 300px x 300px
                sourceDoc_1.exportFile(pngFile, type, opts);
                iconLayer.visible = false;
            }
        }
        function saveAsPNGAt300x300(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(name300x300_1, "/").concat(iconLayer.name).concat(layerName, ".png"));
                var type = ExportType.PNG24;
                var opts = new ExportOptionsPNG24();
                ExportOptionsPNG24.antiAliasing = false;
                ExportOptionsPNG24.transparency = true;
                ExportOptionsPNG24.artBoardClipping = true;
                ExportOptionsPNG24.horizontalScale = 117.2; // 300px x 300px
                ExportOptionsPNG24.verticalScale = 117.2; // 300px x 300px
                sourceDoc_1.exportFile(pngFile, type, opts);
                iconLayer.visible = false;
            }
        }
        function saveAsPNGAt512x512(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(name512x512_1, "/").concat(iconLayer.name).concat(layerName, ".png"));
                var type = ExportType.PNG24;
                var opts = new ExportOptionsPNG24();
                ExportOptionsPNG24.antiAliasing = false;
                ExportOptionsPNG24.transparency = true;
                ExportOptionsPNG24.artBoardClipping = true;
                ExportOptionsPNG24.horizontalScale = 200;
                ExportOptionsPNG24.verticalScale = 200;
                sourceDoc_1.exportFile(pngFile, type, opts);
                iconLayer.visible = false;
            }
        }
        function saveAsSVG(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var svgFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(nameSVG_1, "/").concat(iconLayer.name).concat(layerName));
                var aiFile = new File("".concat(sourceDoc_1.path, "/").concat(sourceDoc_1.name));
                var type = ExportType.SVG;
                ExportOptionsSVG.optimizeForSVGViewer = true;
                ExportOptionsSVG.saveMultipleArtboards = true;
                sourceDoc_1.exportFile(svgFile, type);
                iconLayer.visible = false;
                // redeclare what and where to original to avoid SVG export MEGA bug
                DocumentType.ILLUSTRATOR;
                sourceDoc_1.saveAs(aiFile);
            }
        }
        function saveAsEPS(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var epsFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByDimensions_1, "/").concat(nameEPS_1, "/").concat(iconLayer.name).concat(layerName, ".eps"));
                var aiFile = new File("".concat(sourceDoc_1.path, "/").concat(sourceDoc_1.name));
                var opts = new EPSSaveOptions();
                EPSSaveOptions.cmykPostScript = false;
                EPSSaveOptions.embedAllFonts = false;
                EPSSaveOptions.artboardRange = "";
                EPSSaveOptions.embedLinkedFiles = true;
                EPSSaveOptions.includeDocumentThumbnails = true;
                EPSSaveOptions.saveMultipleArtboards = true;
                sourceDoc_1.saveAs(epsFile, opts);
                iconLayer.visible = false;
                DocumentType.ILLUSTRATOR;
                sourceDoc_1.saveAs(aiFile);
            }
        }
        /**********************************
         ** Save to By Icon Folder
         ***********************************/
        function saveAsPNGAt24x24ByIcon(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayer.name, "/").concat(name24x24_1, "/").concat(iconLayer.name).concat(layerName, ".png"));
                var type = ExportType.PNG24;
                var opts = new ExportOptionsPNG24();
                ExportOptionsPNG24.antiAliasing = false;
                ExportOptionsPNG24.transparency = true;
                ExportOptionsPNG24.artBoardClipping = true;
                ExportOptionsPNG24.horizontalScale = 9.375; // 24px x 24px
                ExportOptionsPNG24.verticalScale = 9.375; // 24px x 24px
                sourceDoc_1.exportFile(pngFile, type, opts);
                iconLayer.visible = false;
            }
        }
        function saveAsPNGAt32x32ByIcon(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayer.name, "/").concat(name32x32_1, "/").concat(iconLayer.name).concat(layerName, ".png"));
                var type = ExportType.PNG24;
                var opts = new ExportOptionsPNG24();
                ExportOptionsPNG24.antiAliasing = false;
                ExportOptionsPNG24.transparency = true;
                ExportOptionsPNG24.artBoardClipping = true;
                ExportOptionsPNG24.horizontalScale = 12.5; // 32px x 32px
                ExportOptionsPNG24.verticalScale = 12.5; // 32px x 32px
                sourceDoc_1.exportFile(pngFile, type, opts);
                iconLayer.visible = false;
            }
        }
        function saveAsPNGAt48x48ByIcon(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayer.name, "/").concat(name48x48_1, "/").concat(iconLayer.name).concat(layerName, ".png"));
                var type = ExportType.PNG24;
                var opts = new ExportOptionsPNG24();
                ExportOptionsPNG24.antiAliasing = false;
                ExportOptionsPNG24.transparency = true;
                ExportOptionsPNG24.artBoardClipping = true;
                ExportOptionsPNG24.horizontalScale = 18.75; // 48px x 48px
                ExportOptionsPNG24.verticalScale = 18.75; // 48px x 48px
                sourceDoc_1.exportFile(pngFile, type, opts);
                iconLayer.visible = false;
            }
        }
        function saveAsPNGAt64x64ByIcon(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayer.name, "/").concat(name64x64_1, "/").concat(iconLayer.name).concat(layerName, ".png"));
                var type = ExportType.PNG24;
                var opts = new ExportOptionsPNG24();
                ExportOptionsPNG24.antiAliasing = false;
                ExportOptionsPNG24.transparency = true;
                ExportOptionsPNG24.artBoardClipping = true;
                ExportOptionsPNG24.horizontalScale = 25; // 300px x 300px
                ExportOptionsPNG24.verticalScale = 25; // 300px x 300px
                sourceDoc_1.exportFile(pngFile, type, opts);
                iconLayer.visible = false;
            }
        }
        function saveAsPNGAt300x300ByIcon(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayer.name, "/").concat(name300x300_1, "/").concat(iconLayer.name).concat(layerName, ".png"));
                var type = ExportType.PNG24;
                var opts = new ExportOptionsPNG24();
                ExportOptionsPNG24.antiAliasing = false;
                ExportOptionsPNG24.transparency = true;
                ExportOptionsPNG24.artBoardClipping = true;
                ExportOptionsPNG24.horizontalScale = 117.2; // 300px x 300px
                ExportOptionsPNG24.verticalScale = 117.2; // 300px x 300px
                sourceDoc_1.exportFile(pngFile, type, opts);
                iconLayer.visible = false;
            }
        }
        function saveAsPNGAt512x512ByIcon(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayer.name, "/").concat(name512x512_1, "/").concat(iconLayer.name).concat(layerName, ".png"));
                var type = ExportType.PNG24;
                var opts = new ExportOptionsPNG24();
                ExportOptionsPNG24.antiAliasing = false;
                ExportOptionsPNG24.transparency = true;
                ExportOptionsPNG24.artBoardClipping = true;
                ExportOptionsPNG24.horizontalScale = 200;
                ExportOptionsPNG24.verticalScale = 200;
                sourceDoc_1.exportFile(pngFile, type, opts);
                iconLayer.visible = false;
            }
        }
        function saveAsSVGByIcon(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var svgFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayer.name, "/").concat(nameSVG_1, "/").concat(iconLayer.name).concat(layerName));
                var aiFile = new File("".concat(sourceDoc_1.path, "/").concat(sourceDoc_1.name));
                var type = ExportType.SVG;
                ExportOptionsSVG.optimizeForSVGViewer = true;
                ExportOptionsSVG.saveMultipleArtboards = true;
                sourceDoc_1.exportFile(svgFile, type);
                iconLayer.visible = false;
                // redeclare what and where to original to avoid SVG export MEGA bug
                DocumentType.ILLUSTRATOR;
                sourceDoc_1.saveAs(aiFile);
            }
        }
        function saveAsEPSByIcon(layerName) {
            for (var j = 0; j < myIconsSublayers_1.length; j++) {
                var iconLayer = myIconsSublayers_1[j];
                iconLayer.visible = true;
                var epsFile = new File("".concat(sourceDoc_1.path, "/").concat(nameByIcon_1, "/").concat(iconLayer.name, "/").concat(nameEPS_1, "/").concat(iconLayer.name).concat(layerName, ".eps"));
                var aiFile = new File("".concat(sourceDoc_1.path, "/").concat(sourceDoc_1.name));
                var opts = new EPSSaveOptions();
                EPSSaveOptions.cmykPostScript = false;
                EPSSaveOptions.embedAllFonts = false;
                EPSSaveOptions.artboardRange = "";
                EPSSaveOptions.embedLinkedFiles = true;
                EPSSaveOptions.includeDocumentThumbnails = true;
                EPSSaveOptions.saveMultipleArtboards = true;
                sourceDoc_1.saveAs(epsFile, opts);
                iconLayer.visible = false;
                DocumentType.ILLUSTRATOR;
                sourceDoc_1.saveAs(aiFile);
            }
        }
    }
    catch (e) {
        alert("Something went wrong while trying to export the icons.", e.message);
    }
    /**********************************
     ** LOOP LAYER VISIBILITY OF ICONS AGAINST BACKGROUND COLORS AND EXECUTE SAVE EXPORT FUNCTIONS
     ***********************************/
    for (var i = 1; i < sourceDoc_1.layers.length; i++) {
        var bgLayer = sourceDoc_1.layers[i];
        bgLayer.visible = true;
        // Save them to sorted-by-dimensions
        saveAsPNGAt24x24(bgLayer.name);
        saveAsPNGAt32x32(bgLayer.name);
        saveAsPNGAt48x48(bgLayer.name);
        saveAsPNGAt64x64(bgLayer.name);
        saveAsPNGAt300x300(bgLayer.name);
        saveAsPNGAt512x512(bgLayer.name);
        saveAsSVG(bgLayer.name);
        saveAsEPS(bgLayer.name);
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
        bgLayer.visible = false;
    }
    // revert the doc from a .svg to a .ai, I don't want it to be svg!
    DocumentType.ILLUSTRATOR;
    sourceDoc_1.save();
    // close the document here without saving, uncomment for prod
    // app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}
catch (e) {
    alert(e.message);
}
