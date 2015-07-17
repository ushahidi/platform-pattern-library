var ltrButton = document.getElementById('button-ltr');
var rtlButton = document.getElementById('button-rtl');

function changeStylesheet(sheet) {
   document.getElementById('stylesheet').setAttribute('href', sheet);
}

ltrButton.onclick = function () {
  changeStylesheet('../../css/style.css');
};

rtlButton.onclick = function () {
  changeStylesheet('../../css/rtl-style.css');
};
