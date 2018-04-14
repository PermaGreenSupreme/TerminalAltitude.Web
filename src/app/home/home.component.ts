import {
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import * as createjs from 'createjs-module';

import * as moment from 'moment';

import * as typeformEmbed from '@typeform/embed'

import { DeviceDetectorService } from 'ngx-device-detector';
import { DeviceInfo } from 'ngx-device-detector/device-detector.service';

import { AppState } from '../app.service';
import { Title } from './title';
import { HttpClient } from '@angular/common/http';
import { TypeFormService } from '../shared/services/typeform.services';

declare var $: any;
declare var AdobeAn: any;

@Component({
               encapsulation: ViewEncapsulation.None,
               selector     : 'home',
               providers    : [
                   Title
               ],
               styleUrls    : [
                   './home.component.scss',
                   // './contact-form.style.scss'
               ],
               templateUrl  : './home.component.html'
           })
export class HomeComponent
    implements OnInit {

    @ViewChild('roadster') roadster: HTMLImageElement;
    @ViewChild('contactForm') contactForm: ElementRef;
    @ViewChild('actionOverlay') actionOverlay: ElementRef;
    @ViewChild('closeContactFormButton') closeContactFormButton: ElementRef;

    public localState = {value: ''};

    animationEnd: any;
    deviceInfo: DeviceInfo;
    contactFormPopup: any;
    mailingListPopup: any;
    mailingListStartTime: any;
    
    space_station_comp: any;
    space_station_stage: any;
    space_station_canvas: any;
    space_station_anim_container: any;
    space_station_dom_overlay_container: any;

    constructor(public appState: AppState,
                private deviceService: DeviceDetectorService,
                private httpClient: HttpClient,
                private renderer: Renderer2,
                public title: Title,
                private typeFormService: TypeFormService) {
    }

    ngOnInit() {
        this.typeFormService.initServiceBus();
        
        // this.typeFormService.receiveTAFormResults();
        
        /*this.typeFormService.watchTAFormResponses().subscribe((result)=> {
            console.log('TA form response SUCCESS', result);
        }, (err) => {
            console.warn('TA form response error', err);
        });*/
        
        this.animationEnd = (function(el) {
            let animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (let t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.deviceInfo = this.deviceService.getDeviceInfo();

        // console.log('device info', this.deviceInfo);

        if (!this.deviceService.isTablet() && !this.deviceService.isMobile()) {
            this.buildCelestialScene();

            // this.initSpaceStation();
        }

        this.initSpaceStation();

        this.initContactForm();
    }

    buildCelestialScene() {
        /**
         * this.title.getData().subscribe(data => this.data = data);
         */

        let canvas,
            ctx,
            width,
            height,
            size,
            lines,
            tick;

        let canvas2,
            ctx2;

        function line() {
            this.path   = [];
            this.speed  = rand(10, 20);
            this.count  = randInt(10, 30);
            this.x      = width / 2 + 1;
            this.y      = height / 2 + 1;
            this.target = {
                x: width / 2,
                y: height / 2
            };
            this.dist   = 0;
            this.angle  = 0;
            this.hue    = tick / 5;
            this.life   = 1;
            this.updateAngle();
            this.updateDist();
        }

        line.prototype.step = function (i) {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            this.updateDist();

            if (this.dist < this.speed) {
                this.x = this.target.x;
                this.y = this.target.y;
                this.changeTarget();
            }

            this.path.push({
                               x: this.x,
                               y: this.y
                           });
            if (this.path.length > this.count) {
                this.path.shift();
            }

            this.life -= 0.001;

            if (this.life <= 0) {
                this.path = null;
                lines.splice(i, 1);
            }
        };

        line.prototype.updateDist = function () {
            var dx    = this.target.x - this.x,
                dy    = this.target.y - this.y;
            this.dist = Math.sqrt(dx * dx + dy * dy);
        };

        line.prototype.updateAngle = function () {
            var dx     = this.target.x - this.x,
                dy     = this.target.y - this.y;
            this.angle = Math.atan2(dy, dx);
        };

        line.prototype.changeTarget = function () {
            var randStart = randInt(0, 3);
            switch (randStart) {
                case 0: // up
                    this.target.y = this.y - size;
                    break;
                case 1: // right
                    this.target.x = this.x + size;
                    break;
                case 2: // down
                    this.target.y = this.y + size;
                    break;
                case 3: // left
                    this.target.x = this.x - size;
            }
            this.updateAngle();
        };

        line.prototype.draw = function (i) {

            ctx.beginPath();
            var rando = rand(0, 10);
            for (var j = 0, length = this.path.length; j < length; j++) {
                ctx[(j === 0) ? 'moveTo' : 'lineTo'](this.path[j].x + rand(-rando, rando), this.path[j].y + rand(-rando, rando));
            }
            ctx.strokeStyle = 'hsla(' + rand(this.hue, this.hue + 30) + ', 80%, 55%, ' + (this.life / 3) + ')';
            ctx.lineWidth   = rand(0.1, 2);
            ctx.stroke();
        };

        function rand(min, max) {
            return Math.random() * (max - min) + min;
        }

        function randInt(min, max) {
            return Math.floor(min + Math.random() * (max - min + 1));
        };

        function init() {
            console.log('turning on the electricity');
            canvas = document.getElementById('retro-canvas');
            ctx    = canvas.getContext('2d');
            size   = 30;
            lines  = [];
            reset();
            loop();

            /*canvas2 = document.getElementById('overlay-canvas');
            ctx2    = canvas2.getContext('2d');
            let img = new Image(), 
                imgClip = new Image();

            /// make sure our image has loaded
            img.onload = function() {

                /// Method 1 - Using composite mode to clip image
                imgClip.onload = function() {

                    /// draw the shape we want to use for clipping
                    ctx.drawImage(imgClip, 0, 0);

                    /// change composite mode to use that shape
                    ctx.globalCompositeOperation = 'source-in';

                    /// draw the image to be clipped
                    ctx.drawImage(img, 0, 0);

                };
                imgClip.src = 'http://i.imgur.com/kCYeyxx.png';

                /// Mehtod 2 - Using Path to clip image

                /!*ctx2.beginPath();
                ctx2.moveTo(0, 20);
                ctx2.lineTo(50,0);
                ctx2.lineTo(100,20);
                ctx2.lineTo(150, 0);
                ctx2.lineTo(200, 20);
                ctx2.lineTo(250, 0);
                ctx2.lineTo(300, 20);
                ctx2.lineTo(350, 0);
                ctx2.lineTo(400, 20);
                ctx2.lineTo(400, 100);
                ctx2.lineTo(0, 100);
                ctx2.closePath();
                ctx2.clip();*!/

                /// draw the image to be clipped
                // ctx2.drawImage(img, 0, 0);

                /// show the clip image and the image to be clipped
                // var bd = document.getElementsByTagName('body')[0];
                // bd.appendChild(img);
                // bd.appendChild(imgClip);
            };
            img.src = 'http://i.imgur.com/7TPfx2F.jpg?1';*/
        }

        function reset() {
            width  = Math.ceil(window.innerWidth / 2) * 2;
            height = Math.ceil(window.innerHeight / 2) * 2;
            tick   = 0;

            lines.length  = 0;
            canvas.width  = width;
            canvas.height = height;
        }

        function create() {
            if (tick % 120 === 0) {
                // if (tick % 10 === 0) {
                lines.push(new line());
            }
        }

        function step() {
            var i = lines.length;
            while (i--) {
                lines[i].step(i);
            }
        }

        function clear() {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle                = 'hsla(0, 0%, 0%, 0.1';
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'lighter';
        }

        function draw() {
            ctx.save();
            ctx.translate(width / 2, height / 2);
            ctx.rotate(tick * 0.001);
            var scale = 0.8 + Math.cos(tick * 0.02) * 0.2;
            ctx.scale(scale, scale);
            ctx.translate(-width / 2, -height / 2);
            var i = lines.length;
            while (i--) {
                lines[i].draw(i);
            }
            ctx.restore();
        }

        function loop() {
            // if (tick < 500){
            //     console.log('tick', tick);
            requestAnimationFrame(loop);
            create();
            step();
            clear();
            draw();
            tick++;
            /*} else {
                clear();
                reset();
            }*/
        }

        function onresize() {
            reset();
        }

        window.addEventListener('resize', onresize);

        init();
    }

    closeContactForm(){
        /*this.closeContactFormButton.nativeElement.classList.add('fadeOut');
        this.closeContactFormButton.nativeElement.classList.remove('fadeIn');
        
        this.contactForm.nativeElement.classList.add('fadeOut');
        this.contactForm.nativeElement.classList.remove('fadeIn');*/

        // this.showContactForm = -1;

        /*this.actionOverlay.nativeElement.classList.remove('fadeOut');
        this.actionOverlay.nativeElement.classList.add('fadeIn');   */
    }
    
    closeMailingListForm(){
        /*this.httpClient.get(`https://api.typeform.com/forms/quUBwh/responses?completed=true&page_size=1&since=${this.mailingListStartTime}`, {
            
        })*/
    }

    contactFormSubmit(result){
        console.log('contact form submitted', result);
    }

    initContactForm() {
        /*$('.form')
            .on('click', function () {
                $(this)
                    .addClass('active');
            });

        $('.submit')
            .on('click', function () {
                $(this)
                    .parent()
                    .parent()
                    .hide(300);
                $('.ok_message')
                    .addClass('active');
            });

        $('.ok_message')
            .on('click', function () {
                $(this)
                    .removeClass('active');
                $('.form')
                    .removeClass('active')
                    .show();
            });*/
    }

    initSpaceStation() {
        let _that = this;

        let exportRoot, fnStartAnimation;

        function init() {
            _that.space_station_canvas                = document.getElementById("space_station_canvas");
            _that.space_station_anim_container        = document.getElementById("space_station_animation_container");
            _that.space_station_dom_overlay_container = document.getElementById("space_station_dom_overlay_container");
            _that.space_station_comp                  = AdobeAn.getComposition("AF4B01FCB6E0A247BC628A7467519FDD");
            let lib                                   = _that.space_station_comp.getLibrary();
            let loader                                = new createjs.LoadQueue(false);
            loader.addEventListener("fileload", function (evt) {
                handleFileLoad(evt, _that.space_station_comp)
            });
            loader.addEventListener("complete", function (evt) {
                handleComplete(evt, _that.space_station_comp)
            });
            lib = _that.space_station_comp.getLibrary();
            loader.loadManifest(lib.properties.manifest);
        }

        function handleFileLoad(evt, comp) {
            let images = comp.getImages();
            if (evt && (evt.item.type == "image")) {
                images[evt.item.id] = evt.result;
            }
        }

        function handleComplete(evt, comp) {
            //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
            let lib        = comp.getLibrary();
            let ss         = comp.getSpriteSheet();
            let queue      = evt.target;
            let ssMetadata = lib.ssMetadata;
            for (let i = 0; i < ssMetadata.length; i++) {
                ss[ssMetadata[i].name] = new createjs.SpriteSheet({
                                                                      "images": [queue.getResult(ssMetadata[i].name)],
                                                                      "frames": ssMetadata[i].frames
                                                                  })
            }
            exportRoot                = new lib.space_station_animated();
            _that.space_station_stage = new lib.Stage(_that.space_station_canvas);
            //Registers the "tick" event listener.
            fnStartAnimation          = function () {
                _that.space_station_stage.addChild(exportRoot);
                createjs.Ticker.setFPS(lib.properties.fps);
                createjs.Ticker.addEventListener("tick", _that.space_station_stage);
            };

            //Code to support hidpi screens and responsive scaling.
            function makeResponsive(isResp, respDim, isScale, scaleType) {
                let lastW, lastH, lastS = 1;
                window.addEventListener('resize', resizeCanvas);
                resizeCanvas();

                function resizeCanvas() {
                    let w      = lib.properties.width, h = lib.properties.height;
                    let iw     = window.innerWidth, ih = window.innerHeight;
                    let pRatio = window.devicePixelRatio || 1, xRatio = iw / w, yRatio = ih / h, sRatio = 1;
                    if (isResp) {
                        if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
                            sRatio = lastS;
                        }
                        else if (!isScale) {
                            if (iw < w || ih < h) {
                                sRatio = Math.min(xRatio, yRatio);
                            }
                        }
                        else if (scaleType == 1) {
                            sRatio = Math.min(xRatio, yRatio);
                        }
                        else if (scaleType == 2) {
                            sRatio = Math.max(xRatio, yRatio);
                        }
                    }
                    _that.space_station_canvas.width       = w * pRatio * sRatio;
                    _that.space_station_canvas.height      = h * pRatio * sRatio;
                    _that.space_station_canvas.style.width = _that.space_station_dom_overlay_container.style.width = _that.space_station_anim_container.style.width = w * sRatio + 'px';
                    _that.space_station_canvas.style.height = _that.space_station_anim_container.style.height = _that.space_station_dom_overlay_container.style.height = h * sRatio + 'px';
                    _that.space_station_stage.scaleX       = pRatio * sRatio;
                    _that.space_station_stage.scaleY       = pRatio * sRatio;
                    lastW                                  = iw;
                    lastH                                  = ih;
                    lastS                                  = sRatio;
                    _that.space_station_stage.tickOnUpdate = false;
                    _that.space_station_stage.update();
                    _that.space_station_stage.tickOnUpdate = true;
                }
            }

            makeResponsive(false, 'width', false, 1);
            // makeResponsive(true,'width',false,1);
            AdobeAn.compositionLoaded(lib.properties.id);
            fnStartAnimation();

            let stage: createjs.Stage                       = _that.space_station_stage;
            let space_station_animation: createjs.MovieClip = <createjs.MovieClip>stage.getChildAt(0);
            // let space_station_animation: createjs.Container = <createjs.Container>stage.getChildAt(0);

            setInterval(() => {
                space_station_animation.gotoAndPlay(0);
            }, 42000);
        }

        init();
    }

    openContactForm(){
        this.contactFormPopup = typeformEmbed.makePopup('https://terminalaltitude.typeform.com/to/n88S4D?typeform-welcome=1', {
            autoClose: false,
            autoOpen: false,
            // autoClose: 5000,
            // buttonText : 'OK, Got It',
            hideFooter : true,
            hideHeaders: true,
            mode       : 'drawer_left',
            opacity    : 100,
            onSubmit   : this.contactFormSubmit
        });
        
        this.mailingListStartTime = moment();

        this.contactFormPopup.open();
    }

    openMailingListSignUp() {
        // const embedElement = document.querySelector('.contact-form');

        this.mailingListPopup = typeformEmbed.makePopup('https://terminalaltitude.typeform.com/to/quUBwh?typeform-welcome=1', {
            // const typeformWidget = typeformEmbed.makeWidget(embedElement, 'https://permagreen.typeform.com/to/n88S4D?typeform-welcome=1', {
            autoClose: false,
            autoOpen: false,
            // autoClose: 5000,
            // buttonText : 'OK, Got It',
            hideFooter : true,
            hideHeaders: true,
            // mode: 'popup',
            mode       : 'drawer_right',
            opacity    : 100,
            onSubmit   : this.mailingListSubmit.bind(this)
        });

        this.mailingListPopup.open();

        /*this.renderer.listen(this.contactForm.nativeElement, this.animationEnd,  (evt) => {
            console.log('contact form show', evt);
            if (evt.animationName == 'fadeIn'){
                // console.log('contactForm is shown');
                this.closeContactFormButton.nativeElement.classList.remove('fadeOut');    
                this.closeContactFormButton.nativeElement.classList.add('fadeIn');    
            } else {
                // console.log('contactForm is hidden');
                this.showContactForm = 0;
                // this.closeContactFormButton.nativeElement.classList.remove('fadeIn');
                // this.closeContactFormButton.nativeElement.classList.add('fadeOut');
                /!*this.actionOverlay.nativeElement.classList.remove('fadeOut');
                this.actionOverlay.nativeElement.classList.add('fadeIn');*!/
            }
        });*/

        // this.actionOverlay.nativeElement.classList.remove('fadeIn');
        // this.actionOverlay.nativeElement.classList.add('fadeOut');

        // this.contactForm.nativeElement.classList.remove('fadeOut');
        // this.contactForm.nativeElement.classList.add('fadeIn');
    }

    mailingListSubmit(args?) {
        console.log('subscribed to mailing list', args);
        this.closeMailingListForm();
    }

    public submitState(value: string) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    }

    //region OBSOLETE 

    /*public buildNebula2() {
        ////////////////////////////
        // A demonstration of a Canvas nebula effect
        // (c) 2010 by R Cecco. <http://www.professorcloud.com>
        // MIT License
        //
        // Please retain this copyright header in all versions of the software if
        // using significant parts of it
        //////////////////////////

        $(document)
            .ready(function () {

                (function ($) {
                    console.log('init');
                    // The canvas element we are drawing into.      
                    var $canvas  = $('#canvas2');
                    var $canvas2 = $('#canvas');
                    var $canvas3 = $('#canvas3');
                    var ctx2     = $canvas2[0].getContext('2d');
                    var ctx      = $canvas[0].getContext('2d');
                    var w        = $canvas[0].width, h = $canvas[0].height;
                    var img      = new Image();

                    // A puff.
                    var Puff = function (p) {
                        var opacity,
                            sy = (Math.random() * 285) >> 0,
                            sx = (Math.random() * 285) >> 0;

                        this.p = p;

                        this.move = function (timeFac) {
                            p       = this.p + 0.3 * timeFac;
                            opacity = (Math.sin(p * 0.05) * 0.5);
                            if (opacity < 0) {
                                p = opacity = 0;
                                sy = (Math.random() * 285) >> 0;
                                sx = (Math.random() * 285) >> 0;
                            }
                            this.p          = p;
                            ctx.globalAlpha = opacity;
                            ctx.drawImage($canvas3[0], sy + p, sy + p, 285 - (p * 2), 285 - (p * 2), 0, 0, w, h);
                        };
                    };

                    var puffs    = [];
                    var sortPuff = function (p1, p2) {
                        return p1.p - p2.p;
                    };
                    puffs.push(new Puff(0));
                    puffs.push(new Puff(20));
                    puffs.push(new Puff(40));

                    var newTime, oldTime = 0, timeFac;

                    var loop = function () {
                        newTime = new Date().getTime();
                        if (oldTime === 0) {
                            oldTime = newTime;
                        }
                        timeFac = (newTime - oldTime) * 0.1;
                        if (timeFac > 3) {
                            timeFac = 3;
                        }
                        oldTime = newTime;
                        puffs.sort(sortPuff);

                        for (var i = 0; i < puffs.length; i++) {
                            puffs[i].move(timeFac);
                        }
                        ctx2.drawImage($canvas[0], 0, 0, 570, 570);
                        setTimeout(loop, 10);
                    };
                    // Turns out Chrome is much faster doing bitmap work if the bitmap is in an existing canvas rather
                    // than an IMG, VIDEO etc. So draw the big nebula image into canvas3
                    var $canvas3 = $('#canvas3');
                    var ctx3     = $canvas3[0].getContext('2d');
                    $(img)
                        .bind('load', null, function () {
                            ctx3.drawImage(img, 0, 0, 570, 570);
                            loop();
                        });
                    img.src = 'http://jim-east.site/images/nebula.jpg';

                })(jQuery);
            });
    }*/

    /*public buildNebula1() {
        let canvas, c, w, h,
            twoPI = Math.PI * 2,
            mX, mY, status;

        function buildNebula() {
            canvas = document.createElement('canvas')
            w      = canvas.width = window.innerWidth - 40;
            h = canvas.height = window.innerHeight - 40;
            c      = canvas.getContext('2d');
            status = document.getElementById("status");

            document.body.appendChild(canvas);

            generate();
            canvas.addEventListener('click', function () {
                generate();
            });
            window.addEventListener('resize', function () {
                canvas.width = w = window.innerWidth - 40;
                canvas.height = h = window.innerHeight - 40;
            });
        };

        function generate() {
            c.clearRect(0, 0, w, h);
            status.style.display = "block";
            status.innerHTML     = "[ generating nebula ]";
            window.setTimeout(function () {
                var nebula = new Nebula(6, 100);
            }, 100);
        }

        function Star(x, y, r, c, b) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.c = c;
            this.b = b;
        }

        function Colour(h, s, l, a) {
            this.h         = h;
            this.s         = s;
            this.l         = l;
            this.a         = a;
            this.fillStyle = function () {
                return "hsla(" + this.h + "," + this.s + "%," + l + "%," + this.a + ")";
            };
        }

        function Nebula(clusters, starsPerCluster) {
            this.points = [];
            this.draw   = function () {
                var p = this.points;

                // background star-field
                c.fillStyle = "hsla(0,100%,100%,1)";
                for (var i = 0; i < 1000; i++) {
                    c.beginPath();
                    c.arc(Math.random() * w, Math.random() * h, Math.random() * 0.75, 0, twoPI, true);
                    c.closePath();
                    c.fill();
                }

                // nebula clouds
                c.globalCompositeOperation = "lighter";
                for (var i = 0; i < p.length; i++) {
                    var grad = c.createRadialGradient(p[i].x, p[i].y, p[i].r, p[i].x, p[i].y, p[i].b);
                    grad.addColorStop(0, "hsla(" + p[i].c.h + ",100%,20%,0.06)");
                    grad.addColorStop(1, "hsla(" + p[i].c.h + ",100%,20%,0)");
                    c.fillStyle = grad;
                    c.beginPath();
                    c.arc(p[i].x, p[i].y, p[i].b, 0, twoPI, true);
                    c.closePath();
                    c.fill();
                }

                // nebula stars
                for (var i = 0; i < p.length; i++) {
                    c.beginPath();
                    c.arc(p[i].x, p[i].y, p[i].r, 0, twoPI, true);
                    c.closePath();
                    c.fillStyle = p[i].c.fillStyle();
                    c.fill();
                }

                // interstellar dust
                c.globalCompositeOperation = "source-over";
                var x1                     = 0,
                    y1                     = Math.random() * h * 0.40 + h * 0.30,
                    x2                     = w,
                    y2                     = Math.random() * h * 0.40 + h * 0.30,
                    v1                     = x2 - x1,
                    v2                     = y2 - y1,
                    vD                     = Math.sqrt(v1 * v1 + v2 * v2),
                    vA                     = Math.atan2(v2, v1);

                for (var i = 0; i < 1000; i++) {
                    var rnd  = i - 500,
                        r    = Math.abs(Math.random() * rnd / 2) + 10,
                        x    = x1 + (Math.cos(vA) * vD / 1000 * i) + Math.random() * rnd - rnd / 2,
                        y    = y1 + (Math.sin(vA) * vD / 1000 * i) + Math.random() * rnd - rnd / 2,
                        grad = c.createRadialGradient(x, y, 0, x, y, r);

                    grad.addColorStop(0, "hsla(0,0%,0%,0.08)");
                    grad.addColorStop(1, "hsla(0,0%,0%,0)");

                    c.fillStyle = grad;
                    c.beginPath();
                    c.arc(x, y, r, 0, twoPI, true);
                    c.closePath();
                    c.fill();
                }

                c.fillStyle = "hsla(0,100%,100%,0.25)";
                for (var i = 0; i < 200; i++) {
                    c.beginPath();
                    c.arc(Math.random() * w, Math.random() * h, Math.random() * 0.75, 0, twoPI, true);
                    c.closePath();
                    c.fill();
                }

                // close stars
                c.globalCompositeOperation = "lighter";
                for (var i = 0; i < 5; i++) {
                    var x    = Math.random() * w,
                        y    = Math.random() * h,
                        r    = Math.random() * 400,
                        hue  = Math.floor(Math.random() * 360),
                        grad = c.createRadialGradient(x, y, 0, x, y, r);

                    grad.addColorStop(0, "hsla(" + hue + "0,25%,100%,1)");
                    grad.addColorStop(0.01, "hsla(" + hue + ",25%,75%,0.75)");
                    grad.addColorStop(1, "hsla(" + hue + ",0%,0%,0)");

                    c.fillStyle = grad;
                    c.beginPath();
                    c.arc(x, y, r, 0, twoPI, true);
                    c.closePath();
                    c.fill();
                }

                window.setTimeout(function () {
                    status.style.display = "none";
                }, 500);
            };
            this.init   = function () {
                for (var j = 0; j < clusters; j++) {
                    var x1 = Math.random() * w * 0.50 + w * 0.25,
                        y1 = Math.random() * h * 0.40 + h * 0.30;
                    for (var i = 0; i < starsPerCluster; i++) {
                        var x = x1 + Math.cos(Math.random() * twoPI) * (Math.random() * 7000 / (i + 1)),
                            y = y1 + Math.sin(Math.random() * twoPI) * (Math.random() * 7000 / (i + 1)),
                            r = Math.random() * 2;
                        if (x > w) {
                            continue;
                        }
                        if (x < 0) {
                            continue;
                        }
                        if (y > h) {
                            continue;
                        }
                        if (y < 0) {
                            continue;
                        }
                        var col = new Colour(Math.random() * 360, 50, Math.floor(Math.random() * 50 + 50), 1);
                        this.points.push(new Star(x, y, r, col, Math.random() * 200));
                    }
                }
                this.draw();
            };
            this.init();
        };

        buildNebula();
    }*/

    //endregion OBSOLETE
}
