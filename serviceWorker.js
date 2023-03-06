const cherryURL = 'https://cherry.local.com';

chrome.omnibox.onInputEntered.addListener(function(text) {
    chrome.tabs.create({url: text})
});

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    var suggestions = [];

    fetch(`${cherryURL}/api/bookmarks?q=${text}`).then(r => r.json()).then(result => {
        if (result.data.items.length) {
            result.data.items.map(bookmark => {
                suggestions.push({deletable: true, content: bookmark.url, description: bookmark.title})
            });
            suggest(suggestions);
        }
    });
});