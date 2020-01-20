import * as THREE from 'three';

export function animation(src:string){

let scene:THREE.Scene, camera:THREE.Camera, renderer:THREE.WebGLRenderer, analyser:THREE.AudioAnalyser, uniforms:any;

let startButton = document.getElementById( 'startButton' );
    startButton?.addEventListener( 'click', init );

    function init() {

    let fftSize = 128;

        //

    let overlay = document.getElementById( 'overlay' );
        overlay?.remove();

        //

    let container = document.getElementById( 'container' );

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0x000000 );
        renderer.setPixelRatio( window.devicePixelRatio );
        container?.appendChild( renderer.domElement );

        scene = new THREE.Scene();

        camera = new THREE.Camera();

        //

    let listener = new THREE.AudioListener();

    let audio = new THREE.Audio( listener );

    // let mediaElement = new Audio( 'sounds/376737_Skullbeatz___Bad_Cat_Maste.mp3' );
    //     mediaElement.loop = true;
    //     mediaElement.play();

    //     audio.setMediaElementSource( mediaElement );

        analyser = new THREE.AudioAnalyser( audio, fftSize );

        //

        uniforms = {

            tAudioData: { value: new THREE.DataTexture( analyser.data, fftSize / 2, 1, THREE.LuminanceFormat ) }

        };

    let material = new THREE.ShaderMaterial( {

            uniforms: uniforms,
            vertexShader: document.getElementById( 'vertexShader' )?.textContent as string,
            fragmentShader: document.getElementById( 'fragmentShader' )?.textContent as string

        } );

    let geometry = new THREE.PlaneBufferGeometry( 1, 1 );

    let mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        //

        window.addEventListener( 'resize', onResize, false );

        animate();

    }

    function onResize() {

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

        requestAnimationFrame( animate );

        render();

    }

    function render() {

        analyser.getFrequencyData();

        uniforms.tAudioData.value.needsUpdate = true;

        renderer.render( scene, camera );

    }

}