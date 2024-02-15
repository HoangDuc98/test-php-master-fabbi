<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function mealCategories() {
        return $this->belongsToMany(MealCategory::class);
    }

    public function dishes() {
        return $this->hasMany(Dish::class);
    }
}
