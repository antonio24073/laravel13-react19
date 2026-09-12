<?php

namespace Database\Seeders;

use App\Models\Owners;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OwnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'test@example.com')->firstOrFail();

        $owners = [
            ['name' => 'Antonio Augusto', 'email' => 'antonio.augusto@example.com', 'phone' => '(11) 99999-1001', 'city' => 'São Paulo', 'uf' => 'SP'],
            ['name' => 'Beatriz Martins', 'email' => 'beatriz.martins@example.com', 'phone' => '(21) 99999-1002', 'city' => 'Rio de Janeiro', 'uf' => 'RJ'],
            ['name' => 'Carlos Eduardo', 'email' => 'carlos.eduardo@example.com', 'phone' => '(31) 99999-1003', 'city' => 'Belo Horizonte', 'uf' => 'MG'],
            ['name' => 'Daniela Souza', 'email' => 'daniela.souza@example.com', 'phone' => '(41) 99999-1004', 'city' => 'Curitiba', 'uf' => 'PR'],
            ['name' => 'Eduardo Lima', 'email' => 'eduardo.lima@example.com', 'phone' => '(51) 99999-1005', 'city' => 'Porto Alegre', 'uf' => 'RS'],
            ['name' => 'Fernanda Alves', 'email' => 'fernanda.alves@example.com', 'phone' => '(71) 99999-1006', 'city' => 'Salvador', 'uf' => 'BA'],
            ['name' => 'Gabriel Rocha', 'email' => 'gabriel.rocha@example.com', 'phone' => '(81) 99999-1007', 'city' => 'Recife', 'uf' => 'PE'],
            ['name' => 'Helena Castro', 'email' => 'helena.castro@example.com', 'phone' => '(85) 99999-1008', 'city' => 'Fortaleza', 'uf' => 'CE'],
            ['name' => 'Isabela Mendes', 'email' => 'isabela.mendes@example.com', 'phone' => '(62) 99999-1009', 'city' => 'Goiânia', 'uf' => 'GO'],
            ['name' => 'João Oliveira', 'email' => 'joao.oliveira@example.com', 'phone' => '(27) 99999-1010', 'city' => 'Vitória', 'uf' => 'ES'],
        ];

        foreach ($owners as $owner) {
            Owners::updateOrCreate(
                ['user_id' => $user->id, 'email' => $owner['email']],
                [...$owner, 'user_id' => $user->id, 'type' => 0]
            );
        }
    }
}
