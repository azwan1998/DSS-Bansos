<?php

namespace App\Exports;

use App\Models\Penerima;
use Maatwebsite\Excel\Concerns\FromCollection;
// use Illuminate\Http\Request;

class CalonPenerimaExport implements FromCollection
{
    // protected $id_daerahs;

    // function __construct($id_daerahs) {
    //         $this->id_daerahs = $id_daerahs;
    // }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        // dd($this->id_daerahs);
        $getP = Penerima::select('periode')->orderBy('periode', 'DESC')->first();
        $calon = Penerima::select('calon_penerimas.*','kepala_keluargas.nama','kepala_keluargas.NIK','daerahs.nama_daerah')
            ->join('Kepala_keluargas','kepala_keluargas.id','=','calon_penerimas.id_kepala_keluargas')
            ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
            ->where('calon_penerimas.periode', $getP->periode)
            ->orderBy('calon_penerimas.nilai', 'DESC')
            ->get();

        return $calon;
                    
    }

}
