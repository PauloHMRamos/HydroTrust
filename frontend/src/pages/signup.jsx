import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/signup.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Signup() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'http://localhost:8000/api';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  function validate() {
    const errs = [];
    if (!nome.trim()) errs.push('O nome é obrigatório.');
    if (password.length < 6) errs.push('A senha deve ter pelo menos 6 caracteres.');
    if (password !== passwordConfirmation) errs.push('A confirmação da senha não confere.');
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          setErrors(errorMessages);
        } else if (data.message) {
          setErrors([data.message]);
        } else {
          setErrors(['Erro inesperado']);
        }
        setLoading(false);
        return;
      }

      alert('Cadastro realizado com sucesso!');
      navigate('/login', { replace: true });

    } catch (error) {
      setErrors(['Erro na comunicação com o servidor']);
      setLoading(false);
    }
  }

return (
  <main className="signup">
    <div className="signup__container">
      <div className="signup__side signup__side--left">
        <form onSubmit={handleSubmit} className="signup__form" noValidate>
          <div className="signup__form-inner">
            <button type="button" className="signup__back-button" onClick={() => window.history.back()} disabled={loading}>
              <i className="bi bi-arrow-left-circle"></i>
              <span className="signup__back-button-text">Voltar</span>
            </button>

            <h1 className="signup__title">Cadastro</h1>

            <div className="signup__form-group">
              <i className="bi bi-person-fill signup__icon"></i>
              <input type="text" className="signup__input" id="nome" name="nome" placeholder="Insira o seu nome de usuário" required value={nome} onChange={e => setNome(e.target.value)} disabled={loading} autoComplete="name" />
            </div>

            <div className="signup__form-group">
              <i className="bi bi-envelope signup__icon"></i>
              <input type="email" className="signup__input" id="email" name="email" placeholder="Insira o seu Email" required value={email} onChange={e => setEmail(e.target.value)} disabled={loading} autoComplete="email" />
            </div>

            <div className="signup__form-group">
              <i className="bi bi-lock signup__icon"></i>
              <input type="password" className="signup__input" id="password" name="password" placeholder="Insira a sua senha" required value={password} onChange={e => setPassword(e.target.value)} disabled={loading} autoComplete="new-password" />
            </div>

            <div className="signup__form-group">
              <i className="bi bi-lock signup__icon"></i>
              <input type="password" className="signup__input" id="password_confirmation" name="password_confirmation" placeholder="Confirme a sua senha" required value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} disabled={loading} autoComplete="new-password" />
            </div>

            <button className="signup__button" type="submit" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>

            {errors.length > 0 && (
              <div className="signup__error" role="alert">
                <ul>
                  {errors.map((erro, i) => (
                    <li key={i}>{erro}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="signup__side signup__side--right">
        <i className="bi bi-person-fill-gear"></i>
      </div>
    </div>
  </main>
);
}

export default Signup;