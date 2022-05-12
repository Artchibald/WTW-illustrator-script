try {
    function saveAsPNGAt512x512IconBg(layerName) {
        // target icons sublayer WORKING
        var myIconsLayer = app.activeDocument.layers["icons"];
        var myIconsSublayers = myIconsLayer.layers;
        for (var j = 0; j < myIconsSublayers.length; j++) {
            var iconLayer = myIconsSublayers[j];
            iconLayer.visible = true;
            var pngFile = new File("".concat(app.activeDocument.path, "/512x512/icon").concat(iconLayer.name).concat(layerName, ".png"));
            var type = ExportType.PNG24;
            var opts = new ExportOptionsPNG24();
            ExportOptionsPNG24.antiAliasing = false;
            ExportOptionsPNG24.transparency = true;
            ExportOptionsPNG24.artBoardClipping = true;
            ExportOptionsPNG24.horizontalScale = 512;
            ExportOptionsPNG24.verticalScale = 512;
            app.activeDocument.exportFile(pngFile, type, opts);
            iconLayer.visible = false;
        }
    }
    for (var i = 1; i < app.activeDocument.layers.length; i++) {
        var bgLayer = app.activeDocument.layers[i];
        bgLayer.visible = true;
        saveAsPNGAt512x512IconBg(bgLayer.name);
        bgLayer.visible = false;
    }
}
catch (err) {
    alert(err.message);
}
