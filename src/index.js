import "./styles.css";
import { gsap, ScrollTrigger } from "gsap";
import SplitType from "split-type";
import $ from jQuery

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

gsap.registerPlugin(ScrollTrigger);

console.log("line 3 console log");



// on click of any link
// SAVE SCROLL POSITION BETWEEN PAGES
// $("a").on("click", function () {
//   let scrollDistance = $(document).scrollTop();
//   localStorage.setItem("scrollDistance", scrollDistance);
// });

// // on page load - if cookie is set
// if (localStorage.getItem("scrollDistance") !== null) {
//   // let variable equal cookie value
//   let scrollDistance = localStorage.getItem("scrollDistance");
//   // set scroll position
//   $(document).scrollTop(scrollDistance);
//   // reset the value back to null
//   localStorage.removeItem('scrollDistance');
// }

// let smoother = ScrollSmoother.create({
//   wrapper: "#smooth-wrapper",
//   content: "#smooth-content",
//   smooth: 1,
//   effects: true
// });

// $(".tall-section").each(function (index) {
//   ScrollTrigger.create({
//     trigger: $(this),
//     start: "top top",
//     end: "bottom bottom",
//     scrub: true,
//     pin: $(this).find(".sticky-element"),
//     markers: true
//   });
// });

// ScrollTrigger.create({
//   trigger: ".section_home-hero-intro",
//   start: "top top",
//   triggerEnd: ".section_home-our-mission",
//   end: "bottom bottom",
//   pin: ".section_home_hero-sticky",
//   scrub: 1,
//   markers: true
// });

// const splitLines = $(".split-lines");

const splitLines = document.querySelectorAll('[tr-split-element]');
const instancesOfSplit = [];
// Split the text up
function runSplit() {
  splitLines.each(function (index) {
    const currentElement = $(this);
    instancesOfSplit[index] = new SplitType(currentElement, {
      types: "lines, words"
    });
  });

  $(".line").each(function (index) {
    $(this).append("<div class='line-mask'></div>");
  });
}
runSplit();

let heroTypeSplit = new SplitType(".intro-title", {
  types: "words, chars",
  tagName: "span"
});

// On Page Load
function pageLoad() {
  let tl = gsap.timeline({ delay: 0.3 });
  console.log("page load funciton hit");
  tl.from(
    ".intro-title .char",
    {
      y: "110%",
      stagger: { each: 0.04, from: "center" },
      ease: "power4.out",
      duration: 0.6
    },
    0.4
  );
  tl.to(
    ".intro-title",
    {
      opacity: 1,
      ease: "power4.out",
      duration: 0.4
    },
    0
  );
  tl.to(".join-waitlist-button", {
    scale: 1,
    opacity: 1,
    ease: "power2.out",
    duration: 0.4
  });
  tl.to(".section_home-badge-image-wrapper", {
    scale: 1,
    opacity: 1,
    stagger: { each: 0.2, from: "end" },
    ease: "power2.out",
    duration: 0.8
  });
  tl.to(".home-mission-component", {
    scale: 1,
    opacity: 1,
    ease: "power2.out",
    duration: 0.4
  });
}
pageLoad();

//Update on window resize
let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    elementsToSplit.each(function (index) {
      instancesOfSplit[index].revert();
    });
    runSplit();
    createAnimation();
  }
});

function createAnimation() {
  $(".line").each(function (index) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        // trigger element - viewport
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });
    tl.to($(this).find(".line-mask"), {
      width: "0%",
      duration: 1
    });
  });
}
createAnimation();

// PAGE COLOR POWER-UP
window.addEventListener("DOMContentLoaded", (event) => {
  // attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }
  // pagecolor trigger
  $("[tr-pagecolor-element='trigger']").each(function (index) {
    // elements
    let triggerEl = $(this),
      targetEl = $("body");

    console.log(targetEl.classList);

    // settings
    let classSetting = attr("mode-2", triggerEl.attr("tr-pagecolor-class"));
    // result
    ScrollTrigger.create({
      trigger: triggerEl,
      start: "top center",
      end: "bottom center",
      onToggle: ({ self, isActive }) => {
        if (isActive) {
          targetEl.addClass(classSetting);
        } else {
          targetEl.removeClass(classSetting);
        }
      }
    });
    // ScrollTrigger.create({
    //   trigger: ".section_home-scrolly-section-outer-wrapper",
    //   start: "top top",
    //   endTrigger: ".scrolly_section-two-column-text-inner",
    //   onLeave: () => {
    //     $(".product-section-one-product-mockup-one").removeClass(
    //       "active-mockup"
    //     );
    //     $(".product-section-one-product-mockup-two").removeClass(
    //       "active-mockup"
    //     );
    //   },
    //   onEnterBack: () => {
    //     $(".product-section-one-product-mockup-one").addClass("active-mockup");
    //     $(".product-section-one-product-mockup-two").addClass("active-mockup");
    //   },
    //   onEnter: () => {
    //     $(".product-section-one-product-mockup-one").addClass("active-mockup");
    //     $(".product-section-one-product-mockup-two").addClass("active-mockup");
    //   }
    // });
  });

  const lenis = new Lenis({
    wrapper: $("#smooth-wrapper"),
    content: $("#smooth-content"),
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: "vertical", // vertical, horizontal
    gestureDirection: "vertical", // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 2,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false
  });

  //get scroll value
  // lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
  //   console.log({ scroll, limit, velocity, direction, progress });
  // });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // get the the span element
  const yrSpan = document.querySelector(".current_year");
  // get the current year
  const currentYr = new Date().getFullYear();
  // set the year span element's text to the current year
  yrSpan.textContent = currentYr;
});

let callout_triggger = ".callout_trigger";
let visual = ".iphone-inner-visual-item";
let section = ".sticky-callout-section";

$(section).each(function (index) {
  $(this).find(callout_triggger).first().addClass("active");
  $(this).find(visual).first().addClass("active");
});

// On scroll into view
$(callout_triggger).each(function (index) {
  let myIndex = $(this).index();
  let mySection = $(this).closest(section);
  let targetElement = mySection.find(visual).eq(myIndex);
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      // trigger element - viewport
      start: "top center",
      end: "bottom bottom",
      onEnter: () => {
        mySection.find(".active").removeClass("active");
        $(this).addClass("active");
        targetElement.addClass("active");
      },
      onEnterBack: () => {
        mySection.find(".active").removeClass("active");
        $(this).addClass("active");
        targetElement.addClass("active");
      }
    }
  });
});

/* Home page section scale animation */

const homePageSections = $(".sticky_section-list-wrapper").children();
const stickySection = $(".sticky_home-section");

// $(homePageSections).each(function (el, index) {
//   let myIndex = $(this).index();
//   let mySection = $(this).closest(stickySection);
//   let targetElement = mySection.find(stickySection).eq(myIndex) ?? null;
//   let closestOlderSibling = myIndex !== 0 ? mySection.prev() : null;

//   if (targetElement) {
//     let tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: $(this),
//         start: "top center",
//         scrub: true
//       }
//     });

//     if (index === 0) return;
//     tl.fromTo(
//       closestOlderSibling,
//       1,
//       { scale: 1, opacity: 1, transform: { translateY: 0 } },
//       { scale: 0.5, opacity: 0.5, transform: { translateY: "30%" } }
//     );
//   }
// });

let horizontalItem = $(".horizontal-item");
let horizontalSection = $(".horizontal-section");
let moveDistance;
function calculateScroll() {
  // Desktop
  let itemsInView = 2;
  let scrollSpeed = 1.2;

  if (window.matchMedia("(max-width: 479px)").matches) {
    // Mobile Portrait
    itemsInView = 1;
    scrollSpeed = 1.2;
  } else if (window.matchMedia("(max-width: 767px)").matches) {
    // Mobile Landscape
    itemsInView = 1;
    scrollSpeed = 1.2;
  } else if (window.matchMedia("(max-width: 991px)").matches) {
    // Tablet
    itemsInView = 2;
    scrollSpeed = 1.2;
  }
  let moveAmount = horizontalItem.length - itemsInView;
  let minHeight =
    scrollSpeed * horizontalItem.outerWidth() * horizontalItem.length;
  if (moveAmount <= 0) {
    moveAmount = 0;
    minHeight = 0;
    // horizontalSection.css('height', '100vh');
  } else {
    horizontalSection.css("height", "200vh");
  }
  moveDistance = horizontalItem.outerWidth() * moveAmount;
  horizontalSection.css("min-height", minHeight + "px");
}
calculateScroll();
window.onresize = function () {
  calculateScroll();
};

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".horizontal-trigger",
    // trigger element - viewport
    start: "top top",
    end: "bottom top",
    invalidateOnRefresh: true,
    scrub: 1
  }
});
tl.to(".horizontal-section .list", {
  x: () => -moveDistance,
  duration: 1
});

let transitionTrigger = $(".transition-trigger");
let introDurationMS = 0;
let exitDurationMS = 1200;
let excludedClass = "no-transition";

// On Page Load
if (transitionTrigger.length > 0) {
  transitionTrigger.click();
  $("body").addClass("no-scroll-transition");
  setTimeout(() => {
    $("body").removeClass("no-scroll-transition");
  }, introDurationMS);
}
// On Link Click
$("a").on("click", function (e) {
  if (
    $(this).prop("hostname") == window.location.host &&
    $(this).attr("href").indexOf("#") === -1 &&
    !$(this).hasClass(excludedClass) &&
    $(this).attr("target") !== "_blank" &&
    transitionTrigger.length > 0
  ) {
    e.preventDefault();
    $("body").addClass("no-scroll-transition");
    let transitionURL = $(this).attr("href");
    transitionTrigger.click();
    setTimeout(function () {
      window.location = transitionURL;
    }, exitDurationMS);
  }
});
// On Back Button Tap
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

// Hide Transition on Window Width Resize
setTimeout(() => {
  $(window).on("resize", function () {
    setTimeout(() => {
      $(".transition").css("display", "none");
    }, 50);
  });
}, introDurationMS);
