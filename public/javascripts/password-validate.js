 function checkPasswords() {
   var password1 = document.getElementById('password1');
   var password2 = document.getElementById('password2');
   if (password1.value != password2.value) {
    password2.setCustomValidity('Passwords are not identical, please retype the passwords');
   } else {
       password2.setCustomValidity('');
   }
}

var x = document.getElementById("reverseGeolocation");
var myAddress =  document.getElementById("myAddress");                      
function getLocation()
{
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else
    {
        x.innerHTML="Geolocation is not supported by this browser.";
    }
}

  function showPosition(position)
  {
    var latlon=position.coords.latitude+","+position.coords.longitude;

    var img_url="http://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=14&size=400x300&sensor=false";
    document.getElementById("mapholder").innerHTML="<img src='"+img_url+"' />";

    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          //map.setZoom(11);
          //marker = new google.maps.Marker({
          //    position: latlng,
          //    map: map
          //});
          //infowindow.setContent(results[1].formatted_address);
          //infowindow.open(map, marker);
          
          // Display address as text in the page NOTE: This only works in Chrome, not in Firefox
          myAddress.innerHTML="Address: " + results[0].formatted_address;
          console.log("Address: " + results[0].formatted_address);
          //console.log("Address: " + results[0].address_components[0].long_name);
          //console.log("Address: " + results[0].address_components[0].long_name);

          // from http://stackoverflow.com/questions/8082405/parsing-address-components-in-google-maps-upon-autocomplete-select
          var address_components = results[0].address_components;
          var components={}; 
          jQuery.each(address_components, function(k,v1) {jQuery.each(v1.types, function(k2, v2){components[v2]=v1.long_name;});});

          // print out the returned components
          jQuery.each(components, function(k,v) { console.log(k + " " + v); });

          // prefill in the forms with the address returned
          var addressStreet =  document.getElementById("address_street");
          addressStreet.value = components.street_number + " " + components.route;

          var addressCity = document.getElementById("address_city");
          addressCity.value = String(components.locality);

          var addressState = document.getElementById("address_state");
          addressState.value = String(components.administrative_area_level_1);

          var addressCountry = document.getElementById("country-selector");
          addressCountry.value = String(components.country); 

          var addressPostcode = document.getElementById("address_postcode");
          addressPostcode.value = String(components.postal_code);
        } else {
          console.log('No results found');
          alert('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
        alert('Geocoder failed due to: ' + status);
      }
    });
}

function showError(error)
{
  switch(error.code) 
  {
      case error.PERMISSION_DENIED:
        x.innerHTML="User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML="Location information is unavailable.";
      break;
      case error.TIMEOUT:
        x.innerHTML="The request to get user location timed out.";
      break;
      case error.UNKNOWN_ERROR:
        x.innerHTML="An unknown error occurred.";
      break;
  }
}

function dragLeaveHandler(event) {
   console.log("drag leave");
        // Set style of drop zone to default
        event.target.classList.remove('draggedOver'); 
    }

function dragEnterHandler(event) {
        console.log("Drag enter");
        // Show some visual feedback
        event.target.classList.add('draggedOver'); 
    }

function dragOverHandler(event) {
         //console.log("Drag over a droppable zone");
         // Do not propagate the event
         event.stopPropagation();
         // Prevent default behavior, in particular when we drop images or links
         event.preventDefault(); 
     }

function dropHandler(event) {
      console.log('drop event');

         // Do not propagate the event
         event.stopPropagation();
         // Prevent default behavior, in particular when we drop images or links
         event.preventDefault(); 


        // reset the visual look of the drop zone to default
        event.target.classList.remove('draggedOver'); 
        

        // get the files from the clipboard
        var files = event.dataTransfer.files;
        var filesLen = files.length; 
        var filenames = "";

        // iterate on the files, get details using the file API
        // Display file names in a list.
        for(var i = 0 ; i < filesLen ; i++) {
            filenames += '\n' + files[i].name; 
        // Create a li, set its value to a file name, add it to the ol
        var li =     document.createElement('li');
        li.textContent = files[i].name;    document.querySelector("#droppedFiles").appendChild(li);
    }
    console.log(files.length + ' file(s) have been dropped:\n' + filenames);

    uploadAllFilesUsingAjax(files);
    readFilesAndDisplayPreview(files);

}  

function uploadAllFilesUsingAjax(files) {
   var xhr = new XMLHttpRequest();
   xhr.open('POST', 'upload.html');

   xhr.upload.onprogress = function(e) {
        progress.value = e.loaded;
        progress.max = e.total;
    };

    xhr.onload = function() {
        //alert('Upload complete!');
    };

    var form = new FormData();
    for(var i = 0 ; i < files.length ; i++) {  
     form.append('file', files[i]);
    }

    xhr.send(form);
}

function onloadHandler() { 
  return function(e) {
      // Render thumbnail.
      var span = document.createElement('span');
      span.innerHTML = "<img class='thumb' width='100' src='" + e.target.result + "'/>";
      document.getElementById('thumblist').insertBefore(span, null);
  };
}

function readFilesAndDisplayPreview(files) {
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
 
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }
 
      var reader = new FileReader();
    /*
      //capture the file information.
      reader.onload = function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = "<img class='thumb' width='100' src='" + e.target.result + "'/>";
          document.getElementById('thumblist').insertBefore(span, null);
        };
      */
      reader.onload = onloadHandler();
      
 
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
}