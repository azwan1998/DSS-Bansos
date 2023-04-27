<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penerima extends Model
{
    protected $table = 'calon_penerimas';

    protected $primaryKey = 'id';

    protected $guarded = ['id'];

    public function KepalaKeluarga()
    {
        return $this->BelongsTo(KepalaKelurga::class, 'id_kepala_keluargas', 'id');
    }
}
