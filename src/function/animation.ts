import * as THREE from 'three';


export default function animation(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-500,500,500);
    scene.add(light);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    let canvas:HTMLCanvasElement = renderer.domElement;
    canvas.id = 'clouds'
    document.body.appendChild( renderer.domElement );
    
    var audio = document.getElementById("player") as HTMLAudioElement;
    
    var audioCtx=new(window.AudioContext)();
    audioCtx.createMediaElementSource(audio);
    var analyser=audioCtx.createAnalyser();
    
    analyser.fftSize=1024;
    var bufferLength=analyser.frequencyBinCount;
    var dataArray=new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    

    
    camera.position.z = 250;
    
    var animate = function () {
        requestAnimationFrame( animate );
        analyser.getByteFrequencyData(dataArray);
        // console.log(dataArray)
        

        renderer.render( scene, camera );
    };

    animate();
}