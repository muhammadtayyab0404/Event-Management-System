<?php
declare(strict_types=1);
require_once __DIR__ . '/site-data.php';

$pageTitle = $pageTitle ?? ($site['name'] . ' | Catering & Event Experiences');
$pageDescription = $pageDescription ?? 'Professional catering and event experiences in Islamabad for weddings, corporate events and private celebrations.';
$activePage = $activePage ?? 'home';
$bodyClass = trim(($bodyClass ?? '') . ($activePage !== 'home' ? ' inner-page' : ''));
$preloadImage = $preloadImage ?? '';

function navClass(string $name, string $activePage): string
{
    return $name === $activePage ? ' class="active" aria-current="page"' : '';
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#070a07">
    <meta name="description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>">
    <meta property="og:title" content="<?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?>">
    <meta property="og:description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>">
    <meta property="og:type" content="website">
    <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?></title>
    <link rel="icon" href="assets/images/favicon.png" type="image/png">
    <?php if ($preloadImage !== ''): ?>
        <link rel="preload" href="<?= htmlspecialchars($preloadImage, ENT_QUOTES, 'UTF-8') ?>" as="image" type="image/webp" fetchpriority="high">
    <?php endif; ?>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="<?= htmlspecialchars($bodyClass, ENT_QUOTES, 'UTF-8') ?>">
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header" id="top">
    <div class="container nav-wrap">
        <a class="brand" href="index.php" aria-label="RH Nexus Events home">
            <img src="assets/images/logo-round-transparent.png" width="72" height="72" alt="RH Nexus Events logo">
            <span class="brand-name"><strong>RH Nexus</strong><small>Events</small></span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation">
            <span></span><span></span><span></span>
        </button>
        <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
            <a<?= navClass('home', $activePage) ?> href="index.php">Home</a>
            <a href="index.php#about">About</a>
            <a href="index.php#services">Services</a>
            <a<?= navClass('gallery', $activePage) ?> href="gallery.php">Gallery</a>
            <a<?= navClass('packages', $activePage) ?> href="packages.php">Packages</a>
            <a<?= navClass('contact', $activePage) ?> href="contact.php">Contact Us</a>
        </nav>
    </div>
</header>
