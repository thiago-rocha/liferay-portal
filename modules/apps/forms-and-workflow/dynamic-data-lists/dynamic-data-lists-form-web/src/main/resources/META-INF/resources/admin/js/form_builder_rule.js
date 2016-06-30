AUI.add(
	'liferay-ddl-form-builder-rule',
	function(A) {
		var FormBuilderRule = A.Component.create(
			{
				ATTRS: {
					strings: {
						value: {
							cancel: Liferay.Language.get('cancel'),
							save: Liferay.Language.get('save')
						}
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

						var strings = instance.get('strings');

						instance.get('contentBox').setHTML(ddl.rule_container({
							rule: instance._getRuleTemplate(),
							strings: instance.strings,
							title: instance.get('title'),
							type: ''
						}));
					},

					bindUI: function() {

					},

					_getRuleTemplate: function() {
						return '';
					},

					_getRuleType: function() {
						return '';
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderRule = FormBuilderRule;
	},
	'',
	{
		requires: []
	}
);