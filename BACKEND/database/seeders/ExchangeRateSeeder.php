<?php

namespace Database\Seeders;

use App\Models\Tax;
use Illuminate\Database\Seeder;

class ExchangeRateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tax::updateOrCreate(
            ['tax' => 'SIMULADOR_EUR_DOL'],
            ['description' => '1.09']
        );

        Tax::updateOrCreate(
            ['tax' => 'EURO_COMISION'],
            ['description' => '29']
        );

        Tax::whereIn('tax', ['EUR_USD', 'USD_EUR'])->delete();
    }
}

