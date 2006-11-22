/**
 * strrpos function
 *
 * @author shogo < shogo4405 at gmail dot com >
 * @version 1.0.0
 * @see http://www.php.net/strrpos
 * @param  {String} s haystack
 * @param  {String} n needle
 * @param  {Number} o offset
 * @return {Number}
 */
function strrpos(s, n, o)
{
	var v = s.lastIndexOf(n, o || 0);
	return (v == -1) ? false : v;
};