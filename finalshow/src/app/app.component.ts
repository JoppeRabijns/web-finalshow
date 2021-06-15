import { Component } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import { ModelLoaderService } from './model-loader.service';
import { GuiService } from './gui.service';
import { SkyService } from './sky.service';
import { AxesHelper } from 'three';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'finalshow';
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer();
  modelLoader=new ModelLoaderService();
  guiService=new GuiService();
  sky=new SkyService(this.renderer);
  //rectLight=new THREE.RectAreaLight(0xffffff,50,200,200);
  //hemiLight=new THREE.HemisphereLight( 0xeeeeee, 0xeeeeee, 1 );
  //hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 1 );
  hemiLight = new THREE.HemisphereLight( 0xffeeb1, 0x080820, 4 );
  sun = new THREE.SpotLight(0xffa95c, 4)
  gui=new dat.GUI();
 // orbit=new ORBIT.OrbitControls(this.camera,this.renderer.domElement);

  guiSettings(){
    this.guiService.position("camera",this.camera,true);
  }

  controls(){
   // console.log(this.orbit);
    //this.orbit.enableZoom=false;
  }

  scroll(){  
    gsap.registerPlugin(ScrollTrigger);

    var cam_anim = gsap.timeline({
      scrollTrigger: {
        trigger: this.renderer.domElement,
        scrub: 1.2,
        start: 'top top',
        end:'+=5000',
        markers: true,
      }
    }).to(this.camera.position, {
      x: 200,
      y: 50,
      z: 300,
      duration: 1,
      ease: 'none'
    }).to(this.camera.rotation, { z: 0, y: 0.5 }, "simultaneously").to(this.camera.position, {
      y: 200,
      duration: 1,
      ease: 'none'
    });
    
  };

  light(){
    this.sun.castShadow = true;
    this.sun.shadow.bias = -0.0001;
    this.sun.shadow.mapSize.width = 1024*4;
    this.sun.shadow.mapSize.height = 1024*4;
    this.scene.add(this.sun);
    //this.rectLight.position.set( 5, 100, 0 );
    //this.rectLight.lookAt( 0, 0, 0 );
    this.hemiLight.position.set(0,20,0);
    //this.scene.add( this.rectLight );
    this.scene.add(this.hemiLight);
  }

  sound(){
    const audioLoader = new THREE.AudioLoader();
    const listener = new THREE.AudioListener();
		this.camera.add( listener );

    const sound1 = new THREE.PositionalAudio( listener );
				audioLoader.load( '../assets/sounds/sound.ogg', function ( buffer ) {
					sound1.setBuffer( buffer );
					sound1.setRefDistance( 20 );
          sound1.setLoop( true );
          sound1.setVolume( 0.5 );
					sound1.play();

				} );
				this.scene.add( sound1 );
  }

  render(){
    this.scene.add(new THREE.AxesHelper(500))
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping= THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 0.6;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.z=25;
    document.body.appendChild( this.renderer.domElement );
    this.renderer.autoClear=false;
    console.log(this.scene);
  }

  loadModels(){
    const scene = this.scene;
    let cloud=this.modelLoader.loadModel(this.scene,'../assets/3D_models/cloud/scene.gltf',"cloud", function ( gltf: any ) {
      scene.add( gltf.scene );
      //gui.scale(guiName,gltf.scene,false,-100,100,0.1);
      //gui.position(guiName,gltf.scene,false,-100,100,0.1);
    });
    let plane=this.modelLoader.loadModel(this.scene,'../assets/3D_models/north_american_x-15/scene.gltf',"x-15", function ( gltf: any ) {
      scene.add( gltf.scene );
    });
    let drone=this.modelLoader.loadModel(this.scene,'../assets/3D_models/drone/DroneFP.glb',"droneFP", function ( gltf: any ) {
      scene.add( gltf.scene );
    });
    let room=this.modelLoader.loadModel(this.scene,'../assets/3D_models/roomprojects/RoomProjectsHexa.glb',"room", function ( gltf: any ) {
      scene.add( gltf.scene );
    });
    let terrain=this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/Terrain/jotunheimen-texture-altered.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
  }
  
 animate() {
	requestAnimationFrame( this.animate.bind(this) );
	this.renderer.render( this.scene, this.camera );
  this.sun.position.set(
    this.camera.position.x + 10,
    this.camera.position.y + 10,
    this.camera.position.z + 10
    )
}

// Source: https://stackoverflow.com/questions/20290402/three-js-resizing-canvas
onResizeWindow(event:any){
  let camera = this.camera;
  let renderer = this.renderer;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}



ngOnInit(): void {
  this.loadModels();
  this.sky.skyGui();
  this.sky.skySettings(this.scene);
  this.controls();
  this.guiSettings();
  this.scroll();
  this.light();
  this.render();
  this.animate();
  this.sound();
}
}
