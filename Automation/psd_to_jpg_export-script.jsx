#target "photoshop"
 
var outputWidth = 1024;
var inputFolder = Folder.selectDialog("Input folder");
var outputFolder = Folder.selectDialog("Output folder");

    function scanSubFolders(tFolder, mask) {
        var sFolders = tFolder;
        var procFiles = sFolders.getFiles();
        for (var i = 0; i < procFiles.length; i++) {
            if (procFiles[i] instanceof File && procFiles[i].fullName.search(mask) != -1) {
              // disable display of the dialogs during automation process
              app.displayDialogs = DialogModes.NO;

              var doc = app.open(procFiles[i]);

              if (doc.width > outputWidth) {
                    var height = (doc.height / doc.width) * outputWidth;
                    doc.resizeImage(outputWidth + "px", height + "px");
                }
         
                    var outputFolderNew;

                if (inputFolder.name === sFolders.name) {
                    outputFolderNew = outputFolder;
                    
                } else {
                    outputFolderNew = new Folder( outputFolder + '/' + sFolders.name);
                    if ( ! outputFolderNew.exists ) {
                        outputFolderNew.create();
                    }
                }
         
                doc.saveAs(outputFolderNew, JPEGSaveOptions);
                doc.close(SaveOptions.DONOTSAVECHANGES);
                $.writeln('File ' + (i + 1) + ' of ' + ' processed');
            } else if (procFiles[i] instanceof Folder){
                scanSubFolders(procFiles[i], mask); // search the subfolder  
            }  
        }
    }

    scanSubFolders(inputFolder, /\.(jpg|tif|psd|bmp|gif|png|)$/i);