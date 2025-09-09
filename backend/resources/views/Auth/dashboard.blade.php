<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <script src="{{ asset('js/reports.js') }}" defer></script>
    <title>Dashboard</title>
</head>
<body>
    <nav class="menu-lateral">
        <ul>
            <li class="item-menu ativo">
                <a href="{{ route('dashboard') }}">
                    <span class="icone-menu"><i class="bi bi-house"></i></span>
                    <span class="texto-menu">Início</span>
                </a>
            </li>
            <li class="item-menu">
                <a href="{{ route('dashboard.create') }}">
                    <span class="icone-menu"><i class="bi bi-pencil"></i></span>
                    <span class="texto-menu">Criar</span>
                </a>
            </li>
        </ul>

        <ul>
            <li class="item-menu">
                <button id="btn" class="btn" onclick="abrirModal()">
                    <div class="sair-conta" id="item-menu-perfil">
                        <i class="bi bi-person-circle"></i>
                        <span class="texto-menu"> {{ $user->name }}</span>
                        <i class="bi bi-three-dots"></i>
                    </div>
                </button>
            </li>

            <div class="janela-modal" id="janela-modal">
                <div class="modal">
                    <button class="fechar" id="fechar" type="button">×</button>
                    <h2>Opções da Conta</h2>

                    <div class="modal-opcoes">
                        <button class="modal-btn config" id="modal-btn-config" onclick="abrirConfigModal()">
                            <i class="bi bi-gear"></i> Configurações
                        </button>

                        <div class="janela-modal-config" id="modal-configuracoes">
                            <div class="modal-config">
                                <button class="fechar" id="fechar-config" type="button">×</button>
                                <h2>Configurações</h2>
                                <div class="modal-opcoes">
                                    <div class="icones-conf">
                                        <i class="bi bi-gear icone-conf-item" id="gear" data-opcao="configuracoes" title="Configurações"></i>
                                        <i class="bi bi-person-circle icone-conf-item" data-opcao="perfil" title="Perfil"></i>
                                        <i class="bi bi-bell icone-conf-item" data-opcao="notificacoes" title="Notificações"></i>
                                    </div>

                                    <div id="perfil" class="opcao">
                                        <h3>Editar Perfil</h3>
                                        <p>Aqui você pode alterar seus dados pessoais.</p>
                                        <div class="modal-opcoes">
                                            <a href="#" class="modal-btn"><i class="bi bi-people-fill"></i> Alterar usuário</a>
                                            <a href="#" class="modal-btn"><i class="bi bi-lock-fill"></i> Alterar Senha</a>
                                        </div>
                                    </div>

                                    <div id="configuracoes" class="opcao">
                                        <h3>Configurações</h3>
                                        <p>Ajuste suas preferências do sistema.</p>

                                        <div class="modal-opcoes">
                                            <div class="modo-escuro">
                                                <p class="modo-escuro-texto">Mudar para Modo Escuro</p>
                                                <div class="trilho" id="trilho">
                                                    <div class="indicador"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal-opcoes">
                                            <button class="modal-btn-opcoes">Termos de Uso</button>
                                        </div>
                                        <div class="modal-opcoes">
                                            <button class="modal-btn-opcoes">Políticas de Privacidade</button>
                                        </div>
                                        <div class="modal-opcoes">
                                            <button class="modal-btn-opcoes">LGPD</button>
                                        </div>
                                    </div>

                                    <div id="notificacoes" class="opcao">
                                        <h3>Notificações</h3>
                                        <p>Gerencie suas notificações.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form action="{{ route('logout') }}" method="POST">
                            @csrf
                            <button type="submit" class="modal-btn sair">
                                <i class="bi bi-door-open"></i> Sair
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <li class="item-menu">
                <a href="#">
                    <span class="icone-menu"><i class="bi bi-gear"></i></span>
                    <span class="texto-menu">Configurações</span>
                </a>
            </li>
        </ul>
    </nav>

    <main class="main">
        <div class="user">
            <div class="user__search">
                <input type="text" class="user__search-input" placeholder="Pesquisar" />
            </div>

            <section class="user__reports">
                <h2 class="user__title">Últimos relatórios</h2>

                <div class="user-opcoes">
                    <p class="user-opcoes-item ativo">Todos os Arquivos</p>
                    <p class="user-opcoes-item">Acessos recentes</p>
                    <p class="user-opcoes-item">Favoritos</p>
                </div>

                <div class="user__content">
                    {{-- Conteúdo dos relatórios aqui --}}
                </div>
            </section>
        </div>
    </main>

    <script>
        // Seu script para abrir/fechar modal aqui
    </script>
</body>
</html>
