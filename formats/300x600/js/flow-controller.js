"use strict";

var FlowController = function(stage, maskStage, contentModel)
{
    FlowControllerBase.call(this, stage, maskStage, contentModel);
};

inheritsFrom(FlowController, FlowControllerBase);


$.extend(FlowController.prototype, {

    // overridden methods
    setupFormatSpecificElements: function()
    {
  
        console.log('Animation 300x600');

    },

       init:function()
    {

        console.log('INIT');
        var t = this;

		var docWidth = lib.properties.width;
		var docHeight = lib.properties.height;
	
		// grab various DOM elements
		var ctaBackground = document.getElementById("cta-container");
		var mainContainer = document.getElementById("container");
		//
		var carTitle1Container = document.getElementById("title1-container");
		var carTitle2Container = document.getElementById("title2-container");
		//
		var blackFader = document.getElementById("black-fader");
		//
        this.firstFrameAdjustment = 0
        this.setupCommonElements();
        this.setupFormatSpecificElements()
        // wire up a DOM element for the clickthrough

        // add interaction event listeners
        mainContainer.addEventListener("click", function() {t.handleClickThroughClicked();}, false);
        mainContainer.addEventListener("mouseout", function() { t.handleStageMouseOut(); }, false);
        mainContainer.addEventListener("mouseover", function() { t.handleStageMouseOver(); }, false);
        createjs.Ticker.addEventListener("tick", function(){  t.update(); });

		// create split text elements
		var subtitleLine1SplitText = new SplitText("#subtitle-line1", {type:"words"});
		var subtitleLine2SplitText = new SplitText("#subtitle-line2", {type:"words"});
		var subtitleLine3SplitText = new SplitText("#subtitle-line3", {type:"words"});
		var subtitleLine4SplitText = new SplitText("#subtitle-line4", {type:"words"});
		var subtitleLine5SplitText = new SplitText("#subtitle-line5", {type:"words"});
		var subtitleLine6SplitText = new SplitText("#subtitle-line6", {type:"words"});
		var subtitleLine7SplitText = new SplitText("#subtitle-line7", {type:"words"});
		var subtitleLine8SplitText = new SplitText("#subtitle-line8", {type:"words"});

		// TIRES TIMELINE

		function car_tires(){

			car_tl
				.set('#tire_front',{css:{transform:'skewX(-2.7deg) scale(.40,.68)'}})
				.set('#tire_back',{css:{transform:'skewX(-2.5deg) scale(.25,.52)'}})
				.set('.tire_spin',{rotation:-8})
				.set('.tire_start',{opacity:1})
				.set(['.tire_mid','.tire_end'],{opacity:0})
				.add('car_start')
				.to('.tire_spin',1,{rotation:-730, ease:Power2.easeOut},'car_start')
				.to('.tire_spin',.4,{rotation:-720,ease:Power2.easeInOut},'car_start+=1')
				.to('.tire_start',.2,{opacity:0, ease:Power2.easeOut},'car_start+=.3')
				.to('.tire_mid',.4,{opacity:1, ease:Power2.easeOut},'car_start+=.3')
				.to('.tire_mid',.2,{opacity:0, ease:Power2.easeOut},'car_start+=.6')
				.to('.tire_end',.4,{opacity:1, ease:Power2.easeOut},'car_start+=.5')
			;							
			return car_tl;
		}

		// BLACK FADER in the beginning
		TweenMax.to(blackFader,0.5,{alpha:0, ease: Power2.easeOut})

        // MAIN TIMELINE
				var indexLabel=1;
				var label = "";
				tl.set('#befree_white', {scale: 1.2, x: "-=100", y: "-=200", opacity: 0});
				tl.set('#e-mark', {rotation: -20, x: -7});
				tl.set('#e-key', {rotation: -20, x: -7});
                tl.set('#navy_corner', {scale: 2, x: -110, y: 250});
				
				// INTRO
				indexLabel++;
				label = "pt"+indexLabel;
				tl.addLabel(label);

				tl.to('#navy_corner', 0.5, {x:("+="+(docWidth+200)), opacity: 1}, label+"+=0.7");
				tl.to('#cta-container', 0.5, {y: "-=75", opacity: 1}, label+"+=1");
				tl.from('#base', 1, {x:"+=300", scale:0.5, onStart: function(){ }}, label+"+=1.5");
				tl.add(car_tires, label+"+=1.8");
				tl.from("#title1", 0.4, {css:{rotationY:120, rotationX:-180, y:docHeight}, ease:Power2.easeOut},label+"+=2.3");
				tl.to('#spider', 0.5, {opacity: 1}, label+"+=1.9");
				tl.to('#befree', 0.5, {opacity: 0}, label+"+=2.3");
				tl.to('#leasys', 0.5, {opacity: 1}, label+"+=2.3");
				tl.to('#logo', 0.5, {opacity: 1}, label+"+=2.3");
				tl.staggerFrom(subtitleLine1SplitText.words, 0.4, {y:docHeight, ease:Power2.easeOut},0.025, label);

				tl.to('#navy_corner', 0.5, {x:("-="+(docWidth+200)), delay: 0.5}, label+"+=4");
				tl.to('#cta-container', 0.5, {y: "+=75", delay: 0.7}, label+"+=4");
				tl.to('#spider', 0.5, {opacity: 0}, label+"+=4");
				tl.to('#befree', 0, {x: "-=100", y: "-=200", opacity: 0}, label+"+=4");
				tl.to('#leasys', 0, {opacity: 0}, label+"+=4");
				tl.to('#title1', 0.5, {opacity: 0}, label+"+=4");
				tl.to('#logo', 0.5, {opacity: 0}, label+"+=4");
				tl.to('#base', 1, {x:("-="+(docWidth+100)), y:"+=40", scale:1.4}, label+"+=4");
				tl.add(car_tires, label+"+=4");			

				// ROAD TAX	
				indexLabel++;
				label = "pt"+indexLabel;
				tl.addLabel(label, "-=1.5");

				tl.from('#tax_center', 1, {opacity: 0, scale: 0.8}, label+"+=0.7");
				tl.from('#tax', 0.2, {opacity: 0, scale: 0.8}, label+"+=0.7");
				tl.to('#tax', 4, {rotation:360, ease:Linear.easeNone}, label+"+=0.7");
				
				tl.from("#title2", 0.4, {css:{rotationY:120, rotationX:-180, y:docHeight}, ease:Power2.easeOut},label + "+=1.5");
				tl.staggerFrom(subtitleLine2SplitText.words, 0.4, {x:docWidth, ease:Power2.easeOut},0.025, (label + "+=2"));
				tl.to('#terms1', 0.5, {opacity: 0}, label+"+=2");
				
				tl.staggerTo(subtitleLine2SplitText.words, 0.4, {opacity:0},0, label+"+=3");
				tl.to('#terms1', 0.5, {opacity: 0}, label+"+=3");

				tl.to('#badge', 2, {x:("-="+(docWidth/2+200))}, label+"+=3.1");
				tl.to('#badge', 1.8, {y:("-="+(docHeight+180)), rotation: 60}, label+"+=3.2");

				tl.to('#navy_fader', 2.5, {x:"-=400"}, label+"+=3");
				tl.to('#navy_fader', 2.5, {y:("-="+(docHeight+10)), rotation: 30}, label+"+=3.2");
				
				// GAP WAIVER
				indexLabel++;
				label = "pt"+indexLabel;
				tl.addLabel(label, "-=1.5");

				tl.to('#title2', 0.5, {color:"#f4f0de"}, label+"-=0.7")
				tl.staggerFrom(subtitleLine3SplitText.words, 0.4, {x:docWidth, ease:Power2.easeOut},0.025, (label))
				tl.to('#terms1', 0.5, {opacity: 1, color:"#f4f0de"}, label)

				tl.from('#pound', 0.5, {opacity: 0}, label)
				tl.to("#pound-start", 0.5, {morphSVG:{shape:"#pound-final"}}, label+"+=1")

				tl.staggerTo(subtitleLine3SplitText.words, 0.4, {opacity:0},0, label+"+=2")
				tl.to('#terms1', 0.5, {opacity: 0}, label+"+=2")

				tl.to('#pound', 1, {scale: 14}, label+"+=2")

				//ROADSIDE  ASSISTANCE
				indexLabel++;
				label = "pt"+indexLabel;
				tl.addLabel(label, "-=2");
				
				tl.to('#title2', 0.5, {color:"#254058"}, label + "+=0.8");
				tl.staggerFrom(subtitleLine4SplitText.words, 0.4, {x:docWidth, ease:Power2.easeOut},0.025, (label + "+=2"));
				tl.to('#terms1', 0.5, {opacity: 1, color:"#254058"}, label + "+=2");

				tl.from('#sign', 0.5, {x:("+="+(docWidth))}, label + "+=2.5");
				tl.from('#e-mark', 0.5, {x:("+="+(docWidth))}, label + "+=2.5");
				tl.to('#e-mark', 0.5, {rotation: 20, yoyo: true, repeat: 10, ease: Power2.easeInOut, transformOrigin: "center"}, label + "+=2.7");

				tl.staggerTo(subtitleLine4SplitText.words, 0.4, {opacity:0},0, label+"+=3.7");
				tl.to('#terms1', 0.5, {opacity: 0}, label + "+=3.7");
				tl.to('#sign', 0.5, {x:("-="+(docWidth))}, label + "+=3.7");

				// TYRE REPLACEMENT
				indexLabel++;
				label = "pt"+indexLabel;
				tl.addLabel(label, "-=4");

				tl.from('#navy_solid', 0.5, {x:("+="+(docWidth))}, label);

				tl.to('#title2', 0.5, {color:"#f4f0de"}, label);
				tl.staggerFrom(subtitleLine5SplitText.words, 0.4, {x:docWidth, ease:Power2.easeOut},0.025, (label + "+=.5"));
				tl.to('#terms1', 0.5, {opacity: 1, color:"#f4f0de"}, label + "+=.5");

				tl.from('#wheel', 0.5, {x:("+="+(docWidth)), rotation: 360}, label+"+=.5");
				tl.to("#wheel-start", 1, {morphSVG:{shape:"#wheel-final"}}, label+"+=1");

				tl.staggerTo(subtitleLine5SplitText.words, 0.4, {opacity:0},0, label+"+=2");
				tl.to('#terms1', 0.5, {opacity: 0}, label+"+=2");

				tl.to('#navy_solid', 0.5, {x:("-="+(docWidth))}, label+"+=2.5");
				tl.to('#wheel', 0.5, {x:("-="+(docWidth))}, label + "+=2.5");

				// BREAKDOWN COVER
				indexLabel++;
				label = "pt"+indexLabel;
				tl.addLabel(label, "-=2.5");

				tl.to('#title2', 0.5, {color:"#254058"}, label+"+=0.5");
				tl.staggerFrom(subtitleLine6SplitText.words, 0.4, {x:docWidth, ease:Power2.easeOut},0.025, (label + "+=2"));
				tl.to('#terms1', 0.5, {opacity: 1, color:"#254058"}, label+"+=2");

				tl.from('#truck', 0.5, {x:("+="+(docWidth))}, label+"+=2.5");
				tl.to("#hook-start", 0.5, {morphSVG:{shape:"#hook-final"}}, label+"+=3");
				tl.to("#hook-start", 0.5, {morphSVG:{shape:"#hook-start"}}, label+"+=3.5");
				tl.to("#hook-start", 0.5, {morphSVG:{shape:"#hook-final"}}, label+"+=4");

				tl.staggerTo(subtitleLine6SplitText.words, 0.4, {opacity:0},0, label+"+=5");
				tl.to('#terms1', 0.5, {opacity: 0}, label+"+=5");
				tl.to('#truck', 0.5, {x:("-="+(docWidth))}, label + "+=5");

				// FULL MAINTENANCE
				indexLabel++;
				label = "pt"+indexLabel;
				tl.addLabel(label, "-=3");

				tl.from('#navy_solid_1', 0.5, {x:("+="+(docWidth))}, label + "+=2");

				tl.to('#title2', 0.5, {color:"#f4f0de"}, label + "+=2");
				tl.staggerFrom(subtitleLine7SplitText.words, 0.4, {x:docWidth, ease:Power2.easeOut},0.025, (label + "+=3.5"));
				tl.to('#terms1', 0.5, {opacity: 1, color:"#f4f0de"}, label+"+=3.5");

				tl.from('#key', 0.5, {x:("+="+(docWidth))}, label + "+=3");
				tl.to('#e-key', 0.5, {rotation: 20, yoyo: true, repeat: 10, ease: Power2.easeInOut, transformOrigin: "center"}, label + "+=3");

				tl.to('#title2', 0.5, {opacity: 0}, label+"+=5");
				tl.staggerTo(subtitleLine7SplitText.words, 0.4, {opacity:0},0, label+"+=5");
				tl.to('#terms1', 0.5, {opacity: 0}, label+"+=5");

				tl.to('#navy_solid_1', 0.5, {x:("-="+(docWidth))}, label+"+=5");
				tl.to('#key', 0.5, {x:("-="+(docWidth))}, label + "+=5");

				// RESET SOME DOM OBJECTS
				tl.set('#befree', {x: "+=100", y: "+=170", scale: 1}, label + "+=5.5");
				tl.set('#pound', {autoAlpha: 0}, label + "+=5.5");
				tl.set('#navy_fader', {autoAlpha: 0}, label + "+=5.5");
				tl.set('#base', {x:docWidth, y: 0, scale: 0.5}, label + "+=5.5");

				// FINAL
				indexLabel++;
				label = "pt"+indexLabel;
				tl.addLabel(label, "-=3");

				tl.to('#navy_corner', 0.5, {x:("+="+(docWidth+200))}, label+"+=0.7");
				tl.to('#cta-container', 0.5, {y: "-=75", opacity: 1}, label+"+=1");
				tl.to('#base', 1, {x:0, scale:1}, label+"+=1.5");
				tl.add(car_tires, label+"+=1.8");

				tl.from("#title8", 0.4, {css:{rotationY:120, rotationX:-180, y:docHeight}, ease:Power2.easeOut},label+"+=2.3");
				tl.staggerFrom(subtitleLine8SplitText.words, 0.4, {x:docWidth, ease:Power2.easeOut},0.025, (label + "+=2"));
				tl.to('#spider', 0.5, {opacity: 1}, label+"+=1.9");

				tl.to('#befree', 0.5, {opacity: 0}, label+"+=2.3");
				tl.to('#leasys', 0.5, {opacity: 1, y:"-=30"}, label+"+=2.3");
				tl.to('#logo', 0.5, {opacity: 1}, label+"+=2.3");
				tl.to('#terms', 0.5, {opacity: 1}, label+"+=2.3");		

				tl.duration(29);

				// Super timeline duration output
				console.log("Banner duration is: "+ '\n' + Math.round(tl.duration()) + " seconds" );
				
    },

});
