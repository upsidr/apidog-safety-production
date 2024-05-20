function showDialog(callback, cancelCallback) {
    console.log('Displaying confirmation dialog');
    if (confirm("これは本番環境です。リクエストを送信しますか？")) {
        callback();
    } else {
        cancelCallback();
    }
}

function attachButtonListener(targetButton) {
    targetButton.dataset.listenerAttached = 'true';
    targetButton.dataset.clicked = '';
    const handler = function (event) {
        event.preventDefault();
        if (!targetButton.dataset.clicked) {
            targetButton.dataset.clicked = 'true';
            showDialog(
                () => {
                    targetButton.removeEventListener('click', handler, true);
                    targetButton.click();
                    targetButton.dataset.clicked = '';
                    targetButton.addEventListener('click', handler, true);
                    console.log('Request executed');
                },
                () => {
                    targetButton.dataset.clicked = '';
                    event.stopPropagation();
                    console.log('Request cancelled');
                }
            );
        }
    };

    targetButton.addEventListener('click', handler, true);
    targetButton.handler = handler;
    console.log('Listener attached');
}

function detachButtonListener(targetButton) {
    if (targetButton.handler) {
        targetButton.removeEventListener('click', targetButton.handler, true);
        targetButton.dataset.listenerAttached = '';
        delete targetButton.handler;
        console.log('Listener detached');
    }
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const env = document.querySelector('div.panel-group-panel-wrapper div.ui-select-selector span.flex.items-center.truncate.block');
                const targetButtons = document.querySelectorAll('button[title="⌘ ⏎"].ui-btn.ui-btn-primary.ui-btn-compact-item.ui-btn-compact-first-item');

                targetButtons.forEach(targetButton => {
                    if (env && env.getAttribute('title') === 'Production環境') {
                        if (!targetButton.dataset.listenerAttached) {
                            attachButtonListener(targetButton);
                        }
                    } else {
                        if (targetButton.dataset.listenerAttached === 'true') {
                            detachButtonListener(targetButton);
                        }
                    }
                });
            }
        });
    });
});

observer.observe(document.body, {childList: true, subtree: true, attributes: true, attributeFilter: ['title']});
