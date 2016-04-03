<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Emaillist extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('emaillist', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email');
            $table->string('firstname');
            $table->string('prefix');
            $table->string('lastname');
            $table->tinyInteger('standard');
            $table->tinyInteger('eduB');
            $table->tinyInteger('eduV');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
