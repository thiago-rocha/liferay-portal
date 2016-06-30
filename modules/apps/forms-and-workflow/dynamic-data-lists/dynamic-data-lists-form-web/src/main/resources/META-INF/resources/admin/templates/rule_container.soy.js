// This file was automatically generated from rule_container.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }


ddl.rule_settings_container = function(opt_data, opt_ignored) {
  return '<h4>' + soy.$$escapeHtml(opt_data.title) + '<h4><div class="form-builder-' + soy.$$escapeHtmlAttribute(opt_data.type) + '-rule-settings">' + soy.$$filterNoAutoescape(opt_data.ruleTemplate) + '</div><button class="btn btn-lg ddl-button btn-primary btn-default form-builder-rule-settings-save" type="button"><span class="form-builder-rule-settings-save-label">' + soy.$$escapeHtml(opt_data.saveLabel) + '</span></button><button class="btn btn-lg btn-cancel btn-default btn-link form-builder-rule-settings-cancel"><span class="lfr-btn-label">' + soy.$$escapeHtml(opt_data.cancelLabel) + '</span></button>';
};
if (goog.DEBUG) {
  ddl.rule_settings_container.soyTemplateName = 'ddl.rule_settings_container';
}
