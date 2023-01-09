function delay(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(duration);
    }, duration);
  });
}
// let count = -1;
const urls = [2, 1, 3];
console.time();
async function requestAll(urls) {
  // 并发读取远程URL
  const textPromises = urls.map((item, index) => {
    // count++;
    return delay(item * 1000); //由于是async函数，实际上是嵌套的promise对象
  });

  for (const textPromise of textPromises) {
    console.log(1);
    const res = await textPromise;
    console.log(res);
  }
}
console.timeEnd();
requestAll(urls);
