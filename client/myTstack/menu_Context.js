var csInterface = new CSInterface();
var menu_ContextFlip = false;

var menu_ContextXML = '<Menu> \
   <MenuItem Id="refresh" Label="Refresh panel" Enabled="true" Checked="false"/> \
   <MenuItem Label="---" /> \
  </Menu>';
  // <MenuItem Id="width" Label="Check width" Enabled="true" Checked="false"/> \

csInterface.setContextMenu(menu_ContextXML, setContextMenuCallback);

function setContextMenuCallback(event) {
  if (event == "refresh") {
    location.reload();
  } else if (event == "width") {
    alert(window.innerWidth);
  } else if (event === 'check') {
    menu_ContextFlip = !menu_ContextFlip;
    console.log(`${event} is ${menu_ContextFlip}`);
  } else {
    console.log(event);
  }
}
