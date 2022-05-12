try {
  alert(
    "Make sure all icons are inside the layer called 'icons'. Make sure all background colors are on individual layers after the icons layer."
  );

  // create 512x512 folder if it doesn't exist
  function create512x512Folder() {
    var sourceDoc = app.activeDocument;
    var name = "512x512";
    var destFolder = Folder(sourceDoc.path + "/" + name);
    if (!destFolder.exists) destFolder.create();
  }
  create512x512Folder();

  function saveAsPNGAt512x512IconBg(layerName) {
    // target icons sublayers
    var myIconsLayer = app.activeDocument.layers["icons"];
    var myIconsSublayers = myIconsLayer.layers;
    // loop through icons and export png for each
    for (let j = 0; j < myIconsSublayers.length; j++) {
      var iconLayer = myIconsSublayers[j];
      iconLayer.visible = true;
      var pngFile = new File(
        `${app.activeDocument.path}/512x512/icon${iconLayer.name}${layerName}.png`
      );
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
  // Look through background colors and execute save them out functions.
  for (let i = 1; i < app.activeDocument.layers.length; i++) {
    var bgLayer = app.activeDocument.layers[i];
    bgLayer.visible = true;
    saveAsPNGAt512x512IconBg(bgLayer.name);
    bgLayer.visible = false;
  }
} catch (err) {
  alert(err.message);
}
