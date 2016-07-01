AUI.add(
	'liferay-ddm-form-renderer-field-validation',
	function(A) {
		var Lang = A.Lang;

		var Renderer = Liferay.DDM.Renderer;

		var Util = Renderer.Util;

		var FieldValidationSupport = function() {
		};

		FieldValidationSupport.ATTRS = {
			strings: {
				value: {
					defaultErrorMessage: Liferay.Language.get('unknown-error'),
					requestErrorMessage: Liferay.Language.get('there-was-an-error-when-trying-to-validate-your-form')
				}
			},

			valid: {
				repaint: false,
				value: true
			}
		};

		FieldValidationSupport.prototype = {
			initializer: function() {
				var instance = this;

				instance._eventHandlers.push(
					instance.after('blur', instance._afterBlur)
				);
			},

			hasErrors: function() {
				var instance = this;

				return instance.get('visible') && !instance.get('valid');
			},

			validate: function(callback) {
				var instance = this;

				if (!instance.get('readOnly')) {
					var evaluator = instance.get('evaluator');

					evaluator.evaluate(
						instance,
						function(result) {
							if (callback) {
								var hasErrors = instance.hasErrors();

								if (!result || !Lang.isObject(result)) {
									hasErrors = true;
								}

								callback.call(instance, hasErrors, result);
							}
						}
					);
				}
				else if (callback) {
					callback.call(instance, true);
				}
			},

			_afterBlur: function() {
				var instance = this;

				var evaluator = instance.get('evaluator');

				if (evaluator && evaluator.isEvaluating()) {
					evaluator.onceAfter(
						'evaluationEnded',
						function() {
							if (!instance.hasFocus()) {
								instance.showErrorMessage();
							}
						}
					);
				}
				else {
					instance.showErrorMessage();
				}
			}
		};

		Liferay.namespace('DDM.Renderer').FieldValidationSupport = FieldValidationSupport;
	},
	'',
	{
		requires: ['liferay-ddm-form-renderer-expressions-evaluator']
	}
);