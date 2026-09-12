<?php

namespace Database\Seeders;

use App\Models\Owners;
use App\Models\User;
use App\Models\Vehicles;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', env('ADMIN_USER_EMAIL'))->firstOrFail();
        $owners = Owners::where('user_id', $user->id)->orderBy('id')->get();

        $vehicles = [
            ['tag_id' => 1001, 'title' => 'Toyota Corolla XEi', 'description' => 'Sedã confortável, revisado e pronto para uso.', 'vehicle_brand' => 73, 'vehicle_model' => 1, 'vehicle_version' => 1, 'vehicle_regdate' => 2022, 'vehicle_gearbox' => 2, 'vehicle_steering' => 1, 'vehicle_motorpower' => 180, 'vehicle_doors' => 4, 'vehicle_fuel' => 2, 'vehicle_color' => 1, 'vehicle_type' => 1, 'vehicle_features' => ['Ar condicionado', 'Câmera de ré', 'Controle de tração'], 'vehicle_price' => 89500, 'vehicle_mileage' => 42000, 'zipCode' => '01001-000', 'city' => 'São Paulo', 'uf' => 'SP', 'name' => 'Corolla'],
            ['tag_id' => 1002, 'title' => 'Honda Civic EXL', 'description' => 'Civic automático com ótimo estado de conservação.', 'vehicle_brand' => 25, 'vehicle_model' => 2, 'vehicle_version' => 2, 'vehicle_regdate' => 2021, 'vehicle_gearbox' => 2, 'vehicle_steering' => 1, 'vehicle_motorpower' => 177, 'vehicle_doors' => 4, 'vehicle_fuel' => 2, 'vehicle_color' => 2, 'vehicle_type' => 1, 'vehicle_features' => ['Ar condicionado', 'Airbag', 'Teto solar'], 'vehicle_price' => 112900, 'vehicle_mileage' => 31500, 'zipCode' => '20040-020', 'city' => 'Rio de Janeiro', 'uf' => 'RJ', 'name' => 'Civic'],
            ['tag_id' => 1003, 'title' => 'Volkswagen T-Cross Highline', 'description' => 'SUV equipado, econômico e com baixa quilometragem.', 'vehicle_brand' => 56, 'vehicle_model' => 3, 'vehicle_version' => 3, 'vehicle_regdate' => 2023, 'vehicle_gearbox' => 2, 'vehicle_steering' => 1, 'vehicle_motorpower' => 150, 'vehicle_doors' => 4, 'vehicle_fuel' => 2, 'vehicle_color' => 3, 'vehicle_type' => 2, 'vehicle_features' => ['Câmera de ré', 'GPS', 'Controle de tração'], 'vehicle_price' => 139900, 'vehicle_mileage' => 18000, 'zipCode' => '30130-110', 'city' => 'Belo Horizonte', 'uf' => 'MG', 'name' => 'T-Cross'],
            ['tag_id' => 1004, 'title' => 'Chevrolet Onix Premier', 'description' => 'Hatch completo, ideal para cidade e estrada.', 'vehicle_brand' => 23, 'vehicle_model' => 4, 'vehicle_version' => 4, 'vehicle_regdate' => 2022, 'vehicle_gearbox' => 2, 'vehicle_steering' => 1, 'vehicle_motorpower' => 116, 'vehicle_doors' => 4, 'vehicle_fuel' => 2, 'vehicle_color' => 4, 'vehicle_type' => 1, 'vehicle_features' => ['Ar condicionado', 'Alarme', 'GPS'], 'vehicle_price' => 87990, 'vehicle_mileage' => 27000, 'zipCode' => '80010-000', 'city' => 'Curitiba', 'uf' => 'PR', 'name' => 'Onix'],
            ['tag_id' => 1005, 'title' => 'Ford Ranger Limited', 'description' => 'Picape potente com tração e acabamento premium.', 'vehicle_brand' => 24, 'vehicle_model' => 5, 'vehicle_version' => 5, 'vehicle_regdate' => 2021, 'vehicle_gearbox' => 2, 'vehicle_steering' => 1, 'vehicle_motorpower' => 200, 'vehicle_doors' => 4, 'vehicle_fuel' => 3, 'vehicle_color' => 5, 'vehicle_type' => 3, 'vehicle_features' => ['Câmera de ré', 'Controle de tração', 'GPS'], 'vehicle_price' => 219900, 'vehicle_mileage' => 22000, 'zipCode' => '90010-150', 'city' => 'Porto Alegre', 'uf' => 'RS', 'name' => 'Ranger'],
            ['tag_id' => 1006, 'title' => 'Fiat Pulse Impetus', 'description' => 'SUV compacto moderno, confortável e conectado.', 'vehicle_brand' => 21, 'vehicle_model' => 6, 'vehicle_version' => 6, 'vehicle_regdate' => 2023, 'vehicle_gearbox' => 2, 'vehicle_steering' => 1, 'vehicle_motorpower' => 130, 'vehicle_doors' => 4, 'vehicle_fuel' => 2, 'vehicle_color' => 6, 'vehicle_type' => 2, 'vehicle_features' => ['Ar condicionado', 'Câmera de ré', 'Teto solar'], 'vehicle_price' => 118500, 'vehicle_mileage' => 12000, 'zipCode' => '40020-000', 'city' => 'Salvador', 'uf' => 'BA', 'name' => 'Pulse'],
            ['tag_id' => 1007, 'title' => 'Hyundai Creta Ultimate', 'description' => 'SUV espaçoso com tecnologia e segurança.', 'vehicle_brand' => 29, 'vehicle_model' => 7, 'vehicle_version' => 7, 'vehicle_regdate' => 2022, 'vehicle_gearbox' => 2, 'vehicle_steering' => 1, 'vehicle_motorpower' => 166, 'vehicle_doors' => 4, 'vehicle_fuel' => 2, 'vehicle_color' => 1, 'vehicle_type' => 2, 'vehicle_features' => ['Blindado', 'Câmera de ré', 'Controle de tração'], 'vehicle_price' => 154900, 'vehicle_mileage' => 9000, 'zipCode' => '50030-230', 'city' => 'Recife', 'uf' => 'PE', 'name' => 'Creta'],
            ['tag_id' => 1008, 'title' => 'Jeep Compass Longitude', 'description' => 'SUV premium com excelente desempenho e conforto.', 'vehicle_brand' => 31, 'vehicle_model' => 8, 'vehicle_version' => 8, 'vehicle_regdate' => 2020, 'vehicle_gearbox' => 2, 'vehicle_steering' => 1, 'vehicle_motorpower' => 175, 'vehicle_doors' => 4, 'vehicle_fuel' => 3, 'vehicle_color' => 2, 'vehicle_type' => 2, 'vehicle_features' => ['Ar condicionado', 'Airbag', 'GPS'], 'vehicle_price' => 167900, 'vehicle_mileage' => 35000, 'zipCode' => '60060-170', 'city' => 'Fortaleza', 'uf' => 'CE', 'name' => 'Compass'],
            ['tag_id' => 1009, 'title' => 'Nissan Kicks Exclusive', 'description' => 'Crossover econômico, confortável e bem equipado.', 'vehicle_brand' => 47, 'vehicle_model' => 9, 'vehicle_version' => 9, 'vehicle_regdate' => 2022, 'vehicle_gearbox' => 2, 'vehicle_steering' => 1, 'vehicle_motorpower' => 114, 'vehicle_doors' => 4, 'vehicle_fuel' => 2, 'vehicle_color' => 3, 'vehicle_type' => 2, 'vehicle_features' => ['Ar condicionado', 'GPS', 'Câmera de ré'], 'vehicle_price' => 132900, 'vehicle_mileage' => 16000, 'zipCode' => '74003-010', 'city' => 'Goiânia', 'uf' => 'GO', 'name' => 'Kicks'],
            ['tag_id' => 1010, 'title' => 'Renault Duster Iconic', 'description' => 'SUV robusto, espaçoso e pronto para viagens.', 'vehicle_brand' => 52, 'vehicle_model' => 10, 'vehicle_version' => 10, 'vehicle_regdate' => 2021, 'vehicle_gearbox' => 2, 'vehicle_steering' => 1, 'vehicle_motorpower' => 170, 'vehicle_doors' => 4, 'vehicle_fuel' => 2, 'vehicle_color' => 4, 'vehicle_type' => 2, 'vehicle_features' => ['Ar condicionado', 'Câmera de ré', 'Controle de tração'], 'vehicle_price' => 124900, 'vehicle_mileage' => 29000, 'zipCode' => '29010-000', 'city' => 'Vitória', 'uf' => 'ES', 'name' => 'Duster'],
        ];

        foreach ($vehicles as $index => $vehicle) {
            $vehicle['vehicle_features'] = json_encode($vehicle['vehicle_features']);

            Vehicles::updateOrCreate(
                ['user_id' => $user->id, 'tag_id' => $vehicle['tag_id']],
                [...$vehicle, 'user_id' => $user->id, 'vehicle_owner' => $owners->get($index)?->id, 'status' => 0]
            );
        }
    }
}
