import * as THREE from "three";

export default function animation() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-50, 50, 50);
  scene.add(light);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  let canvas: HTMLCanvasElement = renderer.domElement;
  canvas.id = "clouds";
  document.body.appendChild(renderer.domElement);
  var material = new THREE.LineBasicMaterial( { linewidth:5,color: 0x0000ff } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( -100, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( 0, 100, 0) ); 
  
  geometry.vertices.push(new THREE.Vector3( 100, 0, 0) );
  var line = new THREE.Line( geometry, material );
  scene.add( line );

  // var audio = document.getElementById("player") as HTMLAudioElement;

  // var audioCtx=new(window.AudioContext)();
  // audioCtx.createMediaElementSource(audio);
  // var analyser=audioCtx.createAnalyser();

  // analyser.fftSize=1024;
  // var bufferLength=analyser.frequencyBinCount;
  // var dataArray=new Uint8Array(bufferLength);
  // analyser.getByteFrequencyData(dataArray);

  camera.position.z = 250;

  var animate = function() {
    requestAnimationFrame(animate);

    // var arr = [];
    // for (var i = 0, t = 1024; i < t; i++) {
    //   arr.push(Math.round(Math.random() * 255));

    // }
    // let arruint8 = new Uint8Array(arr);
    console.log.apply(1);
    let geometry1=new THREE.Geometry();
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    geometry1.vertices.push(new THREE.Vector3(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)));
    
    line.geometry=geometry1;
    console.log.apply(1);
    // analyser.getByteFrequencyData(dataArray);
    // console.log(dataArray)

    renderer.render(scene, camera);
    
  };

  animate();
}
