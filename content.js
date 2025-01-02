let mediaRecorder = null;
let recordedChunks = [];
let detectionInterval = null;

function detectVideo() {
  try {
    if (!chrome.runtime?.id) {
      clearInterval(detectionInterval);
      return;
    }

    const video = document.querySelector("#ApertureVideoComponent video");
    if (video) {
      console.log("Found Aperture video");
      return video;
    }
  } catch (err) {
    console.log("Detection error:", err);
    clearInterval(detectionInterval);
  }
  return null;
}

function startRecording(stream) {
  recordedChunks = [];
  try {
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = "recording.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    };

    mediaRecorder.start();
    console.log("Recording started");
  } catch (err) {
    console.error("Error starting recording:", err);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getStreams") {
    const video = detectVideo();
    if (video) {
      sendResponse({ streams: [{ id: "aperture", type: "video" }] });
    } else {
      sendResponse({ streams: [] });
    }
    return true;
  } else if (request.action === "startRecording") {
    const video = detectVideo();
    if (video) {
      try {
        const stream = video.captureStream();
        startRecording(stream);
        sendResponse({ success: true });
      } catch (err) {
        console.error("Error starting recording:", err);
        sendResponse({ success: false, error: err.message });
      }
    }
  } else if (request.action === "stopRecording") {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      console.log("Recording stopped");
    }
  }
  return true;
});

detectionInterval = setInterval(detectVideo, 2000);

window.addEventListener("unload", () => {
  if (detectionInterval) {
    clearInterval(detectionInterval);
  }
});
