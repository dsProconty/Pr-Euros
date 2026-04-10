<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tax extends Model
{
    use HasFactory;

    protected $fillable=['tax','description'];

    /**
     * Una sola tasa de simulador para EUR↔USD (mismo valor en ambos sentidos).
     * Se guarda en tax = SIMULADOR_EUR_DOL.
     */
    public function obtener_tasas_cambio()
    {
        $fila = Tax::where('tax', 'SIMULADOR_EUR_DOL')->first();

        if (!$fila || !is_numeric($fila->description)) {
            $legacy = Tax::where('tax', 'EUR_USD')->first();
            if ($legacy && is_numeric($legacy->description)) {
                return ['tasa' => (float) $legacy->description];
            }

            return ['tasa' => null];
        }

        return ['tasa' => (float) $fila->description];
    }

    public function guardar_tasas_cambio($tasa)
    {
        Tax::updateOrCreate(
            ['tax' => 'SIMULADOR_EUR_DOL'],
            ['description' => (string) $tasa]
        );

        Tax::whereIn('tax', ['EUR_USD', 'USD_EUR'])->delete();
    }
}
