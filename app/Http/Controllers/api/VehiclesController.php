<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Controller;
use App\Models\Vehicle_car_steerings;
use App\Models\Vehicle_cubiccms;
use App\Models\Vehicle_doors;
use App\Models\Vehicle_exchanges;
use App\Models\Vehicle_features;
use App\Models\Vehicle_financials;
use App\Models\Vehicle_fuels;
use App\Models\Vehicle_gearboxes;
use App\Models\Vehicle_motorpowers;
use App\Models\Vehicle_regdates;
use App\Models\Vehicle_types;
use App\Models\Vehicles;
use Illuminate\Http\Request;

class VehiclesController extends Controller
{


    private function getData()
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

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = AuthController::getUserAuthenticated();

        $vehicle = Vehicles::with('vehicle_photos')->firstOrCreate([
            'user_id' => $user->id,
            'status' => 0
        ]);
        return array_merge(['vehicle' => $vehicle], $this->getData());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
