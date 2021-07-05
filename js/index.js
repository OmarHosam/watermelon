btnResult = document.getElementById('btnResult');
txtUrl = document.getElementById('txtUrl');
txtSec = document.getElementById('txtSec');
txtMin = document.getElementById('txtMin');
txtHour = document.getElementById('txtHour');
txtError = document.getElementById('txtError');
youtubevid = document.getElementById('youtubevid')
check = document.getElementById('check');
genLink = document.getElementById('genLink');
copybutton = document.getElementById('copy-button');
tooltip = document.getElementById("myTooltip");

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
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){12})(?:\S+)?$/;
    if(url.match(p)){
        return url.match(p)[1];
    }
    else{
    	return false;
    }
}
function youtube_parser(url){
    var regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
    var match = url.match(regExp);
    return (match && match[1].length==11)? match[1] : false;
}
function embed(){
	id = youtube_parser(txtUrl.value);
	console.log(id);
	if (id == false){
		btnResult.style.display = "none";
		youtubevid.style.display = "none";
		txtError.style.color = "red";
		txtError.style.display = "block"
		youtubevid.style.display = "none";
		txtError.innerHTML = "Invalid URL";
		tooltip.innerHTML = "Copy to Clipboard";
	} else {
		txtError.innerHTML = "";
		btnResult.style.display = "block";
		youtubevid.style.display = "block";
		youtubevid.src = "https://www.youtube.com/embed/" + id + "?controls=2";
		tooltip.innerHTML = "Copy to Clipboard";
	}
}
check.addEventListener('click', function() {
	if (!txtUrl.value == ""){
		embed()
	} else {
		return
	}
});
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
copybutton.addEventListener('click', function() {
	copyToClipboard(txtError.value);
	tooltip.innerHTML = "Copied into Clipboard";
});
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
		txtError.style.display = "block"
		genLink.style.display = "none";
		copybutton.style.display = "none";
		return;
	} else {
		valid = matchYoutubeUrl(url);
		if (valid = false){
			txtError.innerHTML = "Invalid URL";
			txtError.style.color = "red";
			txtError.style.display = "block"
			genLink.style.display = "none";
		    copybutton.style.display = "none";
			return;
		} else {
			getId = youtube_parser(url);
			if(url.includes("t=")){
				txtError.style.color = "red";
				txtError.innerHTML = "URL already have a time";
				txtError.style.display = "block"
				genLink.style.display = "none";
		    	copybutton.style.display = "none";
				return;
			}
			if (!minute.match(/\S/) && !second.match(/\S/) && !hour.match(/\S/)) 
    		{
        		txtError.innerHTML = "Can't continue without a specific time";
				txtError.style.color = "red";
				txtError.style.display = "block"
				genLink.style.display = "none";
		    	copybutton.style.display = "none";
				return;
		    } else {
		    	if (url.includes("https://www.youtube.com/watch?v=")){
		    		result = url + "&t=" + second + minute + hour;
		    		txtError.style.color = "green";
		    		txtError.value = result;
		    		txtError.style.display = "none";
		    		genLink.style.display = "block";
		    		copybutton.style.display = "block";
		    	} else {
		    		result = url + "?t=" + second + minute + hour;
		    		txtError.style.color = "green";
		    		txtError.value = result;
		    		txtError.style.display = "none";
		    		genLink.style.display = "block";
		    		copybutton.style.display = "block";
		    	}
    	    }
		}
	}
});
