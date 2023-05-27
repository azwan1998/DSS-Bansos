<?php

namespace App\Exports;

use App\Models\KepalaKeluarga;
use Maatwebsite\Excel\Concerns\FromCollection;
// use Illuminate\Http\Request;

class KepalaKelExport implements FromCollection
{
    protected $id_daerahs;

    function __construct($id_daerahs) {
            $this->id_daerahs = $id_daerahs;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        // dd($this->id_daerahs);
        if($this->id_daerahs == 'null'){
            $kepala = KepalaKeluarga::select('kepala_keluargas.id','kepala_keluargas.nama','kepala_keluargas.NIK','kepala_keluargas.alamat',
                                'kepala_keluargas.jenis_kelamin','kepala_keluargas.tanggal_lahir','daerahs.nama_daerah')
                                ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
                                ->get();
        }else{
            $kepala = KepalaKeluarga::select('kepala_keluargas.id','kepala_keluargas.nama','kepala_keluargas.NIK','kepala_keluargas.alamat',
                                'kepala_keluargas.jenis_kelamin','kepala_keluargas.tanggal_lahir','daerahs.nama_daerah')
                                ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
                                ->where('daerahs.id', $this->id_daerahs)
                                ->get();
        }

        return $kepala;
                    
    }

}
