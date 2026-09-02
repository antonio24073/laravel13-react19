<?php

namespace App\Console\Commands;

use App\Models\Vehicle_brands;
use App\Models\Vehicle_models;
use App\Models\Vehicle_versions;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:import-vehicles {type}')]
#[Description('Command description')]
class ImportVehicles extends Command
{
    /**
     * Import vehicles from JSON files.
     * To be implemented. Instead you can dump the sql files in the dump/sql folder
     * 
     * for file in dump/sql/*.sql; do
     *      echo "Importando $file..."
     *      mariadb \
     *          -h"$DB_HOST" \
     *          -P"$DB_PORT" \
     *          -u"$DB_USERNAME" \
     *          -p"$DB_PASSWORD" \
     *          "$DB_DATABASE" < "$file"
     *  done
     */
    public function handle()
    {
        $type = $this->argument('type');

        if ($type == 'car') {
            $file = 2020;
        } elseif ($type == 'moto') {
            $file = 2060;
        } else {
            $this->error("Tipo de veículo inválido. Use 'carro' ou 'moto'.");
            return self::FAILURE;
        }

        $this->info("Importando arquivo: {$file}");

        $vehicle_type_id = $file;

        if ($vehicle_type_id == 2020) {
            $data = json_decode(file_get_contents("dump/$file.json"));
            $vehicle_brand = $data[0];
        } elseif ($vehicle_type_id == 2060) {
            $data = json_decode(file_get_contents("dump/$file.json"));
            $vehicle_brand = $data[0];
        }

        foreach ($vehicle_brand->brands as $brand) {
            $vehicle_brand = Vehicle_brands::firstOrCreate([
                'label' => $brand->label,
                'value' => $brand->value,
                'vehicle_type_id' => $vehicle_type_id,
            ]);
            foreach ($brand->models as $model) {
                $vehicle_model = Vehicle_models::firstOrCreate([
                    'brand_id' => $vehicle_brand->value,
                    'label' => $model->label,
                    'value' => $model->value,
                    'vehicle_type_id' => $vehicle_type_id
                ]);

                foreach ($brand->values as $version) {
                    Vehicle_versions::firstOrCreate([
                        'brand_id' => $vehicle_brand->value,
                        'model_id' => $vehicle_model->value,
                        'label' => $version->label,
                        'value' => $version->value
                    ]);
                }
            }
        }
        return self::SUCCESS;
    }
}
