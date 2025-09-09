import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import "../../assets/css/dashboard.css";
import "../../assets/css/settings.css";
import "../../assets/css/graphics.css";
import logo from '../../assets/images/Logo.png';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [activeConfigSection, setActiveConfigSection] = useState('gear');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    let hasReloaded = false;
    window.history.pushState(null, '', window.location.pathname);

    const onPopState = () => {
      if (!hasReloaded) {
        hasReloaded = true;
        window.location.reload();
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [navigate]);

  useEffect(() => {
    async function fetchUser() {
      const mockUser = { name: 'Nome do Usuário' };
      setUser(mockUser);
    }
    fetchUser();
  }, []);

  if (!user) return <p className="dashboard__loading">Carregando usuário...</p>;

  async function handleLogout(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Usuário não está autenticado.');
      navigate('/login', { replace: true });
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      } else {
        const errorData = await response.json();
        alert('Erro ao fazer logout: ' + (errorData.message || 'Erro desconhecido'));
      }
    } catch {
      alert('Erro na comunicação com o servidor.');
    }
  }

  function handleCreateClick(e) {
    e.preventDefault();
    fileInputRef.current.click();
  }

function handleFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;

      const lines = text.trim().split('\n');
      const parsedData = lines.map(line => {
        const phMatch = line.match(/pH:\s*([\d.]+)/i);
        const turbidezMatch = line.match(/Turbidez:\s*([\d.]+)/i);

        return {
          ph: phMatch ? parseFloat(phMatch[1]) : null,
          turbidez: turbidezMatch ? parseFloat(turbidezMatch[1]) : null
        };
      }).filter(entry => entry.ph !== null && entry.turbidez !== null);

      setFileData(parsedData);
      setActiveTab('dummyFile');

      // Limpa o valor do input para permitir reupload do mesmo arquivo
      e.target.value = null;
    };
    reader.readAsText(file);
  }
}

function DummyGraphics() {
  const phChartRef = useRef(null);
  const turbidezChartRef = useRef(null);
  const phChartInstance = useRef(null);
  const turbidezChartInstance = useRef(null);

  if (!fileData || fileData.length === 0) {
    return <p>Nenhum arquivo carregado. Use "Criar" para carregar dados.</p>;
  }

  useEffect(() => {
    const labels = fileData.map((_, i) => `Medida ${i + 1}`);
    const phData = fileData.map(d => d.ph);
    const turbidezData = fileData.map(d => d.turbidez);

    const maxPh = Math.max(...phData);
    const minPh = Math.min(...phData);
    const maxTurbidez = Math.max(...turbidezData);
    const minTurbidez = Math.min(...turbidezData);

    if (phChartInstance.current) phChartInstance.current.destroy();
    if (turbidezChartInstance.current) turbidezChartInstance.current.destroy();

    phChartInstance.current = new Chart(phChartRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'pH',
          data: phData,
          borderColor: 'blue',
          backgroundColor: 'rgba(0,0,255,0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 4,
        }]
      },
      options: {
        scales: {
          y: {
            min: Math.floor(minPh - 1),
            max: Math.ceil(maxPh + 1),
            title: {
              display: true,
              text: 'pH'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Medições'
            }
          }
        },
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });

    turbidezChartInstance.current = new Chart(turbidezChartRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Turbidez (NTU)',
          data: turbidezData,
          borderColor: 'green',
          backgroundColor: 'rgba(0,128,0,0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 4,
        }]
      },
      options: {
        scales: {
          y: {
            min: Math.floor(minTurbidez - 1),
            max: Math.ceil(maxTurbidez + 1),
            title: {
              display: true,
              text: 'Turbidez (NTU)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Medições'
            }
          }
        },
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });

    return () => {
      if (phChartInstance.current) phChartInstance.current.destroy();
      if (turbidezChartInstance.current) turbidezChartInstance.current.destroy();
    };
  }, [fileData]);

    return (
      <div className="dashboard__graphics-wrapper">
        <div className="dashboard__graphics-left">
          <div className="dashboard__graphics-table">
            <h3 className="dashboard__graphics-title">pH</h3>
            <canvas ref={phChartRef} />
          </div>
        </div>
        <div className="dashboard__graphics-right">
          <div className="dashboard__graphics-table">
            <h3 className="dashboard__graphics-title">Turbidez</h3>
            <canvas ref={turbidezChartRef} />
          </div>
        </div>
        <div className="dashboard__graphics-bottom">
          <div className="dashboard__graphics-message">
            <p>Os gráficos acima mostram os dados carregados do arquivo.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <input
        type="file"
        accept=".txt"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <nav className="dashboard__sidebar">
        <ul className="dashboard__menu-list">
          <li
            className={`dashboard__menu-item ${activeTab === 'home' ? 'dashboard__menu-item--active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <span className="dashboard__menu-icon"><i className="bi bi-house"></i></span>
            <span className="dashboard__menu-text">Início</span>
          </li>
          <li className={`dashboard__menu-item ${activeTab === 'create' ? 'dashboard__menu-item--active' : ''}`}>
            <button
              className="dashboard__btn dashboard__btn--create"
              onClick={handleCreateClick}
              type="button"
            >
              <span className="dashboard__menu-icon"><i className="bi bi-pencil"></i></span>
              <span className="dashboard__menu-text">Criar</span>
            </button>
          </li>
        </ul>

        <ul className="dashboard__menu-list">
          <li
            className={`dashboard__menu-item ${activeTab === 'support' ? 'dashboard__menu-item--active' : ''}`}
            onClick={() => setActiveTab('support')}
          >
            <button className="dashboard__btn dashboard__btn--config" type="button">
              <i className="bi bi-bar-chart"></i>
              <span className="dashboard__menu-text" id="dashboard__menu-text-config">Suporte</span>
            </button>
          </li>
          <li className={`dashboard__menu-item ${activeTab === 'user' ? 'dashboard__menu-item--active' : ''}`}>
            <button className="dashboard__btn dashboard__btn--user" onClick={() => setIsUserModalOpen(true)} type="button">
              <i className="bi bi-person-circle"></i>
              <span className="dashboard__menu-text">{user.name}</span>
              <i className="bi bi-three-dots"></i>
            </button>
          </li>
          <li
            className={`dashboard__menu-item ${activeTab === 'config' ? 'dashboard__menu-item--active' : ''}`}
            onClick={() => setActiveTab('config')}
          >
            <button className="dashboard__btn dashboard__btn--config" type="button">
              <i className="bi bi-gear"></i>
              <span className="dashboard__menu-text" id="dashboard__menu-text-config">Configurações</span>
            </button>
          </li>
        </ul>
      </nav>

      <main className="dashboard__main">
        {activeTab === 'home' && (
          <div className="dashboard__user">
            <div className="dashboard__user-search">
              <input type="text" className="dashboard__user-search-input" placeholder="Pesquisar" />
            </div>
            <section className="dashboard__user-reports">
              <h2 className="dashboard__user-title">Últimos relatórios</h2>
              <div className="dashboard__user-options">
                <p className="dashboard__user-option dashboard__user-option--active">Todos os Arquivos</p>
                <p className="dashboard__user-option">Acessos recentes</p>
                <p className="dashboard__user-option">Favoritos</p>
              </div>
              <div className="dashboard__user-content">
                <p
                  className="dashboard__user-file clickable"
                  onClick={() => setActiveTab('dummyFile')}
                  style={{ color: 'dodgerblue', cursor: 'pointer', marginTop: '10px', fontWeight: '600' }}
                >
                  Arquivo Dummy
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'dummyFile' && <DummyGraphics />}

        {activeTab === 'config' && (
          <div className="dashboard__modal-config">
            <div className="dashboard__modal-config-header">
              <h2 className="dashboard__modal-title">Configurações</h2>
            </div>
            <div className="dashboard__modal-nav">
              <p
                className={`dashboard__modal-config-section ${activeConfigSection === 'gear' ? 'dashboard__modal-config-section--active' : ''}`}
                onClick={() => setActiveConfigSection('gear')}
              >
                Geral
              </p>
              <p
                className={`dashboard__modal-config-section ${activeConfigSection === 'account' ? 'dashboard__modal-config-section--active' : ''}`}
                onClick={() => setActiveConfigSection('account')}
              >
                Perfil
              </p>
              <p
                className={`dashboard__modal-config-section ${activeConfigSection === 'notifications' ? 'dashboard__modal-config-section--active' : ''}`}
                onClick={() => setActiveConfigSection('notifications')}
              >
                Notificações
              </p>
            </div>
            <div className="dashboard__modal-content-container">
              <div className="dashboard__modal-subtitle-container">
                {activeConfigSection === 'gear' && (
                  <>
                    <h3 className="dashboard__modal-subtitle">Configurações Gerais</h3>
                    <p className="dashboard__modal-subtitle-text">Altere a aparência ou veja as diretrizes do site</p>
                  </>
                )}
                {activeConfigSection === 'account' && (
                  <>
                    <h3 className="dashboard__modal-subtitle">Perfil</h3>
                    <p className="dashboard__modal-subtitle-text">Gerencie as informações do seu perfil</p>
                  </>
                )}
                {activeConfigSection === 'notifications' && (
                  <>
                    <h3 className="dashboard__modal-subtitle">Notificações</h3>
                    <p className="dashboard__modal-subtitle-text">Escolha como deseja ser notificado</p>
                  </>
                )}
              </div>
              <div className="dashboard__modal-options-container">
                <div className="dashboard__modal-options">
                  {activeConfigSection === 'gear' && (
                    <>
                      <div className="dashboard__modal-option">
                        <span className="dashboard__modal-option-text">Confira os nossos termos de utilização do site</span>
                        <button className="dashboard__modal-btn dashboard__modal-btn--config" type="button">Termos de Uso</button>
                      </div>
                      <div className="dashboard__modal-option">
                        <span className="dashboard__modal-option-text">Confira os termos relacionados a sua privacidade</span>
                        <button className="dashboard__modal-btn dashboard__modal-btn--config" type="button">Políticas de Privacidade</button>
                      </div>
                      <div className="dashboard__modal-option">
                        <span className="dashboard__modal-option-text">Confira a regulação de dados regente do nosso site</span>
                        <button className="dashboard__modal-btn dashboard__modal-btn--config" type="button">LGPD</button>
                      </div>
                    </>
                  )}
                  {activeConfigSection === 'account' && (
                    <>
                      <div className="dashboard__modal-option">
                        <span className="dashboard__modal-option-text">Alterar nome de usuário</span>
                        <button className="dashboard__modal-btn dashboard__modal-btn--config" type="button">Editar Perfil</button>
                      </div>
                      <div className="dashboard__modal-option">
                        <span className="dashboard__modal-option-text">Alterar senha</span>
                        <button className="dashboard__modal-btn dashboard__modal-btn--config" type="button">Alterar Senha</button>
                      </div>
                    </>
                  )}
                  {activeConfigSection === 'notifications' && (
                    <>
                      <div className="dashboard__modal-option">
                        <span className="dashboard__modal-option-text">Configurar notificações por e-mail</span>
                        <button className="dashboard__modal-btn dashboard__modal-btn--config" type="button">Configurar</button>
                      </div>
                      <div className="dashboard__modal-option">
                        <span className="dashboard__modal-option-text">Configurar notificações push</span>
                        <button className="dashboard__modal-btn dashboard__modal-btn--config" type="button">Configurar</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="dashboard__support">
            <h2>Suporte</h2>
            <p>Aqui vai o conteúdo da área de suporte.</p>
          </div>
        )}
      </main>

      {isUserModalOpen && (
        <div
          className="dashboard__modal-window dashboard__modal-window--open"
          onClick={() => setIsUserModalOpen(false)}
        >
          <div
            className="dashboard__modal-content"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="dashboard__modal-title">Opções</h2>

            <button
              onClick={() => setIsUserModalOpen(false)}
              className="dashboard__btn dashboard__btn--close"
              type="button"
              aria-label="Fechar modal"
           >X</button>
            <button
              onClick={handleLogout}
              className="dashboard__btn dashboard__btn--logout"
              type="button"
            >
              <i className="bi bi-door-open"></i> Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
