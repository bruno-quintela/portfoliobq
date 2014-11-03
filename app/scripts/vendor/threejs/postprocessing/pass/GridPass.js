THREE.GridPass = function() {
    //this.sceneContainerName = sceneContainerName;
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    this.DISPLAY_HEIGHT = 2 * 1000 * Math.tan(45 / 2 * (Math.PI / 180));
    this.DISPLAY_WIDTH = this.DISPLAY_HEIGHT * (this.SCREEN_WIDTH / this.SCREEN_HEIGHT);
    this.MAX_X = this.DISPLAY_WIDTH / 2;
    this.MIN_X = 0 - (this.DISPLAY_WIDTH / 2);
    this.MAX_Y = this.DISPLAY_HEIGHT / 2;
    this.MIN_Y = 0 - (this.DISPLAY_HEIGHT / 2);
    this.NUM_HORIZONTAL_LINES = 50;
    this.init();
};
THREE.GridPass.prototype = {
    init: function() {
        // init scene
        this.scene = new THREE.Scene();
        // init camera
        // View Angle, Aspect, Near, Far
        this.camera = new THREE.PerspectiveCamera(45, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, 10000);
        // set camera position
        this.camera.position.z = 1000;
        this.camera.position.y = 0;
        // add the camera to the scene
        this.scene.add(this.camera);
        this.projector = new THREE.Projector();
        // init renderer
        this.renderer = new THREE.CanvasRenderer();
        // start the renderer
        this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        this.drawGrid(this.NUM_HORIZONTAL_LINES);
        this.trackball = new THREE.TrackballControls(this.camera, this.renderer.domElement);
        this.trackball.staticMoving = true;
        var me = this;
        this.trackball.addEventListener('change', function() {
            me.render();
        });
        // attach the render-supplied DOM element
        //var container = document.getElementById(this.sceneContainerName);
        //container.appendChild(this.renderer.domElement);
        this.animate();
    },
    getNWScreenVector: function() {
        return new THREE.Vector3(this.MIN_X, this.MAX_Y, 0);
    },
    getNEScreenVector: function() {
        return new THREE.Vector3(this.MAX_X, this.MAX_Y, 0);
    },
    getSWScreenVector: function() {
        return new THREE.Vector3(this.MIN_X, this.MIN_Y, 0);
    },
    getSEScreenVector: function() {
        return new THREE.Vector3(this.MAX_X, this.MIN_Y, 0);
    },
    /*animate: function() {
        var me = this;

        // build custom animation frame request
        window.requestAnimFrame(function() {
            me.animate();

        });

        this.trackball.update();
    },*/
    render: function(renderer, writeBuffer, readBuffer, delta) {
        if(this.renderToScreen) {
            renderer.render(this.scene, this.camera);
        } else {
            renderer.render(this.scene, this.camera, writeBuffer, false);
        }
    },
    // drawGrid will determine blocksize based on the 
    // amount of horizontal gridlines to draw
    drawGrid: function(numHorizontalGridLines) {
        // Determine the size of a grid block (square)
        this.gridBlockSize = this.DISPLAY_HEIGHT / numHorizontalGridLines;
        var geometry = new THREE.Geometry();
        geometry.vertices.push(this.getNWScreenVector());
        geometry.vertices.push(this.getNEScreenVector());
        var material = new THREE.LineBasicMaterial({
            color: 0x000000,
            opacity: 0.2
        });
        for(var c = 0; c <= numHorizontalGridLines; c++) {
            var line = new THREE.Line(geometry, material);
            line.position.y = -c * this.gridBlockSize;
            this.scene.add(line);
        }
    }
};