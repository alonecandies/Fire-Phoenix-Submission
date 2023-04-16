// HTML encoder
function htmlEncode(str){
    return String(str).replace(/[^\w. ]/gi, function(c){
        return '&#'+c.charCodeAt(0)+';';
    });
}

// Unicode escaping - If your input is inside a JavaScript string
function jsEscape(str){
    return String(str).replace(/[^\w. ]/gi, function(c){
        return '\\u'+('0000'+c.charCodeAt(0).toString(16)).slice(-4);
    });
}

function alert_success(msg, element_id = "result"){
    var element_list = document.querySelectorAll("#"+ element_id)
    for (var i = 0; i < element_list.length; i++) {
        if(msg) return element_list[i].innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>'+ htmlEncode(msg) +'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        return element_list[i].innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Success!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    }
}

function alert_error(msg, element_id = "result"){
    var element_list = document.querySelectorAll("#"+ element_id)
    for (var i = 0; i < element_list.length; i++) {
        if(msg) return element_list[i].innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>'+ htmlEncode(msg) +'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        return element_list[i].innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>An error occured!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }
}

function is_valid_url(s){
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

