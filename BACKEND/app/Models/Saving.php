<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Saving extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'rate', 'minimum_time', 'maximum_time'];

    public function  get_saving(){
        $result = Saving::get();
        return $result;
    }

    public function get_flex(){
        $result=Saving::where('name',"flex")->get();
        return $result;
    }
    public function get_dpf(){
        $result=Saving::where('name',"dpf")->get();
        return $result;
    }
    public function get_proplan(){
        $result=Saving::where('name',"proplan")->get();
        return $result;
    }

    public function actualizar_tasa_flex($tasa)
    {
        $fila = Saving::where('name', 'flex')->first();

        if ($fila) {
            $fila->rate = (float) $tasa;
            $fila->save();
            return $fila;
        }

        return Saving::create([
            'name' => 'flex',
            'rate' => (float) $tasa,
            'minimum_time' => 1,
            'maximum_time' => 365,
        ]);
    }

    public function actualizar_tasa_dpf($tasa)
    {
        $fila = Saving::where('name', 'dpf')->first();

        if ($fila) {
            $fila->rate = (float) $tasa;
            $fila->save();
            return $fila;
        }

        return Saving::create([
            'name' => 'dpf',
            'rate' => (float) $tasa,
            'minimum_time' => 6,
            'maximum_time' => 60,
        ]);
    }
}
