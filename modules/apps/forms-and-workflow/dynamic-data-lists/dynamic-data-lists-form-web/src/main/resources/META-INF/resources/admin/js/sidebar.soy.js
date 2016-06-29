// This file was automatically generated from sidebar.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }


ddl.sidebar = function(opt_data, opt_ignored) {
  return '' + ddl.sidebar_header(opt_data);
};
if (goog.DEBUG) {
  ddl.sidebar.soyTemplateName = 'ddl.sidebar';
}


ddl.sidebar_header = function(opt_data, opt_ignored) {
  return '<div class="sidebar-header"><ul class="sidebar-header-actions">' + ((opt_data.toolbarTemplateContext) ? '<li>' + ddl.fieldOptionsToolbar(opt_data) + '</li>' : '') + '<li><a href="#" class="form-builder-sidebar-close">' + soy.$$filterNoAutoescape(opt_data.closeButtonIcon) + '</a></li></ul><h4 class="form-builder-sidebar-title">' + soy.$$escapeHtml(opt_data.title) + '</h4><h5 class="form-builder-sidebar-description">' + soy.$$escapeHtml(opt_data.description) + '</h5></div><div class="toolbar"></div>';
};
if (goog.DEBUG) {
  ddl.sidebar_header.soyTemplateName = 'ddl.sidebar_header';
}


ddl.fieldOptionsToolbar = function(opt_data, opt_ignored) {
  return '' + ddl.field_settings_toolbar(opt_data);
};
if (goog.DEBUG) {
  ddl.fieldOptionsToolbar.soyTemplateName = 'ddl.fieldOptionsToolbar';
}
