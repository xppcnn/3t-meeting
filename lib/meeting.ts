interface deviceInfoType {
  id: string;
  kind: string;
}

interface localDeviceType {
  audioIn: deviceInfoType[];
  videoIn: deviceInfoType[];
  audioOut: deviceInfoType[];
}

function handleError(error: Error) {
  alert("摄像头无法正常使用，请检查是否占用或缺失");
  console.error(
    "navigator.MediaDevices.getUserMedia error: ",
    error.message,
    error.name
  );
}

/**
 * 获取本地设备信息
 * @returns
 */
function initInnerLocalDevice() {
  const localDevice: localDeviceType = {
    audioIn: [],
    videoIn: [],
    audioOut: [],
  };

  let constraints: MediaStreamConstraints = { video: true, audio: true };

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("浏览器不支持获取媒体设备");
    return;
  }
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  });
  navigator.mediaDevices
    .enumerateDevices()
    .then(function (devices) {
      devices.forEach((device) => {
        let obj = { id: device.deviceId, kind: device.kind };
        if (device.kind === "audioinput") {
          if (
            localDevice.audioIn.filter((ele) => ele.id === device.deviceId)
              .length === 0
          ) {
            localDevice.audioIn.push(obj);
          }
        }
        if (device.kind === "audiooutput") {
          if (
            localDevice.audioOut.filter((ele) => ele.id === device.deviceId)
              .length === 0
          ) {
            localDevice.audioOut.push(obj);
          }
        }
        if (device.kind === "videoinput") {
          if (
            localDevice.videoIn.filter((ele) => ele.id === device.deviceId)
              .length === 0
          ) {
            localDevice.videoIn.push(obj);
          }
        }
      });
    })
    .catch(handleError);
}

/**
 * 获取本地设备流
 * @param constraints
 * @returns
 */
async function getLocalUserMedia(constraints: MediaStreamConstraints) {
  return await navigator.mediaDevices.getUserMedia(constraints);
}
