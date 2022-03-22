import React from "react";

import logo from "../assets/logo.svg";
import "./App.css";

class App extends React.Component {
  // inicia o state
  state = {
    email: "",
    password: "",
    status: "",

    timeout: 0,
  };

  /**
   * Função que gerencia o submit do formulário de login
   * @param {SubmitEvent} event Evento nativo do submit
   */
  onSubmit(event) {
    event.preventDefault();

    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }

    const state = {
      ...this.state,
      timeout: setTimeout(() => {
        // limpa o status depois de 3s
        this.setState({
          ...this.state,
          status: "",
        });
      }, 3000),
    };

    if (!state.email) {
      return this.setState({
        ...state,
        status: "Preencha o email!",
      });
    }

    if (!state.password) {
      return this.setState({
        ...state,
        status: "Preencha a senha!",
      });
    }

    if (state.email !== "lidanig0@gmail.com" || state.password !== "abc123.") {
      return this.setState({
        ...state,
        status: "Credenciais inválidas",
      });
    }

    // quando logar, não retirar a mensagem de status
    clearTimeout(state.timeout);

    return this.setState({
      ...state,
      status: "Parabéns, logado com sucesso!",
    });
  }

  /**
   * Função que gerencia o setState dos campos de formulário, extraindo o valor de {event}
   * @param {String} name nome do campo destino onde será gravado o valor do input
   * @param {InputEvent} event Evento nativo emitido pelo componente de input
   */
  onChangeInput(name, event) {
    this.setState({ ...this.state, [name]: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Login</p>
        </header>

        <main>
          <form onSubmit={(event) => this.onSubmit(event)}>
            <div className="column">
              <div className="row">
                <input
                  autoFocus
                  data-testid="email"
                  type="email"
                  className="align-self-center"
                  onChange={(event) => this.onChangeInput("email", event)}
                  placeholder="E-mail"
                />
              </div>

              <div className="row mt">
                <input
                  data-testid="password"
                  type="password"
                  className="align-self-center"
                  onChange={(event) => this.onChangeInput("password", event)}
                  placeholder="Senha"
                />
              </div>

              <button data-testid="login-button" type="submit" className="mt">
                Entrar
              </button>
            </div>

            <div data-testid="status" className="text-white">
              {this.state.status}
            </div>
          </form>
        </main>
      </div>
    );
  }
}

export default App;
