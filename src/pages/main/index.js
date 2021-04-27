import React, {Component} from 'react';

import api from '../../services/api';
import './styles.css';
import MenuLateral from '../../components/MenuLateral';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Modal } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import UploadFile from '../../components/UploadFile';
export default class Main extends Component {
    state = {
        usuarios: [],
    }
    
    componentDidMount() {
      this.loadUsuarios();  
    }

    loadUsuarios = async (page = 1) => {
      const response = await api.get('/usuario');

      const { usuarios, ...usuariosInfo } = response.data;

      this.setState({ usuarios, usuariosInfo, page });
    }

    render() {
    
      const { usuarios } = this.state;

      return (
        <div className="principal">
          <MenuLateral />
          <h1>Tela Inicial</h1>
        </div>
      );
    }
}