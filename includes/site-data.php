<?php
declare(strict_types=1);

$site = [
    'name' => 'RH Nexus Events',
    'email' => 'rhnexusevents@gmail.com',
    // Numbers are intentionally ordered as requested: primary first, alternative/WhatsApp second.
    'primary_phone_display' => '+92 341 6963339',
    'primary_phone_tel' => '+923416963339',
    'whatsapp_phone_display' => '+92 328 1620789',
    'whatsapp_phone_tel' => '+923281620789',
    'whatsapp_number' => '923281620789',
    'address' => 'Street no 17, Shop no 110, Sector I-16/3, Islamabad, Pakistan 44000',
    'hours' => 'Monday – Sunday: 10:00 AM – 10:00 PM',
    'facebook' => 'https://www.facebook.com/profile.php?id=61591578887658',
    'instagram' => 'https://www.instagram.com/rh_nexus_events/',
];

$whatsappMessage = rawurlencode('Hello RH Nexus Events, I would like to discuss an event.');
$site['whatsapp_url'] = 'https://wa.me/' . $site['whatsapp_number'] . '?text=' . $whatsappMessage;
$site['map_url'] = 'https://www.google.com/maps?q=' . rawurlencode($site['address']);
$site['map_embed_url'] = $site['map_url'] . '&output=embed';
