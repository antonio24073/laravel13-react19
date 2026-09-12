<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle_brands;
use App\Models\Vehicle_car_steerings;
use App\Models\Vehicle_cubiccms;
use App\Models\Vehicle_doors;
use App\Models\Vehicle_exchanges;
use App\Models\Vehicle_features;
use App\Models\Vehicle_financials;
use App\Models\Vehicle_fuels;
use App\Models\Vehicle_gearboxes;
use App\Models\Vehicle_models;
use App\Models\Vehicle_motorpowers;
use App\Models\Vehicle_regdates;
use App\Models\Vehicle_types;
use App\Models\Vehicle_versions;
use Illuminate\Http\Request;

class VehiclesFieldsController extends Controller
{
    private function getData(): array
    {
        return [
            'vehicle_types' => Vehicle_types::all(),
            'regdate' => Vehicle_regdates::orderBy('label', 'asc')->get(),
            'gearbox' => Vehicle_gearboxes::all(),
            'fuel' => Vehicle_fuels::all(),
            'car_steering' => Vehicle_car_steerings::all(),
            'motorpower' => Vehicle_motorpowers::all(),
            'doors' => Vehicle_doors::all(),
            'features' => Vehicle_features::all(),
            'exchange' => Vehicle_exchanges::all(),
            'financial' => Vehicle_financials::all(),
            'cubiccms' => Vehicle_cubiccms::all(),
        ];
    }

    public function index(Request $request)
    {
        $field = $request->query('field');

        if ($field === null) {
            return response()->json($this->getData());
        }

        $validated = $request->validate([
            'field' => ['required', 'in:brands,models,versions'],
            'search' => ['nullable', 'string', 'max:100'],
            'brand_id' => ['nullable', 'integer'],
            'model_id' => ['nullable', 'integer'],
            'value' => ['nullable', 'integer'],
        ]);

        $search = trim($validated['search'] ?? '');
        $value = $validated['value'] ?? null;

        $query = match ($validated['field']) {
            'brands' => Vehicle_brands::query(),
            'models' => Vehicle_models::query()->when(
                $validated['brand_id'] ?? null,
                fn ($query, $brandId) => $query->where('brand_id', $brandId)
            ),
            'versions' => Vehicle_versions::query()->when(
                $validated['model_id'] ?? null,
                fn ($query, $modelId) => $query->where('model_id', $modelId)
            ),
        };

        $query->where(function ($query) use ($search, $value) {
            if ($search !== '') {
                $query->where('label', 'like', "%{$search}%");
            }

            if ($value !== null) {
                $query->orWhere('value', $value);
            }
        });

        return response()->json([
            $validated['field'] => $query
                ->orderBy('label')
                ->limit(20)
                ->get(),
        ]);
    }
}
