import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const setFormCredentials = (credentials) => {
  const email = screen.getByTestId("email");
  const password = screen.getByTestId("password");

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();

  fireEvent.change(email, { target: { value: credentials.email } });
  fireEvent.change(password, { target: { value: credentials.password } });

  return { email, password };
};

test("renders and test success auth", () => {
  render(<App />);

  const credentials = {
    email: "lidanig0@gmail.com",
    password: "abc123.",
  };

  setFormCredentials(credentials);

  const loginButton = screen.getByTestId("login-button");
  const status = screen.getByTestId("status");

  loginButton.click();

  expect(status).toContainHTML("Parabéns, logado com sucesso!");
});

test("renders and test failed auth", () => {
  render(<App />);

  const credentials = {
    email: "lidanig0@gmail.com",
    password: "senha inválida...",
  };

  setFormCredentials(credentials);

  const loginButton = screen.getByTestId("login-button");
  const status = screen.getByTestId("status");

  loginButton.click();

  expect(status).toContainHTML("Credenciais inválidas");
});
