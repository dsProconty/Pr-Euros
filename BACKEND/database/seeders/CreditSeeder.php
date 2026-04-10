<?php

namespace Database\Seeders;

use App\Models\Credit;
use App\Models\Saving;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use mysql_xdevapi\Table;

class CreditSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        //
        Credit::truncate();
        Saving::truncate();

        DB::table('credits')->insert([
           'nombre'=>'educativo',
           'tasa'=>8.5,
            'tasa_ecologica'=>0,
            'montomin'=>1000,
            'montomax'=>30000,
            'tiempomin'=>6,
            'tiempomax'=>48,
            'valorbien'=>0,
            'coberturapropia'=>0
        ]);
        DB::table('credits')->insert([
            'nombre'=>'inversion',
            'tasa'=>13,
            'tasa_ecologica'=>0,
            'montomin'=>5000,
            'montomax'=>30000,
            'tiempomin'=>6,
            'tiempomax'=>60,
            'valorbien'=>0,
            'coberturapropia'=>0
        ]);
        DB::table('credits')->insert([
            'nombre'=>'inmobiliario',
            'tasa'=>9,
            'tasa_ecologica'=>8,
            'montomin'=>50000,
            'montomax'=>500000,
            'tiempomin'=>12,
            'tiempomax'=>240,
            'valorbien'=>50000,
            'coberturapropia'=>20
        ]);

        DB::table('savings')->insert([
       'name'=>'flex',
       'rate'=>3.5,
       'minimum_time'=>1,
       'maximum_time'=>365,
    ]);
        DB::table('savings')->insert([
            'name'=>'dpf',
            'rate'=>5,
            'minimum_time'=>6,
            'maximum_time'=>60,
        ]);
    }
}
