<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KepalaKeluarga extends Model
{
    protected $table = 'kepala_keluargas';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id_daerahs',
        'nama',
        'NIK',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
    ];

    public function Penerima()
    {
        return $this->hasMany(Penerima::class, 'id_kepala_keluargas', 'id');
    }

    public function Daerah()
    {
        return $this->BelongsTo(Daerah::class, 'id_daerahs', 'id');
    }
}
