AUI.add(
	'liferay-ddl-form-builder-sidebar',
	function(A) {
		var AObject = A.Object;

		var CSS_PREFIX = 'form-builder-sidebar';

		var CSS_CLASS_CLOSE = A.getClassName(CSS_PREFIX, 'close');

		var CSS_CLASS_TITLE = A.getClassName(CSS_PREFIX, 'title');

		var CSS_CLASS_DESCRIPTION = A.getClassName(CSS_PREFIX, 'description');

		var FormBuilderSidebar = A.Component.create(
			{
				ATTRS: {
					description: {
						value: 'No description'
					},

					skin: {
						value: 'sidebar-default'
					},

					title: {
						value: 'Untitle'
					},

					toolbar: {
						value: null
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
							instance.after('render', instance._afterRender),
							instance.after('fieldChange', instance._afterFieldChange),
							instance.after('titleChange', instance._syncHeaderInfo)
						];

						instance._eventHandlers = eventHandlers;
					},

					renderUI: function() {
						var instance = this;

						instance._renderTemplate();
					},

					bindUI: function() {
						var instance = this;

						var boundingBox = instance.get('boundingBox');

						var closeButton = boundingBox.one('.' + CSS_CLASS_CLOSE);

						instance._eventHandlers.push(
							closeButton.on('click', A.bind('_afterClickCloseButton', instance))
						);
					},

					destructor: function() {
						var instance = this;

						(new A.EventHandle(instance._eventHandlers)).detach();
					},

					close: function() {
						var instance = this;

						instance.get('boundingBox').removeClass('open');
					},

					getTemplate: function() {
						var instance = this;

						var renderer = instance.getTemplateRenderer();

						return renderer(instance.getTemplateContext());
					},

					getTemplateContext: function() {
						var instance = this;

						var toolbar = instance.get('toolbar');

						return {
							closeButtonIcon: Liferay.Util.getLexiconIconTpl('times', 'icon-monospaced'),
							description: instance.get('description'),
							title: instance.get('title'),
							toolbarButtonIcon: Liferay.Util.getLexiconIconTpl('ellipsis-v', 'icon-monospaced'),
							toolbarTemplateContext: toolbar.get('context')
						};
					},

					getTemplateRenderer: function() {
						return AObject.getValue(window, ['ddl', 'sidebar', 'render']);
					},

					open: function() {
						var instance = this;

						window.setTimeout(
							function() {
								instance.get('boundingBox').addClass('open');
							},
							100
						);

						instance.fire('open');
					},

					_afterClickCloseButton: function(event) {
						var instance = this;

						event.preventDefault();
						instance.close();
					},

					_afterRender: function() {
						var instance = this;

						var boundingBox = instance.get('boundingBox');

						boundingBox.addClass(instance.get('skin') + ' sidenav-fixed sidenav-menu-slider');

						instance.get('toolbar').set('element', boundingBox.one('.dropdown'));
					},

					_renderTemplate: function() {
						var instance = this;

						var headerTemplate = instance.getTemplate();

						instance.get('contentBox').append(headerTemplate);
					},

					_syncHeaderInfo: function() {
						var instance = this;

						var descriptionNode = instance.get('contentBox').one('.' + CSS_CLASS_DESCRIPTION);

						var titleNode = instance.get('contentBox').one('.' + CSS_CLASS_TITLE);

						if (titleNode) {
							titleNode.text(instance.get('title'));
						}

						if (descriptionNode) {
							descriptionNode.text(instance.get('description'));
						}
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderSidebar = FormBuilderSidebar;
	},
	'',
	{
		requires: ['aui-tabview', 'liferay-ddl-form-builder-field-options-toolbar', 'liferay-ddl-form-builder-sidebar-template']
	}
);