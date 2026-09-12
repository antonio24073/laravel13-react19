<?php

namespace Database\Seeders;

use App\Models\Owners;
use App\Models\User;
use App\Models\Vehicles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'test@example.com')->firstOrFail();
        $owners = Owners::where('user_id', $user->id)->orderBy('id')->get();

        $vehicles = [
            ['tag_id' => 1001, 'title' => 'Toyota Corolla XEi', 'name' => 'Corolla', 'vehicle_brand' => 73, 'vehicle_model' => 1, 'vehicle_version' => 1, 'vehicle_price' => 89500, 'vehicle_mileage' => 42000, 'city' => 'São Paulo', 'uf' => 'SP'],
            ['tag_id' => 1002, 'title' => 'Honda Civic EXL', 'name' => 'Civic', 'vehicle_brand' => 25, 'vehicle_model' => 2, 'vehicle_version' => 2, 'vehicle_price' => 112900, 'vehicle_mileage' => 31500, 'city' => 'Rio de Janeiro', 'uf' => 'RJ'],
            ['tag_id' => 1003, 'title' => 'Volkswagen T-Cross Highline', 'name' => 'T-Cross', 'vehicle_brand' => 56, 'vehicle_model' => 3, 'vehicle_version' => 3, 'vehicle_price' => 139900, 'vehicle_mileage' => 18000, 'city' => 'Belo Horizonte', 'uf' => 'MG'],
            ['tag_id' => 1004, 'title' => 'Chevrolet Onix Premier', 'name' => 'Onix', 'vehicle_brand' => 23, 'vehicle_model' => 4, 'vehicle_version' => 4, 'vehicle_price' => 87990, 'vehicle_mileage' => 27000, 'city' => 'Curitiba', 'uf' => 'PR'],
            ['tag_id' => 1005, 'title' => 'Ford Ranger Limited', 'name' => 'Ranger', 'vehicle_brand' => 24, 'vehicle_model' => 5, 'vehicle_version' => 5, 'vehicle_price' => 219900, 'vehicle_mileage' => 22000, 'city' => 'Porto Alegre', 'uf' => 'RS'],
            ['tag_id' => 1006, 'title' => 'Fiat Pulse Impetus', 'name' => 'Pulse', 'vehicle_brand' => 21, 'vehicle_model' => 6, 'vehicle_version' => 6, 'vehicle_price' => 118500, 'vehicle_mileage' => 12000, 'city' => 'Salvador', 'uf' => 'BA'],
            ['tag_id' => 1007, 'title' => 'Hyundai Creta Ultimate', 'name' => 'Creta', 'vehicle_brand' => 29, 'vehicle_model' => 7, 'vehicle_version' => 7, 'vehicle_price' => 154900, 'vehicle_mileage' => 9000, 'city' => 'Recife', 'uf' => 'PE'],
            ['tag_id' => 1008, 'title' => 'Jeep Compass Longitude', 'name' => 'Compass', 'vehicle_brand' => 31, 'vehicle_model' => 8, 'vehicle_version' => 8, 'vehicle_price' => 167900, 'vehicle_mileage' => 35000, 'city' => 'Fortaleza', 'uf' => 'CE'],
            ['tag_id' => 1009, 'title' => 'Nissan Kicks Exclusive', 'name' => 'Kicks', 'vehicle_brand' => 47, 'vehicle_model' => 9, 'vehicle_version' => 9, 'vehicle_price' => 132900, 'vehicle_mileage' => 16000, 'city' => 'Goiânia', 'uf' => 'GO'],
            ['tag_id' => 1010, 'title' => 'Renault Duster Iconic', 'name' => 'Duster', 'vehicle_brand' => 52, 'vehicle_model' => 10, 'vehicle_version' => 10, 'vehicle_price' => 124900, 'vehicle_mileage' => 29000, 'city' => 'Vitória', 'uf' => 'ES'],
        ];

        foreach ($vehicles as $index => $vehicle) {
            Vehicles::updateOrCreate(
                ['user_id' => $user->id, 'tag_id' => $vehicle['tag_id']],
                [...$vehicle, 'user_id' => $user->id, 'vehicle_owner' => $owners->get($index)?->id, 'status' => 0]
            );
        }
    }
}
