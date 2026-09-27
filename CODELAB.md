# Orchestrating Parallel Agents with Antigravity 2.0 and Gemini 3.7 Flash

Summary: In this codelab, you'll learn how to move beyond basic code completion by building an autonomous multi-agent pipeline using Antigravity 2.0 and Gemini 3.7 Flash to handle parallel workflows, background task scheduling, and secure local integrations.
URL: antigravity-parallel-agents-gemini-3-7-flash
Keywords: docType:Codelab, devfest, pretoria, gemini, antigravity, multi-agent, ai, automation
Category: Web & AI
Environment: web
Status: Draft
Feedback Link: https://github.com/googlecodelabs/feedback/issues/new?title=antigravity-parallel-agents-gemini-3-7-flash
Author: DevFest Pretoria 2026 Team, Gabriel Agbobli, Remigiusz Samborski
Analytics Account: UA-52746336-1

---

## 1. Introduction & Overview
Duration: 05:00

Welcome to this hands-on lab for **DevFest Pretoria 2026**!

Modern software development is moving rapidly beyond AI-assisted coding toward **AI-orchestrated workflows**. Antigravity 2.0 introduces Projects, native Git Worktree support, Scheduled Tasks, JSON Hooks, and enhanced security sandboxing that enable developers to manage complex development pipelines with multiple agents working concurrently in parallel.

In this codelab, you will create a project, configure an autonomous workflow using **Gemini 3.7 Flash**, schedule recurring tasks, and explore how Antigravity 2.0 can automate routine engineering activities.

### Key Concept
> 💡 **Scoped Permissions in Antigravity 2.0:**
> Scoped permissions ensure that agents can only interact with authorized project folders and approved shell commands, protecting your system while enabling powerful autonomous development pipelines.

### What you’ll learn
- How to create and configure a **Project** in Antigravity 2.0
- How to use **Gemini 3.7 Flash** to design and coordinate multi-agent tasks
- How to leverage **Git Worktrees** for isolated parallel agent execution
- How to configure **Scheduled Tasks** (cron daemons) for recurring automation
- How to create **JSON Hooks** to customize agent runtime lifecycle events
- How to use built-in **Voice Interaction** for prompt transcription
- How security presets and scoped sandboxes protect your environment

### What you’ll need
- A computer with Windows, macOS, or Linux
- Google Chrome or any modern web browser
- Installed **Antigravity 2.0** IDE / CLI environment
- Access to Gemini 3.7 Flash model in Antigravity

---

## 2. Create a New Project
Duration: 10:00

**Projects** are the foundational structure of Antigravity 2.0. Unlike legacy setups where agents were locked into a single flat workspace, Projects allow agents to orchestrate tasks across multiple folders and repositories while maintaining isolated configuration profiles and access permissions.

### Instructions

1. Launch the **Antigravity 2.0** application.
2. In the top navigation menu, click **File** > **Create Project**.
3. Set the project name precisely:

```text
DataOps-Automation
```

4. Choose or create a local directory folder on your machine to serve as your project root workspace.
5. Keep the default security configuration preset selected.
6. Click **Create Project**.

### Verify Your Setup
> ✅ **Success:** You should now see `DataOps-Automation` displayed prominently in the project navigation sidebar.

### Checklist
- [ ] Launch Antigravity 2.0
- [ ] Configure project name as `DataOps-Automation` and select directory path
- [ ] Confirm the workspace appears active in the sidebar navigation

---

## 3. Explore Project Configuration & Security
Duration: 05:00

Antigravity 2.0 allows each project to have fine-grained sandbox permissions, command execution rules, and security controls.

### Instructions

1. Open project settings by clicking the **Gear (⚙️) icon** next to your project title.
2. Locate the **Security Settings** section.
3. Review the available security presets:
   - **Default:** Requires manual confirmation for terminal commands and restricts file access strictly to project workspace directories. *(Recommended)*
   - **Full Machine:** Prompts for terminal command confirmation while allowing the agent to read/write files across any directory on the host machine.
   - **Turbo Mode:** Disables confirmation prompts for maximum iteration speed in trusted sandboxes.
   - **Custom:** Enables granular, per-tool permission control.
4. Keep the project configured with the **Default** preset.

### Security Discussion
> 🔒 **Why Default Sandboxing Matters:**
> Restricting agent file access to designated project folders protects your host operating system and sensitive credentials while granting the agent full autonomy within its workspace boundaries.

### Checklist
- [ ] Open the project security configuration panel
- [ ] Review each sandbox capability preset
- [ ] Confirm the **Default** sandbox preset is saved and active

---

## 4. Create an Autonomous Workflow
Duration: 10:00

In this step, you will instruct **Gemini 3.7 Flash** to act as a system coordinator and architect a multi-step data processing pipeline.

### Instructions

1. Open the agent conversation panel in Antigravity.
2. Enter and run the following prompt:

```text
You are a Data Operations Coordinator.

Design a workflow that:
1. Receives transaction data files.
2. Cleans and validates the records.
3. Detects unusual transactions.
4. Generates a summary report.

Break the workflow into specialized tasks that can be executed independently.
```

### Expected Outcome
Gemini 3.7 Flash will analyze the requirements and output a modular task hierarchy:
- **Data Validation:** Schema structure verification and type validation.
- **Data Cleaning:** Null value resolution, duplicate handling, and format parsing.
- **Anomaly Detection:** Statistical outlier detection and flag alerting.
- **Report Generation:** Metric summaries, aggregation files, and visual outputs.

These modular tasks serve as the blueprint for independent parallel agent execution.

### Checklist
- [ ] Run the Data Operations Coordinator prompt with Gemini 3.7 Flash
- [ ] Verify the agent produces a structured, decoupled task hierarchy

---

## 5. Enable Parallel Execution with Git Worktrees
Duration: 10:00

A core capability of Antigravity 2.0 is native **Git Worktree** support. Instead of multiple agents competing or creating merge conflicts in a single working directory, Git Worktrees allow multiple agents to develop and test features concurrently in isolated branches and folder checkouts.

### Instructions

1. In the agent conversation panel, submit the following prompt:

```text
Create separate implementation plans for:

1. Data validation
2. Data cleaning
3. Anomaly detection
4. Reporting

Assume each task can be developed independently.
```

2. Observe how the agent breaks down the tasks into isolated implementation tracks suitable for worktrees.

### Parallel Execution Concept
> ⚡ **Efficiency Boost:**
> Running agents in parallel worktrees eliminates blocking dependencies. Agent A can test schema validation while Agent B implements outlier algorithms without dirtying the working directory.

### Checklist
- [ ] Run the prompt requesting separate implementation plans
- [ ] Review how Git Worktrees isolate branches across parallel tasks

---

## 6. Create a Scheduled Task
Duration: 10:00

**Scheduled Tasks** allow Antigravity to run agent instructions automatically on a recurring schedule in the background, even when you are not actively interacting with the interface.

### Instructions

1. Open the **Scheduled Tasks** dashboard from the tools panel.
2. Click **Create New Task**.
3. Set the cron interval expression:

```cron
*/15 * * * *
```

4. Set the task instruction prompt:

```text
Review the project workspace and generate a status summary of completed, pending, and blocked tasks.
```

5. Click **Save Task**.

### Verification
> ✅ **Success:** Your project now has a daemon task that wakes up every 15 minutes to inspect project progress and log an updated status report.

### Checklist
- [ ] Open the Scheduled Tasks dashboard
- [ ] Create and save a task scheduled for `*/15 * * * *` with the summary prompt

---

## 7. Create a JSON Lifecycle Hook
Duration: 10:00

**JSON Hooks** enable automated execution of custom scripts at specific lifecycle triggers (such as before or after a model generates a response).

### Instructions

1. In your project workspace root, create a file named `audit-hook.json`.
2. Add the following hook definition:

```json
{
  "name": "project_audit",
  "event": "after_model_response",
  "script": "./scripts/audit.sh"
}
```

3. Save the file.

### Lifecycle Hook Discussion
> ⚙️ **Practical Uses for Lifecycle Hooks:**
> - Logging prompt metrics and audit trails
> - Automated code formatting / linting after agent code generation
> - Sending webhooks to Slack, Discord, or CI/CD pipelines
> - Running automated compliance checks

### Checklist
- [ ] Create the `audit-hook.json` file in the project workspace
- [ ] Save the configuration with the `after_model_response` event trigger

---

## 8. Test Voice Interaction
Duration: 05:00

Antigravity 2.0 includes built-in real-time speech transcription to accelerate prompt drafting and hands-free interaction.

### Instructions

1. Click the **Microphone (🎤)** icon next to the chat prompt input.
2. Speak the following phrase clearly:

```text
Review the current workflow and suggest two improvements.
```

3. Click the stop button or wait for auto-pause to complete recording.
4. Verify that the speech is converted into clean prompt text and submitted to Gemini 3.7 Flash.

### Voice Engine Feature
> 🎤 **Noise Filtering:**
> Antigravity's transcription engine removes filler words, filters ambient background noise, and structures natural voice commands into optimized prompts for the model.

### Checklist
- [ ] Activate voice recording via the microphone icon
- [ ] Dictate the improvement prompt and verify transcript accuracy

---

## 9. Congratulations & Next Steps
Duration: 05:00

### 🏆 Codelab Complete!
Congratulations! You have successfully configured and executed autonomous multi-agent workflows using **Antigravity 2.0** and **Gemini 3.7 Flash** at **DevFest Pretoria 2026**.

### What you accomplished:
1. Created a dedicated **Project** workspace in Antigravity 2.0.
2. Configured security and sandboxing using the **Default** security preset.
3. Designed an end-to-end data pipeline using **Gemini 3.7 Flash**.
4. Explored parallel development isolation with **Git Worktrees**.
5. Configured a recurring cron daemon via **Scheduled Tasks**.
6. Implemented a custom lifecycle trigger using **JSON Hooks**.
7. Tested built-in **Voice Transcription** for hands-free prompt delivery.

### Next Steps to Explore:
- **Multi-Repo Workspaces:** Connect multiple Git repositories into a unified Project.
- **MCP Server Integrations:** Connect custom database connectors and debuggers via Model Context Protocol (MCP).
- **Automated Web Verification:** Leverage subagent browser automation for end-to-end web testing.
- **Custom Webhooks:** Extend your JSON Hooks to dispatch alerts to team chat channels upon task completion.

### References & Documentation
- [Google AI for Developers](https://ai.google.dev)
- [Gemini 3.7 Flash Documentation](https://ai.google.dev/gemini-api/docs/models/gemini)
- [DevFest Pretoria 2026 Interactive Portal](https://devfest-pretoria-2026.web.app)
- [Google Codelabs Repository & Feedback](https://github.com/googlecodelabs/feedback/issues/new?title=antigravity-parallel-agents-gemini-3-7-flash)
