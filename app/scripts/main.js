'use strict';
/*global THREE:false */
/*global THREEx:false */
/*global Modernizr:false */
/*global Stats:false */
/*global dat:false */
/*global requestAnimationFrame:false */
/*global threejsCanvas:false */
/*global TWEEN:false */
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
    this.world = {
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: window.devicePixelRatio,
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
            'clock': new THREE.Clock(false),
            'transitionMixRatio': 0,
            'texture': 2,
            'textureThreshold': 0.3,
            'currentScene': 'A', // A/B/T
            'A->B': function() {
                var self = this;
                this.transitionMixRatio = 0;
                var update = function() {
                    self.transitionMixRatio = current.x;
                };
                var current = {
                    x: 0
                };
                // remove previous tweens if needed
                var tweenHead = new TWEEN.Tween(current).to({
                    x: 1
                }, 2000).onUpdate(update);
                tweenHead.start();
            },
            'B->A': function() {
                var self = this;
                this.transitionMixRatio = 1;
                var update = function() {
                    self.transitionMixRatio = current.x;
                };
                var current = {
                    x: 1
                };
                // remove previous tweens if needed
                var tweenBack = new TWEEN.Tween(current).to({
                    x: 0
                }, 2000).onUpdate(update);
                tweenBack.start();
            }
        },
        container: {},
        renderer: {},
        fpsStats: {},
        gpuStats: {},
        addGUI: function() {
            var self = this;
            if(this.settings.guiEnabled) {
                // World GUI params
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
                // Transition GUI params
                var guiTransition = new dat.GUI();
                guiTransition.add(this.transitionParams, 'currentScene').listen();
                guiTransition.add(this.transitionParams, 'texture', {
                    Perlin: 0,
                    Squares: 1,
                    Cells: 2,
                    Distort: 3,
                    Gradient: 4,
                    Radial: 5
                }).onChange(function(value) {
                    self.transition.setTexture(value);
                }).listen();
                guiTransition.add(this.transitionParams, 'textureThreshold', 0, 1, 0.01).onChange(function(value) {
                    self.transition.setTextureThreshold(value);
                });
                guiTransition.add(this.transitionParams, 'transitionMixRatio', 0, 1, 0.01).listen();
                guiTransition.add(this.transitionParams, 'A->B');
                guiTransition.add(this.transitionParams, 'B->A');
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
        },
        init: function() {
            var self = this;
            this.addGUI();
            this.addStats();
            this.renderer = new THREE.WebGLRenderer({
                canvas: threejsCanvas,
                antialias: this.configParams.antialias,
                alpha: this.configParams.alpha
            });
            this.renderer.setSize(this.width, this.height);
            this.renderer.setClearColor(0x000000, 0);
            /**
             * Scene
             **/
            this.Scene = function(matColor) {
                this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
                this.camera.position.z = 5;
                // Setup scene
                this.scene = new THREE.Scene();
                this.rotationSpeed = new THREE.Vector3(0, 0.002, 0.001);
                var geometry = new THREE.BoxGeometry(2, 2, 2);
                var material = new THREE.MeshBasicMaterial({
                    color: matColor
                });
                var cube = new THREE.Mesh(geometry, material);
                this.scene.add(cube);
                /******* postprocessing ************************/
                /*var renderModel = new THREE.RenderPass(this.scene, this.camera);
                var shaderBleach = THREE.BleachBypassShader;
                var shaderSepia = THREE.SepiaShader;
                var shaderVignette = THREE.VignetteShader;
                var shaderCopy = THREE.CopyShader;
                var effectBleach = new THREE.ShaderPass(shaderBleach);
                var effectSepia = new THREE.ShaderPass(shaderSepia);
                var effectVignette = new THREE.ShaderPass(shaderVignette);
                var effectCopy = new THREE.ShaderPass(shaderCopy);
                effectBleach.uniforms.opacity.value = 0.95;
                effectSepia.uniforms.amount.value = 0.9;
                effectVignette.uniforms.offset.value = 0.95;
                effectVignette.uniforms.darkness.value = 1.6;
                var effectBloom = new THREE.BloomPass(0.5);
                var effectFilm = new THREE.FilmPass(0.35, 0.025, 648, false);
                var effectFilmBW = new THREE.FilmPass(0.35, 0.5, 2048, true);
                var effectDotScreen = new THREE.DotScreenPass(new THREE.Vector2(0, 0), 0.5, 0.8);
                var effectHBlur = new THREE.ShaderPass(THREE.HorizontalBlurShader);
                var effectVBlur = new THREE.ShaderPass(THREE.VerticalBlurShader);
                effectHBlur.uniforms.h.value = 2 / (self.width / 2);
                effectVBlur.uniforms.v.value = 2 / (self.height / 2);
                var effectColorify1 = new THREE.ShaderPass(THREE.ColorifyShader);
                var effectColorify2 = new THREE.ShaderPass(THREE.ColorifyShader);
                effectColorify1.uniforms.color.value.setRGB(1, 0.8, 0.8);
                effectColorify2.uniforms.color.value.setRGB(1, 0.75, 0.5);*/
                
                var rtParameters = {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    format: THREE.RGBAFormat,
                    stencilBuffer: false
                };
                this.composer = new THREE.EffectComposer(self.renderer, new THREE.WebGLRenderTarget(self.width, self.height, rtParameters));
                this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));
                // FFXA antialiasing postprocessing
               /* var fxaa = new THREE.ShaderPass(THREE.FXAAShader);
                fxaa.uniforms.resolution.value = new THREE.Vector2( 1 / self.width, 1 / self.height );
                fxaa.renderToScreen = true;
                this.composer.addPass(fxaa);*/
                // Technicolor postprocessing
                /*var technicolor = new THREE.ShaderPass(THREE.Technicolor3Shader);
                technicolor.renderToScreen = true;
                this.composer.addPass(technicolor);*/
                var rgbShift = new THREE.ShaderPass(THREE.RGBShiftShader);
                rgbShift.uniforms.amount.value = 0.01;
                rgbShift.renderToScreen = true;
                this.composer.addPass(rgbShift);
                // glitch pass
                /*var glitchPass = new THREE.GlitchPass();
                glitchPass.renderToScreen = false;
                self.composer.addPass(glitchPass);*/
                /*****************************************/
                this.fbo = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, rtParameters);
                this.render = function(rtt) {
                    cube.rotation.x += this.rotationSpeed.x;
                    cube.rotation.y += this.rotationSpeed.y;
                    cube.rotation.z += this.rotationSpeed.z;
                    if(rtt) {
                        self.renderer.render(this.scene, this.camera, this.fbo, false);
                    } else {
                        //self.renderer.render(this.scene, this.camera);
                        this.composer.render();
                    }
                };
            };
            /**
             * Transition
             **/
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
                            value: this.textures[1]
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
                this.needChange = true;
                this.setTextureThreshold = function(value) {
                    this.quadmaterial.uniforms.threshold.value = value;
                };
                this.useTexture = function(value) {
                    this.quadmaterial.uniforms.useTexture.value = value ? 1 : 0;
                };
                this.setTexture = function(i) {
                    this.quadmaterial.uniforms.tMixTexture.value = this.textures[i];
                };
                var rtParameters = {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    format: THREE.RGBAFormat,
                    stencilBuffer: false
                };
                this.composer = new THREE.EffectComposer(self.renderer, new THREE.WebGLRenderTarget(self.width, self.height, rtParameters));
                this.composer.addPass(new THREE.RenderPass(this.scene, this.cameraOrtho));
                var rgbShift = new THREE.ShaderPass(THREE.RGBShiftShader);
                rgbShift.uniforms.amount.value = 0.01;
                rgbShift.renderToScreen = true;
                this.composer.addPass(rgbShift);
                
                this.render = function() {
                    // Transition animation
                    //console.log('mixRatio:' + self.transitionParams.transitionMixRatio);
                    // Set framebuffer object mix ratio [0..1]
                    this.quadmaterial.uniforms.mixRatio.value = self.transitionParams.transitionMixRatio;
                    // Prevent render both scenes when it's not necessary
                    // Render only scene A
                    if(self.transitionParams.transitionMixRatio === 0) {
                        self.transitionParams.currentScene = 'A';
                        this.sceneB.render(false);
                    }
                    // Render only scene B
                    else if(self.transitionParams.transitionMixRatio === 1) {
                        self.transitionParams.currentScene = 'B';
                        this.sceneA.render(false);
                    }
                    // Render both scenes and transition frame buffer object
                    else {
                        // When 0<transition<1 render transition between two scenes
                        self.transitionParams.currentScene = 'Transition';
                        this.sceneA.render(true);
                        this.sceneB.render(true);
                        this.composer.render();
                        //self.renderer.render(this.scene, this.cameraOrtho, null, true);
                    }
                };
            };
            /*********************************************************/
            this.transitionParams.clock.elapsedTime = 0;
            this.SceneA = new this.Scene(0xffffff);
            this.SceneB = new this.Scene(0x000000);
            this.transition = new this.Transition(this.SceneA, this.SceneB);
            var animate = function() {
                requestAnimationFrame(animate);
                render();
            };
            var render = function() {
                self.fpsStats.update(self.renderer);
                self.gpuStats.update(self.renderer);
                // update the tweens from TWEEN library
                TWEEN.update();
                self.transition.render();
            };
            animate();
        }
    };
};
/********************************************************/
/**
 * Page Init
 **/
Page.prototype.init = function() {
    this.system.init();
    this.world.init();
    console.log('Page init completed');
};
/**
 * On Ready Init Page Prototype
 **/
var myPage = new Page();
myPage.init();