"use strict";
var AppController = function()
{
	AppControllerBase.call(this);

	lib.properties = {
		width: 970,
		height: 250,
		fps: 60,
		color: "#000000",
		manifest: [
			{src:"data/content.json", id:"Content"}
		]
	}
};

inheritsFrom(AppController, AppControllerBase);
