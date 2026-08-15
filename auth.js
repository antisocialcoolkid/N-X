import { createClient } from
"https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
"https://asgowauvzfnsszstvzqi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_scsteNa_ILseeQYkL1Olyg_38UMGSZS";

const supabase =
createClient(SUPABASE_URL, SUPABASE_KEY);


// ==========================
// REGISTER
// ==========================

const registerForm =
document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const username =
                document
                .getElementById("username")
                .value
                .trim()
                .toLowerCase();

            const email =
                document
                .getElementById("email")
                .value
                .trim();

            const password =
                document
                .getElementById("password")
                .value;

            const message =
                document.getElementById("message");

            message.textContent =
                "Creating account...";


            // Check username

            const { data: existing } =
                await supabase
                .from("profiles")
                .select("username")
                .eq("username", username)
                .maybeSingle();

            if (existing) {

                message.textContent =
                    "That username is already taken.";

                return;
            }


            // Create account

            const { data, error } =
                await supabase.auth.signUp({
                    email: email,
                    password: password
                });


            if (error) {

                message.textContent =
                    error.message;

                return;
            }


            if (!data.user) {

                message.textContent =
                    "Check your email to confirm your account.";

                return;
            }


            // Create profile

            const { error: profileError } =
                await supabase
                .from("profiles")
                .insert({
                    id: data.user.id,
                    username: username
                });


            if (profileError) {

                message.textContent =
                    profileError.message;

                return;
            }


            message.textContent =
                "Account created!";


            setTimeout(() => {

                window.location.href =
                    "profile.html";

            }, 1000);

        }
    );

}


// ==========================
// LOGIN
// ==========================

const loginForm =
document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const email =
                document
                .getElementById("email")
                .value
                .trim();

            const password =
                document
                .getElementById("password")
                .value;

            const message =
                document.getElementById("message");

            message.textContent =
                "Signing in...";


            const { error } =
                await supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                });


            if (error) {

                message.textContent =
                    error.message;

                return;
            }


            window.location.href =
                "profile.html";

        }
    );

}


// ==========================
// DISCORD LOGIN
// ==========================

async function discordLogin() {

    const { error } =
        await supabase.auth.signInWithOAuth({
            provider: "discord",
            options: {
                redirectTo:
                    window.location.origin +
                    window.location.pathname
            }
        });

    if (error) {

        console.error(error);

    }

}


const discordLoginButton =
document.getElementById("discordLogin");

if (discordLoginButton) {

    discordLoginButton.addEventListener(
        "click",
        discordLogin
    );

}


const discordRegisterButton =
document.getElementById("discordRegister");

if (discordRegisterButton) {

    discordRegisterButton.addEventListener(
        "click",
        discordLogin
    );

}
