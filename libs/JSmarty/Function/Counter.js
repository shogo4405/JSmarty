JSmarty.Function.Counter = function($params, $smarty)
{
	var $retval, $name, $counter;
	var $counters = JSmarty.Function.Counter.$counters;

	$name = $params['name'] || 'default';

	if($counters[$name] == (void 0))
	{
		$counters[$name] = {
			start: 1,
			skip : 1,
			count: 1,
			direction : 'up'
			};
	}

	$counter = $counters[$name];

	if($params['start'])
		$counter['start'] = $counter['count'] = $params['start'] - 0;

	if($params['assign'] != '')
		$counter['assign'] = $params['assign'];

	if($params['assign'])
		$counter['assign'] = $params['assign'];

	if($counter['assign'])
		$smarty.assign($counter['assign'], $counter['count']);

	if($params['print'])
		$print = new Boolean($params['print']);
	else
		$print = (!$counter['assign'] || $counter['assign'] == 0) ? true : false; // 挙動怪しいかも…

	if($print)
		$retval = $counter['count'];
	else
		$retval = '';

	if($params['skip'])
		$counter['skip'] = $params['skip'];

	if($params['direction'])
		$counter['direction'] = $params['direction'];

	if($counter['direction'] == 'down')
		$counter['count'] -= new Number($counter['skip']);
	else
		$counter['count'] += new Number($counter['skip']);

	return $retval;
}
JSmarty.Function.Counter.$counters = {};