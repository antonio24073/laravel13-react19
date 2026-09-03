<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Controller;
use App\Models\Vehicles;
use Illuminate\Http\Request;

class VehiclesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = AuthController::getUserAuthenticated();

        $vehicles = Vehicles::with('vehicle_photos')
            ->where('user_id', $user->id)
            ->get();

        return response()->json($vehicles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = AuthController::getUserAuthenticated();

        $vehicle = Vehicles::create([
            'user_id' => $user->id,
            'status' => 0,
        ]);

        $vehicle->load('vehicle_photos');

        return response()->json($vehicle, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = AuthController::getUserAuthenticated();

        $vehicle = Vehicles::with('vehicle_photos')
            ->where('user_id', $user->id)
            ->findOrFail($id);

        return response()->json($vehicle);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = AuthController::getUserAuthenticated();

        $vehicle = Vehicles::where('user_id', $user->id)
            ->findOrFail($id);

        $vehicle->update(
            $request->except([
                'id',
                'user_id',
                'created_at',
                'updated_at',
            ])
        );

        $vehicle->load('vehicle_photos');

        return response()->json($vehicle);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = AuthController::getUserAuthenticated();

        $vehicle = Vehicles::where('user_id', $user->id)
            ->findOrFail($id);

        $vehicle->delete();

        return response()->json([
            'message' => 'Vehicle deleted successfully.',
        ]);
    }
}
