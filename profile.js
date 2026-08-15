const SUPABASE_URL =
"https://asgowauvzfnsszstvzqi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_scsteNa_ILseeQYkL1Olyg_38UMGSZS";


const supabase =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* ELEMENTS */

const form =
document.getElementById("profileForm");

const usernameInput =
document.getElementById("username");

const displayNameInput =
document.getElementById("displayName");

const bioInput =
document.getElementById("bio");

const avatarInput =
document.getElementById("avatarUrl");

const discordInput =
document.getElementById("discord");

const youtubeInput =
document.getElementById("youtube");

const githubInput =
document.getElementById("github");

const saveButton =
document.getElementById("saveButton");

const message =
document.getElementById("message");

const logout =
document.getElementById("logout");

const viewProfile =
document.getElementById("viewProfile");

const previewAvatar =
document.getElementById("previewAvatar");

const previewName =
document.getElementById("previewName");

const previewUsername =
document.getElementById("previewUsername");

const previewBio =
document.getElementById("previewBio");

const previewLinks =
document.getElementById("previewLinks");

const profileUrl =
document.getElementById("profileUrl");

const copyButton =
document.getElementById("copyButton");


let currentUser = null;


/* =========================
   LOAD USER
========================= */

async function loadProfile(){

    message.textContent =
    "Loading profile...";


    const {
        data: {
            user
        },
        error: sessionError
    } =
    await supabase.auth.getUser();


    if(
        sessionError ||
        !user
    ){

        window.location.href =
        "login.html";

        return;

    }


    currentUser = user;


    const {
        data,
        error
    } =
    await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();


    if(error){

        console.error(error);

        message.className =
        "error";

        message.textContent =
        "❌ " +
        error.message;

        return;

    }


    if(!data){

        message.textContent =
        "No profile found.";

        return;

    }


    usernameInput.value =
    data.username || "";

    displayNameInput.value =
    data.display_name || "";

    bioInput.value =
    data.bio || "";

    avatarInput.value =
    data.avatar_url || "";

    discordInput.value =
    data.discord || "";

    youtubeInput.value =
    data.youtube || "";

    githubInput.value =
    data.github || "";


    updatePreview();

    message.textContent = "";

}


/* =========================
   PREVIEW
========================= */

function updatePreview(){

    const username =
    usernameInput.value.trim();

    const displayName =
    displayNameInput.value.trim();

    const bio =
    bioInput.value.trim();

    const avatar =
    avatarInput.value.trim();

    const discord =
    discordInput.value.trim();

    const youtube =
    youtubeInput.value.trim();

    const github =
    githubInput.value.trim();


    previewName.textContent =
    displayName ||
    username ||
    "NØX User";


    previewUsername.textContent =
    "@" +
    (
        username ||
        "username"
    );


    previewBio.textContent =
    bio ||
    "Welcome to my NØX profile.";


    /* AVATAR */

    previewAvatar.innerHTML = "";

    if(avatar){

        const img =
        document.createElement("img");

        img.src = avatar;

        img.alt = "Avatar";

        img.onerror =
        function(){

            previewAvatar.innerHTML =
            "N";

        };

        previewAvatar.appendChild(img);

    }else{

        const firstLetter =
        (
            displayName ||
            username ||
            "N"
        )
        .charAt(0)
        .toUpperCase();

        previewAvatar.textContent =
        firstLetter;

    }


    /* LINKS */

    previewLinks.innerHTML = "";


    addPreviewLink(
        discord,
        "Discord ↗"
    );

    addPreviewLink(
        youtube,
        "YouTube ↗"
    );

    addPreviewLink(
        github,
        "GitHub ↗"
    );


    /* URL */

    if(username){

        const url =
        window.location.origin +
        "/u.html?username=" +
        encodeURIComponent(username);

        profileUrl.textContent =
        url;

        viewProfile.href =
        "u.html?username=" +
        encodeURIComponent(username);

    }else{

        profileUrl.textContent =
        "Choose a username";

        viewProfile.href =
        "#";

    }

}


function addPreviewLink(
    url,
    text
){

    if(!url){
        return;
    }


    const a =
    document.createElement("a");

    a.className =
    "preview-link";

    a.href =
    normalizeUrl(url);

    a.target =
    "_blank";

    a.rel =
    "noopener noreferrer";

    a.textContent =
    text;

    previewLinks.appendChild(a);

}


/* =========================
   NORMALIZE URL
========================= */

function normalizeUrl(url){

    if(
        url.startsWith("http://") ||
        url.startsWith("https://")
    ){

        return url;

    }

    return "https://" + url;

}


/* =========================
   LIVE PREVIEW
========================= */

[
    usernameInput,
    displayNameInput,
    bioInput,
    avatarInput,
    discordInput,
    youtubeInput,
    githubInput
]
.forEach(function(input){

    input.addEventListener(
        "input",
        updatePreview
    );

});


/* =========================
   SAVE
========================= */

form.addEventListener(
"submit",
async function(event){

    event.preventDefault();


    if(!currentUser){

        return;

    }


    const username =
    usernameInput.value
    .trim()
    .toLowerCase();


    if(!username){

        message.className =
        "error";

        message.textContent =
        "❌ Choose a username.";

        return;

    }


    /* USERNAME VALIDATION */

    if(
        !/^[a-z0-9_]+$/.test(username)
    ){

        message.className =
        "error";

        message.textContent =
        "❌ Username can only use letters, numbers and _.";

        return;

    }


    saveButton.disabled =
    true;

    saveButton.textContent =
    "Saving...";

    message.className = "";

    message.textContent =
    "Updating your NØX profile...";


    /* CHECK USERNAME */

    const {
        data: existing,
        error: checkError
    } =
    await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .neq("id", currentUser.id)
    .maybeSingle();


    if(checkError){

        console.error(checkError);

        message.className =
        "error";

        message.textContent =
        "❌ " +
        checkError.message;

        saveButton.disabled =
        false;

        saveButton.textContent =
        "Save changes";

        return;

    }


    if(existing){

        message.className =
        "error";

        message.textContent =
        "❌ That username is already taken.";

        saveButton.disabled =
        false;

        saveButton.textContent =
        "Save changes";

        return;

    }


    /* UPDATE */

    const {
        error
    } =
    await supabase
    .from("profiles")
    .update({

        username:
        username,

        display_name:
        displayNameInput.value.trim(),

        bio:
        bioInput.value.trim(),

        avatar_url:
        avatarInput.value.trim(),

        discord:
        discordInput.value.trim(),

        youtube:
        youtubeInput.value.trim(),

        github:
        githubInput.value.trim()

    })
    .eq(
        "id",
        currentUser.id
    );


    if(error){

        console.error(error);

        message.className =
        "error";

        message.textContent =
        "❌ " +
        error.message;

        saveButton.disabled =
        false;

        saveButton.textContent =
        "Save changes";

        return;

    }


    message.className =
    "success";

    message.textContent =
    "✓ Profile saved successfully.";

    saveButton.textContent =
    "Saved ✓";


    updatePreview();


    setTimeout(
    function(){

        saveButton.disabled =
        false;

        saveButton.textContent =
        "Save changes";

    },
    1200
    );

});


/* =========================
   COPY LINK
========================= */

copyButton.addEventListener(
"click",
async function(){

    const username =
    usernameInput.value.trim();


    if(!username){

        return;

    }


    const url =
    window.location.origin +
    "/u.html?username=" +
    encodeURIComponent(username);


    try{

        await navigator.clipboard.writeText(
            url
        );

        copyButton.textContent =
        "Copied ✓";


        setTimeout(
        function(){

            copyButton.textContent =
            "Copy profile link";

        },
        1500
        );

    }catch(error){

        profileUrl.textContent =
        url;

    }

});


/* =========================
   LOGOUT
========================= */

logout.addEventListener(
"click",
async function(){

    await supabase.auth.signOut();

    window.location.href =
    "login.html";

});


/* =========================
   START
========================= */

loadProfile();
