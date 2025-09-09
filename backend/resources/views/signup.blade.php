<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
  <link rel="stylesheet" href="{{ asset('css/signup.css') }}" />
  <title>Cadastro</title>
</head>
<body>
  <main class="register">
    <div class="register__container">
      <div class="register__left">
        <form action="{{ route('signup.perform') }}" method="POST" class="register__form">
          @csrf
          <div class="register__link-container">
            <a href="{{ url()->previous() }}" class="register__link">
              <i class="bi bi-arrow-left-circle"></i>
              <span class="texto">Voltar</span>
            </a>
          </div>

          <h1 class="form__title">Cadastro</h1>

          <div class="form__content">
            <label for="nome" class="form__label">
              <i class="bi bi-person-fill"></i>
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              class="form__input"
              placeholder="Insira o seu nome de usuário"
              required
              value="{{ old('nome') }}"
            />
          </div>

          <div class="form__content">
            <label for="email" class="form__label">
              <i class="bi bi-envelope"></i>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="form__input"
              placeholder="Insira o seu Email"
              required
              value="{{ old('email') }}"
            />
          </div>

          <div class="form__content">
            <label for="senha" class="form__label">
              <i class="bi bi-lock"></i>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              class="form__input"
              placeholder="Insira a sua senha"
              required
            />
          </div>

          <div class="form__content">
            <label for="confirmar_senha" class="form__label">
              <i class="bi bi-lock"></i>
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              class="form__input"
              placeholder="Confirme a sua senha"
              required
            />
          </div>

          <button class="form__button" type="submit">Cadastrar</button>

          @if ($errors->any())
            <div class="form__error">
              <ul>
                @foreach ($errors->all() as $erro)
                  <li>{{ $erro }}</li>
                @endforeach
              </ul>
            </div>
          @endif

          <p class="form__or">Ou entre com</p>

          <div class="form__media">
            <a href="#" class="form__social-link"><i class="bi bi-google"></i></a>
            <a href="#" class="form__social-link"><i class="bi bi-linkedin"></i></a>
          </div>
        </form>
      </div>

      <div class="register__right">
        <!-- <img src="{{ asset('img/fundo.png') }}" class="cadastro-imagem" alt=""> -->
        <i class="bi bi-person-fill-gear"></i>
      </div>
    </div>
  </main>
</body>
</html>
