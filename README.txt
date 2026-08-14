RH NEXUS EVENTS WEBSITE — MULTI-PAGE VERSION
=============================================

MAIN PAGES
----------
index.php                  Home page
 gallery.php               Dynamic completed-project gallery
packages.php               Event packages page
contact.php                Full Contact Us page with form, details and map
process-contact.php        Secure PHP contact-form handler
config.php                 Recipient email configuration
includes/header.php        Shared navigation
includes/footer.php        Shared footer and WhatsApp button
includes/site-data.php     Phones, WhatsApp, address, timings and social links
assets/css/style.css       Responsive styling and animations
assets/js/main.js          Mobile menu, reveal effects and AJAX form
assets/images/projects/    Upload completed project photos here
.htaccess                  Caching, compression and security headers

CONTACT DETAILS
---------------
Primary phone: +92 341 6963339
Alternative / WhatsApp: +92 328 1620789
Email: rhnexusevents@gmail.com
Address: Street no 17, Shop no 110, Sector I-16/3, Islamabad, Pakistan 44000
Default consultation timing: Monday – Sunday, 10:00 AM – 10:00 PM

To change any of these details later, edit:
includes/site-data.php

HOW TO ADD COMPLETED PROJECTS TO THE GALLERY
---------------------------------------------
1. Open: assets/images/projects/
2. Upload a .webp, .jpg, .jpeg or .png photo.
3. The photo will automatically appear on gallery.php.
4. Use a descriptive filename, for example:
   walima-buffet-islamabad.webp

For faster loading, use WebP images around 1600px wide or smaller.

HOW TO RUN LOCALLY
------------------
1. Install PHP 8.0 or newer.
2. Open a terminal inside this website folder.
3. Run: php -S localhost:8000
4. Open: http://localhost:8000

HOW TO DEPLOY
-------------
1. Upload all files and folders to PHP-enabled hosting.
2. Keep the same folder structure.
3. Confirm config.php contains: rhnexusevents@gmail.com
4. Ensure PHP mail() is enabled by the hosting provider.
5. Test the Contact Us form after deployment.

IMPORTANT EMAIL NOTE
--------------------
The form is configured to send enquiries to rhnexusevents@gmail.com.
Actual email delivery depends on the hosting server's PHP mail setup.
If mail() is disabled, configure authenticated SMTP through the hosting provider.
Never put a normal Gmail password directly in the website files.

PAGE LINKS
----------
All pages share the same header and footer, so Home, About, Services,
Gallery, Packages and Contact Us links stay connected across the website.
The old "Call Now" navigation button has been removed.

PERFORMANCE
-----------
- No external CSS or JavaScript frameworks
- Local compressed WebP images
- Lazy loading for below-the-fold images and the map
- Lightweight CSS animations with reduced-motion support
- Browser caching and compression rules included
