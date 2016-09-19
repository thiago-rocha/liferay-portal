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

import com.liferay.dynamic.data.mapping.expression.DDMExpression;
import com.liferay.dynamic.data.mapping.expression.DDMExpressionException;
import com.liferay.dynamic.data.mapping.expression.DDMExpressionFactory;
import com.liferay.dynamic.data.mapping.expression.model.AndExpression;
import com.liferay.dynamic.data.mapping.expression.model.ArithmeticExpression;
import com.liferay.dynamic.data.mapping.expression.model.ComparisonExpression;
import com.liferay.dynamic.data.mapping.expression.model.Expression;
import com.liferay.dynamic.data.mapping.expression.model.ExpressionVisitor;
import com.liferay.dynamic.data.mapping.expression.model.FunctionCallExpression;
import com.liferay.dynamic.data.mapping.expression.model.MinusExpression;
import com.liferay.dynamic.data.mapping.expression.model.NotExpression;
import com.liferay.dynamic.data.mapping.expression.model.OrExpression;
import com.liferay.dynamic.data.mapping.expression.model.Term;
import com.liferay.dynamic.data.mapping.model.DDMFormRule;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Stack;

/**
 * @author Marcellus Tavares
 */
public class DDMFormRuleToDDLFormRuleConverter {

	public DDMFormRuleToDDLFormRuleConverter(
		DDMFormRule ddmFormRule, DDMExpressionFactory ddmExpressionFactory) {

		_ddmFormRule = ddmFormRule;
		_ddmExpressionFactory = ddmExpressionFactory;
	}


	public DDLFormRule convert() {
		String condition = _ddmFormRule.getCondition();

		if (Objects.equals(condition, "TRUE")) {
			_booleanRule = true;
		}

		String action = _ddmFormRule.getActions().get(0);

		try {
			DDMExpression<?> ddmExpression = _ddmExpressionFactory.createBooleanDDMExpression(action);

			ExpressionVisitorImpl expressionVisitor = new ExpressionVisitorImpl();

			ddmExpression.getModel().accept(expressionVisitor);

			return expressionVisitor.getDdlFormRule();
		}
		catch (DDMExpressionException e) {
			e.printStackTrace();
		}


		return null;
	}


	private boolean _booleanRule;

	private DDMFormRule _ddmFormRule;
	private DDMExpressionFactory _ddmExpressionFactory;


	private class ExpressionVisitorImpl implements ExpressionVisitor<Object> {

		@Override
		public Object visitAndExpression(AndExpression andExpression) {
			_ddlFormRule.setLogicalOperator("and");

			Object o1  = andExpression.getLeftOperand().accept(this);
			Object o2  = andExpression.getRightOperand().accept(this);

			if (o1 instanceof DDLFormRuleCondition) {
				_conditionStack.push((DDLFormRuleCondition)o1);
			}

			if (o2 instanceof DDLFormRuleCondition) {
				_conditionStack.push((DDLFormRuleCondition)o2);
			}

			return null;
		}

		@Override
		public Object visitArithmeticExpression(
			ArithmeticExpression arithmeticExpression) {

			return null;
		}

		@Override
		public Object visitComparisonExpression(
			ComparisonExpression comparisonExpression) {

			DDLFormRuleCondition.Operand left = (DDLFormRuleCondition.Operand)comparisonExpression.getLeftOperand().accept(this);
			DDLFormRuleCondition.Operand right = (DDLFormRuleCondition.Operand)comparisonExpression.getRightOperand().accept(this);

			return new DDLFormRuleCondition(_operatorsMap.get(comparisonExpression.getOperator()),
				Arrays.asList(left, right));
		}

		@Override
		public Object visitFunctionCallExpression(
			FunctionCallExpression functionCallExpression) {

			String functionName = functionCallExpression.getFunctionName();
			List<Expression> parameters = functionCallExpression.getParameters();

			if (Objects.equals(functionName, "getValue")) {
				DDLFormRuleCondition.Operand fieldOperand = (DDLFormRuleCondition.Operand) parameters.get(0).accept(this);

				return new DDLFormRuleCondition.Operand("field", fieldOperand.getValue());
			}

			String action = _functionToActionsMap.get(functionName);

			if (action == null) {
				List<DDLFormRuleCondition.Operand> operands = new ArrayList<>();

				for (Expression parameter : parameters) {
					operands.add((DDLFormRuleCondition.Operand)parameter.accept(this));
				}

				return new DDLFormRuleCondition(functionName, operands);
			}

			DDLFormRuleCondition.Operand fieldOperand = (DDLFormRuleCondition.Operand) parameters.get(0).accept(this);

			DDLFormRuleCondition condition =
				(DDLFormRuleCondition) parameters.get(1).accept(this);

			_ddlFormRule.addDDLFormRuleAction(new DDLFormRuleAction(action, fieldOperand.getValue()));

			if (condition == null) {
				_ddlFormRule.setDdlFormRuleConditions(new ArrayList<DDLFormRuleCondition>(_conditionStack));
			}
			else {
				_ddlFormRule.addDDLFormRuleConditions(condition);
			}

			return null;

		}

		@Override
		public Object visitMinusExpression(MinusExpression minusExpression) {
			return null;
		}

		@Override
		public Object visitNotExpression(NotExpression notExpression) {
			return null;
		}

		@Override
		public Object visitOrExpression(OrExpression orExpression) {
			_ddlFormRule.setLogicalOperator("or");

			Object o1  = orExpression.getLeftOperand().accept(this);
			Object o2  = orExpression.getRightOperand().accept(this);

			if (o1 instanceof DDLFormRuleCondition) {
				_conditionStack.push((DDLFormRuleCondition)o1);
			}

			if (o2 instanceof DDLFormRuleCondition) {
				_conditionStack.push((DDLFormRuleCondition)o2);
			}





			return null;
		}

		@Override
		public Object visitTerm(Term term) {
			return new DDLFormRuleCondition.Operand(
				"constant", term.getValue());
		}

		public DDLFormRule getDdlFormRule() {
			return _ddlFormRule;
		}

		private Stack<DDLFormRuleCondition> _conditionStack = new Stack<>();
		private DDLFormRule _ddlFormRule = new DDLFormRule();

		private Map<String, String> _functionToActionsMap = new HashMap<>();

		{
			_functionToActionsMap.put("setVisible", "show");
		}

		private Map<String, String> _operatorsMap = new HashMap<>();

		{
			_operatorsMap.put(">", "greater-than");
			_operatorsMap.put("<", "less-than");
		}
	}

}
