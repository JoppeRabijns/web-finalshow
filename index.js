const notifyForm = document.getElementById("notify-form");
const contentHead = document.getElementById("content-head");

const checkSubmit = (email) => {
    if (sessionStorage.getItem("submit")) {
        //check if there is a value. Only then do a fetch
        if (document.getElementById('notify').value) {
            console.log(document.getElementById('notify').value);
            fetch('https://demo-api-web2.herokuapp.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                }) // body data type must match "Content-Type" header
            }).then(
                result => {
                    notifyForm.style.display = 'none';
                    contentHead.innerHTML = "SEE YOU THEN!";
                    particles();
                },
                error => {

                    //errortext
                    document.getElementById('notify').setAttribute('placeholder', 'Error, please try again!');
                    //add red color
                    document.getElementById('notify').classList.add('errorplaceholder');
                    //clear input
                    document.getElementById('notify').value = '';

                }
            );
        }

    }
};

checkSubmit();

notifyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sessionStorage.setItem("submit", "true");
    const email = document.getElementById('notify').value;
    checkSubmit(email);
});

function particles() {

    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            number: {
                value: 1000
            },
            color: {
                value: ["#E73C3E", "#FBE122", "#489FDF"]
            },
            shape: {
                type: "confetti",
                options: {
                    confetti: {
                        type: ["circle", "square"]
                    }
                }
            },
            opacity: {
                value: 3,
                animation: {
                    enable: true,
                    minimumValue: 0,
                    speed: 2,
                    startValue: "max",
                    destroy: "min"
                }
            },
            size: {
                value: 7,
                random: {
                    enable: true,
                    minimumValue: 3
                }
            },
            links: {
                enable: false
            },
            life: {
                duration: {
                    sync: true,
                    value: 15
                },
                count: 1
            },
            move: {
                enable: true,
                gravity: {
                    enable: true,
                    acceleration: 20
                },
                speed: 20,
                decay: 0.1,
                direction: "none",
                random: false,
                straight: false,
                outModes: {
                    default: "destroy",
                    top: "none"
                }
            }
        },
        interactivity: {
            detectsOn: "window",
            events: {
                resize: true
            }
        },
        detectRetina: true,
    });
}