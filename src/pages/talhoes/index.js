import React, {Component} from 'react';

import api from '../../services/api';
import './styles.css';
import MenuLateral from '../../components/MenuLateral';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, TextField, Snackbar, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

export default class Talhoes extends Component {
    state = {
        talhoes: [],
        abrirVisualizar: false,
        onlyRead: true,
        snackbar: false,
        abrirCadastro: false,

        id: 0,
        nome: '',
        id_propriedade: 0,
        kml: '',
        area: 0
    }
    
    componentDidMount() {
      this.loadTalhoes();  
    }

    loadTalhoes = async () => {
      const response = await api.get('/talhao/listar');

      this.setState({ talhoes:  response.data.talhoes});
    }

    handleClose = () => {
      this.setState({ abrirVisualizar: false, onlyRead: true });
    };

    snackbarClose = () => {
      this.setState({ snackbar: false });
    };

    handleOpen = (event) => {
      const idTalhao = event.currentTarget.id;

      this.setState({ abrirVisualizar: true });

      this.loadTalhao(idTalhao);
      //this.loadPropriedades(idPropriedade); talhoes
    };

    handleOpenEditar = (event) => {
      const idTalhao = event.currentTarget.id;

      this.setState({ abrirVisualizar: true, onlyRead: false });

      this.loadTalhao(idTalhao);
      //this.loadPropriedades(idPropriedade); talhoes
    };

    deleteTalhao = () => {

    }

    loadTalhao = async (idTalhao) => {
      const response = await api.get('/talhao/' + idTalhao);

      this.setState({id: response.data.talhao.id});
      this.setState({nome: response.data.talhao.nome});
      this.setState({id_propriedade: response.data.talhao.propriedade.id});
      this.setState({kml: response.data.talhao.kml});
      this.setState({area: response.data.talhao.area});
    }

    saveTalhao = async () => {
      console.log('save');
      const idTalhao = this.state.id;
      let response;
      console.log(idTalhao);

      if (idTalhao === 'new') {
        response = await api.post('/talhao', {
          nome: this.state.nome,
          kml: this.state.kml,
          id_propriedade: this.state.id_propriedade,
          area: this.state.area,
        });
      } else {
        response = await api.put('/talhao/' + idTalhao, {
          nome: this.state.nome,
          kml: this.state.kml,
          id_propriedade: this.state.id_propriedade,
          area: this.state.area,
        });
      }

      console.log(response);

      this.setState({ snackbar: true });
      this.setState({ message: response.data.message })
      this.loadTalhoes();
    }

    cancelTalhao = () => {
      const idTalhao = this.state.id;
      
      if (idTalhao === 'new') {
        this.setState({ abrirCadastro: false });
      } else {
        this.loadTalhao(idTalhao);
      }
    }

    openNewTalhao = () => {
      this.setState({ abrirCadastro: true, onlyRead: false });
      this.setState({id: 'new'});
      this.setState({nome: ''});
      this.setState({id_propriedade: 0});
      this.setState({kml: ''});
      this.setState({area: 0});
    }

    render() {
      const { talhoes } = this.state;
      return (
        <div className="principal">
          <MenuLateral />
          
          <TableContainer className="table-style">
            <h1>Talhões</h1>
            <Button id={'new'} variant="contained" color="primary" style={{marginLeft: '2%'}} className="table-button" onClick={this.openNewTalhao}>Novo Talhão</Button>
            <Table className={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">KML</TableCell>
                <TableCell align="center">Propriedade</TableCell>
                <TableCell align="center">Área</TableCell>
                <TableCell align="center">Ações</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {talhoes.map((talhao) => (
                  <TableRow key={talhao.id}>
                    <TableCell align="center">{talhao.id}</TableCell>
                    <TableCell align="center">{talhao.nome}</TableCell>
                    <TableCell align="center">{talhao.kml}</TableCell>
                    <TableCell align="center">{talhao.propriedade}</TableCell>
                    <TableCell align="center">{talhao.area}</TableCell>
                    <TableCell align="center">
                    <Button id={talhao.id} variant="outlined" className="table-button" onClick={this.handleOpen}>Visualizar</Button>
                      <Button id={talhao.id} variant="outlined" className="table-button" onClick={this.handleOpenEditar}>Editar</Button>
                      <Button id={talhao.id} variant="outlined" className="table-button" onClick={this.deleteTalhao}>Excluir</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal
            open={this.state.abrirVisualizar || this.state.abrirCadastro}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {
              <div className="modalVisualizar">
                  {this.state.id === 'new'
                    ? <h1>Cadastro de Novo Talhão</h1>
                    : <h1>Informações do Talhão</h1>
                  }
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
                        className="formulario-campo"
                        label="KML"
                        value={this.state.kml}
                        onChange={(event) => {
                          this.setState({kml: event.target.value});
                        }}
                        InputProps={{
                          readOnly: this.state.onlyRead,
                          className: "formulario-campo"
                        }}
                      />
                    </div>

                    <div className="separador">
                      <TextField
                        label="Propriedade"
                        value={this.state.id_propriedade}
                        onChange={(event) => {
                          this.setState({id_propriedade: event.target.value});
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
                  </form>
                  <div className="salvar-cancelar-botoes">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={this.state.onlyRead}
                    onClick={this.saveTalhao}
                    startIcon={<SaveIcon />}>
                     Salvar
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    disabled={this.state.onlyRead}
                    onClick={this.cancelTalhao}
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
              </div>
            }
          </Modal>


        </div>
      );
    }
}