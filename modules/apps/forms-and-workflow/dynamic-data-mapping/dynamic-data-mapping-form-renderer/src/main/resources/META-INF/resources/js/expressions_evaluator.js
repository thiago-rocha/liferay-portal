AUI.add(
	'liferay-ddm-form-renderer-expressions-evaluator',
	function(A) {
		var ExpressionsEvaluator = A.Component.create(
			{
				ATTRS: {
					enabled: {
						getter: '_getEnabled',
						value: true
					},

					evaluatorURL: {
						valueFn: '_valueEvaluatorURL'
					},

					form: {
					}
				},

				NAME: 'liferay-ddm-form-renderer-expressions-evaluator',

				prototype: {
					initializer: function() {
						var instance = this;

						instance._cache = new A.Map();
						instance._queue = new A.Queue();

						instance.publish(
							{
								'evaluate': {
									defaultFn: A.debounce(instance._evaluate, 300, instance)
								},
								start: {
									defaultFn: A.debounce(instance._fireStart, 300, instance)
								}
							}
						)

						instance.after('evaluationEnded', instance._afterEvaluationEnded);
					},

					destructor: function() {
						var instance = this;

						instance._cache.destroy();
					},

					evaluate: function(trigger, callback) {
						var instance = this;

						var enabled = instance.get('enabled');

						var form = instance.get('form');

						if (enabled && form) {
							if (instance.isEvaluating()) {
								instance.stop();
							}

							instance._evaluating = true;

							instance.fire(
								'start',
								{
									trigger: trigger
								}
							);

							instance._queue.add(trigger);

							instance.fire(
								'evaluate',
								{
									callback: function(result) {
										instance._evaluating = false;

										var triggers = {};

										while (instance._queue.size() > 0) {
											var next = instance._queue.next();

											if (!triggers[next.get('name')]) {
												instance.fire(
													'evaluationEnded',
													{
														result: result,
														trigger: next
													}
												);
											}

											triggers[next.get('name')] = true;
										}

										if (callback) {
											callback.apply(instance, arguments);
										}
									}
								}
							);
						}
					},

					_fireStart: function(event) {
						var instance = this;

						if (instance.isEvaluating()) {
							var form = instance.get('form');

							instance.fire(
								'evaluationStarted',
								{
									trigger: event.trigger
								}
							);
						}
					},

					isEvaluating: function() {
						var instance = this;

						return instance._evaluating;
					},

					stop: function() {
						var instance = this;

						if (instance._request) {
							instance._request.destroy();

							delete instance._request;
						}
					},

					_afterEvaluationEnded: function() {
						var instance = this;

						instance.stop();
					},

					_evaluate: function(event) {
						var instance = this;

						var callback = event.callback;

						var form = instance.get('form');

						var payload = form.getEvaluationPayload();

						var cacheKey = JSON.stringify(payload);

						var cached = instance._cache.getValue(cacheKey);

						if (cached) {
							callback.call(instance, cached);
						}
						else {
							var portletNamespace = form.get('portletNamespace');

							instance._request = A.io.request(
								instance.get('evaluatorURL'),
								{
									data: Liferay.Util.ns(portletNamespace, payload),
									dataType: 'JSON',
									method: 'POST',
									on: {
										failure: function(event) {
											if (event.details[1].statusText !== 'abort') {
												callback.call(instance, null);
											}
											else {
												callback.call(instance, {});
											}
										},
										success: function() {
											var result = this.get('responseData');

											if (instance._cache.size() > 10) {
												instance._cache.remove(instance._cache.keys()[0]);
											}

											instance._cache.put(cacheKey, result);

											callback.call(instance, result);
										}
									}
								}
							);
						}
					},

					_getEnabled: function(enabled) {
						var instance = this;

						return enabled && !!instance.get('evaluatorURL');
					},

					_valueEvaluatorURL: function() {
						var instance = this;

						var evaluatorURL;

						var form = instance.get('form');

						if (form) {
							evaluatorURL = form.get('evaluatorURL');
						}

						return evaluatorURL;
					}
				}
			}
		);

		Liferay.namespace('DDM.Renderer').ExpressionsEvaluator = ExpressionsEvaluator;
	},
	'',
	{
		requires: ['aui-component', 'aui-io-request', 'aui-map', 'queue']
	}
);