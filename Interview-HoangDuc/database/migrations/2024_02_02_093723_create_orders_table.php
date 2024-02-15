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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('restaurant_id');
            $table->unsignedBigInteger('meal_category_id');
            $table->integer('number_of_people');
            $table->integer('total_dishes')->default(0);
            $table->timestamps();
            $table->foreign('restaurant_id')->references('id')->on('restaurants');
            $table->foreign('meal_category_id')->references('id')->on('meal_categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
