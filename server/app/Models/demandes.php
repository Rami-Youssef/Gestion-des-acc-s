<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class demandes extends Model
{
    use HasFactory;
    protected $fillable=[
        'désactivation',
        'société',
        'prénom',
        'nom',
        'fonction',
        'email',
        'direction',
        'site',
        'date-Activation',
        'date-Désactivation',
        'application',
        'dommaine',
        'role',
        'UPN',
        'MailGroup',
        'niveau',
        'managerId'
    ];
}
