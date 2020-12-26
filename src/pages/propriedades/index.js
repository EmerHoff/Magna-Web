import React, {Component} from 'react';

import api from '../../services/api';
import './styles.css';
import MenuLateral from '../../components/MenuLateral';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, TextField, Snackbar, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

export default class Propriedades extends Component {
    state = {
        propriedades: [],
        abrirVisualizar: false,
        onlyRead: true,
        snackbar: false,

        id: 0,
        nome: '',
        endereco: '',
        comarca: '',
        matricula: '',
        area: 0,
        nomeProprietario: ''
    }
    
    componentDidMount() {
      this.loadPropriedades();  
    }

    loadPropriedades = async () => {
      const response = await api.get('/propriedade/listar');

      this.setState({ propriedades:  response.data.propriedades});
    }

    handleClose = () => {
      this.setState({ abrirVisualizar: false, onlyRead: true });
    };

    snackbarClose = () => {
      this.setState({ snackbar: false });
    };

    handleOpen = (event) => {
      const idPropriedade = event.currentTarget.id;

      this.setState({ abrirVisualizar: true });

      this.loadPropriedade(idPropriedade);
      //this.loadPropriedades(idPropriedade); talhoes
    };

    handleOpenEditar = (event) => {
      const idPropriedade = event.currentTarget.id;

      this.setState({ abrirVisualizar: true, onlyRead: false });

      this.loadPropriedade(idPropriedade);
      //this.loadPropriedades(idPropriedade); talhoes
    };

    deletePropriedade = () => {

    }

    loadPropriedade = async (idPropriedade) => {
      const response = await api.get('/propriedade/' + idPropriedade);

      this.setState({id: response.data.propriedade.id});
      this.setState({nome: response.data.propriedade.nome});
      this.setState({endereco: response.data.propriedade.endereco});
      this.setState({comarca: response.data.propriedade.comarca});
      this.setState({matricula: response.data.propriedade.matricula});
      this.setState({area: response.data.propriedade.area});
      this.setState({nomeProprietario: response.data.propriedade.usuario.nome});
    }

    savePropriedade = async () => {
      console.log('save');
      const idPropriedade = this.state.id;

      console.log(idPropriedade);

      const response = await api.put('/propriedade/' + idPropriedade, {
        nome: this.state.nome,
        endereco: this.state.endereco,
        comarca: this.state.comarca,
        matricula: this.state.matricula,
        area: this.state.area,
      });

      console.log(response);

      this.setState({ snackbar: true });
      this.setState({ message: response.data.message })
      this.loadPropriedades();
    }

    cancelPropriedade = () => {
      const idPropriedade = this.state.id;
      this.loadPropriedade(idPropriedade);
    }

    render() {
      const { propriedades } = this.state;
      return (
        <div className="principal">
          <MenuLateral />
          
          <TableContainer className="table-style">
            <h1>Propriedades</h1>
            <Table className={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Endereco</TableCell>
                  <TableCell align="center">Comarca</TableCell>
                  <TableCell align="center">Matrícula</TableCell>
                  <TableCell align="center">Proprietário</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {propriedades.map((propriedade) => (
                  <TableRow key={propriedade.id}>
                    <TableCell align="center">{propriedade.id}</TableCell>
                    <TableCell align="center">{propriedade.nome}</TableCell>
                    <TableCell align="center">{propriedade.endereco}</TableCell>
                    <TableCell align="center">{propriedade.comarca}</TableCell>
                    <TableCell align="center">{propriedade.matricula}</TableCell>
                    <TableCell align="center">{propriedade.usuario.nome}</TableCell>
                    <TableCell align="center">
                    <Button id={propriedade.id} variant="outlined" className="table-button" onClick={this.handleOpen}>Visualizar</Button>
                      <Button id={propriedade.id} variant="outlined" className="table-button" onClick={this.handleOpenEditar}>Editar</Button>
                      <Button id={propriedade.id} variant="outlined" className="table-button" onClick={this.deletePropriedade}>Excluir</Button>
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
                        label="Endereço"
                        value={this.state.endereco}
                        onChange={(event) => {
                          this.setState({endereco: event.target.value});
                        }}
                        InputProps={{
                          readOnly: this.state.onlyRead,
                          className: "formulario-campo"
                        }}
                      />
                      <div className="separador">
                      <TextField 
                        label="Comarca"
                        value={this.state.comarca}
                        onChange={(event) => {
                          this.setState({comarca: event.target.value});
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
                        label="Matrícula"
                        value={this.state.matricula}
                        onChange={(event) => {
                          this.setState({matricula: event.target.value});
                        }}
                        InputProps={{
                          readOnly: this.state.onlyRead,
                          className: "formulario-campo"
                        }}
                      />
                      <TextField
                        label="Área"
                        type="number"
                        value={this.state.area}
                        onChange={(event) => {
                          this.setState({area: event.target.value});
                        }}
                        InputLabelProps={{
                          readOnly: this.state.onlyRead,
                          className: "formulario-campo"
                        }}
                      />
                      </div>
                      <div className="separador">
                      <TextField 
                        className="formulario-campo"
                        label="Proprietário"
                        value={this.state.nomeProprietario}
                        InputProps={{
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
                    onClick={this.savePropriedade}
                    startIcon={<SaveIcon />}>
                     Salvar
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    disabled={this.state.onlyRead}
                    onClick={this.cancelPropriedade}
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

                <h1>Talhões</h1>
                <div className="tabela-propriedades">
                  <TableContainer>
                    <Table className="modal-style" aria-label="simple table">
                      <TableHead>
                        <TableRow className="cabecalho">
                        <TableCell align="left">ID</TableCell>
                          <TableCell align="center">KML</TableCell>
                          <TableCell align="center">Número do Talhão</TableCell>
                          <TableCell align="center">Semeadura</TableCell>
                          <TableCell align="center">Dias do Plantio</TableCell>
                          <TableCell align="center">Área</TableCell>
                        </TableRow>
                      </TableHead>
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