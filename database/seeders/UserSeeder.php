<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('users')->updateOrInsert(
            ['email' => env('ADMIN_USER_EMAIL')],
            [
                'name' => env('ADMIN_USER_NAME'),
                'password' => Hash::make(env('ADMIN_USER_PASSWORD')),
            ]
        );

    }
}
