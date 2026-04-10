<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleSeeder::class);
        $this->call(UsuarioRolSeeder::class);
        $this->call(CreditSeeder::class);
        $this->call(ExchangeRateSeeder::class);
        $this->call(FlexSaveRateSeeder::class);
    }
}
