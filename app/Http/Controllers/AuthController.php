<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        sleep(2);
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

        if ($response->status() == 200) {
            return response()->json($response->json(), 200);
        } else {
            return response()->json(
                [
                    'url' => config('services.passport.url') . '/oauth/token',
                    'status' => $response->status(),
                    'successful' => $response->successful(),
                    'failed' => $response->failed(),
                    'body' => $response->body(),
                    'json' => $response->json()
                ],
                500
            );
        }
    }
}
