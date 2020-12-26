import React, {Component} from 'react';
import api from '../../services/api';

import './styles.css';

export default class Usuario extends Component {
  state = {
    usuario: {},
  } 

  async componentDidMount() {
    const { id } = this.props.match.params;
    
    const response = await api.get(`/usuario/${id}`);

    this.setState({ usuario: response.data.usuario });
  }
  
  render() {
      const { usuario } = this.state;
      return (
        <div className="usuario-info">
          <h1>Nome: {usuario.nome}</h1>
          <p><h1>Email: {usuario.login}</h1></p>
          <p><h1>Telefone: {usuario.telefone}</h1></p>
        </div>
      );
    }
}