AUI.add(
	'liferay-ddl-form-builder-calculator',
	function(A) {
		var CSS_CALCULATOR_BUTTON = A.getClassName('calculator', 'button');

		var FormBuilderCalculator = A.Component.create(
			{
				ATTRS: {
					strings: {
						value: {
							addField: Liferay.Language.get('add-field')
						}
					}
				},

				AUGMENTS: [],

				NAME: 'liferay-ddl-form-builder-calculator',

				prototype: {
					_handleButtonClick: function(event) {
						var instance = this;

						instance.fire(
							'clickedKey',
							{
								key: event.currentTarget.getData('calculator-key')
							}
						);
					},

					renderUI: function() {
						var instance = this;

						var boundingBox = instance.get('boundingBox');

						boundingBox.setHTML(instance._getTemplate());
					},

					bindUI: function() {
						var instance = this;

						var boundingBox = instance.get('boundingBox');

						boundingBox.delegate('click', A.bind(instance._handleButtonClick, instance), '.' + CSS_CALCULATOR_BUTTON);
					},

					_getTemplate: function() {
						var instance = this;

						var strings = instance.get('strings');

						var calculatorTemplateRenderer = Liferay.DDM.SoyTemplateUtil.getTemplateRenderer('ddl.calculator.settings');

						return calculatorTemplateRenderer(
							{
								strings: strings,
								calculatorAngleLeft: Liferay.Util.getLexiconIconTpl('angle-left', 'icon-monospaced'),
								calculatorEllipsis: Liferay.Util.getLexiconIconTpl('ellipsis-h', 'icon-monospaced')
							}
						);
					},

				}
			}
		);

		Liferay.namespace('DDL').FormBuilderCalculator = FormBuilderCalculator;
	},
	'',
	{
	}
);