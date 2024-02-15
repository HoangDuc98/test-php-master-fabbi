<?php

namespace App\Repositories;

use App\Models\Dish;
use App\Models\Restaurant;

class RestaurantRepository
{
    public function getAllRestaurants()
    {
        return Restaurant::all();
    }
}
