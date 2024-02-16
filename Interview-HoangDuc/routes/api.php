<?php

use App\Http\Controllers\API\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware([])->group(function () {
    Route::get('/dishes', [OrderController::class, 'getAllDishes']);
    Route::get('/meal-categories', [OrderController::class, 'getAllMealCategories']);
    Route::get('/restaurants', [OrderController::class, 'getAllRestaurants']);
    Route::post('/orders', [OrderController::class, 'store']);
});


