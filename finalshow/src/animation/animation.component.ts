import { Component, OnInit } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ModelLoaderService } from './model-loader.service';
import { SkyboxComponent } from './skybox/skybox.component';
import { AnimatedTextComponent } from './animated-text/animated-text.component';
import { LightComponent } from './light/light.component';
import { ScrollAnimationComponent } from './scroll-animation/scroll-animation.component';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';


@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {
  loading = true;
  title = 'finalshow';
  manager = new THREE.LoadingManager();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
  renderer = new THREE.WebGLRenderer();
  modelLoader=new ModelLoaderService();
  loader=new GLTFLoader(this.manager);
  fontLoader=new THREE.FontLoader(this.manager);
  skyBox=new SkyboxComponent();
  text=new AnimatedTextComponent();
  light=new LightComponent();
  scroll=new ScrollAnimationComponent();
  drone:any;
  room:any;
  cloud:any;
  draco=new DRACOLoader();
  
  // Source: https://stackoverflow.com/questions/20290402/three-js-resizing-canvas
  onResizeWindow(event:any){
    window.location.href = window.location.href;
  }

  dracoLoad(){
    this.draco.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/');
    this.loader.setDRACOLoader(this.draco);
  }

  render(){
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping= THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 0.6;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.set(0,-40,700);
    this.renderer.domElement.style.filter="blur(4px)";
    this.renderer.autoClear=false;
    this.scene.autoUpdate=true;
    const rendererContainer = document.getElementById('renderContainer')!
    rendererContainer.append(this.renderer.domElement);
  }

  loadModels(){
    this.modelLoader.loadModel(this.loader, this.scene,'assets/HUB/FinalRoom-processed.glb',"room", 1,[0,-90,0],[0,20,0]);
    this.modelLoader.loadModel(this.loader, this.scene,'assets/3D_models/drone/DroneAllInOne-processed.glb',"drone", 1,[0,-90,0],[0,-110,600],this.render,this.scroll);
    // this.modelLoader.loadModel(this.loader, this.scene,'../assets/3D_models/zeplin/AIrShip.glb',"zeplin",10,[0,0,0],[-400,80,80], this.render,this.scroll);
    this.modelLoader.initTerrain(this.scene,'assets/Terrain/jotunheimen.bin','assets/images/rock.jpg',new THREE.PlaneGeometry(240, 240, 200, 200));
    this.modelLoader.loadModel(this.loader, this.scene,'assets/3D_models/balloon/luchtballon.glb',"luchtballon",10,[0,180,0],[150,-100,200], this.render,this.scroll);
  }

  scrollAnimations(){
    let renderer=this.renderer;
    let camera=this.camera;
    const scroll =this.scroll;
    scroll.scrollInit(renderer);
    scroll.textAnim(renderer);
    scroll.cameraAnim(renderer,camera);
    scroll.introAnim(renderer);
  }

 animate() {
  this.animateText(this.scene);
  this.animateBalloons(this.scene);
  this.animateSky(this.scene);
	requestAnimationFrame( this.animate.bind(this) );
	this.renderer.render( this.scene, this.camera );
  this.light.sun.position.set(
    this.camera.position.x + 10,
    this.camera.position.y + 10,
    this.camera.position.z + 10
    )
}

  animateSky(scene: THREE.Scene) {
    let skybox = scene.getObjectByName("skybox");
    if (skybox !== undefined) {
      skybox.rotation.y += 0.0004;
    }
  }
  animateBalloons(scene: THREE.Scene) {
    let balloonAndroid = scene.getObjectByName("android");
    let balloonApple = scene.getObjectByName("apple");
    if (balloonAndroid !== undefined && balloonApple !== undefined) {
      balloonAndroid.rotation.y += 0.005;
      balloonApple.rotation.y += 0.005;
      balloonAndroid.position.y += Math.random() * 0.01;
      balloonApple.position.y += Math.random() * 0.01;
    } 
  }
  animateText(scene:THREE.Scene) {
    let text = scene.getObjectByName("final show text");
    if (text !== undefined) {
      text.rotation.y += 0.005;
    }    
  }

  onLoad(){
    console.log('TEST');
    //Source: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Detect_WebGL
    // Create canvas element. The canvas is not added to the
    // document itself, so it is never displayed in the
    // browser window.
    var canvas = document.createElement("canvas");
    // Get WebGLRenderingContext from canvas element.
    var gl = canvas.getContext("webgl")
      || canvas.getContext("experimental-webgl");
    if (gl && gl instanceof WebGLRenderingContext) {
        // webgl enabled
    } else {
        window.location.href = '/no-webgl';
    }
  }

ngOnInit(): void {
  window.onbeforeunload = function() {window.scrollTo(0,0);}
  THREE.Cache.enabled=true;
  this.dracoLoad();
  this.loadModels();
  this.scrollAnimations();
  this.skyBox.skybox(this.scene);
  this.text.loadText(this.scene);
  this.manager.onLoad = () => {
    console.log('%cLoading complete!', 'font-weight: bold; color: red;');
    this.light.addLight(this.scene);
    this.render();
    this.animate();
    this.showSite();
  };  
}
  showSite() {
    this.loading = false;
  }

}
