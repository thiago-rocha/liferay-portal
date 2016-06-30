// This file was automatically generated from liferay-ddl-form-builder-rule-container-template.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }


ddl.rule_container = function(opt_data, opt_ignored) {
  return '<div class="form-builder-rule-container"><h4>' + soy.$$escapeHtml(opt_data.title) + '<h4><div class="form-builder-' + soy.$$escapeHtmlAttribute(opt_data.type) + '-rule">' + soy.$$escapeHtml(opt_data.ruleTemplate) + '</div><button class="btn btn-lg ddl-button btn-primary btn-default form-builder-rule-save" type="button"><span class="form-builder-rule-save-label">' + soy.$$escapeHtml(opt_data.strings.save) + '</span></button><a class="btn btn-lg btn-cancel btn-default btn-link form-builder-rule-save" href="" ><span class="lfr-btn-label">' + soy.$$escapeHtml(opt_data.strings.cancel) + '</span></a></div>';
};
if (goog.DEBUG) {
  ddl.rule_container.soyTemplateName = 'ddl.rule_container';
}
