<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFlexSaveRatesTable extends Migration
{
    public function up()
    {
        Schema::create('flex_save_rates', function (Blueprint $table) {
            $table->id();
            $table->string('client_type', 2);   // PN o PJ
            $table->decimal('min_amount', 15, 2)->default(0);
            $table->decimal('max_amount', 15, 2)->nullable(); // null = sin límite superior
            $table->string('label');             // Descripción del rango, ej: "10,000 <= X < 50,000"
            $table->decimal('rate', 8, 4);       // Tasa en porcentaje, ej: 4.99
            $table->unsignedTinyInteger('orden')->default(0); // Orden de visualización
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('flex_save_rates');
    }
}
