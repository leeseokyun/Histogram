let img;
let histogram = new Array(256).fill(0);

function preload() {
  img = loadImage('img2.png');
}

function setup() {
  createCanvas(1000, 400);
  img.loadPixels();

  // 히스토그램 계산
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = 4 * (y * img.width + x);
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      // 그레이스케일 값 계산
      let gray = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);

      // 히스토그램 bin 값 증가
      histogram[gray]++;
    }
  }

  // 누적 히스토그램 계산
  let cumulativeHistogram = new Array(256).fill(0);
  cumulativeHistogram[0] = histogram[0];
  for (let i = 1; i < 256; i++) {
    cumulativeHistogram[i] = cumulativeHistogram[i - 1] + histogram[i];
  }

  // 히스토그램 평활화 적용
  let totalPixels = img.width * img.height;
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = 4 * (y * img.width + x);
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      // 그레이스케일 값 계산
      let gray = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);

      // 히스토그램 평활화 적용
      let equalizedGray = map(cumulativeHistogram[gray], 0, totalPixels, 0, 255);

      // 이미지 픽셀 업데이트
      img.pixels[index] = equalizedGray;
      img.pixels[index + 1] = equalizedGray;
      img.pixels[index + 2] = equalizedGray;
    }
  }

  img.updatePixels();
  image(img, 255, 0);

  // 히스토그램 스트레칭 후의 히스토그램 시각화
  let maxVal = max(histogram);
  for (let i = 0; i < 256; i++) {
    let histVal = map(histogram[i], 0, maxVal, 0, height);
    line(i, height, i, height - histVal);
  }
}
