AUI.add(
	'liferay-ddl-form-builder-field-settings-sidebar',
	function(A) {
		var CSS_PREFIX = A.getClassName('form', 'builder', 'fields', 'settings', 'sidebar');

		var FormBuilderFieldsSettingsSidebar = A.Component.create(
			{
				ATTRS: {
					cssClass: {
						value: 'sidebar'
					},

					description: {
						value: 'No description'
					},

					field: {
						value: null
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

				EXTENDS: Liferay.DDL.FormBuilderSidebar,

				NAME: 'liferay-ddl-form-builder-field-settings-sidebar',

				prototype: {

					initializer: function() {

					},

					getFieldSettings: function() {
						var instance = this;

						var field = instance.get('field');

						var settingsForm = instance.settingsForm;

						var settings = field.getSettings(settingsForm);

						return settings;
					},

					_afterFieldChange: function() {
						var instance = this;

						var field = instance.get('field');

						var toolbar = instance.get('toolbar');

						instance._loadFieldSettingsForm(field);

						toolbar.set('field', field);
					},

					_loadFieldSettingsForm: function(field) {
						var instance = this;

						field.loadSettingsForm().then(
							function(settingsForm) {
								instance.get('boundingBox').one('.sidebar-body').setHTML(settingsForm.get('container'));

								instance.set('title', field.get('context').label || 'Untitled');
								instance.set('description', field.get('type'));

								settingsForm.render();

								instance.get('boundingBox').one('.nav-tabs').wrap('<nav class="navbar navbar-default navbar-no-collapse"></nav>')

								instance.settingsForm = settingsForm;

								instance._saveCurrentFieldSettings();

								instance.fire(
									'fieldSettingsFormLoaded',
									{
										field: field,
										settingsForm: settingsForm
									}
								);
							}
						);
					},

					_saveCurrentFieldSettings: function() {
						var instance = this;

						var settings = instance.getFieldSettings();

						instance._previousSettings = settings;
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderFieldsSettingsSidebar = FormBuilderFieldsSettingsSidebar;
	},
	'',
	{
		requires: ['aui-tabview', 'liferay-ddl-form-builder-sidebar']
	}
);