<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'tasa',
        'tasa_ecologica',
        'montomin',
        'montomax',
        'tiempomin',
        'tiempomax',
        'valorbien',
        'coberturapropia',
    ];

    public function get_credits(){
        $result=Credit::get();
        return $result;
    }

    public function get_credito_educativo(){
        $result= Credit::where('nombre','educativo')->get();
        return $result;
    }
    public function get_credito_inmobiliario(){
        $result= Credit::where('nombre','inmobiliario')->get();
        return $result;
    }
    public function get_credito_inversion(){
        $result= Credit::where('nombre','inversion')->get();
        return $result;
    }

    public function actualizar_tasa_inversion($tasa)
    {
        $fila = Credit::where('nombre', 'inversion')->first();

        if ($fila) {
            $fila->tasa = (float) $tasa;
            $fila->save();
            return $fila;
        }

        return Credit::create([
            'nombre' => 'inversion',
            'tasa' => (float) $tasa,
            'tasa_ecologica' => 0,
            'montomin' => 5000,
            'montomax' => 30000,
            'tiempomin' => 6,
            'tiempomax' => 60,
            'valorbien' => 0,
            'coberturapropia' => 0,
        ]);
    }

    public function actualizar_tasa_inmobiliario($tasa)
    {
        $fila = Credit::where('nombre', 'inmobiliario')->first();

        if ($fila) {
            $fila->tasa = (float) $tasa;
            $fila->save();
            return $fila;
        }

        return Credit::create([
            'nombre' => 'inmobiliario',
            'tasa' => (float) $tasa,
            'tasa_ecologica' => 8,
            'montomin' => 50000,
            'montomax' => 500000,
            'tiempomin' => 12,
            'tiempomax' => 240,
            'valorbien' => 50000,
            'coberturapropia' => 20,
        ]);
    }
}
