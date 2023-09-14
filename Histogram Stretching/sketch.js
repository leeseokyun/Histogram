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

  // 히스토그램 최소 및 최대 값 찾기
  let minGray = 0;
  let maxGray = 255;
  for (let i = 0; i < 256; i++) {
    if (histogram[i] > 0) {
      minGray = i;
      break;
    }
  }
  for (let i = 255; i >= 0; i--) {
    if (histogram[i] > 0) {
      maxGray = i;
      break;
    }
  }

  // 히스토그램 스트레칭 적용 및 이미지 업데이트
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = 4 * (y * img.width + x);
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      // 그레이스케일 값 계산
      let gray = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);

      // 히스토그램 스트레칭 적용
      let stretchedGray = map(gray, minGray, maxGray, 0, 255);

      // 이미지 픽셀 업데이트
      img.pixels[index] = stretchedGray;
      img.pixels[index + 1] = stretchedGray;
      img.pixels[index + 2] = stretchedGray;
    }
  }

  img.updatePixels();
  image(img, 255,0 );

  // 히스토그램 최대 값 찾기 (시각화를 위해)
  let maxVal = max(histogram);

  // 히스토그램 시각화
  for (let i = 0; i < 256; i++) {
    let histVal = map(histogram[i], 0, maxVal, 0, height);
    line(i, height, i, height - histVal);
  }
}
