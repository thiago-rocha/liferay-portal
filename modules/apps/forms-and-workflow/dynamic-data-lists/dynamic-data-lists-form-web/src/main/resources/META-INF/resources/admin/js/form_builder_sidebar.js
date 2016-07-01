AUI.add(
	'liferay-ddl-form-builder-sidebar',
	function(A) {
		var AObject = A.Object;

		var CSS_PREFIX = 'form-builder-sidebar';

		var CSS_CLASS_CLOSE = CSS_PREFIX + '-close';

		var CSS_CLASS_TITLE = A.getClassName(CSS_PREFIX, 'title');

		var CSS_CLASS_DESCRIPTION = A.getClassName(CSS_PREFIX, 'description');

		var TPL_BASIC_CONTENT = '<div id="formBuilderFieldSettings"></div>';

		var TPL_HEADER = '<div class="sidebar-header"><ul class="sidebar-header-actions">' +
			'<li><a href="#">' + Liferay.Util.getLexiconIconTpl('ellipsis-v', 'icon-monospaced') + '</a></li>' +
			'<li><a href="#" class="' + CSS_CLASS_CLOSE + '">' + Liferay.Util.getLexiconIconTpl('times', 'icon-monospaced') + '</a></li></ul>' +
			'<h4 class="' + CSS_CLASS_TITLE + '">{title}</h4>' +
			'<h5 class="' + CSS_CLASS_DESCRIPTION + '">{description}</h5></div>';

		var TPL_PANEL_NODE = '<div class="sidebar-body"></div>';

		var TPL_RULES_CONTENT = '<div id="formBuilderFieldRules"></div>';

		var FormBuilderSidebar = A.Component.create(
			{
				ATTRS: {
					cssClass: {
						value: 'sidebar'
					},

					description: {
						value: 'No description'
					},

					skin: {
						value: 'sidebar-default'
					},

					title: {
						value: 'Untitle'
					}
				},

				CSS_PREFIX: CSS_PREFIX,

				NAME: 'liferay-ddl-form-builder-sidebar',

				prototype: {

					initializer: function() {
						var instance = this;

						var eventHandlers;

						eventHandlers = [
							instance.after('descriptionChange', instance._syncHeaderInfo),
							instance.after('titleChange', instance._syncHeaderInfo),
							instance.after('render', instance._afterRender)
						];

						instance.getTemplate();

						instance._eventHandlers = eventHandlers;
					},

					renderUI: function() {
						var instance = this;

						instance._createHeader();
						instance._createBodyContent();
					},

					bindUI: function() {
						var instance = this;

						var closeButton = instance.get('boundingBox').one('.' + CSS_CLASS_CLOSE);

						closeButton.on(
							'click',
							A.bind('_afterClickCloseButton', instance)
						);
					},

					getTemplate: function() {
						var instance = this;

						var renderer = instance.getTemplateRenderer();

						return renderer(instance.getTemplateContext());
					},

					getTemplateRenderer: function() {
						return AObject.getValue(window, 'ddm.sidebar'.split('.'));
					},

					getTemplateContext: function() {
						var instance = this;

						return {
							title: instance.get('title'),
							description: instance.get('title')
						}
					},

					destructor: function() {
						var instance = this;

						(new A.EventHandle(instance._eventHandlers)).detach();
					},

					close: function() {
						var instance = this;

						instance.get('boundingBox').removeClass('open');
					},

					getFieldRules: function() {
						var instance = this;

						return instance.get('boundingBox').one('#formBuilderFieldRules');
					},

					getFieldSettings: function() {
						var instance = this;

						return instance.get('boundingBox').one('#formBuilderFieldSettings');
					},

					open: function() {
						var instance = this;

						window.setTimeout(
							function() {
								instance.get('boundingBox').addClass('open');
							},
							100
						);
					},

					_afterClickCloseButton: function(event) {
						var instance = this;

						event.preventDefault();
						instance.close();
					},

					_afterRender: function() {
						var instance = this;

						instance.get('boundingBox').addClass(instance.get('skin') + ' sidenav-fixed sidenav-menu-slider');
					},

					_createBodyContent: function() {
						var instance = this;

						instance.tabView = new A.TabView(
							{
								children: [
									{
										content: TPL_BASIC_CONTENT,
										label: Liferay.Language.get('basic')
									},
									{
										content: TPL_RULES_CONTENT,
										label: Liferay.Language.get('rules')
									}
								],
								panelNode: A.Node.create(TPL_PANEL_NODE),
								srcNode: instance.get('contentBox').one('.toolbar'),
								stacked: true
							}
						).render();

						instance.tabView.get('listNode').addClass('nav navbar-nav');
						instance.tabView.get('listNode').wrap('<nav class="navbar navbar-default"></nav>');
					},

					_createHeader: function() {
						var instance = this;

						var headerTemplate = instance.getTemplate();

						instance.get('contentBox').append(headerTemplate);
					},

					_syncHeaderInfo: function() {
						var instance = this;

						instance.get('contentBox').one('.' + CSS_CLASS_TITLE).text(instance.get('title'));
						instance.get('contentBox').one('.' + CSS_CLASS_DESCRIPTION).text(instance.get('description'));
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderSidebar = FormBuilderSidebar;
	},
	'',
	{
		requires: ['aui-tabview', 'liferay-ddm-form-sidebar-soy']
	}
);