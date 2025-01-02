# 🎥 WebRTC Stream Recorder Extension

> Turn any WebRTC stream into your personal recording with just one click!

## ✨ Features

- 🔍 Automatically detects WebRTC video streams
- ⚡ Simple one-click recording
- 💾 Downloads recordings in WebM format
- 🎯 Specifically optimized for Aperture Video Components
- 🔄 Real-time stream detection
- 🚀 Lightweight and fast

## 🚀 Installation

1. Clone this repository or download the files

```bash
git clone git@github.com/MatanFc/webrpc-recorder.git
```

2. Create your extension directory structure:

```
webrtc-recorder/
├── manifest.json
├── content.js
├── popup.js
├── popup.html
├── background.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

3. Load in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select your extension directory

## 🎮 How to Use

1. Navigate to a page with a WebRTC stream
2. Click the extension icon in your toolbar
3. If a stream is detected, the "Start Recording" button will be enabled
4. Click to start recording
5. Click again to stop and download your recording

## 🛠️ Technical Details

The extension works by:

- Detecting video elements with WebRTC streams
- Using the MediaRecorder API to capture the stream
- Saving the recording in WebM format
- Providing real-time feedback about stream detection

## 📝 Files Overview

- `manifest.json`: Extension configuration and permissions
- `content.js`: Stream detection and recording logic
- `popup.html/js`: User interface and controls
- `background.js`: Extension lifecycle management

## 🎨 Customization

Want to make it your own? Here are some things you can modify:

- Change the recording format in content.js
- Modify the detection interval (default: 2000ms)
- Customize the popup UI styles
- Add your own icons

## ⚠️ Requirements

- Chrome browser (version 80 or higher)
- Developer mode enabled for loading unpacked extensions

## 🐛 Troubleshooting

**Q: Button is disabled?**

- Make sure you're on a page with an active WebRTC stream
- Check the console for any error messages
- Refresh the page and try again

**Q: Recording not starting?**

- Ensure the stream is actively playing
- Check browser console for permissions errors
- Try reloading the extension

## 🎉 Tips and Tricks

1. Pin the extension for quick access
2. Wait for the stream to start playing before recording
3. Check the download location in your browser settings
4. Use the console for detailed debugging information

## 🤝 Contributing

Found a bug? Want to add a feature? I'd love your help!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ for the streaming community

_Remember: Always respect content creators' rights and terms of service when recording streams!_
