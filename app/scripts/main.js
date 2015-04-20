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
/*
 * Declare Namespace
 */
var ENGINE = ENGINE || {
    author: 'Bruno Quintela',
    description: 'Portfolio',
    date: '2014'
};
ENGINE = function(renderType) {
    this.system = {
        renderType: renderType,
        isTouch: Modernizr.touch,
        supportsWEBGL: Detector.webgl,
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
                        12
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
        },
        isBrowserDeprecated: function() {
            if(this.browser.name === 'Chrome' && parseInt(this.browser.version) < 40) {
                return true;
            } else if(this.browser.name === 'Firefox' && parseInt(this.browser.version) < 35) {
                return true;
            } else {
                return false;
            }
        },
        // use webgl conditions
        useWebGL: function() {
            if(this.renderType === '3D' && this.supportsWEBGL && !this.isBrowserDeprecated() && !this.isTouch) {
                return true;
            } else {
                return false;
            }
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
            guiEnabled: true
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
            enableTrackball: false,
            enableMouseListener: false,
            enableGrid: false,
            glitchType: 2,
            enableGlitch: false,
            enableRGBShift: false,
            rgbValue: 0.0005,
            enableFXAA: false,
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
            enableTiltShift: false,
            tiltBlur: 1.5,
            enableVignette: false,
            vignetteStrengh: 4,
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
            fillLightIntensity: 0.9,
            fillLightCastShadow: true,
            fillLightShadowIntensity: 0.1,
            keyLightEnable: true,
            keyLightIntensity: 2,
            keyLightCastShadow: true,
            keyLightShadowIntensity: 0.1,
            backLightEnable: true,
            backLightIntensity: 0.01,
            backLightCastShadow: true,
            backLightShadowIntensity: 0.1,
            shininess: 8,
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
            textureThreshold: 0.001,
            CurrentLayer: 'A',
            transitionTime: 1,
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
                guiRender.add(this.renderParams, 'enableMouseListener');
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
                //add setting stats FPS
                this.fpsStats = new Stats();
                this.fpsStats.setMode(0); // 0: fps, 1: ms
                this.fpsStats.domElement.style.float = 'right';
                this.fpsStats.domElement.style.clear = 'both';
                /*this.fpsStats.domElement.style.top = '20px';*/
                this.fpsStats.domElement.style.width = '150px';
                document.getElementById('statsContainer').appendChild(this.fpsStats.domElement);
                document.getElementById('fps').style.background = 'transparent';
                document.getElementById('fpsText').style.color = '#fff';
                document.getElementById('fpsText').style.fontWeight = '300';
                document.getElementById('fpsText').style.textAlign = 'right';
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
                    side: THREE.DoubleSide,
                    depthTest: true,
                    transparent: true
                });
                return material;
            };
            this.normalMaterial = function(layer, matcap, normalMap, useNormal, useRim) {
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
                            value: useRim
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
            this.bakedMaterial = function(layer, texturePath) {
                var material = new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture(texturePath, new THREE.UVMapping(), function() {
                        layer.numberAssetsLoaded++;
                        console.log(layer.numberAssetsLoaded);
                        layer.loadProgressCallback();
                    })
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
             * Mouse Events for model rotation
             **/
            this.targetRotation = 0;
            var targetRotationOnMouseDown = 0;
            var mouseX = 0;
            var mouseXOnMouseDown = 0;
            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;
            threejsCanvas.addEventListener('mousedown', onDocumentMouseDown, false);
            threejsCanvas.addEventListener('touchstart', onDocumentTouchStart, false);
            threejsCanvas.addEventListener('touchmove', onDocumentTouchMove, false);

            function onDocumentMouseDown(event) {
                world.renderParams.enableMouseListener = true;
                event.preventDefault();
                threejsCanvas.addEventListener('mousemove', onDocumentMouseMove, false);
                threejsCanvas.addEventListener('mouseup', onDocumentMouseUp, false);
                threejsCanvas.addEventListener('mouseout', onDocumentMouseOut, false);
                mouseXOnMouseDown = event.clientX - windowHalfX;
                targetRotationOnMouseDown = world.targetRotation;
            }

            function onDocumentMouseMove(event) {
                mouseX = event.clientX - windowHalfX;
                world.targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.001;
                console.log(world.targetRotation);
            }

            function onDocumentMouseUp(event) {
                threejsCanvas.removeEventListener('mousemove', onDocumentMouseMove, false);
                threejsCanvas.removeEventListener('mouseup', onDocumentMouseUp, false);
                threejsCanvas.removeEventListener('mouseout', onDocumentMouseOut, false);
                setTimeout(function() {
                    world.renderParams.enableMouseListener = false;
                }, 300);
                console.log('mouseOut');
                console.log('mouseUp');
            }

            function onDocumentMouseOut(event) {
                threejsCanvas.removeEventListener('mousemove', onDocumentMouseMove, false);
                threejsCanvas.removeEventListener('mouseup', onDocumentMouseUp, false);
                threejsCanvas.removeEventListener('mouseout', onDocumentMouseOut, false);
                setTimeout(function() {
                    world.renderParams.enableMouseListener = false;
                }, 300);
                console.log('mouseOut');
            }

            function onDocumentTouchStart(event) {
                if(event.touches.length === 1) {
                    event.preventDefault();
                    mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
                    targetRotationOnMouseDown = world.targetRotation;
                }
            }

            function onDocumentTouchMove(event) {
                if(event.touches.length === 1) {
                    event.preventDefault();
                    mouseX = event.touches[0].pageX - windowHalfX;
                    world.targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
                }
            }
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
                    var progressBar = document.getElementById('progressBar');
                    classie.addClass(progressBar, 'reset');
                    progressBar.style.width = '0%';
                    setTimeout(function() {
                        classie.removeClass(progressBar, 'reset');
                    }, 2000);
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
                        blending: THREE.AdditiveBlending,
                        depthTest: false,
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
                        keyLight.position.set(20, 10, 10);
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
                        //keyLight.intensity = world.lightsParams.keyLightIntensity;
                        scene.add(keyLight);
                    }
                    if(world.lightsParams.backLightEnable) {
                        var backLight = new THREE.DirectionalLight('white', world.lightsParams.backLightIntensity);
                        backLight.position.set(-20, -10, -10);
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
                        //scene.add(backLight);
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
                 * Import Empty MODEL collada(.dae) for transition to color
                 **/
                var loadEmptyModel = function(layer) {
                    layer.fragments = [];
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/empty.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
                        addLights(layer.scene);
                        collada.scene.traverse(function(child) {});
                        /**
                         * Anaglyph effect
                         **/
                        layer.render = function(rtt) {
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
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
                var settingsModel = function(layer) {
                    layer.fragments = [];
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/model01.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name.indexOf('make') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.wireframeMaterial(0xffffff, 1);
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'lowpoly') {
                                    var mesh = child.children[0];
                                    //mesh.geometry.computeTangents();
                                    mesh.material = world.materials.wireframeMaterial(0xffffff, 1);
                                    //world.normalMaterial('../src/textures/matcaps/matcap15.png', '../src/textures/normalMaps/normal11.jpg', 1);
                                    //layer.polyWire1 = addWireframe(layer.scene, mesh.geometry, 0xffffff, 1, 1);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly = mesh;
                                    //layer.polyWire = addWireframe(layer.scene, mesh.geometry, 0x000000, 1, 1);
                                    //layer.pointCloud = addPointCloud(layer.scene, mesh.geometry, '../src/textures/sprites/BlackDot.svg', 1.031, 1);
                                }
                            }
                        });
                        //init scene rotation
                        layer.rotationSpeed = new THREE.Vector3(0.001, 0.0015, 0.001);
                        layer.scene.rotation.y += 80 * Math.PI / 180;
                        layer.render = function(rtt) {
                            //layer.scene.rotation.y -= layer.rotationSpeed.z *0.5;
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
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
                 * Import init model collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadMainModel = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/model01.dae', function(collada) {
                        var dae = collada.scene;
                        layer.fragments = [];
                        layer.scene.add(dae);
                        addSkyDome(layer, 8, '../src/textures/background/background6.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name.indexOf('make') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap16.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1, false);
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'lowpoly') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 109);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly = mesh;
                                }
                            }
                        });
                        //init scene rotation
                        layer.scene.rotation.y += 80 * Math.PI / 180;
                        layer.rotationSpeed = 0.0005;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.render = function(rtt) {
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
                            }
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05)
                            } else {
                                layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
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
                 * Import model01 female body collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadFemaleModel = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/model02.dae', function(collada) {
                        var dae = collada.scene;
                        layer.fragments = [];
                        layer.scene.add(dae);
                        addSkyDome(layer, 10, '../src/textures/background/background11.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name.indexOf('makehuman_Body') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap36.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1, true);
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'makehuman_Hair') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 12);
                                    layer.makehumanHair = mesh;
                                } else if(child.name.indexOf('makehuman_HighPolyEyes') != -1) {
                                    var mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/eyeball8.png', '../src/textures/normalMaps/normal1.jpg', 0, true);
                                    layer.eyes = mesh;
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
                                }
                            }
                        });
                        //init scene rotation
                        layer.scene.rotation.y -= 35 * Math.PI / 180;
                        layer.rotationSpeed = 0.0005;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05)
                            } else {
                                layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
                            }
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
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
                 * Import MALE HEAD collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadMaleHeadModel = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/model04.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
                        /*add scene lights*/
                        var fillLight = new THREE.DirectionalLight('white', world.lightsParams.fillLightIntensity);
                        fillLight.position.set(0, 0, 20);
                        layer.scene.add(fillLight);
                        var keyLight = new THREE.DirectionalLight('white', world.lightsParams.keyLightIntensity/30);
                        keyLight.position.set(20, 10, 10);
                        layer.scene.add(keyLight);
                        /* add scene skydome */
                        addSkyDome(layer, 8, '../src/textures/background/background22.jpg');
                        //layer.backgroundImage = addBackgroundImage(layer, '../src/textures/background/background22.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name === 'head') {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = true;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    var shaderParams = {
                                        shininess: 5,
                                        normalScale: 0.8,
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
                        //init scene rotation
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.scene.rotation.y += 90 * Math.PI / 180;
                        layer.rotationSpeed = 0.0005;
                        /**
                         * Anaglyph effect
                         **/
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05)
                            } else {
                                layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
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
                 * Import lowpoly collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadLowpolyModel = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/model03.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
                        //addLights(layer.scene);
                        addSkyDome(layer, 7, '../src/textures/background/background11.jpg');
                        //layer.backgroundImage = addBackgroundImage(layer, '../src/textures/background/background22.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name === 'lowpoly') {
                                    var mesh = child.children[0];
                                    var modifier = new THREE.SubdivisionModifier(1);
                                    modifier.modify(mesh.geometry);
                                    mesh.material = world.materials.matcapMaterial(layer, 89);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly = mesh;
                                } else if(child.name === 'Ground') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.bakedMaterial(layer, '../src/textures/UVmaps/model03/plane-bake.png');
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.ground = mesh;
                                }
                            }
                        });
                        //init scene rotation
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.rotationSpeed = 0.0005;
                        /**
                         * Anaglyph effect
                         **/
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05)
                            } else {
                                layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
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
                 * Import Vase collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadJarModel = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/model05.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
                        addSkyDome(layer, 10, '../src/textures/background/background11.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name.indexOf('branch') !== -1) {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 111);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly = mesh;
                                }
                                if(child.name === 'lowpoly2') {
                                    var mesh = child.children[0];
                                    var modifier = new THREE.SubdivisionModifier(2);
                                    modifier.modify(mesh.geometry);
                                    mesh.material = world.materials.matcapMaterial(layer, 60);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly2 = mesh;
                                }
                                if(child.name.indexOf('Icosphere') !== -1) {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 3);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly3 = mesh;
                                } else if(child.name === 'terrain') {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = true;
                                    mesh.castShadow = true;
                                    mesh.geometry.computeTangents();
                                    var shaderParams = {
                                        shininess: 5,
                                        normalScale: 0.8,
                                        diffuseTexture: '../src/textures/UVmaps/model05/terrain-texture.jpg',
                                        specTexture: '../src/textures/UVmaps/model05/terrain-texture_SPEC.png',
                                        AOTexture: '../src/textures/UVmaps/model05/terrain-texture_AO.png',
                                        normalTexture: '../src/textures/UVmaps/model05/terrain-texture_NORM.png'
                                    }
                                    mesh.material = world.materials.matcapMaterial(layer, 67);
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'Ground') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.bakedMaterial(layer, '../src/textures/UVmaps/model05/plane-bake1.png');
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.ground = mesh;
                                }
                            }
                        });
                        //init scene rotation
                        layer.rotationFactor = document.getElementById('rotationBar');

                        layer.rotationSpeed = 0.0005;
                        /**
                         * Anaglyph effect
                         **/
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05)
                            } else {
                                layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
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
                 * Import No Man Sky's collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadNMSModel = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/model06.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
                        //addSkyDome(layer, 5.5, '../src/textures/UVmaps/model06/universe_skydome.png');
                        // add atmosphere
                        var atmosphereTexture1 = THREE.ImageUtils.loadTexture('../src/textures/UVmaps/model06/universe_skydome.png', new THREE.UVMapping(), function() {
                            layer.atmosphere1 = new THREE.Mesh(new THREE.SphereGeometry(5.5, 100, 100), new THREE.MeshBasicMaterial({
                                map: atmosphereTexture1,
                                blending: THREE.AdditiveAlphaBlending,
                                side: THREE.DoubleSide,
                                depthTest: true,
                                transparent: true
                            }));
                            layer.atmosphere1.scale.x = -1;
                            layer.scene.add(layer.atmosphere1);
                        });
                        layer.sphericalCloud = addRandomSphericalCloud(layer.scene, 2000, 4.5, '../src/textures/sprites/star_flare.png', 0.06);
                        layer.sphericalCloud2 = addRandomSphericalCloud(layer.scene, 2000, 6.5, '../src/textures/sprites/star_flare.png', 0.16);
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name === 'Planet1') {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = true;
                                    mesh.geometry.computeTangents();
                                    var shaderParams = {
                                        shininess: 0.5,
                                        normalScale: 0.4,
                                        diffuseTexture: '../src/textures/UVmaps/model06/planet_Arnessk.png',
                                        specTexture: '../src/textures/UVmaps/model06/planet_Arnessk_SPEC.png',
                                        AOTexture: '../src/textures/UVmaps/model06/planet_Arnessk_AO.png',
                                        normalTexture: '../src/textures/UVmaps/model06/planet_Arnessk_NORM.png'
                                    }
                                    //mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap50.png', '../src/textures/nms/planet_Arnessk_NORM.png', 1);
                                    mesh.material = world.materials.shaderNormalMaterial(layer, shaderParams);
                                    layer.planet = mesh;
                                }
                                if(child.name === 'planet2') {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = true;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap95.png', '../src/textures/normalMaps/normal5.jpg', 1, true);
                                    layer.planet2 = mesh;
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'Planet1_001') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.transparentTextureMaterial('../src/textures/UVmaps/model06/clouds.png');
                                    mesh.material.side = THREE.DoubleSide;
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.clouds = mesh;
                                }
                            }
                        });
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.rotationSpeed = new THREE.Vector3(0.001, 0.0015, 0.0002);
                        layer.scene.rotation.y += 230 * Math.PI / 180;
                        layer.scene.rotation.z += 70 * Math.PI / 180;
                        /**
                         * Anaglyph effect
                         **/
                        layer.render = function(rtt) {
                            layer.planet.rotation.x -= layer.rotationSpeed.z * 1.5;
                            layer.planet2.rotation.x -= layer.rotationSpeed.z * 4.5;
                            layer.atmosphere1.rotation.x += layer.rotationSpeed.z;
                            layer.scene.rotation.y -= layer.rotationSpeed.z * parseFloat(layer.rotationFactor.value);
                            layer.sphericalCloud.rotation.x -= layer.rotationSpeed.z / 2;
                            layer.sphericalCloud2.rotation.x -= layer.rotationSpeed.z / 3;
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
                 * Import Particles collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadParticlesModel = function(layer) {
                    // load collada assets
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/model11.dae', function(collada) {
                        var dae = collada.scene;
                        layer.fragments = [];
                        layer.scene.add(dae);
                        addSkyDome(layer, 10, '../src/textures/background/background11.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name.indexOf('makehuman_Body') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap22.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1, true);
                                    layer.makehumanBody = mesh;
                                } else if(child.name.indexOf('lowpoly') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.material = world.materials.matcapMaterial(layer, 93);
                                    layer.lowpoly = mesh;
                                } else if(child.name.indexOf('lowpoly2') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.material = world.materials.matcapMaterial(layer, 93);
                                    layer.lowpoly2 = mesh;
                                }else if(child.name.indexOf('makehuman_HighPolyEyes') != -1) {
                                    var mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/eyeball8.png', '../src/textures/normalMaps/normal1.jpg', 0, true);
                                    layer.eyes = mesh;
                                } 
                            }
                        });
                        //init scene rotation
                        layer.scene.rotation.y -= 90 * Math.PI / 180;
                        layer.rotationSpeed = 0.0005;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05)
                            } else {
                                layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
                            }
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
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
                var loadModel9 = function(layer) {
                    // load collada assets
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/model09.dae', function(collada) {
                        var dae = collada.scene;
                        layer.fragments = [];
                        layer.scene.add(dae);
                        addSkyDome(layer, 10, '../src/textures/background/background11.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name.indexOf('makehuman_Body') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap68.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1, true);
                                    layer.makehumanBody = mesh;
                                } else if(child.name.indexOf('lowpoly') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, 71);
                                    layer.lowpoly = mesh;
                                } else if(child.name.indexOf('lowpoly2') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, 105);
                                    layer.lowpoly2 = mesh;
                                }else if(child.name === 'makehuman_Hair') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 12);
                                    layer.makehumanHair = mesh;
                                } else if(child.name.indexOf('makehuman_HighPolyEyes') != -1) {
                                    var mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/eyeball8.png', '../src/textures/normalMaps/normal1.jpg', 0, true);
                                    layer.eyes = mesh;
                                } else if(child.name.indexOf('makehuman_Eyelashes') != -1) {
                                    var mesh = child.children[0];
                                    mesh.material = new THREE.MeshBasicMaterial({
                                        map: THREE.ImageUtils.loadTexture("../src/textures/UVmaps/male/eyelashesMale2.png"),
                                        blending: THREE.NormalBlending,
                                        depthTest: true,
                                        transparent: true
                                    });
                                    layer.makehumanEyelashes = mesh;
                                }
                            }
                        });
                        //init scene rotation
                        layer.scene.rotation.y -= 90 * Math.PI / 180;
                        layer.rotationSpeed = 0.0005;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05)
                            } else {
                                layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
                            }
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
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
                 * Import Particles collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadModel10 = function(layer) {
                    // load collada assets
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/model10.dae', function(collada) {
                        var dae = collada.scene;
                        layer.fragments = [];
                        layer.scene.add(dae);
                        addSkyDome(layer, 10, '../src/textures/background/background11.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                console.info(child.name);
                                if(child.name.indexOf('makehuman_Body') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap14.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1, true);
                                    layer.makehumanBody = mesh;
                                } else if(child.name.indexOf('lowpoly') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, 77);
                                    layer.lowpoly = mesh;
                                } else if(child.name.indexOf('lowpoly2') != -1) {
                                    var mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, 105);
                                    layer.lowpoly2 = mesh;
                                }else if(child.name === 'makehuman_Hair') {
                                    var mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 12);
                                    layer.makehumanHair = mesh;
                                } else if(child.name.indexOf('makehuman_HighPolyEyes') != -1) {
                                    var mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/eyeball8.png', '../src/textures/normalMaps/normal1.jpg', 0, true);
                                    layer.eyes = mesh;
                                } else if(child.name.indexOf('makehuman_Eyelashes') != -1) {
                                    var mesh = child.children[0];
                                    mesh.material = new THREE.MeshBasicMaterial({
                                        map: THREE.ImageUtils.loadTexture("../src/textures/UVmaps/male/eyelashesMale2.png"),
                                        blending: THREE.NormalBlending,
                                        depthTest: true,
                                        transparent: true
                                    });
                                    layer.makehumanEyelashes = mesh;
                                }
                            }
                        });
                        //init scene rotation
                        layer.scene.rotation.y -= 90 * Math.PI / 180;
                        layer.rotationSpeed = 0.0005;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05)
                            } else {
                                layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
                            }
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
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
                //TODO: switch (this.name)
                if(this.name === 'emptyModel') {
                    loadEmptyModel(this);
                } else if(this.name === 'settingsModel') {
                    settingsModel(this);
                } else if(this.name === 'initMainModel') {
                    loadMainModel(this);
                } else if(this.name === 'GalleryModel1') {
                    loadMainModel(this);
                } else if(this.name === 'GalleryModel2') {
                    loadFemaleModel(this);
                } else if(this.name === 'GalleryModel3') {
                    loadLowpolyModel(this);
                } else if(this.name === 'GalleryModel4') {
                    loadMaleHeadModel(this);
                } else if(this.name === 'GalleryModel5') {
                    loadJarModel(this);
                } else if(this.name === 'GalleryModel6') {
                    loadNMSModel(this);
                }
                else if(this.name === 'GalleryModel7') {
                    loadParticlesModel(this);
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
                    // Stop Render
                    else if(world.transitionParams.transitionMixRatio === -1) {
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
                    if(world.renderParams.enableRGBShift) {
                        var rgbShift = new THREE.ShaderPass(THREE.RGBShiftShader);
                        rgbShift.uniforms.amount.value = world.renderParams.rgbValue;
                        this.composer.addPass(rgbShift);
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
                //this.postprocess.apply(this.transition);
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
            this.CurrentLayer = new this.Layer('emptyModel', 1, function() {}, function() {
                console.log('empty Loaded!');
            });
            this.NextLayer = new myPortfolio.World.Layer('GalleryModel7', 3, function() {
                var loadProgression = (this.numberAssetsLoaded / this.totalAssetsToLoad) * 100;
                document.getElementById('initProgressBar').style.width = loadProgression + '%';
                console.log(loadProgression + ":" + this.numberAssetsLoaded + '==' + this.totalAssetsToLoad);
                if(this.numberAssetsLoaded == this.totalAssetsToLoad) {
                    this.onLoadedCallback();
                }
                console.info(loadProgression);
            }, function() {
                console.log('MainModel Loaded!');
                //landingPage.parentNode.removeChild(landingPage);
                var headerMenu = document.getElementById('headerMenu');
                var initLoadingScreen = document.getElementById('initLoadingScreen');
                var initIntroScreen = document.getElementById('initIntroScreen');
                var initIntroTitle = document.getElementById('initIntroTitle');
                var initIntroSubtitle = document.getElementById('initIntroSubtitle');
                var modelInfoSection = document.getElementById('modelInfoSection');
                //hide init loading screen
                setTimeout(function() {
                    classie.addClass(initLoadingScreen, 'hide');
                }, 2000);
                setTimeout(function() {
                    myPortfolio.World.transitionParams.transitionMixRatio = 0;
                    myPortfolio.World.transition = new myPortfolio.World.Transition(myPortfolio.World.NextLayer, myPortfolio.World.CurrentLayer);
                    myPortfolio.World.CurrentLayer = myPortfolio.World.NextLayer;
                    var update = function() {
                        myPortfolio.World.transitionParams.transitionMixRatio = current.x;
                    };
                    var current = {
                        x: 0
                    };
                    // remove previous tweens if needed:TODO use same instanciated tween
                    var tweenLayerTransition = new TWEEN.Tween(current).to({
                        x: 1
                    }, 4000).onUpdate(update);
                    tweenLayerTransition.start();
                    //myPortfolio.SoundFx.backgroundMusic.play(0);
                }, 2000);
                setTimeout(function() {
                    classie.addClass(initIntroSubtitle, 'show');
                }, 5000);
                setTimeout(function() {
                    classie.removeClass(initIntroSubtitle, 'show');
                    classie.addClass(initIntroTitle, 'show');
                }, 8000);
                setTimeout(function() {
                    classie.removeClass(initIntroTitle, 'show');
                }, 12000);
                //end init loading screen
                setTimeout(function() {
                    classie.addClass(initIntroScreen, 'hide');
                }, 1000);
                //show menu
                setTimeout(function() {
                    classie.removeClass(headerMenu, 'hide');
                    classie.removeClass(modelInfoSection, 'hide');
                    initLoadingScreen.parentNode.removeChild(initLoadingScreen);
                    initIntroScreen.parentNode.removeChild(initIntroScreen);
                }, 1000);
            });
            this.transition = new this.Transition(this.NextLayer, this.CurrentLayer);
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
        initUI: function() {
            var UI = this;
            /**
             * Menu navigation anchors triggers handler
             **/
            var menu = document.getElementById('menu'),
                homeAnchor = document.getElementById('homeAnchor'),
                aboutAnchor = document.getElementById('aboutAnchor'),
                galleryAnchor = document.getElementById('galleryAnchor'),
                contactAnchor = document.getElementById('contactAnchor'),
                creditsAnchor = document.getElementById('creditsAnchor'),
                settingsAnchor = document.getElementById('settingsAnchor'),
                aboutSection = document.getElementById('aboutSection'),
                contactSection = document.getElementById('contactSection'),
                creditsSection = document.getElementById('creditsSection'),
                settingsSection = document.getElementById('settingsSection'),
                gallerySection = document.getElementById('gallerySection');
            var modelInfoSection = document.getElementById('modelInfoSection');
            var galleryContainer = document.getElementById('galleryContainer');
            var galleryLoader = document.getElementById('galleryLoader');
            var menuItemActive = document.getElementById('menuItemActive');
            var settingsIcon = document.getElementById('settingsIcon');
            var layer = myPortfolio.World.CurrentLayer;
            this.webglCanvas = document.getElementById('threejsCanvas');
            //add video as background
            this.videoBackground = document.getElementById('videoBackground');
            //this.videoBackground.poster = '../src/img/galleryItem1.png';
            this.videoBackground.preload = true;
            this.videoBackground.loop = true;
            this.videoBackground.muted = true;
            /* menu navigation handler*/
            this.hideAllSections = function() {
                classie.addClass(aboutSection, 'hide');
                classie.addClass(contactSection, 'hide');
                classie.addClass(creditsSection, 'hide');
                classie.addClass(modelInfoSection, 'hide');
                classie.removeClass(gallerySection, 'show');
            }
            this.resetMenuItemActive = function() {
                classie.addClass(menuItemActive, 'pos1');
                classie.removeClass(menuItemActive, 'pos2');
                classie.removeClass(menuItemActive, 'pos3');
                classie.removeClass(menuItemActive, 'pos4');
                classie.removeClass(menuItemActive, 'pos5');
            }
            homeAnchor.addEventListener('click', function() {
                UI.hideAllSections();
                UI.resetMenuItemActive();
                classie.removeClass(settingsSection, 'show');
                classie.removeClass(modelInfoSection, 'hide');
            });
            aboutAnchor.addEventListener('click', function() {
                UI.hideAllSections();
                classie.toggleClass(aboutSection, 'hide');
                UI.resetMenuItemActive();
                classie.addClass(menuItemActive, 'pos2');
                classie.removeClass(settingsSection, 'show');
            });
            galleryAnchor.addEventListener('click', function() {
                UI.hideAllSections();
                classie.toggleClass(gallerySection, 'show');
                UI.resetMenuItemActive();
                classie.addClass(menuItemActive, 'pos3');
                classie.removeClass(settingsSection, 'show');
            });
            contactAnchor.addEventListener('click', function() {
                UI.hideAllSections();
                classie.toggleClass(contactSection, 'hide');
                UI.resetMenuItemActive();
                classie.addClass(menuItemActive, 'pos4');
                classie.removeClass(settingsSection, 'show');
            });
            creditsAnchor.addEventListener('click', function() {
                UI.hideAllSections();
                classie.toggleClass(creditsSection, 'hide');
                UI.resetMenuItemActive();
                classie.addClass(menuItemActive, 'pos5');
                classie.removeClass(settingsSection, 'show');
            });
            settingsAnchor.addEventListener('click', function() {
                classie.toggleClass(settingsSection, 'show');
                classie.toggleClass(settingsIcon, 'active');
            });
            /********* GALLERY *************/
            var galleryContainer = document.getElementById("galleryContainer");
            var galleryItems = document.querySelectorAll('.gallery-item');
            var galleryThumbs = document.querySelectorAll('.gallery-thumb');
            var gallery = new Dragend(galleryContainer, {
                pageClass: 'gallery-item',
                duration: 500,
                direction: 'horizontal',
                afterInitialize: function() {
                    galleryContainer.style.visibility = "visible";
                    console.log('galeery');
                },
                onDrag: function() {
                    console.log('onDrag');
                },
                onDragEnd: function() {
                    console.log('dragEnd');
                },
                onSwipeStart: function() {
                    var page = this.page;
                    var currentModelInfo = this.activeElement.getElementsByClassName('section-content')[0];
                    classie.addClass(currentModelInfo, 'hide');
                    console.log('onSwipeStart,page:' + page);
                },
                onSwipeEnd: function() {
                    var currentThumbIndex = parseInt(this.page);
                    var currentThumb = galleryThumbs[currentThumbIndex];
                    var currentModelInfo = this.activeElement.getElementsByClassName('section-content')[0];
                    classie.removeClass(currentModelInfo, 'hide');
                    [].forEach.call(galleryThumbs, function(thumbnail) {
                        classie.removeClass(thumbnail, 'active');
                    });
                    classie.addClass(currentThumb, 'active');
                    console.log('onSwipeEnd,currentThumbIndex:' + currentThumbIndex);
                }
            });
            [].forEach.call(galleryThumbs, function(currentThumb) {
                currentThumb.addEventListener('click', function() {
                    var selectedModel = parseInt(currentThumb.getAttribute('data-model')) - 1;
                    gallery._jumpToPage("page", selectedModel);
                    /* start gallery model-info show*/
                    var currentModelInfo = gallery.activeElement.getElementsByClassName('section-content')[0];
                    classie.removeClass(currentModelInfo, 'hide');
                    /* update current active thumnail */
                    [].forEach.call(galleryThumbs, function(thumbnail) {
                        classie.removeClass(thumbnail, 'active');
                    });
                    classie.addClass(currentThumb, 'active');
                });
            });
            /** 
             * Init Model load buttons
             */

            function loadWebgl(modelNumber, totalAssets) {
                //transition layer
                myPortfolio.World.transitionParams.transitionMixRatio = 1;
                var transitionTimeInterval = 1000;
                var modelLoadingScreen = document.getElementById('modelLoadingScreen');
                console.log('start3D');
                classie.addClass(modelLoadingScreen, 'show');
                myPortfolio.World.NextLayer = new myPortfolio.World.Layer('GalleryModel' + modelNumber, totalAssets, function() {
                    var loadProgression = (this.numberAssetsLoaded / this.totalAssetsToLoad) * 100;
                    document.getElementById('progressBar').style.width = loadProgression + '%';
                    console.log(this.numberAssetsLoaded + '==' + this.totalAssetsToLoad);
                    if(this.numberAssetsLoaded == this.totalAssetsToLoad) {
                        var layer = this;
                        setTimeout(function() {
                            classie.removeClass(modelLoadingScreen, 'show');
                            myPortfolio.UI.hideAllSections();
                            myPortfolio.UI.resetMenuItemActive();
                            layer.onLoadedCallback();
                        }, 2000);
                        setTimeout(function() {
                            layer.loadReset();
                        }, 4000);
                    }
                    console.info(loadProgression);
                }, function() {
                    console.log('newSceneLoaded');
                    classie.removeClass(myPortfolio.UI.webglCanvas, 'hide');
                    classie.removeClass(modelInfoSection, 'hide');
                    myPortfolio.World.transition = new myPortfolio.World.Transition(myPortfolio.World.CurrentLayer, myPortfolio.World.NextLayer);
                    myPortfolio.World.CurrentLayer = myPortfolio.World.NextLayer;
                    myPortfolio.World.transitionParams.transitionMixRatio = 0;
                });
            }

            function loadVideo(videoSrc) {
                myPortfolio.World.transitionParams.transitionMixRatio = -1;
                classie.addClass(myPortfolio.UI.webglCanvas, 'hide');
                myPortfolio.UI.hideAllSections();
                myPortfolio.UI.resetMenuItemActive();
                classie.removeClass(modelInfoSection, 'hide');
                myPortfolio.UI.videoBackground.src = videoSrc;
                myPortfolio.UI.videoBackground.play();
            }
            var webglLoadItems = document.querySelectorAll('.load-webgl');
            [].forEach.call(webglLoadItems, function(currentModel) {
                classie.removeClass(threejsCanvas, 'hide');
                console.log(currentModel.getAttribute('data-model'));
                currentModel.addEventListener('click', function(event) {
                    myPortfolio.UI.videoBackground.src = "";
                    var targetModel = parseInt(currentModel.getAttribute('data-model'));
                    var targetTotalAssets = parseInt(currentModel.getAttribute('data-assets'));
                    loadWebgl(targetModel, targetTotalAssets);
                    console.log('loadwebgl');
                });
            });
            var videoLoadItems = document.querySelectorAll('.load-video');
            [].forEach.call(videoLoadItems, function(currentModel) {
                currentModel.addEventListener('click', function(event) {
                    var targetVideo = currentModel.getAttribute('data-video');
                    loadVideo(targetVideo);
                    console.log('loadvideo');
                });
            });

            function zoomScene(val) {
                var layer = myPortfolio.World.CurrentLayer;
                var tweenSceneZoom = new TWEEN.Tween(layer.scene.position).to({
                    x: layer.scene.position.x,
                    y: layer.scene.position.y,
                    z: val
                }, 1000);
                tweenSceneZoom.easing(TWEEN.Easing.Quadratic.Out).start();
            }
            var zoomBar = document.getElementById("zoomBar");
            var rotationBar = document.getElementById("rotationBar");
            zoomBar.addEventListener('mouseup', function() {
                zoomScene(parseInt(this.value));
            });
            rotationBar.addEventListener('mouseup', function() {
                rotateScene(parseInt(this.value));
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
                siteInfo = document.getElementById('siteInfo'),
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
            if(myPortfolio.system.useWebGL()) {
                /* AUDIO */
                settingsAudioOn.addEventListener('click', function() {
                    if(!classie.hasClass(settingsAudioOn, 'active')) {
                        var fadeIn = new TWEEN.Tween(myPortfolio.SoundFx.backgroundMusic).to({
                            volume: 1
                        }, 300);
                        fadeIn.easing(TWEEN.Easing.Quadratic.Out).start();
                        classie.toggleClass(settingsAudioOn, 'active');
                        classie.toggleClass(settingsAudioOff, 'active');
                    }
                });
                settingsAudioOff.addEventListener('click', function() {
                    if(!classie.hasClass(settingsAudioOff, 'active')) {
                        var fadeIn = new TWEEN.Tween(myPortfolio.SoundFx.backgroundMusic).to({
                            volume: 0
                        }, 300);
                        fadeIn.easing(TWEEN.Easing.Quadratic.Out).start();
                        classie.toggleClass(settingsAudioOn, 'active');
                        classie.toggleClass(settingsAudioOff, 'active');
                    }
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
                    if(!classie.hasClass(settingsStereoscopicOn, 'active')) {
                        classie.toggleClass(settingsStereoscopicOn, 'active');
                        classie.toggleClass(settingsStereoscopicOff, 'active');
                        myPortfolio.World.renderParams.enableAnaglyph = true;
                        myPortfolio.World.refreshPostProcessing();
                    }
                });
                settingsStereoscopicOff.addEventListener('click', function() {
                    if(!classie.hasClass(settingsStereoscopicOff, 'active')) {
                        classie.toggleClass(settingsStereoscopicOn, 'active');
                        classie.toggleClass(settingsStereoscopicOff, 'active');
                        myPortfolio.World.renderParams.enableAnaglyph = false;
                        myPortfolio.World.refreshPostProcessing();
                    }
                });
                /* POSTPROCESSING QUALITY */
                settingsQualityHigh.addEventListener('click', function() {
                    if(!classie.hasClass(settingsQualityHigh, 'active')) {
                        classie.toggleClass(settingsQualityHigh, 'active');
                        classie.removeClass(settingsQualityMedium, 'active');
                        classie.removeClass(settingsQualityLow, 'active');
                        myPortfolio.World.renderParams.enableFXAA = true;
                        myPortfolio.World.renderParams.enableTiltShift = false;
                        myPortfolio.World.renderParams.enableRGBShift = true;
                        myPortfolio.World.renderParams.enableVignette = true;
                        myPortfolio.World.renderParams.bleach = true;
                        myPortfolio.World.renderParams.enableColorify = true;
                        myPortfolio.World.refreshPostProcessing();
                    }
                });
                settingsQualityMedium.addEventListener('click', function() {
                    if(!classie.hasClass(settingsQualityMedium, 'active')) {
                        classie.removeClass(settingsQualityHigh, 'active');
                        classie.toggleClass(settingsQualityMedium, 'active');
                        classie.removeClass(settingsQualityLow, 'active');
                        myPortfolio.World.renderParams.enableFXAA = false;
                        myPortfolio.World.renderParams.enableTiltShift = false;
                        myPortfolio.World.renderParams.enableRGBShift = false;
                        myPortfolio.World.renderParams.enableColorify = true;
                        myPortfolio.World.renderParams.enableVignette = false;
                        myPortfolio.World.renderParams.bleach = true;
                        myPortfolio.World.refreshPostProcessing();
                    }
                });
                settingsQualityLow.addEventListener('click', function() {
                    if(!classie.hasClass(settingsQualityLow, 'active')) {
                        classie.removeClass(settingsQualityHigh, 'active');
                        classie.removeClass(settingsQualityMedium, 'active');
                        classie.toggleClass(settingsQualityLow, 'active');
                        myPortfolio.World.renderParams.enableFXAA = false;
                        myPortfolio.World.renderParams.enableTiltShift = false;
                        myPortfolio.World.renderParams.enableRGBShift = false;
                        myPortfolio.World.renderParams.enableVignette = false;
                        myPortfolio.World.renderParams.enableColorify = false;
                        myPortfolio.World.renderParams.bleach = false;
                        myPortfolio.World.refreshPostProcessing();
                    }
                });
            }
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
            this.initUI();
            this.initSettings();
            //this.initMap();
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
    },
    this.init = function() {
        this.system.init();
        if(!this.system.useWebGL()) {
            // remove Threejs canvas
            var threejsCanvas = document.getElementById('threejsCanvas');
            if(threejsCanvas) {
                threejsCanvas.parentNode.removeChild(threejsCanvas);
            }
            var siteInfo = document.getElementById('siteInfo');
            var modelSettings = document.getElementById('modelSettings');
            if(modelSettings) {
                modelSettings.parentNode.removeChild(modelSettings);
            }
            var settings = document.getElementById('sectionSettings');
            if(settings) {
                settings.parentNode.removeChild(settings);
            }
            /// now, add sources:
            var sourceMP4 = document.createElement("source");
            sourceMP4.type = 'video/mp4';
            sourceMP4.src = 'http://player.vimeo.com/external/118310608.sd.mp4?s=16baa73f581d93200fbfc4ffb15c1f04';
            this.videoBackground.appendChild(sourceMP4);
            this.videoBackground.play();
            /********************/
            var menu = document.getElementById('menu');
            var initLoadingScreen = document.getElementById('initLoadingScreen');
            //var initIntroScreen = document.getElementById('initIntroScreen');
            //hide init loading screen
            //classie.addClass(initIntroScreen, 'show');
            classie.addClass(initLoadingScreen, 'hide');
            classie.addClass(landingPage, 'hide');
            classie.removeClass(menu, 'hide');
            initLoadingScreen.parentNode.removeChild(initLoadingScreen);
            setTimeout(function() {
                landingPage.parentNode.removeChild(landingPage);
            }, 1000);
        } else {
            this.SoundFx.init();
            this.World.start();
            this.UI.start();
        }
        console.log('Page init completed');
    }
};
/**/
var myPortfolio = myPortfolio || {};
/**
 * On Ready Init Page Prototype TODO
 **/
window.addEventListener("load", function() {
    myPortfolio = new ENGINE('3D');
    myPortfolio.init();
    console.log('Engine started.');
});
/*initPageButton.addEventListener('click', function() {
    if(renderType === 'webgl') {
        //transition layer
        myPortfolio.World.transitionParams.transitionMixRatio = 1;
        var transitionTimeInterval = 1000;
        classie.removeClass(initLoadingScreen, 'hide');
        //classie.addClass(landingPage, 'hide');
        console.log('start3D');
        myPortfolio.World.CurrentLayer = new myPortfolio.World.Layer('initMainModel', 3, function() {
            var loadProgression = (this.numberAssetsLoaded / this.totalAssetsToLoad) * 100;
            document.getElementById('initProgressBar').style.width = loadProgression + '%';
            console.log(loadProgression + ":" + this.numberAssetsLoaded + '==' + this.totalAssetsToLoad);
            if(this.numberAssetsLoaded == this.totalAssetsToLoad) {
                this.onLoadedCallback();
            }
            console.info(loadProgression);
        }, function() {
            console.log('MainModel Loaded!');
            //landingPage.parentNode.removeChild(landingPage);
            setTimeout(function() {
                initLoadingScreen.parentNode.removeChild(initLoadingScreen);
            }, 1000);
            var initIntroScreen = document.getElementById('initIntroScreen');
            var initIntroTitle = document.getElementById('initIntroTitle');
            var initIntroSubtitle = document.getElementById('initIntroSubtitle');
            var siteInfo = document.getElementById('siteInfo');
            classie.addClass(initLoadingScreen, 'hide');
            //hide init loading screen
            setTimeout(function() {
                myPortfolio.World.transitionParams.transitionMixRatio = 1;
                myPortfolio.World.transition = new myPortfolio.World.Transition(myPortfolio.World.CurrentLayer, myPortfolio.World.NextLayer);
                //myPortfolio.World.CurrentLayer = myPortfolio.World.NextLayer;
                var update = function() {
                    myPortfolio.World.transitionParams.transitionMixRatio = current.x;
                };
                var current = {
                    x: 0
                };
                // remove previous tweens if needed:TODO use same instanciated tween
                var tweenLayerTransition = new TWEEN.Tween(current).to({
                    x: 1
                }, 9000).onUpdate(update);
                tweenLayerTransition.start();
                myPortfolio.SoundFx.backgroundMusic.play(0);
            }, 1000);
            setTimeout(function() {
                classie.addClass(initIntroSubtitle, 'show');
            }, 5000);
            setTimeout(function() {
                classie.removeClass(initIntroSubtitle, 'show');
                classie.addClass(initIntroTitle, 'show');
            }, 8000);
            setTimeout(function() {
                classie.removeClass(initIntroTitle, 'show');
            }, 12000);
            //end init loading screen
            setTimeout(function() {
                classie.addClass(initIntroScreen, 'hide');
            }, 16000);
            //show menu
            setTimeout(function() {
                var menu = document.getElementById('menu');
                classie.removeClass(menu, 'hide');
                //classie.addClass(siteInfo, 'show');
            }, 17000);
        });
        console.log('InitRenderRealTime');
    } else {
        myPortfolio = new ENGINE('2D');
        myPortfolio.init();
        console.log('InitRenderVideo');
    }
});*/
/*renderRealTime.addEventListener('click', function() {
    renderType = 'webgl';
    classie.removeClass(renderInfo, 'show');
    classie.removeClass(renderRecorded, 'active');
    classie.addClass(renderRealTime, 'active');
    classie.removeClass(postprocessingWrapper, 'hide');
    classie.removeClass(anaglyph3DWrapper, 'hide');
    renderInfo.innerHTML = "Background will be real time rendered, this requires a computer with a good GPU to insure the,best user experience.";
    classie.addClass(renderInfo, 'show');
    console.log('renderRealTime');
});
renderRecorded.addEventListener('click', function() {
    renderType = 'video';
    classie.removeClass(renderInfo, 'show');
    classie.removeClass(renderRealTime, 'active');
    classie.addClass(renderRecorded, 'active');
    classie.addClass(postprocessingWrapper, 'hide');
    classie.addClass(anaglyph3DWrapper, 'hide');
    renderInfo.innerHTML = "Background animations are pre recorded webgl rendered videos, recomended for old computers or browsers.";
    classie.addClass(renderInfo, 'show');
    console.log('renderRecorded');
});*/
/*startWorld3D.addEventListener('click', function() {

    //transition layer
    myPortfolio.World.transitionParams.transitionMixRatio = 1;
    var transitionTimeInterval = 1000;
    var landingPage = document.getElementById('landingPage');
    var initLoadingScreen = document.getElementById('initLoadingScreen');
    classie.removeClass(initLoadingScreen, 'hide');
    console.log('start3D');
    setTimeout(function() {
        myPortfolio.World.CurrentLayer = new myPortfolio.World.Layer('initMainModel', 3, function() {
            var loadProgression = (this.numberAssetsLoaded / this.totalAssetsToLoad) * 100;
            document.getElementById('initProgressBar').style.width = loadProgression + '%';
            console.log(loadProgression + ":" + this.numberAssetsLoaded + '==' + this.totalAssetsToLoad);
            if(this.numberAssetsLoaded == this.totalAssetsToLoad) {
                this.onLoadedCallback();
            }
            console.info(loadProgression);
        }, function() {
            console.log('MainModel Loaded!');
            console.log('newSceneLoaded');
            var initIntroScreen = document.getElementById('initIntroScreen');
            var initIntroTitle = document.getElementById('initIntroTitle');
            var initIntroSubtitle = document.getElementById('initIntroSubtitle');
            var siteInfo = document.getElementById('siteInfo');
            classie.addClass(landingPage, 'hide');
            classie.addClass(initLoadingScreen, 'hide');
            //hide init loading screen
            setTimeout(function() {
                myPortfolio.World.transitionParams.transitionMixRatio = 1;
                myPortfolio.World.transition = new myPortfolio.World.Transition(myPortfolio.World.CurrentLayer, myPortfolio.World.NextLayer);
                myPortfolio.World.CurrentLayer = myPortfolio.World.NextLayer;
                var update = function() {
                    myPortfolio.World.transitionParams.transitionMixRatio = current.x;
                };
                var current = {
                    x: 0
                };
                // remove previous tweens if needed:TODO use same instanciated tween
                var tweenLayerTransition = new TWEEN.Tween(current).to({
                    x: 1
                }, 9000).onUpdate(update);
                tweenLayerTransition.start();
                myPortfolio.SoundFx.backgroundMusic.play(0);
            }, 2000);
            setTimeout(function() {
                classie.addClass(initIntroSubtitle, 'show');
            }, 5000);
            setTimeout(function() {
                classie.removeClass(initIntroSubtitle, 'show');
                classie.addClass(initIntroTitle, 'show');
            }, 8000);
            setTimeout(function() {
                classie.removeClass(initIntroTitle, 'show');
            }, 12000);
            //end init loading screen
            setTimeout(function() {
                classie.addClass(initIntroScreen, 'hide');
            }, 16000);
            //show menu
            setTimeout(function() {
                var menu = document.getElementById('menu');
                classie.removeClass(menu, 'hide');
                //classie.addClass(siteInfo, 'show');
            }, 17000);
        });
    }, 1000);
});
startWorld2D.addEventListener('click', function() {

    myPortfolio = new ENGINE('2D');
    myPortfolio.init();
    console.log('start2D');
});
startWorld3D.addEventListener('mouseover', function() {
    console.log('hover3D');
});
startWorld2D.addEventListener('mouseover', function() {
    console.log('hover2D');
});*/