import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Inscripciones.css';

function App() {
  const [showParentFields, setShowParentFields] = useState(false);
  const [Carrera, setCarrera] = useState('');
  const [Generacion, setGeneracion] = useState('');
  const [Turno, setTurno] = useState('');
  const [Semestre, setSemestre] = useState('');
  const [Grupo, setGrupo] = useState('');
  const [NoControl, setNoControl] = useState('');
  const [Nombre, setNombre] = useState('');
  const [ApellidoPaterno, setApellidoPaterno] = useState('');
  const [ApellidoMaterno, setApellidoMaterno] = useState('');
  const [CURP, setCURP] = useState('');
  const [NombrePadre, setNombrePadre] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [CorreoElectronico, setCorreoElectronico] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const areAlumnoFieldsFilled = () => {
    return (
      Carrera.trim() !== '' &&
      Generacion.trim() !== '' &&
      Turno.trim() !== '' &&
      Semestre.trim() !== '' &&
      Grupo.trim() !== '' &&
      NoControl.trim() !== '' &&
      Nombre.trim() !== '' &&
      ApellidoPaterno.trim() !== '' &&
      ApellidoMaterno.trim() !== '' &&
      CURP.trim() !== ''
    );
  };

  const areParentFieldsFilled = () => {
    return (
      NombrePadre.trim() !== '' &&
      Telefono.trim() !== '' &&
      Direccion.trim() !== '' &&
      CorreoElectronico.trim() !== ''
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Carrera', Carrera);
    formData.append('Generacion', Generacion);
    formData.append('Turno', Turno);
    formData.append('Semestre', Semestre);
    formData.append('Grupo', Grupo);
    formData.append('NoControl', NoControl);
    formData.append('Nombre', Nombre);
    formData.append('ApellidoPaterno', ApellidoPaterno);
    formData.append('ApellidoMaterno', ApellidoMaterno);
    formData.append('CURP', CURP);
    formData.append('NombrePadre', NombrePadre);
    formData.append('Telefono', Telefono);
    formData.append('Direccion', Direccion);
    formData.append('CorreoElectronico', CorreoElectronico);
    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    }

    axios
      .post('http://localhost/test/submit_RegistroAlumnos.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">
          <span>Inscríbete Ahora En Línea</span>
        </h2>
        <form className="form-content" onSubmit={handleSubmit} encType="multipart/form-data">
          {!showParentFields && (
            <>
              <div className="form-row">
                <div className="form-column">
                  <label>
                    Carrera:
                    <input
                      type="text"
                      name="Carrera"
                      value={Carrera}
                      onChange={(e) => setCarrera(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    Semestre:
                    <select
                      name="Semestre"
                      value={Semestre}
                      onChange={(e) => setSemestre(e.target.value)}
                      required
                    >
                      <option value="">Selecciona</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    Grupo:
                    <input
                      type="text"
                      name="Grupo"
                      value={Grupo}
                      onChange={(e) => setGrupo(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label>
                    No. Control:
                    <input
                      type="text"
                      name="NoControl"
                      value={NoControl}
                      onChange={(e) => setNoControl(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    Generación:
                    <input
                      type="text"
                      name="Generacion"
                      value={Generacion}
                      onChange={(e) => setGeneracion(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    Turno:
                    <input
                      type="text"
                      name="Turno"
                      value={Turno}
                      onChange={(e) => setTurno(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label>
                    Nombre(s) del Estudiante:
                    <input
                      type="text"
                      name="Nombre"
                      value={Nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    Apellido Paterno:
                    <input
                      type="text"
                      name="ApellidoPaterno"
                      value={ApellidoPaterno}
                      onChange={(e) => setApellidoPaterno(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    Apellido Materno:
                    <input
                      type="text"
                      name="ApellidoMaterno"
                      value={ApellidoMaterno}
                      onChange={(e) => setApellidoMaterno(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label>
                    C.U.R.P:
                    <input
                      type="text"
                      name="CURP"
                      value={CURP}
                      onChange={(e) => setCURP(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label>
                    Subir Imagen:
                    <input
                      type="file"
                      name="profileImage"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            </>
          )}

          {showParentFields && (
            <>
              <div className="form-row">
                <div className="form-column">
                  <label>
                    Nombre del Padre:
                    <input
                      type="text"
                      name="NombrePadre"
                      value={NombrePadre}
                      onChange={(e) => setNombrePadre(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    Teléfono:
                    <input
                      type="text"
                      name="Telefono"
                      value={Telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    Dirección:
                    <input
                      type="text"
                      name="Direccion"
                      value={Direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label>
                    Correo Electrónico:
                    <input
                      type="email"
                      name="CorreoElectronico"
                      value={CorreoElectronico}
                      onChange={(e) => setCorreoElectronico(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>
            </>
          )}

          {areParentFieldsFilled() && showParentFields && (
            <div className="d-flex justify-content-center">
              <button type="button" onClick={() => setShowParentFields(false)} className="text-appointment-btn back-arrow">
                &larr; 
              </button>
              <button type="submit" className="text-appointment-btn">
                Registrar
              </button>
            </div>
          )}

          {areAlumnoFieldsFilled() && !showParentFields && (
            <div className="d-flex justify-content-center">
              <button type="button" onClick={() => setShowParentFields(true)} className="text-appointment-btn">
                Registrar Datos del Padre
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
