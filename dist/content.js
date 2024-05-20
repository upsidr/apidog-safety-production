/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
function showDialog(callback, cancelCallback) {
  console.log('Displaying confirmation dialog');
  if (confirm("これは本番環境です。リクエストを送信しますか？")) {
    callback();
  } else {
    cancelCallback();
  }
}
var programmaticClick = false;
function attachButtonListener(targetButton) {
  if (targetButton && !targetButton.dataset.listenerAttached) {
    console.log('Listener attached');
    targetButton.dataset.listenerAttached = 'true';
    var handler = function handler(event) {
      event.preventDefault();
      if (!programmaticClick) {
        showDialog(function () {
          programmaticClick = true;
          targetButton.click();
          programmaticClick = false;
          console.log('Request executed');
        }, function () {
          event.stopPropagation();
          console.log('Request cancelled');
        });
      }
    };
    targetButton.addEventListener('click', handler, true);
  }
}
var observer = new MutationObserver(function () {
  var targetButton = document.querySelector('button[title="⌘ ⏎"].ui-btn.ui-btn-primary.ui-btn-compact-item.ui-btn-compact-first-item');
  var env = document.querySelector('div.panel-group-panel-wrapper  div.ui-select-selector span.flex.items-center.truncate.block');
  if (targetButton && env && env.getAttribute('title') === 'Production環境') {
    attachButtonListener(targetButton);
  }
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
/******/ })()
;
//# sourceMappingURL=content.js.map