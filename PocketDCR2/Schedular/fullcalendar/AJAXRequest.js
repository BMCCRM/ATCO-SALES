GetResponse = function(url, callBack, useCache) {
   
    var cacheflag = false;
    if (useCache)
        cacheflag = cache;
    $.ajax({ url: url, cache: cacheflag, dataType: 'text', success: function(data, textStatus) {
        if (callBack) callBack({ Success: true, Response: data });
    },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if (callBack) callBack({ Sucess: false, Response: '' });
        }
    });
}
GetResource = function(url, languageName, callBack, sync, cache) {
    var cacheflag = false;
    if (cache)
        cacheflag = cache;
    var syncflag = false;
    if (sync)
        syncflag = sync;
    var Dict = new Array();
    $.ajax(
    { async: !syncflag, url: url, cache: cacheflag, dataType: 'xml', success:

    function(data, textStatus) {
        var Dict = [];
        var count = 0;
        $(data).find(languageName).each(
            function() {
                $(this).find("element").each(function() { Dict[$(this).attr("key")] = $(this).attr("value"); count++; });
            });

        Dict.length = count;

        callBack({ Success: true, Resource: Dict });
    }, error: function(XMLHttpRequest, textStatus, errorThrown) { callBack({ Success: false, Resource: null }); }

    });
}

SendResponse = function(url, data, callBack) {
    $.ajax(
    { url: url, cache: false, processData: false, data: data, type: 'post', success:

    function(data, textStatus) {
        callBack(true);
    }, error: function(XMLHttpRequest, textStatus, errorThrown) { callBack(false); }

    });
}