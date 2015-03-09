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
/*global classie:false */
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
    this.World = {
        width: window.innerWidth,
        height: window.innerHeight,
        targetRotationX: 0,
        targetRotationY: 0,
        dpr: window.devicePixelRatio,
        settings: {
            statsEnabled: true,
            guiEnabled: false
        },
        renderParams: {
            antialias: true,
            alpha: false,
            showStats: true,
            backgroundColor: [0, 0, 0],
            backgroundImage: 20,
            skydomeImage: 6,
            fog: 0.001,
            enableAnaglyph: false,
            focus: 15,
            enableTrackball: true,
            enableMouseListener: false,
            enableGrid: false,
            glitchType: 0,
            enableGlitch: false,
            enableRGBShift: false,
            rgbValue: 0.002,
            enableFXAA: true,
            enableBloom: false,
            bloomStrengh: 0.3,
            enableSepia: false,
            enableColorify: true,
            enableFilm: false,
            enableFilmBW: true,
            filmStrengh: 0.3,
            enableDotFilter: false,
            bleach: true,
            bleachOpacity: 1,
            technicolor: false,
            enableTiltShift: true,
            tiltBlur: 3.5,
            enableVignette: true,
            vignetteStrengh: 5,
            disableEffects: false
        },
        materialParams: {
            shaderAttr: 'Shader Attributes',
            noise: 0.04,
            normalScale: 0.5,
            normalRepeat: 1,
            useScreen: false,
            useRim: false,
            rimPower: 3,
            matSelected: 'Material selection',
            backgroundTexture: {
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
                9: 9,
                10: 10,
                11: 11,
                12: 12,
                13: 13,
                14: 14,
                15: 15,
                16: 16,
                17: 17,
                18: 18,
                19: 19,
                20: 20,
                21: 21,
                22: 22
            },
            textureMap: {
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
                9: 9,
                10: 10,
                11: 11,
                12: 12,
                13: 13,
                14: 14,
                15: 15,
                16: 16,
                17: 17,
                18: 18,
                19: 19,
                20: 20,
                21: 21,
                22: 22,
                23: 23,
                24: 24,
                25: 25,
                26: 26,
                27: 27,
                28: 28,
                29: 29,
                30: 30,
                31: 31,
                32: 32,
                33: 33,
                34: 34,
                35: 35,
                36: 36,
                37: 37,
                38: 38,
                39: 39,
                40: 40,
                41: 41,
                42: 42,
                43: 43,
                44: 44,
                45: 45,
                46: 46,
                47: 47,
                48: 48,
                49: 49,
                50: 50,
                51: 51,
                52: 52,
                53: 53,
                54: 54,
                55: 55,
                56: 56,
                57: 57,
                58: 58,
                59: 59,
                60: 60,
                61: 61,
                62: 62,
                63: 63,
                64: 64,
                65: 65,
                66: 66,
                67: 67,
                68: 68,
                69: 69,
                70: 70,
                71: 71,
                72: 72,
                73: 73,
                74: 74,
                75: 75,
                76: 76,
                77: 77,
                78: 78,
                79: 79,
                80: 80,
                81: 81,
                82: 82,
                83: 83,
                84: 84,
                85: 85,
                86: 86,
                87: 87,
                88: 88,
                89: 89,
                90: 90,
                91: 91,
                92: 92,
                93: 93,
                94: 94,
                95: 95,
                96: 96,
                97: 97,
                98: 98,
                99: 99,
                100: 100,
                101: 101,
                102: 102,
                103: 103,
                104: 104,
                105: 105,
                106: 106,
                107: 107,
                108: 108,
                109: 109,
                110: 110,
                111: 111,
                112: 112,
                113: 113,
                114: 114,
                115: 115,
                116: 116,
                117: 117,
                118: 118,
                119: 119,
                120: 120,
                121: 121
            },
            eyeballMap: {
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
                9: 9,
                10: 10,
                11: 11,
                12: 12,
                13: 13,
                14: 14,
                15: 15,
                16: 16,
                17: 17
            },
            normalMap: {
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
                9: 9,
                10: 10,
                11: 11,
                12: 12,
                13: 13,
                14: 14,
                15: 15,
                16: 16,
                17: 17,
                18: 18,
                19: 19,
                20: 20
            },
            bodyTexture: 16, //113,
            headTexture: 97,
            hairTexture: 1,
            eyeTexture: 8,
            clothTexture: 8,
            lipsTexture: 8,
            lowpolyTexture: 109,
            lowpoly2Texture: 60,
            lowpoly3Texture: 1,
            fragmentsTexture: 1,
            normalSelected: 'NormalMap selection',
            bodyNormal: 11,
            headNormal: 1,
            hairNormal: 1,
            eyeNormal: 1,
            lipsNormal: 1,
            clothNormal: 1,
            lowpolyNormal: 1,
            planeNormal: 1
        },
        lightsParams: {
            fillLightEnable: true,
            fillLightIntensity: 0.1,
            fillLightCastShadow: true,
            fillLightShadowIntensity: 0.1,
            keyLightEnable: true,
            keyLightIntensity: 1,
            keyLightCastShadow: true,
            keyLightShadowIntensity: 0.1,
            backLightEnable: true,
            backLightIntensity: 0.01,
            backLightCastShadow: true,
            backLightShadowIntensity: 0.1,
            shininess: 10,
            rotateLights: false
        },
        motionParams: {
            reverseFactor: 1,
            reverseTime: false,
            autoPanX: false,
            autoPanY: false,
            autoPanZ: false,
            autoRotationX: false,
            autoRotationY: false,
            autoRotationZ: false,
            animateFragments: true,
            rotateSceneX: function() {
                var layer = myPortfolio.World.CurrentLayer;
                var tweenScene90 = new TWEEN.Tween(layer.scene.rotation).to({
                    x: layer.scene.rotation.x + 90 * Math.PI / 180,
                    y: layer.scene.rotation.y,
                    z: layer.scene.rotation.z
                }, 1000);
                tweenScene90.easing(TWEEN.Easing.Quadratic.Out).start();
            },
            rotateSceneY: function() {
                var layer = myPortfolio.World.CurrentLayer;
                var tweenScene90 = new TWEEN.Tween(layer.scene.rotation).to({
                    x: layer.scene.rotation.x,
                    y: layer.scene.rotation.y + 90 * Math.PI / 180,
                    z: layer.scene.rotation.z
                }, 1000);
                tweenScene90.easing(TWEEN.Easing.Quadratic.Out).start();
            },
            rotateSceneZ: function() {
                var layer = myPortfolio.World.CurrentLayer;
                var tweenScene90 = new TWEEN.Tween(layer.scene.rotation).to({
                    x: layer.scene.rotation.x,
                    y: layer.scene.rotation.y,
                    z: layer.scene.rotation.z + 90 * Math.PI / 180
                }, 1000);
                tweenScene90.easing(TWEEN.Easing.Quadratic.Out).start();
            }
        },
        transitionParams: {
            clock: new THREE.Clock(false),
            transitionMixRatio: 1,
            texture: 1,
            textureThreshold: 0.3,
            CurrentLayer: 'A',
            toLayerA: function() {
                var transitionParams = this;
                this.transitionMixRatio = 0;
                myPortfolio.World.NextLayer = myPortfolio.World.LayerA;
                myPortfolio.World.transition = new myPortfolio.World.Transition(myPortfolio.World.CurrentLayer, myPortfolio.World.NextLayer);
                myPortfolio.World.CurrentLayer = myPortfolio.World.LayerA;
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
                myPortfolio.World.NextLayer = myPortfolio.World.LayerB;
                myPortfolio.World.transition = new myPortfolio.World.Transition(myPortfolio.World.CurrentLayer, myPortfolio.World.NextLayer);
                myPortfolio.World.CurrentLayer = myPortfolio.World.LayerB;
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
                myPortfolio.World.NextLayer = myPortfolio.World.LayerC;
                myPortfolio.World.transition = new myPortfolio.World.Transition(myPortfolio.World.CurrentLayer, myPortfolio.World.NextLayer);
                myPortfolio.World.CurrentLayer = myPortfolio.World.LayerC;
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
            transitionTime: 3,
            tweenVertices: function() {
                var source = myPortfolio.World.CurrentLayer.lowpoly.geometry;
                var source2 = myPortfolio.World.CurrentLayer.lowpoly2.geometry;
                var update = function() {
                    source.verticesNeedUpdate = true;
                };
                var update2 = function() {
                    source2.verticesNeedUpdate = true;
                };
                for(var i = 0; i < source.vertices.length; i++) {
                    var tweenVertex = new TWEEN.Tween(source.vertices[i]).to({
                        x: source.vertices[i].x * 1.1,
                        y: source.vertices[i].y * 1.1,
                        z: source.vertices[i].z * 1.1
                    }, 1000).onUpdate(update);
                    tweenVertex.delay(i * 10).easing(TWEEN.Easing.Quadratic.Out).start();
                }
                setTimeout(function() {
                    for(var i = 0; i < source.vertices.length; i++) {
                        var tweenVertex = new TWEEN.Tween(source.vertices[i]).to({
                            x: source.vertices[i].x * 0.9,
                            y: source.vertices[i].y * 0.9,
                            z: source.vertices[i].z * 0.9
                        }, 1000).onUpdate(update);
                        tweenVertex.delay(i * 10).easing(TWEEN.Easing.Quadratic.Out).start();
                    }
                }, 500);
                for(var i = 0; i < source2.vertices.length; i++) {
                    var tweenVertex = new TWEEN.Tween(source2.vertices[i]).to({
                        x: source2.vertices[i].x * 1.1,
                        y: source2.vertices[i].y * 1.1,
                        z: source2.vertices[i].z * 1.1
                    }, 1000).onUpdate(update2);
                    tweenVertex.delay(i * 10).easing(TWEEN.Easing.Quadratic.Out).start();
                }
                setTimeout(function() {
                    for(var i = 0; i < source2.vertices.length; i++) {
                        var tweenVertex = new TWEEN.Tween(source2.vertices[i]).to({
                            x: source2.vertices[i].x * 0.9,
                            y: source2.vertices[i].y * 0.9,
                            z: source2.vertices[i].z * 0.9
                        }, 1000).onUpdate(update2);
                        tweenVertex.delay(i * 10).easing(TWEEN.Easing.Quadratic.Out).start();
                    }
                }, 500);
            },
            tweenVerticesBack: function() {
                var source = myPortfolio.World.CurrentLayer.lowpoly.geometry;
                var update = function() {
                    source.verticesNeedUpdate = true;
                };
                for(var i = 0; i < source.vertices.length; i++) {
                    var tweenVertex = new TWEEN.Tween(source.vertices[i]).to({
                        x: source.vertices[i].x / 2,
                        y: source.vertices[i].y / 2,
                        z: source.vertices[i].z / 2
                    }, 2000).onUpdate(update);
                    tweenVertex.delay(i).easing(TWEEN.Easing.Quadratic.Out).start();
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
                if(world.settings.statsEnabled) {
                    guiRender.add(this.renderParams, 'showStats').onChange(function(value) {
                        if(value) {
                            document.getElementById('stats').style.display = 'block';
                            document.getElementById('gpuStats').style.display = 'block';
                        } else {
                            document.getElementById('stats').style.display = 'none';
                            document.getElementById('gpuStats').style.display = 'none';
                        }
                    });
                }
                guiRender.add(this.renderParams, 'enableAnaglyph').onChange(function(value) {
                    if(value) {
                        myPortfolio.World.CurrentLayer.anaglyph = new THREE.AnaglyphEffect(world.renderer, world.width, world.height, 2);
                    }
                });
                guiRender.add(this.renderParams, 'focus', 0, 50).listen().onChange(function() {
                    myPortfolio.World.CurrentLayer.anaglyph = new THREE.AnaglyphEffect(world.renderer, world.width, world.height, world.renderParams.focus);
                });
                guiRender.addColor(this.renderParams, 'backgroundColor').onChange(function(value) {
                    world.renderer.setClearColor(new THREE.Color(value[0] / 255, value[1] / 255, value[2] / 255), 0);
                });
                guiRender.add(this.renderParams, 'backgroundImage', this.materialParams.backgroundTexture).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.backgroundImage.material.map = THREE.ImageUtils.loadTexture('../src/textures/background/background' + value + '.jpg');
                });
                guiRender.add(this.renderParams, 'skydomeImage', this.materialParams.backgroundTexture).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.skydome.material.map = THREE.ImageUtils.loadTexture('../src/textures/background/background' + value + '.jpg');
                });
                guiRender.add(this.renderParams, 'fog', 0, 1, 0.001).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.scene.fog = new THREE.FogExp2(0x000000, value);
                });
                guiRender.add(this.renderParams, 'enableTrackball');
                guiRender.add(this.renderParams, 'enableMouseListener').onChange(function(value) {
                    function onDocumentMouseMove(event) {
                        var mouseX = event.clientX - myPortfolio.World.width / 2;
                        var mouseY = event.clientY - myPortfolio.World.height / 2;
                        myPortfolio.World.targetRotationX = mouseX * 0.00005;
                        myPortfolio.World.targetRotationY = mouseY * 0.0001;
                    }
                    if( !! value) {
                        document.addEventListener('mousemove', onDocumentMouseMove, false);
                    } else {
                        document.World.renderer.domElement.removeEventListener('mousemove', onDocumentMouseMove, false);
                    }
                    world.refreshPostProcessing();
                });
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
                });
                guiRender.add(this.renderParams, 'rgbValue', 0, 1, 0.001).onChange(function() {
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
                guiRender.add(this.renderParams, 'enableSepia').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableColorify').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableFilm').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableFilmBW').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'filmStrengh', 0, 1, 0.001).onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'bleach').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'bleachOpacity', 0, 1, 0.01).onChange(function(value) {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'technicolor').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'enableTiltShift').onChange(function() {
                    world.refreshPostProcessing();
                });
                guiRender.add(this.renderParams, 'tiltBlur', 0.0, 20.0).listen().onChange(function() {
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
                //guiRender.close();
                /**
                 * GUI Material Params
                 **/
                var guiMaterial = new dat.GUI();
                guiMaterial.add(this.materialParams, 'shaderAttr');
                guiMaterial.add(this.materialParams, 'noise', 0, 0.3, 0.001).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.makehumanBody.material.uniforms.noise.value = value;
                });
                guiMaterial.add(this.materialParams, 'normalScale', 0, 10, 0.01).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.makehumanBody.material.uniforms.normalScale.value = value;
                    myPortfolio.World.CurrentLayer.makehumanBody.material.uniforms.tNormal.value.needsUpdate = true;
                });
                guiMaterial.add(this.materialParams, 'normalRepeat', 0, 10, 1).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.makehumanBody.material.uniforms.normalRepeat.value = value;
                    myPortfolio.World.CurrentLayer.makehumanBody.material.uniforms.tNormal.value.needsUpdate = true;
                });
                guiMaterial.add(this.materialParams, 'useScreen').onChange(function(value) {
                    myPortfolio.World.CurrentLayer.makehumanBody.material.uniforms.useScreen.value = value;
                });
                guiMaterial.add(this.materialParams, 'useRim').onChange(function(value) {
                    myPortfolio.World.CurrentLayer.makehumanBody.material.uniforms.useRim.value = value;
                });
                guiMaterial.add(this.materialParams, 'rimPower', 0, 5, 0.1).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.makehumanBody.material.uniforms.rimPower.value = value;
                });
                guiMaterial.add(this.materialParams, 'matSelected');
                guiMaterial.add(this.materialParams, 'bodyTexture', this.materialParams.textureMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.makehumanBody.material.uniforms.tMatCap.value = THREE.ImageUtils.loadTexture('../src/textures/matcaps/matcap' + value + '.png');
                });
                guiMaterial.add(this.materialParams, 'headTexture', this.materialParams.textureMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.makehumanHead.material.uniforms.tMatCap.value = THREE.ImageUtils.loadTexture('../src/textures/matcaps/matcap' + value + '.png');
                });
                guiMaterial.add(this.materialParams, 'hairTexture', this.materialParams.textureMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.makehumanHair.material.uniforms.tMatCap.value = THREE.ImageUtils.loadTexture('../src/textures/matcaps/matcap' + value + '.png');
                });
                guiMaterial.add(this.materialParams, 'clothTexture', this.materialParams.textureMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.cloth.material.uniforms.tMatCap.value = THREE.ImageUtils.loadTexture('../src/textures/matcaps/matcap' + value + '.png');
                });
                guiMaterial.add(this.materialParams, 'lipsTexture', this.materialParams.textureMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.lips.material.uniforms.tMatCap.value = THREE.ImageUtils.loadTexture('../src/textures/matcaps/matcap' + value + '.png');
                });
                guiMaterial.add(this.materialParams, 'eyeTexture', this.materialParams.eyeballMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.eyes.material.uniforms.tMatCap.value = THREE.ImageUtils.loadTexture('../src/textures/matcaps/eyeball' + value + '.png');
                });
                guiMaterial.add(this.materialParams, 'lowpolyTexture', this.materialParams.textureMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.lowpoly.material.uniforms.tMatCap.value = THREE.ImageUtils.loadTexture('../src/textures/matcaps/matcap' + value + '.png');
                });
                guiMaterial.add(this.materialParams, 'lowpoly2Texture', this.materialParams.textureMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.lowpoly2.material.uniforms.tMatCap.value = THREE.ImageUtils.loadTexture('../src/textures/matcaps/matcap' + value + '.png');
                });
                guiMaterial.add(this.materialParams, 'lowpoly3Texture', this.materialParams.textureMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.lowpoly3.material.uniforms.tMatCap.value = THREE.ImageUtils.loadTexture('../src/textures/matcaps/matcap' + value + '.png');
                });
                guiMaterial.add(this.materialParams, 'fragmentsTexture', this.materialParams.textureMap).onChange(function(value) {
                    for(var i = 0; i < myPortfolio.World.CurrentLayer.fragments.length; i++) {
                        myPortfolio.World.CurrentLayer.fragments[i].material.uniforms.tMatCap.value = THREE.ImageUtils.loadTexture('../src/textures/matcaps/matcap' + value + '.png');
                    }
                });
                guiMaterial.add(this.materialParams, 'normalSelected');
                guiMaterial.add(this.materialParams, 'bodyNormal', this.materialParams.normalMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.makehumanBody.material.uniforms.tNormal.value = THREE.ImageUtils.loadTexture('../src/textures/normalMaps/normal' + value + '.jpg', 1);
                    myPortfolio.World.CurrentLayer.makehumanBody.material.uniforms.tNormal.value.needsUpdate = true;
                    myPortfolio.World.CurrentLayer.makehumanBody.material.uniforms.tNormal.value.wrapS = material.uniforms.tNormal.value.wrapT = THREE.RepeatWrapping;
                });
                guiMaterial.add(this.materialParams, 'headNormal', this.materialParams.normalMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.makehumanHead.material.uniforms.tNormal.value = THREE.ImageUtils.loadTexture('../src/textures/normalMaps/normal' + value + '.jpg', 1);
                });
                guiMaterial.add(this.materialParams, 'hairNormal', this.materialParams.normalMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.makehumanHair.material.uniforms.tNormal.value = THREE.ImageUtils.loadTexture('../src/textures/normalMaps/normal' + value + '.jpg', 1);
                });
                guiMaterial.add(this.materialParams, 'clothNormal', this.materialParams.normalMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.cloth.material.uniforms.tNormal.value = THREE.ImageUtils.loadTexture('../src/textures/normalMaps/normal' + value + '.jpg', 1);
                });
                guiMaterial.add(this.materialParams, 'lipsNormal', this.materialParams.normalMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.lips.material.uniforms.tNormal.value = THREE.ImageUtils.loadTexture('../src/textures/normalMaps/normal' + value + '.jpg', 1);
                });
                guiMaterial.add(this.materialParams, 'eyeNormal', this.materialParams.normalMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.eyes.material.uniforms.tNormal.value = THREE.ImageUtils.loadTexture('../src/textures/normalMaps/normal' + value + '.jpg', 1);
                });
                guiMaterial.add(this.materialParams, 'lowpolyNormal', this.materialParams.normalMap).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.lowpoly.material.uniforms.tNormal.value = THREE.ImageUtils.loadTexture('../src/textures/normalMaps/normal' + value + '.jpg', 1);
                });
                /**
                 * GUI Tween Motions test
                 **/
                var guiTransition = new dat.GUI();
                guiTransition.add(this.transitionParams, 'CurrentLayer').listen();
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
                guiTransition.add(this.transitionParams, 'tweenVerticesBack');
                //guiTransition.close();
                //
                /*
                 * Motion Gui controler
                 **/
                var guiMotion = new dat.GUI();
                guiMotion.add(this.motionParams, 'reverseTime').onChange(function(value) {
                    world.motionParams.reverseFactor = !! value ? -1 : 1;
                    console.info(world.motionParams.reverseFactor);
                });
                guiMotion.add(this.motionParams, 'autoPanX');
                guiMotion.add(this.motionParams, 'autoPanY');
                guiMotion.add(this.motionParams, 'autoPanZ');
                guiMotion.add(this.motionParams, 'autoRotationX');
                guiMotion.add(this.motionParams, 'autoRotationY');
                guiMotion.add(this.motionParams, 'autoRotationZ');
                guiMotion.add(this.motionParams, 'animateFragments');
                guiMotion.add(this.motionParams, 'rotateSceneX');
                guiMotion.add(this.motionParams, 'rotateSceneY');
                guiMotion.add(this.motionParams, 'rotateSceneZ');
                /**
                 *  AUDIO GUI params
                 **/
                /*var guiAudio = new dat.GUI();
                guiAudio.add(this.audioParams, 'playPause');*/
                /**
                 *  Lights GUI params
                 **/
                var guiLights = new dat.GUI();
                guiLights.add(this.lightsParams, 'fillLightEnable').onChange(function(value) {
                    if(world.CurrentLayer.scene.children[0] instanceof THREE.DirectionalLight) {
                        world.CurrentLayer.scene.children[0].visible = value;
                    }
                });
                guiLights.add(this.lightsParams, 'fillLightIntensity', 0, 50, 0.01).onChange(function(value) {
                    if(world.CurrentLayer.scene.children[0] instanceof THREE.DirectionalLight) {
                        world.CurrentLayer.scene.children[0].intensity = value;
                    }
                });
                guiLights.add(this.lightsParams, 'keyLightEnable').onChange(function(value) {
                    if(world.CurrentLayer.scene.children[1] instanceof THREE.DirectionalLight) {
                        world.CurrentLayer.scene.children[1].visible = value;
                    }
                });
                guiLights.add(this.lightsParams, 'keyLightIntensity', 0, 50, 0.01).onChange(function(value) {
                    if(world.CurrentLayer.scene.children[1] instanceof THREE.DirectionalLight) {
                        world.CurrentLayer.scene.children[1].intensity = value;
                    }
                });
                guiLights.add(this.lightsParams, 'backLightEnable').onChange(function(value) {
                    if(world.CurrentLayer.scene.children[2] instanceof THREE.DirectionalLight) {
                        world.CurrentLayer.scene.children[2].visible = value;
                    }
                });
                guiLights.add(this.lightsParams, 'backLightIntensity', 0, 50, 0.01).onChange(function(value) {
                    if(world.CurrentLayer.scene.children[2] instanceof THREE.DirectionalLight) {
                        world.CurrentLayer.scene.children[2].intensity = value;
                    }
                });
                guiLights.add(this.lightsParams, 'shininess', 0, 500, 0.01).onChange(function(value) {
                    if(world.CurrentLayer.scene.children[3] instanceof THREE.Mesh) {
                        world.CurrentLayer.scene.children[3].material.shininess = value;
                    }
                });
                guiLights.add(this.lightsParams, 'rotateLights');
                guiLights.close();
            }
        },
        addStats: function() {
            if(this.settings.statsEnabled) {
                //add Threejs stats FPS
                this.fpsStats = new Stats();
                this.fpsStats.setMode(0); // 0: fps, 1: ms
                this.fpsStats.domElement.style.position = 'absolute';
                this.fpsStats.domElement.style.right = '0px';
                this.fpsStats.domElement.style.top = '20px';
                document.getElementById('sectionSettings').appendChild(this.fpsStats.domElement);
                document.getElementById('fps').style.background = 'transparent';
                document.getElementById('fpsText').style.color = '#fff';
                document.getElementById('fpsText').style.fontWeight = '100';
                document.getElementById('fpsText').style.fontFamily = "Open Sans";
                document.getElementById('fpsGraph').style.display = 'none';
                //add threex.renderstats WEBGL render
                /*this.gpuStats = new THREEx.RendererStats();
                this.gpuStats.domElement.id = 'gpuStats';
                this.gpuStats.domElement.style.position = 'absolute';
                this.gpuStats.domElement.style.left = '0px';
                this.gpuStats.domElement.style.bottom = '0px';
                document.body.appendChild(this.gpuStats.domElement);*/
            }
        },
        materials: function(materialParams) {
            this.transparentMaterial = function(matColor, matOpacity) {
                var material = new THREE.MeshNormalMaterial({
                    color: matColor,
                    opacity: matOpacity,
                    transparent: true
                });
                return material;
            };
            this.transparentTextureMaterial = function(texture) {
                var material = new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture(texture),
                    blending: THREE.NormalBlending,
                    depthTest: true,
                    transparent: true
                });
                return material;
            };
            this.normalMaterial = function(layer, matcap, normalMap, useNormal) {
                var material = new THREE.ShaderMaterial({
                    uniforms: {
                        tNormal: {
                            type: 't',
                            value: THREE.ImageUtils.loadTexture(normalMap, new THREE.UVMapping(), function() {
                                layer.numberAssetsLoaded++;
                                console.log(layer.numberAssetsLoaded);
                                layer.loadProgressCallback();
                            })
                        },
                        tMatCap: {
                            type: 't',
                            value: THREE.ImageUtils.loadTexture(matcap, new THREE.UVMapping(), function() {
                                layer.numberAssetsLoaded++;
                                console.log(layer.numberAssetsLoaded);
                                layer.loadProgressCallback();
                            })
                        },
                        time: {
                            type: 'f',
                            value: 0
                        },
                        bump: {
                            type: 'f',
                            value: 0
                        },
                        noise: {
                            type: 'f',
                            value: materialParams.noise
                        },
                        repeat: {
                            type: 'v2',
                            value: new THREE.Vector2(1, 1)
                        },
                        useNormal: {
                            type: 'f',
                            value: useNormal
                        },
                        useRim: {
                            type: 'f',
                            value: materialParams.useRim
                        },
                        rimPower: {
                            type: 'f',
                            value: materialParams.rimPower
                        },
                        useScreen: {
                            type: 'f',
                            value: materialParams.useScreen
                        },
                        normalScale: {
                            type: 'f',
                            value: materialParams.normalScale
                        },
                        normalRepeat: {
                            type: 'f',
                            value: materialParams.normalRepeat
                        }
                    },
                    vertexShader: document.getElementById('vertexShader').textContent,
                    fragmentShader: document.getElementById('fragmentShader').textContent,
                    wrapping: THREE.ClampToEdgeWrapping,
                    shading: THREE.SmoothShading
                });
                material.uniforms.tMatCap.value.wrapS = material.uniforms.tMatCap.value.wrapT = THREE.ClampToEdgeWrapping;
                material.uniforms.tNormal.value.wrapS = material.uniforms.tNormal.value.wrapT = THREE.RepeatWrapping;
                return material;
            };
            this.matcapMaterial = function(layer, matcap) {
                var material = new THREE.ShaderMaterial({
                    uniforms: {
                        tMatCap: {
                            type: 't',
                            value: THREE.ImageUtils.loadTexture('../src/textures/matcaps/matcap' + matcap + '.png', new THREE.UVMapping(), function() {
                                layer.numberAssetsLoaded++;
                                console.log(layer.numberAssetsLoaded);
                                layer.loadProgressCallback();
                            })
                        },
                    },
                    vertexShader: document.getElementById('sem-vs').textContent,
                    fragmentShader: document.getElementById('sem-fs').textContent,
                    side: THREE.DoubleSide,
                    shading: THREE.SmoothShading
                });
                return material;
            };
            this.shaderNormalMaterial = function(layer, shaderParams) {
                var shininess = shaderParams.shininess;
                var normalScale = shaderParams.normalScale;
                var shader = THREE.ShaderLib["normalmap"];
                var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
                uniforms.enableAO.value = true;
                uniforms.enableDiffuse.value = true;
                uniforms.enableSpecular.value = true;
                uniforms.enableReflection.value = false;
                uniforms.enableDisplacement.value = false;
                uniforms.tDiffuse.value = THREE.ImageUtils.loadTexture(shaderParams.diffuseTexture, new THREE.UVMapping(), function() {
                    layer.numberAssetsLoaded++;
                    console.log(layer.numberAssetsLoaded);
                    layer.loadProgressCallback();
                });
                uniforms.tSpecular.value = THREE.ImageUtils.loadTexture(shaderParams.specTexture, new THREE.UVMapping(), function() {
                    layer.numberAssetsLoaded++;
                    console.log(layer.numberAssetsLoaded);
                    layer.loadProgressCallback();
                });
                uniforms.tAO.value = THREE.ImageUtils.loadTexture(shaderParams.AOTexture, new THREE.UVMapping(), function() {
                    layer.numberAssetsLoaded++;
                    console.log(layer.numberAssetsLoaded);
                    layer.loadProgressCallback();
                });
                uniforms.tNormal.value = THREE.ImageUtils.loadTexture(shaderParams.normalTexture, new THREE.UVMapping(), function() {
                    layer.numberAssetsLoaded++;
                    console.log(layer.numberAssetsLoaded);
                    layer.loadProgressCallback();
                });
                //uniforms["tDisplacement"].value = THREE.ImageUtils.loadTexture("../src/textures/UVmaps/face_DISP.png");
                //uniforms["uDisplacementBias"].value = -0.428408;
                //uniforms["uDisplacementScale"].value = 2.436143;
                uniforms.uNormalScale.value.x = normalScale;
                uniforms.uNormalScale.value.y = normalScale;
                uniforms.uNormalScale.value.z = normalScale;
                uniforms.shininess.value = shininess;
                /*uniforms["diffuse"].value.convertGammaToLinear();
                                    uniforms["specular"].value.convertGammaToLinear();
                                    uniforms["ambient"].value.convertGammaToLinear();*/
                var parameters = {
                    fragmentShader: shader.fragmentShader,
                    vertexShader: shader.vertexShader,
                    uniforms: uniforms,
                    lights: true,
                    fog: true
                };
                var material = new THREE.ShaderMaterial(parameters);
                return material;
            };
            this.bakedMaterial = function(texturePath) {
                var material = new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture(texturePath),
                });
                return material;
            };
            this.wireframeMaterial = function(color, thickness) {
                var material = new THREE.MeshBasicMaterial({
                    color: color,
                    transparent: false,
                    opacity: 1,
                    wireframeLinewidth: thickness,
                    wireframe: true
                });
                return material;
            };
        },
        init: function() {
            var world = this;
            this.materials = new world.materials(world.materialParams);
            this.addGUI();
            this.addStats();
            this.renderer = new THREE.WebGLRenderer({
                canvas: threejsCanvas,
                antialias: this.renderParams.antialias,
                alpha: this.renderParams.alpha
            });
            this.renderer.setSize(this.width, this.height);
            this.renderer.setClearColor(new THREE.Color(world.renderParams.backgroundColor[0] / 255, world.renderParams.backgroundColor[1] / 255, world.renderParams.backgroundColor[2] / 255), 0);
            this.renderer.autoClear = true;
            this.renderer.shadowMapEnabled = true;
            this.renderer.shadowMapSoft = true;
            this.renderer.shadowCameraNear = 0.1;
            this.renderer.shadowCameraFar = 100;
            this.renderer.shadowCameraFov = 50;
            this.renderer.shadowMapBias = 0.005;
            this.renderer.shadowMapDarkness = 0.1;
            this.renderer.shadowMapWidth = 1024 * 1;
            this.renderer.shadowMapHeight = 1024 * 1;
            this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
            /**
             * Scene
             **/
            this.Layer = function(name, totalAssetsToLoad, loadProgressCallback, onLoadedCallback) {
                var layer = this;
                this.numberAssetsLoaded = 0;
                this.totalAssetsToLoad = totalAssetsToLoad + 1; //the extra one is for the collada dae
                this.onLoadedCallback = onLoadedCallback;
                this.loadProgressCallback = loadProgressCallback;
                this.name = name;
                this.scene = new THREE.Scene();
                this.camera = new THREE.PerspectiveCamera(15, world.width / world.height, 0.1, 200);
                this.camera.position.z = 15;
                // frame buffer object
                this.fbo = new THREE.WebGLRenderTarget(world.width, world.height);
                this.loadReset = function() {
                    var loadProgression = 0;
                    var progressBar = document.getElementById('progressBar');
                    classie.addClass(progressBar, 'reset');
                    progressBar.style.width = loadProgression + '%';
                }
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
                        fillLight.position.set(0, 0, 20);
                        fillLight.castShadow = world.lightsParams.fillLightCastShadow;
                        fillLight.shadowDarkness = world.lightsParams.fillLightShadowIntensity;
                        fillLight.shadowMapWidth = 1024 * 1;
                        fillLight.shadowMapHeight = 1024 * 1;
                        fillLight.shadowCameraNear = 0.2;
                        fillLight.shadowCameraFar = 1500;
                        var d = 3;
                        fillLight.shadowCameraLeft = -d;
                        fillLight.shadowCameraRight = d;
                        fillLight.shadowCameraTop = d;
                        fillLight.shadowCameraBottom = -d;
                        scene.add(fillLight);
                    }
                    if(world.lightsParams.keyLightEnable) {
                        var keyLight = new THREE.DirectionalLight('white', world.lightsParams.keyLightIntensity);
                        keyLight.position.set(1, 0, 0.5);
                        keyLight.castShadow = world.lightsParams.keyLightCastShadow;
                        keyLight.shadowDarkness = world.lightsParams.keyLightShadowIntensity;
                        keyLight.shadowMapWidth = 1024 * 1;
                        keyLight.shadowMapHeight = 1024 * 1;
                        keyLight.shadowCameraNear = 0.2;
                        keyLight.shadowCameraFar = 1500;
                        keyLight.shadowBias = 0.0005;
                        var d = 3;
                        keyLight.shadowCameraLeft = -d;
                        keyLight.shadowCameraRight = d;
                        keyLight.shadowCameraTop = d;
                        keyLight.shadowCameraBottom = -d;
                        scene.add(keyLight);
                    }
                    if(world.lightsParams.backLightEnable) {
                        var backLight = new THREE.DirectionalLight('white', world.lightsParams.backLightIntensity);
                        backLight.position.set(-1, 0, 0.5);
                        backLight.castShadow = world.lightsParams.backLightCastShadow;
                        backLight.shadowDarkness = world.lightsParams.backLightShadowIntensity;
                        backLight.shadowMapWidth = 1024 * 1;
                        backLight.shadowMapHeight = 1024 * 1;
                        backLight.shadowCameraNear = 0.2;
                        backLight.shadowCameraFar = 1500;
                        backLight.shadowBias = 0.0005;
                        var d = 3;
                        backLight.shadowCameraLeft = -d;
                        backLight.shadowCameraRight = d;
                        backLight.shadowCameraTop = d;
                        backLight.shadowCameraBottom = -d;
                        scene.add(backLight);
                    }
                };
                /**
                 * Add CubeMap
                 **/
                var addCubeMap = function(layer, filePathUV) {
                    var path = filePathUV;
                    var format = '.jpg';
                    var urls = [
                        path + 'px' + format, path + 'nx' + format,
                        path + 'py' + format, path + 'ny' + format,
                        path + 'pz' + format, path + 'nz' + format
                    ];
                    var reflectionCube = THREE.ImageUtils.loadTextureCube(urls);
                    reflectionCube.format = THREE.RGBFormat;
                    // Skybox
                    var shader = THREE.ShaderLib.cube;
                    shader.uniforms.tCube.value = reflectionCube;
                    var material = new THREE.ShaderMaterial({
                        fragmentShader: shader.fragmentShader,
                        vertexShader: shader.vertexShader,
                        uniforms: shader.uniforms,
                        depthWrite: false,
                        side: THREE.BackSide
                    });
                    var mesh = new THREE.Mesh(new THREE.BoxGeometry(60, 60, 60), material);
                    layer.cubeMap = mesh;
                    layer.scene.add(mesh);
                };
                /**
                 * Add Scene Background Image
                 **/
                var addBackgroundImage = function(layer, imagePath) {
                    // Load the background texture
                    var texture = THREE.ImageUtils.loadTexture(imagePath, new THREE.UVMapping(), function() {
                        layer.numberAssetsLoaded++;
                        console.log(layer.numberAssetsLoaded);
                        layer.loadProgressCallback();
                    });
                    var plane = new THREE.PlaneBufferGeometry(20, 40, 0, 0);
                    var backgroundImage = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({
                        map: texture
                    }));
                    backgroundImage.position.z = -5;
                    backgroundImage.position.y = 1;
                    layer.scene.add(backgroundImage);
                    return backgroundImage;
                };
                /**
                 * Import collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadMainModel = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/male30.dae', function(collada) {
                        var dae = collada.scene;
                        layer.fragments = [];
                        layer.scene.add(dae);
                        //layer.backgroundImage = addBackgroundImage(layer, '../src/textures/background/background' + world.renderParams.backgroundImage + '.jpg');
                        addSkyDome(layer, 8, '../src/textures/background/background' + world.renderParams.skydomeImage + '.jpg');
                        //layer.sphericalCloud = addRandomSphericalCloud(layer.scene, 1000, 4, '../src/textures/sprites/WhiteDot.svg', 0.03);
                        //layer.spheres = [];
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name.indexOf('makehuman_Body') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap' + world.materialParams.bodyTexture + '.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1);
                                    layer.makehumanBody = mesh;
                                } else if(child.name.indexOf('Planet3') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = true;
                                    mesh.castShadow = true;
                                    mesh.geometry.computeTangents();
                                    var shaderParams = {
                                        shininess: 2,
                                        normalScale: 0.5,
                                        diffuseTexture: '../src/textures/nms/planet_Dank.png',
                                        specTexture: '../src/textures/UVmaps/male07/Head_Colour_SPEC.png',
                                        AOTexture: '../src/textures/UVmaps/male07/Head_Colour_AO.png',
                                        normalTexture: '../src/textures/UVmaps/male07/normal20.jpg'
                                    }
                                    mesh.material = world.materials.shaderNormalMaterial(layer, shaderParams);
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'leftArm') {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap' + world.materialParams.bodyTexture + '.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1);
                                    layer.leftArm = mesh;
                                } else if(child.name === 'rightArm') {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap30.png', '../src/textures/normalMaps/normal11.jpg', 1);
                                    layer.rightArm = mesh;
                                } else if(child.name === 'makehuman_Hair') {
                                    var mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap14.png', '../src/textures/normalMaps/normal1.jpg', 1);
                                    layer.makehumanHair = mesh;
                                } else if(child.name.indexOf('makehuman_HighPolyEyes') != -1) {
                                    var mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/eyeball8.png', '../src/textures/normalMaps/normal1.jpg', 1);
                                    layer.eyes = mesh;
                                } else if(child.name.indexOf('makehuman_Lips') != -1) {
                                    var mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap97.png', '../src/textures/UVmaps/male/cb_NRM.png', 1);
                                    layer.lips = mesh;
                                } else if(child.name.indexOf('makehuman_Eyebrow') != -1) {
                                    var mesh = child.children[0];
                                    mesh.material = new THREE.MeshBasicMaterial({
                                        map: THREE.ImageUtils.loadTexture("../src/textures/UVmaps/male/eyebrowMale2.png"),
                                        blending: THREE.NormalBlending,
                                        depthTest: true,
                                        transparent: true
                                    });
                                    layer.makehumanEyebrows = mesh;
                                } else if(child.name.indexOf('makehuman_Eyelashes') != -1) {
                                    var mesh = child.children[0];
                                    mesh.material = new THREE.MeshBasicMaterial({
                                        map: THREE.ImageUtils.loadTexture("../src/textures/UVmaps/male/eyelashesMale2.png"),
                                        blending: THREE.NormalBlending,
                                        depthTest: true,
                                        transparent: true
                                    });
                                    layer.makehumanEyelashes = mesh;
                                } else if(child.name === 'cloth') {
                                    var mesh = child.children[0];
                                    layer.cloth = mesh;
                                } else if(child.name === 'lowpoly') {
                                    var mesh = child.children[0];
                                    //mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, world.materialParams.lowpolyTexture);
                                    //world.normalMaterial('../src/textures/matcaps/matcap15.png', '../src/textures/normalMaps/normal11.jpg', 1);
                                    //layer.polyWire1 = addWireframe(layer.scene, mesh.geometry, 0xffffff, 1, 1);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly = mesh;
                                    //layer.polyWire = addWireframe(layer.scene, mesh.geometry, 0x000000, 1, 1);
                                    //layer.pointCloud = addPointCloud(layer.scene, mesh.geometry, '../src/textures/sprites/BlackDot.svg', 1.031, 1);
                                } else if(child.name === 'lowpoly2') {
                                    var mesh = child.children[0];
                                    var modifier = new THREE.SubdivisionModifier(1);
                                    modifier.modify(mesh.geometry);
                                    //mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, world.materialParams.lowpoly2Texture);
                                    //layer.polyWire2 = addWireframe(layer.scene, mesh.geometry, 0xffffff, 1, 1);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly2 = mesh;
                                    //layer.polyWire = addWireframe(layer.scene, mesh.geometry, 0x000000, 1, 1);
                                    //layer.pointCloud = addPointCloud(layer.scene, mesh.geometry, '../src/textures/sprites/BlackDot.svg', 1.031, 1);
                                } else if(child.name === 'lowpoly3') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, world.materialParams.lowpoly3Texture);
                                    //mesh.geometry.computeTangents();
                                    //mesh.material = world.transparentMaterial(0xFFFFFF, 0.5);
                                    //world.matcapMaterial(15);
                                    //world.matcapMaterial(15);
                                    //layer.polyWire2 = addWireframe(layer.scene, mesh.geometry, 0xffffff, 1, 1);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly3 = mesh;
                                    //layer.polyWire = addWireframe(layer.scene, mesh.geometry, 0x000000, 1, 1);
                                    //layer.pointCloud = addPointCloud(layer.scene, mesh.geometry, '../src/textures/sprites/BlackDot.svg', 1.031, 1);
                                } else if(child.name.indexOf('cell') != -1) {
                                    var mesh = child.children[0];
                                    //mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, 95);
                                    //world.wireframeMaterial();
                                    //layer.polyWire2 = addWireframe(layer.scene, mesh.geometry, 0xffffff, 1, 1);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.fragments.push(mesh);
                                    //layer.polyWire = addWireframe(layer.scene, mesh.geometry, 0x000000, 1, 1);
                                    //layer.pointCloud = addPointCloud(layer.scene, mesh.geometry, '../src/textures/sprites/BlackDot.svg', 1.031, 1);
                                } else if(child.name === 'background') {
                                    var mesh = child.children[0];
                                    //mesh.geometry.computeTangents();
                                    var texture = THREE.ImageUtils.loadTexture('../src/textures/background/background' + world.renderParams.backgroundImage + '.jpg', new THREE.UVMapping(), function() {
                                        layer.numberAssetsLoaded++;
                                        console.log(layer.numberAssetsLoaded);
                                        layer.loadProgressCallback();
                                    });
                                    mesh.material = new THREE.MeshBasicMaterial({
                                        map: texture
                                    });
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    //layer.backgroundImage = mesh;
                                    //layer.polyWire = addWireframe(layer.scene, mesh.geometry, 0x000000, 1, 1);
                                    //layer.pointCloud = addPointCloud(layer.scene, mesh.geometry, '../src/textures/sprites/BlackDot.svg', 1.031, 1);
                                } else if(child.name === 'ground') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.bakedMaterial('../src/textures/UVmaps/uvmapground.png');
                                    mesh.receiveShadow = true;
                                    mesh.castShadow = false;
                                    layer.ground = mesh;
                                }
                            }
                        });
                        layer.rotationSpeed = new THREE.Vector3(0.001, 0.0015, 0.0002);
                        layer.render = function(rtt) {
                            //layer.scene.position.y += layer.rotationSpeed.y * 0.1;
                            //                            layer.lowpoly2.rotation.x += layer.rotationSpeed.z*5;
                            layer.scene.rotation.y += layer.rotationSpeed.z * 2;
                            /*layer.lowpoly2.rotation.x += layer.rotationSpeed.z;
                            layer.lowpoly2.rotation.y += layer.rotationSpeed.z;
                            layer.lowpoly2.rotation.z += layer.rotationSpeed.z;*/
                            if(world.motionParams.animateFragments) {
                                for(var i = 0; i < layer.fragments.length; i++) {
                                    //rotation
                                    layer.fragments[i].rotation.x += layer.rotationSpeed.y * 2;
                                    layer.fragments[i].rotation.y += layer.rotationSpeed.y * 2;
                                    layer.fragments[i].rotation.z += layer.rotationSpeed.y * 2;
                                    //position
                                    layer.fragments[i].position.y += layer.rotationSpeed.y * 0.5;
                                }
                            }
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
                            }
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y = world.targetRotationX;
                                layer.scene.rotation.x = world.targetRotationY;
                            }
                            if(rtt) {
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
                 * Import INIT LOADING ON PROGRESS MODEL collada(.dae)
                 **/
                var loadInitModel = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/loading.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
                        addLights(layer.scene);
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name === 'Cube') {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    //mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, 53);
                                    layer.spinner = mesh;
                                }
                            }
                        });
                        layer.rotationSpeed = new THREE.Vector3(0.001, 0.0015, 0.005);
                        /**
                         * Anaglyph effect
                         **/
                        layer.render = function(rtt) {
                            //layer.spinner.rotation.x += layer.rotationSpeed.z * 1.5;
                            layer.spinner.rotation.y += layer.rotationSpeed.z * 1.5;
                            //layer.spinner.rotation.z += layer.rotationSpeed.z;
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
                            }
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y = world.targetRotationX;
                                layer.scene.rotation.x = world.targetRotationY;
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
                 * Import MALE HEAD collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadMaleHeadModel = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/male07.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
                        addLights(layer.scene);
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name === 'makehuman_Body') {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = true;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    var shaderParams = {
                                        shininess: 2,
                                        normalScale: 0.5,
                                        diffuseTexture: '../src/textures/UVmaps/male07/Head_Colour.jpg',
                                        specTexture: '../src/textures/UVmaps/male07/Head_Colour_SPEC.png',
                                        AOTexture: '../src/textures/UVmaps/male07/Head_Colour_AO.png',
                                        normalTexture: '../src/textures/UVmaps/male07/normal20.jpg'
                                    }
                                    mesh.material = world.materials.shaderNormalMaterial(layer, shaderParams);
                                    layer.maleHead = mesh;
                                }
                            }
                        });
                        layer.rotationSpeed = new THREE.Vector3(0.001, 0.0015, 0.0002);
                        /**
                         * Anaglyph effect
                         **/
                        layer.render = function(rtt) {
                            layer.maleHead.rotation.z += layer.rotationSpeed.z * 1.5;
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
                            }
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y = world.targetRotationX;
                                layer.scene.rotation.x = world.targetRotationY;
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
                 * Import No Man Sky's collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadNMSModel = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/nms-logo.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
                        //layer.backgroundImage = addBackgroundImage(layer, '../src/textures/background/background' + world.renderParams.backgroundImage + '.jpg');
                        //addSkyDome(layer, 19, '../src/textures/background/background16.jpg');
                        addLights(layer.scene);
                        layer.sphericalCloud = addRandomSphericalCloud(layer.scene, 300, 7, '../src/textures/sprites/WhiteDot.svg', 0.08);
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name === 'Planet1') {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    var shaderParams = {
                                        shininess: 1,
                                        normalScale: 0.5,
                                        diffuseTexture: '../src/textures/nms/planet_Arnessk.png',
                                        specTexture: '../src/textures/nms/planet_Arnessk_SPEC.png',
                                        AOTexture: '../src/textures/nms/planet_Arnessk_AO.png',
                                        normalTexture: '../src/textures/nms/planet_Arnessk_NORM.png'
                                    }
                                    //mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap50.png', '../src/textures/nms/planet_Arnessk_NORM.png', 1);
                                    mesh.material = world.materials.shaderNormalMaterial(layer, shaderParams);
                                    layer.planet = mesh;
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'Clouds') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.transparentTextureMaterial('../src/textures/nms/clouds.png');
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.clouds = mesh;
                                } else if(child.name === 'Piramid_wireframe') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 10); //world.materials.shaderNormalMaterial(layer);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.piramidWireframe = mesh;
                                    layer.lowpoly3 = mesh;
                                } else if(child.name === 'Piramid') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 15); //world.materials.shaderNormalMaterial(layer);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.piramid = mesh;
                                    layer.lowpoly = mesh;
                                } else if(child.name === 'Inner_sphere') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 85); //world.materials.shaderNormalMaterial(layer);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.innerSphere = mesh;
                                    layer.lowpoly2 = mesh;
                                } else if(child.name === 'Landscape') {
                                    var mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap72.png', '../src/textures/nms/planet_Arnessk_NORM.png', 1);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.landscape = mesh;
                                }
                            }
                        });
                        layer.rotationSpeed = new THREE.Vector3(0.001, 0.0015, 0.0002);
                        /**
                         * Anaglyph effect
                         **/
                        layer.render = function(rtt) {
                            layer.planet.rotation.z += layer.rotationSpeed.z * 1.5;
                            //layer.clouds.rotation.x += layer.rotationSpeed.z;
                            //layer.clouds.rotation.y += layer.rotationSpeed.z;
                            layer.clouds.rotation.z += layer.rotationSpeed.z;
                            layer.piramid.rotation.z -= layer.rotationSpeed.z * 5;
                            layer.piramidWireframe.rotation.z -= layer.rotationSpeed.z * 5;
                            layer.innerSphere.rotation.z += layer.rotationSpeed.z * 15;
                            layer.sphericalCloud.rotation.z += layer.rotationSpeed.z / 2;
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
                            }
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y = world.targetRotationX;
                                layer.scene.rotation.x = world.targetRotationY;
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
                /*var importJSON = function(layer, filePathJSON) {
                    var loader = new THREE.JSONLoader();
                    loader.load(filePathJSON, function(geometry) {
                        geometry.verticesNeedUpdate = true;
                        geometry.normalsNeedUpdate = true;
                        geometry.uvsNeedUpdate = true;
                        //geometry.computeCentroids();
                        geometry.computeFaceNormals();
                        geometry.computeVertexNormals();
                        geometry.computeMorphNormals();
                        geometry.computeTangents();
                        var modifier = new THREE.SubdivisionModifier(1);
                        //modifier.modify(geometry);
                        var material = world.normalMaterial(layer, '../src/textures/matcaps/matcap14.png', '../src/textures/normalMaps/normal1.jpg', 1);
                        material.uniforms.repeat.value.set(1, 1);
                        var mesh = new THREE.Mesh(geometry, material);
                        layer.makehumanBody = mesh;
                        mesh.useQuaternion = true;
                        layer.scene.add(mesh);
                        //callback(geometry);
                    });
                };*/
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
                //this.scene.fog = new THREE.FogExp2(0x000000, 0.01);
                //start loader progress before importDAE is complete
                this.numberAssetsLoaded = 1;
                this.loadProgressCallback();
                if(this.name === 'initLoadingModel') {
                    loadInitModel(this);
                } else if(this.name === 'initMainModel') {
                    loadMainModel(this);
                } else if(this.name === 'GalleryModel1') {
                    loadNMSModel(this);
                } else if(this.name === 'GalleryModel2') {
                    loadMaleHeadModel(this);
                } else if(this.name === 'GalleryModel3') {
                    loadNMSModel(this);
                } else if(this.name === 'GalleryModel4') {
                    loadNMSModel(this);
                }
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
                for(var i = 0; i < 10; i++) {
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
                            value: world.transitionParams.textureThreshold
                        },
                        useTexture: {
                            type: 'i',
                            value: 1,
                        },
                        tMixTexture: {
                            type: 't',
                            value: this.textures[world.transitionParams.texture]
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
                    if(world.renderParams.enableAnaglyph) {
                        this.anaglyph = new THREE.AnaglyphEffect(world.renderer, world.width, world.height, world.renderParams.focus);
                    }
                    if(world.renderParams.enableGlitch) {
                        var glitchPass = new THREE.GlitchPass(world.renderParams.glitchType);
                        this.composer.addPass(glitchPass);
                    }
                    if(world.renderParams.enableFXAA) {
                        var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
                        effectFXAA.uniforms.resolution.value.set(1 / world.width, 1 / world.height);
                        this.composer.addPass(effectFXAA);
                    }
                    if(world.renderParams.enableRGBShift) {
                        var rgbShift = new THREE.ShaderPass(THREE.RGBShiftShader);
                        rgbShift.uniforms.amount.value = world.renderParams.rgbValue;
                        this.composer.addPass(rgbShift);
                    }
                    if(world.renderParams.enableFilm) {
                        var effectFilm = new THREE.FilmPass(world.renderParams.filmStrengh, 0, 0, false);
                        this.composer.addPass(effectFilm);
                    }
                    if(world.renderParams.enableFilmBW) {
                        var effectFilmBW = new THREE.FilmPass(world.renderParams.filmStrengh, 0.2, 1024, true);
                        this.composer.addPass(effectFilmBW);
                    }
                    if(world.renderParams.enableColorify) {
                        var effectColorify = new THREE.ShaderPass(THREE.ColorifyShader);
                        effectColorify.uniforms.color.value.setRGB(1, 0.8, 0.8);
                        this.composer.addPass(effectColorify);
                    }
                    if(world.renderParams.enableBloom) {
                        var effectBloom = new THREE.BloomPass(world.renderParams.bloomStrengh);
                        this.composer.addPass(effectBloom);
                    }
                    if(world.renderParams.enableDotFilter) {
                        var dotFilter = new THREE.DotScreenPass(new THREE.Vector2(0, 0), 0.5, 0.8);
                        this.composer.addPass(dotFilter);
                    }
                    if(world.renderParams.bleach) {
                        var effectBleach = new THREE.ShaderPass(THREE.BleachBypassShader);
                        effectBleach.uniforms.opacity.value = world.renderParams.bleachOpacity;
                        //effectBleach.uniforms["tDiffuse"].value = THREE.ImageUtils.loadTexture("../src/textures/UVmaps/male/cb_NRM.png");
                        this.composer.addPass(effectBleach);
                    }
                    if(world.renderParams.technicolor) {
                        var effectTechnicolor = new THREE.ShaderPass(THREE.Technicolor3Shader);
                        this.composer.addPass(effectTechnicolor);
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
                    if(world.renderParams.enableSepia) {
                        var effectSepia = new THREE.ShaderPass(THREE.SepiaShader);
                        this.composer.addPass(effectSepia);
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
                if(world.renderParams.enableAnaglyph) {
                    myPortfolio.World.CurrentLayer.anaglyph.setSize(world.width, world.height);
                } else {
                    world.transition.quadmaterial.uniforms.tDiffuse1.value = world.CurrentLayer.fbo;
                    world.renderer.setSize(world.width, world.height);
                    world.refreshPostProcessing();
                }
                /** fullscreen F11 event handlers */
                var maxHeight = window.screen.height,
                    maxWidth = window.screen.width,
                    curHeight = window.outerHeight,
                    curWidth = window.outerWidth;
                console.log('resized' + maxWidth + '==' + curWidth + '&&' + maxHeight + '==' + curHeight);
                if(maxWidth == curWidth && maxHeight == curHeight) {
                    console.log('fulscreen changed');
                    classie.toggleClass(settingsFullscreenOn, 'active');
                    classie.toggleClass(settingsFullscreenOff, 'active');
                } else {
                    classie.removeClass(settingsFullscreenOn, 'active');
                    classie.addClass(settingsFullscreenOff, 'active');
                }
            };
        },
        /**
         * Everything is instantiated, lets start de engine!!!
         **/
        start: function() {
            var world = this;
            this.init();
            this.transitionParams.clock.elapsedTime = 0;
            this.CurrentLayer = new this.Layer('initMainModel', 4, function() {
                var loadProgression = (this.numberAssetsLoaded / this.totalAssetsToLoad) * 100;
                document.getElementById('initProgressBar').style.width = loadProgression + '%';
                console.log(loadProgression + ":" + this.numberAssetsLoaded + '==' + this.totalAssetsToLoad);
                if(this.numberAssetsLoaded == this.totalAssetsToLoad) {
                    this.onLoadedCallback();
                }
                console.info(loadProgression);
            }, function() {
                console.log('MainModel Loaded!');
                var layer = myPortfolio.World.CurrentLayer;
                var initLoadingScreen = document.getElementById('initLoadingScreen');
                var initIntroScreen = document.getElementById('initIntroScreen');
                var modelInfo = document.getElementById('modelInfo');
                //hide init loading screen
                classie.toggleClass(initLoadingScreen, 'hide');
                setTimeout(function() {
                    //start background AUDIO
                    //myPortfolio.SoundFx.backgroundMusic.play(0);
                }, 500);
                // start init loading screen
                setTimeout(function() {
                    classie.addClass(initIntroScreen, 'show');
                    // rotate lowpoly when name is showing
                    /*setTimeout(function() {
                        var tweenScene90 = new TWEEN.Tween(layer.lowpoly.rotation).to({
                            x: layer.scene.rotation.x + 90 * Math.PI / 180,
                            y: layer.scene.rotation.y + 90 * Math.PI / 180,
                            z: layer.scene.rotation.z
                        }, 2000);
                        tweenScene90.easing(TWEEN.Easing.Quadratic.Out).start();
                    }, 1500);*/
                }, 5000);
                //end init loading screen
                setTimeout(function() {
                    classie.removeClass(initIntroScreen, 'show');
                }, 10000);
                //show menu
                setTimeout(function() {
                    var menu = document.getElementById('menu');
                    classie.removeClass(menu, 'hide');
                    classie.addClass(modelInfo, 'show');
                    //destroy loading screen to prevent opacity animation 
                }, 13000);
            });
            this.NextLayer = new this.Layer('initLoadingModel', 1, function() {}, function() {
                console.log('Dummy Loaded!');
            });
            this.transition = new this.Transition(this.CurrentLayer, this.NextLayer);
            /**/
            var animate = function() {
                requestAnimationFrame(animate);
                render();
            };
            var render = function() {
                if( !! world.settings.statsEnabled) {
                    world.fpsStats.update(world.renderer);
                    //world.gpuStats.update(world.renderer);
                }
                // update the tweens from TWEEN library
                TWEEN.update();
                world.transition.render();
            };
            animate();
            // on window resize handler (100ms timeout to trigger)
            var refresh;
            window.onresize = function() {
                clearTimeout(refresh);
                refresh = setTimeout(function() {
                    world.onWindowResize();
                }, 100);
            };
        }
    };
    /**
     * UI Engine events handler
     **/
    this.UI = {
        /**
         * Open/close menu trigger handlers
         **/
        initMenu: function() {
            var UI = this;
            /**
             * Menu navigation anchors triggers handler
             **/
            var menu = document.getElementById('menu'),
                aboutAnchor = document.getElementById('aboutAnchor'),
                galleryAnchor = document.getElementById('galleryAnchor'),
                contactAnchor = document.getElementById('contactAnchor'),
                creditsAnchor = document.getElementById('creditsAnchor'),
                sectionAbout = document.getElementById('sectionAbout'),
                sectionGallery = document.getElementById('sectionGallery'),
                sectionContact = document.getElementById('sectionContact'),
                sectionCredits = document.getElementById('sectionCredits');
                
            var submenu1Anchor = document.getElementById('submenuAnchor1');
            var submenu2Anchor = document.getElementById('submenuAnchor2');
            var submenu3Anchor = document.getElementById('submenuAnchor3');
            var submenu4Anchor = document.getElementById('submenuAnchor4');
            var aboutSubmenu2 = document.getElementById('aboutSubmenu2');
            var aboutSubmenu3 = document.getElementById('aboutSubmenu3');
            var aboutSubmenu4 = document.getElementById('aboutSubmenu4');
            var creditsSubmenu1 = document.getElementById('creditsSubmenu1');
            var creditsSubmenu2 = document.getElementById('creditsSubmenu2');
            var creditsSubmenu3 = document.getElementById('creditsSubmenu3');
            var galleryContainer = document.getElementById('galleryContainer');
            var galleryLoader = document.getElementById('galleryLoader');
            var layer = myPortfolio.World.CurrentLayer;
            /* Scene tweens init buffers */
            /*model to left tween*/
            var tweenZoomIn = new TWEEN.Tween(layer.scene.position).to({
                x: layer.scene.position.x,
                y: layer.scene.position.y,
                z: layer.scene.position.z + 2.5
            }, 1000);
            var tweenZoomOut = new TWEEN.Tween(layer.scene.position).to({
                x: layer.scene.position.x,
                y: layer.scene.position.y,
                z: layer.scene.position.z - 2.5
            }, 1000);
            /*event listeners handlers*/
            /* handle the submenu BACK event*/

            function closeSubmenu() {
                //tweenZoomOut.easing(TWEEN.Easing.Exponential.Out).start();
                /*remove all event listeners*/
                submenu1Anchor.removeEventListener('click', closeSubmenu, false);
                submenu2Anchor.removeEventListener('click', closeSubmenu, false);
                submenu3Anchor.removeEventListener('click', closeSubmenu, false);
                submenu4Anchor.removeEventListener('click', closeSubmenu, false);
                // toggle section active state
                classie.removeClass(sectionAbout, 'show');
                classie.removeClass(sectionGallery, 'show');
                classie.removeClass(sectionContact, 'show');
                classie.removeClass(sectionCredits, 'show');
                classie.toggleClass(menu, 'toggle');
                /* close submenus active */
                classie.removeClass(aboutSubmenu2, 'show');
                classie.removeClass(aboutSubmenu3, 'show');
                classie.removeClass(aboutSubmenu4, 'show');
                classie.removeClass(creditsSubmenu1, 'show');
                classie.removeClass(creditsSubmenu2, 'show');
                classie.removeClass(creditsSubmenu3, 'show');
                /* gallery items hide*/
                var galleryItems = document.querySelectorAll('.gallery-item');
                [].forEach.call(galleryItems, function(currentItem) {
                    classie.addClass(currentItem, 'hide');
                });

                

                //hide gallery visibility
                classie.removeClass(galleryContainer, 'show');
            };
            /* menu navigation handler*/
            aboutAnchor.addEventListener('click', function() {
                //tweenZoomIn.easing(TWEEN.Easing.Exponential.Out).start();
                //rotate scene*/
                /*var tweenScene90 = new TWEEN.Tween(layer.lowpoly.rotation).to({
                    x: layer.lowpoly.rotation.x,
                    y: layer.lowpoly.rotation.y + 20 * Math.PI / 180,
                    z: layer.lowpoly.rotation.z
                }, 1000);
                tweenScene90.easing(TWEEN.Easing.Quadratic.Out).start();*/
                //add on close submenu event handler
                submenu1Anchor.addEventListener('click', closeSubmenu);
                classie.toggleClass(aboutSubmenu2, 'show');
                classie.toggleClass(aboutSubmenu3, 'show');
                classie.toggleClass(aboutSubmenu4, 'show');
                /** active item style **/
                submenu1Anchor.innerHTML = "back";
                classie.addClass(submenu1Anchor.parentNode, 'active');
                /** inactive items style, content and event handlers **/
                classie.removeClass(submenu2Anchor.parentNode, 'active');
                classie.removeClass(submenu3Anchor.parentNode, 'active');
                classie.removeClass(submenu4Anchor.parentNode, 'active');
                submenu2Anchor.innerHTML = '';
                submenu3Anchor.innerHTML = '';
                submenu4Anchor.innerHTML = '';
                /* section animation handler */
                classie.addClass(sectionAbout, 'show');
                classie.toggleClass(menu, 'toggle');
            });
            galleryAnchor.addEventListener('click', function() {
                //tweenZoomIn.easing(TWEEN.Easing.Exponential.Out).start();
                //show gallery
                classie.addClass(galleryContainer, 'show');
                //add on close submenu event handler
                submenu2Anchor.addEventListener('click', closeSubmenu);
                /** active item style **/
                submenu2Anchor.innerHTML = "back";
                classie.addClass(submenu2Anchor.parentNode, 'active');
                /** inactive items style and content **/
                classie.removeClass(submenu1Anchor.parentNode, 'active');
                classie.removeClass(submenu3Anchor.parentNode, 'active');
                classie.removeClass(submenu4Anchor.parentNode, 'active');
                submenu1Anchor.innerHTML = 'Model<span style="color:red">#01 </span>';
                submenu3Anchor.innerHTML = 'Model<span style="color:red">#03 </span>';
                submenu4Anchor.innerHTML = 'Model<span style="color:red">#04 </span>';
                /* section animation handler */
                classie.addClass(sectionGallery, 'show');
                /* gallery items show */
                var galleryItems = document.querySelectorAll('.gallery-item');
                [].forEach.call(galleryItems, function(currentItem) {
                    classie.toggleClass(currentItem, 'hide');
                });
                /* menu toggle*/
                classie.toggleClass(menu, 'toggle');
            });
            contactAnchor.addEventListener('click', function() {
                //tweenZoomIn.easing(TWEEN.Easing.Exponential.Out).start();
                //add on close submenu event handler
                submenu3Anchor.addEventListener('click', closeSubmenu);
                //submenu anchors on click event handlers
                //submenu1Anchor.addEventListener('click', displayLocation);
                //submenu2Anchor.addEventListener('click', displaySocial);
                /** active item style **/
                submenu3Anchor.innerHTML = "back";
                classie.addClass(submenu3Anchor.parentNode, 'active');
                /** inactive items style and content **/
                classie.removeClass(submenu1Anchor.parentNode, 'active');
                classie.removeClass(submenu2Anchor.parentNode, 'active');
                classie.removeClass(submenu4Anchor.parentNode, 'active');
                submenu1Anchor.innerHTML = "";
                submenu2Anchor.innerHTML = "";
                submenu4Anchor.innerHTML = "";
                /* section animation handler */
                setTimeout(function() {
                    classie.addClass(sectionContact, 'show');
                }, 500);
                classie.toggleClass(menu, 'toggle');
            });
            creditsAnchor.addEventListener('click', function() {
                //tweenZoomIn.easing(TWEEN.Easing.Exponential.Out).start();
                submenu4Anchor.addEventListener('click', closeSubmenu);
                classie.toggleClass(creditsSubmenu1, 'show');
                classie.toggleClass(creditsSubmenu2, 'show');
                classie.toggleClass(creditsSubmenu3, 'show');
                /** active item style **/
                submenu4Anchor.innerHTML = "back";
                classie.addClass(submenu4Anchor.parentNode, 'active');
                /** inactive items style, content and event handlers **/
                classie.removeClass(submenu1Anchor.parentNode, 'active');
                classie.removeClass(submenu2Anchor.parentNode, 'active');
                classie.removeClass(submenu3Anchor.parentNode, 'active');
                submenu1Anchor.innerHTML = '';
                submenu2Anchor.innerHTML = '';
                submenu3Anchor.innerHTML = '';
                /* section animation handler */
                classie.addClass(sectionCredits, 'show');
                classie.toggleClass(menu, 'toggle');
            });
            /**** galley item click handler */
            var galleryItems = document.querySelectorAll('.gallery-item');
            [].forEach.call(galleryItems, function(currentItem) {
                currentItem.addEventListener('click', function() {
                    var selectedModel = currentItem.getAttribute('data-model');
                    var totalAssets = parseInt(currentItem.getAttribute('data-totalassets'));
                    //hide all items
                    [].forEach.call(galleryItems, function(currentItem) {
                        classie.toggleClass(currentItem, 'hide');
                    });
                    // show clicked one
                    classie.toggleClass(currentItem, 'hide');
                    classie.toggleClass(currentItem, 'show');
                    //show loading model progress
                    classie.removeClass(progressBar, 'reset');
                    classie.toggleClass(loadingScreen, 'show');
                    setTimeout(function() {
                        // create next model layer
                        myPortfolio.World.NextLayer = new myPortfolio.World.Layer('GalleryModel' + selectedModel, totalAssets, function() {
                            var loadProgression = (this.numberAssetsLoaded / this.totalAssetsToLoad) * 100;
                            document.getElementById('progressBar').style.width = loadProgression + '%';
                            console.log(this.numberAssetsLoaded + '==' + this.totalAssetsToLoad);
                            if(this.numberAssetsLoaded == this.totalAssetsToLoad) {
                                var layer = this;
                                setTimeout(function() {
                                    layer.onLoadedCallback();
                                    classie.toggleClass(loadingScreen, 'show');
                                    layer.loadReset();
                                }, 4500);
                            }
                            console.info(loadProgression);
                        }, function() {
                            console.log('newSceneLoaded');
                            myPortfolio.World.transitionParams.transitionMixRatio = 0;
                            myPortfolio.World.transition = new myPortfolio.World.Transition(myPortfolio.World.CurrentLayer, myPortfolio.World.NextLayer);
                            myPortfolio.World.CurrentLayer = myPortfolio.World.NextLayer;
                            var update = function() {
                                myPortfolio.World.transitionParams.transitionMixRatio = current.x;
                            };
                            var current = {
                                x: 1
                            };
                            // remove previous tweens if needed:TODO use same instanciated tween
                            var tweenLayerTransition = new TWEEN.Tween(current).to({
                                x: 0
                            }, myPortfolio.World.transitionParams.transitionTime * 1000).onUpdate(update);
                            tweenLayerTransition.start();
                            /*myPortfolio.World.renderParams = {
                                antialias: true,
                                alpha: false,
                                showStats: true,
                                backgroundColor: [34, 34, 34],
                                backgroundImage: 20,
                                skydomeImage: 1,
                                fog: 0.001,
                                enableAnaglyph: false,
                                focus: 12,
                                enableTrackball: true,
                                enableMouseListener: false,
                                enableGrid: false,
                                glitchType: 0,
                                enableGlitch: false,
                                enableRGBShift: true,
                                rgbValue: 0.002,
                                enableFXAA: true,
                                enableBloom: false,
                                bloomStrengh: 0.3,
                                enableSepia: false,
                                enableColorify: false,
                                enableFilm: false,
                                enableFilmBW: false,
                                filmStrengh: 0.3,
                                enableDotFilter: false,
                                bleach: true,
                                bleachOpacity: 1,
                                technicolor: false,
                                enableTiltShift: true,
                                tiltBlur: 5.5,
                                enableVignette: true,
                                vignetteStrengh: 5,
                                disableEffects: false
                            };
                            setTimeout(function(){
                                myPortfolio.World.refreshPostProcessing();
                            },myPortfolio.World.transitionParams.transitionTime * 1000);*/
                            // show clicked one
                            //classie.toggleClass(currentItem, 'hide');
                            classie.toggleClass(currentItem, 'show');
                            //classie.toggleClass(galleryLoader, 'show');
                            closeSubmenu();
                        });
                    }, 1500);
                });
            });
        },
        /**
         * UI Settings event handlers
         **/
        initSettings: function() {
            var settings = document.getElementById('settings'),
                settingsAudioOn = document.getElementById('settingsAudioOn'),
                settingsAudioOff = document.getElementById('settingsAudioOff'),
                settingsFullscreenOn = document.getElementById('settingsFullscreenOn'),
                settingsFullscreenOff = document.getElementById('settingsFullscreenOff'),
                settingsStereoscopicOn = document.getElementById('settingsStereoscopicOn'),
                settingsStereoscopicOff = document.getElementById('settingsStereoscopicOff'),
                settingsQualityHigh = document.getElementById('settingsQualityHigh'),
                settingsQualityMedium = document.getElementById('settingsQualityMedium'),
                settingsQualityLow = document.getElementById('settingsQualityLow'),
                modelInfo = document.getElementById('modelInfo'),
                sectionSettings = document.getElementById('sectionSettings');

            function launchIntoFullscreen(element) {
                console.log('launchFullscreen');
                if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
                    if(element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if(element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if(element.webkitRequestFullscreen) {
                        element.webkitRequestFullscreen();
                    } else if(element.msRequestFullscreen) {
                        element.msRequestFullscreen();
                    }
                }
            }

            function exitFullscreen() {
                console.log('exitFullscreen');
                if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
                    if(document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if(document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if(document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if(document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            }
            /** settings event handlers */
            
            settings.addEventListener('click', function() {
                classie.toggleClass(sectionSettings, 'show');
                classie.toggleClass(modelInfo, 'open');
            });
            /* AUDIO */
            settingsAudioOn.addEventListener('click', function() {
                classie.toggleClass(settingsAudioOn, 'active');
                classie.toggleClass(settingsAudioOff, 'active');
                var fadeIn = new TWEEN.Tween(myPortfolio.SoundFx.backgroundMusic).to({
                    volume: 1
                }, 1000);
                fadeIn.easing(TWEEN.Easing.Quadratic.Out).start();
            });
            settingsAudioOff.addEventListener('click', function() {
                classie.toggleClass(settingsAudioOn, 'active');
                classie.toggleClass(settingsAudioOff, 'active');
                var fadeOut = new TWEEN.Tween(myPortfolio.SoundFx.backgroundMusic).to({
                    volume: 0
                }, 1000);
                fadeOut.easing(TWEEN.Easing.Quadratic.Out).start();
            });
            /* FULLSCREEN */
            settingsFullscreenOn.addEventListener('click', function() {
                // if already on do nothing
                if(!classie.hasClass(settingsFullscreenOn, 'active')) {
                    if(!document.fullscreenElement || !document.webkitFullscreenElement || !document.mozFullScreenElement || !document.msFullscreenElement) {
                        //fullscreen is disabled
                        launchIntoFullscreen(document.documentElement);
                    }
                }
            });
            settingsFullscreenOff.addEventListener('click', function() {
                // if already on do nothing
                if(!classie.hasClass(settingsFullscreenOff, 'active')) {
                    if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
                        //fullscreen is enabled
                        exitFullscreen();
                    }
                }
            });
            /* Anaglyph 3D */
            settingsStereoscopicOn.addEventListener('click', function() {
                classie.toggleClass(settingsStereoscopicOn, 'active');
                classie.toggleClass(settingsStereoscopicOff, 'active');
                myPortfolio.World.renderParams.enableAnaglyph = true;
                myPortfolio.World.refreshPostProcessing();
            });
            settingsStereoscopicOff.addEventListener('click', function() {
                classie.toggleClass(settingsStereoscopicOn, 'active');
                classie.toggleClass(settingsStereoscopicOff, 'active');
                myPortfolio.World.renderParams.enableAnaglyph = false;
                myPortfolio.World.refreshPostProcessing();
            });
            /* POSTPROCESSING QUALITY */
            settingsQualityHigh.addEventListener('click', function() {
                classie.toggleClass(settingsQualityHigh, 'active');
                classie.removeClass(settingsQualityMedium, 'active');
                classie.removeClass(settingsQualityLow, 'active');
                myPortfolio.World.renderParams.enableFXAA = true;
                myPortfolio.World.renderParams.enableTiltShift = true;
                myPortfolio.World.renderParams.enableRGBShift = false;
                myPortfolio.World.renderParams.enableVignette = true;
                myPortfolio.World.renderParams.bleach = true;
                myPortfolio.World.refreshPostProcessing();
            });
            settingsQualityMedium.addEventListener('click', function() {
                classie.removeClass(settingsQualityHigh, 'active');
                classie.toggleClass(settingsQualityMedium, 'active');
                classie.removeClass(settingsQualityLow, 'active');
                myPortfolio.World.renderParams.enableFXAA = false;
                myPortfolio.World.renderParams.enableTiltShift = false;
                myPortfolio.World.renderParams.enableRGBShift = false;
                myPortfolio.World.renderParams.enableVignette = true;
                myPortfolio.World.renderParams.bleach = true;
                myPortfolio.World.refreshPostProcessing();
            });
            settingsQualityLow.addEventListener('click', function() {
                classie.removeClass(settingsQualityHigh, 'active');
                classie.removeClass(settingsQualityMedium, 'active');
                classie.toggleClass(settingsQualityLow, 'active');
                myPortfolio.World.renderParams.enableFXAA = false;
                myPortfolio.World.renderParams.enableTiltShift = false;
                myPortfolio.World.renderParams.enableRGBShift = false;
                myPortfolio.World.renderParams.enableVignette = false;
                myPortfolio.World.renderParams.bleach = false;
                myPortfolio.World.refreshPostProcessing();
            });
        },
        initMap: function() {
            var myLatlng = new google.maps.LatLng(40.641214, -8.647156);
            var mapCanvas = document.getElementById('map-canvas');
            var mapOptions = {
                center: new google.maps.LatLng(40.641214, -8.647156),
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);
            map.set('styles', [{
                "featureType": "all",
                "elementType": "all",
                "stylers": [{
                    "saturation": -100
                }, {
                    "gamma": 0.5
                }]
            }, {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "administrative.country",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "administrative.country",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#e90303"
                }]
            }]);
            var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: iconBase + 'schools_maps.png'
            });
        },
        /**
         * Start UI events handler
         **/
        start: function() {
            this.initMenu();
            this.initSettings();
            //this.initMap();
            /*particlesJS('particlesjs', {
                particles: {
                    color: '#fff',
                    color_random: false,
                    shape: 'circle', // "circle", "edge" or "triangle"
                    opacity: {
                        opacity: 1,
                        anim: {
                            enable: false,
                            speed: 1.5,
                            opacity_min: 0,
                            sync: false
                        }
                    },
                    size: 2.5,
                    size_random: true,
                    nb: 100,
                    line_linked: {
                        enable_auto: true,
                        distance: 40,
                        color: '#fff',
                        opacity: 1,
                        width: 1,
                        condensed_mode: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 600
                        }
                    },
                    anim: {
                        enable: true,
                        speed: 1
                    }
                },
                interactivity: {
                    enable: false,
                    mouse: {
                        distance: 250
                    },
                    detect_on: 'canvas', // "canvas" or "window"
                    mode: 'grab', // "grab" of false
                    line_linked: {
                        opacity: .5
                    },
                    events: {
                        onclick: {
                            enable: true,
                            mode: 'push', // "push" or "remove"
                            nb: 4
                        },
                        onresize: {
                            enable: true,
                            mode: 'out', // "out" or "bounce"
                            density_auto: false,
                            density_area: 800 // nb_particles = particles.nb * (canvas width *  canvas height / 1000) / density_area
                        }
                    }
                },
                retina_detect: true
            });*/
        }
    },
    /**
     * WEB AUDIO API
     **/
    this.SoundFx = {
        backgroundAudioFile: '../src/audio/backgroundLoop.mp3',
        menuOpenAudioFile: '../src/audio/IAO.mp3',
        init: function() {
            this.backgroundMusic = new Audio();
            this.backgroundMusic.addEventListener('loadeddata', function() {
                myPortfolio.World.CurrentLayer.numberAssetsLoaded++;
                myPortfolio.World.CurrentLayer.loadProgressCallback();
            }, false);
            this.backgroundMusic.addEventListener('error', function() {
                console.error('error loading audio');
            }, false);
            this.backgroundMusic.src = this.backgroundAudioFile;
            this.backgroundMusic.loop = true;
        }
    }
};
/**
 * Page Init
 **/
ENGINE.prototype.init = function() {
    this.system.init();
    this.SoundFx.init();
    this.World.start();
    this.UI.start();
    console.log('Page init completed');
};
/**
 * On Ready Init Page Prototype TODO
 **/
var myPortfolio = new ENGINE();
myPortfolio.init();