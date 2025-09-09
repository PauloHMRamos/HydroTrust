let menuItem = document.querySelectorAll('.item-menu');
const sairContaDiv = document.getElementById('item-menu-perfil');

function selectLink() {

    menuItem.forEach((item) => {
        item.classList.remove('ativo');
    });

    this.classList.add('ativo');
}


menuItem.forEach((item) => {
    item.addEventListener('click', selectLink);
});


function abrirModal() {
    const modal = document.getElementById('janela-modal');
    modal.classList.add('abrir');
    sairContaDiv.classList.add('red-background');
}

window.addEventListener('click', function (e) {
    const modal = document.getElementById('janela-modal');
    if (e.target.id === 'fechar' || e.target.id === 'janela-modal') {
        modal.classList.remove('abrir');
        sairContaDiv.classList.remove('red-background');
    }
});

// Garante que haverá uma entrada no histórico anterior
window.onload = function () {
    // Adiciona uma entrada ao histórico
    history.pushState(null, null, location.href);

    // Quando o usuário clicar em "voltar"
    window.onpopstate = function () {
        // Força o redirecionamento para a home
        window.location.replace('/SQA/public/index.php');
    };
};


function abrirConfigModal() {
    const modal = document.getElementById('modal-configuracoes');
    modal.classList.add('abrir');
}

window.addEventListener('click', function (e) {
    const modal = document.getElementById('modal-configuracoes');
    if (e.target.id === 'fechar-config' || e.target.id === 'modal-configuracoes') {
        modal.classList.remove('abrir');
    }
});


  // Função que mostra a opção correta e atualiza os ícones
  function mostrarOpcao(nomeOpcao) {
    // Esconder todas as opções
    document.querySelectorAll('.opcao').forEach(div => {
      div.classList.remove('ativo');
    });
    // Remover a classe ativo dos ícones
    document.querySelectorAll('.icone-conf').forEach(icon => {
      icon.classList.remove('ativo');
    });
    // Mostrar a opção selecionada
    const opcaoSelecionada = document.getElementById(nomeOpcao);
    if (opcaoSelecionada) {
      opcaoSelecionada.classList.add('ativo');
    }
    // Colocar a classe ativo no ícone correspondente
    const iconeSelecionado = document.querySelector(`.icone-conf-item[data-opcao="${nomeOpcao}"]`);
    if (iconeSelecionado) {
      iconeSelecionado.classList.add('ativo');
    }
  }

  // Função para configurar os clicks nos ícones
  function configurarClicks() {
    const icones = document.querySelectorAll('.icone-conf-item');
    icones.forEach(icone => {
      icone.addEventListener('click', () => {
        const opcao = icone.dataset.opcao;
        mostrarOpcao(opcao);
      });
    });
  }

  // Inicialização: configurar eventos e mostrar a primeira opção
  window.addEventListener('DOMContentLoaded', () => {
    configurarClicks();
    mostrarOpcao('perfil'); // opção inicial ao carregar a página
  });



let trilho = document.querySelector('#trilho');
let indicador = document.querySelector('.indicador');


trilho.addEventListener('click', function(){
    trilho.classList.toggle('vai')
    modal.classList.toggle('vai')
})


const userOpcoesItems = document.querySelectorAll('.user-opcoes-item');

userOpcoesItems.forEach(item => {
  item.addEventListener('click', function () {
    userOpcoesItems.forEach(i => i.classList.remove('ativo'));
    this.classList.add('ativo');
  });
});

window.addEventListener('popstate', function(event) {
  // Quando o usuário clica no botão voltar do navegador
  // Redireciona para a página inicial
  window.location.href = '/SQA/public/index.php';
});

window.history.pushState(null, "", window.location.href);
window.addEventListener("popstate", function () {
  window.location.href = "/SQA/public/index.php";
});

let iconesConfig = document.querySelectorAll('.icone-conf-item');

function selecionarIcone() {
    iconesConfig.forEach((icone) => {
        icone.classList.remove('ativo');
    });

    this.classList.add('ativo');

    // Mostrar a seção correspondente ao ícone
    const opcao = this.getAttribute('data-opcao');
    document.querySelectorAll('.opcao').forEach(secao => secao.style.display = 'none');
    document.getElementById(opcao).style.display = 'block';
}

// Adiciona o evento de clique em todos os ícones
iconesConfig.forEach((icone) => {
    icone.addEventListener('click', selecionarIcone);
});

// Opcional: ativa o primeiro por padrão ao abrir
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.icone-conf-item[data-opcao="configuracoes"]').click();
});