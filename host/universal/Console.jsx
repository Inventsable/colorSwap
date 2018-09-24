JSXEvent('Host online', 'console')

function runScript(path) {
  try {
  $.evalFile(path)
  } catch (e) {
    JSXEvent(e.name + "," + e.line + "," + e + "," + e.message, "console")
  }
}

function JSXEvent(payload, eventType) {
  try {
    var xLib = new ExternalObject("lib:\PlugPlugExternalObject");
  } catch (e) {
    JSXEvent(e, 'console')
  }
  if (xLib) {
  var eventObj = new CSXSEvent();
  eventObj.type = eventType;
  eventObj.data = payload;
  eventObj.dispatch();
  }
  return;
}

var console = {
  log : function(data) {JSXEvent(data, 'console')}
};
