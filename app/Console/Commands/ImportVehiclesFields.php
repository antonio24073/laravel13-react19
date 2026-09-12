<?php

namespace App\Console\Commands;

use App\Models\Vehicle_car_steerings;
use App\Models\Vehicle_cubiccms;
use App\Models\Vehicle_doors;
use App\Models\Vehicle_exchanges;
use App\Models\Vehicle_features;
use App\Models\Vehicle_financials;
use App\Models\Vehicle_fuels;
use App\Models\Vehicle_gearboxes;
use App\Models\Vehicle_motorpowers;
use App\Models\Vehicle_regdates;
use App\Models\Vehicle_types;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use JsonException;

#[Signature('app:import-vehicles-fields {type : Tipo de veículo: car ou moto}')]
#[Description('Importa os campos locais de veículos a partir do catálogo JSON')]
class ImportVehiclesFields extends Command
{
    public function handle(): int
    {
        $type = strtolower((string) $this->argument('type'));

        if ($type === 'car') {
            $file = 2020;
        } elseif ($type === 'moto') {
            $file = 2060;
        } else {
            $this->error("Tipo de veículo inválido. Use 'car' ou 'moto'.");

            return self::FAILURE;
        }

        $path = base_path("dump/{$file}.json");

        if (! is_file($path)) {
            $this->error("Arquivo não encontrado: {$path}");

            return self::FAILURE;
        }

        try {
            $data = json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $exception) {
            $this->error("JSON inválido em {$path}: {$exception->getMessage()}");

            return self::FAILURE;
        }

        $fieldModels = [
            'motorpower' => Vehicle_motorpowers::class,
            'exchange' => Vehicle_exchanges::class,
            'regdate' => Vehicle_regdates::class,
            'gearbox' => Vehicle_gearboxes::class,
            'doors' => Vehicle_doors::class,
            'fuel' => Vehicle_fuels::class,
            'cartype' => Vehicle_types::class,
            'car_features' => Vehicle_features::class,
            'car_steering' => Vehicle_car_steerings::class,
            'financial' => Vehicle_financials::class,
            'cubiccms' => Vehicle_cubiccms::class,
        ];

        $imported = 0;
        $skipped = 0;

        foreach ($data as $field) {
            $code = $field['code'] ?? null;
            $modelClass = $fieldModels[$code] ?? null;
            $values = $field['datasource']['values'] ?? null;

            if ($modelClass === null || ! is_array($values)) {
                $skipped++;

                continue;
            }

            foreach ($values as $value) {
                if (! isset($value['key'], $value['value'])) {
                    continue;
                }

                $record = $modelClass::query()
                    ->where('value', (int) $value['key'])
                    ->first() ?? new $modelClass;

                $record->value = (int) $value['key'];
                $record->label = (string) $value['value'];
                $record->save();
                $imported++;
            }
        }

        $this->info("{$imported} valores importados do catálogo {$file}.json.");
        $this->line("{$skipped} campos remotos ou não suportados foram ignorados.");

        $sqlImported = $this->importVehicleCatalogs();
        $this->info("{$sqlImported} lotes de marcas, modelos e versões importados dos dumps SQL.");

        return self::SUCCESS;
    }

    private function importVehicleCatalogs(): int
    {
        $imported = 0;

        foreach (['vehicle_brands', 'vehicle_models', 'vehicle_versions'] as $table) {
            $path = base_path("dump/sql/{$table}.sql");

            if (! is_file($path)) {
                $this->warn("Dump não encontrado: {$path}");

                continue;
            }

            $sql = file_get_contents($path);
            preg_match_all('/INSERT INTO `'.$table.'`.*?;/s', $sql, $matches);

            foreach ($matches[0] as $statement) {
                DB::unprepared(preg_replace('/^INSERT INTO/', 'INSERT IGNORE INTO', $statement));
                $imported++;
            }
        }

        return $imported;
    }
}
