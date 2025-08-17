<?php

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if (!defined('SITE_NAME')) {
    define('SITE_NAME', $_ENV['SITE_NAME']);
}

if (!defined('SITE_DESCRIPTION')) {
    define('SITE_DESCRIPTION', $_ENV['SITE_DESCRIPTION']);
}

if (!defined('SITE_KEYWORDS')) {
    define('SITE_KEYWORDS', $_ENV['SITE_KEYWORDS']);
}

?>