AUI.add(
	'liferay-ddl-form-builder-autocomplete-rule',
	function(A) {
		var FormBuilderAutocompleteRule = A.Component.create(
			{
				ATTRS: {
					title: {
						value: Liferay.Language.get('autocomplete')
					}
				},

				AUGMENTS: [],

				NAME: 'liferay-ddl-form-builder-autocomplete-rule',

				prototype: {
					_getRuleTemplate: function() {
						return '';
					},

					_getRuleType: function() {
						return 'autocomplete';
					}
				}
			}
		);

		Liferay.namespace('DDL.Rules').autocomplete = FormBuilderAutocompleteRule;
	},
	'',
	{
		requires: ['liferay-ddl-form-builder-rule']
	}
);