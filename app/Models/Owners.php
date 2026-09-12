<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Owners extends Model
{
    protected $table = 'owners';

    protected $guarded = ['id'];

    public static array $rules = [
        'name' => 'required|string|min:3|max:100',
        'birth' => 'nullable|date',
        'type' => 'nullable|integer',
        'cpf' => 'nullable|string|max:15',
        'rg' => 'nullable|string|max:255',
        'cnpj' => 'nullable|string|max:255',
        'ie' => 'nullable|string|max:255',
        'email' => 'nullable|email|max:255',
        'phone' => 'required|string|min:9|max:15',
        'phone2' => 'nullable|string|max:15',
        'phone3' => 'nullable|string|max:15',
        'zipCode' => 'nullable|string|max:9',
        'uf' => 'nullable|string|size:2',
        'city' => 'nullable|string|max:255',
        'neighborhood' => 'nullable|string|max:255',
        'street' => 'nullable|string|max:255',
        'streetNumber' => 'nullable|string|max:255',
    ];

    public function setBurthAttribute($value)
    {
        $this->attributes['birth'] = Carbon::parse($value);
    }
}
