<?php

namespace App\Http\Controllers\api\uploads;

use App\Http\Controllers\Controller;
use App\Models\Vehicle_photos;
use App\Models\Vehicles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class VehicleUploadController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user('api');
        $file = $request->file('file');
        if (!$file || !$file->isValid()) {
            return response()->json(['success' => false, 'message' => 'Invalid file'], 422);
        }

        $filename = md5(uniqid(time()));
        $extension = strrchr($file->getClientOriginalName(), '.');
        $completefilename = $filename . $extension;

        $vehicle = Vehicles::where('user_id', $user->id)
            ->find($request->vehicle_id);
        if (!$vehicle) {
            return response()->json(['success' => false, 'message' => 'Vehicle not found'], 404);
        }

        if ($request->hasFile('file')) {
            $photo = Vehicle_photos::create([
                'user_id' => $user->id,
                'vehicle_id' => $request->vehicle_id,
                'img' => $completefilename
            ]);
            if ($photo) {

                $image = ImageManager::usingDriver(Driver::class)
                    ->decode($file);
                $image->scaleDown(width: 1000);

                $file->move(public_path('uploads/vehicles/' . $user->id . '/' . $photo->vehicle_id), $completefilename);
                Storage::put(
                    'uploads/vehicles/' . $user->id . '/' . $photo->vehicle_id . '/' . $completefilename,
                    (string) $image->encode(),
                    'public'
                );

                return response()->json([
                    'success' => true,
                    'message' => 'File uploaded successfully',
                    'data' => $filename,
                    'photos' => [$completefilename],
                    'photo' => $photo,
                ], 200);
            }
        }
        return response()->json(['success' => false, 'message' => 'Error saving photo'], 500);
    }

    public function update(Request $request)
    {
        $user = $request->user('api');
        foreach ($request->order as $order => $id) {
            $position = Vehicle_photos::where('user_id', $user->id)->find($id);
            if ($position) {
                $position->order = $order;
                $position->save();
            }
        }

        return response()->json([
            'photos' => Vehicle_photos::where('user_id', $user->id)
                ->where('vehicle_id', $request->route('vehicle'))
                ->orderBy('order')
                ->get()
                ->values(),
        ]);
    }



    public function destroy($id)
    {
        $user = Auth()->guard('api')->user();
        $photo = Vehicle_photos::where('user_id', $user->id)->find($id);
        if ($photo) {
            $path = 'uploads/vehicles/' . $user->id . '/' . $photo->vehicle_id . '/' . $photo->img;
            if(Storage::exists($path)) {
                Storage::delete($path);
            }
            if($photo->delete()) {
                return response()->json(['success' => true, 'message' => 'Photo deleted successfully'], 200);
            }
            return response()->json(['success' => false, 'message' => 'Error deleting photo'], 500);
        }
        return response()->json(['success' => false, 'message' => 'Photo not found'], 404);
    }
}
