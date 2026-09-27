import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=140, bottom=140, left=200, right=200):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_borders(cell, color="CCCCCC", sz="4"):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = OxmlElement('w:tcBorders')
    for side in ['top', 'left', 'bottom', 'right']:
        edge = OxmlElement(f'w:{side}')
        edge.set(qn('w:val'), 'single')
        edge.set(qn('w:sz'), str(sz))
        edge.set(qn('w:space'), '0')
        edge.set(qn('w:color'), color)
        tcBorders.append(edge)
    tcPr.append(tcBorders)

def add_code_box(doc, code_str):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    cell = tbl.cell(0, 0)
    cell.width = Inches(6.5)
    set_cell_background(cell, "F1F5F9")
    set_cell_margins(cell, top=120, bottom=120, left=180, right=180)
    set_cell_borders(cell, color="CBD5E1", sz="6")
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(code_str)
    run.font.name = "Consolas"
    run.font.size = Pt(9.5)
    run.font.color.rgb = RGBColor(15, 23, 42)
    
    spacer = doc.add_paragraph()
    spacer.paragraph_format.space_after = Pt(4)

def add_callout(doc, title, text, style="positive"):
    # Google Codelab Info Boxes:
    # Positive = light green (Tip / Best Practice / Success)
    # Negative / Caution = light orange/yellow (Caution / Important)
    # Info = light blue (Note / Background)
    if style == "positive":
        bg = "E6F4EA" # Light green 3 (Google style)
        border = "34A853"
        icon = "Tip: "
    elif style == "negative":
        bg = "FEF7E0" # Light orange 3 (Google style)
        border = "FBBC04"
        icon = "Caution: "
    else:
        bg = "E8F0FE" # Light blue (Google style)
        border = "4285F4"
        icon = "Note: "
        
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    cell = tbl.cell(0, 0)
    cell.width = Inches(6.5)
    set_cell_background(cell, bg)
    set_cell_margins(cell, top=140, bottom=140, left=200, right=200)
    set_cell_borders(cell, color=border, sz="8")
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    
    r_head = p.add_run(icon + title + "\n")
    r_head.bold = True
    r_head.font.name = "Arial"
    r_head.font.size = Pt(10)
    r_head.font.color.rgb = RGBColor(32, 33, 36)
    
    r_body = p.add_run(text)
    r_body.font.name = "Arial"
    r_body.font.size = Pt(9.5)
    r_body.font.color.rgb = RGBColor(60, 64, 67)
    
    spacer = doc.add_paragraph()
    spacer.paragraph_format.space_after = Pt(4)

doc = docx.Document()

# 1-inch margins
for sec in doc.sections:
    sec.top_margin = Inches(1)
    sec.bottom_margin = Inches(1)
    sec.left_margin = Inches(1)
    sec.right_margin = Inches(1)

# Title (Google Codelab Title Style)
p_title = doc.add_paragraph()
r_title = p_title.add_run("Orchestrating Parallel Agents with Antigravity 2.0 and Gemini 3.7 Flash")
r_title.font.name = "Arial"
r_title.font.size = Pt(22)
r_title.bold = True
r_title.font.color.rgb = RGBColor(26, 115, 232)
p_title.paragraph_format.space_after = Pt(12)

# Metadata Table
meta_fields = [
    ("Summary", "In this codelab, you'll learn how to move beyond basic code completion by building an autonomous multi-agent pipeline using Antigravity 2.0 and Gemini 3.7 Flash to handle parallel workflows, background task scheduling, and secure local integrations."),
    ("URL", "antigravity-parallel-agents-gemini-3-7-flash"),
    ("Keywords", "docType:Codelab, devfest, pretoria, gemini, antigravity, multi-agent, ai, automation"),
    ("Category", "Web & AI"),
    ("Environment", "web"),
    ("Status", "Draft"),
    ("Feedback Link", "https://github.com/googlecodelabs/feedback/issues/new?title=antigravity-parallel-agents-gemini-3-7-flash"),
    ("Author", "Gabriel Agbobli, Remigiusz Samborski, DevFest Pretoria 2026 Team"),
    ("Analytics Account", "UA-52746336-1")
]

tbl_meta = doc.add_table(rows=len(meta_fields), cols=2)
tbl_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
tbl_meta.autofit = False

for i, (k, v) in enumerate(meta_fields):
    c0 = tbl_meta.cell(i, 0)
    c1 = tbl_meta.cell(i, 1)
    c0.width = Inches(1.8)
    c1.width = Inches(4.7)
    
    set_cell_background(c0, "F8F9FA")
    set_cell_background(c1, "FFFFFF")
    set_cell_margins(c0, 80, 80, 100, 100)
    set_cell_margins(c1, 80, 80, 100, 100)
    set_cell_borders(c0, color="DADCE0", sz="4")
    set_cell_borders(c1, color="DADCE0", sz="4")
    
    p0 = c0.paragraphs[0]
    p0.paragraph_format.space_before = Pt(1)
    p0.paragraph_format.space_after = Pt(1)
    r0 = p0.add_run(k)
    r0.font.name = "Arial"
    r0.font.size = Pt(9.5)
    r0.bold = True
    r0.font.color.rgb = RGBColor(95, 99, 104)
    
    p1 = c1.paragraphs[0]
    p1.paragraph_format.space_before = Pt(1)
    p1.paragraph_format.space_after = Pt(1)
    r1 = p1.add_run(v)
    r1.font.name = "Arial"
    r1.font.size = Pt(9.5)
    r1.font.color.rgb = RGBColor(32, 33, 36)

p_sep = doc.add_paragraph()
p_sep.paragraph_format.space_before = Pt(12)
p_sep.paragraph_format.space_after = Pt(12)

def add_h1(doc, title, duration=None):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(18)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(title)
    r.font.name = "Arial"
    r.font.size = Pt(16)
    r.bold = True
    r.font.color.rgb = RGBColor(32, 33, 36)
    
    if duration:
        p_dur = doc.add_paragraph()
        p_dur.paragraph_format.space_before = Pt(0)
        p_dur.paragraph_format.space_after = Pt(8)
        p_dur.paragraph_format.keep_with_next = True
        r_dur = p_dur.add_run(f"Duration {duration}")
        r_dur.font.name = "Arial"
        r_dur.font.size = Pt(10)
        r_dur.font.color.rgb = RGBColor(128, 134, 139)
        r_dur.bold = True

def add_h2(doc, title):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(title)
    r.font.name = "Arial"
    r.font.size = Pt(12.5)
    r.bold = True
    r.font.color.rgb = RGBColor(32, 33, 36)

def add_p(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.line_spacing = 1.15
    r = p.add_run(text)
    r.font.name = "Arial"
    r.font.size = Pt(10)
    r.font.color.rgb = RGBColor(60, 64, 67)
    return p

def add_li(doc, text):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    r = p.add_run(text)
    r.font.name = "Arial"
    r.font.size = Pt(10)
    r.font.color.rgb = RGBColor(60, 64, 67)

def add_checklist(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(2)
    r_box = p.add_run("☐  ")
    r_box.font.name = "Arial"
    r_box.font.size = Pt(11)
    r_box.bold = True
    r_box.font.color.rgb = RGBColor(26, 115, 232)
    r_text = p.add_run(text)
    r_text.font.name = "Arial"
    r_text.font.size = Pt(10)
    r_text.font.color.rgb = RGBColor(60, 64, 67)

# Step 1
add_h1(doc, "1. Introduction & Overview", "5:00")
add_p(doc, "Welcome to this hands-on lab for DevFest Pretoria 2026! In this codelab, you will learn how to use Antigravity 2.0 to coordinate multiple AI agents, automate recurring tasks, and build autonomous workflows using Gemini 3.7 Flash.")

add_h2(doc, "Overview")
add_p(doc, "Modern software development is moving beyond AI-assisted coding toward AI-orchestrated workflows. Antigravity 2.0 introduces Projects, Git Worktree support, Scheduled Tasks, JSON Hooks, and enhanced security controls that enable developers to manage complex workflows with multiple agents working in parallel.")
add_p(doc, "In this lab, you will create a project, configure an autonomous workflow, schedule recurring tasks, and explore how Antigravity 2.0 can automate routine engineering activities.")

add_callout(doc, "Key Concept: Scoped Permissions", "Scoped permissions in Antigravity 2.0 ensure that agents can only interact with authorized directories, keeping your system safe while letting them automate development pipelines.", "info")

add_h2(doc, "Prerequisites")
add_li(doc, "Basic familiarity with terminal commands and Git workflows")
add_li(doc, "Understanding of prompt engineering concepts")

add_h2(doc, "What you’ll learn")
add_li(doc, "How to create and configure a Project in Antigravity 2.0")
add_li(doc, "How to use Gemini 3.7 Flash to coordinate multiple tasks")
add_li(doc, "How to leverage Git Worktrees for isolated agent execution")
add_li(doc, "How to configure Scheduled Tasks for automation")
add_li(doc, "How to create a JSON Hook to customize agent behavior")
add_li(doc, "How scoped permissions and sandboxing protect your host environment")

add_h2(doc, "What you’ll need")
add_li(doc, "A computer running Windows, macOS, or Linux")
add_li(doc, "Google Chrome or modern web browser")
add_li(doc, "Installed Antigravity 2.0 application")
add_li(doc, "Access to the Gemini 3.7 Flash model")

# Step 2
add_h1(doc, "2. Create a New Project", "10:00")
add_p(doc, "Projects are the foundation of Antigravity 2.0. Unlike previous versions where agents were tied to a single workspace, Projects allow agents to work across multiple folders while maintaining isolated settings and permissions.")

add_h2(doc, "Instructions")
add_p(doc, "1. Open the Antigravity 2.0 interface.\n2. Click on File and then Create Project.\n3. Name the project folder precisely:")
add_code_box(doc, "DataOps-Automation")
add_p(doc, "4. Select a local directory folder to act as your project workspace.\n5. Keep the default security settings preset selected.\n6. Click Create Project.")

add_callout(doc, "Verification", "You should now see your newly created project DataOps-Automation listed in the sidebar navigation panel.", "positive")

add_h2(doc, "Checklist")
add_checklist(doc, "Open Antigravity 2.0 app")
add_checklist(doc, "Configure workspace name (DataOps-Automation) and path")
add_checklist(doc, "Verify workspace appears in sidebar")

# Step 3
add_h1(doc, "3. Explore Project Configuration & Security", "5:00")
add_p(doc, "Antigravity 2.0 allows each project to have its own settings, permissions, and security controls.")

add_h2(doc, "Instructions")
add_p(doc, "1. Open the project settings by clicking the gear icon next to your project title.\n2. Locate the Security Settings section.\n3. Review the available presets:")
add_li(doc, "Default: Requires manual review for all terminal commands and file accesses outside of the working folders. (Recommended)")
add_li(doc, "Full Machine: All terminal commands require review. The agent can read or write to any file in the machine.")
add_li(doc, "Turbo Mode: Disables all safety barriers for maximal iteration velocity.")
add_li(doc, "Custom: Manually customize individual settings.")
add_p(doc, "4. Leave the project configured with the Default preset selected.")

add_callout(doc, "Security Best Practice", "The Default preset restricts agent access to only the folders assigned to the project, helping protect the rest of your machine while still enabling productive automation.", "info")

add_h2(doc, "Checklist")
add_checklist(doc, "Open project security settings panel")
add_checklist(doc, "Review sandbox capability presets")
add_checklist(doc, "Verify default sandbox preset is saved")

# Step 4
add_h1(doc, "4. Create an Autonomous Workflow", "10:00")
add_p(doc, "We will use Gemini 3.7 Flash to design a simple data-processing workflow.")

add_h2(doc, "Prompt")
add_p(doc, "Enter the following prompt into the agent dialogue input box:")
add_code_box(doc, """You are a Data Operations Coordinator.

Design a workflow that:

1. Receives transaction data files.
2. Cleans and validates the records.
3. Detects unusual transactions.
4. Generates a summary report.

Break the workflow into specialized tasks that can be executed independently.""")

add_h2(doc, "Expected Outcome")
add_p(doc, "Gemini 3.7 Flash should propose a structured workflow layout containing separate responsibilities such as:")
add_li(doc, "Data Validation: Schema checks and type verifications.")
add_li(doc, "Data Cleaning: Null formatting and parsing corrections.")
add_li(doc, "Anomaly Detection: Outlier detection and notification hooks.")
add_li(doc, "Report Generation: Visual summaries and files creation.")
add_p(doc, "These independent responsibilities form the logical basis of a multi-agent parallel workflow.")

add_h2(doc, "Checklist")
add_checklist(doc, "Copy and run the Data Operations prompt with Gemini 3.7 Flash")
add_checklist(doc, "Verify Gemini outputs a clean task hierarchy")

# Step 5
add_h1(doc, "5. Enable Parallel Execution with Git Worktrees", "10:00")
add_p(doc, "One of the major improvements in Antigravity 2.0 is native Git Worktree support. Git Worktrees allow agents to operate in isolated working directories without interfering with each other's branch structures.")

add_h2(doc, "Instructions")
add_p(doc, "Ask the Antigravity agent in your chat panel:")
add_code_box(doc, """Create separate implementation plans for:

1. Data validation
2. Data cleaning
3. Anomaly detection
4. Reporting

Assume each task can be developed independently.""")

add_callout(doc, "Parallel Execution Advantage", "Instead of a single agent handling every task sequentially, worktrees allow multiple agents to work in isolated environments simultaneously. This approach improves productivity while reducing conflicts between parallel tasks.", "positive")

add_h2(doc, "Checklist")
add_checklist(doc, "Run prompt requesting separate implementation plans")
add_checklist(doc, "Confirm understanding of how worktrees isolate workspace folders")

# Step 6
add_h1(doc, "6. Create a Scheduled Task", "10:00")
add_p(doc, "Scheduled Tasks allow Antigravity to send instruction prompts to agents automatically, even when you are away from the keyboard.")

add_h2(doc, "Instructions")
add_p(doc, "1. Open the Scheduled Tasks dashboard utility.\n2. Click Create New Task.\n3. Configure the following cron interval schedule:")
add_code_box(doc, "*/15 * * * *")
add_p(doc, "4. Use the following prompt content to instruct the agent daemon:")
add_code_box(doc, "Review the project workspace and generate a status summary of completed, pending, and blocked tasks.")
add_p(doc, "5. Save the task configuration.")

add_callout(doc, "Verification", "Your project should now contain a recurring cron task that automatically checks project files progress periodically.", "positive")

add_h2(doc, "Checklist")
add_checklist(doc, "Open Scheduled Tasks UI dashboard")
add_checklist(doc, "Create and save task set to 15 minutes interval")

# Step 7
add_h1(doc, "7. Create a JSON Hook", "10:00")
add_p(doc, "JSON Hooks allow custom local scripts to execute during specific stages of the agent runtime lifecycle.")

add_h2(doc, "Instructions")
add_p(doc, "Create a hook configuration file named audit-hook.json in your project repository:")
add_code_box(doc, """{
  "name": "project_audit",
  "event": "after_model_response",
  "script": "./scripts/audit.sh"
}""")

add_callout(doc, "Discussion: Lifecycle Hooks", "This hook executes after each model response. It is commonly used for logging activity, monitoring outputs, triggering local webhooks, or running compliance checks.", "info")

add_h2(doc, "Checklist")
add_checklist(doc, "Create audit-hook.json configuration file")
add_checklist(doc, "Copy and save the configuration json")

# Step 8
add_h1(doc, "8. Test Voice Interaction", "5:00")
add_p(doc, "Antigravity 2.0 includes built-in voice transcription modules to speed up prompt delivery.")

add_h2(doc, "Instructions")
add_p(doc, "1. Click the microphone icon in the chat controls.\n2. Clearly speak the following sentence:")
add_code_box(doc, "Review the current workflow and suggest two improvements.")
add_p(doc, "3. Stop recording when finished speaking.")

add_callout(doc, "Voice Engine Processing", "Antigravity automatically filters background noise, cleans up speech-to-text transcript output, and submits the optimized text directly to the model.", "info")

add_h2(doc, "Checklist")
add_checklist(doc, "Click microphone button to initiate")
add_checklist(doc, "Record improvement prompt and submit")

# Step 9
add_h1(doc, "9. Congratulations & Next Steps", "1:00")
add_p(doc, "Congratulations! You have successfully configured and executed autonomous agent workflows using Antigravity 2.0 and Gemini 3.7 Flash at DevFest Pretoria 2026.")

add_h2(doc, "Review Summary")
add_p(doc, "In this lab, you successfully completed the following activities:")
add_li(doc, "Created a Project space in Antigravity 2.0")
add_li(doc, "Reviewed Sandboxing using the Security Preset defaults")
add_li(doc, "Designed a multi-agent workflow layout using Gemini 3.7 Flash")
add_li(doc, "Learned Git Worktrees parallel execution concepts")
add_li(doc, "Configured Scheduled daemon Tasks and JSON lifecycle Hooks")
add_li(doc, "Tested built-in Audio Voice prompt transcription")

add_h2(doc, "Next Steps to Explore")
add_li(doc, "Connect multiple Git repositories to a single project space.")
add_li(doc, "Build custom JSON Hooks for triggering team Slack/Discord alerts.")
add_li(doc, "Test the terminal agent using the /browser command line tool.")
add_li(doc, "Integrate custom diagnostics utilities via MCP servers.")

add_h2(doc, "References & Documentation")
add_li(doc, "Google AI for Developers: https://ai.google.dev")
add_li(doc, "Gemini 3.7 Flash Documentation: https://ai.google.dev/gemini-api/docs/models/gemini")
add_li(doc, "DevFest Pretoria 2026 Live Portal: https://devfest-pretoria-2026.web.app")
add_li(doc, "Google Codelabs Feedback: https://github.com/googlecodelabs/feedback/issues/new?title=antigravity-parallel-agents-gemini-3-7-flash")

file_dest = r"c:\Users\SACU\.gemini\antigravity-ide\scratch\io-extended-nairobi-codelab\DevFest_Pretoria_2026_Codelab_Doc.docx"
doc.save(file_dest)
print(f"Generated Word file: {file_dest} ({os.path.getsize(file_dest)} bytes)")
