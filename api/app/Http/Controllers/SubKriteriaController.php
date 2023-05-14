<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubKriteria;
use App\Models\Kriteria;

class SubKriteriaController extends Controller
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
        $sub = SubKriteria::select('sub_kriterias.*','kriterias.nama_kriteria','kriterias.code')
        ->join('Kriterias','kriterias.id','=','sub_kriterias.id_kriterias')
        ->where('kriterias.isDeleted', false)
        ->paginate(10);

        return response()->json([
            'data' => $sub
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'id_kriterias' => 'required',
            'nama' => 'required',
            'nilai' => 'required',
        ]);

        $sub = SubKriteria::create($request->all());

        return response()->json([
            'data' => $sub
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
        $sub = SubKriteria::find($id);
        
        return response()->json([
            'data' => $sub
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
        $subkriteria = SubKriteria::findOrNew($id);
        $subkriteria->id_kriterias = $request->id_kriterias;
        $subkriteria->nama = $request->nama;
        $subkriteria->nilai = $request->nilai;
        $subkriteria->save();

        return response()->json([
            'data' => $subkriteria
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
        $subkriteria = SubKriteria::find($id);
        $subkriteria->delete();

        return response()->json([
            'messagge' => 'subkriteria berhasil dihapus'
        ],204);
    }
}
