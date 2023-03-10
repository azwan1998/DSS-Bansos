<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KepalaKeluarga;
use App\Models\Daerah;

class KepalaKelController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $kepala = KepalaKeluarga::select('*')
        ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
        ->paginate(10);

        return response()->json([
            'data' => $kepala
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $kepala = Daerah::all();

        return response()->json([$kepala]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'id_daerahs' => 'required',
            'NIK' => 'required',
            'tanggal_lahir' => 'required',
            'jenis_kelamin' => 'required',
        ]);

        $kepala = KepalaKeluarga::create($request->all());

        return response()->json([
            'data' => $kepala
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $kepala = KepalaKeluarga::find($id);
        
        return response()->json([
            'data' => $kepala
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $kepala = KepalaKeluarga::findorNew($id);
        $kepala->nama = $request->nama;
        $kepala->id_daerahs = $request->id_daerahs;
        $kepala->NIK = $request->NIK;
        $kepala->tanggal_lahir = $request->tanggal_lahir;
        $kepala->jenis_kelamin = $request->jenis_kelamin;
        $kepala->alamat = $request->alamat;
        $kepala->save();

        return response()->json([
            'data' => $kepala
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $kepala = KepalaKeluarga::find($id);
        $kepala->delete();

        return response()->json([
            'messagge' => 'data berhasil dihapus'
        ]);
    }
}
