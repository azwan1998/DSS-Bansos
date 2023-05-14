<?php

namespace App\Exports;

use App\Models\Penerima;
use Maatwebsite\Excel\Concerns\FromCollection;
// use Illuminate\Http\Request;

class CalonPenerimaExport implements FromCollection
{
    protected $periode;

    function __construct($periode) {
            $this->periode = $periode;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        // print_r($this->id_daerahs);exit;
        $calon = Penerima::select('calon_penerimas.*','kepala_keluargas.nama','kepala_keluargas.NIK','daerahs.nama_daerah')
                ->join('Kepala_keluargas','kepala_keluargas.id','=','calon_penerimas.id_kepala_keluargas')
                ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
                ->where('calon_penerimas.periode', $this->periode)
                ->orderBy('calon_penerimas.nilai', 'DESC')
                ->get();

        return $calon;
                    
    }

}
