<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tax;
use Illuminate\Http\Request;

class ExchangeController extends Controller
{
    public function obtener_tasas()
    {
        $tax = new Tax;
        $result = $tax->obtener_tasas_cambio();

        return response()->json(array_merge([
            'simulador_euros' => true,
            'nota' => 'Una sola tasa de referencia para EUR/USD y USD/EUR en el simulador; no es tipo de cambio oficial.',
        ], $result), 200);
    }

    public function guardar_tasas(Request $request)
    {
        $tasa = $request->input('tasa');

        if (!is_numeric($tasa)) {
            return response()->json([
                'message' => 'tasa debe ser numerica.',
                'success' => false,
            ], 422);
        }

        $tax = new Tax;
        $tax->guardar_tasas_cambio($tasa);

        return response()->json([
            'message' => 'Tasa del simulador EUR/USD guardada correctamente.',
            'success' => true,
            'simulador_euros' => true,
        ], 200);
    }
}

