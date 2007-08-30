JSmarty.Plugin =
{
	/**
	 * Repository
	 * @type Array
	 */
	repos : ['.'],
	/**
	 * Evalute the source of plugin.
	 * @param  {String} $code The sourcecode of javascript.
	 * @param  {String} $ns namespace of plugin
	 * @return {Boolean} Evalute done, or not.
	 */
	parse : function($code, $ns)
	{
		if($code == void(0)) $code = '';
		var $flag = false, $parent = this;
		var $func = ('jsmarty.' + $ns ).split('.');

		switch($func[1])
		{
			case 'php': $func = $func[2]; break;
			default: $func = $func.join('_'); break;
		};

		try
		{
			$flag = true;
			eval($code + '$parent[$ns] = '+ $func +' || null');
		}
		catch(e)
		{
			JSmarty.Error.raise('Plugin: ' + e.message || e.toString());
		};

		return $flag;
	},
	/**
	 * build namespace of plugin
	 * @return {String} namespace
	 */
	namespace : function(t, n){
		return t + '.' + n;
	},
	/**
	 * Return blank string.
	 * @return {String} Return blank string.
	 */
	empty : function()
	{
		JSmarty.Error.raise('Plugin: called empty function.');
		return '';
	},
	/**
	 * add a repository of plugin.
	 * @param {String} r repository
	 */
	addRepository : function(){
		Array.prototype.unshift.apply(this.repos, arguments);
	},
	/**
	 * @param {String} n namaspace of plugin
	 * @param {mixed}  d The repository path of plugins. 
	 * @type Boolean
	 */
	getFunction : function(n, r)
	{
		this.addPlugin(n, r);
		return this[n] || this.empty;
	},
	/**
	 * Load plugin.
	 * @param {String} n namaspace of plugin
	 * @param {mixed}  r The repository path of plugins. 
	 * @type Boolean
	 */
	addPlugin : function(n, r){
		return (n in this) || this.parse(
			JSmarty.System.read(n + '.js', r || this.repos), n
		);
	},
	/**
	 * import functions for global scope
	 * @param {Object} options
	 * @param {String...} 
	 */
	importFunctions : function()
	{
		var i, d = this.repos;
		var n, g = JSmarty.GLOBALS;
		for(i=arguments.length-1;0<=i;i--)
		{
			n = arguments[i];
			if(this.addPlugin(n, d)){
				g[n.split('.')[1]] = this[n];
			};
		};
	}
};

JSmarty.Plugin['shared.copyArray'] = function(a){
	return Array.prototype.slice.call(a);
};

JSmarty.Plugin['shared.mergeObject'] = function(s, c){
	for(var k in s){ if(!(k in c)){ c[k] = s[k]; }; };
};