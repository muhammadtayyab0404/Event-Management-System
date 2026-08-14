<?php
declare(strict_types=1);
session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$status = isset($_GET['status']) ? preg_replace('/[^a-z]/', '', (string)$_GET['status']) : '';
$selectedPackage = trim((string)($_GET['package'] ?? ''));
$selectedEvent = trim((string)($_GET['event'] ?? ''));

$allowedPackages = ['', 'Essential Gathering', 'Signature Celebration', 'Corporate Experience', 'Bespoke Premium'];
$allowedEvents = ['', 'Wedding', 'Corporate Event', 'Birthday', 'Engagement', 'Private Gathering', 'Other'];
if (!in_array($selectedPackage, $allowedPackages, true)) {
    $selectedPackage = '';
}
if (!in_array($selectedEvent, $allowedEvents, true)) {
    $selectedEvent = '';
}

$pageTitle = 'Contact Us | RH Nexus Events';
$pageDescription = 'Contact RH Nexus Events for catering packages, event availability and personalised quotations in Islamabad.';
$activePage = 'contact';
$bodyClass = 'contact-page';
require __DIR__ . '/includes/header.php';
?>

<main id="main">
    <section class="page-hero page-hero-contact">
        <div class="container page-hero-content reveal visible">
            <p class="eyebrow">Let’s Plan Your Event</p>
            <h1>Contact RH Nexus Events</h1>
            <p>Share your event details and our team will help you choose the right menu, service and package.</p>
        </div>
    </section>

    <section class="section detailed-contact" id="contact-form-section">
        <div class="container contact-page-grid">
            <div class="contact-details-column">
                <div class="contact-info reveal">
                    <p class="eyebrow">Detailed Contact Information</p>
                    <h2>We’re here to help.</h2>
                    <p>Reach us by phone, WhatsApp, email or visit our location in Islamabad. For the fastest quotation, include your event date and estimated guest count.</p>
                </div>

                <div class="detail-card-grid">
                    <a class="detail-card reveal" href="tel:<?= htmlspecialchars($site['primary_phone_tel']) ?>">
                        <span class="detail-icon">☎</span>
                        <div><small>Primary Phone</small><strong><?= htmlspecialchars($site['primary_phone_display']) ?></strong><p>Call for bookings and enquiries.</p></div>
                    </a>
                    <a class="detail-card reveal" href="<?= htmlspecialchars($site['whatsapp_url']) ?>" target="_blank" rel="noopener noreferrer">
                        <span class="detail-icon whatsapp-icon">W</span>
                        <div><small>Alternative / WhatsApp</small><strong><?= htmlspecialchars($site['whatsapp_phone_display']) ?></strong><p>Message us directly on WhatsApp.</p></div>
                    </a>
                    <a class="detail-card reveal" href="mailto:<?= htmlspecialchars($site['email']) ?>">
                        <span class="detail-icon">✉</span>
                        <div><small>Email</small><strong><?= htmlspecialchars($site['email']) ?></strong><p>Send menus, requirements or event details.</p></div>
                    </a>
                    <a class="detail-card reveal" href="<?= htmlspecialchars($site['map_url']) ?>" target="_blank" rel="noopener noreferrer">
                        <span class="detail-icon">⌖</span>
                        <div><small>Business Address</small><strong><?= htmlspecialchars($site['address']) ?></strong><p>Open the location in Google Maps.</p></div>
                    </a>
                    <div class="detail-card reveal">
                        <span class="detail-icon">◷</span>
                        <div><small>Consultation Timings</small><strong><?= htmlspecialchars($site['hours']) ?></strong><p>Appointments are recommended before visiting.</p></div>
                    </div>
                </div>

                <div class="contact-social-block reveal">
                    <h3>Follow RH Nexus Events</h3>
                    <div class="social-row social-row-labelled">
                        <a href="<?= htmlspecialchars($site['facebook']) ?>" target="_blank" rel="noopener noreferrer" aria-label="RH Nexus Events on Facebook">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5V7c0-.7.5-1 1.1-1H17V3h-2.6C11.8 3 10 4.6 10 7.2v1.3H7V12h3v9h4v-9h2.7l.5-3.5H14Z"/></svg><span>Facebook</span>
                        </a>
                        <a href="<?= htmlspecialchars($site['instagram']) ?>" target="_blank" rel="noopener noreferrer" aria-label="RH Nexus Events on Instagram">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM17 5.5A1.25 1.25 0 1 1 17 8a1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg><span>Instagram</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="contact-form-wrap reveal">
                <div class="form-heading">
                    <p class="eyebrow">Get a Quote</p>
                    <h2>Tell us about your event.</h2>
                </div>
                <div id="form-message" class="form-message<?= $status ? ' is-visible ' . htmlspecialchars($status, ENT_QUOTES, 'UTF-8') : '' ?>" role="status" aria-live="polite">
                    <?php if ($status === 'success'): ?>Thank you. Your enquiry has been sent successfully.<?php elseif ($status === 'error'): ?>We could not send your enquiry. Please email, call or WhatsApp us directly.<?php endif; ?>
                </div>
                <form id="contact-form" action="process-contact.php" method="post" novalidate>
                    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8') ?>">
                    <div class="hp-field" aria-hidden="true"><label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
                    <div class="form-row">
                        <label><span>Your Name *</span><input type="text" name="name" autocomplete="name" required maxlength="80" placeholder="Full name"></label>
                        <label><span>Email Address *</span><input type="email" name="email" autocomplete="email" required maxlength="120" placeholder="you@example.com"></label>
                    </div>
                    <div class="form-row">
                        <label><span>Phone Number *</span><input type="tel" name="phone" autocomplete="tel" required maxlength="30" placeholder="+92 ..."></label>
                        <label><span>Event Type *</span>
                            <select name="event_type" required>
                                <option value="">Select event</option>
                                <?php foreach (array_slice($allowedEvents, 1) as $event): ?>
                                    <option value="<?= htmlspecialchars($event, ENT_QUOTES, 'UTF-8') ?>"<?= $selectedEvent === $event ? ' selected' : '' ?>><?= htmlspecialchars($event, ENT_QUOTES, 'UTF-8') ?></option>
                                <?php endforeach; ?>
                            </select>
                        </label>
                    </div>
                    <div class="form-row">
                        <label><span>Interested Package</span>
                            <select name="package">
                                <option value="">Not selected / Custom</option>
                                <?php foreach (array_slice($allowedPackages, 1) as $package): ?>
                                    <option value="<?= htmlspecialchars($package, ENT_QUOTES, 'UTF-8') ?>"<?= $selectedPackage === $package ? ' selected' : '' ?>><?= htmlspecialchars($package, ENT_QUOTES, 'UTF-8') ?></option>
                                <?php endforeach; ?>
                            </select>
                        </label>
                        <label><span>Event Date</span><input type="date" name="event_date"></label>
                    </div>
                    <div class="form-row">
                        <label><span>Estimated Guests</span><input type="number" name="guest_count" min="1" max="10000" placeholder="e.g. 150"></label>
                        <label><span>Venue / Area</span><input type="text" name="venue" maxlength="140" placeholder="Venue or city area"></label>
                    </div>
                    <label><span>Tell Us About Your Event *</span><textarea name="message" rows="6" required maxlength="2000" placeholder="Menu ideas, service requirements, setup style or anything else we should know..."></textarea></label>
                    <label class="consent"><input type="checkbox" name="consent" value="yes" required><span>I agree that RH Nexus Events may use these details to respond to my enquiry.</span></label>
                    <button class="btn btn-primary submit-btn" type="submit"><span class="button-text">Send Enquiry</span><span class="spinner" aria-hidden="true"></span></button>
                    <p class="form-note">Your message will be sent directly to <a href="mailto:<?= htmlspecialchars($site['email']) ?>"><?= htmlspecialchars($site['email']) ?></a>.</p>
                </form>
            </div>
        </div>
    </section>

    <section class="map-section">
        <div class="container reveal">
            <div class="map-heading"><div><p class="eyebrow">Find Us</p><h2>Visit us in Islamabad.</h2></div><a class="text-link" href="<?= htmlspecialchars($site['map_url']) ?>" target="_blank" rel="noopener noreferrer">Open in Google Maps <span>→</span></a></div>
            <div class="map-frame">
                <iframe src="<?= htmlspecialchars($site['map_embed_url']) ?>" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="RH Nexus Events location map"></iframe>
            </div>
        </div>
    </section>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>
