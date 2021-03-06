/**
 
 */
THREE.GlitchPass = function(type) {
    if(THREE.DigitalGlitch === undefined) console.error("THREE.GlitchPass relies on THREE.DigitalGlitch");
    var shader = THREE.DigitalGlitch;
    this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);
    var dt_size = 64;
    this.uniforms["tDisp"].value = this.generateHeightmap(dt_size);
    this.material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
    });
    this.type = parseInt(type);
    this.enabled = true;
    this.renderToScreen = false;
    this.needsSwap = true;
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();
    this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
    this.scene.add(this.quad);
};
THREE.GlitchPass.prototype = {
    render: function(renderer, writeBuffer, readBuffer, delta) {
        this.uniforms["tDiffuse"].value = readBuffer;
        this.uniforms['seed'].value = Math.random(); //default seeding
        this.uniforms['byp'].value = 0;
        if(this.enabled == true) {
            switch(this.type) {
                case 0:
                    this.uniforms['amount'].value = Math.random() / 100;
                    this.uniforms['angle'].value = THREE.Math.randFloat(-Math.PI, Math.PI);
                    this.uniforms['distortion_x'].value = THREE.Math.randFloat(0, 0.5);
                    this.uniforms['distortion_y'].value = THREE.Math.randFloat(0, 0.5);
                    this.uniforms['seed_x'].value = THREE.Math.randFloat(-0.03, 0.03);
                    this.uniforms['seed_y'].value = THREE.Math.randFloat(-0.03, 0.03);
                    break;
                case 1:
                    this.uniforms['amount'].value = Math.random() / 200;
                    this.uniforms['angle'].value = THREE.Math.randFloat(-Math.PI, Math.PI);
                    this.uniforms['distortion_x'].value = THREE.Math.randFloat(0, 1);
                    this.uniforms['distortion_y'].value = THREE.Math.randFloat(0, 1);
                    this.uniforms['seed_x'].value = THREE.Math.randFloat(-0.1, 0.1);
                    this.uniforms['seed_y'].value = THREE.Math.randFloat(-0.1, 0.1);
                    break;
                case 2:
                    this.uniforms['amount'].value = Math.random() / 100;
                    this.uniforms['angle'].value = THREE.Math.randFloat(-Math.PI, Math.PI);
                    this.uniforms['distortion_x'].value = THREE.Math.randFloat(0, 1);
                    this.uniforms['distortion_y'].value = THREE.Math.randFloat(0, 1);
                    this.uniforms['seed_x'].value = THREE.Math.randFloat(-0.3, 0.3);
                    this.uniforms['seed_y'].value = THREE.Math.randFloat(-0.3, 0.3);
                    break;
            }
        }
        this.quad.material = this.material;
        if(this.renderToScreen) {
            renderer.render(this.scene, this.camera);
        } else {
            renderer.render(this.scene, this.camera, writeBuffer, false);
        }
    },
    generateHeightmap: function(dt_size) {
        var data_arr = new Float32Array(dt_size * dt_size * 3);
        var length = dt_size * dt_size;
        for(var i = 0; i < length; i++) {
            var val = THREE.Math.randFloat(0, 1);
            data_arr[i * 3 + 0] = val;
            data_arr[i * 3 + 1] = val;
            data_arr[i * 3 + 2] = val;
        }
        var texture = new THREE.DataTexture(data_arr, dt_size, dt_size, THREE.RGBFormat, THREE.FloatType);
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
        texture.needsUpdate = true;
        texture.flipY = false;
        return texture;
    }
};5