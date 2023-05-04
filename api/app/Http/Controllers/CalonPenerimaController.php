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
        $mainData = KepalaKeluarga::select('id','bobot')->orderBy('id' , 'ASC')->get();

        //periode 
        $getPeriode = Penerima::select('periode')->orderBy('periode', 'DESC')->first();
        $periode = $getPeriode->periode +1;

        $pembagi = [];
        $testIn = [];
        $bagi2;
        $dataProses;

        foreach ($mainData as $d) {
            // $dataProsess [] = json_decode($d->bobot);
            $dataProses []  = json_decode($d->bobot);
            // $bagi2 [] = ;
            // foreach ($dataProses as $test){
 
            // }
        }

        // foreach ($dataProses as $data){
        //     // $bagi2 [] = json_decode($data->nilai / 2);
        //     $bagi2 [] = json_decode($data);
        // }
        // dd($dataProsess);exit;
        // dd($bagi2);exit;
        dd($dataProses);exit;
        
        dd('bntr lagi siap yeee');
        //inputkan ke database
        foreach ($mainData as $y){

            //rangking
            $rangking = 2;

            //id kepala keluarga
            $idKepala = $d->id;
            $nilaiFinal = 300;

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
