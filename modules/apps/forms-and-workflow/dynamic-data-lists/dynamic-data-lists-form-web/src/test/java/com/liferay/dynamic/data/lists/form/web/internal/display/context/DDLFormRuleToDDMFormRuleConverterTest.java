/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 * <p>
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 * <p>
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.dynamic.data.lists.form.web.internal.display.context;

import com.liferay.dynamic.data.mapping.model.DDMFormRule;
import com.liferay.portal.json.JSONFactoryImpl;
import com.liferay.portal.kernel.json.JSONFactory;
import com.liferay.portal.kernel.json.JSONSerializer;
import org.junit.Assert;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

/**
 * @author Marcellus Tavares
 */
public class DDLFormRuleToDDMFormRuleConverterTest {

	@Test
	public void testShowRuleWithNumericCondition() {
		DDMFormRule expectedDDMFormRule = new DDMFormRule(
			"TRUE",
			Arrays.asList("setVisible('Field2', getValue('Field1') > 2)"));

		DDLFormRule ddlFormRule = new DDLFormRule();

		ddlFormRule.addDDLFormRuleAction(
			new DDLFormRuleAction("show", "Field2"));
		ddlFormRule.addDDLFormRuleConditions(
			new DDLFormRuleCondition(
				"greater-than",
				Arrays.asList(
					new DDLFormRuleCondition.Operand("field", "Field1"),
					new DDLFormRuleCondition.Operand("constant", "2")
				)));

		JSONFactory jsonFactory = new JSONFactoryImpl();

		JSONSerializer jsonSerializer = jsonFactory.createJSONSerializer();

 		System.out.println(jsonSerializer.serializeDeep(Arrays.asList(ddlFormRule)));

		DDLFormRuleToDDMFormRuleRuleConverter ddlFormRuleToDDMFormRuleRuleConverter =
			new DDLFormRuleToDDMFormRuleRuleConverter(ddlFormRule);

		List<DDMFormRule> actualDDMFormRules  =
			ddlFormRuleToDDMFormRuleRuleConverter.convert();

		System.out.println(actualDDMFormRules.get(0).getActions().get(0));

		Assert.assertEquals(expectedDDMFormRule, actualDDMFormRules.get(0));

	}

}
