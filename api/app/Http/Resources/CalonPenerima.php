<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CalonPenerima extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // dd($this);
        return  [
            'id' => $this->id,
            'nama' => $this->nama,
            'NIK' => $this->NIK,
            'kecamatan' => $this->nama_daerah,
            'nilai' => $this->nilai,
            'periode' => $this->periode,
        ];
        // return parent::toArray($request);
    }
}
