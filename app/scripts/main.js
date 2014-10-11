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
            this.renderer.setClearColor(0xffffff, 0);
            /**
             * Scene
             **/
            this.Scene = function(matColor) {
                //
                this.cameraOrtho = new THREE.OrthographicCamera(-self.width / 2, self.width / 2, self.height / 2, -self.height / 2, -10000, 10000);
                this.cameraOrtho.position.z = 100;
                this.cameraPerspective = new THREE.PerspectiveCamera(50, self.width / self.height, 1, 10000);
                this.cameraPerspective.position.z = 900;
                //
                this.sceneModel = new THREE.Scene();
                this.sceneBG = new THREE.Scene();
                //
                var directionalLight = new THREE.DirectionalLight(0xffffff);
                directionalLight.position.set(0, -0.1, 1).normalize();
                this.sceneModel.add(directionalLight);
                var loader = new THREE.JSONLoader(true);
                //document.body.appendChild(loader.statusDomElement);
                var selfSceneModel = this.sceneModel;
                loader.load('scripts/vendor/threejs/obj/leeperrysmith/LeePerrySmith.js', function(geometry) {
                    self.createMesh(geometry, selfSceneModel, 100);
                });
                //
                var materialColor = new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('scripts/vendor/threejs/obj/leeperrysmith/pz.jpg'),
                    depthTest: false
                });
                var quadBG = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
                quadBG.position.z = -500;
                quadBG.scale.set(self.width, self.height, 1);
                this.sceneBG.add(quadBG);
                //
                var sceneMask = new THREE.Scene();
                var quadMask = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({
                    color: 0xffaa00
                }));
                quadMask.position.z = -300;
                quadMask.scale.set(self.width / 2, self.height / 2, 1);
                sceneMask.add(quadMask);
                //
                self.renderer = new THREE.WebGLRenderer({
                    canvas: threejsCanvas,
                    antialias: false
                });
                self.renderer.setSize(self.width, self.height);
                self.renderer.setClearColor(0x000000, 1);
                self.renderer.autoClear = false;
                //
                self.renderer.gammaInput = true;
                self.renderer.gammaOutput = true;
                //
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
                effectColorify2.uniforms.color.value.setRGB(1, 0.75, 0.5);
                var clearMask = new THREE.ClearMaskPass();
                var renderMask = new THREE.MaskPass(this.sceneModel, this.cameraPerspective);
                var renderMaskInverse = new THREE.MaskPass(this.sceneModel, this.cameraPerspective);
                renderMaskInverse.inverse = true;
                //effectFilm.renderToScreen = true;
                //effectFilmBW.renderToScreen = true;
                //effectDotScreen.renderToScreen = true;
                //effectBleach.renderToScreen = true;
                effectVignette.renderToScreen = true;
                //effectCopy.renderToScreen = true;
                //
                var rtParameters = {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    format: THREE.RGBFormat,
                    stencilBuffer: true
                };
                var rtWidth = self.width / 2;
                var rtHeight = self.height / 2;
                //
                var renderBackground = new THREE.RenderPass(this.sceneBG, this.cameraOrtho);
                var renderModel = new THREE.RenderPass(this.sceneModel, this.cameraPerspective);
                renderModel.clear = false;
                this.composerScene = new THREE.EffectComposer(self.renderer, new THREE.WebGLRenderTarget(rtWidth * 2, rtHeight * 2, rtParameters));
                this.composerScene.addPass(renderBackground);
                this.composerScene.addPass(renderModel);
                this.composerScene.addPass(renderMaskInverse);
                this.composerScene.addPass(effectHBlur);
                this.composerScene.addPass(effectVBlur);
                this.composerScene.addPass(clearMask);
                //
                var renderScene = new THREE.TexturePass(this.composerScene.renderTarget2);
                //
                this.composer1 = new THREE.EffectComposer(self.renderer, new THREE.WebGLRenderTarget(rtWidth, rtHeight, rtParameters));
                this.composer1.addPass(renderScene);
                this.composer1.addPass( renderMask );
                this.composer1.addPass(effectFilmBW);
                this.composer1.addPass( clearMask );
                this.composer1.addPass(effectVignette);
                /*****************************************/
                this.fbo = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, rtParameters);
                this.render = function(rtt) {
                    if(rtt) {
                        self.renderer.render(this.scene, this.camera, this.fbo, false);
                    } else {
                        //self.renderer.render(this.scene, this.camera);
                        //this.composer.render();
                        self.renderer.clear();
                        this.composerScene.render(0.01);
                        this.composer1.render(0.01);
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
                var effect = new THREE.ShaderPass(THREE.DotScreenShader);
                effect.uniforms.scale.value = 4;
                this.composer.addPass(effect);
                var effect1 = new THREE.ShaderPass(THREE.RGBShiftShader);
                effect1.uniforms.amount.value = 0.0015;
                effect1.renderToScreen = true;
                this.composer.addPass(effect1);
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
            this.createMesh = function(geometry, scene, scale) {
                geometry.computeTangents();
                var ambient = 0x444444,
                    diffuse = 0x999999,
                    specular = 0x080808,
                    shininess = 20;
                var shader = THREE.ShaderLib["normalmap"];
                var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
                uniforms["tNormal"].value = THREE.ImageUtils.loadTexture("scripts/vendor/threejs/obj/leeperrysmith/Infinite-Level_02_Tangent_SmoothUV.jpg");
                uniforms["uNormalScale"].value.set(0.75, 0.75);
                uniforms["tDiffuse"].value = THREE.ImageUtils.loadTexture("scripts/vendor/threejs/obj/leeperrysmith/Map-COL.jpg");
                uniforms["enableAO"].value = false;
                uniforms["enableDiffuse"].value = true;
                uniforms["diffuse"].value.setHex(diffuse);
                uniforms["specular"].value.setHex(specular);
                uniforms["ambient"].value.setHex(ambient);
                uniforms["shininess"].value = shininess;
                uniforms["diffuse"].value.convertGammaToLinear();
                uniforms["specular"].value.convertGammaToLinear();
                uniforms["ambient"].value.convertGammaToLinear();
                var parameters = {
                    fragmentShader: shader.fragmentShader,
                    vertexShader: shader.vertexShader,
                    uniforms: uniforms,
                    lights: true
                };
                var mat2 = new THREE.ShaderMaterial(parameters);
                self.mesh = new THREE.Mesh(geometry, mat2);
                self.mesh.position.set(0, -50, 0);
                self.mesh.scale.set(scale, scale, scale);
                scene.add(self.mesh);
                //loader.statusDomElement.style.display = "none";
            };
            /*********************************************************/
            this.SceneA = new this.Scene(0x000fff);
            this.SceneB = new this.Scene(0xfff000);
            this.transition = new this.Transition(this.SceneA, this.SceneB);
            var animate = function() {
                var time = Date.now() * 0.0004;
				if ( self.mesh ) self.mesh.rotation.y = -time;
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