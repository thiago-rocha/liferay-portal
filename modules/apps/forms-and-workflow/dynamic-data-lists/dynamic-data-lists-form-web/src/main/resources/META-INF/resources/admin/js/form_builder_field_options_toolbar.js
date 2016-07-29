AUI.add(
	'liferay-ddl-form-builder-field-options-toolbar',
	function(A) {
		var FormBuilderFieldOptionsToolbar = A.Component.create(
			{
				ATTRS: {
					context: {
						getter: 'getTemplateContext'
					},

					element: {
						value: null
					},

					field: {
						value: null
					},

					formBuilder: {
						value: null
					},

					options: {
						value: [
							{
								buttonClass: 'layout-builder-move-cut-col-button',
								handler: 'moveField',
								label: 'Move Field'
							},
							{
								handler: 'removeField',
								label: 'Remove Field'
							},
							{
								handler: 'cancelFieldEdition',
								label: 'Cancel Edition'
							}
						]
					}
				},

				NAME: 'liferay-ddl-form-builder-field-options-toolbar',

				prototype: {
					initializer: function() {
						var instance = this;

						instance._eventHandlers = [
							instance.after('elementChange', A.bind('_bindUI', instance))
						];

						if (instance.get('element')) {
							instance._bindUI();
						}
					},

					destructor: function() {
						var instance = this;

						(new A.EventHandle(instance._eventHandlers)).detach();
					},

					getTemplateContext: function() {
						var instance = this;

						return {
							options: instance.get('options')
						};
					},

					_bindUI: function() {
						var instance = this;

						var element = instance.get('element');

						instance._eventHandlers.push(element.delegate('click', A.bind('_onToolbaItemClick', instance), '.dropdown-menu a'));
					},

					_onToolbaItemClick: function(event) {
						event.preventDefault();

						var instance = this;

						var target = event.currentTarget;

						var handlerName = target.getData('handler');

						var formBuilder = instance.get('formBuilder');

						var field = instance.get('field');

						if (handlerName && formBuilder[handlerName]) {
							formBuilder[handlerName].call(formBuilder, field, event);
						}
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderFieldOptionsToolbar = FormBuilderFieldOptionsToolbar;
	},
	'',
	{
		requires: ['liferay-ddl-form-builder-field-options-toolbar-template']
	}
);