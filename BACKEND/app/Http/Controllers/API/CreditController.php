<?php

namespace App\Http\Controllers\API;

use App\Models\Credit;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CreditController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $credit= new Credit;
        $credits=$credit->get_credits();
        return $credits;
    }

    public function get_educativo(){
        $credit= new Credit;
        $credits=$credit->get_credito_educativo();
        return $credits;
    }

    public function get_inversion(){
        $credit= new Credit;
        $credits=$credit->get_credito_inversion();
        return $credits;
    }

    public function get_inmobiliario(){
        $credit= new Credit;
        $credits=$credit->get_credito_inmobiliario();
        return $credits;
    }

    public function actualizar_tasa_credito_inversion(Request $request)
    {
        $tasa = $request->input('tasa');

        if (!is_numeric($tasa)) {
            return response()->json([
                'message' => 'tasa debe ser numerica.',
                'success' => false,
            ], 422);
        }

        $credit = new Credit;
        $fila = $credit->actualizar_tasa_inversion($tasa);

        return response()->json([
            'message' => 'Tasa de credito de inversion actualizada correctamente.',
            'success' => true,
            'credito_inversion' => $fila,
        ], 200);
    }

    public function actualizar_tasa_credito_vivienda(Request $request)
    {
        $tasa = $request->input('tasa');

        if (!is_numeric($tasa)) {
            return response()->json([
                'message' => 'tasa debe ser numerica.',
                'success' => false,
            ], 422);
        }

        $credit = new Credit;
        $fila = $credit->actualizar_tasa_inmobiliario($tasa);

        return response()->json([
            'message' => 'Tasa de credito de vivienda actualizada correctamente.',
            'success' => true,
            'credito_vivienda' => $fila,
        ], 200);
    }
}
