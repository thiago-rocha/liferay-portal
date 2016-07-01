AUI.add(
	'liferay-ddm-form-field-checkbox',
	function(A) {
		var DataTypeBoolean = A.DataType.Boolean;

		var CheckboxField = A.Component.create(
			{
				ATTRS: {
					dataType: {
						value: 'boolean'
					},

					showAsSwitcher: {
						value: false
					},

					type: {
						value: 'checkbox'
					}
				},

				EXTENDS: Liferay.DDM.Renderer.Field,

				NAME: 'liferay-ddm-form-field-checkbox',

				prototype: {
					getTemplateContext: function() {
						var instance = this;

						var value = instance.get('value');

						return A.merge(
							CheckboxField.superclass.getTemplateContext.apply(instance, arguments),
							{
								showAsSwitcher: instance.get('showAsSwitcher')
							}
						);
					},

					getValue: function() {
						var instance = this;

						var inputNode = instance.getInputNode();

						return inputNode.attr('checked');
					},

					setValue: function(value) {
						var instance = this;

						var inputNode = instance.getInputNode();

						inputNode.attr('checked', DataTypeBoolean.parse(value));
					},

					_renderErrorMessage: function() {
						var instance = this;

						var container = instance.get('container');

						CheckboxField.superclass._renderErrorMessage.apply(instance, arguments);

						container.all('.help-block').appendTo(container);
					},

					_showFeedback: function() {
						var instance = this;

						var container = instance.get('container');

						CheckboxField.superclass._showFeedback.apply(instance, arguments);

						container.all('.form-control-feedback').appendTo(container);
					}
				}
			}
		);

		Liferay.namespace('DDM.Field').Checkbox = CheckboxField;
	},
	'',
	{
		requires: ['liferay-ddm-form-renderer-field']
	}
);