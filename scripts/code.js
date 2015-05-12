jQuery.noConflict(); 

jQuery( document ).ready(function( $ ) {    
/***********************************************/
/*      GLOBAL                                  */
/***********************************************/

/**
 * Description: Bubbles window events
 * Author: Peter Hammans | Wead Ltd 
 * Email: peter.hammans@wead.co.uk
 **/
function attachEvent(oFunction, sEvent) {
    var oOriginal = window[sEvent];
    if(typeof(oOriginal) != "function") {
        window[sEvent] = oFunction;
    } else {
        window[sEvent] = function() {
            oOriginal();
            oFunction();
        };
    };
};

/**
 * Description: Sets events globally for form fields
 * Author: Andrew Goodson | CDS 
 **/
 var oFields = {
  //array of control ids that need the watermarking control adding
    aIds : ["q"],
    init : function() {
        for(var i = 0; i < oFields.aIds.length; i++) {
            oFields.setupWatermarking(oFields.aIds[i]);
        };
    },
    
    //Setup the watermarking for a particular element id
    setupWatermarking: function(sId) {
        var oElement = document.getElementById(sId);
        if(oElement) 
        {
        //Add the onsubmit handler to the form if it isn't already defined    
        //(this will clear the control when the form is submitted and the default text is still present )
        if ( oElement.form )
        {
          if ( null == oElement.form.onsubmit )
          {
          oElement.form.onsubmit = function () { 
            var textboxes = document.getElementsByTagName("input");
            for (var i = 0; i < textboxes.length; i++)
            {
              if ((textboxes[i].type == "text" ) && (textboxes[i].isblank == "true") )
              {
                textboxes[i].value = "";
              }
            }
          };
          }
        }
          
          //Copy the current value into the defaulttext attribute
          oElement.defaulttext = oElement.value;
                  
          //Add an attribute to the control to indicate that the default text is set (and it is effectively blank)
          //and then set the default value back into the control
          oElement.isblank = "true";
          
        
          ///////////////////////////////////////////////////////////////////////////////
          //Add an onfocus handler that will clear the text when the control gets focus
          ///////////////////////////////////////////////////////////////////////////////
            oElement.onfocus = function() 
            {
            if ( oElement.isblank == "true" )
              {
              oElement.value = "";
            }
        };
        
        ///////////////////////////////////////////////////////////////////////////////
        //Add an onblur handler that will restore the default text if it is unchanged
        //or clear the 'isblank' flag if content has been changed
        ///////////////////////////////////////////////////////////////////////////////
            oElement.onblur = function() 
            {
              if (oElement.value == "")
        {
          oElement.value = oElement.defaulttext;
          oElement.isblank = "true";
        }
        else
        {
          oElement.isblank  = "false";
        }
            };
            
            oElement.onkeypress = function()
            {
              oElement.onblur();
              oElement.onfocus();
            };
            
        };
    }
};


function forceCaching() {
    try {
        document.execCommand("BackgroundImageCache", false, true);
    } catch(e) {};
};

/**
 * Description: 
 * Author: Peter Hammans | Wead Ltd 
 * Email: peter.hammans@wead.co.uk
 **/
 var oDate = {
    aMonths : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    init : function() {
        var oContainer = document.getElementById("date");
        if(oContainer) {
            var oInner = oContainer.getElementsByTagName("em");
            if(oInner) {
                var oNow = new Date();
                oInner[0].innerHTML = oNow.getDate() + " " + oDate.aMonths[oNow.getMonth()] + " " + (oNow.getYear() < 1900 ? (oNow.getYear() + 1900) : oNow.getYear());
            };
        };
    }
};

/***********************************************/
/*      FONTS                                  */
/***********************************************/

//---Thanks to alistapart and RNIB
//---Modified by Peter Hammans
var oFontsize = {
    aLinks : ["small", "medium", "large"],
    sContainerId : "wrapper",
    nSize : 80,
    createCookie : function(sName, sValue, nDays) {
        if (nDays) {
            var oDate = new Date();
            oDate.setTime(oDate.getTime() + (nDays * 24 * 60 * 60 * 1000));
            var sExpires = "; expires=" + oDate.toGMTString();
        } else { 
            sExpires = "";
        };
        document.cookie = sName + "=" + sValue + sExpires + "; path=/";
    },
    readCookie : function(sName) {
        var sNameEQ = sName + "=";
        var aValues = document.cookie.split(";");
        for(var i = 0; i < aValues.length; i++) {
            var sValue = aValues[i];
            while (sValue.charAt(0) == " ") sValue = sValue.substring(1, sValue.length);
            if (sValue.indexOf(sNameEQ) == 0) {
                return sValue.substring(sNameEQ.length, sValue.length);
            };
        };
        return null;
    },
    changeSize : function() {
        for(var i = 0; i < oFontsize.aLinks.length; i++) {
            var oLink = document.getElementById(oFontsize.aLinks[i]);
            oLink.onclick = function() {
                oFontsize.setActiveSize(this.id);
            };
        };
    },
    setActiveSize : function(sFontsize) {
        var oPage = document.getElementById(oFontsize.sContainerId);
        if(oPage) { 
            oPage.className = sFontsize;
        };
        return null;
    },
    onunload : function() {
        var oPage = document.getElementById(oFontsize.sContainerId);
        if(oPage) { 
            oFontsize.createCookie("style", oPage.className, 365);  
        };
    },
    onload : function() {
        var sCookie = oFontsize.readCookie("style");
        if(sCookie) {
            oFontsize.setActiveSize(sCookie);   
        };
        oFontsize.changeSize();
    }   
};
        
attachEvent(forceCaching, "onload");
attachEvent(oFields.init, "onload");
attachEvent(oDate.init, "onload");

/***********************************************/
/*FONTS*/
attachEvent(oFontsize.onload, "onload");
attachEvent(oFontsize.onunload, "onunload");

/***********************************************/

if(Modernizr.mq('only all')) {
    jQuery('html').addClass('mq');
}

function adjustStyle(width) {
    width = parseInt(width);
    if (width < 1024) {
        //$("#size-stylesheet").attr("href", "http://intranet.ea.gov/static/scripts/medium.css");
     
        $("#featureimg").insertBefore($("#featureinfo"));
		
		$( "#featurebox" ).addClass( "toggleMediumfeaturebox" );
		$( "#featureinfo" ).addClass( "toggleMediumfeatureinfo" );
		$( "#featureimg" ).addClass( "toggleMediumfeatureimg" );
		
		$( "#featurebox" ).removeClass( "toogleWidefeaturebox" );
		$( "#featureinfo" ).removeClass( "toogleWidefeatureinfo" );
		$( "#featureimg" ).removeClass( "toogleWidefeatureimg" );
        
    } else {
       //$("#size-stylesheet").attr("href", "http://intranet.ea.gov/static/scripts/wide.css"); 
        $("#featureinfo").insertBefore($("#featureimg"));
		
		$( "#featurebox" ).addClass( "toogleWidefeaturebox" );
		$( "#featureinfo" ).addClass( "toogleWidefeatureinfo" );
		$( "#featureimg" ).addClass( "toogleWidefeatureimg" );
		
		$( "#featurebox" ).removeClass( "toggleMediumfeaturebox" );
		$( "#featureinfo" ).removeClass( "toggleMediumfeatureinfo" );
		$( "#featureimg" ).removeClass( "toggleMediumfeatureimg" );
		
    }
} //adjustStyle



    adjustStyle($(this).width());

    $(window).resize(function() {
        adjustStyle($(this).width());
    }); //resize

}); //jQuery