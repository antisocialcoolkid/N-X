<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>NØX — Login</title>

<link
    rel="stylesheet"
    href="style.css"
>

</head>


<body>


<main class="auth">

    <a
        href="index.html"
        class="logo"
    >
        NØX
    </a>


    <div class="auth-box">

        <h1>
            Welcome back.
        </h1>


        <p>
            Sign in to your NØX profile.
        </p>


        <form
            id="loginForm"
            novalidate
        >

            <label for="email">
                Email
            </label>


            <input
                id="email"
                type="email"
                placeholder="you@email.com"
                autocomplete="email"
                required
            >


            <label for="password">
                Password
            </label>


            <input
                id="password"
                type="password"
                placeholder="••••••••"
                autocomplete="current-password"
                required
            >


            <button
                id="loginButton"
                type="submit"
            >
                Sign in
            </button>

        </form>


        <div class="divider">

            <span>
                OR
            </span>

        </div>


        <button
            id="discordLogin"
            class="discord"
            type="button"
        >
            Continue with Discord
        </button>


        <p class="register">

            Don't have an account?

            <a href="register.html">
                Create one
            </a>

        </p>


        <p
            id="message"
            aria-live="polite"
        ></p>

    </div>

</main>


<script
    src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2">
</script>


<script
    src="auth.js?v=10"
></script>


</body>

</html>
