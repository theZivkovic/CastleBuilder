const OrbitControls = require('three-orbit-controls')(THREE);

export default class App {

	constructor() {

	    this.initRenderer();
	    this.initScene();
	    this.initCamera();
	    this.initLights();
	  
	    const cube = new THREE.Mesh(new THREE.CubeGeometry(50,16,16), new THREE.MeshLambertMaterial({color: 0xCC0000}));
	    cube.position.z = -300;
	    this._scene.add(cube);

	    this.fireRenderLoop();
	
	}
    render() {
      this._orbitControls.update();
      this._renderer.render(this._scene, this._camera);
      requestAnimationFrame(this.render.bind(this));
    } 

    fireRenderLoop(){
    	requestAnimationFrame(this.render.bind(this));
    }


	initRenderer() {
		const container = document.querySelector('#container');
		this._renderer = new THREE.WebGLRenderer();
		this._renderer.setSize(window.innerWidth, window.innerHeight);
    	container.appendChild(this._renderer.domElement);
	}

	initScene(){
		this._scene = new THREE.Scene();
	}

	initCamera() {
	    const VIEW_ANGLE = 45;
	    const ASPECT = window.innerWidth / window.innerHeight;
	    const NEAR = 0.1;
	    const FAR = 10000;
    
    	this._camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    	this._scene.add(this._camera);

    	this._orbitControls = new OrbitControls(this._camera, this._renderer.domElement);
    	this._orbitControls.addEventListener( 'change', this.render.bind(this) );
	}

	initLights() {
    	const pointLight = new THREE.PointLight(0xFFFFFF);

    	pointLight.position.x = 10;
    	pointLight.position.y = 50;
    	pointLight.position.z = 130;

    	this._scene.add(pointLight);
	}
}
