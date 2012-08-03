<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    	               "http://www.w3.org/TR/html4/loose.dtd">

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script type="text/javascript" language="javascript" src="jquery/jquery-1.6.2.js"></script>
		<script type="text/javascript" language="javascript" src="jquery/ui/jquery-ui-1.8.16.custom.js"></script>
		<script type="text/javascript" language="javascript" src="http://www.thomasfrank.se/downloadableJS/xml2json.js"></script>
		<link type="text/css" href="css/ui-lightness/jquery-ui-1.8.16.custom.css" rel="Stylesheet" />
		<script type="text/javascript" language="javascript" src="js/ctctajax.js"></script>  
		<link rel=StyleSheet href="css/style.css" type="text/css" media=all>
		<script type="text/javascript" language="javascript" src="js/nicetitle.js"></script>
		<link rel=StyleSheet href="css/nicetitle.css" type="text/css" media=all>
		
		<title>CTCTWeb - Integration Platform Demo Site</title>
	</head>
	<body>
		<table id="topnav" width="960" border="0" cellpadding="0" cellspacing="3">
		<tr>
		<td align="left" style="
			width:500px;
			word-spacing:12px;
			font-size:90%;
			padding-left:12px;
			padding-right:10px;
			white-space:nowrap;
			">
			<a class="topnav" href="#home" target="_top" title="Go to the homepage">HOME </a>
			<a class="topnav" href="css/style.css" target="blank" title="View the CSS for this page">CSS </a>
		</td>
		<td align="right" style="
			word-spacing:6px;
			font-size:80%;
			padding-right:10px;
			color:#888888;
			white-space:nowrap;
			">
			<a class="topnav" href="#references" target="_top">REFERENCES</a> |
			<a class="topnav" href="#about" target="_top">ABOUT</a>	
		</td>
		</tr>
		</table>
	
		<h1 class="sansserif">CTCTWeb - Integration Platform Demo Site</h1>
		<br>
		<form name="mainForm" id="mainForm">
			<h2 class="sansserif">Login - OAuth 2.0 Client Flow</h2>
			<table id="topnav" width="960" border="0" cellpadding="0" cellspacing="3">
				<tr><td>Login</td><td>&nbsp;</td><td>&nbsp;</td></tr>
				<tr>
				<td><input type="text" name="loginname2" id="loginname2"></td>
				<td><div id="loga2"><button type="button" onclick="makeOAuth2ClientFlowRequest(); return false;">Authenticate</button></div></td>
				</tr>
			</table>
			<br>
			
			<div id="roga"><button type="button" onclick="clearForm()">Clear form</button></div>
			<div id="moga"><button type="button" onclick="jslistMailingLists()">Show Mailing Lists</button></div>
			<br>
		</form>

		<br><br>
		<hr>
		<p class="sansserif">Server Response</p>
		<span class="serverResponse" id="serverResponse">No results to display.</span>
		<hr>

		<br><br>
		<hr>
		<p class="sansserif">Debug Area</p>
		<span class="debugArea" id="debugArea">No DEBUG messages to display.</span>
		<hr>
		
		<table id="footer" cellspacing="0" cellpadding="0" align="center" border="0" width="100%">
		<tr>
		<td align="center">
			<table align="center" border="0" width="960">
			<tr>
			<td align="left" width="200">
				&nbsp;
			</td>
			<td align="right" style="word-spacing:6px;font-size:80%;padding-right:10px;">
				<a href="lister.jsp" target="_top">HOME</a> |
				<a href="#top" target="_top">TOP</a> |
			</td>
			</tr>
			<tr>
			<td valign="top" colspan="2" align="center" style="padding-top:10px;color:#404040;">
				Brighton Analytics, LLC transforms complex corporate data into actionable business intelligence. <br/>
				Copyright 2011 by Brighton Analytics, LLC. mattlaudato@gmail.com All Rights Reserved.
			</td>
			</tr>
			</table>
			<br/>
		</td>
		</tr>
		</table>
		<div id="overlayDialog"></div>
	</body>
</html> 
