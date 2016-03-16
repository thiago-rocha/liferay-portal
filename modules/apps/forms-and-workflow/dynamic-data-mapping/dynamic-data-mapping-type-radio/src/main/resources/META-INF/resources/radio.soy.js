// This file was automatically generated from radio.soy.
// Please don't edit this file by hand.

if (typeof ddm == 'undefined') { var ddm = {}; }


ddm.radio = function(opt_data, opt_ignored) {
  var output = '\t<div class="form-group" data-fieldname="' + soy.$$escapeHtml(opt_data.name) + '">' + ((opt_data.showLabel) ? '<label class="control-label">' + soy.$$escapeHtml(opt_data.label) + ((opt_data.required) ? '<span class="icon-asterisk text-warning"></span>' : '') + '</label>' + ((opt_data.tip) ? '<p class="liferay-ddm-form-field-tip">' + soy.$$escapeHtml(opt_data.tip) + '</p>' : '') : '') + '<div class="clearfix radio-options">';
  var optionList20 = opt_data.options;
  var optionListLen20 = optionList20.length;
  for (var optionIndex20 = 0; optionIndex20 < optionListLen20; optionIndex20++) {
    var optionData20 = optionList20[optionIndex20];
    output += ((! opt_data.inline) ? '<div class="radio">' : '') + '<label class="radio-default' + soy.$$escapeHtml(opt_data.inline ? ' radio-inline' : '') + ' radio-option-' + soy.$$escapeHtml(optionData20.value) + '" for="' + soy.$$escapeHtml(optionData20.value) + '"><input class="field" dir="' + soy.$$escapeHtml(opt_data.dir) + '" ' + ((opt_data.readOnly) ? 'disabled' : '') + ' id="' + soy.$$escapeHtml(optionData20.value) + '" name="' + soy.$$escapeHtml(opt_data.name) + '" ' + soy.$$escapeHtml(optionData20.status) + ' type="radio" value="' + soy.$$escapeHtml(optionData20.value) + '" /> ' + soy.$$escapeHtml(optionData20.label) + '</label>' + ((! opt_data.inline) ? '</div>' : '');
  }
  output += '</div>' + soy.$$filterNoAutoescape(opt_data.childElementsHTML) + '</div>';
  return output;
};
