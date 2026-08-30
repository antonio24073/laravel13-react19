<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('domain')->nullable();
            $table->string('subdomain')->nullable();
            $table->string('logo')->nullable();
            $table->string('facebook')->nullable();
            $table->string('facebok_page_id')->nullable();
            $table->string('facebook_pixel')->nullable();
            $table->string('google_analytics')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('email_contact')->nullable();
            $table->string('site_title')->nullable();
            $table->longtext('site_keywords')->nullable();
            $table->longtext('site_description')->nullable();
            $table->tinyInteger('plan_id')->nullable();
            $table->dateTime('next_expiration')->nullable();
            $table->dateTime('disabled_account')->nullable();
            $table->dateTime('delete_account')->nullable();
            $table->tinyInteger('status')->nullable()->default(1);
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
