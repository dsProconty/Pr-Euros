<?php


use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ClientController;
use App\Http\Controllers\API\CreditController;
use App\Http\Controllers\API\ExchangeController;
use App\Http\Controllers\API\FlexSaveRateController;
use App\Http\Controllers\API\SavingController;
use App\Http\Controllers\API\TaxController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Responder a preflight CORS (OPTIONS) en todas las rutas de la API
Route::options('/{any}', function () {
    return response('', 204)
        ->header('Access-Control-Allow-Origin', request()->header('Origin') ?? '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept')
        ->header('Access-Control-Max-Age', '86400');
})->where('any', '.*');

Route::post('login', [AuthController::class, 'login']);

/*
| GET publicos para simuladores (sin auth):
| usados por front sin login.
*/
Route::get('tasas-cambio', [ExchangeController::class, 'obtener_tasas']);
Route::get('euro-comision', [ExchangeController::class, 'obtener_comision']);
Route::get('flex-save-rates', [FlexSaveRateController::class, 'index']);
Route::get('flexSaving', [SavingController::class, 'get_flex']);
Route::get('dpfSaving', [SavingController::class, 'get_dpf']);
Route::get('creditoInversion', [CreditController::class, 'get_inversion']);
Route::get('creditoInmobiliario', [CreditController::class, 'get_inmobiliario']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('usuario', [AuthController::class, 'usuario']);

    /*
    | Rol 1 (cotizador EUR/USD) y Rol 3 (todas las tasas):
    | ver y modificar solo cotizador EUR/USD (una tasa en BD).
    */
    Route::middleware('role:1,3')->group(function () {
        Route::post('tasas-cambio', [ExchangeController::class, 'guardar_tasas']);
        Route::post('euro-comision', [ExchangeController::class, 'guardar_comision']);
    });

    /*
    | Rol 2 (simuladores producto) y Rol 3 (todas las tasas):
    | ahorros flex/dpf y creditos inversion/vivienda.
    */
    Route::middleware('role:2,3')->group(function () {
        Route::post('ahorro-flex/tasa', [SavingController::class, 'actualizar_tasa_flex']);
        Route::post('deposito-plazo-fijo/tasa', [SavingController::class, 'actualizar_tasa_dpf']);
        Route::post('credito-inversion/tasa', [CreditController::class, 'actualizar_tasa_credito_inversion']);
        Route::post('credito-vivienda/tasa', [CreditController::class, 'actualizar_tasa_credito_vivienda']);
        // CRUD completo de rangos PN/PJ del simulador FlexSave
        Route::post('flex-save-rates', [FlexSaveRateController::class, 'store']);
        Route::put('flex-save-rates/{id}', [FlexSaveRateController::class, 'update']);
        Route::delete('flex-save-rates/{id}', [FlexSaveRateController::class, 'destroy']);
    });
});

route::get('saving', [SavingController::class, 'index']);
route::get('proSavingsPlan', [SavingController::class, 'get_proPlan']);
route::post('client', [ClientController::class, 'store']);
route::post('career', [SavingController::class, 'save_career']);

route::get('credits', [CreditController::class, 'index']);
route::get('creditoEducativo', [CreditController::class, 'get_educativo']);

Route::prefix('tax')->group(function () {
    Route::get('/', [TaxController::class, 'getAll']);
    Route::post('/', [TaxController::class, 'create']);
    Route::delete('/{id}', [TaxController::class, 'delete']);
    Route::get('/{id}', [TaxController::class, 'get']);
    Route::put('/{id}', [TaxController::class, 'update']);
});
