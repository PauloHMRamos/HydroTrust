import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/css/index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import dispo from '../assets/images/dispo.png';
import dispositivo from '../assets/images/Dispositivo.jpg';
import logo from '../assets/images/Logo.png';

function Index() {
  const navigate = useNavigate();
  const [headerHidden, setHeaderHidden] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const isAtBottom = (windowHeight + currentScrollY) >= (documentHeight - 5);

      if (isScrollingDown) {
        setHeaderHidden(true);
      } else {
        setHeaderHidden(false);
      }

      if (isAtBottom) {
        setHeaderHidden(false);
      }

      lastScrollY.current = currentScrollY;

      const sections = Array.from(document.querySelectorAll('[id]'));
      let foundActive = null;

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        const id = sec.getAttribute('id');
        if (id === 'footer' && isAtBottom) {
          foundActive = id;
        } else if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
          foundActive = id;
        }
      });

      if (foundActive !== activeLink && foundActive !== null) {
        setActiveLink(foundActive);
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 50);

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [activeLink]);

  useEffect(() => {
    const menuItems = Array.from(document.querySelectorAll('.header__nav-link'));

    const handleClick = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const id = href.substring(1);
      setActiveLink(id);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    menuItems.forEach((item) => item.addEventListener('click', handleClick));
    return () => {
      menuItems.forEach((item) => item.removeEventListener('click', handleClick));
    };
  }, []);

  return (
    <>
      <header className={`header ${headerHidden ? 'header--hidden' : ''}`}>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <a href="#hero" className={`header__nav-link ${activeLink === 'hero' ? 'header__nav-link--active' : ''}`}>Início</a>
            </li>
            <li className="header__nav-item">
              <a href="#about" className={`header__nav-link ${activeLink === 'about' ? 'header__nav-link--active' : ''}`}>Sobre</a>
            </li>
            <li className="header__nav-item">
              <a href="#highlight" className={`header__nav-link ${activeLink === 'highlight' ? 'header__nav-link--active' : ''}`}>Destaques</a>
            </li>
            <li className="header__nav-item">
              <a href="#footer" className={`header__nav-link ${activeLink === 'footer' ? 'header__nav-link--active' : ''}`}>Contato</a>
            </li>
          </ul>
          <div className="header__nav-buttons">
            <Link to="/login" className="header__button">Iniciar Sessão</Link>
            <Link to="/signup" className="header__button">Cadastrar-se</Link>
          </div>
        </nav>
      </header>

      <main className="main">
        <section className="hero" id="hero">
          <div className="hero__content">
            <h1 className="hero__title">Conheça o <span></span></h1>
            <p className="hero__text">
              Acompanhamento em tempo real de parâmetros como pH e turbidez para garantir água potável, segura e dentro dos padrões. Ideal para estações, redes de abastecimento e comunidades.
            </p>
            <a href="#" className="hero__link">Saiba Mais</a>
          </div>
          <img src={dispo} alt="Dispositivo" className="hero__image" />
        </section>

        <section className="about" id="about">
          <div className="about__background" data-aos="fade-right">
            <img src={dispositivo} alt="Dispositivo" className="about__image" />
            <div className="about__content">
              <h3 className="about__title">O Que é</h3>
              <h3 className="about__subtitle">Monitore a Qualidade de sua Água</h3>
              <p className="about__text">
                O SQMA monitora em tempo real a potabilidade da água, avaliando parâmetros como pH e turbidez. As informações são enviadas para a
                plataforma oficial do dispositivo, acessível ao fazer login neste site, onde você pode acompanhar, comparar e analisar os dados obtidos, garantindo o controle da água para consumo.
              </p>
              <a href="#" className="about__link">Saiba Mais</a>
            </div>
          </div>
        </section>

        <section className="highlights" id="highlight" data-aos="fade-up">
          <div className="highlights__content">
            <h2 className="highlights__title">Revolucione o Gerenciamento da Água</h2>
            <p className="highlights__text">
              Soluções inteligentes e precisas para transformar a forma como você lida com recursos hídricos.
            </p>
          </div>

          <div className="highlights__line">
            <span className="highlights__line-decor"></span>

            <div className="highlights__points">
              <div className="highlights__point">
                <i className="bi bi-bullseye"></i>
                <h3 className="highlights__point-title">Medições precisas</h3>
                <p className="highlights__point-text">Monitoramento em tempo real com alta confiabilidade.</p>
              </div>
              <div className="highlights__point">
                <i className="bi bi-lightning-charge"></i>
                <h3 className="highlights__point-title">Eficiência energética</h3>
                <p className="highlights__point-text">Reduza custos operacionais com consumo otimizado.</p>
              </div>
              <div className="highlights__point">
                <i className="bi bi-bell"></i>
                <h3 className="highlights__point-title">Alertas inteligentes</h3>
                <p className="highlights__point-text">Notificações proativas de uso e vazamentos.</p>
              </div>
              <div className="highlights__point">
                <i className="bi bi-person-gear"></i>
                <h3 className="highlights__point-title">Controle total</h3>
                <p className="highlights__point-text">Gestão simplificada via aplicativo ou dashboard.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="footer">
        <div className="footer__section">
          <span className="footer__logo-container">
            <img src={logo} alt="Logo" className="footer__logo" />
            <p className="footer__text"></p>
          </span>
        </div>

        <div className="footer__section">
          <h2 className="footer__title">Termos de Serviço</h2>
          <a href="#" className="footer__link">Política de Privacidade</a>
          <a href="#" className="footer__link">Termos de Uso</a>
          <a href="#" className="footer__link">Cookies</a>
          <a href="#" className="footer__link">LGPD: Proteção de Dados</a>
        </div>

        <div className="footer__section">
          <h2 className="footer__title">Contato</h2>
          <p className="footer__text">Email: .ti@gmail.com</p>
          <a href="#" className="footer__link">Suporte</a>
        </div>

        <div className="footer__section">
          <h2 className="footer__title">Informações Legais</h2>
          <p className="footer__text">© 2025 . Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default Index;
