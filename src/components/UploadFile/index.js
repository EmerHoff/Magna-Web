import React, { Component } from "react";
import UploadFilesService from "../../services/upload-file";
import api from '../../services/api';

export default class UploadFile extends Component {
  constructor(){
    super();
      this.state = {
          selectedFile:'',
      }

      this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
          })
    }

    submit(){
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        console.warn(this.state.selectedFile);

        api.post('/usuario/arquivo', data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.warn(res);
        })

    }

    render(){
        return(
            <div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-dark" onClick={()=>this.submit()}>Enviar</button>
                    </div>
                </div>
            </div>
        )  
    }
}