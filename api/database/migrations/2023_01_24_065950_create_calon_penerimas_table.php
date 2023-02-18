<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCalonPenerimasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calon_penerimas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_kepala_keluargas');
            $table->integer('periode');
            $table->integer('nilai');
            $table->integer('rangking');
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
        Schema::dropIfExists('calon_penerimas');
    }
}
