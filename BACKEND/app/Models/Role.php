<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public const COTIZADOR_EUR_USD = 1;

    public const SIMULADORES_PRODUCTO = 2;

    public const TODAS_LAS_TASAS = 3;

    protected $fillable = [
        'id',
        'nombre',
        'slug',
        'descripcion',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
