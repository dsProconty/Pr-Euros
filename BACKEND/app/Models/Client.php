<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable=[
        'id',
        'name',
        'martial_status',
        'number',
        'email',
        'economic_activity',
        'average_income',
    ];
}
