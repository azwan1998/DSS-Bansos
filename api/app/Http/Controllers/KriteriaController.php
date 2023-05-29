<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Kriteria;
use App\Http\Resources\Kriteria as KriteriaResource;


class KriteriaController extends Controller
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
        if($request->list){
            $kriteria = Kriteria::where('list' , true)->where('isDeleted', false)->get();
        }else if($request->Searching){
            $kriteria = Kriteria::where('isDeleted', false)
                    ->where('nama_kriteria','LIKE','%'.$request->Searching.'%')
                    ->get();
        }else{
            $kriteria = Kriteria::where('isDeleted', false)->paginate(10);
        }
        
    
        return response(KriteriaResource::collection($kriteria));
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
            // 'code' => 'required',
            'nama_kriteria' => 'required',
            'bobot_kriteria' => 'required',
            'atribut' => 'required'
        ]);
        $getCode = Kriteria::all();

        $code = 'C'.(count($getCode)+1);

        $kriteria = new Kriteria;
        $kriteria->code = $code;
        $kriteria->nama_kriteria = $request->nama_kriteria;
        $kriteria->bobot_kriteria = $request->bobot_kriteria;
        $kriteria->atribut = $request->atribut;
        $kriteria->save();

        return response()->json([
            'data' => $kriteria
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
        $kriteria = Kriteria::find($id);
        
        return response()->json([
            'data' => $kriteria
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
        $kriteria = Kriteria::findorNew($id);
        $kriteria->code = $request->code;
        $kriteria->nama_kriteria = $request->nama_kriteria;
        $kriteria->bobot_kriteria = $request->bobot_kriteria;
        $kriteria->atribut = $request->atribut;
        $kriteria->save();

        return response()->json([
            'data' => $kriteria
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
        $kriteria = Kriteria::findOrNew($id);
        $kriteria->isDeleted = true;
        $kriteria->save();

        return response()->json([
            'messagge' => 'kriteria berhasil dihapus'
        ],204);
    }
}
