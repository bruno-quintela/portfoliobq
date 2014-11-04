'use strict';
// JSHint Global exceptions
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
/*
 * Declare page Namespace
 */
var Page = Page || {};
Page = function() {
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
        renderParams: {
            antialias: true,
            alpha: false,
            enableGrid: false,
            enableGlitch: false,
            enableRGBShift: true,
            enableFXAA: true,
            enableBloom: true,
            bloomStrengh: 0.3,
            enableFilm: true,
            filmStrengh: 0.3,
            enableTiltShift: true,
            tiltBlur: 3.5,
            enableVignette: true,
            vignetteStrengh: 5,
            disableEffects: false
        },
        transitionParams: {
            'clock': new THREE.Clock(false),
            'transitionMixRatio': 0,
            'texture': 2,
            'textureThreshold': 0.3,
            'currentScene': 'A', // A/B/T
            'A->B': function() {
                var world = this;
                this.transitionMixRatio = 0;
                var update = function() {
                    world.transitionMixRatio = current.x;
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
                var world = this;
                this.transitionMixRatio = 1;
                var update = function() {
                    world.transitionMixRatio = current.x;
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
            var world = this;
            if(this.settings.guiEnabled) {
                // Renderer & Post Processing GUI params
                var guiRender = new dat.GUI();
                guiRender.add(this.renderParams, 'antialias').onChange(function() {
                    //world.renderer.antialias;
                });
                guiRender.add(this.renderParams, 'alpha').onChange(function() {
                    //world.renderer.alpha;
                });
                guiRender.add(this.renderParams, 'enableGrid').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableGlitch').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableRGBShift').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableFXAA').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableBloom').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'bloomStrengh', 0, 10, 0.01).onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableFilm').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'filmStrengh', 0, 1, 0.001).onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableTiltShift').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'tiltBlur', 0.0, 10.0).listen().onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableVignette').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'vignetteStrengh', 0, 40, 0.1).onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'disableEffects').onChange(function() {
                    world.refreshPostProcessing();
                });
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
                    world.transition.setTexture(value);
                }).listen();
                guiTransition.add(this.transitionParams, 'textureThreshold', 0, 1, 0.01).onChange(function(value) {
                    world.transition.setTextureThreshold(value);
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
            var world = this;
            this.addGUI();
            this.addStats();
            this.renderer = new THREE.WebGLRenderer({
                canvas: threejsCanvas,
                antialias: this.renderParams.antialias,
                alpha: this.renderParams.alpha
            });
            this.renderer.setSize(this.width, this.height);
            this.renderer.setClearColor(0xF5ECCE, 0);
            this.renderer.autoClear = false;
            /**
             * Scene
             **/
            this.Scene = function(matColor) {
                this.fbo = new THREE.WebGLRenderTarget(world.width, world.height);
                this.camera = new THREE.PerspectiveCamera(75, world.width / world.height, 0.1, 100);
                this.camera.position.z = 5;
                this.scene = new THREE.Scene();
                this.scene.fog = new THREE.FogExp2(0x000000, 0.0008);
                /*var ambientLight = new THREE.AmbientLight(0x020202);
                this.scene.add(ambientLight);
                var frontLight = new THREE.DirectionalLight('white', 1);
                frontLight.position.set(0.5, 0.5, 2);
                this.scene.add(frontLight);
                var backLight = new THREE.DirectionalLight('white', 0.75);
                backLight.position.set(-0.5, -0.5, -2);
                this.scene.add(backLight);*/
                this.rotationSpeed = new THREE.Vector3(0, 0.002, 0.001);
                var geometry = new THREE.BoxGeometry(2, 2, 2);
                var material = new THREE.MeshBasicMaterial({
                    color: matColor
                });
                var cube = new THREE.Mesh(geometry, material);
                this.scene.add(cube);
                var materialTransparent = new THREE.MeshBasicMaterial({
                    transparent: true,
                    opacity: 0
                });
                var cubeWire = new THREE.Mesh(new THREE.BoxGeometry(3.5, 3.5, 3.5), materialTransparent);
                this.scene.add(cubeWire);
                var egh = new THREE.EdgesHelper(cubeWire, 0x000000);
                egh.material.linewidth = 2;
                this.scene.add(egh);
                /**
                 * Add vertices sprites
                 **/
                var geometryParticle = new THREE.Geometry();
                var sprite1 = THREE.ImageUtils.loadTexture('../src/textures/sprites/black-circle-round-target-dot.png');
                for(var i = 0; i < cubeWire.geometry.vertices.length; i++) {
                    var vector = new THREE.Vector3(cubeWire.geometry.vertices[i].x, cubeWire.geometry.vertices[i].y, cubeWire.geometry.vertices[i].z);
                    geometryParticle.vertices.push(vector);
                }

                var materialSprite =  new THREE.PointCloudMaterial({
                    size: 0.2,
                    map: sprite1,
                    //blending: THREE.AdditiveBlending,
                    depthTest: true,
                    transparent: true
                });
                var particlesCloud = new THREE.PointCloud(geometryParticle, materialSprite);
                this.scene.add(particlesCloud);
                /*******************************/
                world.postprocess.apply(this);
                this.render = function(rtt) {
                    cube.rotation.x += this.rotationSpeed.x;
                    cube.rotation.y += this.rotationSpeed.y;
                    cube.rotation.z += this.rotationSpeed.z;
                    cubeWire.rotation.x += this.rotationSpeed.x;
                    cubeWire.rotation.y += this.rotationSpeed.y;
                    cubeWire.rotation.z += this.rotationSpeed.z;
                    particlesCloud.rotation.x += this.rotationSpeed.x;
                    particlesCloud.rotation.y += this.rotationSpeed.y;
                    particlesCloud.rotation.z += this.rotationSpeed.z;
                    if(rtt) {
                        world.renderer.render(this.scene, this.camera, this.fbo, true);
                    } else {
                        world.renderer.clear();
                        this.composer.render(0.01);
                    }
                };
            };
            /**
             * Transition
             **/
            this.Transition = function(sceneA, sceneB) {
                this.scene = new THREE.Scene();
                this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -10, 10);
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
                var quadgeometry = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight);
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
                world.postprocess.apply(this);
                this.render = function() {
                    // Set framebuffer object mix ratio [0..1]
                    this.quadmaterial.uniforms.mixRatio.value = world.transitionParams.transitionMixRatio;
                    // Prevent render both scenes when it's not necessary
                    // Render only scene A
                    if(world.transitionParams.transitionMixRatio === 0) {
                        world.transitionParams.currentScene = 'A';
                        this.sceneB.render(false);
                    }
                    // Render only scene B
                    else if(world.transitionParams.transitionMixRatio === 1) {
                        world.transitionParams.currentScene = 'B';
                        this.sceneA.render(false);
                    }
                    // Render both scenes and transition frame buffer object
                    else {
                        // When 0<transition<1 render transition between two scenes
                        world.transitionParams.currentScene = 'Transition';
                        this.sceneA.render(true);
                        this.sceneB.render(true);
                        this.composer.render(0.01);
                    }
                };
            };
            /**
             * PostProcessing Effects
             **/
            this.postprocess = function() {
                this.composer = new THREE.EffectComposer(world.renderer);
                var renderModel = new THREE.RenderPass(this.scene, this.camera);
                this.composer.addPass(renderModel);
                /*if(world.renderParams.enableGrid) {
                    var gridPass = new THREE.GridPass();
                    this.composer.addPass(gridPass);
                }*/
                if(world.renderParams.enableGlitch) {
                    var glitchPass = new THREE.GlitchPass();
                    this.composer.addPass(glitchPass);
                }
                if(world.renderParams.enableFXAA) {
                    var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
                    effectFXAA.uniforms.resolution.value.set(1 / world.width, 1 / world.height);
                    this.composer.addPass(effectFXAA);
                }
                if(world.renderParams.enableFilm) {
                    var effectFilm = new THREE.FilmPass(world.renderParams.filmStrengh, 0, 448, false);
                    this.composer.addPass(effectFilm);
                }
                if(world.renderParams.enableBloom) {
                    var effectBloom = new THREE.BloomPass(world.renderParams.bloomStrengh);
                    this.composer.addPass(effectBloom);
                }
                if(world.renderParams.enableRGBShift) {
                    var rgbShift = new THREE.ShaderPass(THREE.RGBShiftShader);
                    rgbShift.uniforms.amount.value = 0.001;
                    this.composer.addPass(rgbShift);
                }
                if(world.renderParams.enableTiltShift) {
                    this.hblur = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
                    this.vblur = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
                    var bluriness = world.renderParams.tiltBlur;
                    this.hblur.uniforms.h.value = bluriness / world.width;
                    this.vblur.uniforms.v.value = bluriness / world.height;
                    this.hblur.uniforms.r.value = this.vblur.uniforms.r.value = 0.5;
                    this.composer.addPass(this.hblur);
                    this.composer.addPass(this.vblur);
                }
                if(world.renderParams.enableVignette) {
                    this.vignettePass = new THREE.ShaderPass(THREE.VignetteShader);
                    this.vignettePass.uniforms.darkness.value = world.renderParams.vignetteStrengh;
                    this.vignettePass.uniforms.offset.value = 0.3;
                    this.composer.addPass(this.vignettePass);
                }
                var copyPass = new THREE.ShaderPass(THREE.CopyShader);
                this.composer.addPass(copyPass);
                copyPass.renderToScreen = true;
            };
            this.refreshPostProcessing = function() {
                this.postprocess.apply(this.SceneA);
                this.postprocess.apply(this.SceneB);
                this.postprocess.apply(this.transition);
            };
            /*********************************************************/
            this.transitionParams.clock.elapsedTime = 0;
            this.SceneA = new this.Scene(0x8A0829);
            this.SceneB = new this.Scene(0x000000);
            this.transition = new this.Transition(this.SceneA, this.SceneB);
            /**/
            var animate = function() {
                requestAnimationFrame(animate);
                render();
            };
            var render = function() {
                world.fpsStats.update(world.renderer);
                world.gpuStats.update(world.renderer);
                // update the tweens from TWEEN library
                TWEEN.update();
                world.transition.render();
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