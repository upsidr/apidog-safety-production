function showDialog(callback, cancelCallback) {
    console.log('Displaying confirmation dialog');
    if (confirm("これは本番環境です。リクエストを送信しますか？")) {
        callback();
    } else {
        cancelCallback();
    }
}

let isClick = false;
function attachButtonListener(targetButton) {

    if (targetButton && !targetButton.dataset.listenerAttached) {
        console.log('Listener attached');
        targetButton.dataset.listenerAttached = 'true';

        const handler = function (event) {
            event.preventDefault();
            if (!isClick) {
                showDialog(
                    () => {
                        isClick = true;
                        targetButton.click();
                        isClick = false;
                        console.log('Request executed');
                    },
                    () => {
                        event.stopPropagation();
                        console.log('Request cancelled');
                    }
                );
            }
        };

        targetButton.addEventListener('click', handler, true);
        targetButton.handler = handler;
    }
}

function detachButtonListener(targetButton) {
    if (targetButton && targetButton.dataset.listenerAttached === 'true') {
        console.log('Listener detached');
        targetButton.removeEventListener('click', targetButton.handler, true);
        targetButton.dataset.listenerAttached = '';
        delete targetButton.handler;
    }
}

const observer = new MutationObserver(() => {
    const targetButton = document.querySelector('button[title="⌘ ⏎"].ui-btn.ui-btn-primary.ui-btn-compact-item.ui-btn-compact-first-item');
    const env = document.querySelector('div.panel-group-panel-wrapper  div.ui-select-selector span.flex.items-center.truncate.block')
    if (targetButton && env) {
        if (env.getAttribute('title') === 'Production環境') {
            attachButtonListener(targetButton);
        } else if (env.getAttribute('title') !== 'Production環境' && targetButton.dataset.listenerAttached === 'true') {
            detachButtonListener(targetButton);
        }
    }
});

observer.observe(document.body, {childList: true, subtree: true});
