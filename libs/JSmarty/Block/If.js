JSmarty.Block.If = function(params, content, JSmarty)
{
	//仮実装です {elseif}や{else}に未対応
	expression = params.replace(/(\$[\w.]+)/g, 'JSmarty._tpl_vars.$1');

	if(eval(expression)) return content;
	else return '';
}