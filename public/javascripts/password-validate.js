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
          else{x.innerHTML="Geolocation is not supported by this browser.";}
          }

          function showPosition(position)
          {
            var latlon=position.coords.latitude+","+position.coords.longitude;

            var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
          +latlon+"&zoom=14&size=400x300&sensor=false";
            document.getElementById("mapholder").innerHTML="<img src='"+img_url+"' />";

            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
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
                  
                  // Display address as text in the page
                  myAddress.innerHTML="Adress: " + results[0].formatted_address;
                  console.log("Adress: " + results[0].formatted_address)
                } else {
                  console.log('No results found')
                  alert('No results found');
                }
              } else {
                console.log('Geocoder failed due to: ' + status)
                alert('Geocoder failed due to: ' + status);
              }
            });
          }

        function showError(error)
          {
          switch(error.code) 
            {
              case error.PERMISSION_DENIED:
                x.innerHTML="User denied the request for Geolocation."
                break;
              case error.POSITION_UNAVAILABLE:
                x.innerHTML="Location information is unavailable."
              break;
              case error.TIMEOUT:
                x.innerHTML="The request to get user location timed out."
              break;
              case error.UNKNOWN_ERROR:
                x.innerHTML="An unknown error occurred."
              break;
            }
          }

