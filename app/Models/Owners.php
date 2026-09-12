<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Owners extends Model
{
    protected $table = 'owners';
    protected $guarded = ['id'];

    static $rules = [
        'name' => 'required|min:3',
        'phone' => 'required|min:9'
    ];

    public function setBurthAttribute($value){
        $this->attributes['birth'] = Carbon::parse($value);
    }
}
