import React from 'react'

function Keluarga() {
  return (
    <div>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1>Data Keluarga</h1>
                </div>
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Data Keluarga</li>
                </ol>
                </div>
            </div>
            </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
            {/* Default box */}
            <div className="card">
            <div className="card-body">
                <div className='grid gap-2 d-md-flex justify-content-md-end mb-3'>
                  <input type='search' className='d-flex justify-content-start'/>
                  <button type='button' className='btn btn-primary'>Input Data</button>
                  <button type='button' className='btn btn-secondary'>Cetak Excel</button>
                </div>
                
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>Rendering engine</th>
                    <th>Browser</th>
                    <th>Platform(s)</th>
                    <th>Engine version</th>
                    <th>CSS grade</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Trident</td>
                    <td>Internet
                      Explorer 5.5
                    </td>
                    <td>Win 95+</td>
                    <td>5.5</td>
                    <td>A</td>
                  </tr>
                  <tr>
                    <td>Trident</td>
                    <td>Internet
                      Explorer 6
                    </td>
                    <td>Win 98+</td>
                    <td>6</td>
                    <td>A</td>
                  </tr>
                  <tr>
                    <td>Trident</td>
                    <td>Internet Explorer 7</td>
                    <td>Win XP SP2+</td>
                    <td>7</td>
                    <td>A</td>
                  </tr>
                  <tr>
                    <td>Trident</td>
                    <td>AOL browser (AOL desktop)</td>
                    <td>Win XP</td>
                    <td>6</td>
                    <td>A</td>
                  </tr>
                  <tr>
                    <td>Gecko</td>
                    <td>Firefox 1.0</td>
                    <td>Win 98+ / OSX.2+</td>
                    <td>1.7</td>
                    <td>A</td>
                  </tr>
                  <tr>
                    <td>Gecko</td>
                    <td>Firefox 1.5</td>
                    <td>Win 98+ / OSX.2+</td>
                    <td>1.8</td>
                    <td>A</td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <th>Rendering engine</th>
                    <th>Browser</th>
                    <th>Platform(s)</th>
                    <th>Engine version</th>
                    <th>CSS grade</th>
                  </tr>
                  </tfoot>
                </table>
            </div>
            </div>
        </section>
        </div>
    </div>
  )
}

export default Keluarga