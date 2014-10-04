function Scene ( type, numObjects, cameraZ, fov, rotationSpeed, clearColor ) {
	var self= this;
	this.clearColor = clearColor;
	
	this.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
                //camera.setLens(8, 7.49); // 16mm bolex
	this.camera.position.z = 15;
    var controls = new THREE.OrbitControls( this.camera );    
	
	// Setup scene
	this.scene = new THREE.Scene();
    APP = {};
    APP.materials = APP.materials || {};
    APP.models = APP.models || {};



    APP.materials.monkeyMaterial = new THREE.MeshBasicMaterial(
        { 
            map: THREE.ImageUtils.loadTexture('blenderlightmap/src/cube.png')
        });
    APP.materials.floorMaterial = new THREE.MeshBasicMaterial(
        { 
            map: THREE.ImageUtils.loadTexture('blenderlightmap/src/lightemissor.png')
        });
    APP.materials.cubeMaterial = new THREE.MeshBasicMaterial(
        { 
            map: THREE.ImageUtils.loadTexture('blenderlightmap/src/bottom-cube.png'),
            alphaTest: 0.5, 
            side: THREE.DoubleSide
        });
    APP.materials.lightMaterial = new THREE.MeshBasicMaterial(
        { 
            color: 0x000fff,
            side: THREE.DoubleSide
        });
	
// load collada assets
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load( 'blenderlightmap/src/baked.dae', function ( collada ) {
         collada.scene.traverse( function ( child ) {
                        if ( child instanceof THREE.Object3D ) {
                            if(child.name == 'Cube') {
                                child.children[0].material = APP.materials.monkeyMaterial;
                            } else if(child.name == 'Cube_001') {
                                child.children[0].material = APP.materials.cubeMaterial;
                            } else if(child.name == 'Cube_002') {
                                child.children[0].material = APP.materials.floorMaterial;
                            } 
                        }
                    });
        collada.scene.rotation.y = (-50 * Math.PI / 180);
        collada.scene.rotation.z = (-50 * Math.PI / 180);
        self.scene.add(collada.scene);
    });
    
	renderTargetParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false };
	this.fbo = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, renderTargetParameters );
	
	this.render = function( delta, rtt ) {
				
		//renderer.setClearColor( this.clearColor, 1 );
		
		if (rtt)
			renderer.render( this.scene, this.camera, this.fbo, true );
		else
			renderer.render( this.scene, this.camera );
		
	};
}
