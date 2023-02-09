import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap'
import companyLogo from './assets/img/logo.png';
import axios from 'axios'
import './assets/css/bootstrap.min.css';
import './assets/css/paper-dashboard.min.css';
import './assets/css/custom.css';
import './assets/demo/demo.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AdmData = () => {

    const MySwal = withReactContent(Swal)

    const [Data, setData] = useState([]);
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = () => { SetViewShow(true) }
    const hanldeViewClose = () => { SetViewShow(false) }

    //For Edit Model
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const hanldeEditClose = () => { SetEditShow(false) }

    //Define here local state that store the form Data
    const [CompanyID, setCompanyID] = useState("");
    const [CompanyCode, setCompanyCode] = useState("")
    const [MonthDescription, setMonthDescription] = useState("")
    const [BusinessUnit, setBusinessUnit] = useState("")
    const [EffectiveDate, setEffectiveDate] = useState("")
    const [WeekNumberOfEffectiveDate, setWeekNumberOfEffectiveDate] = useState("")
    const [Planned_Released, setPlanned_Released] = useState("")
    const [FirmWO, setFirmWO] = useState("")
    const [PlannedWO, setPlannedWO] = useState("")
    const [DailyCapacity, setDailyCapacity] = useState("")
    const [WeeklyCapacity, setWeeklyCapacity] = useState("")
    const [MonthlyCapacity, setMonthlyCapacity] = useState("")
    const [RequestDate, setRequestDate] = useState("")
    const [Rate_Hour, setRate_Hour] = useState("")
    const [PrimaryUOM_Hour, setPrimaryUOM_Hour] = useState("")
    const [ShortItemNumber, setShortItemNumber] = useState("")
    const [ItemDescription, setItemDescription] = useState("")
    const [WorkOrderQuantity, setWorkOrderQuantity] = useState("")
    const [QuantityOrdered, setQuantityOrdered] = useState("")
    const [WorkOrderNo, setWorkOrderNo] = useState("")
    const [WOStatus, setWOStatus] = useState("")
    const [TypeOfRouting, setTypeOfRouting] = useState("")

    //ID 4 UPDATE OR DELETE
    const [Id, setId] = useState("")

    //DELETE
    const [ViewDelete, SetDeleteShow] = useState(false)
    const handleDeleteShow = () => { SetDeleteShow(true) }
    const hanldeDeleteClose = () => { SetDeleteShow(false) }
    const [Delete, setDelete] = useState(true)

    const handleDelete = () => {
        const url = `http://127.0.0.1:8000/data/${Id}`
        axios.delete(url)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    // GET ALL DATA
    const GetAllData = () => {
        const url = 'http://127.0.0.1:8000/data'
        axios.get(url)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    alert("Something is wrong")
                }
                else {
                    setData(data)
                    console.log(data)
                    // SUCCESS
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    // EDIT DATA
    const handleEdit = () => {
        const url = `http://127.0.0.1:8000/data/${Id}`
        const Credentials = { CompanyID, CompanyCode, MonthDescription, BusinessUnit, EffectiveDate, WeekNumberOfEffectiveDate, Planned_Released, FirmWO, PlannedWO, DailyCapacity, WeeklyCapacity, MonthlyCapacity, RequestDate, Rate_Hour, PrimaryUOM_Hour, ShortItemNumber, ItemDescription, WorkOrderQuantity, QuantityOrdered, WorkOrderNo, WOStatus, TypeOfRouting }
        axios.put(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    //call this function in useEffect
    console.log(ViewShow, RowData)
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
                    {/* START TABLE */}
                    <div className="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div className='custom_input'>
                                    <h5 class="form-label" for="customFile">Ingrese un nuevo archivo en formato .csv</h5>
                                    <input type="file" accept=".csv" class="form-control" id="customFile" />
                                </div>

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
                                                        <td>{item.CompanyCode}</td>
                                                        <td>{item.MonthDescription}</td>
                                                        <td>{item.BusinessUnit}</td>
                                                        <td>{item.EffectiveDate}</td>
                                                        <td>{item.WeekNumberOfEffectiveDate}</td>
                                                        <td>{item.Planned_Released}</td>
                                                        <td>{item.FirmWO}</td>
                                                        <td>{item.PlannedWO}</td>
                                                        <td>{item.DailyCapacity}</td>
                                                        <td>{item.WeeklyCapacity}</td>
                                                        <td>{item.MonthlyCapacity}</td>
                                                        <td>{item.RequestDate}</td>
                                                        <td>{item.Rate_Hour}</td>
                                                        <td>{item.PrimaryUOM_Hour}</td>
                                                        <td>{item.ShortItemNumber}</td>
                                                        <td>{item.ItemDescription}</td>
                                                        <td>{item.WorkOrderQuantity}</td>
                                                        <td>{item.QuantityOrdered}</td>
                                                        <td>{item.WorkOrderNo}</td>
                                                        <td>{item.WOStatus}</td>
                                                        <td>{item.TypeOfRouting}</td>
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
                            </div>
                        </div>
                    </div>
                    {/* END TABLE */}
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

            {/* DELETE MODAL */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>¿Desea eliminar el registro perteneciente a CompanyID = {RowData.CompanyID}?</Modal.Title>
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

            {/* EDIT MODAL */}
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
                            <div className='form-group'>
                                <label>CompanyID</label>
                                <input type="text" className='form-control' onChange={(e) => setCompanyID(e.target.value)} defaultValue={RowData.CompanyID} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Request Date</label>
                                <input type="date" className='form-control' onChange={(e) => setRequestDate(e.target.value)} defaultValue={RowData.RequestDate} required="true" />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Quantity Ordered</label>
                                <input type="number" className='form-control' onChange={(e) => setQuantityOrdered(e.target.value)} defaultValue={RowData.QuantityOrdered} required="true" />
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Editar registro</Button>
                            <div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default AdmData