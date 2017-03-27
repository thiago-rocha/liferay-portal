AUI.add(
	'liferay-ddl-form-builder-pagination',
	function(A) {
		var FormBuilderPagination = A.Component.create(
			{
				ATTRS: {
					successPage: {
						value: false
					}
				},

				EXTENDS: A.Pagination,

				NAME: 'liferay-ddl-form-builder-pagination',

				prototype: {
					CONTENT_TEMPLATE: '<ul class="pagination"></ul>',
					ITEM_TEMPLATE: '<li class="{cssClass}"><a href="#">{content}</a></li>',
					SUCCESS_PAGE_ITEM_TEMPLATE: '<li class="{cssClass}"><a href="#">{content}</a></li>',

					initializer: function() {
						var instance = this;

						instance.after('successPageChange', A.bind(instance._afterSuccessPageChange, instance));
					},

					next: function() {
						var instance = this;

						var	total = instance.get('total');

						if (instance.get('successPage')) {
							total++;
						}

						if (total === 0) {
							return;
						}

						var page = instance.get('page');

						instance._dispatchRequest(
							{
								page: (instance.get('circular') && (page === total)) ? 1 : Math.min(total, ++page)
							}
						);

						return instance;
					},

					prev: function() {
						var instance = this;

						var	total = instance.get('total');

						if (instance.get('successPage')) {
							total++;
						}

						if (total === 0) {
							return;
						}

						var page = instance.get('page');

						instance._dispatchRequest(
							{
								page: (instance.get('circular') && (page === 1)) ? total : Math.max(1, --page)
							}
						);

						return instance;
					},

					_afterSuccessPageChange: function(event) {
						var instance = this;

						instance._renderItemsUI(instance.get('total'));

						if (event.newVal) {
							instance._dispatchRequest(
								{
									page: instance.get('total') + 1
								}
							);
						}
					},

					_renderItemsUI: function(total) {
						var instance = this,
							tpl = instance.ITEM_TEMPLATE,
							formatter = instance.get('formatter'),
							offset = instance.get('offset'),
							i,
							buffer = '';

						buffer += A.Lang.sub(tpl, {
							content: instance.getString('prev'),
							cssClass: 'pagination-control'
						});

						for (i = offset; i <= (offset + total - 1); i++) {
							buffer += formatter.apply(instance, [i]);
						}

						if (instance.get('successPage')) {
							buffer += A.Lang.sub(tpl, {
								content: Liferay.Language.get('success-page'),
								cssClass: 'pagination-success-page'
							});
						}

						buffer += A.Lang.sub(tpl, {
							content: instance.getString('next'),
							cssClass: 'pagination-control'
						});

						var items = A.NodeList.create(buffer);
						instance.set('items', items);
						instance.get('contentBox').setContent(items);

						// When show controls is false, remove the first and last items from
						// the DOM in order to hide the controls, but keep the references
						// inside items NodeList in order to handle the items index the same
						// way when they are visible.
						if (!instance.get('showControls')) {
							items.first().remove();
							items.last().remove();
						}
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderPagination = FormBuilderPagination;
	},
	'',
	{
		requires: ['liferay-ddm-form-renderer-pagination']
	}
);