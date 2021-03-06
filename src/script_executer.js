chrome.runtime.onMessage.addListener(function (message, sender, resolve) {
    if (message == 'version') {
        resolve(extVersion);
    } else if (message == 'hasNewVersion') {
        resolve(hasNewVersion);
    } else if (message == 'inject') {
        let tabId = sender.tab.id,
            frameId = sender.frameId;
        injector(tabId, frameId, resolve);
        return true;
    } else if (message == 'cna') {
        fetch('https://log.mmstat.com/eg.js', {
            method: 'GET',
            credentials: 'include',
            cache: 'no-cache'
        }).then(function (r) {
            r.text().then(resolve);
        });
        return true;
    }
});

function injector(tabId, frameId, resolve) {
    let files = [
        "jquery-3.3.1.min.js",
        "google-style-loading.min.js",
        "CommentCoreLibrary.min.js",
        "biliplus_shield.min.js",
        "jquery-3.3.1.min.js",
        "ABPlayer.min.js",
        "flv.min.js",
        "youku_html5.js"
    ],
        loopFunc = function () {
            if (!files.length) {
                resolve();
                return;
            }
            let file = files.shift();
            chrome.tabs.executeScript(
                tabId,
                {
                    allFrames: false,
                    file,
                    frameId,
                    runAt: 'document_end'
                },
                loopFunc
            )
        }
    loopFunc();
}