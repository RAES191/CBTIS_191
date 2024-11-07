import { useState } from 'react';
import axios from 'axios';
import '../Styles/Inscripciones.css';

import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  
  const [mobile,setMobile] = useState('');
  const [email,setEmail] = useState('');
  const [estudianteName, setestudianteName] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [curp, setCurp] = useState("");

  const [formErrors] = useState({});
  const [isSubmitted] = useState({});

  const handleSubmit = () => {
    if(estudianteName.length === 0){
      alert("¡Name está en blanco!");
    }
    else if(apellidoPaterno.length === 0){
        alert("Mobile has left Blank!");
    }
    else if(apellidoMaterno.length === 0){
        alert("Mobile has left Blank!");
    }
    else if(fechaNacimiento.length === 0){
        alert("Mobile has left Blank!");
    }
    else if(genero.length === 0){
        alert("Mobile has left Blank!");
    }
    

    else{
      const url = 'http://localhost/test/formsubmit.php';
      let fData = new FormData();
      fData.append('estudianteName', estudianteName);
      fData.append('apellidoPaterno', apellidoPaterno);
      fData.append('apellidoMaterno', apellidoMaterno);
      fData.append('fechaNacimiento', fechaNacimiento);
      fData.append('genero', genero);
      fData.append('curp', curp);

      fData.append('email', email);
      axios.post(url, fData).then(response=> alert(response.data)).catch(error=> alert(error));
    }
  }
 
  return (
    <>    
    <div className="form-container">
        <h2 className="form-title">
            <span>Inscribete Ahora En Linea</span>
        </h2>
        <form className="form-content" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-row">
                <div className="form-column">
                    <label>
                        Nombre(s) del Estudiante:
                        <input
                            type="text"
                            name="estudianteName"
                            value={estudianteName}
                            onChange={(e) => setestudianteName(e.target.value)}
                            required
                        />
                        {formErrors.estudianteName && <p className="error-message">{formErrors.estudianteName}</p>}
                    </label>
                    <label>
                        Apellido Paterno:
                        <input
                            type="text"
                            name="apellidoPaterno"
                            value={apellidoPaterno}
                            onChange={(e) => setApellidoPaterno(e.target.value)}
                            required
                        />
                        {formErrors.apellidoPaterno && <p className="error-message">{formErrors.apellidoPaterno}</p>}
                    </label>
                    <label>
                        Apellido Materno:
                        <input
                            type="text"
                            name="apellidoMaterno"
                            value={apellidoMaterno}
                            onChange={(e) => setApellidoMaterno(e.target.value)}
                            required
                        />
                        {formErrors.apellidoMaterno && <p className="error-message">{formErrors.apellidoMaterno}</p>}
                    </label>
                </div>
            </div>
            <div className="form-row">
                <div className="form-column">
                    <label>
                        Fecha de Nacimiento:
                        <input
                            type="date"
                            name="fechaNacimiento"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            required
                        />
                        {formErrors.fechaNacimiento && <p className="error-message">{formErrors.fechaNacimiento}</p>}
                    </label>
                </div>
                <div className='form-content2'>
                    <div className="form-column">
                        <label className='genero-column'>
                            Género:
                              <select
                                name="genero"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                required
                            >
                                <option value="">Selecciona</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                                <option value="otro">Otro</option>
                            </select>
                            {formErrors.genero && <p className="error-message">{formErrors.genero}</p>}
                        </label>
                    </div>
                </div>
                <div className="form-column">
                    <label>
                        C.U.R.P:
                        <input
                            type="text"
                            name="curp"
                            value={curp}
                            onChange={(e) => setCurp(e.target.value)}
                            required
                        />
                        {formErrors.curp && <p className="error-message">{formErrors.curp}</p>}
                    </label>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <input type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" name="submit" id="submit" value="Registrate" onClick={handleSubmit} />
            </div>
            {/*<p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!" className="fw-bold text-body"><u>Login here</u></a></p>*/}
        </form>
    </div>
    <Footer />
    </>
  );
}
 
export default App;
