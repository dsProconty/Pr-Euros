<?php

namespace Database\Seeders;

use App\Models\FlexSaveRate;
use Illuminate\Database\Seeder;

class FlexSaveRateSeeder extends Seeder
{
    /**
     * Carga los rangos de tasas iniciales en la tabla flex_save_rates.
     * Estos valores quedan guardados en la BD y son editables desde el panel admin.
     */
    public function run()
    {
        $rangos = [
            // ---- Persona Natural (PN) ----
            ['client_type' => 'PN', 'min_amount' => 0,       'max_amount' => 10000,   'label' => 'X < 10,000',                   'rate' => 4.84, 'orden' => 1],
            ['client_type' => 'PN', 'min_amount' => 10000,   'max_amount' => 50000,   'label' => '10,000 <= X < 50,000',         'rate' => 4.99, 'orden' => 2],
            ['client_type' => 'PN', 'min_amount' => 50000,   'max_amount' => 300000,  'label' => '50,000 <= X < 300,000',        'rate' => 5.69, 'orden' => 3],
            ['client_type' => 'PN', 'min_amount' => 300000,  'max_amount' => 750000,  'label' => '300,000 <= X < 750,000',       'rate' => 5.24, 'orden' => 4],
            ['client_type' => 'PN', 'min_amount' => 750000,  'max_amount' => null,    'label' => 'X >= 750,000',                 'rate' => 0.24, 'orden' => 5],

            // ---- Persona Jurídica (PJ) ----
            ['client_type' => 'PJ', 'min_amount' => 0,        'max_amount' => 20000,   'label' => 'X < 20,000',                   'rate' => 2.24, 'orden' => 1],
            ['client_type' => 'PJ', 'min_amount' => 20000,    'max_amount' => 100000,  'label' => '20,000 <= X < 100,000',        'rate' => 4.49, 'orden' => 2],
            ['client_type' => 'PJ', 'min_amount' => 100000,   'max_amount' => 500000,  'label' => '100,000 <= X < 500,000',       'rate' => 5.49, 'orden' => 3],
            ['client_type' => 'PJ', 'min_amount' => 500000,   'max_amount' => 1000000, 'label' => '500,000 <= X < 1,000,000',     'rate' => 3.74, 'orden' => 4],
            ['client_type' => 'PJ', 'min_amount' => 1000000,  'max_amount' => 2000000, 'label' => '1,000,000 <= X < 2,000,000',  'rate' => 2.74, 'orden' => 5],
            ['client_type' => 'PJ', 'min_amount' => 2000000,  'max_amount' => null,    'label' => 'X >= 2,000,000',               'rate' => 0.24, 'orden' => 6],
        ];

        foreach ($rangos as $rango) {
            FlexSaveRate::updateOrCreate(
                [
                    'client_type' => $rango['client_type'],
                    'min_amount'  => $rango['min_amount'],
                    'max_amount'  => $rango['max_amount'],
                ],
                [
                    'label'  => $rango['label'],
                    'rate'   => $rango['rate'],
                    'orden'  => $rango['orden'],
                ]
            );
        }
    }
}
