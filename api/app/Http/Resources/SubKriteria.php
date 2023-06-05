<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Kriteria;

class SubKriteria extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $kriteria = Kriteria::select('nama_kriteria', 'atribut')->where('id', $this->id)->first();


        return  [
            'id' => $this->id,
            'nama' => $this->nama,
            'nilai' => $this->nilai,
            'nama_kriteria' => $kriteria->nama_kriteria;
            'atribut' => $kriteria->atribut ? 'BENEFIT' : 'COST',
        ];
    }
}
