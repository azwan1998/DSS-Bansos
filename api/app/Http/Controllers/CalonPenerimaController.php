<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Penerima;
use App\Models\KepalaKeluarga;
use App\Models\Kriteria;
use App\Http\Resources\CalonPenerima as CalonPenerimaResource;
use App\Exports\CalonPenerimaExport;
use Maatwebsite\Excel\Facades\Excel;

class CalonPenerimaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $newPeriode = Penerima::select('periode')->orderBy('periode', 'DESC')->first();

        if ($request->daerah){
            $calon = Penerima::select('calon_penerimas.*','kepala_keluargas.nama','kepala_keluargas.NIK','daerahs.nama_daerah')
                ->join('Kepala_keluargas','kepala_keluargas.id','=','calon_penerimas.id_kepala_keluargas')
                ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
                ->where('calon_penerimas.periode', $newPeriode->periode)
                ->where('daerahs.id', $request->id_daerahs)
                ->orderBy('calon_penerimas.nilai', 'DESC')
                ->get();
        }else if($request->periode){
            $calon = Penerima::select('calon_penerimas.*','kepala_keluargas.nama','kepala_keluargas.NIK','daerahs.nama_daerah')
                ->join('Kepala_keluargas','kepala_keluargas.id','=','calon_penerimas.id_kepala_keluargas')
                ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
                ->where('calon_penerimas.periode', $request->periode)
                ->orderBy('calon_penerimas.nilai', 'DESC')
                ->get();
        }else if($request->id_daerahs){
            $calon = Penerima::select('calon_penerimas.*','kepala_keluargas.nama','kepala_keluargas.NIK','daerahs.nama_daerah')
                ->join('Kepala_keluargas','kepala_keluargas.id','=','calon_penerimas.id_kepala_keluargas')
                ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
                ->where('calon_penerimas.periode', $request->periode)
                ->where('daerahs.id', $request->id_daerahs)
                ->orderBy('calon_penerimas.nilai', 'DESC')
                ->get();
        }else if($request->Searching){
            // print_r('tsgdahsh');exit;
            $calon = Penerima::select('calon_penerimas.*','kepala_keluargas.nama','kepala_keluargas.NIK','daerahs.nama_daerah')
                ->join('Kepala_keluargas','kepala_keluargas.id','=','calon_penerimas.id_kepala_keluargas')
                ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
                ->where('calon_penerimas.periode', $newPeriode->periode)
                ->where('kepala_keluargas.nama','LIKE','%'.$request->Searching.'%')
                ->orWhere('kepala_keluargas.NIK','LIKE','%'.$request->Searching.'%')
                // ->orderBy('calon_penerimas.nilai', 'DESC')
                ->get();
        }else{
            $calon = Penerima::select('calon_penerimas.*','kepala_keluargas.nama','kepala_keluargas.NIK','daerahs.nama_daerah')
                ->join('Kepala_keluargas','kepala_keluargas.id','=','calon_penerimas.id_kepala_keluargas')
                ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
                ->where('calon_penerimas.periode', $newPeriode->periode)
                ->orderBy('calon_penerimas.nilai', 'DESC')
                ->get();
        }
        
        
        return response(CalonPenerimaResource::collection($calon));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->id_daerahs == 'null'){
            $mainData = KepalaKeluarga::select('id','nama','bobot')->orderBy('id' , 'ASC')->get();
            
        }else{
            $mainData = KepalaKeluarga::select('kepala_keluargas.id','kepala_keluargas.nama','kepala_keluargas.bobot')
                    ->join('Daerahs','daerahs.id', '=' , 'kepala_keluargas.id_daerahs')
                    ->where('daerahs.id', $request->id_daerahs)
                    ->orderBy('id', 'ASC')
                    ->get();
        }
        $cekData = count($mainData);
        if ($cekData <= 1){
            $response = [
                'message' => 'Error validation',
                'data' => [
                    'message' => [
                        'Silahkan menambah data keluarga pada kecamatan tersebut untuk melanjutkan proses'
                    ]
                ]
            ];

            return response()->json($response, 422);
        }
        
        $bobot = Kriteria::select('bobot_kriteria','atribut')->get();

        //periode 
        $getPeriode = Penerima::select('periode')->orderBy('periode', 'DESC')->first();
        $periode = $getPeriode->periode +1;

        $kepala = [];
        $matrix = [];
        foreach ($mainData as $d) {
            $matrix [] = json_decode($d->bobot);
            $kepala [] = $d->id;
        }

        $weights = [];
        $benefit_criteria = [];

        foreach ($bobot as $at){
            $weights [] = $at->bobot_kriteria;
            $benefit_criteria [] = $at->atribut;
        }
        
        // Normalize the matrix
        foreach ($matrix as &$row) {
            for ($i = 0; $i < count($row); $i++) {
                $row[$i] /= sqrt(array_sum(array_column($matrix, $i)) / count($matrix));
            }
        }
        
        // Weight the matrix
        foreach ($matrix as &$row) {
            for ($i = 0; $i < count($row); $i++) {
                $row[$i] *= $weights[$i];
            }
        }
        
        // Determine the ideal and anti-ideal solutions
        $ideal_solution = array();
        $anti_ideal_solution = array();
        for ($i = 0; $i < count($matrix[0]); $i++) {
            $col = array_column($matrix, $i);
            if ($benefit_criteria[$i]) {
                $ideal_solution[] = max($col);
                $anti_ideal_solution[] = min($col);
            } else {
                $ideal_solution[] = min($col);
                $anti_ideal_solution[] = max($col);
            }
        }
        
        // Calculate the distance of each alternative to the ideal and anti-ideal solutions
        $distances = array();
        foreach ($matrix as $row) {
            $ideal_distance = 0;
            $anti_ideal_distance = 0;
            for ($i = 0; $i < count($row); $i++) {
                $ideal_distance += pow($row[$i] - $ideal_solution[$i], 2);
                $anti_ideal_distance += pow($row[$i] - $anti_ideal_solution[$i], 2);
            }
            $distances[] = sqrt($ideal_distance) / (sqrt($ideal_distance) + sqrt($anti_ideal_distance));
        }
        
        // Rank the alternatives based on their distance to the ideal solution
        $k = 0;
        $rankings = array();
        foreach ($distances as $key => $distance) {
            $rankings[] = array('index' => $key, 'distance' => $distance);
            $penerima = New Penerima;
            $penerima->id_kepala_keluargas = $kepala[$k++];
            $penerima->periode = $periode;
            $penerima->nilai = $distance;
            $penerima->save();
        }
        usort($rankings, function ($a, $b) {
            return $a['distance'] <=> $b['distance'];
        });
        
        return response()->json(204);
    }

    public function excel(Request $request)
    {
        return Excel::download(new CalonPenerimaExport($request->id_daerahs), 'calonPenerima.xlsx');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $calon = Penerima::select('calon_penerimas.*','kepala_keluargas.nama','kepala_keluargas.NIK','daerahs.nama_daerah','kepala_keluargas.jenis_kelamin','kepala_keluargas.alamat')
                ->join('Kepala_keluargas','kepala_keluargas.id','=','calon_penerimas.id_kepala_keluargas')
                ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
                ->where('calon_penerimas.id', $id)
                ->first();
                
        return response()->json([
            'data' => $calon
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
        //
    }
}
