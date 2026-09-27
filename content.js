// Codelab Content Configuration for DevFest Pretoria 2026
window.CODELAB_DATA = {
  title: "Orchestrating Parallel Agents with Antigravity 2.0 and Gemini 3.7 Flash",
  author: "DevFest Pretoria 2026 Team",
  category: "Agent Orchestration",
  steps: [
    {
      id: 1,
      title: "Introduction & Overview",
      duration: 5,
      contentHtml: `
        <p>Welcome to this hands-on lab for <strong>DevFest Pretoria 2026</strong>! In this codelab, you will learn how to use Antigravity 2.0 to coordinate multiple AI agents, automate recurring tasks, and build autonomous workflows using Gemini 3.7 Flash.</p>
        
        <h2>Overview</h2>
        <p>Modern software development is moving beyond AI-assisted coding toward AI-orchestrated workflows. Antigravity 2.0 introduces Projects, Git Worktree support, Scheduled Tasks, JSON Hooks, and enhanced security controls that enable developers to manage complex workflows with multiple agents working in parallel.</p>
        <p>In this lab, you will create a project, configure an autonomous workflow, schedule recurring tasks, and explore how Antigravity 2.0 can automate routine engineering activities.</p>

        <div class="alert alert-info">
          <span class="alert-icon">💡</span>
          <div class="alert-content">
            <strong>Key Concept:</strong> Scoped permissions in Antigravity 2.0 ensure that agents can only interact with authorized directories, keeping your system safe while letting them automate development pipelines.
          </div>
        </div>

        <h2>What You Will Learn</h2>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="1-learn-project">
          <span class="checklist-text">Create and configure a Project in Antigravity 2.0</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="1-learn-gemini">
          <span class="checklist-text">Use Gemini 3.7 Flash to coordinate multiple tasks</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="1-learn-worktree">
          <span class="checklist-text">Leverage Git Worktrees for isolated agent execution</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="1-learn-tasks">
          <span class="checklist-text">Configure Scheduled Tasks for automation</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="1-learn-hooks">
          <span class="checklist-text">Create a JSON Hook to customize agent behavior</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="1-learn-security">
          <span class="checklist-text">Understand scoped permissions and security settings</span>
        </label>
      `
    },
    {
      id: 2,
      title: "Create a New Project",
      duration: 10,
      contentHtml: `
        <p>Projects are the foundation of Antigravity 2.0. Unlike previous versions where agents were tied to a single workspace, Projects allow agents to work across multiple folders while maintaining isolated settings and permissions.</p>
        
        <h2>Instructions</h2>
        <ol style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
          <li>Open the Antigravity 2.0 interface.</li>
          <li>Click on <strong>File</strong> and then <strong>Create Project</strong>.</li>
          <li>Name the project folder precisely:</li>
        </ol>

        <pre><div class="code-header"><span class="code-lang">Project Name</span><button class="btn-copy" onclick="copyCode(this)">Copy</button></div><code>DataOps-Automation</code></pre>

        <ol start="4" style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
          <li>Select a local directory folder to act as your project workspace.</li>
          <li>Keep the default security settings preset selected.</li>
          <li>Click <strong>Create Project</strong>.</li>
        </ol>

        <div class="alert alert-success">
          <span class="alert-icon">✅</span>
          <div class="alert-content">
            <strong>Verify:</strong> You should now see your newly created project <code>DataOps-Automation</code> listed in the sidebar navigation panel.
          </div>
        </div>

        <h2>Checklist</h2>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="2-open-app">
          <span class="checklist-text">Open Antigravity 2.0 app</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="2-create-proj">
          <span class="checklist-text">Configure workspace name and path</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="2-verify-sidebar">
          <span class="checklist-text">Verify workspace appears in sidebar</span>
        </label>
      `
    },
    {
      id: 3,
      title: "Explore Project Configuration",
      duration: 5,
      contentHtml: `
        <p>Antigravity 2.0 allows each project to have its own settings, permissions, and security controls.</p>
        
        <h2>Instructions</h2>
        <ol style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
          <li>Open the project settings by clicking the gear icon next to your project title.</li>
          <li>Locate the <strong>Security Settings</strong> section.</li>
          <li>Review the available presets:
        <ul>
          <li><strong>Default:</strong> Requires manual review for all terminal commands and file accesses outside of the working folders.</li>
          <li><strong>Full Machine:</strong> All terminal commands require review. The agent can read or write to any file in the machine.</li>
          <li><strong>Turbo Mode:</strong> Disables all safety barriers for maximal iteration velocity.</li>
          <li><strong>Custom:</strong> Manually customize individual settings.</li>
        </ul>
          </li>
          <li>Leave the project configured with the <strong>Default</strong> preset selected.</li>
        </ol>

        <div class="alert alert-info">
          <span class="alert-icon">🔒</span>
          <div class="alert-content">
            <strong>Discussion:</strong> The Default preset restricts agent access to only the folders assigned to the project, helping protect the rest of your machine while still enabling productive automation.
          </div>
        </div>

        <h2>Checklist</h2>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="3-open-settings">
          <span class="checklist-text">Open project security settings panel</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="3-review-presets">
          <span class="checklist-text">Review sandbox capability presets</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="3-save-default">
          <span class="checklist-text">Verify default sandbox preset is saved</span>
        </label>
      `
    },
    {
      id: 4,
      title: "Create an Autonomous Workflow",
      duration: 10,
      contentHtml: `
        <p>We will use Gemini 3.7 Flash to design a simple data-processing workflow.</p>
        
        <h2>Prompt</h2>
        <p>Enter the following prompt into the agent dialogue input box:</p>

        <pre><div class="code-header"><span class="code-lang">Prompt</span><button class="btn-copy" onclick="copyCode(this)">Copy</button></div><code>You are a Data Operations Coordinator.

Design a workflow that:

1. Receives transaction data files.
2. Cleans and validates the records.
3. Detects unusual transactions.
4. Generates a summary report.

Break the workflow into specialized tasks that can be executed independently.</code></pre>

        <h2>Expected Outcome</h2>
        <p>Gemini should propose a structured workflow layout containing separate responsibilities such as:</p>
        <ul>
          <li><strong>Data Validation</strong>: Schema checks and type verifications.</li>
          <li><strong>Data Cleaning</strong>: Null formatting and parsing corrections.</li>
          <li><strong>Anomaly Detection</strong>: Outlier detection and notification hooks.</li>
          <li><strong>Report Generation</strong>: Visual summaries and files creation.</li>
        </ul>
        <p>These independent responsibilities form the logical basis of a multi-agent parallel workflow.</p>

        <h2>Checklist</h2>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="4-run-prompt">
          <span class="checklist-text">Copy and run the Data Operations prompt</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="4-verify-design">
          <span class="checklist-text">Verify Gemini outputs a clean task hierarchy</span>
        </label>
      `
    },
    {
      id: 5,
      title: "Enable Parallel Execution with Worktrees",
      duration: 10,
      contentHtml: `
        <p>One of the major improvements in Antigravity 2.0 is native <strong>Git Worktree</strong> support.</p>
        <p>Git Worktrees allow agents to operate in isolated working directories without interfering with each other's branch structures.</p>
        
        <h2>Instructions</h2>
        <p>Ask the Antigravity agent in your chat panel:</p>

        <pre><div class="code-header"><span class="code-lang">Prompt</span><button class="btn-copy" onclick="copyCode(this)">Copy</button></div><code>Create separate implementation plans for:

1. Data validation
2. Data cleaning
3. Anomaly detection
4. Reporting

Assume each task can be developed independently.</code></pre>

        <div class="alert alert-info">
          <span class="alert-icon">⚡</span>
          <div class="alert-content">
            <strong>Discussion:</strong> Instead of a single agent handling every task sequentially, worktrees allow multiple agents to work in isolated environments simultaneously. This approach improves productivity while reducing conflicts between parallel tasks.
          </div>
        </div>

        <h2>Checklist</h2>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="5-run-plan-prompt">
          <span class="checklist-text">Run prompt requesting separate implementation plans</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="5-observe-worktrees">
          <span class="checklist-text">Confirm understanding of how worktrees isolate workspace folders</span>
        </label>
      `
    },
    {
      id: 6,
      title: "Create a Scheduled Task",
      duration: 10,
      contentHtml: `
        <p>Scheduled Tasks allow Antigravity to send instruction prompts to agents automatically, even when you are away from the keyboard.</p>
        
        <h2>Instructions</h2>
        <ol style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
          <li>Open the <strong>Scheduled Tasks</strong> dashboard utility.</li>
          <li>Click <strong>Create New Task</strong>.</li>
          <li>Configure the following cron interval schedule:</li>
        </ol>

        <pre><div class="code-header"><span class="code-lang">Interval</span><button class="btn-copy" onclick="copyCode(this)">Copy</button></div><code>*/15 * * * *</code></pre>

        <ol start="4" style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
          <li>Use the following prompt content to instruct the agent daemon:</li>
        </ol>

        <pre><div class="code-header"><span class="code-lang">Task Prompt</span><button class="btn-copy" onclick="copyCode(this)">Copy</button></div><code>Review the project workspace and generate a status summary of completed, pending, and blocked tasks.</code></pre>

        <ol start="5" style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
          <li>Save the task configuration.</li>
        </ol>

        <div class="alert alert-success">
          <span class="alert-icon">✅</span>
          <div class="alert-content">
            <strong>Verify:</strong> Your project should now contain a recurring cron task that automatically checks project files progress periodically.
          </div>
        </div>

        <h2>Checklist</h2>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="6-open-tasks">
          <span class="checklist-text">Open Scheduled Tasks UI dashboard</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="6-save-cron">
          <span class="checklist-text">Create and save task set to 15 minutes interval</span>
        </label>
      `
    },
    {
      id: 7,
      title: "Create a JSON Hook",
      duration: 10,
      contentHtml: `
        <p>JSON Hooks allow custom local scripts to execute during specific stages of the agent runtime lifecycle.</p>
        
        <h2>Instructions</h2>
        <p>Create a hook configuration file named <code>audit-hook.json</code> in your project repository:</p>

        <pre><div class="code-header"><span class="code-lang">json</span><button class="btn-copy" onclick="copyCode(this)">Copy</button></div><code>{
  "name": "project_audit",
  "event": "after_model_response",
  "script": "./scripts/audit.sh"
}</code></pre>

        <div class="alert alert-info">
          <span class="alert-icon">⚙️</span>
          <div class="alert-content">
            <strong>Discussion:</strong> This hook executes after each model response. It is commonly used for logging activity, monitoring outputs, triggering local webhooks, or running compliance checks.
          </div>
        </div>

        <h2>Checklist</h2>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="7-create-file">
          <span class="checklist-text">Create <code>audit-hook.json</code> configuration file</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="7-save-code">
          <span class="checklist-text">Copy and save the configuration json</span>
        </label>
      `
    },
    {
      id: 8,
      title: "Test Voice Interaction",
      duration: 5,
      contentHtml: `
        <p>Antigravity 2.0 includes built-in voice transcription modules to speed up prompt delivery.</p>
        
        <h2>Instructions</h2>
        <ol style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
          <li>Click the <strong>microphone</strong> icon in the chat controls.</li>
          <li>Clearly speak the following sentence:</li>
        </ol>

        <pre><div class="code-header"><span class="code-lang">Voice Phrase</span><button class="btn-copy" onclick="copyCode(this)">Copy</button></div><code>Review the current workflow and suggest two improvements.</code></pre>

        <ol start="3" style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
          <li>Stop recording when finished speaking.</li>
        </ol>

        <div class="alert alert-info">
          <span class="alert-icon">🎤</span>
          <div class="alert-content">
            <strong>Observe:</strong> Antigravity automatically filters backgound noise, cleans up speech-to-text transcript output, and submits the optimized text directly to the model.
          </div>
        </div>

        <h2>Checklist</h2>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="8-click-mic">
          <span class="checklist-text">Click microphone button to initiate</span>
        </label>
        <label class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" data-checklist-id="8-speak-prompt">
          <span class="checklist-text">Record improvement prompt and submit</span>
        </label>
      `
    },
    {
      id: 9,
      title: "Review & Next Steps",
      duration: 5,
      contentHtml: `
        <div class="celebration-view">
          <div class="celebration-icon">🎉🚀</div>
          <h1 class="celebration-title">Codelab Completed!</h1>
          <p class="celebration-text">Congratulations! You have successfully configured and executed autonomous agent workflows using Antigravity 2.0 and Gemini 3.7 Flash at DevFest Pretoria 2026.</p>
          <button class="btn-share" onclick="shareCodelabCompletion()">Share on X (Twitter)</button>
        </div>

        <h2>Review Summary</h2>
        <p>In this lab, you successfully completed the following activities:</p>
        <ul>
          <li>Created a Project space in Antigravity 2.0</li>
          <li>Reviewed Sandboxing using the Security Preset defaults</li>
          <li>Designed a multi-agent workflow layout using Gemini 3.7 Flash</li>
          <li>Learned Git Worktrees parallel execution concepts</li>
          <li>Configured Scheduled daemon Tasks and JSON lifecycle Hooks</li>
          <li>Tested built-in Audio Voice prompt transcription</li>
        </ul>

        <h2>Next Steps to Explore</h2>
        <ul>
          <li>Connect multiple Git repositories to a single project space.</li>
          <li>Build custom JSON Hooks for triggering team Slack/Discord alerts.</li>
          <li>Test the terminal agent using the <code>/browser</code> command line tool.</li>
          <li>Integrate custom diagnostics utilities via MCP servers.</li>
        </ul>
      `
    }
  ]
};
