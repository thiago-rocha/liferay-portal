// This file was automatically generated from sidebar.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddm.
 * @public
 */

if (typeof ddm == 'undefined') { var ddm = {}; }


ddm.sidebar = function(opt_data, opt_ignored) {
  return '' + ddm.sidebar_header(opt_data);
};
if (goog.DEBUG) {
  ddm.sidebar.soyTemplateName = 'ddm.sidebar';
}


ddm.sidebar_header = function(opt_data, opt_ignored) {
  return '<div class="sidebar-header"><ul class="sidebar-header-actions"><li><a href="#">...</a></li><li><a href="#" class="form-builder-sidebar-close">X</a></li></ul><h4 class="form-builder-sidebar-title">' + soy.$$escapeHtml(opt_data.title) + '</h4><h5 class="form-builder-sidebar-description">' + soy.$$escapeHtml(opt_data.description) + '</h5></div><div class="toolbar"></div>';
};
if (goog.DEBUG) {
  ddm.sidebar_header.soyTemplateName = 'ddm.sidebar_header';
}
