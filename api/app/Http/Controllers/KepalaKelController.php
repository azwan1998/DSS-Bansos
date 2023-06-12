<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\KepalaKeluarga;
use App\Models\Daerah;
use App\Models\Kriteria;
use App\Http\Resources\Keluarga as KeluargaResource;
use App\Exports\CalonPenerimaExport;
use App\Exports\KepalaKelExport;
use Maatwebsite\Excel\Facades\Excel;

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
    public function index(Request $request)
    {
        if($request->Searching){
            $kepala = KepalaKeluarga::select('kepala_keluargas.*','daerahs.nama_daerah')
                ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
                ->where('kepala_keluargas.nama','LIKE','%'.$request->Searching.'%')
                ->orWhere('daerahs.nama_daerah','LIKE','%'.$request->Searching.'%')
                ->orderBy('kepala_keluargas.id', 'DESC')
                ->get();
        }else{
            $kepala = KepalaKeluarga::select('kepala_keluargas.*','daerahs.nama_daerah')
                ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
                ->orderBy('kepala_keluargas.id', 'DESC')
                ->paginate(10);
        }
        

        return response(KeluargaResource::collection($kepala));
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

        $kepala = New KepalaKeluarga;
        $kepala->nama = $request->nama;
        $kepala->id_daerahs = $request->id_daerahs;
        $kepala->NIK = $request->NIK;
        $kepala->alamat = $request->alamat;
        $kepala->tanggal_lahir = $request->tanggal_lahir;
        $kepala->jenis_kelamin = $request->jenis_kelamin;
        $kepala->bobot = json_encode($request->bobot);
        $kepala->save();


        return response(new KeluargaResource($kepala));
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

    public function count(Request $request)
    {
        if($request->kepala){
            $count = KepalaKeluarga::count();
        }else if($request->kriteria){
            $count = Kriteria::count();
        }else{
            $count = Daerah::count();
        }
        
        return response()->json($count);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function excel(Request $request)
    {
        // dd($request->id_daerahs);
        return Excel::download(new KepalaKelExport($request->id_daerahs), 'keluarga.xlsx');
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
        $kepala->alamat = $request->alamat;
        $kepala->tanggal_lahir = $request->tanggal_lahir;
        $kepala->jenis_kelamin = $request->jenis_kelamin;
        $kepala->bobot = json_encode($request->bobot);
        $kepala->save();

        return response()->json([
            'data' => $kepala
        ]);
    }

    public function storeUpdate(Request $request, $id)
    {
        // dd($request->bobot);
        // $id = $id + 1;
        $kepala = KepalaKeluarga::findorNew($id);
        $kepala->bobot = json_encode($request->input('bobot'));
        $kepala->save();
        
        return response()->json(201);
    }

    public function getId()
    {
        $kepala = KepalaKeluarga::select('id')->orderBy('id', 'DESC')->first();

        return response()->json($kepala);
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
