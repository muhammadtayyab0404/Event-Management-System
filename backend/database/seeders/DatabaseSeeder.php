<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles first
        $this->call([
            RoleSeeder::class,
        ]);

        // Admin
        $admin = User::updateOrCreate(
            [
                'email' => 'admin@gmail.com',
            ],
            [
                'name' => 'Admin',
                'password' => Hash::make('123456'),
            ]
        );

        $admin->assignRole('admin');


        // Manager
        $manager = User::updateOrCreate(
            [
                'email' => 'manager@gmail.com',
            ],
            [
                'name' => 'Manager',
                'password' => Hash::make('123456'),
            ]
        );

        $manager->assignRole('manager');


        // Client
        $client = User::updateOrCreate(
            [
                'email' => 'client@gmail.com',
            ],
            [
                'name' => 'Client',
                'password' => Hash::make('123456'),
            ]
        );

        $client->assignRole('client');
    }
}