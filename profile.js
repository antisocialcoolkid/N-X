import { createClient } from
"https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
"https://asgowauvzfnsszstvzqi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_scsteNa_ILseeQYkL1Olyg_38UMGSZS";

const supabase =
createClient(SUPABASE_URL, SUPABASE_KEY);


// Comprobar sesión

const {
    data: { user }
} = await supabase.auth.getUser();


if (!user) {

    window.location.href =
        "login.html";

}


// Obtener perfil

const { data: profile, error } =
    await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();


if (error) {

    console.error(error);

} else {

    document.getElementById("username")
        .textContent =
        "@" + profile.username;


    document.getElementById("bio")
        .textContent =
        profile.bio ||
        "Welcome to my NØX profile.";


    document.getElementById("avatar")
        .textContent =
        profile.username
        .charAt(0)
        .toUpperCase();


    if (profile.discord_username) {

        const discord =
            document.getElementById("discord");

        discord.hidden = false;

        discord.textContent =
            "Discord: " +
            profile.discord_username;
    }

}


// Logout

document
    .getElementById("logout")
    .addEventListener(
        "click",
        async () => {

            await supabase.auth.signOut();

            window.location.href =
                "login.html";

        }
    );
