<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'errors' => $validator->errors()
                ],
                400
            );
        }

        // Você pode usar como abaixo:
        // User::created([
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'password' => $request->password
        // ]);

        // Ou como abaixo:
        // User::created($request->all());
        // porém nesse caso você precisa abrir a classe User
        // e preencher $fillable só com os campos que
        // você vai usar, para ninguém por exemplo colocar
        // uma data maior de expiração do plano pelo front end
        // Também pode preencher na classe User, o $guarded
        // que é ao contrário do $fillable, seria a blocklist
        // os que não esão em $guarded poderiam ser atualizados

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;

        $user->password = Hash::make($request->password);
        $user->password = Hash::make($request->password);

        $date = Carbon::now();
        $user->next_expiration = $date->addDays(7);
        $delete_account = clone($date);
        $user->delete_account = $delete_account->addDays(15);

        $user->save();

        if($user->id){
            return response()->json([
                'access_token' => $user->createToken('auth-api')->accessToken,
            ], 200);
        }

        return response()->json([
            'error' => 'Erro ao cadastrar usuário'
        ], 400);
    }
}
