JSmarty.Block.If = function($params, $content, $smarty)
{
	var $express, $point = 0;
	var $L = $smarty.left_delimiter, $R = $smarty.right_delimiter;

	$express = eval($params.replace(/(\$.*)/g, '$smarty._tpl_vars.$1'));

	for(var i=-1;i<$content.lastIndexOf(R);i=iep+$R.length)
	{
		
	}

/*
	for(var i=0;i<$content.length;i++)
	{
		if('elsif' == $content[i].substr($L.length, 5))
		{
			if($express) break;
			$point   = i+1;
			$express = $content[i].slice($L.length+5, -$R.length);
			$express = eval($express.replace(/(\$.*)/g, '$smarty._tpl_vars.$1'));
		}
		if('else' == $content[i].substr($L.length, 4))
		{
			if($express) break;
			$point = i+1;
		}
	}
*/

	return $smarty.parser($content.slice($point, i));
}