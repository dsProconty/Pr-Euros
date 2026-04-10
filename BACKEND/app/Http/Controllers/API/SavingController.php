<?php

namespace App\Http\Controllers\API;

use App\Models\Saving;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\DonationCertificate;
use PDF;

class SavingController extends Controller
{

    public function index()
    {
        $saving = new Saving;
        $savings= $saving->get_saving();
        return $savings;
    }
    public function get_flex(){
        $flex_saving= new Saving;
        $flex_savings=$flex_saving->get_flex();
        return $flex_savings;
    }
    public function get_dpf(){
        $flex_saving= new Saving;
        $flex_savings=$flex_saving->get_dpf();
        return $flex_savings;
    }
    public function get_proPlan(){
        $proplan_saving= new Saving;
        $proplan_savings=$proplan_saving->get_proplan();
        return $proplan_savings;
    }

    public function actualizar_tasa_flex(Request $request)
    {
        $tasa = $request->input('tasa');

        if (!is_numeric($tasa)) {
            return response()->json([
                'message' => 'tasa debe ser numerica.',
                'success' => false,
            ], 422);
        }

        $saving = new Saving;
        $fila = $saving->actualizar_tasa_flex($tasa);

        return response()->json([
            'message' => 'Tasa de ahorro flex actualizada correctamente.',
            'success' => true,
            'ahorro_flex' => $fila,
        ], 200);
    }

    public function actualizar_tasa_dpf(Request $request)
    {
        $tasa = $request->input('tasa');

        if (!is_numeric($tasa)) {
            return response()->json([
                'message' => 'tasa debe ser numerica.',
                'success' => false,
            ], 422);
        }

        $saving = new Saving;
        $fila = $saving->actualizar_tasa_dpf($tasa);

        return response()->json([
            'message' => 'Tasa de deposito a plazo fijo actualizada correctamente.',
            'success' => true,
            'deposito_plazo_fijo' => $fila,
        ], 200);
    }

    public function save_career(Request $request)
    {
        try{
            // Validación del Request
        $request->validate([
            'nombre' => 'required|string',
            'correo' => 'required|email',
        ]);

        // Obtener datos del Request
        $nombre = $request->input('nombre');
        $correo = $request->input('correo');

        // Comprobar duplicados
        $archivo = base_path('archivos/archivo.txt');
        
        if (file_exists($archivo)) {
            $contenido = file_get_contents($archivo);
            $lineas = explode("\n", $contenido);

            foreach ($lineas as $linea) {
                $datos = explode('|', $linea);
                if (count($datos) >= 2 && $datos[1] == $correo) {
                    return "Error: El correo ya existe.";
                }
            }
        }

        // Crear entrada
        $nuevaEntrada = "$nombre|$correo|" . Carbon::now()->toDateTimeString();

        // Actualizar archivo
        file_put_contents($archivo, $nuevaEntrada . "\n", FILE_APPEND);

        // Enviar correo
        $datosCorreo = [
            'nombre' => $nombre,
            'correo' => $correo,
        ];

        // Generar PDF
        $pdf = PDF::loadView('donation_certificate_pdf', ['datosCorreo' => $datosCorreo]);

        // Guardar el PDF en una ubicación temporal
        $pdfPath = storage_path('app/temp_certificate.pdf');
        $pdf->save($pdfPath);

            

            Mail::to($correo)->send(new DonationCertificate($datosCorreo, $pdfPath));

            // Eliminar el PDF temporal
            unlink($pdfPath);

            $message="Ingresado Exitosamente";
            return $message;
        }catch (\Throwable $e){
            return $e;
        }
    }

}
