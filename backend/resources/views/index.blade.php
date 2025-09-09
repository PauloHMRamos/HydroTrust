<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="{{ asset('css/index.css') }}" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <script src="{{ asset('js/script.js') }}" defer></script>
    <title></title>
</head>
<body>
    <header class="header">
        <nav class="nav">
            <ul class="nav__list">
                <li class="nav__item"><a href="#hero" class="nav__link ativo">Início</a></li>
                <li class="nav__item"><a href="#about" class="nav__link">Produto</a></li>
                <li class="nav__item"><a href="#highlight" class="nav__link">Destaques </a></li>
                <li class="nav__item"><a href="#footer" class="nav__link">Contato</a></li>
            </ul>
           <div class="nav__buttons">
                <a href="{{ route('login.show') }}" class="nav__button">Iniciar Sessão</a>
                <a href="{{ route('signup.show') }}" class="nav__button">Cadastrar-se</a>
           </div>
        </nav>
    </header>

    <main class="main">
        <section class="hero" id="hero">
            <div class="hero__content">
                <h1 class="hero__title">Apresentação</h1>
                <h1 class="hero__subtitle">Conheça o <span></span></h1>
                <p class="hero__text">
                    Acompanhamento em tempo real de parâmetros como pH e turbidez para garantir água potável, segura e dentro dos padrões. Ideal para estações, redes de abastecimento e comunidades.
                </p>
                <a href="#" class="hero__link">Saiba Mais</a>
            </div>
            <img src="{{ asset('images/dispo.png') }}" alt="Dispositivo SMQA" class="hero__image" />
        </section>

        <section class="about" id="about">
            <div class="about-fundo"  data-aos="fade-right">
                <img src="{{ asset('images/Dispositivo.jpg') }}" alt="Dispositivo" class="about__img" />
                <div class="about__content">
                    <h3 class="about__title">O Que é</h3>
                    <h3 class="about__subtitle">Monitore a Qualidade de sua Água</h3>
                    <p class="about__text">
                        O SQMA monitora em tempo real a potabilidade da água, avaliando parâmetros como pH e turbidez. As informações são enviadas para a
                        plataforma oficial do dispositivo, acessível ao fazer login neste site, onde você pode acompanhar, comparar e analisar os dados obtidos, garantindo o controle da água para consumo.
                    </p>
                    <a href="#" class="about__link">Saiba Mais</a>
                </div>
            </div>
        </section>

        <section class="highlights" id="highlight" data-aos="fade-up">
            <div class="highlights__content">
                <h2 class="highlights__title">Revolucione o Gerenciamento da Água</h2>
                <p class="highlights__text">
                    Soluções inteligentes e precisas para transformar a forma como você lida com recursos hídricos.
                </p>
            </div>

            <div class="highlight-line">
                <span class="line"></span>

                <div class="highlight-points">
                    <div class="highlight-point">
                        <i class="bi bi-bullseye"></i>
                        <h3>Medições precisas</h3>
                        <p>Monitoramento em tempo real com alta confiabilidade.</p>
                    </div>
                    <div class="highlight-point">
                        <i class="bi bi-lightning-charge"></i>
                        <h3>Eficiência energética</h3>
                        <p>Reduza custos operacionais com consumo otimizado.</p>
                    </div>
                    <div class="highlight-point">
                        <i class="bi bi-bell"></i>
                        <h3>Alertas inteligentes</h3>
                        <p>Notificações proativas de uso e vazamentos.</p>
                    </div>
                    <div class="highlight-point">
                        <i class="bi bi-person-gear"></i>
                        <h3>Controle total</h3>
                        <p>Gestão simplificada via aplicativo ou dashboard.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer" id="footer">
        <div class="footer__content">
            <span class="footer-image">
                <img src="{{ asset('images/Logo.png') }}" class="footer-logo" alt="">
                <p class="footer__text"></p>
            </span>
        </div>

        <div class="footer__content">
            <h2 class="footer__title">Termos de Serviço</h2>
            <a href="#" class="footer__link">Política de Privacidade</a>
            <a href="#" class="footer__link">Termos de Uso</a>
            <a href="#" class="footer__link">Cookies</a>
            <a href="#" class="footer__link">LGPD: Proteção de Dados</a>
        </div>

        <div class="footer__content">
            <h2 class="footer__title">Contato</h2>
            <p class="footer__text">Email: .ti@gmail.com</p>
            <a href="#" class="footer__link">Suporte</a>
        </div>

        <div class="footer__content">
            <h2 class="footer__title">Informações  Legais</h2>
            <p class="footer__text">© 2025 . Todos os direitos reservados.</p>
        </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
</body>
</html>
