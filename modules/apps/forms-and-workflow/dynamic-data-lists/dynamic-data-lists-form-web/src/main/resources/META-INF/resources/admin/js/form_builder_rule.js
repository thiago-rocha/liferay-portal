AUI.add(
	'liferay-ddl-form-builder-rule',
	function(A) {
		var FormBuilderRule = A.Component.create(
			{
				ATTRS: {
					description: {
						value: ''
					},
					title: {
						value: ''
					}
				},

				AUGMENTS: [],

				NAME: 'liferay-ddl-form-builder-rule',

				prototype: {
					renderUI: function() {
						var instance = this;

						instance.get('contentBox').setHTML(instance._getRuleContainerTemplate());
					},

					bindUI: function() {
						var instance = this;

						instance.get('contentBox').delegate('click', A.bind(instance._handleSaveClick, instance), '.form-builder-rule-settings-save');
						instance.get('contentBox').delegate('click', A.bind(instance._handleCancelClick, instance), '.form-builder-rule-settings-cancel');
					},

					renderInicialState: function() {

					},

					_getRuleContainerTemplate: function() {
						var instance = this;

						var ruleSettingsContainer;

						ruleSettingsContainer = ddl.rule_settings_container({
							cancelLabel: Liferay.Language.get('cancel'),
							ruleTemplate: instance._getRuleTemplate(),
							saveLabel: Liferay.Language.get('save'),
							title: instance.get('title'),
							type: instance._getRuleType()
						});

						return ruleSettingsContainer;
					},

					_getRuleTemplate: function() {
						return '';
					},

					_getRuleType: function() {
						return '';
					},

					_handleCancelClick: function() {
						var instance = this;

						instance.fire('cancelRule');
					},

					_handleSaveClick: function() {
						var instance = this;

						instance.fire('saveRule', {});
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderRule = FormBuilderRule;
	},
	'',
	{
		requires: ['liferay-ddl-form-builder-rule-container-template']
	}
);