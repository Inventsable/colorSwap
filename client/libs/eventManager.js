(function () {
  'use strict';

  var csInterface = new CSInterface();

  csInterface.addEventListener('com.init', function(evt) {
    console.log("Initializing console");
  });

  csInterface.addEventListener('console', function(evt) {
    console.log('JSX: ' + evt.data);
  });

  csInterface.addEventListener('com.playwrite.answer', function(evt) {
    // var data = trimEdges(evt.data, 1);
    console.log(evt);
  });

  csInterface.addEventListener('mighty.rollcall', function(evt) {
    dispatchEvent('mighty.rollanswer', extFolder())
  });

  function dispatchEvent(name, data) {
  	var event = new CSEvent(name, 'APPLICATION');
  	event.data = data;
  	csInterface.dispatchEvent(event);
  }

  csInterface.addEventListener("com.adobe.csxs.events.flyoutMenuClicked", log);
    function log(event){
    console.log(event);
  }

  function extFolder(){
    var str = csInterface.getSystemPath(SystemPath.EXTENSION);
    var parent = str.substring(str.lastIndexOf('/') + 1, str.length);
    return parent;
  }

  function loadJSX(fileName) {
      var csInterface = new CSInterface();
      var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/host/";
      csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
  		console.log("loading " + extensionRoot + fileName);
  }

  function loadUniversalJSXLibraries() {
      var libs = ["json2.jsx", "Console.jsx"];
      var csInterface = new CSInterface();
      var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/host/universal/";
      for (var i = 0; i < libs.length; i++) {
        csInterface.evalScript('$.evalFile("' + extensionRoot + libs[i] + '")');
        console.log("loading " + extensionRoot + libs[i]);
      }
  }

}());
