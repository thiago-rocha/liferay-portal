// This file was automatically generated from validation.soy.
// Please don't edit this file by hand.

if (typeof ddm == 'undefined') { var ddm = {}; }


ddm.validationOption = function(opt_data, opt_ignored) {
  return '\t<option ' + soy.$$escapeHtml(opt_data.option.status) + ' value="' + soy.$$escapeHtml(opt_data.option.value) + '">' + soy.$$escapeHtml(opt_data.option.label) + '</option>';
};


ddm.validation = function(opt_data, opt_ignored) {
  var output = '\t<link href="/o/dynamic-data-mapping-type-validation/validation.css" rel="stylesheet"></link><div class="form-group lfr-ddm-form-field-validation" data-fieldname="' + soy.$$escapeHtml(opt_data.name) + '"><div class="form-group"><label class="control-label" for="' + soy.$$escapeHtml(opt_data.name) + 'EnableValidation"><input class="enable-validation toggle-switch" ' + soy.$$escapeHtml(opt_data.enableValidationValue ? 'checked="checked"' : '') + ' id="' + soy.$$escapeHtml(opt_data.name) + 'EnableValidation" type="checkbox" value="true" /><span aria-hidden="true" class="toggle-switch-bar"><span class="toggle-switch-handle" data-label-off="' + soy.$$escapeHtml(opt_data.enableValidationMessage) + '" data-label-on="' + soy.$$escapeHtml(opt_data.disableValidationMessage) + '"></span></span></label></div><div class="' + soy.$$escapeHtml(opt_data.enableValidationValue ? '' : 'hide') + ' row"><div class="col-md-6"><select class="form-control types-select">';
  var optionList26 = opt_data.typesOptions;
  var optionListLen26 = optionList26.length;
  for (var optionIndex26 = 0; optionIndex26 < optionListLen26; optionIndex26++) {
    var optionData26 = optionList26[optionIndex26];
    output += ddm.validationOption(soy.$$augmentMap(opt_data, {option: optionData26}));
  }
  output += '</select></div><div class="col-md-6"><select class="form-control validations-select">';
  var optionList31 = opt_data.validationsOptions;
  var optionListLen31 = optionList31.length;
  for (var optionIndex31 = 0; optionIndex31 < optionListLen31; optionIndex31++) {
    var optionData31 = optionList31[optionIndex31];
    output += ddm.validationOption(soy.$$augmentMap(opt_data, {option: optionData31}));
  }
  output += '</select></div></div><div class="' + soy.$$escapeHtml(opt_data.enableValidationValue ? '' : 'hide') + ' row"><div class="col-md-6"><input class="field form-control ' + soy.$$escapeHtml(opt_data.parameterMessagePlaceholder ? '' : ' hide') + ' parameter-input" placeholder="' + soy.$$escapeHtml(opt_data.parameterMessagePlaceholder) + '" type="text" value="' + soy.$$escapeHtml(opt_data.parameterValue) + '" /></div><div class="col-md-6"><input class="field form-control message-input" placeholder="' + soy.$$escapeHtml(opt_data.errorMessagePlaceholder) + '" type="text" value="' + soy.$$escapeHtml(opt_data.errorMessageValue) + '" /></div></div><input name="' + soy.$$escapeHtml(opt_data.name) + '" type="hidden" value="' + soy.$$escapeHtml(opt_data.value) + '" /></div>';
  return output;
};
