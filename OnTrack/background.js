
function timer(){

    //get the information of the tab

    chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
        try{
            var tab = tabs[0];
            var url = new URL(tab.url);
            var domain = url.hostname;
        }
        catch(err){
            var domain = "N/A";
        }
        finally{
            chrome.storage.local.get({urls: []}, function(result) {
                var urls = result.urls;
                //check if each item in urls is the current url
                for(var i = 0; i < urls.length; i++){
                    if(urls[i][0] == domain){
                        //add one to the timer counter to the url in urls
                        urls[i][1]++;
                    }
                }
        
                //set url list stored in storage.sync to list with current url
                chrome.storage.local.set({urls: urls}, function() {
                });
            });
        }
    })

    //var info = tab[0];
    //console.log(info);
    //get url of tab, shorten to base, and store in var domain
    //var url = new URL(info.url);
    //var domain = url.hostname;
    //console.log(domain);
/*
    //get previosly stored list of all urls
    
    });*/

}



var interval = setInterval(timer, 1000);