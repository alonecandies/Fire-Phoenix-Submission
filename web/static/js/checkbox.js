function generate_iam_creds_form() {
    // Get the checkbox
    var checkBox = document.getElementById("myCheck");
    // Get the output text
    var text = document.getElementById("text");
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
}


function run() {
  var checkbox = $('#myCheck'),
    inputBlock = $('#text');

    inputBlock.hide();
    if($(checkbox).is(':checked')) {
      inputBlock.show();
      inputBlock.find('input').attr('required', true);
    } else {
      inputBlock.hide();
      inputBlock.find('input').attr('required', false);
    }
}

function check_all(elementID){
  userTable = document.getElementById(elementID);
  let dataTable = userTable.querySelector("#table");
  let checkItAll = dataTable.querySelector('input[name="select_all"]');
  let inputs = dataTable.querySelectorAll('tbody>tr>td>input');
  // console.log(inputs);
  checkItAll.addEventListener('change', function() {
  if (checkItAll.checked) {
      inputs.forEach(function(input) {
      input.checked = true;
      });  
  } else {
      inputs.forEach(function(input) {
      input.checked = false;
      });  
  }
  });
}