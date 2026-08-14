<?php
declare(strict_types=1);
$pageTitle = 'Gallery | RH Nexus Events';
$pageDescription = 'Explore completed catering and event projects by RH Nexus Events in Islamabad.';
$activePage = 'gallery';
$bodyClass = 'gallery-page';
require __DIR__ . '/includes/header.php';

$projectDirectory = __DIR__ . '/assets/images/projects';
$projectFiles = glob($projectDirectory . '/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', GLOB_BRACE) ?: [];
usort($projectFiles, static fn(string $a, string $b): int => filemtime($b) <=> filemtime($a));

function projectCaption(string $file): string
{
    $name = pathinfo($file, PATHINFO_FILENAME);
    $name = preg_replace('/[-_]+/', ' ', $name) ?: 'RH Nexus Event Project';
    return ucwords($name);
}
?>

<main id="main">
    <section class="page-hero page-hero-gallery">
        <div class="container page-hero-content reveal visible">
            <p class="eyebrow">Completed Projects</p>
            <h1>Our Event Gallery</h1>
            <p>Explore catering displays, celebrations and event details created by RH Nexus Events.</p>
        </div>
    </section>

    <section class="section project-gallery-section">
        <div class="container">
            <div class="section-heading reveal">
                <div><p class="eyebrow">Recent Work</p><h2>Moments made memorable.</h2></div>
                <p>New completed-project photos added to the project gallery folder appear here automatically.</p>
            </div>

            <?php if ($projectFiles): ?>
                <div class="project-gallery-grid">
                    <?php foreach ($projectFiles as $index => $file):
                        $filename = basename($file);
                        $caption = projectCaption($filename);
                    ?>
                        <figure class="project-card reveal<?= $index % 5 === 0 ? ' project-card-large' : '' ?>">
                            <img src="assets/images/projects/<?= rawurlencode($filename) ?>" loading="lazy" decoding="async" alt="<?= htmlspecialchars($caption, ENT_QUOTES, 'UTF-8') ?>">
                            <figcaption><span>RH Nexus Events</span><strong><?= htmlspecialchars($caption, ENT_QUOTES, 'UTF-8') ?></strong></figcaption>
                        </figure>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                <div class="empty-gallery reveal">
                    <h2>New project photos are coming soon.</h2>
                    <p>Contact us to see more examples or discuss your event style.</p>
                    <a class="btn btn-primary" href="contact.php">Contact Us</a>
                </div>
            <?php endif; ?>
        </div>
    </section>

    <section class="section gallery-cta-band">
        <div class="container cta-inner reveal">
            <img src="assets/images/logo-round-transparent.png" width="180" height="180" loading="lazy" decoding="async" alt="RH Nexus Events monogram">
            <div><p class="eyebrow">Your event could be next</p><h2>Let’s create a setup your guests remember.</h2></div>
            <a class="btn btn-light" href="contact.php">Get a Quote</a>
        </div>
    </section>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>
