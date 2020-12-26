import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { login } from "../../services/auth";
import api from '../../services/api';
import './styles.css';
import Logo from "../../images/logo.png";

export default class Login extends Component {
    state = {
        email: '',
        senha: '',
        error: ''
    }

    handleLogin = async e => {
      e.preventDefault();

      const { email, senha } = this.state;
      
      if (!email || !senha) {
        this.setState({ error: "Preencha e-mail e senha para continuar!" });
      } else {
        try {
          const response = await api.post("/usuario/login", { login: email, senha });

          if (response.data.statusCode === 200) {
            if (response.data.usuario.admin) {
              login(response.data.usuario.id); //armazena o token
              console.log(response.data.usuario.id);
              this.props.history.push("/inicio");
            } else {
              this.setState({
                error: 'Esse usuário não tem permissão para acessar a plataforma!'
              });
            }
          } else {
            this.setState({
              error: response.data.message
            });
          }
          
        } catch (err) {
          this.setState({
            error:
              "Houve um problema com o login, verifique suas credenciais."
          });
        }
      }
    };

    render() {
      return (
        <div className="container">
          <form onSubmit={this.handleLogin} className="form-style">
            <div className="div-style">
              <img src={Logo} alt="Logo Magna" />
              <input 
                type="email"
                placeholder="Endereço de E-mail"
                onChange={e => {this.setState({ email: e.target.value })}}
              />
              <input 
                type="password" 
                placeholder="Senha"
                onChange={e => {this.setState({ senha: e.target.value })}}
              />
            </div>
            {this.state.error && <p>{this.state.error}</p>}
            <button type="submit">Entrar</button>
          </form>
        </div>
      );
    }
}