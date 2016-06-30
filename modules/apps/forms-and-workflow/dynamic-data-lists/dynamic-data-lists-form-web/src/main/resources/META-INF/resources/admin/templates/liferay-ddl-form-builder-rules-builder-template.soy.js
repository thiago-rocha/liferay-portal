// This file was automatically generated from liferay-ddl-form-builder-rules-builder-template.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }


ddl.rules = function(opt_data, opt_ignored) {
  return '<div class="form-builder-rules-builder-container"><div class="form-builder-rules-builder-rule-list"></div><div class="form-builder-rules-builder-add-rule-container"><a class="btn form-builder-rules-builder-add-rule" href="javascript:;"><span class="form-builder-rules-builder-add-rule-button-icon">+</span><label class="form-builder-rules-builder-add-rule-button-label">' + soy.$$escapeHtml(opt_data.addRule) + '</label></a></div></div>';
};
if (goog.DEBUG) {
  ddl.rules.soyTemplateName = 'ddl.rules';
}


ddl.rule_list = function(opt_data, opt_ignored) {
  var output = '';
  var ruleList28 = opt_data.rules;
  var ruleListLen28 = ruleList28.length;
  if (ruleListLen28 > 0) {
    for (var ruleIndex28 = 0; ruleIndex28 < ruleListLen28; ruleIndex28++) {
      var ruleData28 = ruleList28[ruleIndex28];
      output += '<div class="card card-horizontal card-rule"><div class="card-row card-row-padded"><div class="card-col-content card-col-gutters"><h4>' + soy.$$escapeHtml(ruleData28.title) + '<h4><p>' + soy.$$escapeHtml(ruleData28.description) + '</p></div></div></di>';
    }
  } else {
    output += soy.$$escapeHtml(opt_data.emptyList);
  }
  return output;
};
if (goog.DEBUG) {
  ddl.rule_list.soyTemplateName = 'ddl.rule_list';
}
