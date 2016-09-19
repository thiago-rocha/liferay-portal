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
import com.liferay.portal.kernel.util.StringBundler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Stack;

/**
 * @author Marcellus Tavares
 */
public class DDLFormRuleToDDMFormRuleRuleConverter {

	public DDLFormRuleToDDMFormRuleRuleConverter(DDLFormRule ddlFormRule) {
		_ddlFormRule = ddlFormRule;
	}

	public List<DDMFormRule> convert() {
		List<DDMFormRule> ddmFormRules = new ArrayList<>();

		String convertedCondition = convertCondition();


		List<DDLFormRuleAction> actions = _ddlFormRule.getDDLFormRuleActions();

		for (DDLFormRuleAction ddlFormRuleAction : actions) {
			if (_actionsToFunctionMap.containsKey(ddlFormRuleAction.getAction())) {
				_booleanActionsStack.push(convertBooleanAction(ddlFormRuleAction.getAction(), ddlFormRuleAction.getTarget(), convertedCondition));
			}
		}

		ddmFormRules.add(new DDMFormRule("TRUE", _booleanActionsStack));

//		for (DDLFormRuleAction ddlFormRuleAction : actions) {
//			if (!_actionsToFunctionMap.containsKey(ddlFormRuleAction.getAction())) {
//				ddmFormRules.add(new DDMFormRule(convertedCondition, convertBooleanAction());
//			}
//		}


		return ddmFormRules;
	}

	protected String convertBooleanAction(String action, String target, String condition) {
		String functionName = _actionsToFunctionMap.get(action);

		if (functionName != null) {
			return String.format(
				"%s('%s', %s)", functionName, target, condition);
		}

		return null;
	}

	protected String convertCondition() {
		StringBundler sb = new StringBundler();

		for (DDLFormRuleCondition ddlFormRuleCondition :
				_ddlFormRule.getDdlFormRuleConditions()) {

			List<DDLFormRuleCondition.Operand> operands =
				ddlFormRuleCondition.getOperands();

			if (operands.size() == 1) {
				sb.append(ddlFormRuleCondition.getOperator());
				sb.append("(");
				sb.append(convertOperand(operands.get(0)));
				sb.append(")");
			}


			sb.append(convertOperand(operands.get(0)));
			sb.append(" ");
			sb.append(_operatorsMap.get(ddlFormRuleCondition.getOperator()));
			sb.append(" ");
			sb.append(convertOperand(operands.get(1)));

		}


		return sb.toString();
	}

	protected String convertOperand(DDLFormRuleCondition.Operand operand) {
		if (Objects.equals("constant", operand.getType())) {
			return operand.getValue();
		}

		return "getValue('"+ operand.getValue() + "')";

	}

	private Stack<String> _booleanActionsStack = new Stack<>();

	private Map<String, String> _actionsToFunctionMap = new HashMap<>();

	{
		_actionsToFunctionMap.put("show", "setVisible");
	}

	private Map<String, String> _operatorsMap = new HashMap<>();

		{
			_operatorsMap.put("greater-than", ">");
			_operatorsMap.put("less-than", "<");
		}

	private List<DDMFormRule> _ddmFormRules = new ArrayList<>();

	private DDLFormRule _ddlFormRule;

}
