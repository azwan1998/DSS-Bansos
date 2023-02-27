import React from 'react'

function SubKriteria() {
  return (
    <div>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1>Data Kriteria</h1>
                </div>
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Data SubKriteria</li>
                </ol>
                </div>
            </div>
            </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
            {/* Default box */}
            <div className="card">
            <div className="card-header">
                <h3 className="card-title">Data SubKriteria</h3>
            </div>
            <div className="card-body">
                SubKriteria geeeeeeeees
            </div>
            </div>
        </section>
        </div>
    </div>
  )
}

export default SubKriteria