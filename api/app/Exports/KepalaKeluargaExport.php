<?php

namespace App\Exports;

use App\Models\KepalaKeluarga;
use Maatwebsite\Excel\Concerns\FromCollection;

class KepalaKeluargaExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $kepala = KepalaKeluarga::select('kepala_keluargas.id','kepala_keluargas.nama','kepala_keluargas.NIK','kepala_keluargas.alamat',
                                'kepala_keluargas.jenis_kelamin','kepala_keluargas.tanggal_lahir','daerahs.nama_daerah')
                                ->join('Daerahs','daerahs.id','=','kepala_keluargas.id_daerahs')
                                ->get();

        return $this;
                    
    }

}
