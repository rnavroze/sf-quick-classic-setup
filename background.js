chrome.action.onClicked.addListener(tab => {
    let pattern = /https:\/\/([\w-]+)\.lightning.force.com/;
    let matches = tab.url?.match(pattern);

    if (!matches) {
        chrome.notifications.create('', {
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Not a Salesforce tab',
            message: 'Please make sure your browser\'s active tab is a Salesforce org in LEX. The URL should look like this: https://INSTANCE.lightning.force.com/...',
            priority: 2
        });
    }
    else {
        // We have to go to a random page like system overview because going to setup home redirects to LEX
        let url = `https://${matches[1]}.my.salesforce.com/setup/systemOverview.apexp?setupid=SystemOverview`;
        chrome.tabs.create({ url });
    }
});