AUI.add(
	'liferay-ddl-form-builder-rules-builder',
	function(A) {
			var TPL_POPOVER = '<ul class="dropdown-menu">' +
			'<li>' +
			'<a href="javascript:;" data-rule-type="autocomplete">' +
			'Autocomplete' +
			'</a>' +
			'</li>' +
			'</ul>';

		var FormBuilderRulesBuilder = A.Component.create(
			{
				ATTRS: {
					rules: {
						value: []
					},

					strings: {
						value: {
							addRule: Liferay.Language.get('add-rule'),
							emptyList: Liferay.Language.get('there-are-no-rules-yet-click-on-plus-icon-bellow-to-add-the-first')
						}
					}
				},

				AUGMENTS: [],

				NAME: 'liferay-ddl-form-builder-rules-builder',

				prototype: {
					renderUI: function() {
						var instance = this;

						var strings = instance.get('strings');

						instance.get('contentBox').setHTML(ddl.rules({addRule: strings.addRule}));

						instance._renderPopover();

						instance._renderRules(instance.get('rules'));
					},

					bindUI: function() {
						var instance = this;

						instance.on('rulesChange', A.bind(instance._onRulesChange, instance));
					},

					_handlePopoverClick: function(event) {
						var instance = this;

						var ruleClass = Liferay.DDL.Rule[event.currentTarget.getData('rule-type')];
						
						new ruleClass({
							boundingBox: window.sidebar.getFieldRules()
						});
					},

					_renderAutoCompleteRuleSettings: function() {
						var instance = this;

						
						// var rules = instance.get('rules');

						// rules.push({
						// 	type: 'autocomplete',
						// 	description: 'A Autocomplete Rule'
						// });

						// instance.set('rules', rules);
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

						var strings = instance.get('strings');

						rulesList.setHTML(ddl.rule_list({rules: rules, emptyList: strings.emptyList}));
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