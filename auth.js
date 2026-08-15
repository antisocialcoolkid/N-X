import { createClient } from
"https://esm.sh/@supabase/supabase-js@2";


/* =========================
   SUPABASE
========================= */

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
   HELPERS
========================= */

function showMessage(text) {

    const message =
    document.getElementById("message");

    if (message) {
        message.textContent = text;
    }

}


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


            try {

                showMessage(
                    "1/4 Conectando..."
                );


                /* GET DATA */

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


                /* VALIDATION */

                if (!username) {

                    throw new Error(
                        "Escribe un username."
                    );

                }


                if (!email) {

                    throw new Error(
                        "Escribe un email."
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


                /* USERNAME FORMAT */

                if (
                    !/^[a-z0-9_]+$/.test(
                        username
                    )
                ) {

                    throw new Error(
                        "El username solo puede usar letras, números y _."
                    );

                }


                /* =========================
                   CHECK USERNAME
                ========================= */

                showMessage(
                    "1/4 Comprobando username..."
                );


                const {
                    data: existing,
                    error: usernameError
                } = await supabase

                    .from("profiles")

                    .select("username")

                    .eq(
                        "username",
                        username
                    )

                    .maybeSingle();


                if (usernameError) {

                    throw new Error(
                        "PROFILE CHECK: " +
                        usernameError.message
                    );

                }


                if (existing) {

                    throw new Error(
                        "Ese username ya está ocupado."
                    );

                }


                /* =========================
                   CREATE AUTH USER
                ========================= */

                showMessage(
                    "2/4 Creando cuenta..."
                );


                const {
                    data,
                    error
                } = await supabase
                    .auth
                    .signUp({

                        email:
                            email,

                        password:
                            password,

                        options: {

                            data: {

                                username:
                                    username

                            }

                        }

                    });


                if (error) {

                    throw new Error(
                        "AUTH: " +
                        error.message
                    );

                }


                if (!data || !data.user) {

                    throw new Error(
                        "Supabase no devolvió el usuario."
                    );

                }


                const userId =
                    data.user.id;


                /* =========================
                   CREATE PROFILE
                ========================= */

                showMessage(
                    "3/4 Creando perfil..."
                );


                const {
                    error: profileError
                } = await supabase

                    .from("profiles")

                    .insert({

                        id:
                            userId,

                        username:
                            username

                    });


                if (profileError) {

                    throw new Error(
                        "PROFILE: " +
                        profileError.message
                    );

                }


                /* =========================
                   SUCCESS
                ========================= */

                showMessage(
                    "4/4 ¡Perfil creado! ✓"
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "profile.html";

                    },
                    1000
                );

            }


            catch (error) {

                console.error(
                    "NØX ERROR:",
                    error
                );


                showMessage(
                    "❌ " +
                    error.message
                );

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


            try {

                showMessage(
                    "Signing in..."
                );


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

                        email:
                            email,

                        password:
                            password

                    });


                if (error) {

                    throw error;

                }


                window.location.href =
                    "profile.html";

            }


            catch (error) {

                console.error(error);

                showMessage(
                    "❌ " +
                    error.message
                );

            }

        }
    );

}


/* =========================
   DISCORD
========================= */

async function discordLogin() {

    try {

        showMessage(
            "Connecting to Discord..."
        );


        const {
            error
        } =
            await supabase
            .auth
            .signInWithOAuth({

                provider:
                    "discord",

                options: {

                    redirectTo:
                        window.location.origin +
                        "/N-X/profile.html"

                }

            });


        if (error) {

            throw error;

        }

    }

    catch (error) {

        console.error(error);

        showMessage(
            "❌ " +
            error.message
        );

    }

}


/* =========================
   DISCORD BUTTON
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
