#target "photoshop"
 
var outputWidth = 1024;
var inputFolder = Folder.selectDialog("Input folder");
var outputFolder = Folder.selectDialog("Output folder");
// var doc;
// var docRef;

function scanSubFolders(tFolder, mask, outputPath) {

    var sFolders = tFolder;
    var procFiles = sFolders.getFiles();
    var output = outputPath ? outputPath : outputFolder;

    // alert(output);

    for (var i = 0; i < procFiles.length; i++) {
        if (procFiles[i] instanceof File && procFiles[i].fullName.search(mask) != -1) {
            // disable display of the dialogs during automation process
            app.displayDialogs = DialogModes.NO;

            var doc = app.open(procFiles[i]);

            // app.refresh();

            var docRef = doc;
     
            var outputFolderNew;

            if (inputFolder.name === sFolders.name) {
                outputFolderNew = outputFolder;
                
            } else {
                outputFolderNew = new Folder( output + '/' + sFolders.name);
                if ( ! outputFolderNew.exists ) {
                    outputFolderNew.create();
                }
            }

            var allArtboards,
            artboardsCount = 0;


            function getAllArtboards() {
            try {
                var ab = [];
                var theRef = new ActionReference();
                theRef.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID("artboards"));
                theRef.putEnumerated(charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
                var getDescriptor = new ActionDescriptor();
                getDescriptor.putReference(stringIDToTypeID("null"), theRef);
                var abDesc = executeAction(charIDToTypeID("getd"), getDescriptor, DialogModes.NO).getObjectValue(stringIDToTypeID("artboards"));
                var abCount = abDesc.getList(stringIDToTypeID('list')).count;
                if (abCount > 0) {
                    for (var i = 0; i < abCount; ++i) {
                        var abObj = abDesc.getList(stringIDToTypeID('list')).getObjectValue(i);
                        var abTopIndex = abObj.getInteger(stringIDToTypeID("top"));
                        ab.push(abTopIndex);

                    }
                }
                return [abCount, ab];
                } catch (e) {
                    alert(e.line + '\n' + e.message);
                }
            }

            function selectLayerByIndex(index, add) {
                add = undefined ? add = false : add
                var ref = new ActionReference();
                ref.putIndex(charIDToTypeID("Lyr "), index + 1);
                var desc = new ActionDescriptor();
                desc.putReference(charIDToTypeID("null"), ref);
                if (add) desc.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("addToSelection"));
                desc.putBoolean(charIDToTypeID("MkVs"), false);
                executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
            }

            function ungroupLayers() {
                var desc1 = new ActionDescriptor();
                var ref1 = new ActionReference();
                ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
                desc1.putReference(charIDToTypeID('null'), ref1);
                executeAction(stringIDToTypeID('ungroupLayersEvent'), desc1, DialogModes.NO);
            }

            function crop() {
                var desc1 = new ActionDescriptor();
                desc1.putBoolean(charIDToTypeID('Dlt '), true);
                executeAction(charIDToTypeID('Crop'), desc1, DialogModes.NO);
            }

            function saveAsJPG(_name) {
                app.activeDocument.saveAs(outputFolderNew, JPEGSaveOptions, true);
            }

            function main(i) {
                app.displayDialogs = DialogModes.NO;
                selectLayerByIndex(allArtboards[1][i]);
                var artboardName = app.activeDocument.activeLayer.name;
                executeAction(stringIDToTypeID("newPlacedLayer"), undefined, DialogModes.NO);
                executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO);
                app.activeDocument.selection.selectAll();
                ungroupLayers();
                // crop();
                saveAsJPG(artboardName);
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            }


            allArtboards = getAllArtboards();

            artboardsCount = allArtboards[0];

            if (artboardsCount && false) {
                outputFolderNew = new Folder( outputFolderNew + '/' + procFiles[i].name);
                if ( ! outputFolderNew.exists ) {
                    outputFolderNew.create();
                }

                for (var i = 0; i < artboardsCount; i++) {
                    docRef.suspendHistory('Save Artboard as PSD', 'main(' + i + ')');
                    app.refresh();
                    app.activeDocument.activeHistoryState = app.activeDocument.historyStates[app.activeDocument.historyStates.length - 2];
                }
         
                // doc.saveAs(outputFolderNew, JPEGSaveOptions);
                // doc.close(SaveOptions.DONOTSAVECHANGES);
                docRef.close(SaveOptions.DONOTSAVECHANGES);
                // $.writeln('File ' + (i + 1) + ' of ' + ' processed');
            } else {
                doc.saveAs(outputFolderNew, JPEGSaveOptions);
                doc.close(SaveOptions.DONOTSAVECHANGES);
                $.writeln('File ' + (i + 1) + ' of ' + ' processed');
            }
            
        } else if (procFiles[i] instanceof Folder){
            scanSubFolders(procFiles[i], mask, output); // search the subfolder  
        }  
    }
}

scanSubFolders(inputFolder, /\.(psd)$/i);

