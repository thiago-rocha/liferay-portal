// This file was automatically generated from autocomplete_rule.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }


ddl.autocomplete_rule = function(opt_data, opt_ignored) {
  var output = '<p>' + soy.$$escapeHtml(opt_data.description) + '</p><select>';
  if (opt_data.options.length > 0) {
    output += '<option value="" selected disabled style="display: none;">' + soy.$$escapeHtml(opt_data.selectPlaceholder) + '</option>';
    var optionList16 = opt_data.options;
    var optionListLen16 = optionList16.length;
    for (var optionIndex16 = 0; optionIndex16 < optionListLen16; optionIndex16++) {
      var optionData16 = optionList16[optionIndex16];
      output += '<option value="' + soy.$$escapeHtmlAttribute(optionData16.id) + '">' + soy.$$escapeHtml(optionData16.name) + '</option>';
    }
  }
  output += '</select>';
  return output;
};
if (goog.DEBUG) {
  ddl.autocomplete_rule.soyTemplateName = 'ddl.autocomplete_rule';
}
