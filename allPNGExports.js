try {
    /**********************************
     ** README https://github.com/Artchibald/WTW-illustrator-script
    
    helpers:
      alert("App V  ersion : ", app.version);
    alert("App Scripting Version: ", app.scriptingVersion);
     ***********************************/
    /**********************************
     ** INSTRUCTIONS DIALOG
     ***********************************/
    // alert(
    //   "Artboard size must be exactly 256px x 256px. \n\n Guides must be on a layer called exactly 'Guides (DO NOT MOVE)'. \n\n Make sure all layers and sublayers are invisible and unlocked to avoid bugs. \n\n Make sure all icons are on sublayers inside the layer called 'icons' with correct naming. \n\n Make sure all background colors are on individual layers after the icons layer with correct layer names.Exported assets will be saved where the.ai file is saved. \n\n The document will close without saving changes when complete so make sure you have saved your work so you can re - open it."
    // );
    /**********************************
     ** MAKE ICONS LAYER VISIBLE
     ***********************************/
    try {
        // alert(app.version);
        app.activeDocument.layers["icons"].visible = true;
    }
    catch (e) {
        alert("can't locate the top level layer called 'icons', the script won't work without it.", e.message);
    }
    /**********************************
     ** REMOVE GUIDES LAYER
     ***********************************/
    try {
        var guideLayer = app.activeDocument.layers["Guides (DO NOT MOVE)"];
        guideLayer.visible = true;
        guideLayer.locked = false;
        guideLayer.remove();
    }
    catch (e) {
        alert("the guide layer doesn't exist, the script will still work though.", e.message);
    }
    /**********************************
     ** CREATE REQUIRED FOLDERS
     ***********************************/
    try {
        var sourceDoc_1 = app.activeDocument;
        var name300x300_1 = "300x300";
        var name512x512_1 = "512x512";
        var name64x64_1 = "64x64";
        var name48x48_1 = "48x48";
        var name32x32_1 = "32x32";
        var name24x24_1 = "24x24";
        var nameSVG_1 = "SVG";
        var nameEPS_1 = "EPS";
        function create24x24Folder() {
            var destFolder = Folder(sourceDoc_1.path + "/" + name24x24_1);
            if (!destFolder.exists)
                destFolder.create();
        }
        create24x24Folder();
        function create32x32Folder() {
            var destFolder = Folder(sourceDoc_1.path + "/" + name32x32_1);
            if (!destFolder.exists)
                destFolder.create();
        }
        create32x32Folder();
        function create48x48Folder() {
            var destFolder = Folder(sourceDoc_1.path + "/" + name48x48_1);
            if (!destFolder.exists)
                destFolder.create();
        }
        create48x48Folder();
        function create64x64Folder() {
            var destFolder = Folder(sourceDoc_1.path + "/" + name64x64_1);
            if (!destFolder.exists)
                destFolder.create();
        }
        create64x64Folder();
        function create300x300Folder() {
            var destFolder = Folder(sourceDoc_1.path + "/" + name300x300_1);
            if (!destFolder.exists)
                destFolder.create();
        }
        create300x300Folder();
        function create512x512Folder() {
            var destFolder = Folder(sourceDoc_1.path + "/" + name512x512_1);
            if (!destFolder.exists)
                destFolder.create();
        }
        create512x512Folder();
        function createSVGFolder() {
            var destFolder = Folder(sourceDoc_1.path + "/" + nameSVG_1);
            if (!destFolder.exists)
                destFolder.create();
        }
        createSVGFolder();
        function createEPSFolder() {
            var destFolder = Folder(sourceDoc_1.path + "/" + nameEPS_1);
            if (!destFolder.exists)
                destFolder.create();
        }
        createEPSFolder();
    }
    catch (e) {
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
            for (var j = 0; j < myIconsSublayers.length; j++) {
                var iconLayer = myIconsSublayers[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(app.activeDocument.path, "/24x24/").concat(iconLayer.name).concat(layerName, ".png"));
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
            for (var j = 0; j < myIconsSublayers.length; j++) {
                var iconLayer = myIconsSublayers[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(app.activeDocument.path, "/32x32/").concat(iconLayer.name).concat(layerName, ".png"));
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
            for (var j = 0; j < myIconsSublayers.length; j++) {
                var iconLayer = myIconsSublayers[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(app.activeDocument.path, "/48x48/").concat(iconLayer.name).concat(layerName, ".png"));
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
            for (var j = 0; j < myIconsSublayers.length; j++) {
                var iconLayer = myIconsSublayers[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(app.activeDocument.path, "/64x64/").concat(iconLayer.name).concat(layerName, ".png"));
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
            for (var j = 0; j < myIconsSublayers.length; j++) {
                var iconLayer = myIconsSublayers[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(app.activeDocument.path, "/300x300/").concat(iconLayer.name).concat(layerName, ".png"));
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
            for (var j = 0; j < myIconsSublayers.length; j++) {
                var iconLayer = myIconsSublayers[j];
                iconLayer.visible = true;
                var pngFile = new File("".concat(app.activeDocument.path, "/512x512/").concat(iconLayer.name).concat(layerName, ".png"));
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
        // it turns it into a svg
        // you must duplicate the ai file before you export svg!
        function saveAsSVG(layerName) {
            var myIconsLayer = app.activeDocument.layers["icons"];
            var myIconsSublayers = myIconsLayer.layers;
            for (var k = 0; k < myIconsSublayers.length; k++) {
                var iconLayer = myIconsSublayers[k];
                iconLayer.visible = true;
                var svgFile = new File("".concat(app.activeDocument.path, "/").concat(iconLayer.name).concat(layerName));
                var type = ExportType.SVG;
                app.activeDocument.exportFile(svgFile, type);
                iconLayer.visible = false;
            }
        }
        function saveAsEPS(layerName) {
            var myIconsLayer = app.activeDocument.layers["icons"];
            var myIconsSublayers = myIconsLayer.layers;
            for (var k = 0; k < myIconsSublayers.length; k++) {
                var iconLayer = myIconsSublayers[k];
                iconLayer.visible = true;
                var svgFile = new File("".concat(app.activeDocument.path, "/").concat(iconLayer.name).concat(layerName));
                var type = ExportType.SVG;
                app.activeDocument.exportFile(svgFile, type);
                iconLayer.visible = false;
            }
        }
        // function saveAsEPS(layerName) {
        //   // target icons sublayers
        //   var myIconsLayer = app.activeDocument.layers["icons"];
        //   var myIconsSublayers = myIconsLayer.layers;
        //   // loop through icons and export svg for each
        //   for (let j = 0; j < myIconsSublayers.length; j++) {
        //     var iconLayer = myIconsSublayers[j];
        //     iconLayer.visible = true;
        //     var epsFile = new File(
        //       `${app.activeDocument.path}/EPS/${iconLayer.name}${layerName}.eps`
        //     );
        //     // var type = ExportType.PNG24;
        //     var opts = new EPSSaveOptions();
        //     EPSSaveOptions.cmykPostScript = false;
        //     EPSSaveOptions.embedAllFonts = false;
        //     EPSSaveOptions.artboardRange = "";
        //     EPSSaveOptions.embedLinkedFiles = true;
        //     EPSSaveOptions.includeDocumentThumbnails = true;
        //     EPSSaveOptions.saveMultipleArtboards = true;
        //     app.activeDocument.saveAs(epsFile, opts);
        //     iconLayer.visible = false;
        //   }
        // }
    }
    catch (e) {
        alert("Something went wrong while trying to export the icons.", e.message);
    }
    /**********************************
     ** LOOP LAYER VISIBILITY OF ICONS AGAINST BACKGROUND COLORS AND EXECUTE SAVE FUNCTIONS
     ***********************************/
    for (var i = 1; i < app.activeDocument.layers.length; i++) {
        var bgLayer = app.activeDocument.layers[i];
        bgLayer.visible = true;
        saveAsPNGAt24x24(bgLayer.name);
        saveAsPNGAt32x32(bgLayer.name);
        saveAsPNGAt48x48(bgLayer.name);
        saveAsPNGAt64x64(bgLayer.name);
        saveAsPNGAt300x300(bgLayer.name);
        saveAsPNGAt512x512(bgLayer.name);
        // saveAsSVG(bgLayer.name);
        saveAsEPS(bgLayer.name);
        bgLayer.visible = false;
    }
    // alert(app.activeDocument.layers["icons"].name);
    // close the document here without saving
    // app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}
catch (e) {
    alert(e.message);
}
