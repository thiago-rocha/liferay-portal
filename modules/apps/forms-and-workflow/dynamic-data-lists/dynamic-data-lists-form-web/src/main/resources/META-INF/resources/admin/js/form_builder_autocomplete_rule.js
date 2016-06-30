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

				EXTENDS: Liferay.DDL.FormBuilderRule,

				NAME: 'liferay-ddl-form-builder-autocomplete-rule',

				prototype: {
					renderInicialState: function() {
						var instance = this;

						var select = instance.get('boundingBox').one('select');

						select.set('value', '');
					},

					_getRuleTemplate: function() {
						var instance = this;

						return ddl.autocomplete_rule({
							description: Liferay.Language.get('select-an-external-source-to-apply-the-autocomplete-feature'),
							options: Liferay.DDL.RulesHelper.dataProviders,
							selectPlaceholder: Liferay.Language.get('choose-data-provider')
						});
					},

					_getRuleType: function() {
						return Liferay.Language.get('autocomplete');
					},

					_getSelectedOption: function() {
						var instance = this;

						var select = instance.get('boundingBox').one('select');

						var selectedId = select.get('value');

						var selectedName = select.one('[value=' + selectedId + ']').get('innerHTML');

						return {
							id: selectedId,
							name: selectedName
						};
					},

					_handleSaveClick: function() {
						var instance = this;

						var selectedOption = instance._getSelectedOption();

						instance.fire(
							'saveRule',
							{
								description: A.Lang.sub(
									Liferay.Language.get('loading-from-an-external-source-x'),
									[selectedOption.name]
								),
								id: selectedOption.id,
								name: selectedOption.name,
								type: instance._getRuleType()
							}
						);
					}
				}
			}
		);

		Liferay.namespace('DDL.Rules').autocomplete = FormBuilderAutocompleteRule;
	},
	'',
	{
		requires: ['liferay-ddl-form-builder-autocomplete-rule-template', 'liferay-ddl-form-builder-rule']
	}
);