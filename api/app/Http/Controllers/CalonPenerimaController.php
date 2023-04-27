<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Penerima;
use App\Models\KepalaKeluarga;

class CalonPenerimaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
        $mainData = KepalaKeluarga::select('id','bobot')->get();

        //periode 
        $getPeriode = Penerima::select('periode')->orderBy('periode', 'DESC')->first();
        $periode = $getPeriode->periode +1;

        foreach ($mainData as $d) {

            //id kepala keluarga
            $idKepala = $d->id;
            
            //algoritma
            $dataProses = $d;

            $pembagi = 1;
            $nilaiFinal = 200;

            //rangking
            $rangking = 2;

            $penerima = New Penerima;
            $penerima->id_kepala_keluargas = $idKepala;
            $penerima->periode = $periode;
            $penerima->nilai = $nilaiFinal;
            $penerima->rangking = $rangking;
            $penerima->save();
        }
        

        return response()->json([
            'data' => $penerima
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
        //
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
