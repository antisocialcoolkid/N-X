import { createClient } from
"https://esm.sh/@supabase/supabase-js@2";

alert("NØX AUTH CARGADO");


const SUPABASE_URL =
"https://asgowauvzfnsszstvzqi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_scsteNa_ILseeQYkL1Olyg_38UMGSZS";


const supabase =
createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =========================
   REGISTER
========================= */

const registerForm =
document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const message =
            document.getElementById("message");


            try {

                message.textContent =
                "1/4 Conectando...";


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


                if (!username) {
                    throw new Error(
                        "Escribe un username."
                    );
                }


                if (!email) {
                    throw new Error(
                        "Escribe tu email."
                    );
                }


                if (!password) {
                    throw new Error(
                        "Escribe una contraseña."
                    );
                }


                if (username.length < 3) {
                    throw new Error(
                        "El username necesita mínimo 3 caracteres."
                    );
                }


                if (password.length < 6) {
                    throw new Error(
                        "La contraseña necesita mínimo 6 caracteres."
                    );
                }


                message.textContent =
                "2/4 Creando cuenta...";


                const {
                    data,
                    error
                } =
                await supabase.auth.signUp({

                    email: email,

                    password: password,

                    options: {

                        data: {
                            username: username
                        }

                    }

                });


                if (error) {

                    throw new Error(
                        "AUTH: " +
                        error.message
                    );

                }


                if (!data.user) {

                    message.textContent =
                    "Revisa tu correo para confirmar la cuenta.";

                    return;

                }


                message.textContent =
                "3/4 Creando perfil...";


                const {
                    error: profileError
                } =
                await supabase
                .from("profiles")
                .insert({

                    id: data.user.id,

                    username: username

                });


                if (profileError) {

                    throw new Error(
                        "PROFILE: " +
                        profileError.message
                    );

                }


                message.textContent =
                "✓ ¡Perfil creado!";


                setTimeout(() => {

                    window.location.href =
                    "profile.html";

                }, 1000);


            } catch (error) {

                console.error(
                    "NØX ERROR:",
                    error
                );


                message.textContent =
                "❌ " +
                error.message;

            }

        }
    );

}


/* =========================
   LOGIN
========================= */

const loginForm =
document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const message =
            document.getElementById("message");


            try {

                message.textContent =
                "Signing in...";


                const email =
                document
                .getElementById("email")
                .value
                .trim();


                const password =
                document
                .getElementById("password")
                .value;


                const {
                    error
                } =
                await supabase
                .auth
                .signInWithPassword({

                    email: email,

                    password: password

                });


                if (error) {

                    throw error;

                }


                window.location.href =
                "profile.html";


            } catch (error) {

                message.textContent =
                "❌ " +
                error.message;

            }

        }
    );

}


/* =========================
   DISCORD
========================= */

async function discordLogin() {

    const message =
    document.getElementById("message");


    try {

        if (message) {

            message.textContent =
            "Connecting to Discord...";

        }


        const {
            error
        } =
        await supabase
        .auth
        .signInWithOAuth({

            provider: "discord",

            options: {

                redirectTo:
                window.location.origin +
                "/N-X/profile.html"

            }

        });


        if (error) {
            throw error;
        }


    } catch (error) {

        if (message) {

            message.textContent =
            "❌ " +
            error.message;

        }

    }

}


/* =========================
   DISCORD BUTTONS
========================= */

const discordRegister =
document.getElementById(
    "discordRegister"
);


if (discordRegister) {

    discordRegister.addEventListener(
        "click",
        discordLogin
    );

}


const discordLoginButton =
document.getElementById(
    "discordLogin"
);


if (discordLoginButton) {

    discordLoginButton.addEventListener(
        "click",
        discordLogin
    );

}
