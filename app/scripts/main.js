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
 * Declare Namespace
 */
var ENGINE = ENGINE || {
    author: 'Bruno Quintela 2014'
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
            backgroundColor: [245, 236, 206],
            enableTrackball: true,
            enableGrid: false,
            glitchType: 2,
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
            shininess: 1
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
                guiRender.addColor(this.renderParams, 'backgroundColor').onChange(function(value) {
                    world.renderer.setClearColor(new THREE.Color(value[0] / 255, value[1] / 255, value[2] / 255), 0);
                });
                guiRender.add(this.renderParams, 'enableTrackball');
                guiRender.add(this.renderParams, 'enableGrid').onChange(function(value) {
                    console.log(value);
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
                guiRender.add(this.renderParams, 'glitchType', {
                    smooth: 0,
                    medium: 1,
                    strong: 2
                });
                guiRender.add(this.renderParams, 'enableGlitch').onChange(function(value) {
                    if(value) {
                        world.renderParams.enableFXAA = false;
                        world.renderParams.enableRGBShift = false;
                        world.renderParams.enableTiltShift = false;
                    } else {
                        world.renderParams.enableFXAA = true;
                        world.renderParams.enableRGBShift = true;
                        world.renderParams.enableTiltShift = true;
                    }
                    world.refreshPostProcessing();
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
                });
                guiTransition.add(this.transitionParams, 'textureThreshold', 0, 1, 0.01).onChange(function(value) {
                    world.transition.setTextureThreshold(value);
                });
                guiTransition.add(this.transitionParams, 'transitionMixRatio', 0, 1, 0.01).listen();
                guiTransition.add(this.transitionParams, 'A->B');
                guiTransition.add(this.transitionParams, 'B->A');
                /**
                 *  Lights GUI params
                 **/
                var guiLights = new dat.GUI();
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
                guiLights.add(this.lightsParams, 'fillLightCastShadow').onChange(function(value) {
                    if(world.SceneA.scene.children[0] instanceof THREE.DirectionalLight) {
                        world.SceneA.scene.children[0].castShadow = value;
                        world.SceneB.scene.children[0].castShadow = value;
                    }
                });
                guiLights.add(this.lightsParams, 'fillLightShadowIntensity', 0, 10, 0.01).onChange(function(value) {
                    if(world.SceneA.scene.children[0] instanceof THREE.DirectionalLight) {
                        world.SceneA.scene.children[0].shadowDarkness = value;
                        world.SceneB.scene.children[0].shadowDarkness = value;
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
                guiLights.add(this.lightsParams, 'keyLightCastShadow').onChange(function(value) {
                    if(world.SceneA.scene.children[1] instanceof THREE.DirectionalLight) {
                        world.SceneA.scene.children[1].castShadow = value;
                        world.SceneB.scene.children[1].castShadow = value;
                    }
                });
                guiLights.add(this.lightsParams, 'keyLightShadowIntensity', 0, 10, 0.01).onChange(function(value) {
                    if(world.SceneA.scene.children[1] instanceof THREE.DirectionalLight) {
                        world.SceneA.scene.children[1].shadowDarkness = value;
                        world.SceneB.scene.children[1].shadowDarkness = value;
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
                guiLights.add(this.lightsParams, 'backLightCastShadow').onChange(function(value) {
                    if(world.SceneA.scene.children[2] instanceof THREE.DirectionalLight) {
                        world.SceneA.scene.children[2].castShadow = value;
                        world.SceneB.scene.children[2].castShadow = value;
                    }
                });
                guiLights.add(this.lightsParams, 'backLightShadowIntensity', 0, 10, 0.01).onChange(function(value) {
                    if(world.SceneA.scene.children[2] instanceof THREE.DirectionalLight) {
                        world.SceneA.scene.children[2].shadowDarkness = value;
                        world.SceneB.scene.children[2].shadowDarkness = value;
                    }
                });
                guiLights.add(this.lightsParams, 'shininess', 0, 1000, 0.01).onChange(function(value) {
                    if(world.SceneA.scene.children[3] instanceof THREE.Mesh) {
                        world.SceneA.scene.children[3].material.shininess = value;
                        world.SceneB.scene.children[3].material.shininess = value;
                    }
                });
                guiLights.close();
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
            this.Scene = function() {
                this.scene = new THREE.Scene();
                this.camera = new THREE.PerspectiveCamera(75, world.width / world.height, 0.1, 100);
                this.camera.position.z = 5;
                // frame buffer object
                this.fbo = new THREE.WebGLRenderTarget(world.width, world.height);
                /**
                 * Add wireframe clone of geometry to scene
                 **/
                var addWireframe = function(scene, geometry, color, thickness, scaleFactor) {
                    var materialTransparent = new THREE.MeshBasicMaterial({
                        transparent: true,
                        opacity: 0
                    });
                    var meshWire = new THREE.Mesh(geometry, materialTransparent);
                    meshWire.scale.set(scaleFactor, scaleFactor, scaleFactor);
                    scene.add(meshWire);
                    var edgeHelper = new THREE.EdgesHelper(meshWire, color);
                    edgeHelper.material.linewidth = thickness;
                    scene.add(edgeHelper);
                    return meshWire;
                };
                /**
                 * Add vertices sprites to scene
                 **/
                var addPointCloud = function(scene, geometry, spritePath, spriteSize, scaleFactor) {
                    var geometryParticle = new THREE.Geometry();
                    var sprite1 = THREE.ImageUtils.loadTexture(spritePath);
                    for(var i = 0; i < geometry.vertices.length; i++) {
                        var vector = new THREE.Vector3(geometry.vertices[i].x * scaleFactor, geometry.vertices[i].y * scaleFactor, geometry.vertices[i].z * scaleFactor);
                        geometryParticle.vertices.push(vector);
                    }
                    var materialSprite = new THREE.PointCloudMaterial({
                        size: spriteSize,
                        map: sprite1,
                        blending: THREE.NormalBlending,
                        depthTest: true,
                        transparent: true
                    });
                    var particlesCloud = new THREE.PointCloud(geometryParticle, materialSprite);
                    scene.add(particlesCloud);
                    return particlesCloud;
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
                var importCollada = function(set, filePathCollada, filePathUV) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load(filePathCollada, function(collada) {
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                if(child.name === 'Icosphere') {
                                    var mesh = child.children[0];
                                    /*var reflectionImg = THREE.ImageUtils.loadTextureCube([filePathUV]);
                                    reflectionImg.format = THREE.RGBFormat;
                                    var refractionImg = new THREE.CubeTexture(reflectionImg.image, new THREE.CubeRefractionMapping());
                                    refractionImg.format = THREE.RGBFormat;
                                    mesh.material = new THREE.MeshLambertMaterial({
                                        color: 0xffffff,
                                        ambient: 0xaaaaaa,
                                        envMap: reflectionImg
                                    });*/
                                    /*mesh.material = new THREE.MeshLambertMaterial({
                                        color: 0xffee00,
                                        ambient: 0x996600,
                                        envMap: refractionImg,
                                        refractionRatio: 0.95
                                    });*/
                                    /*mesh.material = new THREE.MeshLambertMaterial({
                                        color: 0xff6600,
                                        ambient: 0x993300,
                                        envMap: reflectionImg,
                                        combine: THREE.MixOperation,
                                        reflectivity: 0.9
                                    });*/
                                    var maxAnisotropy = world.renderer.getMaxAnisotropy();
                                    var texture = THREE.ImageUtils.loadTexture(filePathUV);
                                    texture.anisotropy = maxAnisotropy;
                                    /*mesh.material = new THREE.MeshPhongMaterial({
                                        color: 0x000000
                                        //map: texture
                                    });*/
                                    var mapHeight = THREE.ImageUtils.loadTexture('../src/textures/UVmaps/evolution.png');
                                    mapHeight.anisotropy = maxAnisotropy;
                                    //mapHeight.repeat.set(0.998, 0.998);
                                    //mapHeight.offset.set(0.001, 0.001);
                                    mapHeight.wrapS = mapHeight.wrapT = THREE.RepeatWrapping;
                                    mapHeight.format = THREE.RGBFormat;
                                    mesh.material = new THREE.MeshPhongMaterial({
                                        ambient: 0xffffff,
                                        color: 0x000000,
                                        specular: 0x333333,
                                        shininess: 10,
                                        //bumpMap: mapHeight,
                                        //bumpScale: 20,
                                        metal: true
                                    });
                                    mesh.castShadow = true;
                                    set.scene.add(mesh);
                                    set.lowpoly = mesh;
                                    set.polyWire = addWireframe(set.scene, mesh.geometry, 0xffffff, 1, 1.02);
                                    set.polyWire2 = addWireframe(set.scene, mesh.geometry, 0x000000, 1, 1.1);
                                    set.pointCloud = addPointCloud(set.scene, mesh.geometry, '../src/textures/sprites/black-circle-round-target-dot.png', 0.05, 1.1);
                                }
                            }
                        });
                        set.rotationSpeed = new THREE.Vector3(0, 0.002, 0.001);
                        set.render = function(rtt) {
                            set.lowpoly.rotation.x += set.rotationSpeed.x;
                            set.lowpoly.rotation.y += set.rotationSpeed.y;
                            set.lowpoly.rotation.z += set.rotationSpeed.z;
                            set.polyWire.rotation.x += set.rotationSpeed.x;
                            set.polyWire.rotation.y += set.rotationSpeed.y;
                            set.polyWire.rotation.z += set.rotationSpeed.z;
                            set.polyWire2.rotation.x += set.rotationSpeed.x;
                            set.polyWire2.rotation.y += set.rotationSpeed.y;
                            set.polyWire2.rotation.z += set.rotationSpeed.z;
                            set.pointCloud.rotation.x += set.rotationSpeed.x;
                            set.pointCloud.rotation.y += set.rotationSpeed.y;
                            set.pointCloud.rotation.z += set.rotationSpeed.z;
                            if(rtt) {
                                world.renderer.render(this.scene, this.camera, this.fbo, true);
                            } else {
                                world.renderer.clear();
                                if(world.renderParams.enableTrackball) {
                                    set.trackball.update();
                                }
                                set.composer.render(0.01);
                            }
                        };
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
                    //this.trackball.addEventListener( 'change', this.render );
                }
                //this.scene.fog = new THREE.FogExp2(0x000000, 0.0008);
                /* var geometry = new THREE.BoxGeometry(2, 2, 2);
                var material = new THREE.MeshBasicMaterial({
                    color: matColor
                });
                var cube = new THREE.Mesh(geometry, material);
                this.scene.add(cube);
                var meshWire = addWireframe(this.scene, geometry, 1.5);
                var meshWire2 = addWireframe(this.scene, geometry, 3);
                var pointCloud = addPointCloud(this.scene, geometry, 1)*/
                //var pointCloud2 = addPointCloud(this.scene, geometry, 3);
                addLights(this.scene);
                importCollada(this, '../src/collada/lowpoly.dae', '../src/textures/UVmaps/UVmap.png');
                /*******************************/
                world.postprocess.apply(this);
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
            this.Transition = function(sceneA, sceneB) {
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
                        sceneB.render(false);
                    }
                    // Render only scene B
                    else if(world.transitionParams.transitionMixRatio === 1) {
                        world.transitionParams.currentScene = 'B';
                        sceneA.render(false);
                    }
                    // Render both scenes and transition frame buffer object
                    else {
                        // When 0<transition<1 render transition between two scenes
                        world.transitionParams.currentScene = 'Transition';
                        sceneA.render(true);
                        sceneB.render(true);
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
                this.postprocess.apply(this.SceneA);
                this.postprocess.apply(this.SceneB);
                this.postprocess.apply(this.transition);
            };
            /**
             * On window resize world handler event
             **/
            this.onWindowResize = function() {
                world.width = window.innerWidth;
                world.height = window.innerHeight;
                world.SceneA.camera.aspect = world.width / world.height;
                world.SceneA.fbo = new THREE.WebGLRenderTarget(world.width, world.height);
                world.SceneA.camera.updateProjectionMatrix();
                world.SceneB.camera.aspect = world.width / world.height;
                world.SceneB.fbo = new THREE.WebGLRenderTarget(world.width, world.height);
                world.SceneB.camera.updateProjectionMatrix();
                //TODO: check if some problem exist in the following code
                world.transition.quadmaterial.uniforms.tDiffuse1.value = world.SceneA.fbo;
                world.transition.quadmaterial.uniforms.tDiffuse2.value = world.SceneB.fbo;
                world.renderer.setSize(world.width, world.height);
                world.refreshPostProcessing();
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
            this.SceneA = new this.Scene();
            this.SceneB = new this.Scene();
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