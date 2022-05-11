try {
  function saveAsPNG() {
    var pngFile = new File(
      app.activeDocument.path +
        "/" +
        app.activeDocument.name.split(".")[0] +
        ".png"
    );
    var resolution = 72;
    var opts = new ImageCaptureOptions();
    ImageCaptureOptions.resolution = resolution;
    ImageCaptureOptions.antiAliasing = true;
    ImageCaptureOptions.transparency = true;
    try {
      app.activeDocument.imageCapture(
        pngFile,
        app.activeDocument.geometricBounds,
        opts
      );
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    } catch (e) {}
  }

  saveAsPNG();
} catch (err) {
  alert(err.message);
}
