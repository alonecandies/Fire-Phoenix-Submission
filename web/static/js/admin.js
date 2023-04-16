

function autoGoback() {
  // setTimeout("history.back();", timeoutPeriod);
  window.location = document.referrer;
}
let fileStatus = "No file yet"
function autoRedirect(x){
  window.location = x
}





function reportURL(event) {
  var json = {
    url: event.url.value,
    type: event.content_type.value,
    content: event.description.value
  };
 
  var report_url_rq = new XMLHttpRequest();
  report_url_rq.open("POST", "http://127.0.0.1:5001/feedback", true);
  report_url_rq.setRequestHeader("Content-Type", "application/json");
  
  report_url_rq.send(JSON.stringify(json));

  report_url_rq.onreadystatechange = function () {
    if (report_url_rq.readyState === XMLHttpRequest.DONE) {
      if (report_url_rq.status === 200) {
        alert_success();



      } else {
          msg = "";
          if(this.status == 400){
              msg = this.responseText;
          }
          alert_error(msg);
      }
  }
  
}
  
}



function uploadSource() {
  var url = new URL(window.location.href);
  var scenario_id = url.toString().split("/")[4];

  const formData = new FormData();
  const uploadfiles = document.getElementById("source").files[0];

 
  formData.append("file", uploadfiles);

  const xhr = new XMLHttpRequest();
  
  xhr.open("POST", api_url + "/scenario/" + scenario_id + "/upload", true);
  xhr.setRequestHeader("Authorization", "Bearer " + get_jwt());
  xhr.send(formData);
 
  xhr.onreadystatechange = function () {
    // console.log(xhr.status);
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        alert_success();
        var file =""
        file = document.getElementById("scenarioTitle").innerText + '.zip <button class="btn" onclick="download('+ scenario_id +')"><i class="fa fa-download\"></i> Download</button>'
        document.getElementById("resource_name").innerHTML = file
      } else {
          if(xhr.status == 401 || this.status == 422) {
              return logout()
          }
          msg = "";
          if(this.status == 400){
              msg = this.responseText;
          }
          alert_error(msg);  
      }
  }
  
}
}


