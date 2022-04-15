import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router";

import logo from "../../assets/logo.svg";

const Login = ({ firebase }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    status: "",
    loading: false,

    timeout: 0,
  });

  /**
   * Função que gerencia o submit do formulário de login
   * @param {SubmitEvent} event Evento nativo do submit
   */
  const onSubmit = (event) => {
    event.preventDefault();

    if (state.timeout) {
      clearTimeout(state.timeout);
    }

    const stateCopy = {
      ...state,
      timeout: setTimeout(() => {
        // limpa o status depois de 3s
        setState({
          ...state,
          status: "",
        });
      }, 3000),
    };

    if (!stateCopy.email) {
      return setState({
        ...stateCopy,
        status: "Preencha o email!",
      });
    }

    if (!stateCopy.password) {
      return setState({
        ...stateCopy,
        status: "Preencha a senha!",
      });
    }

    setState({
      ...stateCopy,
      loading: true,
    });

    signInWithEmailAndPassword(
      getAuth(firebase),
      stateCopy.email,
      stateCopy.password
    )
      .then((credential) => {
        goToHome(credential.user);
      })
      .catch((error) => {
        clearTimeout(stateCopy.timeout);

        setState({
          ...stateCopy,
          loading: false,
          status: `Erro ao fazer login: ${error}`,
        });
      });
  };

  /**
   * Função que gerencia o setState dos campos de formulário, extraindo o valor de {event}
   * @param {String} name nome do campo destino onde será gravado o valor do input
   * @param {InputEvent} event Evento nativo emitido pelo componente de input
   */
  const onChangeInput = (name, event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const navigate = useNavigate();
  const goToRegister = () => {
    return navigate("/register");
  };
  const goToHome = (user) => {
    return navigate("/", { state: { user } });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Login</p>
      </header>

      <main>
        <form onSubmit={(event) => onSubmit(event)}>
          <div className="column">
            <div className="row">
              <input
                autoFocus
                data-testid="email"
                type="email"
                className="align-self-center"
                onChange={(event) => onChangeInput("email", event)}
                placeholder="E-mail"
              />
            </div>

            <div className="row mt">
              <input
                data-testid="password"
                type="password"
                className="align-self-center"
                onChange={(event) => onChangeInput("password", event)}
                placeholder="Senha"
              />
            </div>

            <div className="row mt">
              <button
                id="register-button"
                className="mt"
                type="button"
                onClick={goToRegister}
              >
                Criar Conta
              </button>
              <button
                disabled={state.loading}
                data-testid="login-button"
                type="submit"
                className="mt"
              >
                Entrar
              </button>
            </div>
          </div>

          <div data-testid="status" className="text-white">
            {state.status}
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
