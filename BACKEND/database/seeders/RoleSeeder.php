<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            [
                'id' => Role::COTIZADOR_EUR_USD,
                'nombre' => 'Cotizador EUR/USD',
                'slug' => 'cotizador_eur_usd',
                'descripcion' => 'Ver y modificar solo la tasa del cotizador EUR/USD.',
            ],
            [
                'id' => Role::SIMULADORES_PRODUCTO,
                'nombre' => 'Simuladores de producto',
                'slug' => 'simuladores_producto',
                'descripcion' => 'Ver y modificar solo tasas de simuladores (ahorros y creditos).',
            ],
            [
                'id' => Role::TODAS_LAS_TASAS,
                'nombre' => 'Todas las tasas',
                'slug' => 'todas_las_tasas',
                'descripcion' => 'Ver y modificar todas las tasas: simuladores y cotizador EUR/USD.',
            ],
        ];

        foreach ($roles as $r) {
            Role::updateOrCreate(
                ['id' => $r['id']],
                [
                    'nombre' => $r['nombre'],
                    'slug' => $r['slug'],
                    'descripcion' => $r['descripcion'],
                ]
            );
        }
    }
}
