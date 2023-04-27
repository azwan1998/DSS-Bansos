<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Keluarga extends JsonResource
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
        $temp = json_decode($this->bobot);

        // $bobot;

        // foreach ($temp as $index => $bobots) {
        //     $bobot [] = "array index : {$index}";
        //     foreach ($bobots as $key) {
        //         if ($key->nilai !== null){
        //             print_r('adaa');exit;
        //         }
        //     }
        // }

        // dd($bobot);
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'NIK' => $this->NIK,
            'tanggal_lahir' => $this->tanggal_lahir,
            'jenis_kelamin' => $this->jenis_kelamin,
            'alamat' => $this->alamat,
            'bobot' => $temp
        ];
    }
}
