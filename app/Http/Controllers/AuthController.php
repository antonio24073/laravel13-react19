<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);


        $response = Http::asForm()->post(
            config('services.passport.url') . '/oauth/token',
            [
                'grant_type' => 'password',
                'client_id' => config('services.passport.client_id'),
                'client_secret' => config('services.passport.client_secret'),
                'username' => $request->email,
                'password' => $request->password,
                'scope' => '',
            ]
        );

        $data = new \stdClass();
        $data->json = $response->json();
        $data->status = $response->status();
        
        return response()->json($data);
    }
}
