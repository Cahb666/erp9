<?php
	$datos = $_GET["datos"];

	var_dump($datos);

	$fp = fopen("../datos_usuario.json", "w");

	$datos = str_replace("\\\"", "\"", $datos);
	$datos = str_replace("\"{", "{", $datos);
	$datos = str_replace("}\"", "}", $datos);

	fputs($fp, $datos);

	fclose($fp);

?>