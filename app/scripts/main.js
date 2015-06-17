'use strict';
// JSHint Global exceptions
/* jshint strict: true */
/*global Detector:false */
/*global THREE:false */
/*global Modernizr:false */
/*global Stats:false */
/*global dat:false */
/*global requestAnimationFrame:false */
/*global threejsCanvas:false */
/*global TWEEN:false */
/*global classie:false */
/*global Dragend:false */
/**
 * Declare Global Namespace
 **/
var myPortfolio = myPortfolio || {
    author: 'Bruno Quintela',
    description: 'Portfolio',
    revision: '21052015'
};
/**
 * Create the API to handle WEBGL & UI
 **/
var API = function() {
    this.System = {
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
            console.log(this.browser.name);
            console.log(this.supportsWEBGL);
            if(this.browser.name === 'Explorer') {
                return true;
            } else {
                return false;
            }
        },
        // use webgl conditions
        useWebGL: function() {
            if(this.supportsWEBGL && !this.isBrowserDeprecated() && !this.isTouch) {
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
            filmStrengh: 0.2,
            enableDotFilter: false,
            bleach: true,
            bleachOpacity: 1,
            technicolor: false,
            enableTiltShift: false,
            tiltBlur: 2.5,
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
            bodyNormal: 12,
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
            transitionMixRatio: 0,
            texture: 2,
            textureThreshold: 0.01,
            CurrentLayer: 'A',
            transitionTime: 1
        },
        /**
         * WEB AUDIO PARAMS
         **/
        audioParams: {
            playPause: function() {
                //sample.togglePlayback();
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
                    //myPortfolio.World.NextLayer.skydome.material.map = THREE.ImageUtils.loadTexture('../src/textures/background/background' + value + '.jpg');
                });
                guiRender.add(this.renderParams, 'fog', 0, 1, 0.001).onChange(function(value) {
                    myPortfolio.World.CurrentLayer.scene.fog = new THREE.FogExp2(0x000000, value);
                });
                guiRender.add(this.renderParams, 'enableTrackball');
                guiRender.add(this.renderParams, 'enableMouseListener');
                guiRender.add(this.renderParams, 'enableDotFilter').onChange(function(value) {
                    if(value) {
                        world.renderParams.enableDotFilter = true;
                    } else {
                        world.renderParams.enableDotFilter = false;
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
                guiRender.add(this.renderParams, 'bleachOpacity', 0, 1, 0.01).onChange(function() {
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
                    Perlin: 1,
                    Squares: 2,
                    Cells: 3,
                    Distort: 4,
                    Gradient: 5,
                    Radial: 6
                }).onChange(function(value) {
                    world.transition.setTexture(value);
                });
                guiTransition.add(this.transitionParams, 'textureThreshold', 0, 1, 0.01).onChange(function(value) {
                    world.transition.setTextureThreshold(value);
                });
                guiTransition.add(this.transitionParams, 'transitionMixRatio', 0, 1, 0.01).listen();
                guiTransition.add(this.transitionParams, 'transitionTime', 0, 11, 0.01);
                /*
                 * Motion Gui controler
                 **/
                var guiMotion = new dat.GUI();
                guiMotion.add(this.motionParams, 'reverseTime').onChange(function(value) {
                    world.motionParams.reverseFactor = !! value ? -1 : 1;
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
                document.getElementById('fpsText').style.fontFamily = 'Open Sans';
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
                            value: THREE.ImageUtils.loadTexture(normalMap, THREE.UVMapping, function() {
                                layer.numberAssetsLoaded++;
                                //console.log(layer.numberAssetsLoaded);
                                layer.loadProgressCallback();
                            })
                        },
                        tMatCap: {
                            type: 't',
                            value: THREE.ImageUtils.loadTexture(matcap, THREE.UVMapping, function() {
                                layer.numberAssetsLoaded++;
                                //console.log(layer.numberAssetsLoaded);
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
                            value: THREE.ImageUtils.loadTexture('../src/textures/matcaps/matcap' + matcap + '.png', THREE.UVMapping, function() {
                                layer.numberAssetsLoaded++;
                                //console.log(layer.numberAssetsLoaded);
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
                var shader = THREE.ShaderLib.normalmap;
                var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
                uniforms.enableAO.value = true;
                uniforms.enableDiffuse.value = true;
                uniforms.enableSpecular.value = true;
                uniforms.enableReflection.value = false;
                uniforms.enableDisplacement.value = false;
                uniforms.tDiffuse.value = THREE.ImageUtils.loadTexture(shaderParams.diffuseTexture, THREE.UVMapping, function() {
                    layer.numberAssetsLoaded++;
                    //console.log(layer.numberAssetsLoaded);
                    layer.loadProgressCallback();
                });
                uniforms.tSpecular.value = THREE.ImageUtils.loadTexture(shaderParams.specTexture, THREE.UVMapping, function() {
                    layer.numberAssetsLoaded++;
                    //console.log(layer.numberAssetsLoaded);
                    layer.loadProgressCallback();
                });
                uniforms.tAO.value = THREE.ImageUtils.loadTexture(shaderParams.AOTexture, THREE.UVMapping, function() {
                    layer.numberAssetsLoaded++;
                    //console.log(layer.numberAssetsLoaded);
                    layer.loadProgressCallback();
                });
                uniforms.tNormal.value = THREE.ImageUtils.loadTexture(shaderParams.normalTexture, THREE.UVMapping, function() {
                    layer.numberAssetsLoaded++;
                    //console.log(layer.numberAssetsLoaded);
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
                    map: THREE.ImageUtils.loadTexture(texturePath, THREE.UVMapping, function() {
                        layer.numberAssetsLoaded++;
                        //console.log(layer.numberAssetsLoaded);
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

            function onDocumentMouseDown(event) {
                world.renderParams.enableMouseListener = true;
                event.preventDefault();
                threejsCanvas.addEventListener('mousemove', onDocumentMouseMove, false);
                threejsCanvas.addEventListener('mouseup', onDocumentMouseUp, false);
                threejsCanvas.addEventListener('mouseout', onDocumentMouseOut, false);
                mouseXOnMouseDown = event.clientX - windowHalfX;
                targetRotationOnMouseDown = world.targetRotation + (mouseX - mouseXOnMouseDown) * 0.001;
            }

            function onDocumentMouseMove(event) {
                mouseX = event.clientX - windowHalfX;
                world.targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.001;
            }

            function onDocumentMouseUp() {
                threejsCanvas.removeEventListener('mousemove', onDocumentMouseMove, false);
                threejsCanvas.removeEventListener('mouseup', onDocumentMouseUp, false);
                threejsCanvas.removeEventListener('mouseout', onDocumentMouseOut, false);
                setTimeout(function() {
                    world.renderParams.enableMouseListener = false;
                }, 300);
            }

            function onDocumentMouseOut() {
                threejsCanvas.removeEventListener('mousemove', onDocumentMouseMove, false);
                threejsCanvas.removeEventListener('mouseup', onDocumentMouseUp, false);
                threejsCanvas.removeEventListener('mouseout', onDocumentMouseOut, false);
                setTimeout(function() {
                    world.renderParams.enableMouseListener = false;
                }, 300);
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
            threejsCanvas.addEventListener('mousedown', onDocumentMouseDown, false);
            threejsCanvas.addEventListener('touchstart', onDocumentTouchStart, false);
            threejsCanvas.addEventListener('touchmove', onDocumentTouchMove, false);
            /**
             * Scene
             **/
            this.Layer = function(name, totalAssetsToLoad, loadProgressCallback, onLoadedCallback) {
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
                };
                /**
                 * Add vertices sprites to scene
                 **/
                /*var addPointCloud = function(scene, geometry, spritePath, spriteSize, scaleFactor) {
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
                };*/
                /**
                 * Add SkyDome Sphere
                 **/
                var addSkyDome = function(layer, radius, texturePath) {
                    layer.skydome = new THREE.Mesh(new THREE.SphereGeometry(radius, 60, 40), new THREE.MeshBasicMaterial({
                        blending: THREE.NormalBlending,
                        depthTest: true,
                        transparent: true
                    }));
                    layer.skydome.material.map = THREE.ImageUtils.loadTexture(texturePath, THREE.UVMapping, function() {
                        layer.numberAssetsLoaded++;
                        //console.log(layer.numberAssetsLoaded);
                        layer.loadProgressCallback();
                    });
                    layer.skydome.scale.x = -1;
                    layer.scene.add(layer.skydome);
                };
                /*
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
                */
                /**
                 * Add CubeMap
                 **/
                /*var addCubeMap = function(layer, filePathUV) {
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
                };*/
                /**
                 * Add Scene Background Image
                 **/
                /*var addBackgroundImage = function(layer, imagePath) {
                    // Load the background texture
                    var texture = THREE.ImageUtils.loadTexture(imagePath, THREE.UVMapping, function() {
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
                };*/
                /**
                 * Import Empty MODEL collada(.dae) for transition to color
                 **/
                var loadScene0 = function(layer) {
                    layer.fragments = [];
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/scene0.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
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
                 * Import init model collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadScene1 = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/scene1.dae', function(collada) {
                        var dae = collada.scene;
                        layer.fragments = [];
                        layer.scene.add(dae);
                        addSkyDome(layer, 8, '../src/textures/background/background6.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                //console.info(child.name);
                                var mesh = null;
                                if(child.name.indexOf('makehuman_Body') !== -1) {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap16.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1, false);
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'lowpoly') {
                                    mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 109);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly = mesh;
                                }
                            }
                        });
                        //init scene rotation
                        myPortfolio.World.targetRotation = layer.scene.rotation.y += 70 * Math.PI / 180;
                        layer.scene.position.x += 1;
                        layer.rotationSpeed = 0.0005;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.render = function(rtt) {
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
                            }
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05);
                            } else {
                                myPortfolio.World.targetRotation = layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
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
                 * Import scene2 collada(.dae)
                 **/
                var loadScene2 = function(layer) {
                    // load collada assets
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/scene2.dae', function(collada) {
                        var dae = collada.scene;
                        layer.fragments = [];
                        layer.scene.add(dae);
                        addSkyDome(layer, 10, '../src/textures/background/background11.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                //console.info(child.name);
                                var mesh = null;
                                if(child.name.indexOf('makehuman_Body') !== -1) {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    //mesh.material = world.materials.matcapMaterial(layer, 93);
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap102.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1, true);
                                    layer.makehumanBody = mesh;
                                } else if(child.name.indexOf('lowpoly') !== -1) {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.material = world.materials.matcapMaterial(layer, 16);
                                    layer.lowpoly = mesh;
                                } else if(child.name.indexOf('makehuman_HighPolyEyes') !== -1) {
                                    mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/eyeball8.png', '../src/textures/normalMaps/normal1.jpg', 0, true);
                                    layer.eyes = mesh;
                                }
                            }
                        });
                        //init scene rotation
                        myPortfolio.World.targetRotation = layer.scene.rotation.y -= 20 * Math.PI / 180;
                        layer.rotationSpeed = 0.0005;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05);
                            } else {
                                myPortfolio.World.targetRotation = layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
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
                 * Import scene3 collada(.dae)
                 **/
                var loadScene3 = function(layer) {
                    // load collada assets
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/scene3.dae', function(collada) {
                        var dae = collada.scene;
                        layer.fragments = [];
                        layer.scene.add(dae);
                        addSkyDome(layer, 10, '../src/textures/background/background6.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                //console.info(child.name);
                                var mesh = null;
                                if(child.name.indexOf('makehuman_Body') !== -1) {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, 71);
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'lowpoly') {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, 71);
                                    layer.lowpoly = mesh;
                                } else if(child.name === 'lowpoly2') {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, 17);
                                    layer.lowpoly2 = mesh;
                                } else if(child.name.indexOf('makehuman_HighPolyEyes') !== -1) {
                                    mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/eyeball8.png', '../src/textures/normalMaps/normal1.jpg', 0, true);
                                    layer.eyes = mesh;
                                }
                            }
                        });
                        //init scene rotation
                        //myPortfolio.World.targetRotation = layer.scene.rotation.y = 0 * Math.PI / 180;
                        layer.rotationSpeed = 0.0005;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05);
                            } else {
                                myPortfolio.World.targetRotation = layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
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
                 * Import scene4 collada(.dae)
                 **/
                var loadScene4 = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/scene4.dae', function(collada) {
                        var dae = collada.scene;
                        layer.fragments = [];
                        layer.scene.add(dae);
                        addSkyDome(layer, 10, '../src/textures/background/background11.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                //console.info(child.name);
                                var mesh = null;
                                if(child.name.indexOf('makehuman_Body') !== -1) {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, 22);
                                    // mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap34.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1, true);
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'lowpoly') {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.material = world.materials.matcapMaterial(layer, 76);
                                    layer.lowpoly = mesh;
                                } else if(child.name === 'lowpoly2') {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.material = world.materials.matcapMaterial(layer, 76);
                                    layer.lowpoly = mesh;
                                } else if(child.name.indexOf('makehuman_HighPolyEyes') !== -1) {
                                    mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/eyeball8.png', '../src/textures/normalMaps/normal1.jpg', 0, true);
                                    layer.eyes = mesh;
                                } else if(child.name.indexOf('cell') !== -1) {
                                    mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 76);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.fragments.push(mesh);
                                }
                            }
                        });
                        //init scene rotation
                        myPortfolio.World.targetRotation = layer.scene.rotation.y -= 105 * Math.PI / 180;
                        layer.rotationSpeed = 0.0005;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05);
                            } else {
                                myPortfolio.World.targetRotation = layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
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
                 * Import scene5 collada(.dae)
                 **/
                var loadScene5 = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/scene5.dae', function(collada) {
                        var dae = collada.scene;
                        layer.fragments = [];
                        layer.scene.add(dae);
                        addSkyDome(layer, 10, '../src/textures/background/background11.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                //console.info(child.name);
                                var mesh = null;
                                if(child.name.indexOf('makehuman_Body') !== -1) {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap36.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1, true);
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'lowpoly') {
                                    mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 1);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly = mesh;
                                } else if(child.name === 'makehuman_Hair') {
                                    mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 12);
                                    layer.makehumanHair = mesh;
                                } else if(child.name.indexOf('makehuman_HighPolyEyes') !== -1) {
                                    mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/eyeball8.png', '../src/textures/normalMaps/normal1.jpg', 0, true);
                                    layer.eyes = mesh;
                                } else if(child.name.indexOf('makehuman_Eyebrow') !== -1) {
                                    mesh = child.children[0];
                                    mesh.material = new THREE.MeshBasicMaterial({
                                        map: THREE.ImageUtils.loadTexture('../src/textures/UVmaps/eyebrow.png'),
                                        blending: THREE.NormalBlending,
                                        depthTest: true,
                                        transparent: true
                                    });
                                    layer.makehumanEyebrows = mesh;
                                } else if(child.name.indexOf('makehuman_Eyelashes') !== -1) {
                                    mesh = child.children[0];
                                    mesh.material = new THREE.MeshBasicMaterial({
                                        map: THREE.ImageUtils.loadTexture('../src/textures/UVmaps/eyelashes.png'),
                                        blending: THREE.NormalBlending,
                                        depthTest: true,
                                        transparent: true
                                    });
                                    layer.makehumanEyelashes = mesh;
                                } else if(child.name.indexOf('cell') !== -1) {
                                    mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 1);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.fragments.push(mesh);
                                }
                            }
                        });
                        //init scene rotation
                        myPortfolio.World.targetRotation = layer.scene.rotation.y -= 0 * Math.PI / 180;
                        layer.rotationSpeed = 0.0005;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.render = function(rtt) {
                            for(var i = 0; i < layer.fragments.length; i++) {
                                //rotation
                                layer.fragments[i].rotation.x += layer.rotationSpeed * 2;
                                layer.fragments[i].rotation.y += layer.rotationSpeed * 2;
                                layer.fragments[i].rotation.z += layer.rotationSpeed * 2;
                                layer.fragments[i].position.y += 0.0003;
                            }
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05);
                            } else {
                                myPortfolio.World.targetRotation = layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
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
                 * Import Scene6 collada
                 **/
                var loadScene6 = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/scene6.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
                        addSkyDome(layer, 10, '../src/textures/background/background6.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                //console.info(child.name);
                                var mesh = null;
                                if(child.name.indexOf('makehuman_Body') !== -1) {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap36.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1, true);
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'lowpoly') {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    var modifier = new THREE.SubdivisionModifier(2);
                                    modifier.modify(mesh.geometry);
                                    //mesh.geometry.computeTangents();
                                    mesh.material = world.materials.matcapMaterial(layer, 60);
                                    layer.lowpoly = mesh;
                                } else if(child.name === 'lowpoly2') {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.material = world.materials.matcapMaterial(layer, 94);
                                    layer.lowpoly2 = mesh;
                                } else if(child.name === 'makehuman_HighPolyEyes') {
                                    mesh = child.children[0];
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/eyeball8.png', '../src/textures/normalMaps/normal1.jpg', 0, true);
                                    layer.eyes = mesh;
                                } else if(child.name === 'makehuman_Eyebrow') {
                                    mesh = child.children[0];
                                    mesh.material = new THREE.MeshBasicMaterial({
                                        map: THREE.ImageUtils.loadTexture('../src/textures/UVmaps/eyebrow.png'),
                                        blending: THREE.NormalBlending,
                                        depthTest: true,
                                        transparent: true
                                    });
                                    layer.makehumanEyebrows = mesh;
                                } else if(child.name === 'makehuman_Eyelashes') {
                                    mesh = child.children[0];
                                    mesh.material = new THREE.MeshBasicMaterial({
                                        map: THREE.ImageUtils.loadTexture('../src/textures/UVmaps/eyelashes.png'),
                                        blending: THREE.NormalBlending,
                                        depthTest: true,
                                        transparent: true
                                    });
                                    layer.makehumanEyelashes = mesh;
                                }
                            }
                        });
                        //init scene rotation
                        myPortfolio.World.targetRotation = layer.scene.rotation.y -= 70 * Math.PI / 180;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.rotationSpeed = 0.0005;
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05);
                            } else {
                                myPortfolio.World.targetRotation = layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
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
                 * Import scene7 collada(.dae)
                 **/
                var loadScene7 = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/scene7.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
                        /* add scene skydome */
                        addSkyDome(layer, 8, '../src/textures/background/background6.jpg');
                        //layer.backgroundImage = addBackgroundImage(layer, '../src/textures/background/background22.jpg');
                        var mesh = null;
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                //console.info(child.name);
                                if(child.name === 'head') {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap65.png', '../src/textures/normalMaps/normal19.jpg', 1, false);
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'lowpoly') {
                                    mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 58);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly = mesh;
                                }
                            }
                        });
                        //init scene rotation
                        myPortfolio.World.targetRotation = layer.scene.rotation.y += 80 * Math.PI / 180;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.rotationSpeed = 0.0005;
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05);
                            } else {
                                myPortfolio.World.targetRotation = layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
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
                 *  collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadScene8 = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/scene8.dae', function(collada) {
                        var dae = collada.scene;
                        layer.fragments = [];
                        layer.scene.add(dae);
                        addSkyDome(layer, 8, '../src/textures/background/background6.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                //console.info(child.name);
                                var mesh = null;
                                if(child.name.indexOf('makehuman') !== -1) {
                                    mesh = child.children[0];
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    mesh.geometry.computeTangents();
                                    mesh.material = world.materials.normalMaterial(layer, '../src/textures/matcaps/matcap87.png', '../src/textures/normalMaps/normal' + world.materialParams.bodyNormal + '.jpg', 1, false);
                                    layer.makehumanBody = mesh;
                                } else if(child.name === 'lowpoly') {
                                    mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 58);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly = mesh;
                                } else if(child.name === 'lowpoly2') {
                                    mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 58);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly2 = mesh;
                                } else if(child.name === 'lowpoly3') {
                                    mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 58);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly3 = mesh;
                                } else if(child.name.indexOf('cell') !== -1) {
                                    mesh = child.children[0];
                                    mesh.material = world.materials.matcapMaterial(layer, 76);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.fragments.push(mesh);
                                }
                            }
                        });
                        //init scene rotation
                        myPortfolio.World.targetRotation = layer.scene.rotation.y -= 30 * Math.PI / 180;
                        layer.scene.position.y += 0.6;
                        layer.scene.position.x -= 2;
                        layer.rotationSpeed = 0.0005;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.render = function(rtt) {
                            if(world.renderParams.enableTrackball) {
                                layer.trackball.update();
                            }
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05);
                            } else {
                                myPortfolio.World.targetRotation = layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
                            }
                            if(world.motionParams.animateFragments) {
                                for(var i = 0; i < layer.fragments.length; i++) {
                                    //rotation
                                    layer.fragments[i].rotation.x += layer.rotationSpeed.y * 2;
                                    layer.fragments[i].rotation.y += layer.rotationSpeed.y * 2;
                                    layer.fragments[i].rotation.z += layer.rotationSpeed.y * 2;
                                    //position
                                    //layer.fragments[i].position.x += layer.rotationSpeed.y * 0.5;
                                }
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
                 * Import lowpoly collada(.dae) object and corresponding UVmap into scene
                 **/
                var loadScene9 = function(layer) {
                    // load collada assets
                    var loader = new THREE.ColladaLoader();
                    loader.options.convertUpAxis = false;
                    loader.load('../src/collada/scene9.dae', function(collada) {
                        var dae = collada.scene;
                        layer.scene.add(dae);
                        //addLights(layer.scene);
                        addSkyDome(layer, 7, '../src/textures/background/background11.jpg');
                        //layer.backgroundImage = addBackgroundImage(layer, '../src/textures/background/background22.jpg');
                        collada.scene.traverse(function(child) {
                            if(child instanceof THREE.Object3D) {
                                //console.info(child.name);
                                var mesh = null;
                                if(child.name === 'lowpoly') {
                                    mesh = child.children[0];
                                    var modifier = new THREE.SubdivisionModifier(1);
                                    modifier.modify(mesh.geometry);
                                    mesh.material = world.materials.matcapMaterial(layer, 89);
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.lowpoly = mesh;
                                } else if(child.name === 'Ground') {
                                    mesh = child.children[0];
                                    mesh.material = world.materials.bakedMaterial(layer, '../src/textures/UVmaps/plane-bake.png');
                                    mesh.receiveShadow = false;
                                    mesh.castShadow = false;
                                    layer.ground = mesh;
                                }
                            }
                        });
                        //init scene rotation
                        layer.scene.position.y -= 0.1;
                        myPortfolio.World.targetRotation = layer.scene.rotation.y -= 120 * Math.PI / 180;
                        layer.rotationFactor = document.getElementById('rotationBar');
                        layer.rotationSpeed = 0.0005;
                        layer.render = function(rtt) {
                            if(world.renderParams.enableMouseListener) {
                                layer.scene.rotation.y += ((world.targetRotation - layer.scene.rotation.y) * 0.05);
                            } else {
                                myPortfolio.World.targetRotation = layer.scene.rotation.y += layer.rotationSpeed * parseFloat(layer.rotationFactor.value);
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
                //this.scene.fog = new THREE.FogExp2(0x000000, 0.04);
                //start loader progress before importDAE is complete
                this.numberAssetsLoaded = 1;
                this.loadProgressCallback();
                /**
                 * Load the this.name Scene
                 **/
                switch(this.name) {
                    case 'scene0':
                        loadScene0(this);
                        break;
                    case 'scene1':
                        loadScene1(this);
                        break;
                    case 'scene2':
                        loadScene2(this);
                        break;
                    case 'scene3':
                        loadScene3(this);
                        break;
                    case 'scene4':
                        loadScene4(this);
                        break;
                    case 'scene5':
                        loadScene5(this);
                        break;
                    case 'scene6':
                        loadScene6(this);
                        break;
                    case 'scene7':
                        loadScene7(this);
                        break;
                    case 'scene8':
                        loadScene8(this);
                        break;
                    case 'scene9':
                        loadScene9(this);
                        break;
                    default:
                        console.error('ERROR: unknow scene.');
                        break;
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
                this.texture = new THREE.ImageUtils.loadTexture('../src/textures/transitions/transition' + world.transitionParams.texture + '.png', THREE.UVMapping);
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
                            value: this.texture
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
                this.setTexture = function() {
                    this.quadmaterial.uniforms.tMixTexture.value = this.texture;
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
                        CurrentLayer.render(false);
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
                    if(world.renderParams.enableFXAA) {
                        var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
                        effectFXAA.uniforms.resolution.value.set(1 / world.width, 1 / world.height);
                        this.composer.addPass(effectFXAA);
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
                //console.log('postprocessing refreshed');
                this.postprocess.apply(this.CurrentLayer);
                //this.postprocess.apply(this.transition);
            };
            /**
             * On window resize world handler event
             **/
            this.onWindowResize = function() {
                var settingsFullscreenOn = document.getElementById('settingsFullscreenOn');
                var settingsFullscreenOff = document.getElementById('settingsFullscreenOff');
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
                //console.log('resized' + maxWidth + '==' + curWidth + '&&' + maxHeight + '==' + curHeight);
                if(maxWidth === curWidth && maxHeight === curHeight) {
                    //console.log('fulscreen changed');
                    classie.toggleClass(settingsFullscreenOn, 'active');
                    classie.toggleClass(settingsFullscreenOff, 'active');
                } else {
                    classie.removeClass(settingsFullscreenOn, 'active');
                    classie.addClass(settingsFullscreenOff, 'active');
                }
            };
        },
        /**
         * Everything is instantiated, lets start de API!!!
         **/
        start: function() {
            var world = this;
            this.init();
            this.transitionParams.clock.elapsedTime = 0;
            this.CurrentLayer = new this.Layer('scene0', 1, function() {}, function() {});
            this.NextLayer = new myPortfolio.World.Layer('scene1', 4, function() {
                var loadProgression = (this.numberAssetsLoaded / this.totalAssetsToLoad) * 100;
                document.getElementById('initProgressBar').style.width = loadProgression + '%';
                //console.log(loadProgression + ':' + this.numberAssetsLoaded + '==' + this.totalAssetsToLoad);
                if(this.numberAssetsLoaded === this.totalAssetsToLoad) {
                    this.onLoadedCallback();
                }
                //console.info(loadProgression);
            }, function() {
                var menu = document.getElementById('menu');
                var burguerMenu = document.getElementById('burguerMenu');
                var initLoadingScreen = document.getElementById('initLoadingScreen');
                var initIntroScreen = document.getElementById('initIntroScreen');
                var initIntroTitle = document.getElementById('initIntroTitle');
                var initIntroSubtitle = document.getElementById('initIntroSubtitle');
                var footerInfoSection = document.getElementById('footerInfoSection');
                //hide init loading screen
                setTimeout(function() {
                    classie.addClass(initLoadingScreen, 'hide');
                }, 2000);
                setTimeout(function() {
                    myPortfolio.World.transitionParams.transitionMixRatio = 1;
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
                    }, 14000).onUpdate(update);
                    tweenLayerTransition.start();
                    myPortfolio.SoundFx.backgroundMusic.play(0);
                }, 2000);
                setTimeout(function() {
                    initLoadingScreen.parentNode.removeChild(initLoadingScreen);
                    classie.addClass(initIntroSubtitle, 'show');
                }, 3500);
                setTimeout(function() {
                    classie.removeClass(initIntroSubtitle, 'show');
                }, 6000);
                setTimeout(function() {
                    classie.addClass(initIntroTitle, 'show');
                }, 9000);
                setTimeout(function() {
                    classie.removeClass(initIntroTitle, 'show');
                }, 13000);
                setTimeout(function() {
                    classie.removeClass(menu, 'hide');
                    classie.removeClass(burguerMenu, 'hide');
                    classie.removeClass(footerInfoSection, 'hide');
                }, 14500);
                //end init loading screen
                setTimeout(function() {
                    classie.addClass(initIntroScreen, 'hide');
                }, 15000);
                setTimeout(function() {
                    initIntroScreen.parentNode.removeChild(initIntroScreen);
                }, 16000);
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
     * UI API events handler
     **/
    this.UI = {
        /**
         * Open/close menu trigger handlers
         **/
        initUI: function() {
            this.selectedModel = 1;
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
            var footerInfoSection = document.getElementById('footerInfoSection');
            var menuItemActive = document.getElementById('menuItemActive');
            var settingsIcon = document.getElementById('settingsIcon');
            var modelLoadingScreen = document.getElementById('modelLoadingScreen');
            var progressBar = document.getElementById('progressBar');
            var videoBackground = document.getElementById('videoBackground');
            this.webglCanvas = document.getElementById('threejsCanvas');
            //add video as background
            if(myPortfolio.System.browser.name === 'Other') {
                document.getElementById('fullscreenSettings').style.display = 'none';
                document.getElementById('modelSettings').style.display = 'none';
            }
            /* menu navigation handler*/
            this.hideAllSections = function() {
                classie.addClass(aboutSection, 'hide');
                classie.addClass(contactSection, 'hide');
                classie.addClass(creditsSection, 'hide');
                //classie.addClass(footerInfoSection, 'hide');
                classie.removeClass(gallerySection, 'show');
                /*if( !! myPortfolio.World.renderParams.enableDotFilter) {
                    myPortfolio.World.renderParams.enableDotFilter = false;
                    myPortfolio.World.refreshPostProcessing();
                }*/
            };
            this.resetMenuItemActive = function() {
                classie.removeClass(homeAnchor, 'active');
                classie.removeClass(aboutAnchor, 'active');
                classie.removeClass(galleryAnchor, 'active');
                classie.removeClass(contactAnchor, 'active');
                classie.removeClass(creditsAnchor, 'active');
                classie.addClass(menuItemActive, 'pos1');
                classie.removeClass(menuItemActive, 'pos2');
                classie.removeClass(menuItemActive, 'pos3');
                classie.removeClass(menuItemActive, 'pos4');
                classie.removeClass(menuItemActive, 'pos5');
            };
            /* Burguer Menu events trigger*/
            homeAnchor.addEventListener('click', function() {
                UI.hideAllSections();
                UI.resetMenuItemActive();
                classie.addClass(homeAnchor, 'active');
                classie.removeClass(footerInfoSection, 'hide');
            });
            aboutAnchor.addEventListener('click', function() {
                if(!classie.hasClass(aboutSection, 'hide')) {
                    homeAnchor.click();
                } else {
                    UI.hideAllSections();
                    classie.toggleClass(aboutSection, 'hide');
                    UI.resetMenuItemActive();
                    classie.addClass(aboutAnchor, 'active');
                    classie.addClass(menuItemActive, 'pos2');
                    classie.removeClass(footerInfoSection, 'hide');
                }
            });
            galleryAnchor.addEventListener('click', function() {
                if(classie.hasClass(gallerySection, 'show')) {
                    homeAnchor.click();
                } else {
                    UI.hideAllSections();
                    classie.toggleClass(gallerySection, 'show');
                    UI.resetMenuItemActive();
                    classie.addClass(galleryAnchor, 'active');
                    classie.addClass(menuItemActive, 'pos3');
                    classie.removeClass(settingsSection, 'show');
                    classie.addClass(footerInfoSection, 'hide');
                }
            });
            contactAnchor.addEventListener('click', function() {
                if(!classie.hasClass(contactSection, 'hide')) {
                    homeAnchor.click();
                } else {
                    UI.hideAllSections();
                    classie.toggleClass(contactSection, 'hide');
                    UI.resetMenuItemActive();
                    classie.addClass(contactAnchor, 'active');
                    classie.addClass(menuItemActive, 'pos4');
                    classie.removeClass(footerInfoSection, 'hide');
                }
            });
            creditsAnchor.addEventListener('click', function() {
                if(!classie.hasClass(creditsSection, 'hide')) {
                    homeAnchor.click();
                } else {
                    UI.hideAllSections();
                    classie.toggleClass(creditsSection, 'hide');
                    UI.resetMenuItemActive();
                    classie.addClass(creditsAnchor, 'active');
                    classie.addClass(menuItemActive, 'pos5');
                    classie.removeClass(footerInfoSection, 'hide');
                }
            });
            settingsAnchor.addEventListener('click', function() {
                classie.toggleClass(settingsSection, 'show');
                classie.toggleClass(settingsIcon, 'active');
            });
            /* Burguer Menu events trigger*/
            var triggerBttn = document.getElementById('trigger-overlay'),
                aboutBurguerItem = document.getElementById('aboutBurguerItem'),
                galleryBurguerItem = document.getElementById('galleryBurguerItem'),
                contactBurguerItem = document.getElementById('contactBurguerItem'),
                creditsBurguerItem = document.getElementById('creditsBurguerItem'),
                burguerTitle = document.getElementById('burguerTitle'),
                overlay = document.querySelector('.burguer-overlay');

            function changeBurguerTile(newTitle) {
                classie.addClass(burguerTitle, 'hide');
                setTimeout(function() {
                    burguerTitle.innerHTML = newTitle;
                    classie.removeClass(burguerTitle, 'hide');
                }, 500);
            }

            function toggleMenuOverlay() {
                if(!classie.hasClass(triggerBttn, 'open')) {
                    UI.hideAllSections();
                    UI.resetMenuItemActive();
                    classie.addClass(footerInfoSection, 'hide');
                    changeBurguerTile('::menu');
                } else {
                    UI.hideAllSections();
                    classie.addClass(homeAnchor, 'active');
                    classie.removeClass(settingsSection, 'show');
                    classie.removeClass(footerInfoSection, 'hide');
                    changeBurguerTile('::home');
                }
                classie.toggleClass(overlay, 'open');
                classie.toggleClass(triggerBttn, 'open');
            }
            triggerBttn.addEventListener('click', toggleMenuOverlay);
            aboutBurguerItem.addEventListener('click', function() {
                toggleMenuOverlay();
                UI.hideAllSections();
                classie.toggleClass(aboutSection, 'hide');
                classie.addClass(aboutAnchor, 'active');
                classie.addClass(menuItemActive, 'pos2');
                classie.removeClass(settingsSection, 'show');
                classie.addClass(footerInfoSection, 'hide');
                changeBurguerTile('::about');
            });
            galleryBurguerItem.addEventListener('click', function() {
                toggleMenuOverlay();
                UI.hideAllSections();
                classie.addClass(footerInfoSection, 'hide');
                classie.toggleClass(gallerySection, 'show');
                classie.addClass(galleryAnchor, 'active');
                classie.addClass(menuItemActive, 'pos3');
                classie.removeClass(settingsSection, 'show');
                changeBurguerTile('::gallery');
            });
            contactBurguerItem.addEventListener('click', function() {
                toggleMenuOverlay();
                UI.hideAllSections();
                classie.toggleClass(contactSection, 'hide');
                classie.addClass(contactAnchor, 'active');
                classie.addClass(menuItemActive, 'pos4');
                classie.removeClass(settingsSection, 'show');
                classie.addClass(footerInfoSection, 'hide');
                changeBurguerTile('::contact');
            });
            creditsBurguerItem.addEventListener('click', function() {
                toggleMenuOverlay();
                UI.hideAllSections();
                classie.toggleClass(creditsSection, 'hide');
                classie.addClass(creditsAnchor, 'active');
                classie.addClass(menuItemActive, 'pos5');
                classie.removeClass(settingsSection, 'show');
                classie.addClass(footerInfoSection, 'hide');
                changeBurguerTile('::credits');
            });
            /********* GALLERY *************/
            var galleryContainer = document.getElementById('galleryContainer');
            var galleryThumbs = document.querySelectorAll('.gallery-thumb');
            var gallery = new Dragend(galleryContainer, {
                pageClass: 'gallery-item',
                duration: 500,
                direction: 'horizontal',
                afterInitialize: function() {
                    galleryContainer.style.visibility = 'visible';
                },
                onDrag: function() {},
                onDragEnd: function() {},
                onSwipeStart: function() {
                    var currentModelInfo = this.activeElement.getElementsByClassName('gallery-content')[0];
                    classie.addClass(currentModelInfo, 'hide');
                },
                onSwipeEnd: function() {
                    var currentThumbIndex = parseInt(this.page);
                    var currentThumb = galleryThumbs[currentThumbIndex];
                    var currentModelInfo = this.activeElement.getElementsByClassName('gallery-content')[0];
                    if(myPortfolio.System.isTouch) {
                        changeBurguerTile('::<span class="highlight">Frame</span>' + parseInt(currentThumbIndex + 1));
                    }
                    classie.removeClass(currentModelInfo, 'hide');
                    [].forEach.call(galleryThumbs, function(thumbnail) {
                        classie.removeClass(thumbnail, 'active');
                    });
                    classie.addClass(currentThumb, 'active');
                }
            });
            [].forEach.call(galleryThumbs, function(currentThumb) {
                currentThumb.addEventListener('click', function() {
                    var totalModelInfo = document.getElementsByClassName('gallery-content');
                    [].forEach.call(totalModelInfo, function(currentModelInfo) {
                        classie.addClass(currentModelInfo, 'hide');
                    });
                    var selectedModel = parseInt(currentThumb.getAttribute('data-model')) - 1;
                    //check if transition is to long to use scrollToPage
                    if(Math.abs(UI.selectedModel - selectedModel) > 3) {
                        gallery._jumpToPage('page', selectedModel);
                    } else {
                        gallery._scrollToPage('page', selectedModel);
                    }
                    UI.selectedModel = selectedModel;
                    var nextModelInfo = document.getElementsByClassName('gallery-content')[selectedModel];
                    classie.removeClass(nextModelInfo, 'hide');
                    //update current active thumnail
                    [].forEach.call(galleryThumbs, function(thumbnail) {
                        classie.removeClass(thumbnail, 'active');
                    });
                    classie.addClass(currentThumb, 'active');
                });
            });
            // chnage gallery frame with mouse wheel

            function MouseWheelHandler(e) {
                // cross-browser wheel delta
                e = window.event || e; // old IE support
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                var thumIndex = 0;
                var activeThumb = 0;
                [].forEach.call(galleryThumbs, function(currentThumb) {
                    if(classie.hasClass(currentThumb, 'active')) {
                        activeThumb = thumIndex;
                    }
                    thumIndex++;
                });
                if(delta > 0 && activeThumb > 0) {
                    galleryThumbs[activeThumb - 1].click();
                } else if(delta < 0 && activeThumb < (galleryThumbs.length - 1)) {
                    galleryThumbs[activeThumb + 1].click();
                }
            }
            if(galleryContainer.addEventListener) {
                // IE9, Chrome, Safari, Opera
                galleryContainer.addEventListener('mousewheel', MouseWheelHandler, false);
                // Firefox
                galleryContainer.addEventListener('DOMMouseScroll', MouseWheelHandler, false);
            }
            // IE 6/7/8
            else {
                galleryContainer.attachEvent('onmousewheel', MouseWheelHandler);
            }
            /** 
             * Init Model load buttons
             */
            var galleryImg = document.querySelectorAll('picture.model-background-img');

            function loadWebgl(modelNumber, totalAssets) {
                // if model is currently selected
                if(myPortfolio.World.CurrentLayer.name === 'scene' + modelNumber) {
                    classie.removeClass(myPortfolio.UI.webglCanvas, 'hide');
                    classie.removeClass(footerInfoSection, 'hide');
                    myPortfolio.UI.hideAllSections();
                    myPortfolio.UI.resetMenuItemActive();
                    myPortfolio.World.transitionParams.transitionMixRatio = 0;
                    return;
                }
                //console.log(myPortfolio.World.CurrentLayer.name);
                myPortfolio.World.transitionParams.transitionMixRatio = 1;
                classie.addClass(modelLoadingScreen, 'show');
                myPortfolio.World.CurrentLayer = new myPortfolio.World.Layer('scene0', 1, function() {}, function() {});
                myPortfolio.World.NextLayer = new myPortfolio.World.Layer('scene' + modelNumber, totalAssets, function() {
                    var loadProgression = (this.numberAssetsLoaded / this.totalAssetsToLoad) * 100;
                    progressBar.style.width = loadProgression + '%';
                    //console.log(this.numberAssetsLoaded + '==' + this.totalAssetsToLoad);
                    if(this.numberAssetsLoaded === this.totalAssetsToLoad) {
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
                }, function() {
                    classie.removeClass(myPortfolio.UI.webglCanvas, 'hide');
                    classie.removeClass(footerInfoSection, 'hide');
                    // get previous scene rotation to match during transition, only if From this form i hold series
                    //myPortfolio.World.NextLayer.scene.rotation.y = myPortfolio.World.CurrentLayer.scene.rotation.y;
                    myPortfolio.World.transition = new myPortfolio.World.Transition(myPortfolio.World.CurrentLayer, myPortfolio.World.NextLayer);
                    myPortfolio.World.transitionParams.transitionMixRatio = 0;
                    myPortfolio.World.CurrentLayer = myPortfolio.World.NextLayer;
                    /* hide background image for current selected*/
                    [].forEach.call(galleryImg, function(currentImg) {
                        classie.removeClass(currentImg, 'hide');
                    });
                    classie.addClass(galleryImg[modelNumber - 1], 'hide');
                    //myPortfolio.World.renderParams.enableDotFilter = false;
                    //myPortfolio.World.refreshPostProcessing();
                });
            }
            this.changeBackgroundVideo = function(modelNumber) {
                if(window.innerWidth < 500) {
                    if(Modernizr.video && Modernizr.video.h264) {
                        videoBackground.setAttribute('src', '../src/videos/scene' + modelNumber + 'xMobile.mp4');
                    } else if(Modernizr.video && Modernizr.video.webm) {
                        videoBackground.setAttribute('src', '../src/videos/scene' + modelNumber + 'xMobile.webm');
                    }
                } else {
                    if(Modernizr.video && Modernizr.video.h264) {
                        videoBackground.setAttribute('src', '../src/videos/scene' + modelNumber + 'xSD.mp4');
                    } else if(Modernizr.video && Modernizr.video.webm) {
                        videoBackground.setAttribute('src', '../src/videos/scene' + modelNumber + 'xSD.webm');
                    }
                }
                videoBackground.load();
                //video.play();
                //console.log('videoLoaded');
            };

            function loadVideo(modelNumber) {
                myPortfolio.World.transitionParams.transitionMixRatio = -1;
                //classie.addClass(myPortfolio.UI.webglCanvas, 'hide');
                if(myPortfolio.UI.videoBackground.modelNumber === modelNumber) {
                    myPortfolio.UI.hideAllSections();
                    myPortfolio.UI.resetMenuItemActive();
                    classie.removeClass(footerInfoSection, 'hide');
                    return;
                }
                classie.addClass(myPortfolio.UI.videoBackground, 'hide');
                myPortfolio.UI.videoBackground.modelNumber = modelNumber;
                myPortfolio.UI.changeBackgroundVideo(modelNumber);
                /* hide background image for current selected*/
                classie.addClass(modelLoadingScreen, 'show');
                progressBar.style.width = '100%';
                setTimeout(function() {
                    classie.removeClass(modelLoadingScreen, 'show');
                    myPortfolio.UI.hideAllSections();
                    myPortfolio.UI.resetMenuItemActive();
                    [].forEach.call(galleryImg, function(currentImg) {
                        classie.removeClass(currentImg, 'hide');
                    });
                    // load reset
                    classie.addClass(progressBar, 'reset');
                    progressBar.style.width = '0%';
                    setTimeout(function() {
                        classie.removeClass(progressBar, 'reset');
                        classie.removeClass(footerInfoSection, 'hide');
                        classie.removeClass(myPortfolio.UI.videoBackground, 'hide');
                        classie.addClass(galleryImg[modelNumber - 1], 'hide');
                    }, 1000);
                }, 3000);
            }
            var webglLoadItems = document.querySelectorAll('.load-webgl');
            [].forEach.call(webglLoadItems, function(currentModel) {
                classie.removeClass(threejsCanvas, 'hide');
                currentModel.addEventListener('click', function() {
                    var targetModel = parseInt(currentModel.getAttribute('data-model'));
                    var targetTotalAssets = parseInt(currentModel.getAttribute('data-assets'));
                    loadWebgl(targetModel, targetTotalAssets);
                });
            });
            var videoLoadItems = document.querySelectorAll('.load-video');
            [].forEach.call(videoLoadItems, function(currentModel) {
                currentModel.addEventListener('click', function() {
                    var targetModel = parseInt(currentModel.getAttribute('data-model'));
                    loadVideo(targetModel);
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
            var zoomBar = document.getElementById('zoomBar');
            zoomBar.addEventListener('mouseup', function() {
                zoomScene(parseInt(this.value));
            });
            /* event handler to hide UI when pressing key T (used to take webgl screenshots)*/

            function keyhandle(e) {
                e = e || event;
                if(e.keyCode === 84 || e.keyCode === 116) {
                    classie.toggleClass(menu, 'hide');
                    classie.toggleClass(footerInfoSection, 'hide');
                }
            }
            document.body.onkeypress = keyhandle;
        },
        /**
         * UI Settings event handlers
         **/
        initSettings: function() {
            var settingsAudioOn = document.getElementById('settingsAudioOn'),
                settingsAudioOff = document.getElementById('settingsAudioOff'),
                settingsFullscreenOn = document.getElementById('settingsFullscreenOn'),
                settingsFullscreenOff = document.getElementById('settingsFullscreenOff'),
                settingsStereoscopicOn = document.getElementById('settingsStereoscopicOn'),
                settingsStereoscopicOff = document.getElementById('settingsStereoscopicOff'),
                settingsQualityHigh = document.getElementById('settingsQualityHigh'),
                settingsQualityMedium = document.getElementById('settingsQualityMedium'),
                settingsQualityLow = document.getElementById('settingsQualityLow');

            function launchIntoFullscreen(element) {
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
            if(myPortfolio.System.useWebGL()) {
                /* AUDIO */
                settingsAudioOn.addEventListener('click', function() {
                    if(!classie.hasClass(settingsAudioOn, 'active')) {
                        myPortfolio.SoundFx.backgroundMusic.play();
                        var fadeIn = new TWEEN.Tween(myPortfolio.SoundFx.backgroundMusic).to({
                            volume: 1
                        }, 500);
                        fadeIn.easing(TWEEN.Easing.Quadratic.Out).start();
                        classie.toggleClass(settingsAudioOn, 'active');
                        classie.toggleClass(settingsAudioOff, 'active');
                    }
                });
                settingsAudioOff.addEventListener('click', function() {
                    if(!classie.hasClass(settingsAudioOff, 'active')) {
                        var fadeIn = new TWEEN.Tween(myPortfolio.SoundFx.backgroundMusic).to({
                            volume: 0
                        }, 500);
                        fadeIn.easing(TWEEN.Easing.Quadratic.Out).start();
                        setTimeout(function() {
                            myPortfolio.SoundFx.backgroundMusic.pause();
                        }, 600);
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
                        myPortfolio.World.renderParams.filmStrengh = 0.15;
                        myPortfolio.World.renderParams.enableFilm = false;
                        myPortfolio.World.renderParams.tiltBlur = 2.5;
                        myPortfolio.World.renderParams.enableTiltShift = true;
                        myPortfolio.World.renderParams.rgbValue = 0.0005;
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
                        myPortfolio.World.renderParams.enableFilm = false;
                        myPortfolio.World.renderParams.filmStrengh = 0.2;
                        myPortfolio.World.renderParams.enableTiltShift = false;
                        myPortfolio.World.renderParams.rgbValue = 0.0005;
                        myPortfolio.World.renderParams.enableRGBShift = false;
                        myPortfolio.World.renderParams.enableColorify = true;
                        myPortfolio.World.renderParams.enableVignette = true;
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
                        myPortfolio.World.renderParams.enableFilm = false;
                        myPortfolio.World.renderParams.filmStrengh = 0.2;
                        myPortfolio.World.renderParams.enableTiltShift = false;
                        myPortfolio.World.renderParams.rgbValue = 0.0005;
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
            /*var myLatlng = new google.maps.LatLng(40.641214, -8.647156);
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
            });*/
        },
        /**
         * Start UI events handler
         **/
        start: function() {
            this.initUI();
            this.initSettings();
            //this.initMap();
        }
    };
    /**
     * WEB AUDIO API
     **/
    this.SoundFx = {
        backgroundAudioFile: '../src/audio/soundBackground.mp3',
        init: function() {
            this.backgroundMusic = new Audio();
            this.backgroundMusic.addEventListener('loadeddata', function() {
                myPortfolio.World.CurrentLayer.numberAssetsLoaded++;
                myPortfolio.World.CurrentLayer.loadProgressCallback();
            }, false);
            this.backgroundMusic.addEventListener('error', function() {
                console.error('error loading audio');
            }, false);
            this.backgroundMusic.type = 'audio/mpeg';
            this.backgroundMusic.src = this.backgroundAudioFile;
            this.backgroundMusic.loop = true;
        }
    };
    this.init = function() {
        this.System.init();
        if(!this.System.useWebGL()) {
            this.UI.videoBackground = document.getElementById('videoBackground');
            //this.videoBackground.poster = '';
            this.UI.start();
            this.UI.videoBackground.preload = true;
            this.UI.videoBackground.loop = true;
            this.UI.videoBackground.muted = true;
            // remove Threejs canvas
            var threejsCanvas = document.getElementById('threejsCanvas');
            if(threejsCanvas) {
                threejsCanvas.parentNode.removeChild(threejsCanvas);
            }
            var modelSettings = document.getElementById('modelSettings');
            if(modelSettings) {
                modelSettings.parentNode.removeChild(modelSettings);
            }
            var settings = document.getElementById('sectionSettings');
            if(settings) {
                settings.parentNode.removeChild(settings);
            }
            var dragModelInfo = document.getElementById('dragModelInfo');
            if(dragModelInfo) {
                dragModelInfo.parentNode.removeChild(dragModelInfo);
            }
            /* remove webgl models info and actions */
            var thumbContainer = document.getElementById('thumbContainer');
            thumbContainer.parentNode.removeChild(thumbContainer);
            var touchSwipeInfo = document.getElementById('touchSwipeInfo');
            touchSwipeInfo.style.display = 'block';
            var settingsAnchor = document.getElementById('settingsAnchor');
            settingsAnchor.style.display = 'none';
            var webglLoadItems = document.querySelectorAll('.load-webgl');
            [].forEach.call(webglLoadItems, function(currentModel) {
                currentModel.style.display = 'none';
            });
            var galleryOverlayItems = document.querySelectorAll('.diagonal-overlay-right');
            [].forEach.call(galleryOverlayItems, function(currentItem) {
                currentItem.style.display = 'none';
            });
            var firstBackgroundImage = document.querySelectorAll('.model-background-img.hide')[0];
            classie.removeClass(firstBackgroundImage, 'hide');
            classie.removeClass(this.UI.videoBackground, 'hide');
            /********************/
            var burguerMenu = document.getElementById('burguerMenu');
            var menu = document.getElementById('menu');
            var footerInfoSection = document.getElementById('footerInfoSection');
            var initLoadingScreen = document.getElementById('initLoadingScreen');
            var initIntroScreen = document.getElementById('initIntroScreen');
            var loadingInfoTop = document.getElementById('loadingInfoTop');
            initIntroScreen.parentNode.removeChild(initIntroScreen);
            loadingInfoTop.parentNode.removeChild(loadingInfoTop);
            setTimeout(function() {
                classie.addClass(initLoadingScreen, 'hide');
            }, 1000);
            setTimeout(function() {
                initLoadingScreen.parentNode.removeChild(initLoadingScreen);
                classie.removeClass(burguerMenu, 'hide');
                classie.removeClass(menu, 'hide');
                classie.removeClass(footerInfoSection, 'hide');
            }, 2000);
            //end init loading screen
        } else {
            var videoLoadItems = document.querySelectorAll('.load-video');
            [].forEach.call(videoLoadItems, function(currentModel) {
                currentModel.style.display = 'none';
            });
            this.SoundFx.init();
            this.World.start();
            this.UI.start();
        }
        //console.log('Page init completed');
    };
};
/**
 * On Ready Init Page Prototype TODO
 **/
myPortfolio = new API();
myPortfolio.init();
console.log('API started.');