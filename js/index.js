btnResult = document.getElementById('btnResult');
txtUrl = document.getElementById('txtUrl');
txtSec = document.getElementById('txtSec');
txtMin = document.getElementById('txtMin');
txtHour = document.getElementById('txtHour');
txtError = document.getElementById('txtError')

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return url;
    }
    return false;
}

btnResult.addEventListener('click', function() {
	url = txtUrl.value;
	second = txtSec.value;
	minute = txtMin.value;
	hour = txtHour.value;
	if (second == ""){
		second = ""
    } else {
		second = second + "s"
	}
	if (minute == ""){
		minute = ""
	} else {
		minute = minute + "m"
	}

	if (hour == ""){
		hour = ""
	} else {
		hour = hour + "h"
	}
	if (validURL(url) == false){
		txtError.style.color = "red";
		txtError.innerHTML = "Invalid URL";
		return;
	} else {
		valid = matchYoutubeUrl(url);
		if (valid = false){
			txtError.innerHTML = "Invalid URL";
			txtError.style.color = "red";
			return;
		} else {
			if(url.includes("t=")){
				txtError.style.color = "red";
				txtError.innerHTML = "URL already have a time";
				return;
			}
			if (!minute.match(/\S/) && !second.match(/\S/) && !hour.match(/\S/)) 
    		{
        		txtError.innerHTML = "Can't continue without a specific time";
				txtError.style.color = "red";
				return;
		    } else {
		    	if (url.includes("https://www.youtube.com/watch?v=")){
		    		result = url + "&t=" + second + minute + hour;
		    		txtError.style.color = "green";
		    		txtError.innerHTML = result;
		    	} else {
		    		result = url + "?t=" + second + minute + hour;
		    		txtError.style.color = "green";
		    		txtError.innerHTML = result;
		    	}
    	    }
		}
	}
});