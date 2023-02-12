import axios from 'axios'
import Swal from 'sweetalert2'
import { Button, Modal } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import withReactContent from 'sweetalert2-react-content'
import './assets/css/bootstrap.min.css';
import './assets/css/paper-dashboard.min.css';
import './assets/css/custom.css';
import './assets/demo/demo.css';
import companyLogo from './assets/img/logo.png';

const AdmData = () => {

    const [file, setFile] = useState(null);
    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const [Data, setData] = useState([]);
    const MySwal = withReactContent(Swal)

    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = () => { SetViewShow(true) }
    const hanldeViewClose = () => { SetViewShow(false) }

    //DEFINE LOCAL STATES
    const [RequestDate, setRequestDate] = useState("")
    const [QuantityOrdered, setQuantityOrdered] = useState("")

    // GET ALL DATA
    const GetAllData = () => {
        const url = 'http://127.0.0.1:8000/data'
        axios.get(url)
            .then(response => {
                const result = response.data;
                const { status, data } = result;
                if (status !== 'SUCCESS') {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                    })
                }
                else {
                    setData(data)
                }
            })
            .catch(err => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                })
            })
    }

    //ID 4 UPDATE OR DELETE
    const [Id, setId] = useState("")

    // UPDATE
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const hanldeEditClose = () => { SetEditShow(false) }

    const handleEdit = () => {
        const url = `http://127.0.0.1:8000/data/${Id}`
        const Credentials = { RequestDate, QuantityOrdered }

        axios.put(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                    })
                }
                else {
                    window.location.reload()
                }
            })
            .catch(err => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                })
            })
    }

    // DELETE
    const [Delete, setDelete] = useState(true)

    const handleDelete = () => {
        const url = `http://127.0.0.1:8000/data/${Id}`
        axios.delete(url)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                    })
                }
                else {
                    window.location.reload()
                }
            })
            .catch(err => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                })
            })
    }

    // UPDATE ALL DATA
    const saveExcel = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        // UPLOAD XLXS FILE
        axios.post('http://127.0.0.1:8000/data/upload', formData)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                    })
                }
                else {
                    // DELETE ALL DATA
                    axios.delete('http://127.0.0.1:8000/deleteAllData', formData)
                        .then(response => {
                            const result = response.data;
                            const { status, message } = result;
                            if (status !== 'SUCCESS') {
                                MySwal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                                })
                            }
                            else {
                                // CONVERT TO JSON
                                axios.post('http://127.0.0.1:8000/data/convert', formData)
                                    .then(response => {
                                        const result = response.data;
                                        const { status, message } = result;
                                        if (status !== 'SUCCESS') {
                                            MySwal.fire({
                                                icon: 'error',
                                                title: 'Oops...',
                                                text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                                            })
                                        }
                                        else {
                                            // SAVE DATA
                                            axios.post('http://127.0.0.1:8000/data/saveData', formData)
                                                .then(response => {
                                                    const result = response.data;
                                                    const { status, message } = result;
                                                    if (status !== 'SUCCESS') {
                                                        MySwal.fire({
                                                            icon: 'error',
                                                            title: 'Oops...',
                                                            text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                                                        })
                                                    } else {
                                                        window.location.reload();
                                                    }
                                                }).catch(err => {
                                                    MySwal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Ha ocurrido un error, contacta al administrador para solventarlo' + err.message
                                                    })
                                                })
                                        }
                                    }).catch(err => {
                                        MySwal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                                        })
                                    })
                            }
                        }).catch(err => {
                            MySwal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                            })
                        })
                }

            })
            .catch(err => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                })
            })
    }


    useEffect(() => {
        GetAllData();
    }, [])

    return (
        <div className="wrapper ">
            {/* START MENU */}
            <div class="sidebar" data-color="black" data-active-color="danger">
                <div class="logo">
                    <a className="simple-text logo-normal">
                        <div className="logo-image-small">
                            <img className="img-responsive logo-normal logo_custom" src={companyLogo} alt="NLMX" />
                        </div>
                    </a>
                </div>

                <div class="sidebar-wrapper">
                    <ul class="nav">
                        <li>
                            <a href="/home">
                                <i class="nc-icon nc-bank"></i>
                                <p>Inicio</p>
                            </a>
                        </li>
                        <li class="active">
                            <a href="/AdmData">
                                <i class="nc-icon nc-single-copy-04"></i>
                                <p>Admin. de datos</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* END MENU */}

            <div className="main-panel">
                {/* START HEADER */}
                <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
                    <div class="container-fluid">
                        <div class="navbar-wrapper">
                            <div class="navbar-minimize">
                                <button id="minimizeSidebar" class="btn btn-icon btn-round">
                                    <i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
                                    <i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
                                </button>
                            </div>
                            <div class="navbar-toggle">
                                <button type="button" class="navbar-toggler">
                                    <span class="navbar-toggler-bar bar1"></span>
                                    <span class="navbar-toggler-bar bar2"></span>
                                    <span class="navbar-toggler-bar bar3"></span>
                                </button>
                            </div>
                            <a class="navbar-brand" href="javascript:;">¡Bienvenido! ► Administraci&oacute;n de datos</a>
                        </div>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation"
                            aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-bar navbar-kebab"></span>
                            <span class="navbar-toggler-bar navbar-kebab"></span>
                            <span class="navbar-toggler-bar navbar-kebab"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navigation">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link btn-rotate" href="/">
                                        <i class="fa fa-sign-out fa fa-1x"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* END HEADER */}

                <div className="content">
                    <div className="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div className='custom_input'>
                                    <h5 class="form-label" for="customFile">Ingrese un nuevo archivo en formato .xlsx</h5>
                                    <br></br>
                                    {/* START INPUT FILE */}
                                    <form onSubmit={saveExcel}>
                                        <input type="file" accept=".xlsx" name="file" class="form-control form-control" onChange={handleChange} />
                                        <button class="btn btn-warning" type="submit">Cargar archivo</button>
                                    </form>
                                    {/* END INPUT FILE */}
                                </div>

                                {/* START TABLE */}
                                <div class="card-body">
                                    <div class="table-responsive tr2">
                                        <table id="table" class="table" data-pagination="true">
                                            <thead class="text-primary">
                                                <th class="text-center">Company Code</th>
                                                <th class="text-center">Month Description</th>
                                                <th class="text-center">Business Unit</th>
                                                <th class="text-center">Effective Date</th>
                                                <th class="text-center">Week Number of Effective Date</th>
                                                <th class="text-center">Planned / Released</th>
                                                <th class="text-center">FirmWO</th>
                                                <th class="text-center">PlannedWO</th>
                                                <th class="text-center">Daily Capacity</th>
                                                <th class="text-center">Weekly Capacity</th>
                                                <th class="text-center">Monthly Capacity</th>
                                                <th class="text-center">Request Date</th>
                                                <th class="text-center">Rate/Hour</th>
                                                <th class="text-center">Primary UOM/Hour</th>
                                                <th class="text-center">Short Item Number</th>
                                                <th class="text-center">Item Description</th>
                                                <th class="text-center">Work Order Quantity</th>
                                                <th class="text-center">Quantity Ordered</th>
                                                <th class="text-center">Work Order No</th>
                                                <th class="text-center">WO Status</th>
                                                <th class="text-center">Type of Routing</th>
                                                <th class="text-center">Comandos</th>
                                            </thead>
                                            <tbody>
                                                {Data.map((item) =>
                                                    <tr key={item._id}>
                                                        <td class="text-center">{item.CompanyCode}</td>
                                                        <td class="text-center">{item.MonthDescription}</td>
                                                        <td class="text-center">{item.BusinessUnit}</td>
                                                        <td class="text-center">{item.EffectiveDate}</td>
                                                        <td class="text-center">{item.WeekNumberOfEffectiveDate}</td>
                                                        <td class="text-center">{item.Planned_Released}</td>
                                                        <td class="text-center">{item.FirmWO}</td>
                                                        <td class="text-center">{item.PlannedWO}</td>
                                                        <td class="text-center">{item.DailyCapacity}</td>
                                                        <td class="text-center">{item.WeeklyCapacity}</td>
                                                        <td class="text-center">{item.MonthlyCapacity}</td>
                                                        <td class="text-center">{item.RequestDate}</td>
                                                        <td class="text-center">{item.Rate_Hour}</td>
                                                        <td class="text-center">{item.PrimaryUOM_Hour}</td>
                                                        <td class="text-center">{item.ShortItemNumber}</td>
                                                        <td class="text-center">{item.ItemDescription}</td>
                                                        <td class="text-center">{item.WorkOrderQuantity}</td>
                                                        <td class="text-center">{item.QuantityOrdered}</td>
                                                        <td class="text-center">{item.WorkOrderNo}</td>
                                                        <td class="text-center">{item.WOStatus}</td>
                                                        <td class="text-center">{item.TypeOfRouting}</td>
                                                        <td style={{ minWidth: 170 }}>
                                                            <Button size='sm' variant='warning' onClick={() => { handleEditShow(SetRowData(item), setId(item._id)) }}>Editar</Button>
                                                            |<Button size='sm' variant='danger' onClick={() => { handleViewShow(SetRowData(item), setId(item._id), setDelete(true)) }}>Eliminar</Button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* END TABLE */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* START FOOTER */}
                <footer class="footer footer-black  footer-white ">
                    <div class="container-fluid">
                        <div class="row">
                            <nav class="footer-nav">
                                <ul>
                                    <li><a href="#" target="#">NLMX</a></li>
                                    <li><a href="#" target="#">Manual de Usuario</a></li>
                                    <li><a href="#" target="#">Ayuda</a></li>
                                </ul>
                            </nav>
                            <div class="credits ml-auto">
                                <span class="copyright">
                                    © 2023, made with <i class="fa fa-heart heart"></i> by SoftteX
                                </span>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* END FOOTER */}
            </div>

            {/* START EDIT MODAL */}
            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Editar registro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form onSubmit={handleEdit}>
                                <div className='form-group mt-3'>
                                    <label>Quantity Ordered = {RowData.QuantityOrdered}</label>
                                    <input type="number" placeholder="Digite un nuevo valor" className='form-control' onChange={(e) => setQuantityOrdered(e.target.value)} required />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>Request Date = {RowData.RequestDate}</label>
                                    <input type="date" className='form-control' onChange={(e) => setRequestDate(e.target.value)} required />
                                </div>
                                <Button type='submit' className='btn btn-warning mt-4 custom_center'>Editar registro</Button>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* END EDIT MODAL */}

            {/* START DELETE MODAL */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>¿Desea eliminar el registro seleccionado?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-2 custom_center' onClick={handleDelete}>Eliminar registro</Button>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* END DELETE MODAL */}
        </div>
    )
}

export default AdmData