let startTime;
let timer;

self.onmessage = (e) => {
  if (e.data === 'start') {
    startTime = performance.now();
    timer = setInterval(() => {
      const currentTime = performance.now();
      self.postMessage(currentTime - startTime);
    }, 1);
  } else if (e.data === 'stop') {
    clearInterval(timer);
  }
};