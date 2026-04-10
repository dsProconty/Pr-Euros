<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuarioRolSeeder extends Seeder
{
    /**
     * Usuarios de ejemplo (cambiar contraseñas en producción).
     * Contraseña por defecto: password
     */
    public function run()
    {
        $usuarios = [
            [
                'name' => 'Usuario Cotizador EUR/USD',
                'email' => 'cotizador@procredit.test',
                'role_id' => Role::COTIZADOR_EUR_USD,
            ],
            [
                'name' => 'Usuario Simuladores',
                'email' => 'simuladores@procredit.test',
                'role_id' => Role::SIMULADORES_PRODUCTO,
            ],
            [
                'name' => 'Usuario Administrador Tasas',
                'email' => 'admin@procredit.test',
                'role_id' => Role::TODAS_LAS_TASAS,
            ],
        ];

        foreach ($usuarios as $u) {
            User::updateOrCreate(
                ['email' => $u['email']],
                [
                    'name' => $u['name'],
                    'password' => Hash::make('password'),
                    'role_id' => $u['role_id'],
                ]
            );
        }
    }
}
