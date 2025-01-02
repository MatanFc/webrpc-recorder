document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleRecord");
  const streamStatus = document.getElementById("streamStatus");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getStreams" },
      (response) => {
        if (chrome.runtime.lastError) {
          streamStatus.textContent = "Cannot detect streams on this page";
          streamStatus.className = "no-stream";
          return;
        }

        if (response && response.streams && response.streams.length > 0) {
          streamStatus.textContent = "Stream found";
          streamStatus.className = "stream-found";
          toggleButton.disabled = false;
        } else {
          streamStatus.textContent = "No streams detected";
          streamStatus.className = "no-stream";
          toggleButton.disabled = true;
        }
      }
    );
  });

  let isRecording = false;

  toggleButton.addEventListener("click", () => {
    if (!isRecording) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "startRecording" },
          (response) => {
            if (response && response.success) {
              isRecording = true;
              updateButtonState(true);
            } else {
              streamStatus.textContent =
                "Failed to start recording: " +
                (response?.error || "unknown error");
              streamStatus.className = "no-stream";
            }
          }
        );
      });
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "stopRecording" });
        isRecording = false;
        updateButtonState(false);
      });
    }
  });

  function updateButtonState(isRecording) {
    toggleButton.textContent = isRecording
      ? "Stop Recording"
      : "Start Recording";
    toggleButton.className = isRecording ? "recording" : "";
  }
});
