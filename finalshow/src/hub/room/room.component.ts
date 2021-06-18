import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  
  
  geometry=new THREE.SphereGeometry( 1000, 32, 32 );

  constructor() { }

  addHub(manager:any, scene:any,renderer:any) {
    const textureLoader=new THREE.TextureLoader(manager);
    const gltfLoader=new GLTFLoader(manager);

    const textureRoom = textureLoader.load('');

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var room="../assets/HUB/FinalRoomPOV.glb";
    var group = new THREE.Group();

    gltfLoader.load(room, function(gltf){
      scene.add(gltf.scene);
    });
      scene.add(group);
  }



  

  ngOnInit(): void {
  }

}
