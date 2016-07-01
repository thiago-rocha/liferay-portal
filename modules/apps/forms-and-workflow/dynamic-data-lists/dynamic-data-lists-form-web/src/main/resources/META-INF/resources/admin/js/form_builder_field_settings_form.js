AUI.add(
	'liferay-ddl-form-builder-field-settings-form',
	function(A) {
		var Lang = A.Lang;

		var CSS_FIELD_SETTINGS_SAVE = A.getClassName('lfr', 'ddl', 'field', 'settings', 'save');

		var TPL_OPTION = '<option {status} value="{value}">{label}</option>';

		var TPL_SETTINGS_FORM = '<form action="javascript:;"></form>';

		var TPL_SETTINGS_TOGGLER = '<button class="btn settings-toggler" type="button"><span class="settings-toggle-label"></span><span class="settings-toggle-icon"></span></button>';

		var TPL_SUBMIT_BUTTON = '<button class="hide" type="submit" />';

		var FormBuilderSettingsForm = A.Component.create(
			{
				ATTRS: {
					dataProviders: {
					},

					field: {
					}
				},

				EXTENDS: Liferay.DDM.Renderer.Form,

				NAME: 'liferay-ddl-form-builder-field-settings-form',

				prototype: {
					initializer: function() {
						var instance = this;

						var evaluator = instance.get('evaluator');

						instance._initDataProvider();

						evaluator.after('evaluationEnded', A.bind('_saveSettings', instance));

						instance._eventHandlers.push(
							instance.after('render', instance._afterSettingsFormRender)
						);

						instance._fieldEventHandlers = [];
					},

					getEvaluationPayload: function() {
						var instance = this;

						var field = instance.get('field');

						return A.merge(
							FormBuilderSettingsForm.superclass.getEvaluationPayload.apply(instance, arguments),
							{
								type: field.get('type')
							}
						);
					},

					submit: function(callback) {
						var instance = this;

						instance.validateSettings(
							function(hasErrors) {
								if (callback) {
									callback.apply(instance, arguments);
								}
							}
						);
					},

					_saveSettings: function() {
						var instance = this;

						var settingsForm = instance.get('field');

						var settingsModal = settingsForm.getSettingsModal();

						settingsForm.saveSettings(instance);
					},

					validateSettings: function(callback) {
						var instance = this;

						instance.validate(
							function(hasErrors) {
								hasErrors = instance._handleValidationResponse(hasErrors);

								if (callback) {
									callback.call(instance, hasErrors);
								}
							}
						);
					},

					_afterDDMDataProviderInstanceIdFieldRender: function(event) {
						var instance = this;

						var ddmDataProviderInstanceIdField = event.target;

						var ddmDataProviderInstanceId = ddmDataProviderInstanceIdField.get('value');

						ddmDataProviderInstanceIdField.getInputNode().html(
							instance.get('dataProviders').map(
								function(item) {
									var status = '';

									if (item.id === ddmDataProviderInstanceId) {
										status = 'selected';
									}

									return Lang.sub(
										TPL_OPTION,
										{
											label: item.name,
											status: status,
											value: item.id
										}
									);
								}
							).join('')
						);
					},

					_afterSettingsFormRender: function() {
						var instance = this;

						var container = instance.get('container');

						container.append(TPL_SUBMIT_BUTTON);

						instance._createModeToggler();
						instance._syncModeToggler();

						var formName = A.guid();

						container.attr('id', formName);
						container.attr('name', formName);

						Liferay.Form.register(
							{
								id: formName
							}
						);

						var labelField = instance.getField('label');
						var nameField = instance.getField('name');

						(new A.EventHandle(instance._fieldEventHandlers)).detach();

						instance._fieldEventHandlers.push(
							labelField.on('keyChange', A.bind('_onLabelFieldKeyChange', instance)),
							labelField.on(A.bind('_onLabelFieldNormalizeKey', instance), labelField, 'normalizeKey')
						);

						labelField.set('key', nameField.getValue());
						labelField.focus();
					},

					_createModeToggler: function() {
						var instance = this;

						var advancedSettingsNode = instance.getPageNode(2);

						var settingsTogglerNode = A.Node.create(TPL_SETTINGS_TOGGLER);

						advancedSettingsNode.placeBefore(settingsTogglerNode);

						settingsTogglerNode.on('click', A.bind('_onClickModeToggler', instance));

						instance.settingsTogglerNode = settingsTogglerNode;
					},

					_generateFieldName: function(key) {
						var instance = this;

						var counter = 0;

						var field = instance.get('field');

						var builder = field.get('builder');

						var existingField;

						var name = key;

						if (name) {
							do {
								if (counter > 0) {
									name = key + counter;
								}

								existingField = builder.getField(name);

								counter++;
							}
							while (existingField !== undefined && existingField !== field);
						}

						return name;
					},

					_getModalStdModeNode: function(mode) {
						var instance = this;

						var field = instance.get('field');

						var settingsModal = field.getSettingsModal();

						return settingsModal._modal.getStdModNode(mode);
					},

					_handleValidationResponse: function(hasErrors) {
						var instance = this;

						var field = instance.get('field');

						var builder = field.get('builder');

						var nameField = instance.getField('name');

						var sameNameField = builder.getField(nameField.getValue());

						if (!!sameNameField && sameNameField !== field) {
							nameField.showErrorMessage(Liferay.Language.get('field-name-is-already-in-use'));

							hasErrors = true;
						}

						return hasErrors;
					},

					_initDataProvider: function() {
						var instance = this;

						var ddmDataProviderInstanceIdField = instance.getField('ddmDataProviderInstanceId');

						if (ddmDataProviderInstanceIdField) {
							instance._eventHandlers.push(
								ddmDataProviderInstanceIdField.after('render', A.bind('_afterDDMDataProviderInstanceIdFieldRender', instance))
							);
						}
					},

					_onClickModeToggler: function(event) {
						var instance = this;

						var advancedSettingsNode = instance.getPageNode(2);

						advancedSettingsNode.toggleClass('active');

						instance._syncModeToggler();
					},

					_onLabelFieldKeyChange: function(event) {
						var instance = this;

						var nameField = instance.getField('name');

						nameField.setValue(event.newVal);
					},

					_onLabelFieldNormalizeKey: function(key) {
						var instance = this;

						return new A.Do.AlterArgs(null, [instance._generateFieldName(key)]);
					},

					_onSubmitForm: function(event) {
						var instance = this;

						event.preventDefault();

						instance.submit();
					},

					_syncModeToggler: function() {
						var instance = this;

						var advancedSettingsNode = instance.getPageNode(2);

						var settingsTogglerNode = instance.settingsTogglerNode;

						var settingsTogglerIconNode = settingsTogglerNode.one('.settings-toggle-icon');
						var settingsTogglerLabelNode = settingsTogglerNode.one('.settings-toggle-label');

						var active = advancedSettingsNode.hasClass('active');

						if (active) {
							settingsTogglerIconNode.html(Liferay.Util.getLexiconIconTpl('angle-up'));
							settingsTogglerLabelNode.html(Liferay.Language.get('hide-options'));
						}
						else {
							settingsTogglerIconNode.html(Liferay.Util.getLexiconIconTpl('angle-down'));
							settingsTogglerLabelNode.html(Liferay.Language.get('show-more-options'));
						}

						settingsTogglerNode.toggleClass('active', active);
					},

					_valueContainer: function() {
						var instance = this;

						return A.Node.create(TPL_SETTINGS_FORM);
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderSettingsForm = FormBuilderSettingsForm;
	},
	'',
	{
		requires: ['liferay-ddm-form-renderer', 'liferay-form']
	}
);