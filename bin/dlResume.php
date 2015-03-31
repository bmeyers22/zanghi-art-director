<?php
$downloadfile = '../mark_zanghi_resume.pdf';
$filename = basename($downloadfile);        
header('Content-Type: application/pdf');
header('Content-Length: ' . filesize($downloadfile));
header('Content-Disposition: attachment; filename="'.$filename.'"');        
readfile($downloadfile);
?>