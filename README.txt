READ ME:
*********

This software is developed and copyrighted by HIOX Softwares.
This is given under The GNU General Public License (GPL).
This version is HBMI 1.0


Description:
------------
This tool can be used in any webpage to show the body fat of a person based on their height and weight.


Downloads:
----------
Please visit our site http://www.hscripts.com and do the download


Installation:
-------------
Please take 5 minutes time and read installation instructions carefully and
completely! This will ensure a proper and easy installation
 
a) Unzip the file hbmi.zip to extract the files hbmi/bmi.js , hbmi/README.txt
b) Now copy the following code in to the file, where you want the bmi script
to run.

<!-- Script by hscripts.com -->
<form name=bmi>
	Weight: <input type=text name=wg size=5 >
	<select name=opt1 onChange="unit()" >
	<option name=pounds value="pounds">pounds</option>
	<option name=kilograms value="kilograms" selected>kilograms</option>
	</select>
	Height: <select name=opt2 onChange="conv(1)">
	<option name=feet value="1">1'</option>
	<option name=feet value="2">2'</option>
	<option name=feet value="3">3'</option>
	<option name=feet value="4">4'</option>
	<option name=feet value="5">5'</option>
	<option name=feet value="6">6'</option>
	<option name=feet value="7">7'</option>
	</select>
	<select name=opt3 onChange="conv(2)">
	<option name=inches value="0">0"</option>
	<option name=inches value="1">1"</option>
	<option name=inches value="2">2"</option>
	<option name=inches value="3">3"</option>
	<option name=inches value="4">4"</option>
	<option name=inches value="5">5"</option>
	<option name=inches value="6">6"</option>
	<option name=inches value="7">7"</option>
	<option name=inches value="8">8"</option>
	<option name=inches value="9">9"</option>
	<option name=inches value="10">10"</option>
	<option name=inches value="11">11"</option>
	</select>
	or cms<input type=text name=ht size=5 onkeyup="conv(3)" class='innerc
resform'>
	<input type=button name=cc value="Calculate" onClick="calc()">
	<table cellspacing=0 cellpadding=3 border=0>
	<tr align=center class="abouttabletext"><td>SI Units: <input type=text
readonly class=resform name=si>
	<tr align=center class="abouttabletext"><td>US Units: <input type=text
readonly class=resform name=us>
	<tr align=center class="abouttabletext"><td>UK Units: <input type=text
readonly class=resform name=uk>
	</table>
	<table width=100%>
	<tr><td colspan=2 align=center>
	<input type="text" name=desc size=30 class=content readonly
style="border:0px;">
	</td></tr>
	</table>
</form>
<script language=javascript SRC="hbmi/bmi.js">
</script>
<!-- Script by hscripts.com -->
c) Make sure that the bmi.js file is present in the same folder ,as the file
to which the above code was copied.


Releases:
---------
Release Date HBMI 1.0 : 01-12-2007.

On any suggestions mail to us at support@hscripts.com

Visit us at http://www.hscripts.com
Visit us at http://www.hioxindia.com
