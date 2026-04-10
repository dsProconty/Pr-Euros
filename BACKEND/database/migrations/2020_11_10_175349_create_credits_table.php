<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCreditsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('credits', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->double('tasa');
            $table->double('tasa_ecologica');
            $table->double('montomin');
            $table->double('montomax');
            $table->integer('tiempomin')->unsigned();;
            $table->integer('tiempomax')->unsigned();;
            $table->double('valorbien');
            $table->double('coberturapropia');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('credits');
    }
}
