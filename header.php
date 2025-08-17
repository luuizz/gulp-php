<?php
require 'config.php';

$pageTitle = $pageTitle ?? '';
$pageDescription = $pageDescription ?? '';
$pageKeywords = $pageKeywords ?? '';

$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 5);
$lang = str_replace('_', '-', strtolower($lang));
?>

<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title><?php echo htmlspecialchars( ($pageTitle ? SITE_NAME . ' | ' . $pageTitle : SITE_NAME) ); ?></title>
  <meta name="description" content="<?php echo htmlspecialchars($pageDescription ?? SITE_DESCRIPTION); ?>">
  <meta name="keywords" content="<?php echo htmlspecialchars($pageKeywords ?? SITE_KEYWORDS); ?>">

  <link rel="stylesheet" href="./css/plugins.css">
  <link rel="stylesheet" href="./css/main.css">
</head>
<body>