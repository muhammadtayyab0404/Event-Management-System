<?php
declare(strict_types=1);
$pageTitle = 'Event Packages | RH Nexus Events';
$pageDescription = 'Browse flexible catering and event packages for weddings, corporate events and private celebrations.';
$activePage = 'packages';
$bodyClass = 'packages-page';
require __DIR__ . '/includes/header.php';
?>

<main id="main">
    <section class="page-hero page-hero-packages">
        <div class="container page-hero-content reveal visible">
            <p class="eyebrow">Flexible Event Solutions</p>
            <h1>Event Packages</h1>
            <p>Choose a package as your starting point. Menus, guest count, service level and styling can be customised for your event.</p>
        </div>
    </section>

    <section class="section packages-intro">
        <div class="container">
            <div class="section-heading reveal">
                <div><p class="eyebrow">Choose Your Experience</p><h2>Designed to make planning simpler.</h2></div>
                <p>Final pricing depends on guest count, menu selection, venue, date and additional services. Contact us for a personalised quotation.</p>
            </div>

            <div class="packages-grid">
                <article class="package-card reveal">
                    <div class="package-top"><span>01</span><p>Small & Private Events</p></div>
                    <h2>Essential Gathering</h2>
                    <p class="package-summary">A polished catering setup for birthdays, family dinners and intimate celebrations.</p>
                    <ul>
                        <li>Menu planning consultation</li>
                        <li>Buffet-style food presentation</li>
                        <li>Standard serving setup</li>
                        <li>On-time delivery and arrangement</li>
                        <li>Optional service staff</li>
                    </ul>
                    <div class="package-price"><small>Pricing</small><strong>Custom Quote</strong></div>
                    <a class="btn btn-primary" href="contact.php?package=Essential%20Gathering">Request This Package</a>
                </article>

                <article class="package-card featured reveal">
                    <div class="package-badge">Most Popular</div>
                    <div class="package-top"><span>02</span><p>Weddings & Engagements</p></div>
                    <h2>Signature Celebration</h2>
                    <p class="package-summary">A complete and elegant experience for larger celebrations that need extra attention.</p>
                    <ul>
                        <li>Custom menu consultation</li>
                        <li>Premium buffet presentation</li>
                        <li>Dedicated event coordination</li>
                        <li>Professional service staff</li>
                        <li>Dessert or beverage display option</li>
                    </ul>
                    <div class="package-price"><small>Pricing</small><strong>Custom Quote</strong></div>
                    <a class="btn btn-primary" href="contact.php?package=Signature%20Celebration">Request This Package</a>
                </article>

                <article class="package-card reveal">
                    <div class="package-top"><span>03</span><p>Meetings & Brand Events</p></div>
                    <h2>Corporate Experience</h2>
                    <p class="package-summary">Reliable catering for office meetings, product launches, conferences and formal gatherings.</p>
                    <ul>
                        <li>Breakfast, lunch or dinner options</li>
                        <li>Tea, snacks and refreshment service</li>
                        <li>Professional, brand-friendly setup</li>
                        <li>Scheduled delivery and service</li>
                        <li>Flexible guest-count planning</li>
                    </ul>
                    <div class="package-price"><small>Pricing</small><strong>Custom Quote</strong></div>
                    <a class="btn btn-primary" href="contact.php?package=Corporate%20Experience">Request This Package</a>
                </article>

                <article class="package-card premium reveal">
                    <div class="package-top"><span>04</span><p>Full-Service Premium Events</p></div>
                    <h2>Bespoke Premium</h2>
                    <p class="package-summary">A fully customised package for clients who want a distinctive, high-touch event experience.</p>
                    <ul>
                        <li>Bespoke menu and presentation plan</li>
                        <li>Premium food and dessert stations</li>
                        <li>Full service-team coordination</li>
                        <li>Event styling collaboration</li>
                        <li>Custom add-ons based on your vision</li>
                    </ul>
                    <div class="package-price"><small>Pricing</small><strong>Tailored Proposal</strong></div>
                    <a class="btn btn-primary" href="contact.php?package=Bespoke%20Premium">Build My Package</a>
                </article>
            </div>
        </div>
    </section>

    <section class="section package-process">
        <div class="container">
            <div class="center-heading reveal">
                <p class="eyebrow">How It Works</p>
                <h2>From first message to event day.</h2>
            </div>
            <div class="process-grid">
                <article class="reveal"><span>01</span><h3>Share your details</h3><p>Tell us your date, event type, venue, guest count and preferred style.</p></article>
                <article class="reveal"><span>02</span><h3>Receive your proposal</h3><p>We recommend a suitable menu, services and package based on your needs.</p></article>
                <article class="reveal"><span>03</span><h3>Confirm and celebrate</h3><p>Once confirmed, we coordinate the details and prepare for a smooth event day.</p></article>
            </div>
        </div>
    </section>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>
