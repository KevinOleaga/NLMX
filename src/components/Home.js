import React, { useEffect, useState } from 'react';
import companyLogo from './assets/img/logo.png';
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './assets/css/bootstrap.min.css';
import './assets/css/paper-dashboard.min.css';
import './assets/css/custom.css';
import './assets/demo/demo.css';

const Home = () => {
    const [Data, setData] = useState([]);
    const MySwal = withReactContent(Swal)

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
                        <li class="active">
                            <a href="/home">
                                <i class="nc-icon nc-bank"></i>
                                <p>Inicio</p>
                            </a>
                        </li>
                        <li>
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
                            <a class="navbar-brand" href="javascript:;">¡Bienvenido! ► Inicio</a>
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
                    {/* START PANELS */}
                    <div className="row">
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card card-stats">
                                <div class="card-body ">
                                    <div class="row">
                                        <div class="col-5 col-md-4">
                                            <div class="icon-big text-center icon-warning">
                                                <i class="fa fa-plus text-warning"></i>
                                            </div>
                                        </div>
                                        <div class="col-7 col-md-8">
                                            <div class="numbers">
                                                <p class="card-category">Disponible</p>
                                                <p class="card-title">0
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer ">
                                    <hr />
                                    <div class="stats">
                                        <i class="fa fa-refresh"></i>
                                        Actualizado
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card card-stats">
                                <div class="card-body ">
                                    <div class="row">
                                        <div class="col-5 col-md-4">
                                            <div class="icon-big text-center icon-warning">
                                                <i class="fa fa-plus text-success"></i>
                                            </div>
                                        </div>
                                        <div class="col-7 col-md-8">
                                            <div class="numbers">
                                                <p class="card-category">Disponible</p>
                                                <p class="card-title">0
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer ">
                                    <hr />
                                    <div class="stats">
                                        <i class="fa fa-refresh"></i>
                                        Actualizado
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card card-stats">
                                <div class="card-body ">
                                    <div class="row">
                                        <div class="col-5 col-md-4">
                                            <div class="icon-big text-center icon-warning">
                                                <i class="fa fa-plus text-danger"></i>
                                            </div>
                                        </div>
                                        <div class="col-7 col-md-8">
                                            <div class="numbers">
                                                <p class="card-category">Disponible</p>
                                                <p class="card-title">0
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer ">
                                    <hr />
                                    <div class="stats">
                                        <i class="fa fa-refresh"></i>
                                        Actualizado
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card card-stats">
                                <div class="card-body ">
                                    <div class="row">
                                        <div class="col-5 col-md-4">
                                            <div class="icon-big text-center icon-warning">
                                                <i class="fa fa-plus text-primary"></i>
                                            </div>
                                        </div>
                                        <div class="col-7 col-md-8">
                                            <div class="numbers">
                                                <p class="card-category">Disponible</p>
                                                <p class="card-title">0
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer ">
                                    <hr />
                                    <div class="stats">
                                        <i class="fa fa-refresh"></i>
                                        Actualizado
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END PANELS */}

                    {/* START TABLE */}
                    <div className="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title"> Visor de datos</h4>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
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
        </div>
    )
}

export default Home