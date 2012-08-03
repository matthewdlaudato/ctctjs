/*  
 * CTCT jQuery access via the CTCTWeb app  
 */ 
var serverResponse = null;
var lastDatasets = null;
var lastRunparams = null;
var overlayText = null;
var g_contactURI = null;
var g_username = null;

var prefs = {

	    data: {},

	    load: function () {
	        var the_cookie = document.cookie.split(';');
	        if (the_cookie[0]) {
	            this.data = JSON.parse(the_cookie[0]);
	        }
	        return this.data;
	    },

	    save: function (expires, path) {
	        var d = expires || new Date(2020, 02, 02);
	        var p = path || '/';
	        document.cookie = JSON.stringify(this.data)
	                          + ';path=' + p
	                          + ';expires=' + d.toUTCString();
	    }

	};

var g_cookie = prefs.load();

function makeOAuth2ClientFlowRequest() {
	var apiKey='YOUR_API_KEY_GOES_HERE';

	if (typeof makeOAuth2ClientFlowRequest.accessToken == 'undefined') {
		makeOAuth2ClientFlowRequest.accessToken = null;
	}

	if (g_cookie.token) {
		makeOAuth2ClientFlowRequest.accessToken = cookie.token;
	}
	
	if(makeOAuth2ClientFlowRequest.accessToken == null) {
		if (window.location.hash.length == 0) {
			var path = 'https://oauth2.constantcontact.com/oauth2/oauth/siteowner/authorize?';
			var queryParams = ['client_id=' + apiKey,
			                   'redirect_uri=' + window.location,
			                   'response_type=token'];
			var query = queryParams.join('&');
			var url = path + query;
			window.open(url,"_self");
		} else {
			var hashFragment = window.location.hash.substring(1);
			var hashParams = hashFragment.split("&");
			for (var i = 0; i < hashParams.length; ++i)
		    {
		        var p=hashParams[i].split('=');
		        if (p.length != 2) continue;
		        if (p[0] == "access_token") {
		        	makeOAuth2ClientFlowRequest.accessToken = p[1];
		        	prefs.data.token = makeOAuth2ClientFlowRequest.accessToken;
		        	jsgetUserName(makeOAuth2ClientFlowRequest.accessToken);
		        	prefs.data.username = g_username;
		        	prefs.save();
		        	g_cookie = prefs.load();
		        }
		    }
		}
	}
}

function jslistMailingLists(){
	var options = {
			url: 'https://api.constantcontact.com/ws/customers/' +  g_cookie.username + '/lists?access_token=' + g_cookie.token,
			type: "GET",
			dataType: 'xml',
			success: function(data, textStatus, jqXHR){
				var htmlResponse = "<br><table id=\"datasets\"><tr><th>List Name</th></tr>";
				x = data.getElementsByTagName("ContactList"); 
				for (var j=0; j<x.length; j++) {
					var listURIString = new String(x[j].getAttribute("id"));
					var listURI = encodeURI(listURIString.replace("http", "https") + "/members" + "?access_token=" + g_cookie.token);
					var listName = x[j].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
					htmlResponse =[htmlResponse, "<tr><td><a onclick=\"jslistMailingListMembers(encodeURI('", listURI, "'));\">", listName, "</a></td></tr>"].join("");
				}
				htmlResponse = [htmlResponse, "</table>"].join("");
				jQuery('.serverResponse').html(htmlResponse);
			}
		};
		jQuery.ajax(options);
}

function jslistMailingListMembers(listURI){
	var options = {
			url: listURI,
			type: "GET",
			dataType: 'xml',
			success: function(data, textStatus, jqXHR){
				var htmlResponse = "<br><table id=\"datasets\"><tr><th>Name</th><th>Email</th></tr>";
				x = data.getElementsByTagName("ContactListMember");
				for (var j=0; j<x.length; j++) {
					var contactEmail = x[j].getElementsByTagName("EmailAddress")[0].childNodes[0].nodeValue;
					var contactName = x[j].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
					htmlResponse =[htmlResponse, "<tr><td>", contactName, "</td><td>", "<a onmouseover=\"jsgetContactInOverlay(encodeURI('", contactEmail, "'));\">", contactEmail, "</a></td></tr>"].join("");
				}
				htmlResponse = [htmlResponse, "</table>"].join("");
				jQuery('.serverResponse').html(htmlResponse);
			}
		};
		jQuery.ajax(options);
}

function jsgetContactURIFromEmail(email) {
	var poststr = encodeURI("email=" + email);
    var options = {
			url: 'https://api.constantcontact.com/ws/customers/' +  g_cookie.username + '/contacts?' +
				 poststr + '&access_token=' + g_cookie.token,
			type: "GET",
			dataType: 'xml',
			async: false,
			success: function(data, textStatus, jqXHR){
				x = data.getElementsByTagName("entry");
				var contactURI = x[0].getElementsByTagName("id")[0].childNodes[0].nodeValue.replace("http", "https");
				g_contactURI = encodeURI(contactURI);
			}
    };
	jQuery.ajax(options);

}
    
function jsgetContactInOverlay(email) {
	var htmlData = new String();
	jsgetContactURIFromEmail(email);
    var options = {
		url: g_contactURI + '?access_token=' + g_cookie.token,
		type: "GET",
		dataType: 'xml',
		success: function(data, textStatus, jqXHR){
			x = data.getElementsByTagName("Contact");
			var contactEmail = x[0].getElementsByTagName("EmailAddress")[0].childNodes[0].nodeValue;
			var contactName = x[0].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
			var contactJoindate = x[0].getElementsByTagName("InsertTime")[0].childNodes[0].nodeValue;
			htmlData = htmlData.concat("Name: ",contactName,"<br>");
			htmlData = htmlData.concat("Email: ",contactEmail,"<br>");
			htmlData = htmlData.concat("Joined on: ",contactJoindate);
			jQuery('#overlayDialog').html(htmlData);
			if (!jQuery('#overlayDialog').dialog("isOpen")) {
				jQuery('#overlayDialog').dialog('open');
			}
		}
    };
	jQuery.ajax(options);
}

function jsgetUserName(token){
	var options = {
		url: 'https://oauth2.constantcontact.com/oauth2/tokeninfo.htm',
		type: "POST",
		contentType: 'application/x-www-form-urlencoded',
		async: false,
		data: encodeURI('access_token=' + token),
		success: function(data, textStatus, jqXHR){
			jsonObj = JSON.parse(data);
			g_username = jsonObj.user_name;
		}
	};
	jQuery.ajax(options);
}

function clearForm() {  
	  document.getElementById("serverResponse").innerHTML = "No results to display.";
	  document.getElementById("debugArea").innerHTML = "No DEBUG messages to display."; 
	  document.getElementById("loginname2").value = ""; 

	  lastQueryResults = null;
	  serverResponse = null;
}  
   
//Check if string is a valid email address  
function regIsEmail(fData)  
{  
	var reg = new RegExp("^[0-9a-zA-Z]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$");  
	return reg.test(fData);  
} 

function traverse(node) { 
	if (node.nodeType == 3) {
		// it's a text node - it might have an email address, so process it
		var w_a = node.nodeValue.split(" ");
		if (w_a != null) {
			var neww_a;
			for (var j=0; j<w_a.length; j++) {
				neww_a += w_a[j];
				if (regIsEmail(w_a[j])) {
					var newNode = document.createElement("a");
		            newNode.setAttribute("onmouseover", "jsgetContactInOverlay(encodeURI('" + w_a[j] + "'));");
		            newNode.innerHTML = node.nodeValue;
		            node.parentNode.insertBefore(newNode, node);
		            node.parentNode.removeChild(node);
				}
			}
		}
	}
	if (node.childNodes != null) { 
		for (var i=0; i < node.childNodes.length; i++) { 
	      traverse(node.childNodes.item(i)); 
      } 
  } 
}

//scan the document for email addresses and make them active
//so that you can mouse over to get CTCT contact dashboard overlay
function windowLoadHandler() {
	var allNodes = document.body.childNodes;
	for (var i=0; i<allNodes.length; i++){
		var n = allNodes[i];
		traverse( n );
	}
}

jQuery(window).load(function() {
	jQuery('#overlayDialog').dialog({ autoOpen: false, title: 'Contact Information'});
});
jQuery(window).load(windowLoadHandler);
jQuery(window).load(makeOAuth2ClientFlowRequest);
