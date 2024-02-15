<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'meal_category_id' => 'required|exists:meal_categories,id',
            'restaurant_id' => 'required|exists:restaurants,id',
            'number_of_people' => 'required|integer|min:1|max:10',
            'dishes' => 'required|array',
            'dishes.*.id' => 'required|exists:dishes,id',
            'dishes.*.quantity' => 'required|integer|min:1',
            ];
    }

    public function messages(): array
    {
        return [
            'meal_category_id.required' => 'The meal category is required.',
            'meal_category_id.exists' => 'The selected meal category is invalid.',
            'restaurant_id.required' => 'The restaurant is required.',
            'restaurant_id.exists' => 'The selected restaurant is invalid.',
            'number_of_people.required' => 'The number of people is required.',
            'number_of_people.integer' => 'The number of people must be an integer.',
            'number_of_people.min' => 'The number of people must be at least :min.',
            'number_of_people.max' => 'The number of people may not be greater than :max.',
            'dishes.required' => 'At least one dish is required.',
            'dishes.array' => 'The dishes must be an array.',
            'dishes.*.id.required' => 'The dish ID is required.',
            'dishes.*.id.exists' => 'The selected dish is invalid.',
            'dishes.*.quantity.required' => 'The quantity of each dish is required.',
            'dishes.*.quantity.integer' => 'The quantity of each dish must be an integer.',
            'dishes.*.quantity.min' => 'The quantity of each dish must be at least :min.',
        ];
    }
}
