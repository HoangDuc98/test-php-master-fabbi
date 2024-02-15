<?php

namespace App\Repositories;

use App\Models\MealCategory;
use App\Models\Restaurant;

class MealCategoryRepository
{
    public function getAllMealCategories()
    {
        return MealCategory::all();
    }

}
