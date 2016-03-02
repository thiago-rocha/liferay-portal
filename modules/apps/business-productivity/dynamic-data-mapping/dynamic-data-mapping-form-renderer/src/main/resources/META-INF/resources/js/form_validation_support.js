AUI.add(
	'liferay-ddm-form-renderer-validation',
	function(A) {
		var Lang = A.Lang;

		var Renderer = Liferay.DDM.Renderer;

		var Util = Renderer.Util;

		var FormValidationSupport = function() {
		};

		FormValidationSupport.ATTRS = {
			evaluator: {
				valueFn: '_valueEvaluator'
			}
		};

		FormValidationSupport.prototype = {
			initializer: function() {
				var instance = this;

				var evaluator = instance.get('evaluator');

				instance._eventHandlers.push(
					instance.after('*:fieldEvaluationEnded', A.bind('_afterFieldEvaluationEnded', instance)),
					instance.getPagination().after('pageChange', A.bind('_afterFormValidationSupportPageChange', instance)),
					instance.after('render', A.bind('_afterFormValidationSupportRender', instance))
				);
			},

			hasValidation: function() {
				var instance = this;

				var hasValidation = false;

				instance.eachField(
					function(field) {
						hasValidation = field.hasValidation();

						return hasValidation;
					}
				);

				return hasValidation;
			},

			isPageValid: function(pageNode) {
				var instance = this;

				var valid = true;

				instance.eachField(
					function(field) {
						if (pageNode.contains(field.get('container'))) {
							valid = field.get('valid');
						}

						return !valid;
					}
				);

				return valid;
			},

			processPageValidation: function(pageNode, result) {
				var instance = this;

				var hasErrors = false;

				instance.eachField(
					function(field) {
						if (pageNode.contains(field.get('container'))) {
							var fieldData = Util.getFieldByKey(result, field.get('instanceId'), 'instanceId');

							field.set('valid', fieldData.valid);

							if (!fieldData.valid) {
								hasErrors = true;
							}

							return;
						}
					}
				);

				return hasErrors;
			},

			validate: function(callback) {
				var instance = this;

				var hasErrors = false;

				instance.eachField(
					function(field) {
						if (!field.get('valid')) {
							hasErrors = true;
						}

						return hasErrors;
					}
				);

				callback.call(instance, hasErrors);
			},

			validatePage: function(pageNode, callback) {
				var instance = this;

				if (instance.hasValidation()) {
					var evaluator = instance.get('evaluator');

					evaluator.evaluate(
						function(result) {
							var hasErrors = true;

							if (result && Lang.isObject(result)) {
								hasErrors = instance.processPageValidation(pageNode, result);
							}

							if (callback) {
								callback.call(instance, hasErrors, result);
							}
						}
					);
				}
				else if (callback) {
					callback.call(instance, false);
				}
			},

			_afterEvaluationEnded: function(event) {
				var instance = this;

				var result = event.result;

				instance.hideFeedback();

				if (!result || !Lang.isObject(result)) {
					var strings = instance.get('strings');

					instance.showAlert(strings.requestErrorMessage);
				}
			},

			_afterEvaluationStarted: function() {
				var instance = this;

				instance.showLoadingFeedback();
			},

			_afterFieldEvaluationEnded: function() {
				var instance = this;

				instance._checkCurrentPageValidation();
			},

			_afterFormValidationSupportPageChange: function () {
				var instance = this;

				instance._checkCurrentPageValidation();
			},

			_afterFormValidationSupportRender: function() {
				var instance = this;

				var evaluation = instance.get('evaluation');

				if (evaluation) {
					instance.eachField(function(field) {
						var fieldResult = Util.getFieldByKey(evaluation, field.get('instanceId'), 'instanceId');

						field.set('valid', fieldResult.valid);
					});
				}

				instance.fire('validatedPage', {
					valid: instance.isPageValid(instance.getPageNode(instance.getCurrentPage()))
				});
			},

			_checkCurrentPageValidation: function () {
				var instance = this;

				instance.validatePage(instance.getPageNode(instance.getCurrentPage()), function(hasError) {
					instance.fire('validatedPage', {
						valid: instance.isPageValid(instance.getPageNode(instance.getCurrentPage()))
					});
				});
			},

			_valueEvaluator: function() {
				var instance = this;

				return new Renderer.ExpressionsEvaluator(
					{
						form: instance
					}
				);
			}
		};

		Liferay.namespace('DDM.Renderer').FormValidationSupport = FormValidationSupport;
	},
	'',
	{
		requires: ['liferay-ddm-form-renderer-expressions-evaluator']
	}
);