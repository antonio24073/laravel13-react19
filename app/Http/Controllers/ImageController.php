<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Format;
use Intervention\Image\ImageManager;

class ImageController extends Controller
{
    public function thumb(Request $request, $path, $filename)
    {
        $user = ($request->u) ? (int) $request->u . '/' : null;
        $subPath = ($request->s) ? (int) $request->s . '/' : null;
        $width = ($request->w) ? (int) $request->w : null;
        $height = ($request->h) ? (int) $request->h : null;
        $path = $path . '/' . $subPath . $user . $filename;
        $url = Storage::get($path);
        $manager = ImageManager::usingDriver(Driver::class);
        $image = $manager->decodeBinary($url);

        if (!$width && !$height) {
        } elseif ($width && $height) {
            $image = $image
                ->cover($width, $height);
        } else {
            $image = $image
                ->scale(
                    width: $width,
                    height: $height
                );
        }

        if (isset($image)) {
            return response(
                $image->encodeUsingFormat(Format::JPEG),
                200
            )
                ->header('Content-Type', 'image/jpeg')
                ->setMaxAge(31536000)
                ->setPublic();
        } else {
            return response()->json(['success' => false, 'message' => 'Image not found'], 404);
        }
    }
}
