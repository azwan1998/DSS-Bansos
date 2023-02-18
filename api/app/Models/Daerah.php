<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Daerah extends Model
{
    protected $table = 'daerahs';

    protected $primaryKey = 'id';

    protected $fillable = [
        'nama_daerah',
    ];

    public function KepalaKeluarga()
    {
        return $this->hasMany(KepalaKeluarga::class, 'id_daerahs', 'id');
    }
}
