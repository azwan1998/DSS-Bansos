<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubKriteria extends Model
{
    protected $table = 'sub_kriterias';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id_kriterias',
        'nama',
        'nilai',
    ];

    public function Kriteria()
    {
        return $this->BelongsTo(Kriteria::class, 'id_kriterias', 'id');
    }
}
