<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlexSaveRate extends Model
{
    use HasFactory;

    protected $table = 'flex_save_rates';

    protected $fillable = ['client_type', 'min_amount', 'max_amount', 'label', 'rate', 'orden'];

    protected $casts = [
        'min_amount' => 'float',
        'max_amount' => 'float',
        'rate'       => 'float',
    ];

    public static function getAllOrdered()
    {
        return self::orderBy('client_type')->orderBy('orden')->get();
    }

    public static function getByType(string $clientType)
    {
        return self::where('client_type', strtoupper($clientType))
                   ->orderBy('orden')
                   ->get();
    }
}
