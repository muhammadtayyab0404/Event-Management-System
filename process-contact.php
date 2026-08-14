<?php
declare(strict_types=1);
session_start();

$config = require __DIR__ . '/config.php';
$wantsJson = strtolower($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'xmlhttprequest';

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function respond(bool $ok, string $message, bool $json): never
{
    if ($json) {
        http_response_code($ok ? 200 : 422);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => $ok, 'message' => $message], JSON_UNESCAPED_SLASHES);
    } else {
        header('Location: contact.php?status=' . ($ok ? 'success' : 'error') . '#contact-form-section');
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request method.', $wantsJson);
}

if (!empty($_POST['website'] ?? '')) {
    respond(true, 'Thank you. Your enquiry has been sent.', $wantsJson);
}

$token = (string)($_POST['csrf_token'] ?? '');
if (empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $token)) {
    respond(false, 'Your session expired. Refresh the page and try again.', $wantsJson);
}

$lastSent = (int)($_SESSION['last_contact_time'] ?? 0);
if (time() - $lastSent < 20) {
    respond(false, 'Please wait a moment before sending another enquiry.', $wantsJson);
}

$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$phone = trim((string)($_POST['phone'] ?? ''));
$eventType = trim((string)($_POST['event_type'] ?? ''));
$package = trim((string)($_POST['package'] ?? ''));
$eventDate = trim((string)($_POST['event_date'] ?? ''));
$guestCount = trim((string)($_POST['guest_count'] ?? ''));
$venue = trim((string)($_POST['venue'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$consent = (string)($_POST['consent'] ?? '');

if ($name === '' || textLength($name) > 80 || !filter_var($email, FILTER_VALIDATE_EMAIL) || $phone === '' || textLength($phone) > 30 || $eventType === '' || $message === '' || textLength($message) > 2000 || $consent !== 'yes') {
    respond(false, 'Please complete all required fields correctly.', $wantsJson);
}

$allowedEvents = ['Wedding', 'Corporate Event', 'Birthday', 'Engagement', 'Private Gathering', 'Other'];
$allowedPackages = ['', 'Essential Gathering', 'Signature Celebration', 'Corporate Experience', 'Bespoke Premium'];
if (!in_array($eventType, $allowedEvents, true) || !in_array($package, $allowedPackages, true)) {
    respond(false, 'Please select valid event and package options.', $wantsJson);
}

if ($guestCount !== '' && (!ctype_digit($guestCount) || (int)$guestCount < 1 || (int)$guestCount > 10000)) {
    respond(false, 'Please enter a valid estimated guest count.', $wantsJson);
}

foreach ([$name, $email, $phone, $venue] as $headerValue) {
    if (preg_match('/[\r\n]/', $headerValue)) {
        respond(false, 'Invalid contact details.', $wantsJson);
    }
}

$recipient = (string)$config['recipient_email'];
$siteName = (string)$config['site_name'];
$subject = 'New Website Enquiry — ' . $eventType . ' — ' . $name;

$body = "A new enquiry has been submitted through the {$siteName} website.\n\n";
$body .= "Name: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Phone: {$phone}\n";
$body .= "Event type: {$eventType}\n";
$body .= "Interested package: " . ($package !== '' ? $package : 'Custom / Not selected') . "\n";
$body .= "Event date: " . ($eventDate !== '' ? $eventDate : 'Not provided') . "\n";
$body .= "Estimated guests: " . ($guestCount !== '' ? $guestCount : 'Not provided') . "\n";
$body .= "Venue / Area: " . ($venue !== '' ? $venue : 'Not provided') . "\n\n";
$body .= "Message:\n{$message}\n\n";
$body .= "Submitted: " . date('Y-m-d H:i:s T') . "\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";

$host = preg_replace('/[^a-z0-9.-]/i', '', $_SERVER['SERVER_NAME'] ?? 'localhost');
$fromDomain = ($host !== '' && $host !== 'localhost') ? $host : 'example.com';
$headers = [
    'From: ' . $siteName . ' Website <noreply@' . $fromDomain . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail($recipient, $subject, $body, implode("\r\n", $headers));
if (!$sent) {
    respond(false, 'The server could not send your message. Please email, call or WhatsApp us directly.', $wantsJson);
}

$_SESSION['last_contact_time'] = time();
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
respond(true, 'Thank you. Your enquiry has been sent successfully.', $wantsJson);
