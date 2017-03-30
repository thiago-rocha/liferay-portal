AUI.add(
	'liferay-ddl-form-builder-action-calculate',
	function(A) {
		var CSS_CALCULATE_CONTAINER_CALCULATOR = A.getClassName('calculate', 'container', 'calculator', 'component');

		var CSS_CALCULATE_CONTAINER_FIELDS = A.getClassName('calculate', 'container', 'fields');

		var FormBuilderActionCalculate = A.Component.create(
			{
				ATTRS: {
					action: {
						value: ''
					},

					index: {
						value: ''
					},

					options: {
						value: []
					}
				},

				AUGMENTS: [],

				EXTENDS: Liferay.DDL.FormBuilderAction,

				NAME: 'liferay-ddl-form-builder-action-calculate',

				prototype: {
					initializer: function() {
						var instance = this;

						var calculator = instance._getCalculator();

						calculator.after('addMumber', instance._afterAddNumber);
					},

					getValue: function() {
						var instance = this;

						return {
							action: 'calculate',
							expression: instance._expressionField.getValue(),
							target: instance._targetField.getValue()
						};
					},

					render: function() {
						var instance = this;

						var index = instance.get('index');

						var calculateContainer = instance.get('boundingBox').one('.additional-info-' + index);

						calculateContainer.setHTML(instance._getRuleContainerTemplate());

						instance._getCalculator().render(instance._getCalculatorContainer());

						instance._createCalculateFieldsSettings();
					},

					_createCalculateFieldsSettings: function() {
						var instance = this;

						var index = instance.get('index');

						var boundingBox = instance.get('boundingBox');

						var calculateFieldsContainer = boundingBox.one('.additional-info-' + index).one('.' + CSS_CALCULATE_CONTAINER_FIELDS);

						instance._createExpressionField().render(calculateFieldsContainer);

						instance._createTargetField().render(calculateFieldsContainer);
					},

					_createCalculator: function() {
						var instance = this;

						var calculator = new Liferay.DDL.FormBuilderCalculator();

						return calculator;
					},

					_createExpressionField: function() {
						var instance = this;

						var value;

						var action = instance.get('action');

						if (action && action.expression) {
							value = action.expression;
						}

						instance._expressionField = new Liferay.DDM.Field.Text(
							{
								displayStyle: 'multiline',
								fieldName: instance.get('index') + '-action',
								label: Liferay.Language.get('expression'),
								value: value,
								visible: true
							}
						);

						return instance._expressionField;
					},

					_createTargetField: function() {
						var instance = this;

						var value;

						var action = instance.get('action');

						if (action && action.target) {
							value = action.target;
						}

						instance._targetField = new Liferay.DDM.Field.Select(
							{
								fieldName: instance.get('index') + '-action',
								label: Liferay.Language.get('field'),
								options: instance.get('options'),
								value: value,
								visible: true
							}
						);

						return instance._targetField;
					},

					_getCalculator: function() {
						var instance = this;

						if (!instance._calculator) {
							instance._calculator = instance._createCalculator();
						}

						return instance._calculator;
					},

					_getCalculatorContainer: function() {
						var instance = this;

						var index = instance.get('index');

						var boundingBox = instance.get('boundingBox');

						var calculatorContainer = boundingBox.one('.additional-info-' + index).one('.' + CSS_CALCULATE_CONTAINER_CALCULATOR);

						return calculatorContainer;
					},

					_getRuleContainerTemplate: function() {
						var instance = this;

						var calculateTemplateRenderer = Liferay.DDM.SoyTemplateUtil.getTemplateRenderer('ddl.calculate.settings');

						return calculateTemplateRenderer();
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderActionCalculate = FormBuilderActionCalculate;
	},
	'',
	{
		requires: ['liferay-ddl-form-builder-action', 'liferay-ddl-form-builder-calculator']
	}
);