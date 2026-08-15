// ================================
// NØX — MAIN SCRIPT
// ================================

const modal = document.getElementById("toolModal");
const modalContent = document.getElementById("modalContent");
const toast = document.getElementById("toast");


// ================================
// OPEN TOOL
// ================================

function openTool(tool) {

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    if (tool === "username") {
        showUsernameTool();
    }

    if (tool === "four") {
        showFourTool();
    }
}


// ================================
// CLOSE TOOL
// ================================

function closeTool() {

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    modalContent.innerHTML = "";
}


// Close when clicking outside

modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        closeTool();
    }

});


// Close with ESC

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeTool();
    }

});


// ================================
// USERNAME TOOL
// ================================

function showUsernameTool() {

    modalContent.innerHTML = `

        <h2 class="modal-title">
            Username Generator
        </h2>

        <p class="modal-description">
            Generate random username ideas.
        </p>

        <div class="generator-box">

            <input
                id="usernameResult"
                type="text"
                placeholder="Username"
                readonly
            >

            <button onclick="generateUsername()">
                Generate
            </button>

        </div>

    `;

    generateUsername();
}


function generateUsername() {

    const words = [
        "void",
        "nox",
        "ghost",
        "dark",
        "nova",
        "zero",
        "lost",
        "vex",
        "lunar",
        "neon",
        "night",
        "shadow",
        "pixel",
        "venom",
        "echo"
    ];

    const word =
        words[Math.floor(Math.random() * words.length)];

    const number =
        Math.floor(Math.random() * 9999);

    const styles = [

        word + number,

        word + "_" + number,

        word + Math.floor(Math.random() * 99),

        word.substring(0, 4) +
        Math.floor(Math.random() * 999)

    ];

    const result =
        styles[Math.floor(Math.random() * styles.length)];

    const input =
        document.getElementById("usernameResult");

    if (input) {
        input.value = result;
    }
}


// ================================
// 4 CHARACTER TOOL
// ================================

function showFourTool() {

    modalContent.innerHTML = `

        <h2 class="modal-title">
            4 Character Generator
        </h2>

        <p class="modal-description">
            Generate a random combination
            of exactly four characters.
        </p>

        <div class="generator-box">

            <input
                id="fourResult"
                type="text"
                placeholder="XXXX"
                readonly
            >

            <button onclick="generateFour()">
                Generate
            </button>

        </div>

    `;

    generateFour();
}


function generateFour() {

    const characters =
        "abcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < 4; i++) {

        const random =
            Math.floor(
                Math.random() * characters.length
            );

        result += characters[random];
    }

    const input =
        document.getElementById("fourResult");

    if (input) {
        input.value = result;
    }
}


// ================================
// COMING SOON
// ================================

function comingSoon() {

    showToast("Coming soon");

}


// ================================
// TOAST
// ================================

let toastTimer;

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function() {

        toast.classList.remove("show");

    }, 1800);
}


// ================================
// PAGE LOAD
// ================================

document.addEventListener("DOMContentLoaded", function() {

    console.log("NØX loaded successfully.");

});
