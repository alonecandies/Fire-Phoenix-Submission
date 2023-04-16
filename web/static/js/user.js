function check_url(event){
    document.getElementById("table").innerHTML = "";

    url = event.url.value;
    if (!is_valid_url(url)) return alert_error('URL in wrong format, valid format is: http://google/login, https://antmovive/watch');
    url_data = JSON.stringify({"url": url});

    var get_result = new XMLHttpRequest();
	get_result.open("POST", "http://127.0.0.1:5001/predict", true);
	get_result.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    get_result.send(url_data);
    var user_table = $("#userTable").find("table");
    

    get_result.onreadystatechange = function () {
        if (get_result.readyState === XMLHttpRequest.DONE) {
            if(this.status == 400){
              msg = this.responseText;
              alert_error(msg);
            }else{


            // Everything is good, the response was received.
            var predicted = JSON.parse(get_result.responseText);
            console.log(predicted['predictions'][0]['phishingPercentage']);
            // if no data
            user_table.append(
        $(`
        <div class="panel panel-primary">
            <div class="panel-heading">${predicted['predictions'][0]['result']}</div>
            <div class="progress" style="margin: 25px">
                <div class="progress-bar bg-success" role="progressbar" style="width: ${predicted['predictions'][0]['phishingPercentage']}%;" aria-valuenow="${predicted['predictions'][0]['phishingPercentage']}" aria-valuemin="0" aria-valuemax="100">${predicted['predictions'][0]['phishingPercentage']}%</div>
            </div>

            <div class="panel-body">Details</div>
        </div>
        <div class="container-fluid">
            <div class="row" style="margin:25px">
                <div class="col-md-1 bg-success" style="margin:5px"> <a class="text-light text-align: center"> Dots (.)  </a> </div>
                <div class="col-md-1 bg-success" style="margin:5px"> <a class="text-light text-align: center">Slash (/)</a> </div>
                <div class="col-md-2 bg-success" style="margin:5px"> <a class="text-light text-align: center">Phish hints</a> </div>
            </div>
            <div class="row">
                <div class="col-md-2 bg-success" style="margin:5px"> <a class="text-light text-align: center">Bad sensitive content</a> </div>
                <div class="col-md-1 bg-success" style="margin:5px"> <a class="text-light text-align: center">IP</a> </div>
                <div class="col-md-2 bg-success" style="margin:5px"> <a class="text-light text-align: center">Tld in subdomain</a> </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row" style="margin:25px">
                <div class="col-md-10" >
                    <h6 class="d-inline-block">You can report the website to us as the following steps. Fire Phoenix will thoroughly review and issue a final judgment to evaluate a report as dangerous, fraudulent or unsafe. If the report is dangerous and unsafe for users, it will be blacklisted on our database.</h4>
                </div>
                <div class="col-md-2" >
                    <button type="submit">
                <a href="/report" class="btn btn-danger">REPORT</a>
                </button>
                </div>
                </div>
        </div>
        `)
    );

        };
    }}

}

