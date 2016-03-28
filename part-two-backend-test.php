public function post_confirm(){
	$service_id = Input::get('service_id');
	$driver_id=Input::get('driver_id');
	$service= Service::find($id);
	
	if ($service->status_id == '6'){
		return Response::json(array('error' => '2'));
	}

	if ($service->driver_id == NULL && $service->statud_id == '1'){
		$service = Service::update($service_id, array(
					'driver_id' => $driver_id,
					'status_id' => '2'
		));
		Driver::update($driver_id,array(
			"available" => '0'
		));
		$push_message = 'Tu servicio ha sido confirmado!'; //Notificar a usuario!!

		$push = Push::make();
		if ($service->user->uuid == ''){
			return Response::json(array('error' => '0'));
		}
		if ($service->user->type == '1'){//iPhone
			$result= $push->ios($service->user->uuid,$push_message,1, 'honk.wav', 'Open', array('service_id' => $service_id));
		} else {
			$result = $push-> android2($service->user->uuid,$push_message,1,'default','Open',array('service_id' => $service_id));
		}
		return Response::json(array('error' => '0'));
	}else{
		return Response::json(array('error' => '1'));
	}
	
}