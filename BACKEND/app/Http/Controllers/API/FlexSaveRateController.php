<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\FlexSaveRate;
use Illuminate\Http\Request;

class FlexSaveRateController extends Controller
{
    /** GET /api/flex-save-rates — público */
    public function index()
    {
        return response()->json(FlexSaveRate::getAllOrdered(), 200);
    }

    /** POST /api/flex-save-rates — crear rango (rol 2,3) */
    public function store(Request $request)
    {
        $request->validate([
            'client_type' => 'required|in:PN,PJ',
            'min_amount'  => 'required|numeric|min:0',
            'max_amount'  => 'nullable|numeric|gt:min_amount',
            'label'       => 'required|string|max:100',
            'rate'        => 'required|numeric|min:0',
        ]);

        // Calcular el siguiente orden para ese tipo
        $orden = FlexSaveRate::where('client_type', $request->client_type)->max('orden') + 1;

        $fila = FlexSaveRate::create([
            'client_type' => $request->client_type,
            'min_amount'  => (float) $request->min_amount,
            'max_amount'  => $request->max_amount !== null ? (float) $request->max_amount : null,
            'label'       => $request->label,
            'rate'        => (float) $request->rate,
            'orden'       => $orden,
        ]);

        return response()->json([
            'message'        => 'Rango creado correctamente.',
            'success'        => true,
            'flex_save_rate' => $fila,
        ], 201);
    }

    /** PUT /api/flex-save-rates/{id} — editar completo (rol 2,3) */
    public function update(Request $request, $id)
    {
        $fila = FlexSaveRate::find($id);
        if (!$fila) {
            return response()->json(['message' => 'Rango no encontrado.', 'success' => false], 404);
        }

        $request->validate([
            'min_amount' => 'sometimes|numeric|min:0',
            'max_amount' => 'nullable|numeric',
            'label'      => 'sometimes|string|max:100',
            'rate'       => 'sometimes|numeric|min:0',
        ]);

        if ($request->has('min_amount')) $fila->min_amount = (float) $request->min_amount;
        if ($request->has('max_amount')) $fila->max_amount = $request->max_amount !== null ? (float) $request->max_amount : null;
        if ($request->has('label'))      $fila->label      = $request->label;
        if ($request->has('rate'))       $fila->rate       = (float) $request->rate;

        $fila->save();

        return response()->json([
            'message'        => 'Rango actualizado correctamente.',
            'success'        => true,
            'flex_save_rate' => $fila,
        ], 200);
    }

    /** DELETE /api/flex-save-rates/{id} — eliminar (rol 2,3) */
    public function destroy($id)
    {
        $fila = FlexSaveRate::find($id);
        if (!$fila) {
            return response()->json(['message' => 'Rango no encontrado.', 'success' => false], 404);
        }

        $fila->delete();

        return response()->json(['message' => 'Rango eliminado correctamente.', 'success' => true], 200);
    }
}
