<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kriteria extends Model
{
    protected $table = 'kriterias';

    protected $primaryKey = 'id';

    protected $fillable = [
        'code',
        'nama_kriteria',
        'bobot_kriteria',
        'atribut',
    ];

    public function SubKriteria()
    {
        return $this->hasMany(SubKriteria::class, 'id_kriterias', 'id');
    }
}
