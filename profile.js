const SUPABASE_URL =
"https://asgowauvzfnsszstvzqi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_scsteNa_ILseeQYkL1Olyg_38UMGSZS";


const supabase =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =========================
   ELEMENTS
========================= */

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
        error
    } =
    await supabase.auth.getUser();


    if(error || !user){

        window.location.href =
        "login.html";

        return;
    }


    currentUser =
    user;


    const result =
    await supabase

    .from("profiles")

    .select(`
        id,
        username,
        avatar_url,
        bio,
        github,
        youtube,
        theme,
        discord_id,
        discord_username,
        created_at,
        discord
    `)

    .eq(
        "id",
        user.id
    )

    .maybeSingle();


    if(result.error){

        console.error(
            result.error
        );

        message.className =
        "error";

        message.textContent =
        "❌ " +
        result.error.message;

        return;
    }


    /*
       Si todavía no existe el perfil,
       dejamos el formulario listo para
       crearlo.
    */

    if(!result.data){

        usernameInput.value = "";
        bioInput.value = "";
        avatarInput.value = "";
        discordInput.value = "";
        youtubeInput.value = "";
        githubInput.value = "";

        updatePreview();

        message.textContent =
        "Create your NØX profile.";

        return;
    }


    const data =
    result.data;


    usernameInput.value =
    data.username || "";


    bioInput.value =
    data.bio || "";


    avatarInput.value =
    data.avatar_url || "";


    discordInput.value =
    data.discord ||
    data.discord_username ||
    "";


    youtubeInput.value =
    data.youtube || "";


    githubInput.value =
    data.github || "";


    /*
       display_name NO EXISTE
       en tu tabla.

       Si el input existe,
       usamos username como
       nombre visual.
    */

    if(displayNameInput){

        displayNameInput.value =
        data.username || "";

    }


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
    displayNameInput
    ?
    displayNameInput.value.trim()
    :
    "";

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


    if(previewName){

        previewName.textContent =
        displayName ||
        username ||
        "NØX User";

    }


    if(previewUsername){

        previewUsername.textContent =
        "@" +
        (
            username ||
            "username"
        );

    }


    if(previewBio){

        previewBio.textContent =
        bio ||
        "Welcome to my NØX profile.";

    }


    /* AVATAR */

    if(previewAvatar){

        previewAvatar.innerHTML = "";


        if(avatar){

            const img =
            document.createElement("img");

            img.src =
            avatar;

            img.alt =
            "Avatar";


            img.onerror =
            function(){

                previewAvatar.innerHTML =
                getInitial(
                    displayName ||
                    username
                );

            };


            previewAvatar.appendChild(
                img
            );

        }else{

            previewAvatar.textContent =
            getInitial(
                displayName ||
                username
            );

        }

    }


    /* LINKS */

    if(previewLinks){

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

    }


    /* PROFILE URL */

    if(
        username &&
        profileUrl &&
        viewProfile
    ){

        const url =
        getProfileURL(
            username
        );


        profileUrl.textContent =
        url;


        viewProfile.href =
        getProfilePath(
            username
        );

    }

    else if(profileUrl){

        profileUrl.textContent =
        "Choose a username";

    }

}


/* =========================
   INITIAL
========================= */

function getInitial(
    value
){

    return (
        String(value || "N")
        .charAt(0)
        .toUpperCase()
    );

}


/* =========================
   PROFILE URL
========================= */

function getProfilePath(
    username
){

    return (
        "u.html?username=" +
        encodeURIComponent(
            username
        )
    );

}


function getProfileURL(
    username
){

    return (
        window.location.origin +
        window.location.pathname
            .replace(
                /[^/]+$/,
                ""
            ) +
        getProfilePath(
            username
        )
    );

}


/* =========================
   PREVIEW LINK
========================= */

function addPreviewLink(
    url,
    text
){

    if(!url || !previewLinks){

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


    previewLinks.appendChild(
        a
    );

}


/* =========================
   NORMALIZE URL
========================= */

function normalizeUrl(
    url
){

    const value =
    String(url).trim();


    if(
        value.startsWith(
            "http://"
        ) ||
        value.startsWith(
            "https://"
        )
    ){

        return value;
    }


    return (
        "https://" +
        value
    );

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
.filter(Boolean)
.forEach(
function(input){

    input.addEventListener(
        "input",
        updatePreview
    );

});


/* =========================
   SAVE PROFILE
========================= */

form.addEventListener(
"submit",
async function(event){

    event.preventDefault();


    if(!currentUser){

        message.className =
        "error";

        message.textContent =
        "❌ You are not logged in.";

        return;
    }


    const username =
    usernameInput.value
    .trim()
    .toLowerCase();


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


    /* =========================
       VALIDATE USERNAME
    ========================= */

    if(!username){

        message.className =
        "error";

        message.textContent =
        "❌ Choose a username.";

        return;
    }


    if(
        !/^[a-z0-9_]+$/.test(
            username
        )
    ){

        message.className =
        "error";

        message.textContent =
        "❌ Username can only use letters, numbers and _.";

        return;
    }


    /* =========================
       BUTTON
    ========================= */

    saveButton.disabled =
    true;

    saveButton.textContent =
    "Saving...";


    message.className = "";

    message.textContent =
    "Saving your NØX profile...";


    /* =========================
       CHECK USERNAME
    ========================= */

    const check =
    await supabase

    .from("profiles")

    .select("id")

    .eq(
        "username",
        username
    )

    .neq(
        "id",
        currentUser.id
    )

    .maybeSingle();


    if(check.error){

        console.error(
            check.error
        );


        message.className =
        "error";


        message.textContent =
        "❌ " +
        check.error.message;


        resetSaveButton();


        return;
    }


    if(check.data){

        message.className =
        "error";


        message.textContent =
        "❌ That username is already taken.";


        resetSaveButton();


        return;
    }


    /* =========================
       SAVE
    ========================= */

    const profileData = {

        id:
        currentUser.id,

        username:
        username,

        avatar_url:
        avatar,

        bio:
        bio,

        github:
        github,

        youtube:
        youtube,

        discord:
        discord,

        discord_username:
        discord,

        discord_id:
        null,

        theme:
        null

    };


    const save =
    await supabase

    .from("profiles")

    .upsert(
        profileData,
        {
            onConflict:
            "id"
        }
    );


    if(save.error){

        console.error(
            save.error
        );


        message.className =
        "error";


        message.textContent =
        "❌ " +
        save.error.message;


        resetSaveButton();


        return;
    }


    /* =========================
       SUCCESS
    ========================= */

    message.className =
    "success";


    message.textContent =
    "✓ Profile saved successfully.";


    saveButton.textContent =
    "Saved ✓";


    updatePreview();


    setTimeout(
    function(){

        resetSaveButton();

    },
    1500
    );

});


/* =========================
   RESET BUTTON
========================= */

function resetSaveButton(){

    saveButton.disabled =
    false;

    saveButton.textContent =
    "Save changes";

}


/* =========================
   COPY PROFILE LINK
========================= */

if(copyButton){

    copyButton.addEventListener(
    "click",
    async function(){

        const username =
        usernameInput.value.trim();


        if(!username){

            return;
        }


        const url =
        getProfileURL(
            username
        );


        try{

            await navigator
            .clipboard
            .writeText(
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

            if(profileUrl){

                profileUrl.textContent =
                url;

            }

        }

    });

}


/* =========================
   LOGOUT
========================= */

if(logout){

    logout.addEventListener(
    "click",
    async function(){

        await supabase
        .auth
        .signOut();


        window.location.href =
        "login.html";

    });

}


/* =========================
   START
========================= */

loadProfile();
