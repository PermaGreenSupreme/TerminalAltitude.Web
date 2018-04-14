(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"space_station_atlas_", frames: [[72,41,50,47],[0,0,100,39],[0,41,70,49]]}
];


// symbols:



(lib.red_light_aura = function() {
	this.spriteSheet = ss["space_station_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.space_station_animated_0 = function() {
	this.spriteSheet = ss["space_station_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.tesla_roadster_starman = function() {
	this.spriteSheet = ss["space_station_atlas_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.mc_starman = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.tesla_roadster_starman();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.mc_starman, new cjs.Rectangle(0,0,70,49), null);


(lib.mc_red_light_strobe = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.red_light_aura();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.14,0.128);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.mc_red_light_strobe, new cjs.Rectangle(0,0,7,6.1), null);


(lib.mc_iss = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.space_station_animated_0();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.mc_iss, new cjs.Rectangle(0,0,100,39), null);


(lib.mc_red_light_aura = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_1 = function() {
		this.play();
	}
	this.frame_47 = function() {
		this.gotoAndPlay(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(46).call(this.frame_47).wait(1));

	// Layer_1
	this.instance = new lib.mc_red_light_strobe();
	this.instance.parent = this;
	this.instance.setTransform(2.8,3,2,2,0,0,0,3.5,3);
	this.instance.alpha = 0.199;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},23).to({alpha:0.191},24).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.2,-3,14,12.1);


(lib.iss = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.mc_red_light = new lib.mc_red_light_aura();
	this.mc_red_light.name = "mc_red_light";
	this.mc_red_light.parent = this;
	this.mc_red_light.setTransform(46.5,24.3,1,1,0,0,0,3.5,3);

	this.mc_iis = new lib.mc_iss();
	this.mc_iis.name = "mc_iis";
	this.mc_iis.parent = this;
	this.mc_iis.setTransform(50,19.5,1,1,0,0,0,50,19.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_iis},{t:this.mc_red_light}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.iss, new cjs.Rectangle(0,0,100,39), null);


(lib.mc_space_station_animated = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.mc_space_station = new lib.iss();
	this.mc_space_station.name = "mc_space_station";
	this.mc_space_station.parent = this;
	this.mc_space_station.setTransform(50,19.5,1,1,0,0,0,50,19.5);

	this.timeline.addTween(cjs.Tween.get(this.mc_space_station).wait(1));

}).prototype = getMCSymbolPrototype(lib.mc_space_station_animated, new cjs.Rectangle(0,0,100,39), null);


// stage content:
(lib.space_station_animated = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.mc_space_station_animation = new lib.mc_space_station_animated();
	this.mc_space_station_animation.name = "mc_space_station_animation";
	this.mc_space_station_animation.parent = this;
	this.mc_space_station_animation.setTransform(-49,25.5,1,1,0,0,0,50,19.5);

	this.instance = new lib.mc_starman();
	this.instance.parent = this;
	this.instance.setTransform(-54.2,26.9,0.5,0.498,0,0,0,34.1,25.9);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.mc_space_station_animation).to({x:1968,y:22.5},479).to({_off:true,regX:34.1,regY:25.9,scaleX:0.5,scaleY:0.5,x:-54.2,y:26.9},1).wait(480));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(479).to({_off:false},1).to({regX:35.5,regY:25.1,scaleY:0.5,x:1941.9,y:26.6},479).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(861,31,100,39);
// library properties:
lib.properties = {
	id: 'AF4B01FCB6E0A247BC628A7467519FDD',
	width: 1920,
	height: 50,
	fps: 24,
	color: "#FFFFFF",
	opacity: 0.00,
	manifest: [
		{src:"images/space_station_atlas_.png", id:"space_station_atlas_"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['AF4B01FCB6E0A247BC628A7467519FDD'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;