/**
 * ASB - Accessibility Settings Bar
 */

(function() {
  /**
   * Content
   */
  
   
  const accessKey = 4;

  
  const btns = {
    btnHighContrast: {
      active: true,
      dataAccessibility: "contrast",
      class: "setAccessibility",
      icon: "FontAwesome",
      iconClass: ["fas", "fa-adjust"],
      text: "High Contrast",
    },
    btnDarkMode: {
      active: true,
      dataAccessibility: "dark",
      class: "setAccessibility",
      icon: "FontAwesome",
      iconClass: ["fas", "fa-moon"],
      text: "Gray Scale",
    },
    btnIncFont: {
      active: true,
      dataAccessibility: "incFont",
      class: "setAccessibility",
      icon: "FontAwesome",
      iconClass: ["fas", "fa-arrow-circle-up"],
      text: "Increase Font",
    },
    btnDecFont: {
      active: true,
      dataAccessibility: "decFont",
      class: "setAccessibility",
      icon: "FontAwesome",
      iconClass: ["fas", "fa-arrow-circle-down"],
      text: "Decrease Font",
    },
    btnOriFont: {
      active: true,
      dataAccessibility: "oriFont",
      class: "setAccessibility",
      icon: "FontAwesome",
      iconClass: ["fas", "fa-font"],
      text: "Original Font",
    },
    
    btnUnderline: {
      active: true,
      dataAccessibility: "underline",
      class: "setAccessibility",
      icon: "FontAwesome",
      iconClass: ["fa", "fa-underline"],
      text: "Underline Links",
    },
    btnvoiceFeature: {
      active: true,
      dataAccessibility: "voiceFeature",
      class: "setAccessibility",
      icon: "FontAwesome",
      iconClass: ["fa", "fa-microphone"],
      text: "Text Reader",
    },
    btnReadingLine: {
      active: true,
      dataAccessibility: "translate",
      class: "setAccessibility",
      icon: "FontAwesome",
      iconClass: ["fas", "fa-language"],
      text: "",
      "aria-label": "Translate"
    },
    
    btnReset: {
      active: true,
      dataAccessibility: "reset",
      class: "setAccessibility",
      icon: "FontAwesome",
      iconClass: ["fas", "fa-redo-alt"],
      text: "Reset",
    },
  }

  /**
   * Creating the bar
   */

  const accessibilityBar = document.createElement("div");
  accessibilityBar.id = "accessibilityBar";
  document.body.insertBefore(accessibilityBar, document.body.firstChild);

  /**
   * Creating main button
   */
  let btnAccessibilityBar;

  function createMainButton() {
      btnAccessibilityBar = document.createElement("button");
      btnAccessibilityBar.id = "universalAccessBtn";
      btnAccessibilityBar.type = "button";
      // Remove the accesskey attribute or set it appropriately
      // btnAccessibilityBar.accessKey = accessKey;
      btnAccessibilityBar.setAttribute("aria-label", "Accessibility Button"); 
      accessibilityBar.appendChild(btnAccessibilityBar);
    
      const icon = document.createElement("i");
      btnAccessibilityBar.appendChild(icon);
      icon.classList.add("fas", "fa-universal-access");
  }
  


  let windowsize =window.matchMedia("(min-width: 600px)");
  if (windowsize.matches) { // If media query matches
    createMainButton();  
    } 

  /**
   * Creating anothers button
   */

  function createButtons(el) {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add(el.class);
    button.setAttribute('data-accessibility', el.dataAccessibility);
    accessibilityBar.appendChild(button);

    const wrapIcon = document.createElement("strong");
    button.appendChild(wrapIcon);

    if (el.icon === "FontAwesome") {
      const icon = document.createElement("i");
      wrapIcon.appendChild(icon);
      icon.classList.add(...el.iconClass);
    } else {
      const textIcon = document.createTextNode(el.icon);
      wrapIcon.appendChild(textIcon);
    }

    const textButton = document.createTextNode(el.text);
    button.appendChild(textButton);
  }

  Object.keys(btns).forEach(function (item) {
    if(btns[item].active){
      createButtons(btns[item]);
    }
   });

  const translate_button_position = document.getElementsByClassName("setAccessibility");
  
  var google_translate = document.createElement("div");
  google_translate.id = "google_translate_element";
  translate_button_position[7].appendChild(google_translate);

  const html = document.documentElement; //<html> for font-size settings
  const body = document.body; //<body> for the adjusts classes
  const btnAccessibility = document.querySelectorAll(".setAccessibility"); // Getting settings buttons

  if (btnAccessibilityBar) {
    setTimeout(function() {
      btnAccessibilityBar.classList.add("collapsed");
    }, 2000);
  }

  
  /*
=== === === === === === === === === === === === === === === === === ===
=== === === === === === === === openBar === === === === === === === ===
=== === === === === === === === === === === === === === === === === ===
*/

  btnAccessibilityBar.addEventListener("click", () =>
    accessibilityBar.classList.toggle("active")
  );

  /*
=== === === === === === === === === === === === === === === === === ===
=== === === === === ===  toggleAccessibilities  === === === === === ===
=== === === === === === === === === === === === === === === === === ===
*/
let voice_menu = 0;
  function toggleAccessibilities(action) {
    switch (action) {
      case "contrast":
        window.toggleContrast();
        break;
      case "dark":
        window.toggleDark();
        break;
      case "incFont":
        window.toggleFontSize(action);
        break;
      case "oriFont":
        window.toggleFontSize(action);
        break;
      case "decFont":
        window.toggleFontSize(action);
        break;
      case "underline":
        window.toggleUnderline();
        break;
      case "voiceFeature":
        if(voice_menu == 0){
        voice_menu = 1;
        localStorage.setItem("voice_menu", voice_menu);
        var selection = new Selection();
          selection.config({
              facebook: true,
              twitter: true,
              search: true,
              copy: true,
              speak: true,
              backgroundColor: 'crimson',
              iconColor: '#fff',
          }).init();
          
        }else{
          voice_menu = 0;        
          localStorage.setItem("voice_menu", voice_menu); 
        console.log("Selection Object Else :"+selection);
        }
        console.log("Voice Feature Value :"+localStorage.getItem("voice_menu"));

        break;
      case "reset":
        Dark.currentState === true ? Dark.setState(false) : null;
        Contrast.currentState === true ? Contrast.setState(false) : null;
        window.toggleFontSize("oriFont");
        Underline.currentState === true ? Underline.setState(false) : null;
        voice_menu = 0;
        localStorage.setItem("voice_menu", voice_menu);
        break;
      default:
        break;
    }
    if (action != 'translate')
    accessibilityBar.classList.toggle("active");
  }

  btnAccessibility.forEach(button =>
    button.addEventListener("click", () =>
      toggleAccessibilities(button.dataset.accessibility)
    )
  );

/*
=== === === === === === === === === === === === === === === === === ===
=== === === === === === ===  FontSize   === === === === === === === ===
=== === === === === === === === === === === === === === === === === ===
*/
allpagesfont();
  function allpagesfont() {
	fnt_in = localStorage.getItem("fnt_in");
	fnt_de = localStorage.getItem("fnt_de");
 

    var elems = $("body").find("*"),
    len = elems.length,
    elem,
    elemText,
    i,
    //we assign unnecessary elements
    unwanted = ["img","script","div"],
    fonts = [];
    
      //a normal loop
      for (var i = 0; i < elems.length; i++) {
        fonts.push(parseFloat(elems.eq(i).css('font-size')));
      }

      if(fnt_in-fnt_de>0)
      {
        
        for (var i = 0; i <elems.length ; i++) {
          if(elems[i].className != "setAccessibility"){

          for (let j=0;j<elems.children.length;j++){
              
              let child = elems[i].firstChild,
              texts = [];
              
              while (child) {
                      if (child.nodeType == 3) {
                          texts.push(child.data);
                         
                      }
                      child = child.nextSibling;
                  }
  
                var text = texts.splice(/\r?\n/).filter(line => line.trim() !== "");
                
                if(text != "")
                {
                fonts[i]= +fonts[i] + +(fnt_in-fnt_de);
                elems.eq(i).css('cssText', 'font-size: '+fonts[i]+'px !important');
  
                }
  
                  };
  
            }
          }

      }else if (fnt_in-fnt_de<0){
        
        for (var i = 0; i <elems.length ; i++) {

        for (let j=0;j<elems.children.length;j++){
          if(elems[i].className != "setAccessibility"){
            let child = elems[i].firstChild,
            texts = [];
            
            while (child) {
                    if (child.nodeType == 3) {
                        texts.push(child.data);
                        
                    }
                    child = child.nextSibling;
                }

              var text = texts.splice(/\r?\n/).filter(line => line.trim() !== "");
              
              if(text != "")
              {
              fonts[i]= +fonts[i] - +(fnt_de-fnt_in);
              elems.eq(i).css('cssText', 'font-size: '+fonts[i]+'px !important');

              }

          
                };
            
          }
        }
      }else{
       
      }


}

const htmlFontSize = parseFloat(
	getComputedStyle(document.documentElement).getPropertyValue("font-size")
  );
  let FontSize = {
	storage: "fontSizeState",
	cssClass: "fontSize",
	currentState: null,
	check: checkFontSize,
	getState: getFontSizeState,
	setState: setFontSizeState,
	toggle: toggleFontSize,
	updateView: updateViewFontSize
  };
  
  window.toggleFontSize = function(action) {
	FontSize.toggle(action);
  };
  
  FontSize.check();
  
  function checkFontSize() {
	this.updateView();
  }
  
  function getFontSizeState() {
	return sessionStorage.getItem(this.storage)
	  ? sessionStorage.getItem(this.storage)
	  : 100;
  }
  
  function setFontSizeState(state) {
	sessionStorage.setItem(this.storage, "" + state);
	this.currentState = state;
	this.updateView();
  }
  
  function updateViewFontSize() {
	if (this.currentState === null) this.currentState = this.getState();
  
	this.currentState
	  ?/* (html.style.fontSize = (this.currentState / 100) * htmlFontSize + "px")*/""
	  : "";
  
	this.currentState
	  ? body.classList.add(this.cssClass + this.currentState)
	  : "";
  }
  function getFontSize() {
	
  var fonts = [];
	for (var i = 0; i < $cElements.length; i++) {
		 fonts.push(parseFloat($cElements.eq(i).css('font-size')));
  }
  }

  
  var fnt_in=0,fnt_de=0;
  function toggleFontSize(action) {
	switch (action) {
	  
    case "incFont":
		
	  
	   /*
  === === === === === === === === === === === === === === === === === ===
  === === === === === === ===  Increase Font Size   === === === === === === === ===
  === === === === === === === === === === === === === === === === === ===
  */
	  
    var elems = $("body").find("*"),
    
    len = elems.length,
    elem,
    elemText,
    i,
    
    unwanted = ["img","script"],
    fonts = [];
    if(localStorage.getItem("fnt_in")<7){
    for (var i = 0; i < elems.length; i++) {
      fonts.push(parseFloat(elems.eq(i).css('font-size')));
    }
    /*Checking Code*/
    
    for (var i = 0; i <elems.length ; i++) {
      if(elems[i].className != "setAccessibility"){
        for (let j=0;j<elems.children.length;j++){
            
            let child = elems[i].firstChild,
            texts = [];
            
            while (child) {
                    if (child.nodeType == 3) {
                        texts.push(child.data);
                        
                    }
                    child = child.nextSibling;
                }

              var text = texts.splice(/\r?\n/).filter(line => line.trim() !== "");
              
              if(text != "")
              {
              fonts[i]= Number(fonts[i])+2.5;
              elems.eq(i).css('cssText', 'font-size: '+fonts[i]+'px !important');

              }

              
                };
            
          }
        }
 
    fnt_in= +fnt_in + +2.5;
    localStorage.setItem("fnt_in", fnt_in);
    if(localStorage.getItem("fnt_in")-localStorage.getItem("fnt_de")==0){
     
      window.toggleFontSize("oriFont");
    }
    }
		break;

	  case "oriFont":

      
			
      fnt_in = localStorage.getItem("fnt_in");
			fnt_de = localStorage.getItem("fnt_de");
			
        var elems = $("body").find("*"),
        
        len = elems.length,
        elem,
        elemText,
        i,
        
        unwanted = ["img","script"],
        fonts = [];
      if(fnt_in-fnt_de>0)
      {
        
        for (var i = 0; i <elems.length ; i++) {

          if(elems[i].className != "setAccessibility"){

          for (let j=0;j<elems.children.length;j++){
              
              let child = elems[i].firstChild,
              texts = [];
              
              while (child) {
                      if (child.nodeType == 3) {
                          texts.push(child.data);
                          
                      }
                      child = child.nextSibling;
                  }
  
                var text = texts.splice(/\r?\n/).filter(line => line.trim() !== "");
                
                if(text != "")
                {
                fonts[i]= +fonts[i] - +(fnt_in-fnt_de);
                elems.eq(i).css('cssText', 'font-size: '+fonts[i]+'px !important');
  
                }
  
               
                  };
              
            }
        }

      }else if (fnt_in-fnt_de<0){
          for (var i = 0; i <elems.length ; i++) {
            if(elems[i].className != "setAccessibility"){

            for (let j=0;j<elems.children.length;j++){
                
                let child = elems[i].firstChild,
                texts = [];
                
                while (child) {
                        if (child.nodeType == 3) {
                            texts.push(child.data);
                            
                        }
                        child = child.nextSibling;
                    }

                  var text = texts.splice(/\r?\n/).filter(line => line.trim() !== "");
                  
                  if(text != "")
                  {
                  fonts[i]= +fonts[i] + +(fnt_de-fnt_in);
                  elems.eq(i).css('cssText', 'font-size: '+fonts[i]+'px !important');

                  }

                
                    };
                
              }
          }
      }else{
        
      }
      
      
        fnt_in=0;
			  localStorage.setItem("fnt_in", fnt_in);	
			  fnt_de=0;
			  localStorage.setItem("fnt_de", fnt_de);	
        
		break;

		 /*
			Testing 
		 */
		/*
  === === === === === === === === === === === === === === === === === ===
  === === === === === === ===  Set To Original Font Size   === === === === === === === ===
  === === === === === === === === === === === === === === === === === ===
  */

	  case "decFont":
      
      var elems = $("body").find("*"),
      len = elems.length,
      elem,
      elemText,
      i,
      unwanted = ["img","script"],
      fonts = [];
      
      if(localStorage.getItem("fnt_de")<7){
        //a normal loop
        for (var i = 0; i < elems.length; i++) {
          fonts.push(parseFloat(elems.eq(i).css('font-size')));
        }

        for (var i = 0; i <elems.length ; i++) {
          if(elems[i].className != "setAccessibility"){
          for (let j=0;j<elems.children.length;j++){
              
              let child = elems[i].firstChild,
              texts = [];
              
              while (child) {
                      if (child.nodeType == 3) {
                          texts.push(child.data);
                          
                      }
                      child = child.nextSibling;
                  }
  
                var text = texts.splice(/\r?\n/).filter(line => line.trim() !== "");
                
                if(text != "")
                {
                fonts[i]= Number(fonts[i])-2.5;
                elems.eq(i).css('cssText', 'font-size: '+fonts[i]+'px !important');
  
                }
  
                  };
                }
            }
         
      
      fnt_de=Number(fnt_de)+2.5;
      
      localStorage.setItem("fnt_de", fnt_de);
      if(localStorage.getItem("fnt_in")-localStorage.getItem("fnt_de")==0){
        
        window.toggleFontSize("oriFont");
      }
          }
  
		break;
    
	  default:
		break;
	}
  }

  /*
=== === === === === === === === === === === === === === === === === ===
=== === === === === ===  HighConstrast  === === === === === === === ===
=== === === === === === === === === === === === === === === === === ===
*/
  let Contrast = {
    storage: "contrastState",
    cssClass: "contrast",
    currentState: null,
    check: checkContrast,
    getState: getContrastState,
    setState: setContrastState,
    toggle: toggleContrast,
    updateView: updateViewContrast
  };

  window.toggleContrast = function() {
    Contrast.toggle();
  };

  Contrast.check();

  function checkContrast() {
    this.updateView();
  }

  function getContrastState() {
    return sessionStorage.getItem(this.storage) === "true";
  }

  function setContrastState(state) {
    sessionStorage.setItem(this.storage, "" + state);
    this.currentState = state;
    this.updateView();
  }

  function updateViewContrast() {
    
    if (this.currentState === null) this.currentState = this.getState();
    
    this.currentState
      ? $('*').addClass('pagina-acessivel')
      : $('*').removeClass('pagina-acessivel');
    
  }

  function toggleContrast() {
    this.setState(!this.currentState);
    Dark.currentState === true ? Dark.setState(false) : null;
  }

  /*
=== === === === === === === === === === === === === === === === === ===
=== === === === === === ===   DarkMode  === === === === === === === ===
=== === === === === === === === === === === === === === === === === ===
*/
  let Dark = {
    storage: "darkState",
    cssClass: "darkmode",
    currentState: null,
    check: checkDark,
    getState: getDarkState,
    setState: setDarkState,
    toggle: toggleDark,
    updateView: updateViewDark
  };

  window.toggleDark = function() {
    Dark.toggle();
  };

  Dark.check();

  function checkDark() {
    this.updateView();
  }

  function getDarkState() {
    return sessionStorage.getItem(this.storage) === "true";
  }

  function setDarkState(state) {
    sessionStorage.setItem(this.storage, "" + state);
    this.currentState = state;
    this.updateView();
  }

  function updateViewDark() {
    if (this.currentState === null) this.currentState = this.getState();

    this.currentState
      ? $('body').addClass("grayscale")
      : $('body').removeClass("grayscale");;
  }

  function toggleDark() {
    this.setState(!this.currentState);
    Contrast.currentState === true ? Contrast.setState(false) : null;
  }

/*
=== === === === === === === === === === === === === === === === === ===
=== === === === === ===  UnderLine  === === === === === === === ===
=== === === === === === === === === === === === === === === === === ===
*/
let Underline = {
  storage: "underlineState",
  cssClass: "underline",
  currentState: null,
  check: checkUnderline,
  getState: getUnderlineState,
  setState: setUnderlineState,
  toggle: toggleUnderline,
  updateView: updateViewUnderline
};

window.toggleUnderline = function() {
  Underline.toggle();
};

Underline.check();

function checkUnderline() {
  this.updateView();
}

function getUnderlineState() {
  return sessionStorage.getItem(this.storage) === "true";
}

function setUnderlineState(state) {
  sessionStorage.setItem(this.storage, "" + state);
  this.currentState = state;
  this.updateView();
}

function updateViewUnderline() {
  
  if (this.currentState === null) this.currentState = this.getState();
  
  this.currentState
    ? $('*').addClass('underline')
    : $('*').removeClass('underline');
  
}

function toggleUnderline() {
  this.setState(!this.currentState);
}

})();


