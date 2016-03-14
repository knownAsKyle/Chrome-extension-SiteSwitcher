(function() {
    function click(e) {
        var queryValues = {};
        queryValues.currentWindow = true;
        queryValues.active = true;
        chrome.tabs.query(queryValues, handleQuery);

        function handleQuery(tabs) {
            chrome.tabs.insertCSS(tabs[0].id, {
                "file": "style.css"
            });
            chrome.tabs.executeScript(tabs[0].id, {
                "file": "script.js"
            });
        }
    }
    chrome.browserAction.onClicked.addListener(click);
})();