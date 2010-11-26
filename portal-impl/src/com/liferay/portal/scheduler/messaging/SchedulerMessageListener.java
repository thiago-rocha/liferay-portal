/**
 * Copyright (c) 2000-2010 Liferay, Inc. All rights reserved.
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

package com.liferay.portal.scheduler.messaging;

import com.liferay.portal.kernel.messaging.BaseMessageListener;
import com.liferay.portal.kernel.messaging.Message;
import com.liferay.portal.kernel.messaging.MessageBusUtil;
import com.liferay.portal.kernel.messaging.sender.MessageSender;
import com.liferay.portal.kernel.scheduler.SchedulerEngine;
import com.liferay.portal.kernel.scheduler.messaging.SchedulerRequest;

/**
 * @author Michael C. Han
 * @author Bruno Farache
 * @author Shuyang Zhou
 * @author Tina Tian
 */
public class SchedulerMessageListener extends BaseMessageListener {

	public void setMessageSender(MessageSender messageSender) {
		_messageSender = messageSender;
	}

	public void setSchedulerEngine(SchedulerEngine schedulerEngine) {
		_schedulerEngine = schedulerEngine;
	}

	protected void doCommandDelete(String jobName, String groupName)
		throws Exception {

		if (groupName == null) {
			return;
		}

		if (jobName == null) {
			_schedulerEngine.delete(groupName);
		}
		else {
			_schedulerEngine.delete(jobName, groupName);
		}
	}

	protected void doCommandPause(String jobName, String groupName)
		throws Exception {

		if (groupName == null) {
			return;
		}
		else if (jobName == null) {
			_schedulerEngine.pause(groupName);
		}
		else {
			_schedulerEngine.pause(jobName, groupName);
		}
	}

	protected void doCommandResume(String jobName, String groupName)
		throws Exception {

		if (groupName == null) {
			return;
		}
		else if (jobName == null) {
			_schedulerEngine.resume(groupName);
		}
		else {
			_schedulerEngine.resume(jobName, groupName);
		}
	}

	protected void doCommandRetrieve(
			Message message, String jobName, String groupName)
		throws Exception {

		Object schedulerResponse = null;

		if (groupName == null) {
			schedulerResponse = _schedulerEngine.getScheduledJobs();
		}
		else if (jobName == null) {
			schedulerResponse = _schedulerEngine.getScheduledJobs(
				groupName);
		}
		else {
			schedulerResponse = _schedulerEngine.getScheduledJob(
				jobName, groupName);

			if (schedulerResponse == null) {
				schedulerResponse =
					SchedulerRequest.createRetrieveResponseRequest();
			}
		}

		Message responseMessage = MessageBusUtil.createResponseMessage(
			message, schedulerResponse);

		_messageSender.send(
			responseMessage.getDestinationName(), responseMessage);
	}

	protected void doCommandUnregister(String jobName, String groupName)
		throws Exception {

		if (groupName == null) {
			return;
		}

		if (jobName == null) {
			_schedulerEngine.unschedule(groupName);
		}
		else {
			_schedulerEngine.unschedule(jobName, groupName);
		}
	}

	protected void doReceive(Message message) throws Exception {
		SchedulerRequest schedulerRequest =
			(SchedulerRequest)message.getPayload();

		String command = schedulerRequest.getCommand();
		String jobName = schedulerRequest.getJobName();
		String groupName = schedulerRequest.getGroupName();

		if (jobName != null && 
			jobName.length() > SchedulerEngine.JOB_NAME_MAX_LENGTH) {

			jobName = jobName.substring(0, SchedulerEngine.JOB_NAME_MAX_LENGTH);
		}

		if (groupName != null &&
			groupName.length() > SchedulerEngine.GROUP_NAME_MAX_LENGTH) {
			
			groupName = groupName.substring(
				0, SchedulerEngine.GROUP_NAME_MAX_LENGTH);
		}

		if (command.equals(SchedulerRequest.COMMAND_DELETE)) {
			doCommandDelete(jobName, groupName);
		}
		else if (command.equals(SchedulerRequest.COMMAND_PAUSE)) {
			doCommandPause(jobName, groupName);
		}
		else if (command.equals(SchedulerRequest.COMMAND_REGISTER)) {
			_schedulerEngine.schedule(
				schedulerRequest.getTrigger(),
				schedulerRequest.getDescription(),
				schedulerRequest.getDestinationName(),
				schedulerRequest.getMessage());
		}
		else if (command.equals(SchedulerRequest.COMMAND_RESUME)) {
			doCommandResume(jobName, groupName);
		}
		else if (command.equals(SchedulerRequest.COMMAND_RETRIEVE)) {
			doCommandRetrieve(message, jobName, groupName);
		}
		else if (command.equals(SchedulerRequest.COMMAND_SHUTDOWN)) {
			_schedulerEngine.shutdown();
		}
		else if (command.equals(SchedulerRequest.COMMAND_STARTUP)) {
			_schedulerEngine.start();
		}
		else if (command.equals(SchedulerRequest.COMMAND_SUPPRESS_ERROR)) {
			_schedulerEngine.suppressError(jobName, groupName);
		}
		else if (command.equals(SchedulerRequest.COMMAND_UNREGISTER)) {
			doCommandUnregister(jobName, groupName);
		}
		else if (command.equals(SchedulerRequest.COMMAND_UPDATE)) {
			_schedulerEngine.update(schedulerRequest.getTrigger());
		}
	}

	private MessageSender _messageSender;
	private SchedulerEngine _schedulerEngine;

}