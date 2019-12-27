window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback, element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
window.AudioContext = (function() {
  return (
    window.webkitAudioContext || window.AudioContext || window.mozAudioContext
  );
})();
// Global Variables for Audio
var audioContext;
var audioBuffer;
var sourceNode;
var analyserNode;
var javascriptNode;
var audioData = null;
var audioPlaying = false;
var sampleSize = 1024; // number of samples to collect before analyzing data
var amplitudeArray; // array to hold time domain data
// This must be hosted on the same server as this page - otherwise you get a Cross Site Scripting error
var timeArray;
var audioUrl = "sample.mp3";
// Global Variables for the Graphics
var canvasWidth = screen.width;
var canvasHeight = screen.height-60;
var ctx;

function setHeightWidth() {
    var canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height=canvasHeight;
  }
setHeightWidth()
$(document).ready(function() {
  ctx = $("#canvas")
    .get()[0]
    .getContext("2d");
  // the AudioContext is the primary 'container' for all your audio node objects
  try {
    audioContext = new AudioContext();
  } catch (e) {
    alert("Web Audio API is not supported in this browser");
  }
  // When the Start button is clicked, finish setting up the audio nodes, play the sound,
  // gather samples for the analysis, update the canvas
  $("#start_button").on("click", function(e) {
    e.preventDefault();
    // Set up the audio Analyser, the Source Buffer and javascriptNode
    setupAudioNodes();
    // setHeightWidth()
    
    // setup the event handler that is triggered every time enough samples have been collected
    // trigger the audio analysis and draw the results
    javascriptNode.onaudioprocess = function() {
      // get the Time Domain data for this sample
      analyserNode.getByteFrequencyData(amplitudeArray);
      analyserNode.getByteTimeDomainData(timeArray);
      // draw the display if the audio is playing
      if (audioPlaying == true) {
        requestAnimFrame(drawTimeDomain);
      }
    };
    // Load the Audio the first time through, otherwise play it from the buffer
    if (audioData == null) {
      loadSound(audioUrl);
    } else {
      playSound(audioData);
    }
  });
  // Stop the audio playing
  $("#stop_button").on("click", function(e) {
    e.preventDefault();
    sourceNode.stop(0);
    audioPlaying = false;
  });
});
function setupAudioNodes() {
  sourceNode = audioContext.createBufferSource();
  analyserNode = audioContext.createAnalyser();
  javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);
  // Create the array for the data values
  amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
  timeArray =  new Uint8Array(analyserNode.frequencyBinCount);
  // Now connect the nodes together
  sourceNode.connect(audioContext.destination);
  sourceNode.connect(analyserNode);
  analyserNode.connect(javascriptNode);
  javascriptNode.connect(audioContext.destination);
}
// Load the audio from the URL via Ajax and store it in global variable audioData
// Note that the audio load is asynchronous
function loadSound(url) {
  document.getElementById("msg").textContent = "Loading audio...";
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  // When loaded, decode the data and play the sound
  request.onload = function() {
    audioContext.decodeAudioData(
      request.response,
      function(buffer) {
        document.getElementById("msg").textContent =
          "Audio sample download finished";
        audioData = buffer;
        playSound(audioData);
      },
      onError
    );
  };
  request.send();
}
// Play the audio and loop until stopped
function playSound(buffer) {
  sourceNode.buffer = buffer;
  sourceNode.start(0); // Play the sound now
  sourceNode.loop = true;
  audioPlaying = true;
}
function onError(e) {
  console.log(e);
}
function drawTimeDomain() {
  clearCanvas();
  //   var k=0;
  //   console.log(amplitudeArray.length);
  for (var i = 0; i < amplitudeArray.length; i++) {
      if (i < 300){
    var value = amplitudeArray[i] / 225;}
    else{
        var value = amplitudeArray[i] / 175;
    }
    var y = canvasHeight - canvasHeight * value - 1;
    // k++;
    // console.log('#'+(i*16384).toString(16))

    // var stradd = ((256 + (i+1)*63.75).toString(16).length > 3) ? "" : "0";
    // // ctx.fillStyle = '#00FF00';
    // ctx.fillStyle = "#" + "00"+stradd  + (256 + (i+1)*63.75).toString(16);
    ctx.fillStyle="#298fca"
    ctx.fillRect(i*canvasWidth/amplitudeArray.length, canvasHeight, canvasWidth/amplitudeArray.length, y - canvasHeight);
  }
  for (var i = 0; i < timeArray.length; i++) {
    var value = timeArray[i] / 256;
    var y = canvasHeight - canvasHeight * value - 1;
    // k++;
    // console.log('#'+(i*16384).toString(16))

    // var stradd = ((256 + (i+1)*63.75).toString(16).length > 3) ? "" : "0";
    // ctx.fillStyle = '#00FF00';
    ctx.fillStyle = "#FF0067"

    ctx.fillRect(i*canvasWidth/amplitudeArray.length, y, 3*canvasWidth/amplitudeArray.length, 3*canvasWidth/amplitudeArray.length);
  }
}
function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}
