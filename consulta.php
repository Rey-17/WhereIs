<?php
$conexion= new mysqli('localhost', 'root', '', 'whereis');
if($conexion->connect_errno > 0){
    die('Imposible conectar a la base de datos [' . $db->connect_error . ']');
	exit();
}else{
	echo"Conectado";
}

$comercio = $_POST["comercio"];
$lugar = $_POST["lugar"];
$intent = $_POST["intento"];


$search = "SELECT tradewis.local, places.places, principalwis.phone,photo_placeswis.url_photo FROM principalwis 
          INNER JOIN tradewis ON tradewis.id_coWis = principalwis.tradewis 
		  INNER JOIN photo_placeswis ON photo_placeswis.id = principalwis.photo_placesWis 
		  INNER JOIN places ON places.id = principalwis.id_places 
		  WHERE tradewis.local='$comercio' AND places.places='$lugar' ";

$result = $conexion->query($search);

while($f = $result -> fetch_array()){
	
	echo '<p>'.$f["local"].'</p><br>';
	echo '<p>'.$f["places"].'</p><br>';
	//$province = $f["province"];
	echo '<p>'.$f["phone"].'</p><br>';
	echo $f["url_photo"];
	
	//var_dump($f);
}


$conexion->close();
?>
