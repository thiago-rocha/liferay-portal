AUI.add(
	'liferay-ddl-form-builder-rules-builder',
	function(A) {
			var TPL_POPOVER = '<ul class="dropdown-menu">' +
					'<li>' +
						'<a href="javascript:;" data-rule-type="autocomplete">' + Liferay.Language.get('autocomplete') + '</a>' +
					'</li>' +
				'</ul>';

		var FormBuilderRulesBuilder = A.Component.create(
			{
				ATTRS: {
					rules: {
						value: []
					}
				},

				AUGMENTS: [],

				NAME: 'liferay-ddl-form-builder-rules-builder',

				prototype: {
					initializer: function() {
						var instance = this;

						instance._ruleClasses = {};
					},

					renderUI: function() {
						var instance = this;

						instance.get('contentBox').setHTML(ddl.rules({addRuleLabel: Liferay.Language.get('add-rule')}));

						instance._renderPopover();

						instance._renderRules(instance.get('rules'));
					},

					bindUI: function() {
						var instance = this;

						var contentBox = instance.get('contentBox');

						instance.on('rulesChange', A.bind(instance._onRulesChange, instance));
						instance.on('*:saveRule', A.bind(instance._handleSaveRule, instance));
						instance.on('*:cancelRule', A.bind(instance._handleCancelRule, instance));

						contentBox.delegate('click', A.bin(instance._handleEditCardClick, instance), 'rule-card-edit');
					},

					_renderRuleSettings: function(ruleType) {
						var instance = this;

						var ruleClassInstance = instance._ruleClasses[ruleType];

						if (!ruleClassInstance) {
							ruleClassInstance = new Liferay.DDL.Rules[ruleType]({
								boundingBox: instance.get('contentBox').one('.form-builder-rule-settings-container'),
								bubbleTargets: [instance]
							}).render();

							instance._ruleClasses[ruleType] = ruleClassInstance;
						}

						ruleClassInstance.renderInicialState();
					},

					_handlePopoverClick: function(event) {
						var instance = this;

						var contentBox = instance.get('contentBox');

						contentBox.one('.form-builder-rules-builder-container').hide();
						contentBox.one('.form-builder-rule-settings-container').show();

						instance._renderRuleSettings(event.currentTarget.getData('rule-type'));
					},

					_handleCancelRule: function(event) {
						var instance = this;

						instance._showRuleList();
					},

					_handleEditCardClick: function(event) {
						console.log(event.currentTarget, event.target);
					},

					_handleSaveRule: function(event) {
						var instance = this;

						var rules = instance.get('rules');

						rules.push({
							id: rules.id,
							type: Liferay.Language.get(event.type),
							description: event.description
						});

						instance.set('rules', rules);

						instance._showRuleList();
					},

					_renderPopover: function() {
						var instance = this;

						var popover = new A.Popover({
							align: {
								node: '.form-builder-rules-builder-add-rule-button-icon'
							},
							cssClass: 'form-builder-rulles-builder-popover',
							animated: true,
							bodyContent: TPL_POPOVER,
							duration: 0.25,
							trigger: '.form-builder-rules-builder-add-rule-button-icon',
							position: 'bottom',
							zIndex: Liferay.zIndex.TOOLTIP,
							visible: false,
							hideOn: [{
								node: A.one(document),
								eventName: 'click'
							}]
						}).render();

						popover.get('contentBox').delegate('click', A.bind(instance._handlePopoverClick, instance), 'a');
					},

					_renderRules: function(rules) {
						var instance = this;

						var rulesList = instance.get('contentBox').one('.form-builder-rules-builder-rule-list');

						var emptyListText = Liferay.Language.get('there-are-no-rules-yet-click-on-plus-icon-bellow-to-add-the-first');

						rulesList.setHTML(ddl.rule_list({rules: rules, emptyListText: emptyListText, kebab: Liferay.Util.getLexiconIconTpl('ellipsis-v', 'icon-monospaced')}));
					},

					_showRuleList: function() {
						var instance = this;

						var contentBox = instance.get('contentBox');

						contentBox.one('.form-builder-rules-builder-container').show();
						contentBox.one('.form-builder-rule-settings-container').hide();
					},

					_onRulesChange: function(val) {
						var instance = this;

						instance._renderRules(val.newVal);
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderRulesBuilder = FormBuilderRulesBuilder;
	},
	'',
	{
		requires: ['aui-popover', 'event-outside', 'liferay-ddl-form-builder-rule', 'liferay-ddl-form-builder-autocomplete-rule', 'liferay-ddl-form-builder-rules-builder-template']
	}
);