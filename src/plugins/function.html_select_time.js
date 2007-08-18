/**
 * JSmarty plugin
 * @package JSmarty
 * @subpackage plugins
 */

/**
 * JSmarty {html_select_time} function plugin
 *
 * Type:     function<br />
 * Name:     html_select_time<br />
 * Original: Smarty {html_select_time} function plugin
 *
 * @author   shogo < shogo4405 at gmail dot com>
 * @version  1.0.0RC2
 * @see      http://smarty.php.net/manual/en/language.function.html.select.time.php
 * @param    {Object} params
 * @param    {JSmarty} jsmarty
 * @return   {String}
 */
function jsmarty_function_html_select_time(params, jsmarty)
{
	var Plugin = JSmarty.Plugin;

	var range = Plugin.getFunction('php.range');
	var strftime = Plugin.getFunction('php.strftime');
	var html_options = Plugin.getFunction('function.html_options', jsmarty.plugins_dir);

	var n, i, k, html = new JSmarty.Buffer();
	var hours, hour_fmt, for_max, all_minutes, minutes = [];

	var time = new Date().getTime();
	var prefix = "Time_";
	var all_extra = null;
	var hour_extra = null;
	var field_array = null;
	var minute_extra = null;
	var second_extra = null;
	var use_24_hours = true;
	var display_hours = true;
	var meridian_extra = null;
	var display_minutes = true;
	var display_seconds = true;
	var minute_interval = 1;
	var second_interval = 1;
	var display_meridian = true;

	for(k in params)
	{
		if(!params.hasOwnProperty(k)) continue;

		switch(k)
		{
			case 'prefix':
				prefix = params[k]; break;
			case 'time':
				time = params[k]; break;
			case 'field_array':
				field_array = params[k]; break;
			case 'all_extra':
				all_extra = params[k]; break;
			case 'hour_extra':
				hour_extra = params[k]; break;
			case 'minute_extra':
				minute_extra = params[k]; break;
			case 'second_extra':
				second_extra = params[k]; break;
			case 'meridian_extra':
				meridian_extra = params[k]; break;
			case 'display_hours':
				display_hours = params[k]; break;
			case 'display_minutes':
				display_minutes = params[k]; break;
			case 'display_hours':
				display_hours = params[k]; break;
			case 'display_meridian':
				display_meridian = params[k]; break;
			case 'use_24_hours':
				use_24_hours = params[k]; break;
			case 'minute_interval':
				minute_interval = parseInt(params[k]); break;
			case 'second_interval':
				second_interval = parseInt(params[k]); break;
			default:
				jsmarty.trigger_error('html_select_time: unknown parameter '+ k, 'warn');
		};
	};

	if(display_hours)
	{
		hours = use_24_hours ? range(0, 23) : range(0, 12);
		hour_fmt = use_24_hours ? '%H' : '%I';
		for(i=0,for_max=hours.length;i<for_max;i++){
			hours[i] = (hours[i] < 10) ? '0' + hours[i] : hours[i];
		};
		html.append('<select name="');
		if(field_array !== null){
			html.append(field_array, '[', prefix, 'Hour]"');
		}else{
			html.append(prefix, 'Hour"');
		};
		if(hour_extra !== null){
			html.apped(' ', hour_extra);
		};
		if(all_extra !== null){
			html.append(' ', all_extra);
		};
		html.append(
			'>\n',
			html_options({output: hours, values: hours, selected: strftime(hour_fmt, time)}, jsmarty),
			'</select>\n'
		);
	};

	if(display_minutes)
	{
		all_minutes = range(0, 59);
		for(i=0,n=0,for_max=all_minutes.length;i<for_max;i+=minute_interval){
			minutes[n++] = (all_minutes[i] < 10) ? '0' + all_minutes[i] : all_minutes[i];
		};
		selected = parseInt(Math.floor(strftime('%M', time) / minute_interval) * minute_interval);
		html.append('<select name="');
		if(field_array !== null){
			html.append(field_array, '[', prefix, 'Minute]"');
		}else{
			html.append('"', prefix, 'Minute"');
		};
		if(minute_extra !== null){
			html.append(' ', minute_extra);
		};
		if(all_extra !== null){
			html.append(' ', all_extra);
		};
		html.append(
			'>\n',
			html_options({output: minutes, values: minutes, selected: (selected < 10) ? '0' + selected : selected}, jsmarty),
			'</select>\n'
		);
	};

	if(display_meridian && !use_24_hours)
	{
		html.append('<select name="');
		if(field_array !== null){
			html.append(field_array, '[', prefix, 'Meridian]"');
		}else{
			html.append(prefix, 'Meridian"');
		};
		if(meridian_extra !== null){
			html.append(' ', meridian_extra);
		};
		if(all_extra !== null){
			html.append(' ', all_extra);
		};
		html.append(
			'>\n',
			html_options({output: ['AM','PM'], values: ['AM','PM'], selected: strftime('%p', time).toLowerCase(), print_result: false}, jsmarty),
			'</select>\n'
		);
	};

	return html.toString();
};