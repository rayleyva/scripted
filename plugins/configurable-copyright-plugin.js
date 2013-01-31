// This is a scripted plugin that checks on save of any .js file whether the file
// has a copyright header. If it does not than it adds one
define(function (require) {

	console.log('Copyright plugin loading...');

	var editorApi = require('scripted/api/editor');

	// Default values for config options of this plugin:
	var defaultCopyright =  require('text!./copyright.txt');
	var defaultRegExp = '@license|\\* Copyright \\(c\\)';
	var defaultPathRegExp = '.*\\.js';

	editorApi.onSaveTransform(function (text, path, config) {
		var copyrightHeader = config('copyright', 'header');

		if (Array.isArray(copyrightHeader)) {
			//We allow the copyright header to be a list of lines, because its hard
			//typing/reading mutliline string literals in json.
			copyrightHeader = copyrightHeader.join('\n');
		}
		copyrightHeader = copyrightHeader || defaultCopyright;
		console.log('>>>copyright header');
		console.log(copyrightHeader);
		console.log('<<<copyright header');
		var copyrightExp = new RegExp(config('copyright', 'regexp') || defaultRegExp);
		var pathExp = new RegExp(config('copyright', 'path') || defaultPathRegExp);

		if (pathExp.test(path)) {
			if (!copyrightExp.test(text)) {
				return copyrightHeader + text;
			}
		}
	});

	console.log('Copyright plugin loaded!');

});