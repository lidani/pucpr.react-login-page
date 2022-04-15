import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore/lite";
import React, { useState } from "react";
import { useNavigate } from "react-router";

import logo from "../../assets/logo.svg";

const Register = ({ firebase }) => {
  const [state, setState] = useState({
    status: "",
    timeout: 0,
    loading: false,
  });

  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
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

    if (Object.values(user).some((it) => !it)) {
      return setState({
        ...stateCopy,
        status: "Preencha Todos os Campos!",
      });
    }

    setState({
      ...stateCopy,
      loading: true,
    });

    createUserWithEmailAndPassword(getAuth(firebase), user.email, user.password)
      .then(async (credentials) => {
        const currentUser = credentials.user;

        await updateProfile(currentUser, {
          displayName: `${user.firstName} ${user.lastName}`,
        });

        const db = getFirestore(firebase);

        // grava os dados do usuário no firestore
        setDoc(doc(db, "users", currentUser.uid), {
          birthDate: user.birthDate,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        });

        goToHome(currentUser);
      })
      .catch((error) => {
        console.error(error);

        // nao tirar o erro da tela...
        clearTimeout(stateCopy.timeout);

        return setState({
          ...stateCopy,
          loading: false,
          status: `Erro ao criar conta: ${error}`,
        });
      });
  };

  /**
   * Função que gerencia o setState dos campos de formulário, extraindo o valor de {event}
   * @param {String} name nome do campo destino onde será gravado o valor do input
   * @param {InputEvent} event Evento nativo emitido pelo componente de input
   */
  const onChangeInput = (name, event) => {
    setUser({ ...user, [name]: event.target.value });
  };

  const navigate = useNavigate();
  const goToLogin = () => {
    return navigate("/login");
  };
  const goToHome = (user) => {
    return navigate("/", { state: { user } });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Register</p>
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
                data-testid="firstName"
                type="text"
                className="align-self-center"
                onChange={(event) => onChangeInput("firstName", event)}
                placeholder="Nome"
              />
            </div>

            <div className="row mt">
              <input
                data-testid="lastName"
                type="text"
                className="align-self-center"
                onChange={(event) => onChangeInput("lastName", event)}
                placeholder="Sobrenome"
              />
            </div>

            <div className="row mt">
              <input
                data-testid="birthDate"
                type="date"
                className="align-self-center"
                onChange={(event) => onChangeInput("birthDate", event)}
                placeholder="Nascimento"
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
                onClick={goToLogin}
              >
                Fazer Login
              </button>
              <button
                disabled={state.loading}
                data-testid="register-button"
                type="submit"
                className="mt"
              >
                Criar Conta
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

export default Register;
