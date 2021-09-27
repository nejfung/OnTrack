//reload page when opened
reload();

//make buttons clickable
document.addEventListener('DOMContentLoaded', function(){
    //when reset button is clicked, remove everything from url list
    var checkPageButton = document.getElementById('resetbtn');
    checkPageButton.addEventListener('click', function(){
        if(confirm("Are you sure you want to remove all websites from being tracked? \nThis action cannot be undone.")){
            chrome.storage.local.set({urls: []}, function(){

                ////get the url list stored in sync storage and display it
                chrome.storage.local.get({urls:[]}, function (result) {
                    document.getElementById("website").innerHTML = "";
                    for(var i = 0; i < result.urls.length; i++){
                        var time = result.urls[i][1];
                        if(time >=60 && time < 3600){
                            var min = (time-(time%60))/60;
                            var sec = time-(min*60);
                            time = min + "m " + sec + "s";
                        }
                        else if(time >= 3600){
                            var hr = (time-(time%3600))/3600;
                            var min = ((time-hr*60)-(time%60))/60;
                            time = hr + "h " + min + "m " + sec + "s";
                        }
                        else{
                            time = time + "s";
                        }
                        document.getElementById("website").innerHTML += result.urls[i][0] + " - " + time + "<br>";
                    }
                });
            });
        }
        
    }, false);

    //add tab to track list when button is clicked
    var addTabButton = document.getElementById('addtab');
    addTabButton.addEventListener('click', function(){
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            //get the information of the tab
            var info = tabs[0];
        
            //get url of tab, shorten to base, and store in var domain
            var url = new URL(info.url);
            var domain = url.hostname;
        
            //get previosly stored list of all urls
            chrome.storage.local.get({urls: []}, function(result) {
                var urls = result.urls;
        
                //make list of current urls (only the first item of each url + time set)
                var currenturls = [];
        
                urls.forEach((url) => {
                    currenturls.push(url[0]);
                });
        
                //if current url is not on the list, append it
                if(!currenturls.includes(domain)){urls.push([domain, 0]);}
        
                //set url list stored in storage.sync to list with current url
                chrome.storage.local.set({urls: urls}, function() {
                    ////get the url list stored in sync storage and display it
                    chrome.storage.local.get({urls:[]}, function (result) {
                        document.getElementById("website").innerHTML = "";
                        for(var i = 0; i < result.urls.length; i++){
                            var time = result.urls[i][1];
                            if(time >=60 && time < 3600){
                                var min = (time-(time%60))/60;
                                var sec = time-(min*60);
                                time = min + "m " + sec + "s";
                            }
                            else if(time >= 3600){
                                var hr = (time-(time%3600))/3600;
                                var min = ((time-hr*60)-(time%60))/60;
                                time = hr + "h " + min + "m " + sec + "s";
                            }
                            else{
                                time = time + "s";
                            }
                            document.getElementById("website").innerHTML += result.urls[i][0] + " - " + time + "<br>";
                        }
                    });
                });
            });
            
        });
    }, false);

    var removeTabButton = document.getElementById('removetab');
    removeTabButton.addEventListener('click', function(){
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            //get the information of the tab
            var info = tabs[0];
        
            //get url of tab, shorten to base, and store in var domain
            var url = new URL(info.url);
            var domain = url.hostname;
        
            //get previosly stored list of all urls
            chrome.storage.local.get({urls: []}, function(result) {
                var urls = result.urls;

                //remove url if it is in the list
                for(var i = 0; i < urls.length; i++){
                    if(urls[i][0] == domain){
                        if(confirm("Are you sure you want to remove " + domain + " from being tracked? \nThis action cannot be undone.")){
                            urls.splice(i, 1);
                        }
                        
                    }
                }

                //set url list stored in storage.sync to list with current url
                chrome.storage.local.set({urls: urls}, function() {
                    ////get the url list stored in sync storage and display it
                    chrome.storage.local.get({urls:[]}, function (result) {
                        document.getElementById("website").innerHTML = "";
                        for(var i = 0; i < result.urls.length; i++){
                            var time = result.urls[i][1];
                            if(time >=60 && time < 3600){
                                var min = (time-(time%60))/60;
                                var sec = time-(min*60);
                                time = min + "m " + sec + "s";
                            }
                            else if(time >= 3600){
                                var hr = (time-(time%3600))/3600;
                                var min = ((time-hr*60)-(time%60))/60;
                                time = hr + "h " + min + "m " + sec + "s";
                            }
                            else{
                                time = time + "s";
                            }
                            document.getElementById("website").innerHTML += result.urls[i][0] + " - " + time + "<br>";
                        }
                    });
                });
            });
            
            
        });
    }, false);

}, false);

function reload(){
    ////get the url list stored in sync storage and display it
    chrome.storage.local.get({urls:[]}, function (result) {
        document.getElementById("website").innerHTML = "";

        for(var i = 0; i < result.urls.length; i++){
            var time = result.urls[i][1];
            if(time >=60 && time < 3600){
                var min = (time-(time%60))/60;
                var sec = time-(min*60);
                time = min + "m " + sec + "s";
            }
            else if(time >= 3600){
                var hr = (time-(time%3600))/3600;
                var min = ((time-hr*60)-(time%60))/60;
                time = hr + "h " + min + "m " + sec + "s";
            }
            else{
                time = time + "s";
            }
            document.getElementById("website").innerHTML += result.urls[i][0] + " - " + time + "<br>";
        }
    });
}

var reload = setInterval(reload, 1000);