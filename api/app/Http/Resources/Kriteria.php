<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\SubKriteria;

class Kriteria extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $subKriteria = SubKriteria::where('id_kriterias', $this->id)->get();

        return  [
            'id' => $this->id,
            'nama' => $this->nama_kriteria,
            'bobot_kriteria' => $this->bobot_kriteria,
            'atribut' => $this->atribut,
            'code' => $this->code,
            'subKriteria' => $subKriteria
        ];
    }
}
