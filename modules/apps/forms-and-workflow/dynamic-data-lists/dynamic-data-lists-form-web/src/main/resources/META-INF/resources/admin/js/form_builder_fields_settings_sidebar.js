AUI.add(
	'liferay-ddl-form-builder-field-settings-sidebar',
	function(A) {
		var CSS_PREFIX = A.getClassName('form', 'builder', 'field', 'settings', 'sidebar');

		var loadingTPL = '<div class="loading-icon loading-icon-lg"></div>';

		var FormBuilderFieldsSettingsSidebar = A.Component.create(
			{
				ATTRS: {
					bodyContent: {
						setter: '_setBodyContent'
					},

					description: {
						value: 'No description'
					},

					field: {
						value: null
					},

					title: {
						value: 'Untitle'
					}
				},

				CSS_PREFIX: CSS_PREFIX,

				EXTENDS: Liferay.DDL.FormBuilderSidebar,

				NAME: 'liferay-ddl-form-builder-field-settings-sidebar',

				prototype: {
					initializer: function() {
						var instance = this;

						var eventHandlers;

						eventHandlers = [
							instance.after('open', instance._afterSidebarOpen),
							instance.after('open:start', instance._afterOpenStart)
						];

						instance._eventHandlers = eventHandlers;
					},

					getFieldSettings: function() {
						var instance = this;

						var field = instance.get('field');

						var settingsForm = instance.settingsForm;

						var settings = field.getSettings(settingsForm);

						return settings;
					},

					_afterOpenStart: function() {
						var instance = this;

						instance._showLoading();
					},

					_afterSidebarOpen: function() {
						var instance = this;

						var field = instance.get('field');

						var toolbar = instance.get('toolbar');

						instance._showLoading();

						instance.set('description', field.get('type'));
						instance.set('title', field.get('context').label);

						instance._loadFieldSettingsForm(field);

						toolbar.set('field', field);
					},

					_configureSideBar: function() {
						var instance = this;

						var boundingBox = instance.get('boundingBox');

						var settingsForm = instance.settingsForm;

						instance.set('bodyContent', settingsForm.get('container'));

						settingsForm.render();

						settingsForm.getFirstPageField().focus();

						boundingBox.one('.nav-tabs').wrap('<nav class="navbar navbar-default navbar-no-collapse"></nav>');
					},

					_loadFieldSettingsForm: function(field) {
						var instance = this;

						field.loadSettingsForm().then(
							function(settingsForm) {
								instance.settingsForm = settingsForm;

								instance._configureSideBar();

								field.updateSettingsFormValues(settingsForm);

								instance._saveCurrentFieldContext();

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

					_saveCurrentFieldContext: function() {
						var instance = this;

						var field = instance.get('field');

						var context = field.get('context');

						instance._previousContext = context;
					},

					_setBodyContent: function(content) {
						var instance = this;

						if (content) {
							instance.get('boundingBox').one('.sidebar-body').setHTML(content);
						}
					},

					_showLoading: function() {
						var instance = this;

						var bodyContent = instance.get('bodyContent');

						instance.set('description', '');
						instance.set('title', '');

						if (bodyContent !== loadingTPL) {
							instance.set('bodyContent', loadingTPL);
						}
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