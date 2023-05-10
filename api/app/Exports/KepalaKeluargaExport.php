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
        $kepala = KepalaKeluarga::all();
        return $kepala;
    }
}
