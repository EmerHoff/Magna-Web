import React, {Component} from 'react';
import api from '../../services/api';
import './styles.css';
import MenuLateral from '../../components/MenuLateral';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, TextField, Snackbar, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
export default class Usuarios extends Component {
    state = {
        usuarios: [],
        propriedades: [],
        abrirVisualizar: false,
        onlyRead: true,
        message: '',
        snackbar: false,

        id: 0,
        login: '',
        senha: '',
        telefone: '',
        nome: '',
        dh_registro: '',
        admin: false,  
    }
    
    componentDidMount() {
      this.loadUsuarios();  
    }

    loadUsuarios = async () => {
      const response = await api.get('/usuario');

      this.setState({ usuarios: response.data.usuarios });
    }

    loadUsuario = async (idUsuario) => {
      const response = await api.get('/usuario/' + idUsuario);

      if (response.data.usuario.dh_registro) {
          response.data.usuario.dh_registro = response.data.usuario.dh_registro.substring(0,16);
      }

      this.setState({id: response.data.usuario.id});
      this.setState({login: response.data.usuario.login});
      this.setState({senha: response.data.usuario.senha});
      this.setState({telefone: response.data.usuario.telefone});
      this.setState({nome: response.data.usuario.nome});
      this.setState({dh_registro: response.data.usuario.dh_registro});
      this.setState({admin: response.data.usuario.admin});
    }

    loadPropriedades = async (idUsuario) => {
      const response = await api.get('/propriedade/listar/' + idUsuario);

      this.setState({ propriedades:  response.data.propriedades });
    }

    handleOpen = (event) => {
      const idUsuario = event.currentTarget.id;

      this.setState({ abrirVisualizar: true });

      this.loadUsuario(idUsuario);
      this.loadPropriedades(idUsuario);
    };

    handleOpenEditar = (event) => {
      const idUsuario = event.currentTarget.id;

      this.setState({ abrirVisualizar: true, onlyRead: false });

      this.loadUsuario(idUsuario);
      this.loadPropriedades(idUsuario);
    };

    handleClose = () => {
      this.setState({ abrirVisualizar: false, onlyRead: true });
    };

    snackbarClose = () => {
      this.setState({ snackbar: false });
    };

    saveUsuario = async () => {
      const idUsuario = this.state.id;

      const response = await api.put('/usuario/' + idUsuario, {
        admin: this.state.admin,
        login: this.state.login,
        senha: this.state.senha,
        nome: this.state.nome,
        telefone: this.state.telefone,
      });

      this.setState({ snackbar: true });
      this.setState({ message: response.data.message })
      this.loadUsuarios();
    }

    cancelUsuario = () => {
      const idUsuario = this.state.id;
      this.loadUsuario(idUsuario);
    }

    deleteUser = () => {

    }

    handleNomeChange = (event) => {
      this.setState({nome: event.target.value});
    };

    render() {
    
      const { usuarios, propriedades } = this.state;

      return (
        <div className="principal">
          <MenuLateral />

          <TableContainer className="table-style">
            <h1>Usuários</h1>
            <Table className={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow className="cabecalho">
                <TableCell align="left">ID</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Telefone</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell align="center">{usuario.id}</TableCell>
                    <TableCell align="center">{usuario.nome}</TableCell>
                    <TableCell align="center">{usuario.login}</TableCell>
                    <TableCell align="center">{usuario.telefone}</TableCell>
                    <TableCell align="center">
                      <Button id={usuario.id} variant="outlined" className="table-button" onClick={this.handleOpen}>Visualizar</Button>
                      <Button id={usuario.id} variant="outlined" className="table-button" onClick={this.handleOpenEditar}>Editar</Button>
                      <Button id={usuario.id} variant="outlined" className="table-button" onClick={this.deleteUser}>Excluir</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Modal
            open={this.state.abrirVisualizar}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {
              <div className="modalVisualizar">
                  <h1>Informações do Usuário</h1>
                  <form className="formulario" noValidate autoComplete="off">
                    <div>
                      <TextField 
                        className="formulario-campo"
                        label="Nome"
                        value={this.state.nome}
                        onChange={(event) => {
                          this.setState({nome: event.target.value});
                        }}
                        InputProps={{
                          readOnly: this.state.onlyRead,
                          className: "formulario-campo"
                        }}
                      />
                      <TextField
                        label="Senha"
                        type="password"
                        autoComplete="current-password"
                        value={this.state.senha}
                        onChange={(event) => {
                          this.setState({senha: event.target.value});
                        }}
                        InputProps={{
                          readOnly: this.state.onlyRead,
                          className: "formulario-campo"
                        }}
                      />
                      <div className="separador">
                      <TextField 
                        label="E-mail"
                        type="email"
                        value={this.state.login}
                        onChange={(event) => {
                          this.setState({login: event.target.value});
                        }}
                        InputProps={{
                          readOnly: this.state.onlyRead,
                          className: "formulario-campo-email"
                        }}
                      />
                      </div>
                    </div>
                    <div className="separador">
                      <TextField 
                        label="Telefone"
                        type="telephone"
                        value={this.state.telefone}
                        onChange={(event) => {
                          this.setState({telefone: event.target.value});
                        }}
                        InputProps={{
                          readOnly: this.state.onlyRead,
                          className: "formulario-campo"
                        }}
                      />
                      <TextField
                        label="Data/Hora Registro"
                        type="datetime-local"
                        value={this.state.dh_registro}
                        InputLabelProps={{
                          readOnly: true,
                          className: "formulario-campo"
                        }}
                      />
                    </div>
                  </form>
                  <div className="salvar-cancelar-botoes">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={this.state.onlyRead}
                    onClick={this.saveUsuario}
                    startIcon={<SaveIcon />}>
                     Salvar
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    disabled={this.state.onlyRead}
                    onClick={this.cancelUsuario}
                    startIcon={<CancelIcon />}>
                     Cancelar
                  </Button>
                  </div>

                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    open={this.state.snackbar}
                    autoHideDuration={6000}
                    onClose={this.snackbarClose}
                    message="Salvo com Sucesso!"
                    action={
                      <React.Fragment>
                        <Button color="secondary" size="small" onClick={this.snackbarClose}>
                          OK
                        </Button>
                      </React.Fragment>
                    }
                  />

                <h1>Propriedades</h1>
                <div className="tabela-propriedades">
                  <TableContainer>
                    
                    <Table className="modal-style" aria-label="simple table">
                      <TableHead>
                        <TableRow className="cabecalho">
                        <TableCell align="left">ID</TableCell>
                          <TableCell align="center">Nome</TableCell>
                          <TableCell align="center">Endereço</TableCell>
                          <TableCell align="center">Comarca</TableCell>
                          <TableCell align="center">Matrícula</TableCell>
                          <TableCell align="center">Área</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {propriedades.map((propriedade) => (
                          <TableRow key={propriedade.id}>
                            <TableCell align="th">{propriedade.id}</TableCell>
                            <TableCell align="center">{propriedade.nome}</TableCell>
                            <TableCell align="center">{propriedade.endereco}</TableCell>
                            <TableCell align="center">{propriedade.comarca}</TableCell>
                            <TableCell align="center">{propriedade.matricula}</TableCell>
                            <TableCell align="center">{propriedade.area}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            }
          </Modal>

        </div>
      );
    }
}