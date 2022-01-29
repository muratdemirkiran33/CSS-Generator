const documentStyle = document.documentElement.style;
const colorName = document.querySelector("#colorName");
const colorType = document.querySelector("#colorType");
const fontName = document.querySelector("#fontName");
const loader = document.querySelector(".loader");
const cardImg = document.querySelector("#cardImg");
const generateButton = document.querySelector(".generate button");
const letters = "0123456789ABCDEF";

const fonts = [
  "Bitter",
  "Heebo",
  "Itim",
  "KoHo",
  "Lobster",
  "Mandali",
  "Noto Sans JP",
  "Poppins",
  "Roboto",
  "Source Sans Pro",
  "Neonderthaw",
  "Dongle",
  "Mochiy Pop P One",
  "Bebas Neue",
  "Dancing Script",
  "Teko",
  "Architects Daughter",
  "Indie Flower",
  "Kalam",
  "Parisienne",
];

generateButton.addEventListener("click", getRandoms);

async function getRandoms() {
  let randomColor;

  class UnsplashApi {
    constructor(image) {
      this.baseURL = "https://api.unsplash.com";

      this.axiosNesne = axios.create({
        baseURL: this.baseURL,

        params: {
          client_id: "p66K7bQhxX2Qi3vjd72wWCA9GnskgGFsqksLZKEn_nc",
          query: image,
          count: 1,
        },
      });
    }

    async randomImage() {
      try {
        const resimResponse = await this.axiosNesne.get("/photos/random");
        console.log(resimResponse);
        document.querySelector("#cardImg").className = "";

        return resimResponse.data[0].urls.regular;
      } catch (err) {
        document.querySelector("#cardImg").className = "img404";
        return "https://i.pinimg.com/originals/13/9a/19/139a190b930b8efdecfdd5445cae7754.png";
      }
    }
  }
  function getRandomBG() {
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    randomColor = color;
    return color;
  }

  function invertHex(hex) {
    color = hex.slice(1);
    return `#${(Number(`0x1${color}`) ^ 0xffffff)
      .toString(16)
      .substr(1)
      .toUpperCase()}`;
  }

  function getRandomGrey() {
    let first, second, grey;
    first = Math.floor(Math.random() * 6) + 4;
    if (first == 4) second = letters[Math.floor(Math.random() * 3) + 13];
    else if (first == 9) second = letters[Math.floor(Math.random() * 11)];
    else second = letters[Math.floor(Math.random() * 16)];
    grey = "#" + first + second + first + second + first + second;
    return grey;
  }

  function getRandomFont() {
    let newfont = fonts[Math.floor(Math.random() * fonts.length)];
    let fontLink = `@import url('https://fonts.googleapis.com/css2?family=${newfont}&display=swap');`;
    document.querySelector(".forFont").innerText = fontLink;
    return newfont;
  }
  const hexToRgb = (hex) => {
    return hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16));
  };
  function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  function lightDark(rgb) {
    if (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 186) return "black";
    else return "white";
  }
  let h;
  function getRandomImageColor(blackWhite) {
    h = Math.floor(Math.random() * 360);
    let color;
    if (blackWhite == "white") {
      color = "hsl(" + h + ", 100%, 75%)";
    } else {
      color = "hsl(" + h + ", 100%, 25%)";
    }
    return color;
  }

  getRandomBG(); //Random arkaplan rengi üretir.
  let invert = invertHex(randomColor);
  let grey = getRandomGrey();
  let font = getRandomFont();
  let blackWhite = lightDark(hexToRgb(randomColor));
  let imageColor = getRandomImageColor(blackWhite);
  let hexImageColor = hslToHex(h, 100, 75);
  let imageColorName = await axios
    .get(
      "http://www.thecolorapi.com/id?format=json&hex=" + hexImageColor.slice(1),
      {
        headers: {
          "Access-Control-Allow-Origin": "https://www.thecolorapi.com",
        },
      }
    )
    .then(function (response) {
      return response.data.name.value;
    })
    .catch(function (error) {
      console.log(error);
    });

  colorName.innerText = imageColorName;
  if (blackWhite == "black") colorType.innerText = "Dark";
  else colorType.innerText = "Light";
  fontName.innerText = font;
  documentStyle.setProperty("--primary", imageColor);
  documentStyle.setProperty("--bg", randomColor);
  documentStyle.setProperty("--invert", invert);
  documentStyle.setProperty("--grey", grey);
  document.querySelector("body").setAttribute("style", `font-family:${font};`);
  document
    .querySelector(".generate ")
    .setAttribute("style", "color:" + blackWhite);
  cardImg.removeAttribute("src");
  cardImg.setAttribute(
    "src",
    await new UnsplashApi(imageColorName).randomImage()
  );

  let randomBorderRadius = Math.floor(Math.random() * 15);
  document.querySelectorAll(".randomBorderRadius").forEach((e) => {
    e.setAttribute("style", "border-radius:" + randomBorderRadius + "px");
  });
  if(randomBorderRadius % 2 == 0){
    document.querySelector(".colors").className = "colors horizontal"
  }
  else document.querySelector(".colors").className = "colors"}

getRandoms();
