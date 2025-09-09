<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="{{ asset('css/login.css') }}" />
    <script src="{{ asset('js/login.js') }}" defer></script>
    <title>Login</title>
</head>
<body>
    <main class="login">
        <div class="login__container">
            <div class="login__left">
                <form method="POST" action="{{ route('login.perform') }}" class="login__form">
                    @csrf
                    <div class="login__form__inner">
                        <a href="{{ url()->previous() }}" class="login__link">
                            <i class="bi bi-arrow-left-circle"></i>
                            <span class="texto">Voltar</span>
                        </a>
                        <h1 class="form__title">Login</h1>

                        <div class="form__content">
                            <label for="email" class="form__label">
                                <i class="bi bi-envelope"></i>
                            </label>
                            <input type="email" id="email" name="email" class="form__input" placeholder="Insira o seu Email" required />
                        </div>

                        <div class="form__content">
                            <label for="senha" class="form__label">
                                <i class="bi bi-lock"></i>
                            </label>
                            <input type="password" id="password" name="password" class="form__input" placeholder="Insira a sua senha" required />
                        </div>

                        <div class="form__forgot">
                            <a href="#" class="form__link">Esqueceu a senha?</a>
                        </div>

                        <button class="form__button" id="form__button" name="form_button" type="submit">Entrar</button>

                       @error('email')
                        <p class="erro-mensagem">{{ $message }}</p>
                        @enderror

                        <p class="form__or">Ou entre com</p>

                        <div class="form__media">
                            <a href="#" class="form__social-link"><i class="bi bi-google"></i></a>
                            <a href="#" class="form__social-link"><i class="bi bi-linkedin"></i></a>
                        </div>

                        <div class="form__account">
                            <p>Não tem uma conta? <a href="{{ route('signup.show') }}">Crie uma agora</a>.</p>
                        </div>
                    </div>
                </form>
            </div>

            <div class="login__right">
                <!-- <img src="{{ asset('img/fundo.png') }}" class="cadastro-imagem" alt=""> -->
                <i class="bi bi-person-fill-gear"></i>
            </div>
        </div>
    </main>
</body>
</html>
