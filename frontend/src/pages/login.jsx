import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../assets/css/login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromLogout = location.state?.fromLogout || false;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'http://localhost:8000/api';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !fromLogout) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, fromLogout]);

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!isEmailValid(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    if (!password) {
      setError('Por favor, insira sua senha.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const messages = Object.values(data.errors).flat().join(' ');
          setError(messages);
        } else if (data.message) {
          setError(data.message);
        } else {
          setError('Erro desconhecido ao tentar fazer login.');
        }
        setLoading(false);
        setPassword('');
        return;
      }

      localStorage.setItem('token', data.token);
      navigate('/dashboard', { replace: true });

    } catch (error) {
      setError('Erro na comunicação com o servidor.');
      setLoading(false);
      setPassword('');
    }
  }

  return (
    <main className="login">
      <div className="login__container">
        <div className="login__side login__side--left">
          <form onSubmit={handleSubmit} className="login__form" noValidate>
            <button
              type="button"
              className="login__back-button"
              onClick={() => navigate('/', { replace: true })}
              disabled={loading}
            >
              <i className="bi bi-arrow-left-circle"></i>
              <span className="login__back-button-text">Voltar</span>
            </button>

            <div className="login__form-inner">
              <div className="login__form-title-container">
                <h1 className="login__form-title">Login</h1>
              </div>

              <div className="login__form-group">
                <i className="bi bi-envelope login__form-icon"></i>
                <input
                  type="email"
                  className="login__form-input"
                  id="email"
                  name="email"
                  placeholder="Insira o seu Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="login__form-group">
                <i className="bi bi-lock login__form-icon"></i>
                <input
                  type="password"
                  className="login__form-input"
                  id="password"
                  name="password"
                  placeholder="Insira a sua senha"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="login__form-forgot">
                <a href="#" className="login__form-link">Esqueceu a senha?</a>
              </div>

              <button
                className="login__form-button"
                id="login__form-button"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

              {error && <p className="login__error-message" role="alert">{error}</p>}

              <div className="login__form-account">
                <p>
                  Não tem uma conta?{' '}
                  <Link to="/signup" className="login__form-account-link">Crie uma agora</Link>.
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="login__side login__side--right">
          <i className="bi bi-person-fill-gear"></i>
        </div>
      </div>
    </main>
  );
}
