<?php
declare(strict_types=1);
require_once __DIR__ . '/site-data.php';
?>
<footer class="site-footer">
    <div class="container footer-main footer-main-expanded">
        <div class="footer-about">
            <a class="footer-brand" href="index.php"><img src="assets/images/logo-transparent.png" width="220" height="158" loading="lazy" decoding="async" alt="RH Nexus Events logo"></a>
            <p>Professional catering and event experiences designed to bring people together.</p>
        </div>
        <div class="footer-column">
            <h3>Explore</h3>
            <div class="footer-links">
                <a href="index.php">Home</a>
                <a href="index.php#services">Services</a>
                <a href="gallery.php">Gallery</a>
                <a href="packages.php">Packages</a>
                <a href="contact.php">Contact Us</a>
            </div>
        </div>
        <div class="footer-column footer-contact-list">
            <h3>Contact</h3>
            <a href="tel:<?= htmlspecialchars($site['primary_phone_tel']) ?>"><?= htmlspecialchars($site['primary_phone_display']) ?></a>
            <a href="<?= htmlspecialchars($site['whatsapp_url']) ?>" target="_blank" rel="noopener noreferrer">WhatsApp: <?= htmlspecialchars($site['whatsapp_phone_display']) ?></a>
            <a href="mailto:<?= htmlspecialchars($site['email']) ?>"><?= htmlspecialchars($site['email']) ?></a>
            <a href="<?= htmlspecialchars($site['map_url']) ?>" target="_blank" rel="noopener noreferrer"><?= htmlspecialchars($site['address']) ?></a>
        </div>
    </div>
    <div class="container footer-bottom"><span>© <?= date('Y') ?> RH Nexus Events. All rights reserved.</span><span>Connect • Create • Celebrate</span></div>
</footer>

<a class="whatsapp-float" href="<?= htmlspecialchars($site['whatsapp_url']) ?>" target="_blank" rel="noopener noreferrer" aria-label="Chat with RH Nexus Events on WhatsApp">
    <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M27.3 4.7A15.8 15.8 0 0 0 2.5 23.8L.3 31.7l8.1-2.1A15.7 15.7 0 0 0 16 31.5h.1A15.8 15.8 0 0 0 27.3 4.7ZM16.1 28.8h-.1a13 13 0 0 1-6.6-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5A13 13 0 1 1 16 28.8Zm7.2-9.7c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.5-.2.3-.5.3-.9.1-2.4-1.2-4-2.1-5.6-4.8-.4-.7.4-.7 1.2-2.2.1-.3.1-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.4s1.5 4 1.7 4.3c.2.3 2.9 4.5 7.1 6.3 1 .4 1.8.7 2.4.9 1 .3 1.9.3 2.6.2.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z"/></svg>
</a>

<script src="assets/js/main.js" defer></script>
</body>
</html>
