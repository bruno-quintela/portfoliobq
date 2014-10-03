'use strict';
/*global THREE:false */
/*global THREEx:false */
/*global Modernizr:false */
/*global Stats:false */
/*global dat:false */
/*global requestAnimationFrame:false */
/*global threejsCanvas:false */
/* How to remove DOM element after animation/transition */
/*$("#someSelector").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ ... });*/
/*$("#someSelector").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){ ... });*/
/*var Page = function() {
    this.system = {
        isTouch:bool,
        init: function() {},
        browser: {
            name:string,
            version:string,
            init:function() {},
            ...
        }
    };
    this.World = {
        settings: {
            statsEnabled: true,
            guiEnabled: true
        },
        config: {
            color: [0, 128, 255],
            antialias: true,
            alpha: true,
            speed1: 0.0141,
            level: 0.75,
            var1: 0.35,
            var2: 0,
            speed2: 0.09,
            random: function() {}
        },
        fpsStats: {},
        gpuStats: {},
        scenes: [],
        renderer: null,
        camera: null,
        lights: [],
        init: function() {},
        addStats: function(),
        addGui: function()
    };
    
    this.$logo = $('.name');
    
};*/
/**
 * Page
 **/
var Page = function() {
    this.system = {
        isTouch: Modernizr.touch,
        supportsWEBGL: true,
        // init System
        init: function() {
            this.browser.init();
            console.log(this.browser.name + '/' + this.browser.version + ' isTouch:' + this.isTouch);
        },
        browser: {
            name: null,
            version: null,
            // init Browser
            init: function() {
                this.name = this.searchString(this.dataBrowser) || 'Other';
                this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'Unknown';
            },
            searchString: function(data) {
                for(var i = 0; i < data.length; i++) {
                    var dataString = data[i].string;
                    this.versionSearchString = data[i].subString;
                    if(dataString.indexOf(data[i].subString) !== -1) {
                        return data[i].identity;
                    }
                }
            },
            searchVersion: function(dataString) {
                var index = dataString.indexOf(this.versionSearchString);
                if(index === -1) {
                    return;
                }
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            },
            dataBrowser: [{
                string: navigator.userAgent,
                subString: 'Chrome',
                identity: 'Chrome'
            }, {
                string: navigator.userAgent,
                subString: 'MSIE',
                identity: 'Explorer'
            }, {
                string: navigator.userAgent,
                subString: 'Firefox',
                identity: 'Firefox'
            }, {
                string: navigator.userAgent,
                subString: 'Safari',
                identity: 'Safari'
            }, {
                string: navigator.userAgent,
                subString: 'Opera',
                identity: 'Opera'
            }]
        }
    };
    // 3D World
    this.World = {
        settings: {
            statsEnabled: true,
            guiEnabled: true
        },
        config: {
            color: [0, 128, 255],
            antialias: true,
            alpha: true,
            level: 0.75,
            cameraX: 0.01,
            cameraY: 0.01,
            cameraZ: 1.0,
            rotateX: 0.0141,
            rotateY: 0.09,
            random: function() {}
        },
        fpsStats: {},
        gpuStats: {},
        scenes: [],
        renderer: null,
        camera: null,
        lights: [],
        // init World
        init: function() {
            var self = this;
            //if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
            this.addStats();
            this.addGui();
            this.renderer = new THREE.WebGLRenderer({
                canvas: threejsCanvas,
                antialias: this.config.antialias,
                alpha: this.config.alpha
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor(0x000000, 0);
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            var geometry = new THREE.BoxGeometry(2, 2, 2);
            var material = new THREE.MeshBasicMaterial({
                color: 0x00ff00
            });
            var cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            
            
           
            
            
            
            
            
            /*var controls = new THREE.OrbitControls(camera);
            
            controls.addEventListener( 'change', render );*/
            
            var render = function() {
                self.fpsStats.update(self.renderer);
                self.gpuStats.update(self.renderer);
                self.renderer.render(scene, camera);
            };
            
            var animate = function() {
                requestAnimationFrame(animate);
                
                camera.position.x = self.config.cameraX * 10;
                camera.position.y = self.config.cameraY * 10;
                camera.position.z = self.config.cameraZ * 10;
                cube.rotation.x += self.config.rotateX;
                cube.rotation.y += self.config.rotateY;
                //controls.update();
                render();
            };
            
            animate();
            
        },
        addGui: function() {
            if(this.settings.guiEnabled) {
                var GUI = new dat.GUI();
                GUI.addColor(this.config, 'color').listen();
                GUI.add(this.config, 'antialias').listen();
                GUI.add(this.config, 'alpha').listen();
                GUI.add(this.config, 'level', 0, 1).listen();
                GUI.add(this.config, 'cameraX', -1, 1).listen();
                GUI.add(this.config, 'cameraY', -1, 1).listen();
                GUI.add(this.config, 'cameraZ', -1, 1).listen();
                GUI.add(this.config, 'rotateX', 0, 0.2).listen();
                GUI.add(this.config, 'rotateY', 0, 0.2).listen();
                GUI.add(this.config, 'random');
            }
        },
        addStats: function() {
            if(this.settings.statsEnabled) {
                //add Threejs stats FPS
                this.fpsStats = new Stats();
                this.fpsStats.setMode(0); // 0: fps, 1: ms
                this.fpsStats.domElement.style.position = 'absolute';
                this.fpsStats.domElement.style.left = '0px';
                this.fpsStats.domElement.style.top = '0px';
                document.body.appendChild(this.fpsStats.domElement);
                //add threex.renderstats WEBGL render
                this.gpuStats = new THREEx.RendererStats();
                this.gpuStats.domElement.style.position = 'absolute';
                this.gpuStats.domElement.style.left = '0px';
                this.gpuStats.domElement.style.bottom = '0px';
                document.body.appendChild(this.gpuStats.domElement);
            }
        }
    };
};
/**
 * Page Init
 **/
Page.prototype.init = function() {
    this.system.init();
    this.World.init();
    console.log('Page init completed');
};
/**
 * On Ready Init Page Prototype
 **/
var myPage = new Page();
$(function() {
    myPage.init();
});