<%--
/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */
--%>

<%@ include file="/init.jsp" %>

<div class="article-toolbar toolbar" id="<portlet:namespace />articleToolbar">
	<div class="btn-group">
		<aui:button data-title='<%= LanguageUtil.get(request, "in-order-to-preview-your-changes,-the-web-content-is-saved-as-a-draft") %>' disabled="<%= true %>" icon="icon-search" name="basicPreviewButton" value="basic-preview" />

		<c:if test="<%= JournalArticlePermission.contains(permissionChecker, journalDisplayContext.getArticle(), ActionKeys.PERMISSIONS) %>">
			<aui:button disabled="<%= true %>" icon="icon-lock" name="articlePermissionsButton" value="permissions" />
		</c:if>
	</div>

	<aui:script require="journal-web/js/tooltip.es">
		new journalWebJsTooltipEs(
			{
				content: 'My cool tooltip',
				delay: [300, 150],
				elementClasses: 'fade',
				selector: '#<portlet:namespace />basicPreviewButton',
				visible: false
			}
		).render();
	</aui:script>
</div>