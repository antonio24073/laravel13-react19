<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Controller;
use App\Models\Owners;
use Illuminate\Http\Request;

class OwnersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = AuthController::getUserAuthenticated();

        return response()->json(
            Owners::where('user_id', $user->id)
                ->orderBy('name')
                ->paginate(12)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = AuthController::getUserAuthenticated();

        $owner = Owners::create([
            ...$request->validate(Owners::$rules),
            'user_id' => $user->id,
        ]);

        return response()->json($owner, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $user = AuthController::getUserAuthenticated();

        $owner = Owners::where('user_id', $user->id)->findOrFail($id);

        return response()->json($owner);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $user = AuthController::getUserAuthenticated();

        $owner = Owners::where('user_id', $user->id)->findOrFail($id);
        $owner->update($request->validate(Owners::$rules));

        return response()->json($owner->refresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $user = AuthController::getUserAuthenticated();

        $owner = Owners::where('user_id', $user->id)->findOrFail($id);
        $owner->delete();

        return response()->json([
            'message' => 'Owner deleted successfully.',
        ]);
    }
}
