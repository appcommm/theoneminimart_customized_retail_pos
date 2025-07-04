<?php

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
          $permissions = [
            ['name' => 'manage_variations', 'display_name' => 'Manage Variations'],
            ['name' => 'edit_sale', 'display_name' => 'Edit Sale'],
            ['name' => 'delete_sale', 'display_name' => 'Delete Sale'],
            ['name' => 'create_sale_return', 'display_name' => 'Create Sale Return'],
            ['name' => 'edit_sale_return', 'display_name' => 'Edit Sale Return'],
            ['name' => 'delete_sale_return', 'display_name' => 'Delete Sale Return'],
        ];

        $adminRole = Role::whereName(Role::ADMIN)->first();

        foreach ($permissions as $perm) {
            $permission = new Permission();
            $permission->name = $perm['name'];
            $permission->display_name = $perm['display_name'];
            $permission->save();

            $adminRole->givePermissionTo($permission->id);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $permission = Permission::where('name', 'manage_variations')->first();
        if($permission) $permission->delete();
    }
};
