<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;


class Blog extends Model
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'title',
        'body',
        'author',
        'status',
        'featured_img_url'
    ];

}
