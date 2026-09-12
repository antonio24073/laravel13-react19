<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Laravel\Passport\Passport;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            UserSeeder::class,
            OwnerSeeder::class,
            VehicleSeeder::class,
        ]);

        $this->ensurePersonalAccessClient();
    }

    private function ensurePersonalAccessClient(): void
    {
        $client = Passport::client()
            ->where('provider', 'users')
            ->where('revoked', false)
            ->get()
            ->first(fn ($client) => $client->hasGrantType('personal_access'));

        if ($client) {
            return;
        }

        Passport::client()->forceCreate([
            'name' => 'Auth API Personal Access Client',
            'secret' => Str::random(40),
            'provider' => 'users',
            'redirect_uris' => [],
            'grant_types' => ['personal_access'],
            'revoked' => false,
        ]);
    }
}
