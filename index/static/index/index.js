document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#nav-ham").addEventListener("click", () => {
    document.querySelector("#sidebar").style.width = "250px";
  });
  document.querySelector("#close-sidebar").addEventListener("click", () => {
    document.querySelector("#sidebar").style.width = "0px";
  });
  document.querySelector("#create-blank-form").addEventListener("click", () => {
    const csrf = Cookies.get("csrftoken");
    fetch("/form/create", {
      method: "POST",
      headers: { "X-CSRFToken": csrf },
      body: JSON.stringify({
        title: "Untitled Form",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        window.location = `/form/${result.code}/edit`;
      });
  });
  document
    .querySelector("#create-contact-form")
    .addEventListener("click", () => {
      const csrf = Cookies.get("csrftoken");
      fetch("/form/create/contact", {
        method: "POST",
        headers: { "X-CSRFToken": csrf },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((result) => {
          window.location = `/form/${result.code}/edit`;
        });
    });
  document
    .querySelector("#create-customer-feedback")
    .addEventListener("click", () => {
      const csrf = Cookies.get("csrftoken");
      fetch("/form/create/feedback", {
        method: "POST",
        headers: { "X-CSRFToken": csrf },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((result) => {
          window.location = `/form/${result.code}/edit`;
        });
    });
  document
    .querySelector("#create-event-registration")
    .addEventListener("click", () => {
      const csrf = Cookies.get("csrftoken");
      fetch("/form/create/event", {
        method: "POST",
        headers: { "X-CSRFToken": csrf },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((result) => {
          window.location = `/form/${result.code}/edit`;
        });
    });
});

document.querySelectorAll(".logoutButton").forEach((button) => {
  button.state = "default";

  // function to transition a button from one state to the next
  let updateButtonState = (button, state) => {
    if (logoutButtonStates[state]) {
      button.state = state;
      for (let key in logoutButtonStates[state]) {
        button.style.setProperty(key, logoutButtonStates[state][key]);
      }
    }
  };

  // mouse hover listeners on button
  button.addEventListener("mouseenter", () => {
    if (button.state === "default") {
      updateButtonState(button, "hover");
    }
  });
  button.addEventListener("mouseleave", () => {
    if (button.state === "hover") {
      updateButtonState(button, "default");
    }
  });

  // click listener on button
  button.addEventListener("click", () => {
    if (button.state === "default" || button.state === "hover") {
      button.classList.add("clicked");
      updateButtonState(button, "walking1");
      setTimeout(() => {
        button.classList.add("door-slammed");
        updateButtonState(button, "walking2");
        setTimeout(() => {
          button.classList.add("falling");
          updateButtonState(button, "falling1");
          setTimeout(() => {
            updateButtonState(button, "falling2");
            setTimeout(() => {
              updateButtonState(button, "falling3");
              setTimeout(() => {
                button.classList.remove("clicked");
                button.classList.remove("door-slammed");
                button.classList.remove("falling");
                updateButtonState(button, "default");
              }, 1000);
            }, logoutButtonStates["falling2"]["--walking-duration"]);
          }, logoutButtonStates["falling1"]["--walking-duration"]);
        }, logoutButtonStates["walking2"]["--figure-duration"]);
      }, logoutButtonStates["walking1"]["--figure-duration"]);
    }
  });
});

const logoutButtonStates = {
  default: {
    "--figure-duration": "100",
    "--transform-figure": "none",
    "--walking-duration": "100",
    "--transform-arm1": "none",
    "--transform-wrist1": "none",
    "--transform-arm2": "none",
    "--transform-wrist2": "none",
    "--transform-leg1": "none",
    "--transform-calf1": "none",
    "--transform-leg2": "none",
    "--transform-calf2": "none",
  },
  hover: {
    "--figure-duration": "100",
    "--transform-figure": "translateX(1.5px)",
    "--walking-duration": "100",
    "--transform-arm1": "rotate(-5deg)",
    "--transform-wrist1": "rotate(-15deg)",
    "--transform-arm2": "rotate(5deg)",
    "--transform-wrist2": "rotate(6deg)",
    "--transform-leg1": "rotate(-10deg)",
    "--transform-calf1": "rotate(5deg)",
    "--transform-leg2": "rotate(20deg)",
    "--transform-calf2": "rotate(-20deg)",
  },
  walking1: {
    "--figure-duration": "300",
    "--transform-figure": "translateX(11px)",
    "--walking-duration": "300",
    "--transform-arm1": "translateX(-4px) translateY(-2px) rotate(120deg)",
    "--transform-wrist1": "rotate(-5deg)",
    "--transform-arm2": "translateX(4px) rotate(-110deg)",
    "--transform-wrist2": "rotate(-5deg)",
    "--transform-leg1": "translateX(-3px) rotate(80deg)",
    "--transform-calf1": "rotate(-30deg)",
    "--transform-leg2": "translateX(4px) rotate(-60deg)",
    "--transform-calf2": "rotate(20deg)",
  },
  walking2: {
    "--figure-duration": "400",
    "--transform-figure": "translateX(17px)",
    "--walking-duration": "300",
    "--transform-arm1": "rotate(60deg)",
    "--transform-wrist1": "rotate(-15deg)",
    "--transform-arm2": "rotate(-45deg)",
    "--transform-wrist2": "rotate(6deg)",
    "--transform-leg1": "rotate(-5deg)",
    "--transform-calf1": "rotate(10deg)",
    "--transform-leg2": "rotate(10deg)",
    "--transform-calf2": "rotate(-20deg)",
  },
  falling1: {
    "--figure-duration": "1600",
    "--walking-duration": "400",
    "--transform-arm1": "rotate(-60deg)",
    "--transform-wrist1": "none",
    "--transform-arm2": "rotate(30deg)",
    "--transform-wrist2": "rotate(120deg)",
    "--transform-leg1": "rotate(-30deg)",
    "--transform-calf1": "rotate(-20deg)",
    "--transform-leg2": "rotate(20deg)",
  },
  falling2: {
    "--walking-duration": "300",
    "--transform-arm1": "rotate(-100deg)",
    "--transform-arm2": "rotate(-60deg)",
    "--transform-wrist2": "rotate(60deg)",
    "--transform-leg1": "rotate(80deg)",
    "--transform-calf1": "rotate(20deg)",
    "--transform-leg2": "rotate(-60deg)",
  },
  falling3: {
    "--walking-duration": "500",
    "--transform-arm1": "rotate(-30deg)",
    "--transform-wrist1": "rotate(40deg)",
    "--transform-arm2": "rotate(50deg)",
    "--transform-wrist2": "none",
    "--transform-leg1": "rotate(-30deg)",
    "--transform-leg2": "rotate(20deg)",
    "--transform-calf2": "none",
  },
};

// (function () {
//   $(".menu-wrapper").on("click", function () {
//     $(".hamburger-menu").toggleClass("animate");
//     $(this).toggleClass("bg");
//     $(".site-wrapper").toggleClass("blur");
//   });
// })();

let tl = gsap.timeline({ease:'power1.in'})
 let __SplitText = new SplitText("#text", {type:"words,chars"})
 let clicked = false
let chars = __SplitText.chars


document.querySelector('#button').addEventListener('click',()=>{
  if(clicked === false){
    clicked = true
    tl.to(chars, {duration: 0.5,opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",   stagger: 0.1,repeat:0})
  tl.to('#button',{width:'50px',duration:0.5})
  tl.to('#w',{y:'0%',duration:0.5})
  }
  else if(clicked === true){
    clicked = false
      tl.to('#w',{y:'100%',duration:0.5})
      tl.to('#button',{width:'135px',duration:0.5})
tl.to(chars, {duration: 0.5, opacity:1, scale:1, y:0, rotationX:0, transformOrigin:"0% 50% -50", stagger: 0.1,repeat:0})
  }
})

$('.loadingbar').delay(1500).animate({left: '0'}, 3000);
$('.loadingBox').delay(500).animate({opacity: '1'}, 1000);
$('.splashScreen').delay(4500).animate({top: '-100%'}, 1500);
$('.loadingCircle').delay(4500).animate({opacity: '0'}, 500);
$('body').delay(5000).queue(function(){
	$('body').addClass("visibleSplash");
});

window.onscroll = () => {
  toggleTopButton();
}
function scrollToTop(){
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function toggleTopButton() {
  if (document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20) {
    document.getElementById('back-to-up').classList.remove('d-none');
  } else {
    document.getElementById('back-to-up').classList.add('d-none');
  }
}