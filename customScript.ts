try {
  function saveAsPNGAt512x512() {
    var pngFile = new File(
      app.activeDocument.path +
        "/" +
        app.activeDocument.name.split(".")[0] +
        ".png"
    );
    var type = ExportType.PNG24;
    var opts = new ExportOptionsPNG24();
    ExportOptionsPNG24.antiAliasing = false;
    ExportOptionsPNG24.transparency = true;
    ExportOptionsPNG24.artBoardClipping = true;
    ExportOptionsPNG24.horizontalScale = 512;
    ExportOptionsPNG24.verticalScale = 512;
    app.activeDocument.exportFile(pngFile, type, opts);
  }
  saveAsPNGAt512x512();
  // hide icons layer test
  // var doc = app.activeDocument;
  // var ilayer = doc.layers.getByName("icons");
  // ilayer.visible = false;
} catch (err) {
  alert(err.message);
}
