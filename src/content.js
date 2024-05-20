function showDialog(callback, cancelCallback) {
    console.log('Displaying confirmation dialog');
    if (confirm("これは本番環境です。リクエストを送信しますか？")) {
        callback();
    } else {
        cancelCallback();
    }
}

let programmaticClick = false;

function attachButtonListener(targetButton) {
    if (targetButton && !targetButton.dataset.listenerAttached) {
        console.log('Listener attached');
        targetButton.dataset.listenerAttached = 'true';

        const handler = function (event) {
            event.preventDefault();
            if (!programmaticClick) {
                showDialog(
                    () => {
                        programmaticClick = true;
                        targetButton.click();
                        programmaticClick = false;
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
    }
}

const observer = new MutationObserver(() => {
    const targetButton = document.querySelector('button[title="⌘ ⏎"].ui-btn.ui-btn-primary.ui-btn-compact-item.ui-btn-compact-first-item');
    const env = document.querySelector('div.panel-group-panel-wrapper  div.ui-select-selector span.flex.items-center.truncate.block')
    if (targetButton && env && env.getAttribute('title') === 'Production環境') {
        attachButtonListener(targetButton);
    }
});

observer.observe(document.body, {childList: true, subtree: true});
