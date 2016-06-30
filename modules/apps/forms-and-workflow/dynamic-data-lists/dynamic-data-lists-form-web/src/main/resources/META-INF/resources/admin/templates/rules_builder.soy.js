// This file was automatically generated from rules_builder.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }


ddl.rules = function(opt_data, opt_ignored) {
  return '<div class="form-builder-rules-builder-container"><div class="form-builder-rules-builder-rule-list"></div><div class="form-builder-rules-builder-add-rule-container"><a class="btn form-builder-rules-builder-add-rule" href="javascript:;"><span class="form-builder-rules-builder-add-rule-button-icon">+</span><label class="form-builder-rules-builder-add-rule-button-label">' + soy.$$escapeHtml(opt_data.addRuleLabel) + '</label></a></div></div><div class="form-builder-rule-settings-container"></div>';
};
if (goog.DEBUG) {
  ddl.rules.soyTemplateName = 'ddl.rules';
}


ddl.rule_list = function(opt_data, opt_ignored) {
  var output = '';
  var ruleList48 = opt_data.rules;
  var ruleListLen48 = ruleList48.length;
  if (ruleListLen48 > 0) {
    for (var ruleIndex48 = 0; ruleIndex48 < ruleListLen48; ruleIndex48++) {
      var ruleData48 = ruleList48[ruleIndex48];
      output += '<div class="card card-horizontal card-rule"><div class="card-row card-row-padded"><div class="card-col-content card-col-gutters"><h4>' + soy.$$escapeHtml(ruleData48.type) + '</h4><p>' + soy.$$escapeHtml(ruleData48.description) + '</p></div><div class="card-col-field"><div class="dropdown"><a class="dropdown-toggle icon-monospaced" data-toggle="dropdown" href="#1">' + soy.$$filterNoAutoescape(opt_data.kebab) + '</a><ul class="dropdown-menu dropdown-menu-right"><li><a href="#1">Edit</a></li><li><a href="#1">Delete</a></li></ul></div></div></div></div>';
    }
  } else {
    output += soy.$$escapeHtml(opt_data.emptyListText);
  }
  return output;
};
if (goog.DEBUG) {
  ddl.rule_list.soyTemplateName = 'ddl.rule_list';
}
