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

const form =
document.getElementById("registerForm");

if (!form) {

    alert("ERROR: no encontré registerForm");

} else {

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const message =
            document.getElementById("message");

            message.textContent =
            "Conectando con NØX...";

            const username =
            document.getElementById("username")
            .value
            .trim()
            .toLowerCase();

            const email =
            document.getElementById("email")
            .value
            .trim();

            const password =
            document.getElementById("password")
            .value;

            try {

                const result =
                await supabase.auth.signUp({

                    email: email,

                    password: password,

                    options: {
                        data: {
                            username: username
                        }
                    }

                });

                if (result.error) {

                    throw result.error;

                }

                message.textContent =
                "✓ Cuenta creada correctamente";

                console.log(
                    "Usuario:",
                    result.data.user
                );

            } catch (error) {

                console.error(error);

                message.textContent =
                "ERROR: " +
                error.message;

            }

        }
    );

}
