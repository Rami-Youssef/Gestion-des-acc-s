<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        
        Schema::create('demandes', function (Blueprint $table){
            $table->id();
            $table->string('désactivation');
            $table->string('société');
            $table->string('prénom');
            $table->string('nom');
            $table->string('fonction');
            $table->string('email')->unique();
            $table->string('direction');
            $table->string('site');
            $table->string('date-Activation');
            $table->string('date-Désactivation');
            $table->string('application');
            $table->json('dommaine');
            $table->json('role');
            $table->string('UPN');
            $table->string('MailGroup');
            $table->integer("niveau");
            $table->unsignedBigInteger("managerId");
            $table->foreign('managerId')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
            
        });

        

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demandeurs');
    }
};
