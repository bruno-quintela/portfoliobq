'use strict';
/*global THREE:false */
/*global THREEx:false */
/*global Modernizr:false */
/*global Stats:false */
/*global dat:false */
/*global requestAnimationFrame:false */
/*global threejsCanvas:false */
/* How to remove DOM element after animation/transition */
/*$('#someSelector').bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){ ... });*/
/*$('#someSelector').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(){ ... });*/
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
        configParams: {
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
        transitionParams: {
            'useTexture': true,
            'transition': 0.5,
            'transitionSpeed': 2.0,
            'texture': 5,
            'loopTexture': true,
            'animateTransition': true,
            'textureThreshold': 0.3
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
            this.clock = new THREE.Clock();
            this.addStats();
            this.addGui();
            this.renderer = new THREE.WebGLRenderer({
                canvas: threejsCanvas,
                antialias: this.configParams.antialias,
                alpha: this.configParams.alpha
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor(0x000000, 0);
            /***********************/
            this.SceneA = function() {
                this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                this.camera.position.z = 5;
                var geometry = new THREE.BoxGeometry(2, 2, 2);
                var material = new THREE.MeshBasicMaterial({
                    color: 0x00ff00
                });
                // Setup scene
                this.scene = new THREE.Scene();
                this.scene.add(new THREE.AmbientLight(0x555555));

                var cube = new THREE.Mesh(geometry, material);
                this.scene.add(cube);
                var renderTargetParameters = {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    format: THREE.RGBFormat,
                    stencilBuffer: false
                };
                this.fbo = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters);
                this.render = function(delta, rtt) {

                    //self.renderer.setClearColor(0x000000, 0);
                    if(rtt) {
                        self.renderer.render(this.scene, this.camera, this.fbo, true);
                    } else {
                        self.renderer.render(this.scene, this.camera);
                    }
                };
            };
            this.SceneB = function() {
                this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                this.camera.position.z = 5;
                var geometry = new THREE.BoxGeometry(2, 2, 2);
                var material = new THREE.MeshBasicMaterial({
                    color: 0x00fffff
                });
                // Setup scene
                this.scene = new THREE.Scene();
                this.scene.add(new THREE.AmbientLight(0xfff000));

                var cube = new THREE.Mesh(geometry, material);
                this.scene.add(cube);
                var renderTargetParameters = {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    format: THREE.RGBFormat,
                    stencilBuffer: false
                };
                this.fbo = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters);
                this.render = function(delta, rtt) {

                    //self.renderer.setClearColor(0x000000, 0);
                    if(rtt) {
                        self.renderer.render(this.scene, this.camera, this.fbo, true);
                    } else {
                        self.renderer.render(this.scene, this.camera);
                    }
                };
            };
            this.Transition = function(sceneA, sceneB) {
                this.scene = new THREE.Scene();
                this.cameraOrtho = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -10, 10);
                this.textures = [];
                for(var i = 0; i < 6; i++) {
                    this.textures[i] = new THREE.ImageUtils.loadTexture('../src/textures/transitions/transition' + (i + 1) + '.png');
                }
                this.quadmaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        tDiffuse1: {
                            type: 't',
                            value: null
                        },
                        tDiffuse2: {
                            type: 't',
                            value: null
                        },
                        mixRatio: {
                            type: 'f',
                            value: 0.0
                        },
                        threshold: {
                            type: 'f',
                            value: 0.1
                        },
                        useTexture: {
                            type: 'i',
                            value: 1,
                        },
                        tMixTexture: {
                            type: 't',
                            value: this.textures[0]
                        }
                    },
                    vertexShader: ['varying vec2 vUv;', 'void main() {', 'vUv = vec2( uv.x, uv.y );', 'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );', '}'].join('\n'),
                    fragmentShader: ['uniform float mixRatio;', 'uniform sampler2D tDiffuse1;', 'uniform sampler2D tDiffuse2;', 'uniform sampler2D tMixTexture;', 'uniform int useTexture;', 'uniform float threshold;', 'varying vec2 vUv;', 'void main() {', 'vec4 texel1 = texture2D( tDiffuse1, vUv );', 'vec4 texel2 = texture2D( tDiffuse2, vUv );', 'if (useTexture==1) {', 'vec4 transitionTexel = texture2D( tMixTexture, vUv );', 'float r = mixRatio * (1.0 + threshold * 2.0) - threshold;', 'float mixf=clamp((transitionTexel.r - r)*(1.0/threshold), 0.0, 1.0);', 'gl_FragColor = mix( texel1, texel2, mixf );', '} else {', 'gl_FragColor = mix( texel2, texel1, mixRatio );', '}', '}'].join('\n')
                });
                var quadgeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
                this.quad = new THREE.Mesh(quadgeometry, this.quadmaterial);
                this.scene.add(this.quad);
                // Link both scenes and their FBOs
                this.sceneA = sceneA;
                this.sceneB = sceneB;
                this.quadmaterial.uniforms.tDiffuse1.value = sceneA.fbo;
                this.quadmaterial.uniforms.tDiffuse2.value = sceneB.fbo;
                this.needChange = false;
                this.setTextureThreshold = function(value) {
                    this.quadmaterial.uniforms.threshold.value = value;
                };
                this.useTexture = function(value) {
                    this.quadmaterial.uniforms.useTexture.value = value ? 1 : 0;
                };
                this.setTexture = function(i) {
                    this.quadmaterial.uniforms.tMixTexture.value = this.textures[i];
                };
                this.render = function(delta) {
                    // Transition animation
                    if(self.transitionParams.animateTransition) {
                        var t = (1 + Math.sin(self.transitionParams.transitionSpeed * self.clock.getElapsedTime() / Math.PI)) / 2;
                        self.transitionParams.transition = THREE.Math.smoothstep(t, 0.3, 0.7);
                        // Change the current alpha texture after each transition
                        if(self.transitionParams.loopTexture && (self.transitionParams.transition === 0 || self.transitionParams.transition === 1)) {
                            if(this.needChange) {
                                self.transitionParams.texture = (self.transitionParams.texture + 1) % this.textures.length;
                                this.quadmaterial.uniforms.tMixTexture.value = this.textures[self.transitionParams.texture];
                                this.needChange = false;
                            }
                        } else {
                            this.needChange = true;
                        }
                    }
                    this.quadmaterial.uniforms.mixRatio.value = self.transitionParams.transition;
                    // Prevent render both scenes when it's not necessary
                    if(self.transitionParams.transition === 0) {
                        this.sceneB.render(delta, false);
                    } else if(self.transitionParams.transition === 1) {
                        this.sceneA.render(delta, false);
                    } else {
                        // When 0<transition<1 render transition between two scenes
                        this.sceneA.render(delta, true);
                        this.sceneB.render(delta, true);
                        self.renderer.render(this.scene, this.cameraOrtho, null, true);
                    }
                };
            };
            
            var SceneA = new this.SceneA();
            var SceneB = new this.SceneB();
            var Transition = new this.Transition(SceneA, SceneB);
            
            /*****************************/

            var render = function() {
                self.fpsStats.update(self.renderer);
                self.gpuStats.update(self.renderer);
                Transition.render(self.clock.getDelta());
            };
            var animate = function() {
                requestAnimationFrame(animate);
                render();
            };
            animate();
        },
        addGui: function() {
            if(this.settings.guiEnabled) {
                var GUI = new dat.GUI();
                GUI.addColor(this.configParams, 'color').listen();
                GUI.add(this.configParams, 'antialias').listen();
                GUI.add(this.configParams, 'alpha').listen();
                GUI.add(this.configParams, 'level', 0, 1).listen();
                GUI.add(this.configParams, 'cameraX', -1, 1).listen();
                GUI.add(this.configParams, 'cameraY', -1, 1).listen();
                GUI.add(this.configParams, 'cameraZ', -1, 1).listen();
                GUI.add(this.configParams, 'rotateX', 0, 0.2).listen();
                GUI.add(this.configParams, 'rotateY', 0, 0.2).listen();
                GUI.add(this.configParams, 'random');
                var guiTransition = new dat.GUI();
                guiTransition.add(this.transitionParams, 'useTexture').onChange(function(value) {
                    //this.transition.useTexture(value);
                });
                guiTransition.add(this.transitionParams, 'loopTexture');
                /*gui.add(transitionParams, 'texture', {
                    Perlin: 0,
                    Squares: 1,
                    Cells: 2,
                    Distort: 3,
                    Gradient: 4,
                    Radial: 5
                }).onChange(function(value) {
                    transition.setTexture(value);
                }).listen();*/
                guiTransition.add(this.transitionParams, 'textureThreshold', 0, 1, 0.01).onChange(function(value) {
                    //transition.setTextureThreshold(value);
                });
                guiTransition.add(this.transitionParams, 'animateTransition');
                guiTransition.add(this.transitionParams, 'transition', 0, 1, 0.01).listen();
                guiTransition.add(this.transitionParams, 'transitionSpeed', 0.5, 5, 0.01);
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