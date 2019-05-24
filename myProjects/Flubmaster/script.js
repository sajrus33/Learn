const myGlobal = {};

const myDOM = {
  // header
  header: document.querySelector(".header"),
  // menu
  menuLang: document.querySelector(".header__nav--languages"),
  menuLangList: document.querySelector(".languages__list"),
  menuHamb: document.querySelector(".header__nav--hamb"),
  menuHambList: document.querySelector(".hamb__list"),
  // products
  productDescribeFirst: document.querySelector(".product__describe--first"),
  productDescribeSecond: document.querySelector(".product__describe--second"),
  // videos
  videosContainers: document.querySelectorAll(".video__wrapper"),
  videos: document.querySelectorAll(".iframe"),

  scrollTo: (target = myDOM.header, duration = 200) => {
    console.log({ target });

    const targetPosition = target.offsetTop; //top of target
    const startPosition = window.pageYOffset; //window se

    const distance = targetPosition - startPosition;
    let startTime = null;

    function ease(time, start, distance, duration) {
      time /= duration / 2;
      if (time < 1) return (distance / 2) * time * time + start;
      time--;
      return (-distance / 2) * (time * (time - 2) - 1) + start;
    }

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const newPosition = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, newPosition);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        console.log("koniec scrolla");
      }
    }
    requestAnimationFrame(animation);
  },

  listen: () => {
    myDOM.menuLang.addEventListener("click", function() {
      myDOM.menuLangList.classList.toggle("displayNone");
    });
    myDOM.menuHamb.addEventListener("click", function() {
      // if (innerWidth < 680) {
      myDOM.menuHambList.classList.toggle("displayNone");
      // }
    });
    window.addEventListener("scroll", function() {
      if (window.scrollY > (mySize.headerHeight * 0.75) / 3) {
        myDOM.productDescribeFirst.style.animation = "goInRight 1s forwards";
      } else {
        myDOM.productDescribeFirst.style.animation = "none";
      }

      if (window.scrollY > mySize.headerHeight * 0.75 * 1.3) {
        myDOM.productDescribeSecond.style.animation = "goInRight 1s forwards";
      } else {
        myDOM.productDescribeSecond.style.animation = "none";
      }

      // const top = describe.previousElementSibling;

      console.log(mySize.headerHeight, mySize.descrbieFirstTop, window.scrollY);
      // if (x > top)
    });
    window.addEventListener("resize", mySize.resize);

    myDOM.videosContainers.forEach(container => {
      container.addEventListener("click", function() {
        const videoWrapper = this.childNodes[1];
        const video = videoWrapper.childNodes[1];
        if (video.paused) {
          video.requestFullscreen();
          video.play();
          function listener() {
            console.log(video);
            video.webkitExitFullScreen();
            video.pause();
            video.removeEventListener("click", listener);
          }
          video.addEventListener("click", listener);
        } else {
          video.pause();
        }
      });
    });
  }
};

let mySize = {
  headerHeight: myDOM.header.offsetHeight,
  descrbieFirstTop: myDOM.productDescribeFirst.offsetTop,

  resize: function() {
    mySize.headerHeight = myDOM.header.offsetHeight;
    (mySize.descrbieFirstTop = myDOM.productDescribeFirst.offsetTop),
      console.log("resize", mySize.descrbieFirstTop);
  }
};

function init() {
  myDOM.listen();
  mySize.resize();
}
init();

// klasa kropki swiecacej w header "counter__dot--selected"
