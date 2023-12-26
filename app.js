let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont")
let recordBtn = document.querySelector(".record-btn")
let captureBtnCont = document.querySelector(".record-btn-cont")
let captureBtn = document.querySelector(".record-btn")

let recordFlag = false;

let recorder;

let chunks = []; // media wale chucks


let constraints = {
    video : true,
    audio : true
}


// global object browser info
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;

    recorder = new MediaRecorder(stream);

    recorder.addEventListener("start", function(e){
        chunks = [];
    })

    recorder.addEventListener("dataavailable", function(e){
        chunks.push(e.data);
    })

    recorder.addEventListener("stop", function(e){
        // convertion of chucks to video
        let blob = new Blob(chunks , {type : "video/mp4"});
        
        let videoURL = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = videoURL;
        a.download = "stream.mp4";
        a.click();
    })

})


recordBtnCont.addEventListener("click" , function(e){
    if(!recorder) return;

    recordFlag = !recordFlag;

    if(recordFlag) {
        recorder.start();
        recordBtn.classList.add("scale-record");
    }
    else{
        recorder.stop();
        recordBtn.classList.remove("scale-record");
    }
})


