<?php

namespace Database\Seeders;

use App\Models\Owners;
use App\Models\User;
use Illuminate\Database\Seeder;

class OwnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', env('ADMIN_USER_EMAIL'))->firstOrFail();

        $owners = [
            ['name' => 'Antonio Augusto', 'email' => 'antonio.augusto@example.com', 'phone' => '(11) 99999-1001', 'phone2' => '(11) 98888-1001', 'phone3' => '(11) 97777-1001', 'type' => 0, 'cpf' => '123.456.789-01', 'rg' => '12.345.678-9', 'cnpj' => null, 'ie' => null, 'zipCode' => '01001-000', 'city' => 'São Paulo', 'uf' => 'SP', 'neighborhood' => 'Sé', 'street' => 'Praça da Sé', 'streetNumber' => '100'],
            ['name' => 'Beatriz Martins', 'email' => 'beatriz.martins@example.com', 'phone' => '(21) 99999-1002', 'phone2' => '(21) 98888-1002', 'phone3' => '(21) 97777-1002', 'type' => 0, 'cpf' => '234.567.890-12', 'rg' => '23.456.789-0', 'cnpj' => null, 'ie' => null, 'zipCode' => '20040-020', 'city' => 'Rio de Janeiro', 'uf' => 'RJ', 'neighborhood' => 'Centro', 'street' => 'Rua do Ouvidor', 'streetNumber' => '200'],
            ['name' => 'Carlos Eduardo', 'email' => 'carlos.eduardo@example.com', 'phone' => '(31) 99999-1003', 'phone2' => '(31) 98888-1003', 'phone3' => '(31) 97777-1003', 'type' => 0, 'cpf' => '345.678.901-23', 'rg' => '34.567.890-1', 'cnpj' => null, 'ie' => null, 'zipCode' => '30130-110', 'city' => 'Belo Horizonte', 'uf' => 'MG', 'neighborhood' => 'Funcionários', 'street' => 'Rua da Bahia', 'streetNumber' => '300'],
            ['name' => 'Daniela Souza', 'email' => 'daniela.souza@example.com', 'phone' => '(41) 99999-1004', 'phone2' => '(41) 98888-1004', 'phone3' => '(41) 97777-1004', 'type' => 0, 'cpf' => '456.789.012-34', 'rg' => '45.678.901-2', 'cnpj' => null, 'ie' => null, 'zipCode' => '80010-000', 'city' => 'Curitiba', 'uf' => 'PR', 'neighborhood' => 'Centro', 'street' => 'Rua XV de Novembro', 'streetNumber' => '400'],
            ['name' => 'Eduardo Lima', 'email' => 'eduardo.lima@example.com', 'phone' => '(51) 99999-1005', 'phone2' => '(51) 98888-1005', 'phone3' => '(51) 97777-1005', 'type' => 0, 'cpf' => '567.890.123-45', 'rg' => '56.789.012-3', 'cnpj' => null, 'ie' => null, 'zipCode' => '90010-150', 'city' => 'Porto Alegre', 'uf' => 'RS', 'neighborhood' => 'Centro Histórico', 'street' => 'Rua dos Andradas', 'streetNumber' => '500'],
            ['name' => 'Fernanda Alves', 'email' => 'fernanda.alves@example.com', 'phone' => '(71) 99999-1006', 'phone2' => '(71) 98888-1006', 'phone3' => '(71) 97777-1006', 'type' => 0, 'cpf' => '678.901.234-56', 'rg' => '67.890.123-4', 'cnpj' => null, 'ie' => null, 'zipCode' => '40020-000', 'city' => 'Salvador', 'uf' => 'BA', 'neighborhood' => 'Nazaré', 'street' => 'Avenida Sete de Setembro', 'streetNumber' => '600'],
            ['name' => 'Gabriel Rocha', 'email' => 'gabriel.rocha@example.com', 'phone' => '(81) 99999-1007', 'phone2' => '(81) 98888-1007', 'phone3' => '(81) 97777-1007', 'type' => 0, 'cpf' => '789.012.345-67', 'rg' => '78.901.234-5', 'cnpj' => null, 'ie' => null, 'zipCode' => '50030-230', 'city' => 'Recife', 'uf' => 'PE', 'neighborhood' => 'Santo Antônio', 'street' => 'Rua do Imperador', 'streetNumber' => '700'],
            ['name' => 'Helena Castro', 'email' => 'helena.castro@example.com', 'phone' => '(85) 99999-1008', 'phone2' => '(85) 98888-1008', 'phone3' => '(85) 97777-1008', 'type' => 0, 'cpf' => '890.123.456-78', 'rg' => '89.012.345-6', 'cnpj' => null, 'ie' => null, 'zipCode' => '60060-170', 'city' => 'Fortaleza', 'uf' => 'CE', 'neighborhood' => 'Centro', 'street' => 'Rua Major Facundo', 'streetNumber' => '800'],
            ['name' => 'Isabela Mendes', 'email' => 'isabela.mendes@example.com', 'phone' => '(62) 99999-1009', 'phone2' => '(62) 98888-1009', 'phone3' => '(62) 97777-1009', 'type' => 0, 'cpf' => '901.234.567-89', 'rg' => '90.123.456-7', 'cnpj' => null, 'ie' => null, 'zipCode' => '74003-010', 'city' => 'Goiânia', 'uf' => 'GO', 'neighborhood' => 'Centro', 'street' => 'Avenida Goiás', 'streetNumber' => '900'],
            ['name' => 'João Oliveira', 'email' => 'joao.oliveira@example.com', 'phone' => '(27) 99999-1010', 'phone2' => '(27) 98888-1010', 'phone3' => '(27) 97777-1010', 'type' => 0, 'cpf' => '012.345.678-90', 'rg' => '01.234.567-8', 'cnpj' => null, 'ie' => null, 'zipCode' => '29010-000', 'city' => 'Vitória', 'uf' => 'ES', 'neighborhood' => 'Centro', 'street' => 'Avenida Jerônimo Monteiro', 'streetNumber' => '1000'],
        ];

        foreach ($owners as $owner) {
            Owners::updateOrCreate(
                ['user_id' => $user->id, 'email' => $owner['email']],
                [...$owner, 'user_id' => $user->id]
            );
        }
    }
}
