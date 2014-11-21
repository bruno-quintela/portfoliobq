'use strict';
// JSHint Global exceptions
/* jshint strict: true */
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
 * Declare Namespace
 */
var ENGINE = ENGINE || {
    author: 'Bruno Quintela',
    description: 'Portfolio',
    date: '2014'
};
ENGINE = function() {
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
            backgroundColor: [255, 255, 255],
            enableAnaglyph: false,
            enableTrackball: true,
            enableGrid: false,
            glitchType: 0,
            enableGlitch: false,
            enableRGBShift: true,
            enableFXAA: true,
            enableBloom: false,
            bloomStrengh: 0.3,
            enableFilm: true,
            filmStrengh: 0.3,
            enableTiltShift: true,
            tiltBlur: 9.5,
            enableVignette: true,
            vignetteStrengh: 5,
            disableEffects: false
        },
        lightsParams: {
            fillLightEnable: true,
            fillLightIntensity: 0.1,
            fillLightCastShadow: false,
            fillLightShadowIntensity: 0.15,
            keyLightEnable: true,
            keyLightIntensity: 2,
            keyLightCastShadow: false,
            keyLightShadowIntensity: 0.15,
            backLightEnable: true,
            backLightIntensity: 1,
            backLightCastShadow: false,
            backLightShadowIntensity: 0.15,
            shininess: 10
        },
        transitionParams: {
            clock: new THREE.Clock(false),
            autoRotation: true,
            transitionMixRatio: 1,
            texture: 2,
            textureThreshold: 0.0,
            CurrentLayer: 'A',
            toLayerA: function() {
                var transitionParams = this;
                this.transitionMixRatio = 0;
                myPortfolio.world.NextLayer = myPortfolio.world.LayerA;
                myPortfolio.world.transition = new myPortfolio.world.Transition(myPortfolio.world.CurrentLayer, myPortfolio.world.NextLayer);
                myPortfolio.world.CurrentLayer = myPortfolio.world.LayerA;
                var update = function() {
                    transitionParams.transitionMixRatio = current.x;
                };
                var current = {
                    x: 1
                };
                // remove previous tweens if needed
                var tweenLayerTransition = new TWEEN.Tween(current).to({
                    x: 0
                }, transitionParams.transitionTime * 1000).onUpdate(update);
                tweenLayerTransition.start();
            },
            toLayerB: function() {
                var transitionParams = this;
                this.transitionMixRatio = 0;
                myPortfolio.world.NextLayer = myPortfolio.world.LayerB;
                myPortfolio.world.transition = new myPortfolio.world.Transition(myPortfolio.world.CurrentLayer, myPortfolio.world.NextLayer);
                myPortfolio.world.CurrentLayer = myPortfolio.world.LayerB;
                var update = function() {
                    transitionParams.transitionMixRatio = current.x;
                };
                var current = {
                    x: 1
                };
                // remove previous tweens if needed
                var tweenLayerTransition = new TWEEN.Tween(current).to({
                    x: 0
                }, transitionParams.transitionTime * 1000).onUpdate(update);
                tweenLayerTransition.start();
            },
            toLayerC: function() {
                var transitionParams = this;
                this.transitionMixRatio = 0;
                myPortfolio.world.NextLayer = myPortfolio.world.LayerC;
                myPortfolio.world.transition = new myPortfolio.world.Transition(myPortfolio.world.CurrentLayer, myPortfolio.world.NextLayer);
                myPortfolio.world.CurrentLayer = myPortfolio.world.LayerC;
                var update = function() {
                    transitionParams.transitionMixRatio = current.x;
                };
                var current = {
                    x: 1
                };
                // remove previous tweens if needed
                var tweenLayerTransition = new TWEEN.Tween(current).to({
                    x: 0
                }, transitionParams.transitionTime * 1000).onUpdate(update);
                tweenLayerTransition.start();
            },
            transitionTime: 1,
            tweenVertices: function() {
                var geometryPoly = myPortfolio.world.CurrentLayer.lowpoly.geometry;
                var geometryCloud = myPortfolio.world.CurrentLayer.pointCloud.geometry;
                console.info(myPortfolio.world.CurrentLayer.name);
                var update = function() {
                    geometryPoly.verticesNeedUpdate = true;
                    geometryCloud.verticesNeedUpdate = true;
                    geometryCloud.vertices = geometryPoly.vertices;
                };
                for(var i = 0; i < geometryPoly.vertices.length; i++) {
                    var tweenVertex = new TWEEN.Tween(geometryPoly.vertices[i]).to({
                        x: myPortfolio.world.CurrentLayer.morphTarget.vertices[i].x,
                        y: myPortfolio.world.CurrentLayer.morphTarget.vertices[i].y,
                        z: myPortfolio.world.CurrentLayer.morphTarget.vertices[i].z
                    }, 2000).onUpdate(update);
                    tweenVertex.delay(i * 10).easing(TWEEN.Easing.Elastic.Out).start();
                }
            }
        },
        /**
         * WEB AUDIO PARAMS
         **/
        audioParams: {
            playPause: function() {
                sample.togglePlayback();
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
                guiRender.addColor(this.renderParams, 'backgroundColor').onChange(function(value) {
                    world.renderer.setClearColor(new THREE.Color(value[0] / 255, value[1] / 255, value[2] / 255), 0);
                });
                guiRender.add(this.renderParams, 'enableAnaglyph').onChange(function(value) {
                    if(value) {
                        myPortfolio.world.CurrentLayer.anaglyph = new THREE.AnaglyphEffect(world.renderer, world.width, world.height, 2);
                        myPortfolio.world.NextLayer.anaglyph = new THREE.AnaglyphEffect(world.renderer, world.width, world.height, 2);
                    }
                });
                guiRender.add(this.renderParams, 'enableTrackball');
                guiRender.add(this.renderParams, 'enableGrid').onChange(function(value) {
                    //add compositing 3rd rule grid
                    if(!document.getElementById('gridContainer')) {
                        var gridContainer = document.createElement('div');
                        gridContainer.setAttribute('id', 'gridContainer');
                        gridContainer.setAttribute('class', 'grid-container');
                        var verticalGrid = document.createElement('div');
                        verticalGrid.setAttribute('class', 'vertical-grid');
                        var horizontalGrid = document.createElement('div');
                        horizontalGrid.setAttribute('class', 'horizontal-grid');
                        gridContainer.appendChild(verticalGrid);
                        gridContainer.appendChild(horizontalGrid);
                        document.body.appendChild(gridContainer);
                    } else {
                        document.getElementById('gridContainer').style.display = value ? 'block' : 'none';
                    }
                });
                guiRender.add(this.renderParams, 'enableGlitch').onChange(function(value) {
                    if(value) {
                        world.renderParams.enableFXAA = false;
                        world.renderParams.enableRGBShift = false;
                    } else {
                        world.renderParams.enableFXAA = true;
                        world.renderParams.enableRGBShift = true;
                    }
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'glitchType', {
                    smooth: 0,
                    medium: 1,
                    strong: 2
                });
                guiRender.add(this.renderParams, 'enableRGBShift').onChange(function() {
                    world.refreshPostProcessing();
                }).listen();
                guiRender.add(this.renderParams, 'enableFXAA').onChange(function() {
                    world.refreshPostProcessing();
                }).listen();
                guiRender.add(this.renderParams, 'enableBloom').onChange(function() {
                    world.refreshPostProcessing();
                }).listen();
                guiRender.add(this.renderParams, 'bloomStrengh', 0, 10, 0.01).onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableFilm').onChange(function() {
                    world.refreshPostProcessing();
                }).listen();
                guiRender.add(this.renderParams, 'filmStrengh', 0, 1, 0.001).onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableTiltShift').onChange(function() {
                    world.refreshPostProcessing();
                }).listen();
                guiRender.add(this.renderParams, 'tiltBlur', 0.0, 20.0).listen().onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableVignette').onChange(function() {
                    world.refreshPostProcessing();
                }).listen();
                guiRender.add(this.renderParams, 'vignetteStrengh', 0, 40, 0.1).onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'disableEffects').onChange(function() {
                    world.refreshPostProcessing();
                });
                //guiRender.close();
                /**
                 * GUI Tween Motions test
                 **/
                var guiTransition = new dat.GUI();
                guiTransition.add(this.transitionParams, 'CurrentLayer').listen();
                guiTransition.add(this.transitionParams, 'autoRotation');
                guiTransition.add(this.transitionParams, 'texture', {
                    Perlin: 0,
                    Squares: 1,
                    Cells: 2,
                    Distort: 3,
                    Gradient: 4,
                    Radial: 5
                }).onChange(function(value) {
                    world.transition.setTexture(value);
                });
                guiTransition.add(this.transitionParams, 'textureThreshold', 0, 1, 0.01).onChange(function(value) {
                    world.transition.setTextureThreshold(value);
                });
                guiTransition.add(this.transitionParams, 'transitionMixRatio', 0, 1, 0.01).listen();
                guiTransition.add(this.transitionParams, 'toLayerA');
                guiTransition.add(this.transitionParams, 'toLayerB');
                guiTransition.add(this.transitionParams, 'toLayerC');
                guiTransition.add(this.transitionParams, 'transitionTime', 0, 11, 0.01);
                guiTransition.add(this.transitionParams, 'tweenVertices');
                guiTransition.close();
                /**
                 *  AUDIO GUI params
                 **/
                var guiAudio = new dat.GUI();
                guiAudio.add(this.audioParams, 'playPause');
                /**
                 *  Lights GUI params
                 **/
                /*var guiLights = new dat.GUI();
                guiLights.add(this.lightsParams, 'fillLightEnable').onChange(function(value) {
                    if(world.SceneA.scene.children[0] instanceof THREE.DirectionalLight) {
                        world.SceneA.scene.children[0].visible = value;
                        world.SceneB.scene.children[0].visible = value;
                    }
                });
                guiLights.add(this.lightsParams, 'fillLightIntensity', 0, 50, 0.01).onChange(function(value) {
                    if(world.SceneA.scene.children[0] instanceof THREE.DirectionalLight) {
                        world.SceneA.scene.children[0].intensity = value;
                        world.SceneB.scene.children[0].intensity = value;
                    }
                });
                guiLights.add(this.lightsParams, 'keyLightEnable').onChange(function(value) {
                    if(world.SceneA.scene.children[1] instanceof THREE.DirectionalLight) {
                        world.SceneA.scene.children[1].visible = value;
                        world.SceneB.scene.children[1].visible = value;
                    }
                });
                guiLights.add(this.lightsParams, 'keyLightIntensity', 0, 50, 0.01).onChange(function(value) {
                    if(world.SceneA.scene.children[1] instanceof THREE.DirectionalLight) {
                        world.SceneA.scene.children[1].intensity = value;
                        world.SceneB.scene.children[1].intensity = value;
                    }
                });
                guiLights.add(this.lightsParams, 'backLightEnable').onChange(function(value) {
                    if(world.SceneA.scene.children[2] instanceof THREE.DirectionalLight) {
                        world.SceneA.scene.children[2].visible = value;
                        world.SceneB.scene.children[2].visible = value;
                    }
                });
                guiLights.add(this.lightsParams, 'backLightIntensity', 0, 50, 0.01).onChange(function(value) {
                    if(world.SceneA.scene.children[2] instanceof THREE.DirectionalLight) {
                        world.SceneA.scene.children[2].intensity = value;
                        world.SceneB.scene.children[2].intensity = value;
                    }
                });
                guiLights.add(this.lightsParams, 'shininess', 0, 500, 0.01).onChange(function(value) {
                    if(world.SceneA.scene.children[3] instanceof THREE.Mesh) {
                        world.SceneA.scene.children[3].material.shininess = value;
                        world.SceneB.scene.children[3].material.shininess = value;
                    }
                });
                guiLights.close();*/
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
            this.renderer.setClearColor(new THREE.Color(world.renderParams.backgroundColor[0] / 255, world.renderParams.backgroundColor[1] / 255, world.renderParams.backgroundColor[2] / 255), 0);
            this.renderer.autoClear = false;
            /**
             * Scene
             **/
            this.Layer = function(name) {
                this.name = name;
                this.scene = new THREE.Scene();
                this.camera = new THREE.PerspectiveCamera(75, world.width / world.height, 0.1, 100);
                this.camera.position.z = 5;
                // frame buffer object
                this.fbo = new THREE.WebGLRenderTarget(world.width, world.height);
                /**
                 * Add wireframe clone of geometry to scene
                 **/
                var addWireframe = function(scene, geometry, color, thickness, scaleFactor) {
                    var material = new THREE.MeshBasicMaterial({
                        color: color,
                        transparent: false,
                        opacity: 1,
                        wireframeLinewidth: thickness,
                        wireframe: true
                    });
                    var meshWire = new THREE.Mesh(geometry, material);
                    meshWire.scale.set(scaleFactor, scaleFactor, scaleFactor);
                    scene.add(meshWire);
                    return meshWire;
                };
                /**
                 * Add vertices sprites to scene
                 **/
                var addPointCloud = function(scene, geometry, spritePath, spriteSize, scaleFactor) {
                    var spriteMap = THREE.ImageUtils.loadTexture(spritePath);
                    var geometryParticle = new THREE.Geometry();
                    for(var i = 0; i < geometry.vertices.length; i++) {
                        var vector = new THREE.Vector3(geometry.vertices[i].x, geometry.vertices[i].y, geometry.vertices[i].z);
                        geometryParticle.vertices.push(vector);
                    }
                    var materialSprite = new THREE.PointCloudMaterial({
                        size: spriteSize,
                        map: spriteMap,
                        blending: THREE.NormalBlending,
                        depthTest: true,
                        transparent: true
                    });
                    var particlesCloud = new THREE.PointCloud(geometryParticle, materialSprite);
                    particlesCloud.scale.set(scaleFactor, scaleFactor, scaleFactor);
                    scene.add(particlesCloud);
                    return particlesCloud;
                };
                var addRandomSphericalCloud = function(scene, numParticles, radius, spritePath, spriteSize) {
                    var geometryParticle = new THREE.Geometry();
                    var spriteMap = THREE.ImageUtils.loadTexture(spritePath);
                    for(var i = 0; i < numParticles; i++) {
                        var vertex1 = new THREE.Vector3();
                        vertex1.x = Math.random() * 2 - 1;
                        vertex1.y = Math.random() * 2 - 1;
                        vertex1.z = Math.random() * 2 - 1;
                        vertex1.normalize();
                        vertex1.multiplyScalar(radius);
                        var vertex2 = vertex1.clone();
                        vertex2.multiplyScalar(Math.random() * radius + 1);
                        geometryParticle.vertices.push(vertex1);
                        geometryParticle.vertices.push(vertex2);
                    }
                    var materialSprite = new THREE.PointCloudMaterial({
                        size: spriteSize,
                        map: spriteMap,
                        blending: THREE.NormalBlending,
                        depthTest: true,
                        transparent: true
                    });
                    var randomSphericalCloud = new THREE.PointCloud(geometryParticle, materialSprite);
                    scene.add(randomSphericalCloud);
                    return randomSphericalCloud;
                };
                /**
                 * Add SkyDome Sphere
                 **/
                var addSkyDome = function(layer, radius, texturePath) {
                    var skydomeTexture = THREE.ImageUtils.loadTexture(texturePath, new THREE.UVMapping(), function() {
                        layer.skydome = new THREE.Mesh(new THREE.SphereGeometry(radius, 60, 40), new THREE.MeshBasicMaterial({
                            map: skydomeTexture,
                            blending: THREE.NormalBlending,
                            depthTest: true,
                            transparent: true
                        }));
                        layer.skydome.scale.x = -1;
                        layer.scene.add(layer.skydome);
                    });
                };
                /**
                 * Set 3 point light system
                 **/
                var addLights = function(scene) {
                    if(world.lightsParams.fillLightEnable) {
                        var fillLight = new THREE.DirectionalLight('white', world.lightsParams.fillLightIntensity);
                        fillLight.position.set(0, 0, 5);
                        fillLight.castShadow = world.lightsParams.fillLightCastShadow;
                        fillLight.shadowDarkness = world.lightsParams.fillLightShadowIntensity;
                        scene.add(fillLight);
                    }
                    if(world.lightsParams.keyLightEnable) {
                        var keyLight = new THREE.DirectionalLight('white', world.lightsParams.keyLightIntensity);
                        keyLight.position.set(3.5, 3.5, 2);
                        keyLight.castShadow = world.lightsParams.keyLightCastShadow;
                        keyLight.shadowDarkness = world.lightsParams.keyLightShadowIntensity;
                        scene.add(keyLight);
                    }
                    if(world.lightsParams.backLightEnable) {
                        var backLight = new THREE.DirectionalLight('white', world.lightsParams.backLightIntensity);
                        backLight.position.set(-3.5, -3.5, 2);
                        backLight.castShadow = world.lightsParams.backLightCastShadow;
                        backLight.shadowDarkness = world.lightsParams.backLightShadowIntensity;
                        scene.add(backLight);
                    }
                };
                /**
                 * Import collada(.dae) object and corresponding UVmap into scene
                 **/
                var importCollada = function(layer, filePathCollada, filePathUV) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load(filePathCollada, function(collada) {
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name === 'Sphere') {
                                    var mesh = child.children[0];
                                    var maxAnisotropy = world.renderer.getMaxAnisotropy();
                                    mesh.material = new THREE.ShaderMaterial({
                                        uniforms: {
                                            tMatCap: {
                                                type: 't',
                                                value: THREE.ImageUtils.loadTexture('../src/textures/UVmaps/innerDome2.png')
                                            },
                                        },
                                        vertexShader: document.getElementById('sem-vs').textContent,
                                        fragmentShader: document.getElementById('sem-fs').textContent,
                                        shading: THREE.SmoothShading
                                    });
                                    mesh.scale.set(3.5, 3.5, 3.5);
                                    /*var modifier = new THREE.SubdivisionModifier( 2 );
	                                modifier.modify( mesh.geometry );*/
                                    layer.scene.add(mesh);
                                    layer.lowpoly = mesh;
                                    //set.polyWire = addWireframe(set.scene, mesh.geometry, 0x000000, 1, 2.05);
                                    //set.pointCloud = addPointCloud(set.scene, mesh.geometry, '../src/textures/sprites/BlackDot.svg', 0.1, 2.05);
                                } else if(child.name === 'Sphere_001') {
                                    var mesh = child.children[0];
                                    var maxAnisotropy = world.renderer.getMaxAnisotropy();
                                    mesh.material = new THREE.ShaderMaterial({
                                        uniforms: {
                                            tMatCap: {
                                                type: 't',
                                                value: THREE.ImageUtils.loadTexture('../src/textures/UVmaps/universeskydome.jpg')
                                            },
                                        },
                                        vertexShader: document.getElementById('sem-vs').textContent,
                                        fragmentShader: document.getElementById('sem-fs').textContent,
                                        shading: THREE.SmoothShading
                                    });
                                    if(layer.name === 'LayerB') {
                                        mesh.material = new THREE.ShaderMaterial({
                                            uniforms: {
                                                tMatCap: {
                                                    type: 't',
                                                    value: THREE.ImageUtils.loadTexture('../src/textures/UVmaps/matcap2.jpg')
                                                },
                                            },
                                            vertexShader: document.getElementById('sem-vs').textContent,
                                            fragmentShader: document.getElementById('sem-fs').textContent,
                                            shading: THREE.SmoothShading
                                        });
                                    }
                                    if(layer.name === 'LayerC') {
                                        mesh.material = new THREE.ShaderMaterial({
                                            uniforms: {
                                                tMatCap: {
                                                    type: 't',
                                                    value: THREE.ImageUtils.loadTexture('../src/textures/UVmaps/matcap3.jpg')
                                                },
                                            },
                                            vertexShader: document.getElementById('sem-vs').textContent,
                                            fragmentShader: document.getElementById('sem-fs').textContent,
                                            shading: THREE.SmoothShading
                                        });
                                    }
                                    mesh.scale.set(2, 2, 2);
                                    layer.scene.add(mesh);
                                    layer.lowpoly2 = mesh;
                                    layer.polyWire = addWireframe(layer.scene, mesh.geometry, 0x000000, 1, 2.05);
                                    layer.pointCloud = addPointCloud(layer.scene, mesh.geometry, '../src/textures/sprites/BlackDot.svg', 0.1, 2.05);
                                    layer.sphericalCloud = addRandomSphericalCloud(layer.scene, 2000, 3.5, '../src/textures/sprites/WhiteDot.svg', 0.05);
                                    addSkyDome(layer, 100, '../src/textures/UVmaps/universeskydome.jpg');
                                    addSkyDome(layer, 30, '../src/textures/UVmaps/universeskydome.jpg');
                                    addSkyDome(layer, 10, '../src/textures/UVmaps/universeskydome.jpg');
                                } else if(child.name === 'Floor') {}
                            }
                        });
                        //add reflective ground
                        /*layer.cubeCamera = new THREE.CubeCamera(1, 1000, 1024);
                        layer.cubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
                        layer.scene.add(layer.cubeCamera);
                        var materialPhongCube = new THREE.MeshBasicMaterial( { envMap: layer.cubeCamera.renderTarget } );
                        var planeGeometry = new THREE.PlaneBufferGeometry(10, 10);
                        layer.ground = new THREE.Mesh(planeGeometry, materialPhongCube);
                        layer.ground.position.set(0, -2.2, 0);
                        layer.ground.rotation.x = -Math.PI / 2;
                        layer.ground.receiveShadow = false;
                        layer.scene.add(layer.ground);
                        layer.cubeCamera.position.copy(set.ground.position);*/
                        layer.rotationSpeed = new THREE.Vector3(0, 0.002, 0.001);
                        /**
                         * Anaglyph effect
                         **/
                        layer.render = function(rtt) {
                            if(world.transitionParams.autoRotation) {
                                layer.lowpoly.rotation.x += layer.rotationSpeed.x;
                                layer.lowpoly.rotation.y += layer.rotationSpeed.y;
                                layer.lowpoly.rotation.z += layer.rotationSpeed.z;
                                layer.lowpoly2.rotation.x += layer.rotationSpeed.x;
                                layer.lowpoly2.rotation.y += layer.rotationSpeed.y;
                                layer.lowpoly2.rotation.z += layer.rotationSpeed.z;
                                layer.polyWire.rotation.x += layer.rotationSpeed.x;
                                layer.polyWire.rotation.y += layer.rotationSpeed.y;
                                layer.polyWire.rotation.z += layer.rotationSpeed.z;
                                layer.pointCloud.rotation.x += layer.rotationSpeed.x;
                                layer.pointCloud.rotation.y += layer.rotationSpeed.y;
                                layer.pointCloud.rotation.z += layer.rotationSpeed.z;
                                layer.sphericalCloud.rotation.y += layer.rotationSpeed.y;
                                layer.skydome.rotation.x -= 0.002;
                                layer.skydome.rotation.y -= 0.004;
                                layer.skydome.rotation.z -= 0.001;
                            }
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
                            }
                            if(rtt) {
                                //
                                if(world.renderParams.enableAnaglyph) {
                                    this.anaglyph.render(this.scene, this.camera);
                                } else {
                                    world.renderer.render(this.scene, this.camera, this.fbo, true);
                                }
                            } else {
                                if(world.renderParams.enableAnaglyph) {
                                    this.anaglyph.render(this.scene, this.camera);
                                } else {
                                    this.composer.render(0.01);
                                }
                            }
                        };
                    });
                };
                /**
                 * Import JSON threejs exported from blender
                 **/
                var importJSON = function(layer, filePathJSON, filePathUV) {
                    var loader = new THREE.JSONLoader();
                    loader.load(filePathJSON, function(geometry, materials) {
                        layer.morphTarget = geometry;
                    });
                };
                if(world.renderParams.enableTrackball) {
                    this.trackball = new THREE.TrackballControls(this.camera, world.renderer.domElement);
                    this.trackball.rotateSpeed = 1.0;
                    this.trackball.zoomSpeed = 1.2;
                    this.trackball.panSpeed = 0.8;
                    this.trackball.noZoom = false;
                    this.trackball.noPan = false;
                    this.trackball.staticMoving = true;
                    this.trackball.dynamicDampingFactor = 0.3;
                    this.trackball.keys = [65, 83, 68];
                }
                //add scene fog
                this.scene.fog = new THREE.FogExp2(0x000000, 0.03);
                //addLights(this.scene);
                importCollada(this, '../src/collada/test1.dae', '../src/textures/UVmaps/evolution.png');
                importJSON(this, '../src/json/lowpoly.json', '../src/textures/UVmaps/UVmap.png');
                /*******************************/
                world.postprocess.apply(this);
                /*this render is dummy used only until collada imports scene*/
                this.render = function(rtt) {
                    if(rtt) {
                        world.renderer.render(this.scene, this.camera, this.fbo, true);
                    } else {
                        world.renderer.clear();
                        if(world.renderParams.enableTrackball) {
                            this.trackball.update();
                        }
                        this.composer.render(0.01);
                    }
                };
            };
            /**
             * Transition
             **/
            this.Transition = function(CurrentLayer, NextLayer) {
                this.scene = new THREE.Scene();
                this.camera = new THREE.OrthographicCamera(world.width / -2, world.width / 2, world.height / 2, world.height / -2, -10, 10);
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
                this.quadmaterial.uniforms.tDiffuse1.value = CurrentLayer.fbo;
                this.quadmaterial.uniforms.tDiffuse2.value = NextLayer.fbo;
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
                    if(world.transitionParams.transitionMixRatio === 1) {
                        world.transitionParams.CurrentLayer = CurrentLayer.name;
                        CurrentLayer.render(false);
                    }
                    // Render only scene B
                    else if(world.transitionParams.transitionMixRatio === 0) {
                        world.transitionParams.CurrentLayer = NextLayer.name;
                        NextLayer.render(false);
                    }
                    // Render both scenes and transition frame buffer object
                    else {
                        // When 0<transition<1 render transition between two scenes
                        world.transitionParams.CurrentLayer = 'Transition';
                        CurrentLayer.render(true);
                        NextLayer.render(true);
                        this.composer.render(0.01);
                    }
                };
            };
            /**
             * Add Composer PostProcessing Effects
             **/
            this.postprocess = function() {
                this.composer = new THREE.EffectComposer(world.renderer);
                var renderModel = new THREE.RenderPass(this.scene, this.camera);
                this.composer.addPass(renderModel);
                if(!world.renderParams.disableEffects) {
                    if(world.renderParams.enableGlitch) {
                        var glitchPass = new THREE.GlitchPass(world.renderParams.glitchType);
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
                        var hblur = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
                        var vblur = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
                        var bluriness = world.renderParams.tiltBlur;
                        hblur.uniforms.h.value = bluriness / world.width;
                        vblur.uniforms.v.value = bluriness / world.height;
                        hblur.uniforms.r.value = vblur.uniforms.r.value = 0.5;
                        this.composer.addPass(hblur);
                        this.composer.addPass(vblur);
                    }
                    if(world.renderParams.enableVignette) {
                        var vignettePass = new THREE.ShaderPass(THREE.VignetteShader);
                        vignettePass.uniforms.darkness.value = world.renderParams.vignetteStrengh;
                        vignettePass.uniforms.offset.value = 0.3;
                        this.composer.addPass(vignettePass);
                    }
                }
                var copyPass = new THREE.ShaderPass(THREE.CopyShader);
                this.composer.addPass(copyPass);
                copyPass.renderToScreen = true;
            };
            /**
             * refresh postpross when gui is changed
             **/
            this.refreshPostProcessing = function() {
                this.postprocess.apply(this.CurrentLayer);
                this.postprocess.apply(this.NextLayer);
                this.postprocess.apply(this.transition);
            };
            /**
             * On window resize world handler event
             **/
            this.onWindowResize = function() {
                world.width = window.innerWidth;
                world.height = window.innerHeight;
                world.CurrentLayer.camera.aspect = world.width / world.height;
                world.CurrentLayer.fbo = new THREE.WebGLRenderTarget(world.width, world.height);
                world.CurrentLayer.camera.updateProjectionMatrix();
                world.NextLayer.camera.aspect = world.width / world.height;
                world.NextLayer.fbo = new THREE.WebGLRenderTarget(world.width, world.height);
                world.NextLayer.camera.updateProjectionMatrix();
                if(world.renderParams.enableAnaglyph) {
                    myPortfolio.world.CurrentLayer.anaglyph.setSize(world.width, world.height);
                    myPortfolio.world.NextLayer.anaglyph.setSize(world.width, world.height);
                } else {
                    world.transition.quadmaterial.uniforms.tDiffuse1.value = world.CurrentLayer.fbo;
                    world.transition.quadmaterial.uniforms.tDiffuse2.value = world.NextLayer.fbo;
                    world.renderer.setSize(world.width, world.height);
                    world.refreshPostProcessing();
                }
                console.log('resized');
            };
        },
        /**
         * Everything is instantiated, lets start de engine!!!
         **/
        start: function() {
            var world = this;
            this.init();
            this.transitionParams.clock.elapsedTime = 0;
            this.LayerA = new this.Layer('LayerA');
            this.LayerB = new this.Layer('LayerB');
            this.LayerC = new this.Layer('LayerC');
            this.CurrentLayer = this.LayerA;
            this.NextLayer = this.LayerB;
            this.transition = new this.Transition(this.CurrentLayer, this.NextLayer);
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
            // on window resize handler (100ms timeout to fire)
            var refresh;
            window.onresize = function() {
                clearTimeout(refresh);
                refresh = setTimeout(function() {
                    world.onWindowResize();
                }, 100);
            };
            //window.addEventListener('resize', world.onWindowResize, false);
        }
    };
};
/********************************************************/
/**
 * Page Init
 **/
ENGINE.prototype.init = function() {
    this.system.init();
    this.world.start();
    console.log('Page init completed');
};
/**
 * On Ready Init Page Prototype TODO
 **/
var myPortfolio = new ENGINE();
myPortfolio.init();